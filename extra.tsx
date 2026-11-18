// LifeRoutine — sürüm 13 yerel köprüleri: öğün fotoğrafı, barkod tarayıcı, sağlık verisi (adım/uyku/kilo), paylaş.
// Tüm veri CİHAZDA kalır: fotoğraf küçültülüp (EXIF/konum atılır) yalnız web görünümüne verilir; tanıma web tarafında cihaz içinde (ai/tani.js).
// Sağlık verisi yalnız OKUNUR (Apple Health / Health Connect), sunucuya gitmez, reklamda kullanılmaz.
// Web → kabuk: {t:'foto', kaynak:'kamera'|'galeri'} · {t:'barkod', l:{...}} · {t:'saglik', gun} · {t:'paylas', text, url, title}
// Kabuk → web: __lfOnFoto({ok, data?, iptal?, hata?}) · __lfOnBarkod({ok, kod?, iptal?}) · __lfOnSaglik({ok, adim, uyku, kilo, hata?}) · __lfOnPaylas({ok})
import { useEffect, useRef, useState } from 'react';
import { AppState, Linking, Platform, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';

type Call = (fn: string, arg: unknown) => void;
const gunK = (d: Date) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const hataYaz = (e: unknown) => String((e && (e as Error).message) || e || 'hata').slice(0, 200);

// ---------- öğün fotoğrafı ----------
async function fotoIsle(a: ImagePicker.ImagePickerAsset): Promise<Record<string, unknown>> {
  // uzun kenar 1024 px: tanıma birden çok kırpmayı 192 px'e indirir (yakın kırpmalar için çözünürlük gerekir), günlük küçük resmi 320 px;
  // yeniden kodlama EXIF'i (konum) atar
  const w = a.width || 0, h = a.height || 0, uzun = Math.max(w, h) || 1024;
  const ctx = ImageManipulator.manipulate(a.uri);
  if (uzun > 1024) ctx.resize(w >= h ? { width: 1024 } : { height: 1024 });
  const img = await ctx.renderAsync();
  const out = await img.saveAsync({ format: SaveFormat.JPEG, compress: 0.82, base64: true });
  if (!out.base64) throw new Error('bos-goruntu');
  return { ok: true, data: 'data:image/jpeg;base64,' + out.base64, w: out.width, h: out.height };
}
let fotoMesgul = false;   // çift dokunma → iki seçici üst üste açılmasın
export async function fotoAl(kaynak: string): Promise<Record<string, unknown>> {
  if (fotoMesgul) return { ok: false, mesgul: true };
  fotoMesgul = true;
  try {
    const opt: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], quality: 0.85, allowsEditing: false, exif: false };
    let r: ImagePicker.ImagePickerResult;
    if (kaynak === 'kamera') {
      const izin = await ImagePicker.requestCameraPermissionsAsync();
      if (!izin.granted) return { ok: false, izin: false, tekrarSor: izin.canAskAgain !== false };
      r = await ImagePicker.launchCameraAsync({ ...opt, cameraType: ImagePicker.CameraType.back });
    } else {
      // iOS 14+ ve Android 13+ sistem seçicisi izin istemez; eski Android'de kütüphane izni gerekebilir
      if (Platform.OS === 'android' && Number(Platform.Version) < 33) {
        const izin = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!izin.granted) return { ok: false, izin: false, galeri: true, tekrarSor: izin.canAskAgain !== false };
      }
      r = await ImagePicker.launchImageLibraryAsync(opt);
    }
    if (r.canceled || !r.assets || !r.assets.length) return { ok: false, iptal: true };
    return await fotoIsle(r.assets[0]);
  } finally { fotoMesgul = false; }
}
// Android: kamera uygulaması açıkken sistem bellek için bizim etkinliği öldürürse sonuç kaybolmasın (uygulama yeniden açılınca alınır)
export async function bekleyenFoto(): Promise<Record<string, unknown> | null> {
  if (Platform.OS !== 'android') return null;
  try {
    const r = await ImagePicker.getPendingResultAsync();
    if (!r || !('assets' in r) || r.canceled || !r.assets || !r.assets.length) return null;
    return { ...(await fotoIsle(r.assets[0])), bekleyen: true };
  } catch { return null; }
}

