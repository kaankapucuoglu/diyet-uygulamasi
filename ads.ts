// Reklam köprüsü (Google AdMob) — react-native-google-mobile-ads. Uygulama (WebView) reklam ister, reklam yerel tam ekran açılır.
//
// Türler:
//   • rewarded (ödüllü video): kullanıcı KENDİ seçer; LifeRoutine'de şimdilik kullanılmıyor (altyapı hazır).
//   • inter (geçiş reklamı): seyrek (sıklık kuralı web tarafında: kaynak/p9c.js). "Reklamları kaldır" alınınca hiç çağrılmaz.
//
// Köprü:
//   uygulama → uygulama: {t:'ad:init', noAds}  {t:'ad:show', kind:'rewarded'|'inter', id}  {t:'ad:privacy'}
//   uygulama → uygulama (window.__lfAd(msg)): {t:'ad:status', rewarded, inter, privacy}
//                                          {t:'ad:result', id, kind, ok, error?}   (rewarded: ok = ödül hak edildi)
// Açılış sırası: UMP onayı (AB/İngiltere'de Google'ın onay penceresi; Türkiye'de görünmez) → SDK başlat → iki reklamı önceden yükle.
// Reklam açılınca uygulama duraklatılır ve sesi kısılır (__lfApp('background')), kapanınca geri açılır.
// Expo Go / yerel modül yok → uygulamaya {rewarded:false, inter:false}: reklam düğmeleri gizlenir.
import { Platform, TurboModuleRegistry } from 'react-native';

type AdsLib = typeof import('react-native-google-mobile-ads');
type Ad = import('react-native-google-mobile-ads').RewardedAd | import('react-native-google-mobile-ads').InterstitialAd;
export type Send = (msg: Record<string, unknown>) => void;

// ---- Reklam birimi kimlikleri (AdMob yayıncı pub-3896205622796453, 17.10.2026). Boş → Google'ın resmi TEST reklamları. ----
// Uygulama kimlikleri (…~…) app.json → plugins → react-native-google-mobile-ads içinde. Geliştirme derlemesinde (__DEV__) hep TEST reklamı:
// kendi reklamına tıklamak AdMob'da geçersiz trafik sayılır.
// LifeRoutine AdMob uygulamaları 01.11.2026: Android ~6882387869, iOS ~3011872724 (yayıncı pub-3896205622796453)
const UNITS = {
  android: { rewarded: 'ca-app-pub-3896205622796453/1507219364', inter: 'ca-app-pub-3896205622796453/5665956220' },
  ios: { rewarded: 'ca-app-pub-3896205622796453/3941811019', inter: 'ca-app-pub-3896205622796453/1438489496' },
};
// Sağlık uygulaması: reklam içeriği en çok "PG"
const MAX_RATING = 'PG';
const RETRY_S = [15, 30, 60, 120, 300];

let lib: AdsLib | null | undefined;
function loadAds(): AdsLib | null {
  if (lib !== undefined) return lib;
  lib = null;
  if (!TurboModuleRegistry.get('RNGoogleMobileAdsModule')) return lib; // Expo Go / web
  try {
    lib = require('react-native-google-mobile-ads') as AdsLib;
  } catch {
    lib = null;
  }
  return lib;
}

type Kind = 'rewarded' | 'inter';

