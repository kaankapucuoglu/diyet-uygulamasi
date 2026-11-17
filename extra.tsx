// LifeRoutine — sürüm 13 yerel köprüleri: öğün fotoğrafı, barkod tarayıcı, sağlık verisi (adım/uyku/kilo), paylaş.
// Tüm veri CİHAZDA kalır: fotoğraf küçültülüp (EXIF/konum atılır) yalnız web görünümüne verilir; tanıma web tarafında cihaz içinde (ai/tani.js).
// Sağlık verisi yalnız OKUNUR (Apple Health / Health Connect), sunucuya gitmez, reklamda kullanılmaz.
// Web → kabuk: {t:'foto', kaynak:'kamera'|'galeri'} · {t:'barkod', l:{...}} · {t:'saglik', gun} · {t:'paylas', text, url, title}
// Kabuk → web: __lfOnFoto({ok, data?, iptal?, hata?}) · __lfOnBarkod({ok, kod?, iptal?}) · __lfOnSaglik({ok, adim, uyku, kilo, hata?}) · __lfOnPaylas({ok})
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';

type Call = (fn: string, arg: unknown) => void;
const gunK = (d: Date) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const hataYaz = (e: unknown) => String((e && (e as Error).message) || e || 'hata').slice(0, 200);

// ---------- öğün fotoğrafı ----------
export async function fotoAl(kaynak: string): Promise<Record<string, unknown>> {
  const opt: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], quality: 0.85, allowsEditing: false, exif: false };
  let r: ImagePicker.ImagePickerResult;
  if (kaynak === 'kamera') {
    const izin = await ImagePicker.requestCameraPermissionsAsync();
    if (!izin.granted) return { ok: false, izin: false };
    r = await ImagePicker.launchCameraAsync(opt);
  } else {
    r = await ImagePicker.launchImageLibraryAsync(opt);
  }
  if (r.canceled || !r.assets || !r.assets.length) return { ok: false, iptal: true };
  const a = r.assets[0];
  // uzun kenar 768 px: tanıma 192 px'e kırpar, günlük küçük resmi 320 px; yeniden kodlama EXIF'i (konum) atar
  const w = a.width || 0, h = a.height || 0, uzun = Math.max(w, h) || 768;
  const ctx = ImageManipulator.manipulate(a.uri);
  if (uzun > 768) ctx.resize(w >= h ? { width: 768 } : { height: 768 });
  const img = await ctx.renderAsync();
  const out = await img.saveAsync({ format: SaveFormat.JPEG, compress: 0.82, base64: true });
  return { ok: true, data: 'data:image/jpeg;base64,' + out.base64, w: out.width, h: out.height };
}

// ---------- barkod tarayıcı (tam ekran) ----------
export type BarkodEtiket = { kapat?: string; ipucu?: string; izin?: string; izinVer?: string; fener?: string };
export function BarkodEkrani({ etiket, onSonuc }: { etiket: BarkodEtiket; onSonuc: (r: Record<string, unknown>) => void }) {
  const [izin, izinIste] = useCameraPermissions();
  const [fener, setFener] = useState(false);
  const bitti = useRef(false);
  const bitir = (r: Record<string, unknown>) => { if (bitti.current) return; bitti.current = true; onSonuc(r); };
  useEffect(() => { if (izin && !izin.granted && izin.canAskAgain) izinIste().catch(() => {}); }, [izin, izinIste]);
  const okundu = (e: BarcodeScanningResult) => {
    const kod = String(e.data || '').replace(/\D/g, '');
    if (kod.length >= 8 && kod.length <= 14) bitir({ ok: true, kod });
  };
  return (
    <View style={st.kaplama}>
      {izin && izin.granted ? (
        <CameraView style={StyleSheet.absoluteFill} facing="back" enableTorch={fener}
          barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'] }} onBarcodeScanned={okundu} />
      ) : (
        <View style={st.orta}>
          <Text style={st.metin}>{etiket.izin || 'Kamera izni gerekli.'}</Text>
          {izin && !izin.canAskAgain ? null : (
            <Pressable style={st.dug} onPress={() => izinIste().catch(() => {})}><Text style={st.dugMetin}>{etiket.izinVer || 'İzin ver'}</Text></Pressable>
          )}
        </View>
      )}
      {izin && izin.granted ? <View pointerEvents="none" style={st.cerceve} /> : null}
      <View style={st.alt}>
        <Text style={st.ipucu}>{etiket.ipucu || ''}</Text>
        <View style={st.satir}>
          {izin && izin.granted ? (
            <Pressable style={[st.dug, st.ikincil]} onPress={() => setFener((f) => !f)}><Text style={st.dugMetin}>{(fener ? '◉ ' : '○ ') + (etiket.fener || 'Fener')}</Text></Pressable>
          ) : null}
          <Pressable style={st.dug} onPress={() => bitir({ ok: false, iptal: true })}><Text style={st.dugMetin}>{etiket.kapat || 'Kapat'}</Text></Pressable>
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
  satir: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  dug: { backgroundColor: '#16a36b', paddingVertical: 13, paddingHorizontal: 22, borderRadius: 14, minWidth: 130, alignItems: 'center' },
  ikincil: { backgroundColor: 'rgba(255,255,255,0.18)' },
  dugMetin: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