// ---------- barkod: kontrol hanesi + ürün sorgusu ----------
// GTIN (EAN-8, UPC-A 12, EAN-13, GTIN-14) kontrol hanesi; UPC-E (8 hane, 0/1 ile başlar) UPC-A'ya açılarak doğrulanır
function gtinGecerli(k: string): boolean {
  if (!/^\d+$/.test(k) || ![8, 12, 13, 14].includes(k.length)) return false;
  let t = 0;
  for (let i = k.length - 2, c = 3; i >= 0; i--, c = c === 3 ? 1 : 3) t += Number(k[i]) * c;
  return (10 - (t % 10)) % 10 === Number(k[k.length - 1]);
}
function upcEAc(k: string): string | null {
  if (!/^[01]\d{7}$/.test(k)) return null;
  const s = k[0], d = k.slice(1, 7), c = k[7], x = d[5];
  let m: string;
  if (x <= '2') m = d.slice(0, 2) + x + '0000' + d.slice(2, 5);
  else if (x === '3') m = d.slice(0, 3) + '00000' + d.slice(3, 5);
  else if (x === '4') m = d.slice(0, 4) + '00000' + d[4];
  else m = d.slice(0, 5) + '0000' + x;
  return s + m + c;
}
export function barkodNormal(ham: string): string | null {
  const k = String(ham || '').replace(/\D/g, '');
  if (k.length === 8 && gtinGecerli(k)) return k;            // EAN-8
  if (k.length === 8) { const a = upcEAc(k); return a && gtinGecerli(a) ? '0' + a : null; }   // UPC-E → UPC-A → EAN-13
  if (k.length === 12 && gtinGecerli(k)) return '0' + k;    // UPC-A → EAN-13 (iOS ile aynı biçim, önbellek anahtarı tek)
  if ((k.length === 13 || k.length === 14) && gtinGecerli(k)) return k;
  return null;
}
// Open Food Facts sorgusu YEREL tarafta yapılır: WebView'in file:// kökeninden yapılan çapraz istekler bazı cihazlarda (WKWebView /
// Android WebView) "bağlantı yok" diye düşüyordu (18.11 kefir barkodu, Wi-Fi açıkken). OFF kuralı: tanımlayıcı User-Agent.
// Yalnız barkod numarası gönderilir. Zaman aşımı + yeniden deneme + ikinci sunucu; 404 = ürün yok (ağ hatası DEĞİL).
const OFF_UA = 'LifeRoutine/1.0 (' + Platform.OS + '; +https://diyet.maviplay.com)';
const OFF_ALAN = 'serving_quantity_unit,code,product_name,product_name_tr,product_name_en,product_name_de,product_name_ru,product_name_ar,generic_name,generic_name_tr,brands,quantity,product_quantity,product_quantity_unit,serving_size,serving_quantity,nutrition_data_per,nutriments,categories_tags';
async function zamanliFetch(url: string, ms: number) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try { return await fetch(url, { headers: { 'User-Agent': OFF_UA, Accept: 'application/json' }, signal: ctl.signal }); }
  finally { clearTimeout(t); }
}
const bekle = (ms: number) => new Promise((ok) => setTimeout(ok, ms));
export async function urunAra(kod: string): Promise<Record<string, unknown>> {
  if (!/^\d{8,14}$/.test(kod)) return { ok: false, gecersiz: true };
  const sunucular = ['https://world.openfoodfacts.org', 'https://tr.openfoodfacts.org', 'https://world.openfoodfacts.org'];
  let sonHata = '';
  for (let deneme = 0; deneme < sunucular.length; deneme++) {
    try {
      const r = await zamanliFetch(`${sunucular[deneme]}/api/v2/product/${kod}.json?fields=${OFF_ALAN}`, deneme === 0 ? 9000 : 14000);
      if (r.status === 404) return { ok: true, bulundu: false };
      if (!r.ok) { sonHata = 'http ' + r.status; await bekle(700 * (deneme + 1)); continue; }   // 429 / 5xx → bekle, tekrar
      const j = await r.json();
      if (!j || j.status !== 1 || !j.product) return { ok: true, bulundu: false };
      return { ok: true, bulundu: true, urun: j.product };
    } catch (e) {
      sonHata = hataYaz(e);
      await bekle(500 * (deneme + 1));
    }
  }
  return { ok: false, ag: true, hata: sonHata };
}