export function createAdsBridge(send: Send, game: (state: 'background' | 'active') => void) {
  const slot: Record<Kind, { ad: Ad | null; loaded: boolean; loading: boolean; tries: number; timer: ReturnType<typeof setTimeout> | null; off: (() => void)[] }> = {
    rewarded: { ad: null, loaded: false, loading: false, tries: 0, timer: null, off: [] },
    inter: { ad: null, loaded: false, loading: false, tries: 0, timer: null, off: [] },
  };
  let started: Promise<boolean> | null = null;
  let privacyForm = false; // AB: ayarlarda "Reklam gizlilik seçenekleri" gösterilmeli
  let noAds = false;
  let showing: { id: string; kind: Kind; earned: boolean } | null = null;
  let disposed = false;

  const status = () => send({ t: 'ad:status', rewarded: slot.rewarded.loaded, inter: slot.inter.loaded && !noAds, privacy: privacyForm });

  const unitId = (L: AdsLib, kind: Kind) => {
    const u = __DEV__ ? '' : (Platform.OS === 'ios' ? UNITS.ios : UNITS.android)[kind];
    return u || (kind === 'rewarded' ? L.TestIds.REWARDED : L.TestIds.INTERSTITIAL);
  };

  let lastDone: { id: string; kind: Kind; ok: boolean; at: number } | null = null;
  const finish = (ok: boolean, error = '') => {
    const s = showing;
    showing = null;
    game('active');
    if (s) {
      lastDone = { id: s.id, kind: s.kind, ok, at: Date.now() };
      send({ t: 'ad:result', id: s.id, kind: s.kind, ok, error });
    }
  };

  const load = (kind: Kind) => {
    const L = loadAds();
    const s = slot[kind];
    if (!L || disposed || s.loaded || s.loading || (kind === 'inter' && noAds)) return;
    if (s.timer) { clearTimeout(s.timer); s.timer = null; }
    s.off.forEach((f) => f());
    s.off = [];
    const opts = {};
    const ad: Ad = kind === 'rewarded' ? L.RewardedAd.createForAdRequest(unitId(L, kind), opts) : L.InterstitialAd.createForAdRequest(unitId(L, kind), opts);
    s.ad = ad;
    s.loading = true;
    type Listen = { addAdEventListener(type: string, fn: (...a: unknown[]) => void): () => void };
    const on = (type: string, fn: (...a: unknown[]) => void) => (ad as unknown as Listen).addAdEventListener(type, fn);
    const loadedEv = kind === 'rewarded' ? L.RewardedAdEventType.LOADED : L.AdEventType.LOADED;
    s.off.push(
      on(loadedEv, () => {
        s.loading = false; s.loaded = true; s.tries = 0;
        status();
      })
    );
    if (kind === 'rewarded') {
      s.off.push(
        on(L.RewardedAdEventType.EARNED_REWARD, () => {
          if (showing && showing.kind === 'rewarded') showing.earned = true;
          // 18.10: ödül sinyali kapanıştan SONRA geldiyse (bazı Android reklamları) bekleyen kapanış hemen ödüllü biter;
          // sonuç zaten gönderildiyse ayrıca geç ödül bildirilir (uygulama aynı kimliğe bir kez verir)
          else if (lastDone && lastDone.kind === 'rewarded' && !lastDone.ok && Date.now() - lastDone.at < 15000) {
            lastDone.ok = true;
            send({ t: 'ad:late', id: lastDone.id, kind: 'rewarded', ok: true });
          }
        })
      );
    }
    s.off.push(on(L.AdEventType.OPENED, () => game('background')));
    s.off.push(
      on(L.AdEventType.CLOSED, () => {
        s.loaded = false; s.ad = null;
        const close = () => {
          finish(kind === 'inter' ? true : !!showing?.earned);
          load(kind); // sıradaki reklam hemen hazırlanır
          status();
        };
        // 18.10 (kullanıcı: "2 katı al izledim, altın gelmedi"): ödül sinyali bazen kapanıştan hemen sonra gelir →
        // ödüllüde sinyal gelmediyse 1,5 sn beklenir (gelirse anında biter)
        if (kind === 'rewarded' && showing && !showing.earned) {
          const sh = showing;
          let n = 0;
          const iv = setInterval(() => {
            if (showing !== sh) { clearInterval(iv); return; }
            if (sh.earned || ++n >= 15) { clearInterval(iv); close(); }
          }, 100);
        } else close();
      })
    );
    s.off.push(
      on(L.AdEventType.ERROR, () => {
        const wasShowing = showing && showing.kind === kind;
        s.loading = false; s.loaded = false; s.ad = null;
        if (wasShowing) finish(false, 'show');
        const d = RETRY_S[Math.min(s.tries++, RETRY_S.length - 1)];
        s.timer = setTimeout(() => { s.timer = null; load(kind); }, d * 1000);
        status();
      })
    );
    ad.load();
  };

  const start = () => {
    if (started) return started;
    started = (async () => {
      const L = loadAds();
      if (!L) return false;
      try {
        // AB/İngiltere/ABD eyaletleri: Google UMP onay penceresi (gerekmiyorsa hiçbir şey göstermez)
        const info = await L.AdsConsent.gatherConsent();
        privacyForm = String(info?.privacyOptionsRequirementStatus || '') === 'REQUIRED';
        if (info && info.canRequestAds === false) return false;
        // Kişiselleştirme kararını SDK onay kaydından (TCF) kendisi okur; AB dışında (Türkiye) kayıt yok → normal reklam.
      } catch {
        /* onay sunucusuna ulaşılamadı: SDK yine başlatılır, Google bölgeye göre karar verir */
      }
      try {
        await L.default().setRequestConfiguration({ maxAdContentRating: MAX_RATING as never });
        await L.default().initialize();
      } catch {
        return false;
      }
      return true;
    })();
    started.then((ok) => {
      if (!ok) { started = null; return; }
      load('rewarded');
      load('inter');
    });
    return started;
  };

  return {
    // uygulama açılışı: WebView yüklenirken onay + SDK + ilk reklamlar
    prefetch() {
      start().catch(() => {});
    },
    async init(m: { noAds?: unknown }) {
      noAds = !!m?.noAds;
      if (!loadAds()) {
        send({ t: 'ad:status', rewarded: false, inter: false, privacy: false, reason: 'unavailable' });
        return;
      }
      status();
      if (await start()) { load('rewarded'); load('inter'); }
      status();
    },
    setNoAds(on: unknown) {
      noAds = !!on;
      status();
    },
    show(kind: unknown, id: unknown) {
      const k: Kind = kind === 'inter' ? 'inter' : 'rewarded';
      const rid = String(id || '');
      const s = slot[k];
      if (showing) { send({ t: 'ad:result', id: rid, kind: k, ok: false, error: 'busy' }); return; }
      if ((k === 'inter' && noAds) || !s.loaded || !s.ad) {
        send({ t: 'ad:result', id: rid, kind: k, ok: false, error: 'not-ready' });
        load(k);
        return;
      }
      showing = { id: rid, kind: k, earned: false };
      s.ad.show().catch(() => {
        s.loaded = false; s.ad = null;
        finish(false, 'show');
        load(k);
        status();
      });
    },
    // ayarlar → "Reklam gizlilik seçenekleri" (yalnız AB'de gerekli)
    async privacy() {
      const L = loadAds();
      if (!L) return;
      try { await L.AdsConsent.showPrivacyOptionsForm(); } catch { /* yoksay */ }
    },
    dispose() {
      disposed = true;
      for (const k of ['rewarded', 'inter'] as Kind[]) {
        const s = slot[k];
        if (s.timer) clearTimeout(s.timer);
        s.off.forEach((f) => f());
        s.off = [];
      }
    },
  };
}
