// LifeRoutine uygulama içi satın alma köprüsü (reklamları kaldır) — expo-iap (Apple StoreKit 2 / Google Play Billing).
// Uygulama (WebView) satın almayı ister, mağazanın kendi ödeme penceresi açılır; kart bilgisi ne uygulamaya ne bize gelir.
//
// Akış (Apple/Google önerisi: "içeriği teslim et, SONRA işlemi kapat"):
//   uygulama {t:'iap:buy'} → requestPurchase → purchaseUpdatedListener (ödendi) → uygulamaya {t:'iap:result', ok:true, transactionId}
//   → uygulama altını yükler + kaydeder → {t:'iap:ack'} → finishTransaction({isConsumable:true}) (Android: tüket, iOS: finish).
// Uygulama arada kapanırsa işlem kapanmamış kalır; açılışta (getAvailablePurchases / StoreKit güncellemeleri) yeniden
// uygulamaya gönderilir. Uygulama aynı transactionId'yi ikinci kez yüklemez (Profile.iap.tx), yalnız yeniden ack verir.
// Android "bekleyen" ödeme (ör. nakit): altın verilmez; ödeme tamamlanınca purchaseUpdatedListener yeniden çağrılır.
// Expo Go: ExpoIap yerel modülü yok → uygulamaya {available:false, reason:'expo-go'} (satın alma düğmeleri kapalı).
// v34 ön bağlantı: App.tsx açılışta prefetch() çağırır → WebView yüklenirken mağazaya bağlanılır, fiyatlar alınır ve
// kapanmamış işlemler toplanır (sweep). Uygulama 'iap:init' gönderince durum + fiyatlar BEKLETMEDEN iletilir, ardından tazelenir.
// Uygulama ön plana dönünce ve uygulama 'iap:sweep' isteyince (mağaza açılınca) kapanmamış işlemler yeniden toplanır.
// "Geri yükle": "Reklamları kaldır" (tüketilmez) için mağaza ekranında düğme var → restore() (restorePurchases + sahiplik listesi).
// Sunucu tarafı makbuz doğrulaması: şimdilik yok (gelecek iş: App Store Server API / Play Developer API).
import { Platform } from 'react-native';
import { requireOptionalNativeModule } from 'expo';

type IapLib = typeof import('expo-iap');
type Purchase = import('expo-iap').Purchase;
type PurchaseError = Parameters<Parameters<IapLib['purchaseErrorListener']>[0]>[0];
export type Send = (msg: Record<string, unknown>) => void;

// Ürün kimlikleri web tarafından gelir (kaynak/p9c.js); yalnız bu önek + "Reklamları kaldır" kabul edilir
const PREFIX = 'com.maviplay.liferoutine.';
// "Reklamları kaldır": TÜKETİLMEZ (non-consumable), bir kez alınır; yeni cihazda / yeniden kurulumda geri yüklenir
const NOADS = 'com.maviplay.liferoutine.noads';
const known = (id: string) => id.startsWith(PREFIX) || id === NOADS;
// ön bağlantıda istenen paketler (uygulama klasörü src/data/iap.js GOLD_PACKS ile aynı; uygulamanın gönderdiği liste de eklenir)
const DEFAULT_SKUS = [NOADS];   // LifeRoutine'de tek ürün: Reklamları kaldır (tüketilmez)
type Prod = { id: string; displayPrice: string; currency: string; price: number | null };

let lib: IapLib | null | undefined;
function loadIap(): IapLib | null {
  if (lib !== undefined) return lib;
  lib = null;
  if (!requireOptionalNativeModule('ExpoIap')) return lib; // Expo Go / web
  try {
    lib = require('expo-iap') as IapLib;
  } catch {
    lib = null;
  }
  return lib;
}

const txOf = (p: Purchase): string => String((p as { transactionId?: string | null }).transactionId || p.id || p.purchaseToken || '');
// Android: yalnız 'purchased' teslim edilir. iOS: StoreKit yalnız doğrulanmış işlemleri iletir; ertelenen (Ask to Buy) 'pending'.
const isPaid = (p: Purchase) => (Platform.OS === 'android' ? p.purchaseState === 'purchased' : p.purchaseState !== 'pending');