// ---------- barkod tarayıcı (tam ekran) ----------
export type BarkodEtiket = { kapat?: string; ipucu?: string; izin?: string; izinVer?: string; fener?: string; elle?: string; ayarlar?: string };
export function BarkodEkrani({ etiket, onSonuc }: { etiket: BarkodEtiket; onSonuc: (r: Record<string, unknown>) => void }) {
  const [izin, izinIste] = useCameraPermissions();
  const [fener, setFener] = useState(false);
  const [aktif, setAktif] = useState(AppState.currentState === 'active');
  const [kameraAnahtar, setKameraAnahtar] = useState(0);
  const [okunan, setOkunan] = useState<string | null>(null);
  const bitti = useRef(false);
  const sonOkuma = useRef<{ kod: string; n: number; t: number }>({ kod: '', n: 0, t: 0 });
  const bitir = (r: Record<string, unknown>) => { if (bitti.current) return; bitti.current = true; onSonuc(r); };
  useEffect(() => { if (izin && !izin.granted && izin.canAskAgain) izinIste().catch(() => {}); }, [izin, izinIste]);
  // Arka plana inip dönünce kamera önizlemesi siyah/donuk kalıyordu (18.11): arka planda kamerayı kapat, dönüşte yeniden kur.
  // Ayarlardan izin verip dönülürse izin durumu da tazelenir. Fener sistemce kapanır → düğme durumu sıfırlanır.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') { setTimeout(() => { setKameraAnahtar((k) => k + 1); setAktif(true); }, 250); izinIste().catch(() => {}); }
      else { setAktif(false); setFener(false); }
    });
    return () => sub.remove();
  }, [izinIste]);
  const okundu = (e: BarcodeScanningResult) => {
    if (bitti.current) return;
    const kod = barkodNormal(e.data);
    if (!kod) return;                       // kontrol hanesi tutmayan okuma = yanlış okuma → yok say, taramaya devam
    // aynı kod üst üste 2 kez okununca kesin say (tek karelik yanlış okumayı eler; gerçek barkodda ~0,1 sn sürer)
    const o = sonOkuma.current, simdi = Date.now();
    if (o.kod === kod && simdi - o.t < 2500) o.n += 1; else { o.kod = kod; o.n = 1; }
    o.t = simdi;
    if (o.n < 2) return;
    bitti.current = true;
    setOkunan(kod);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setTimeout(() => onSonuc({ ok: true, kod }), 350);   // okunan numara bir an görünür (kullanıcı neyin okunduğunu görür)
  };
  const izinVar = !!(izin && izin.granted);
  return (
    <View style={st.kaplama}>
      {izinVar && aktif ? (
        <CameraView key={kameraAnahtar} style={StyleSheet.absoluteFill} facing="back" enableTorch={fener} active={aktif}
          barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'] }} onBarcodeScanned={okunan ? undefined : okundu} />
      ) : null}
      {!izinVar ? (
        <View style={st.orta}>
          <Text style={st.metin}>{etiket.izin || 'Kamera izni gerekli.'}</Text>
          {izin && !izin.canAskAgain ? (
            <Pressable style={st.dug} onPress={() => Linking.openSettings().catch(() => {})}><Text style={st.dugMetin}>{etiket.ayarlar || 'Ayarları aç'}</Text></Pressable>
          ) : (
            <Pressable style={st.dug} onPress={() => izinIste().catch(() => {})}><Text style={st.dugMetin}>{etiket.izinVer || 'İzin ver'}</Text></Pressable>
          )}
        </View>
      ) : null}
      {izinVar ? <View pointerEvents="none" style={[st.cerceve, okunan ? st.cerceveOk : null]} /> : null}
      {okunan ? <View pointerEvents="none" style={st.okunanKutu}><Text style={st.okunanMetin}>✓ {okunan}</Text></View> : null}
      <View style={st.alt}>
        <Text style={st.ipucu}>{etiket.ipucu || ''}</Text>
        <View style={st.satir}>
          {izinVar ? (
            <Pressable accessibilityRole="button" style={[st.dug, st.ikincil]} onPress={() => setFener((f) => !f)}><Text style={st.dugMetin} numberOfLines={1}>{(fener ? '◉ ' : '○ ') + (etiket.fener || 'Fener')}</Text></Pressable>
          ) : null}
          <Pressable accessibilityRole="button" style={[st.dug, st.ikincil]} onPress={() => bitir({ ok: false, elle: true })}><Text style={st.dugMetin} numberOfLines={1}>{etiket.elle || '123'}</Text></Pressable>
          <Pressable accessibilityRole="button" style={st.dug} onPress={() => bitir({ ok: false, iptal: true })}><Text style={st.dugMetin} numberOfLines={1}>{etiket.kapat || 'Kapat'}</Text></Pressable>
        </View>
      </View>
    </View>
  );
}

// ---------- sağlık verisi (yalnız okuma) ----------
// Son `gun` günün günlük adım toplamı, uyku süresi (saat) ve son kilo ölçümleri
export async function saglikOku(gun: number): Promise<Record<string, unknown>> {
  gun = Math.max(1, Math.min(60, Math.floor(gun) || 14));
  const bit = new Date(), bas = new Date(); bas.setHours(0, 0, 0, 0); bas.setDate(bas.getDate() - (gun - 1));
  if (Platform.OS === 'ios') {
    const HK = require('@kingstinct/react-native-healthkit');
    if (!HK.isHealthDataAvailable()) return { ok: false, yok: true };
    await HK.requestAuthorization({ toRead: ['HKQuantityTypeIdentifierStepCount', 'HKCategoryTypeIdentifierSleepAnalysis', 'HKQuantityTypeIdentifierBodyMass'] });
    const adim: [string, number][] = [];
    const st = await HK.queryStatisticsCollectionForQuantity('HKQuantityTypeIdentifierStepCount', ['cumulativeSum'], bas, { day: 1 },
      { filter: { date: { startDate: bas, endDate: bit } }, unit: 'count' });
    for (const s of st || []) if (s.startDate && s.sumQuantity) adim.push([gunK(new Date(s.startDate)), Math.round(s.sumQuantity.quantity)]);
    // uyku: "uyuyor" kategorileri (asleep*: 1, 3, 4, 5) — yatakta (0) ve uyanık (2) sayılmaz; gece yarısını aşan uyku uyanılan güne yazılır
    const uykuDk: Record<string, number> = {};
    const us = await HK.queryCategorySamples('HKCategoryTypeIdentifierSleepAnalysis', { limit: 0, filter: { date: { startDate: new Date(bas.getTime() - 864e5 / 2), endDate: bit } } });
    for (const s of us || []) {
      if (![1, 3, 4, 5].includes(Number(s.value))) continue;
      const b0 = new Date(s.startDate), b1 = new Date(s.endDate), k = gunK(b1);
      uykuDk[k] = (uykuDk[k] || 0) + Math.max(0, (b1.getTime() - b0.getTime()) / 60000);
    }
    const kilo: [string, number][] = [];
    const ks = await HK.queryQuantitySamples('HKQuantityTypeIdentifierBodyMass', { limit: 0, unit: 'kg', filter: { date: { startDate: bas, endDate: bit } } });
    for (const s of ks || []) kilo.push([gunK(new Date(s.startDate)), Math.round(s.quantity * 10) / 10]);
    return { ok: true, kaynak: 'apple', adim, uyku: Object.entries(uykuDk).map(([k, v]) => [k, Math.round(v / 6) / 10]), kilo };
  }
  if (Platform.OS === 'android') {
    const HC = require('react-native-health-connect');
    const durum = await HC.getSdkStatus();
    if (durum !== HC.SdkAvailabilityStatus.SDK_AVAILABLE) return { ok: false, yok: true, durum };
    if (!(await HC.initialize())) return { ok: false, yok: true };
    const istek = [{ accessType: 'read', recordType: 'Steps' }, { accessType: 'read', recordType: 'SleepSession' }, { accessType: 'read', recordType: 'Weight' }];
    let verilen: { recordType: string }[] = await HC.getGrantedPermissions();
    if (!istek.every((p) => verilen.some((g) => g.recordType === p.recordType))) verilen = await HC.requestPermission(istek);
    const var_ = (t: string) => verilen.some((g) => g.recordType === t);
    if (!verilen.length) return { ok: false, izin: false };
    const aralik = (a: Date, b: Date) => ({ operator: 'between', startTime: a.toISOString(), endTime: b.toISOString() });
    const adim: [string, number][] = [];
    if (var_('Steps')) {
      // günlük toplam: Health Connect birden fazla kaynağı (telefon + saat) kendisi tekilleştirir
      const g = await HC.aggregateGroupByPeriod({ recordType: 'Steps', timeRangeFilter: { operator: 'between', startTime: gunK(bas) + 'T00:00:00', endTime: gunK(bit) + 'T23:59:59' }, timeRangeSlicer: { period: 'DAYS', length: 1 } });
      for (const x of g || []) if (x.result && x.result.COUNT_TOTAL) adim.push([String(x.startTime).slice(0, 10), Math.round(x.result.COUNT_TOTAL)]);
    }
    const uykuDk: Record<string, number> = {};
    if (var_('SleepSession')) {
      const u = await HC.readRecords('SleepSession', { timeRangeFilter: aralik(new Date(bas.getTime() - 864e5 / 2), bit) });
      for (const s of (u && u.records) || []) {
        const b0 = new Date(s.startTime), b1 = new Date(s.endTime), k = gunK(b1);
        // aşama bilgisi varsa yalnız uyku aşamaları (1 = uyanık, 3 = yataktan çıktı, 7 = yatakta uyanık sayılmaz)
        let dk = (b1.getTime() - b0.getTime()) / 60000;
        if (Array.isArray(s.stages) && s.stages.length) dk = s.stages.filter((a: { stage: number }) => ![1, 3, 7].includes(Number(a.stage)))
          .reduce((t: number, a: { startTime: string; endTime: string }) => t + (new Date(a.endTime).getTime() - new Date(a.startTime).getTime()) / 60000, 0);
        uykuDk[k] = (uykuDk[k] || 0) + Math.max(0, dk);
      }
    }
    const kilo: [string, number][] = [];
    if (var_('Weight')) {
      const w = await HC.readRecords('Weight', { timeRangeFilter: aralik(bas, bit) });
      for (const s of (w && w.records) || []) if (s.weight && s.weight.inKilograms) kilo.push([gunK(new Date(s.time)), Math.round(s.weight.inKilograms * 10) / 10]);
    }
    return { ok: true, kaynak: 'google', adim, uyku: Object.entries(uykuDk).map(([k, v]) => [k, Math.round(v / 6) / 10]), kilo };
  }
  return { ok: false, yok: true };
}