export function createIapBridge(send: Send) {
  const open = new Map<string, Purchase>(); // uygulamaya gönderilmiş, henüz finishTransaction yapılmamış işlemler
  let connected: Promise<boolean> | null = null;
  let subs: { remove(): void }[] = [];
  let busyProduct: string | null = null;
  let lastProducts: Prod[] | null = null; // mağazanın son verdiği fiyatlar (ön bağlantı / önceki init)
  let fetching: Promise<Prod[] | null> | null = null;
  let sweeping: Promise<void> | null = null;

  const deliver = (p: Purchase, restored: boolean) => {
    if (!p.productId || !known(p.productId)) return;
    if (!isPaid(p)) {
      send({ t: 'iap:result', ok: false, productId: p.productId, pending: true });
      return;
    }
    const tx = txOf(p);
    if (!tx) return;
    open.set(tx, p);
    send({ t: 'iap:result', ok: true, productId: p.productId, transactionId: tx, restored });
  };

  const sweep = (L: IapLib) => {
    // kapanmamış (tüketilmemiş) işlemler: uygulama ödeme sonrası kapandıysa / bekleyen ödeme tamamlandıysa
    if (sweeping) return sweeping;
    sweeping = (async () => {
      try {
        const list = (await L.getAvailablePurchases()) || [];
        for (const p of list) deliver(p, true);
      } catch {
        /* mağaza sorgusu başarısız: bir sonraki açılışta / mağaza açılışında yeniden denenir */
      }
    })().finally(() => {
      sweeping = null;
    });
    return sweeping;
  };

  // fiyat listesi (aynı anda tek istek); başarılıysa lastProducts güncellenir
  const fetchPrices = (L: IapLib, extra: string[] = []) => {
    if (fetching) return fetching;
    const ids = Array.from(new Set([...DEFAULT_SKUS, ...extra.filter(known)]));
    fetching = (async () => {
      try {
        const list = ((await L.fetchProducts({ skus: ids, type: 'in-app' })) || []) as { id: string; displayPrice: string; currency: string; price?: number | null }[];
        const out: Prod[] = list.filter((p) => p && p.id && p.displayPrice).map((p) => ({ id: p.id, displayPrice: p.displayPrice, currency: p.currency, price: p.price ?? null }));
        if (out.length) lastProducts = out;
        return out.length ? out : null;
      } catch {
        return null;
      }
    })().finally(() => {
      fetching = null;
    });
    return fetching;
  };

  const connect = (L: IapLib) => {
    if (connected) return connected;
    subs.push(
      L.purchaseUpdatedListener((p: Purchase) => {
        const mine = busyProduct && p.productId === busyProduct;
        if (mine) busyProduct = null;
        deliver(p, !mine);
      })
    );
    subs.push(
      L.purchaseErrorListener((e: PurchaseError) => {
        const productId = e.productId || busyProduct || '';
        busyProduct = null;
        const cancelled = L.isUserCancelledError(e);
        send({ t: 'iap:result', ok: false, productId, cancelled, error: cancelled ? '' : String(e.code || e.message || 'error') });
      })
    );
    connected = L.initConnection().then(
      (ok) => !!ok,
      () => {
        connected = null; // sonraki 'iap:init' yeniden dener
        return false;
      }
    );
    return connected;
  };

  return {
    // uygulama açılışı (WebView'dan önce): bağlan, fiyatları al, kapanmamış işlemleri topla. Uygulamaa henüz bir şey gönderilmez
    // (sayfa yok); hepsi uygulamanın 'iap:init'inde iletilir (open haritası + lastProducts).
    async prefetch() {
      const L = loadIap();
      if (!L || !(await connect(L))) return;
      await fetchPrices(L);
      await sweep(L);
    },
    // uygulama yüklendi (her sayfa yüklemesinde): bağlan, fiyatları gönder, kapanmamış işlemleri yeniden teslim et
    async init(skus: unknown) {
      const L = loadIap();
      if (!L) {
        send({ t: 'iap:status', available: false, reason: 'expo-go' });
        return;
      }
      const ids = (Array.isArray(skus) ? skus : []).map(String).filter(known);
      // ön bağlantı hazırsa beklemeden: durum + mağazanın son verdiği fiyatlar
      if (lastProducts && connected) {
        send({ t: 'iap:status', available: true });
        send({ t: 'iap:products', products: lastProducts });
      }
      const ok = await connect(L);
      if (!ok) {
        send({ t: 'iap:status', available: false, reason: 'store' });
        return;
      }
      send({ t: 'iap:status', available: true });
      const fresh = await fetchPrices(L, ids);
      if (fresh) send({ t: 'iap:products', products: fresh });
      for (const [tx, p] of open) send({ t: 'iap:result', ok: true, productId: p.productId, transactionId: tx, restored: true });
      await sweep(L);
    },
    // uygulama mağazayı açtı / uygulama ön plana döndü: kapanmamış işlemleri yeniden topla (geri yükleme penceresi açılmaz)
    async sweepNow() {
      const L = loadIap();
      if (!L || !connected || !(await connected)) return;
      for (const [tx, p] of open) send({ t: 'iap:result', ok: true, productId: p.productId, transactionId: tx, restored: true });
      await sweep(L);
    },
    async buy(productId: unknown) {
      const sku = String(productId || '');
      const L = loadIap();
      if (!L || !known(sku)) {
        send({ t: 'iap:result', ok: false, productId: sku, error: L ? 'unknown-product' : 'expo-go' });
        return;
      }
      if (!(await connect(L))) {
        send({ t: 'iap:result', ok: false, productId: sku, error: 'store' });
        return;
      }
      busyProduct = sku;
      try {
        // sonuç purchaseUpdatedListener / purchaseErrorListener ile gelir
        await L.requestPurchase({ request: { apple: { sku }, google: { skus: [sku] } }, type: 'in-app' });
      } catch (e) {
        if (busyProduct === sku) {
          busyProduct = null;
          const cancelled = L.isUserCancelledError(e);
          send({ t: 'iap:result', ok: false, productId: sku, cancelled, error: cancelled ? '' : String((e as Error)?.message || 'error') });
        }
      }
    },
    // uygulama altını yükledi / reklamları kapattı ve kaydetti → işlemi kapat (altın: tüketilir, yeniden alınabilir;
    // Reklamları kaldır: Android'de onaylanır (acknowledge), tüketilmez → sahiplik kalır, geri yüklenebilir)
    async ack(transactionId: unknown) {
      const tx = String(transactionId || '');
      const p = open.get(tx);
      const L = loadIap();
      if (!p || !L) return;
      try {
        await L.finishTransaction({ purchase: p, isConsumable: p.productId !== NOADS });
        open.delete(tx);
      } catch {
        /* kapanmadı: açılışta yeniden gelir, uygulama ikinci kez altın vermez */
      }
    },
    // "Satın alımları geri yükle" (Apple: tüketilmeyen ürün için zorunlu) — yalnız uygulamacu düğmeye basınca; iOS'ta Apple ID
    // sorabilir. Sahip olunan "Reklamları kaldır" yeniden teslim edilir; sonuç ne olursa olsun uygulamaya 'iap:restored' gider.
    async restore() {
      const L = loadIap();
      if (!L || !(await connect(L))) { send({ t: 'iap:restored', ok: false }); return; }
      try { await L.restorePurchases(); } catch { /* iptal / hata: yine de sahiplik listesine bakılır */ }
      await sweep(L);
      send({ t: 'iap:restored', ok: true });
    },
    dispose() {
      for (const s of subs) s.remove();
      subs = [];
      const L = lib;
      if (L && connected) L.endConnection().catch(() => {});
      connected = null;
    },
  };
}