// ---------- köprü ----------
export function createExtraBridge(call: Call, barkodAc: (etiket: BarkodEtiket) => void) {
  return {
    handle(m: { t?: string;[k: string]: any }): boolean {
      switch (m.t) {
        case 'foto':
          fotoAl(String(m.kaynak || 'galeri')).then((r) => call('__lfOnFoto', r), (e) => call('__lfOnFoto', { ok: false, hata: hataYaz(e) }));
          return true;
        case 'barkod':
          barkodAc((m.l || {}) as BarkodEtiket);
          return true;
        case 'urun':
          urunAra(String(m.kod || '')).then((r) => call('__lfOnUrun', { ...r, kod: m.kod, n: m.n }), (e) => call('__lfOnUrun', { ok: false, ag: true, hata: hataYaz(e), kod: m.kod, n: m.n }));
          return true;
        case 'saglik':
          saglikOku(Number(m.gun) || 14).then((r) => call('__lfOnSaglik', r), (e) => call('__lfOnSaglik', { ok: false, hata: hataYaz(e) }));
          return true;
        case 'paylas': {
          const text = String(m.text || ''), url = String(m.url || '');
          // Android'de url alanı yok → metne eklenir; iOS'ta ayrı alan (önizleme kartı)
          const msg = Platform.OS === 'ios' ? { message: text, url: url || undefined, title: String(m.title || '') } : { message: url ? text + '\n' + url : text, title: String(m.title || '') };
          Share.share(msg).then((r) => call('__lfOnPaylas', { ok: r.action === Share.sharedAction }), () => call('__lfOnPaylas', { ok: false }));
          return true;
        }
      }
      return false;
    },
  };
}

const st = StyleSheet.create({
  kaplama: { ...StyleSheet.absoluteFill, backgroundColor: '#000', zIndex: 50 },
  orta: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  metin: { color: '#fff', fontSize: 17, textAlign: 'center', lineHeight: 24, marginBottom: 18 },
  cerceve: { position: 'absolute', left: '12%', right: '12%', top: '34%', height: '18%', borderWidth: 3, borderColor: '#16a36b', borderRadius: 16 },
  alt: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingBottom: 28, paddingTop: 16, backgroundColor: 'rgba(0,0,0,0.55)' },
  ipucu: { color: '#fff', fontSize: 15, textAlign: 'center', marginBottom: 14, lineHeight: 21 },
  satir: { flexDirection: 'row', justifyContent: 'center', gap: 10, flexWrap: 'wrap' },
  dug: { backgroundColor: '#16a36b', paddingVertical: 13, paddingHorizontal: 16, borderRadius: 14, minWidth: 96, flexShrink: 1, alignItems: 'center' },
  cerceveOk: { borderColor: '#4ade80', backgroundColor: 'rgba(74,222,128,0.12)' },
  okunanKutu: { position: 'absolute', left: 0, right: 0, top: '54%', alignItems: 'center' },
  okunanMetin: { color: '#fff', fontSize: 20, fontWeight: '800', backgroundColor: 'rgba(22,163,107,0.9)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, overflow: 'hidden' },
  ikincil: { backgroundColor: 'rgba(255,255,255,0.18)' },
  dugMetin: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
