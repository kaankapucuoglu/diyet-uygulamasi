// LifeRoutine — yerel kabuk: web uygulamasını (tek dosya index.html) tam ekran WebView içinde çalıştırır.
//  • Yayın derlemesi: uygulama paketin içinde (çevrimdışı) — Android file:///android_asset/www, iOS <App>.app/www
//    (plugins/withBundledWeb.js). web/ klasörünü scripts/sync-web.mjs üretir (yalnız kopya; paketleme yok).
//  • Geliştirme (Expo Go): EXPO_PUBLIC_APP_URL (ör. http://192.168.1.102:8085/) bilgisayardaki sunucudan yükler.
//  • Köprü (shim/app-shim.js ↔ onMessage): window.__LF_NATIVE bilgi nesnesi; __lfNotify / __lfCancelNotify / __lfCancelAll /
//    __lfNotifyPermission (yerel bildirim, expo-notifications), __lfDownload + <a download> yakalama (dosya → paylaş sayfası,
//    expo-file-system + expo-sharing), dış bağlantılar (https/mailto/tel/sms/whatsapp) tarayıcıda / ilgili uygulamada.
//  • Reklam (AdMob geçiş reklamı, ads.ts) + "Reklamları kaldır" satın alması (expo-iap, iap.ts): web tarafı kaynak/p9c.js;
//    kabuk → web mesajları window.__lfAd / window.__lfIap (shim kuyruklar). Sistem çubukları görünür; güvenli alan (çentik, durum/gezinme çubuğu) payı yerel tarafta dolgu olarak
//    uygulanır → WebView çubukların altına girmez, sayfadaki env(safe-area-inset-*) 0 kalır (CSS yedek değerleri geçerli).
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, BackHandler, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationBar } from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Haptics from 'expo-haptics';
import * as Notifications from 'expo-notifications';
import * as Sharing from 'expo-sharing';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Directory, File, Paths } from 'expo-file-system';
import { SHIM_SOURCE } from './src/shimSource';
import { createIapBridge } from './iap';
import { createAdsBridge } from './ads';

SplashScreen.preventAutoHideAsync().catch(() => {});
SplashScreen.setOptions({ fade: true, duration: 300 });

// Uygulama ön plandayken gelen bildirim de görünsün (öğün saati uygulama açıkken gelirse)
Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: true, shouldSetBadge: false }),
});

const BG = '#f3f6fb';                 // web uygulamasının --bg rengi (kaynak/p1.html): sistem çubuklarının arkası
const APP_NAME = Constants.expoConfig?.name || 'LifeRoutine';   // görünen ad TEK YER: app.config.js APP_NAME
// ---- Uygulama adresi: TEK YER ----
// Boş → uygulamaya gömülü web/. Dolu → o adresten yükle (Expo Go / geliştirme).
const APP_URL = (process.env.EXPO_PUBLIC_APP_URL || '').trim();
const IS_EXPO_GO = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
const BOOT_TIMEOUT_MS = 30000;
const CHANNEL_ID = 'ogun2';          // 01.11: kilit ekranında içerik gizli (PRIVATE); Android var olan kanalı değiştirmediği için yeni kimlik           // Android bildirim kanalı (öğün hatırlatmaları); app.json expo-notifications defaultChannel ile aynı
const EXTERNAL = /^(https?|mailto|tel|sms|whatsapp):/i;
// Sayfaya yüklenmeden önce iletilen bilgi: web tarafı `window.__LF_NATIVE && window.__lfNotify` ile köprüyü kullanır.
const NATIVE_CFG = 'window.__LF_NATIVE=' + JSON.stringify({
  platform: Platform.OS, name: APP_NAME,
  version: Constants.expoConfig?.version || '', build: String(Constants.expoConfig?.ios?.buildNumber || Constants.expoConfig?.android?.versionCode || ''),
}) + ';';

type Source = { uri: string; readAccess?: string; bundled: boolean };

function bundledSource(): Source | null {
  if (Platform.OS === 'android') return { uri: 'file:///android_asset/www/index.html', bundled: true };
  if (Platform.OS === 'ios') {
    let base = Paths.bundle.uri;              // file:///…/LifeRoutine.app/
    if (!base.endsWith('/')) base += '/';
    return { uri: base + 'www/index.html', readAccess: base + 'www/', bundled: true };
  }
  return null;
}

function pickSource(): Source | null {
  if (APP_URL) return { uri: APP_URL, bundled: false };
  if (IS_EXPO_GO) return null;               // Expo Go'da gömülü dosya yok
  return bundledSource();
}

function openExternal(u: string) {
  if (EXTERNAL.test(u)) Linking.openURL(u).catch(() => {});
}

// ---------- yerel bildirimler ----------
type NotifyMsg = { id?: string; title?: string; body?: string; hour?: number; minute?: number; repeat?: string; weekday?: number; at?: number; channelName?: string };

function clampInt(v: unknown, lo: number, hi: number, dflt: number) {
  const n = Math.floor(Number(v));
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : dflt;
}
function isGranted(p: Notifications.NotificationPermissionsStatus) {
  return p.granted || p.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED || p.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
}
async function ensurePermission(ask: boolean): Promise<boolean> {
  let p = await Notifications.getPermissionsAsync();
  if (!isGranted(p) && ask && p.canAskAgain !== false) {
    p = await Notifications.requestPermissionsAsync({ ios: { allowAlert: true, allowSound: true, allowBadge: false } });
  }
  return isGranted(p);
}
async function ensureChannel(name?: string) {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
    name: name || 'Öğün hatırlatmaları',
    importance: Notifications.AndroidImportance.HIGH,
    sound: 'default',
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#16a36b',
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PRIVATE,
  });
}
async function scheduleNotify(m: NotifyMsg): Promise<string> {
  if (!(await ensurePermission(true))) throw new Error('permission');
  await ensureChannel(m.channelName);
  const id = String(m.id || 'lf-' + Date.now());
  await Notifications.cancelScheduledNotificationAsync(id).catch(() => {});   // aynı kimlik → üzerine yaz
  const hour = clampInt(m.hour, 0, 23, 12), minute = clampInt(m.minute, 0, 59, 0);
  let trigger: Notifications.NotificationTriggerInput;
  if (m.at) trigger = { type: Notifications.SchedulableTriggerInputTypes.DATE, date: Math.max(Number(m.at), Date.now() + 5000), channelId: CHANNEL_ID };
  else if (m.repeat === 'weekly') trigger = { type: Notifications.SchedulableTriggerInputTypes.WEEKLY, weekday: clampInt(m.weekday, 1, 7, 1), hour, minute, channelId: CHANNEL_ID };
  else trigger = { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute, channelId: CHANNEL_ID };
  await Notifications.scheduleNotificationAsync({
    identifier: id,
    content: { title: String(m.title || APP_NAME), body: String(m.body || ''), sound: 'default', data: { id } },
    trigger,
  });
  return id;
}

// ---------- dosya indirme → kullanıcı klasör seçer → oraya kaydedilir ----------
// 02.11: önce "İndirildi" yazıp sonra paylaş sayfası açılıyordu. Artık önce konum seçtirilir; yalnız dosya yazılınca
// web tarafına {ok:true} döner ("İndirildi" bildirimi o zaman çıkar). Vazgeçilirse {ok:false, cancel:true} → sessiz.
// Seçici yoksa / açılamazsa eski yol: önbellek + paylaş sayfası ({ok:true, shared:true} → "İndirildi" yazılmaz).
type DownloadMsg = { name?: string; data?: string; b64?: string; mime?: string };
type DownloadResult = { ok: boolean; name?: string; cancel?: boolean; shared?: boolean; err?: string };

function downloadMeta(m: DownloadMsg) {
  const name = String(m.name || 'liferoutine.txt').replace(/[\\/:*?"<>|\u0000-\u001f]+/g, '_').slice(0, 120) || 'liferoutine.txt';
  const ext = (name.split('.').pop() || '').toLowerCase();
  const mime = String(m.mime || '').split(';')[0].trim()
    || ({ json: 'application/json', html: 'text/html', htm: 'text/html', txt: 'text/plain', csv: 'text/csv', pdf: 'application/pdf', png: 'image/png' } as Record<string, string>)[ext]
    || 'application/octet-stream';
  return { name, mime };
}
function writeContent(f: File, m: DownloadMsg) {
  if (m.b64 != null) f.write(String(m.b64), { encoding: 'base64' });
  else f.write(String(m.data ?? ''));
}
const isCancel = (e: any) => /cancel/i.test(String((e && (e.code || e.message)) || e));

async function saveToPickedFolder(m: DownloadMsg): Promise<DownloadResult> {
  const { name, mime } = downloadMeta(m);
  let dir: Directory;
  try { dir = await Directory.pickDirectoryAsync(); }
  catch (e) {
    if (isCancel(e)) return { ok: false, cancel: true };
    return shareFallback(m);                    // seçici bu cihazda yok → paylaş sayfası
  }
  if (!dir) return { ok: false, cancel: true };
  let f: File;
  if (Platform.OS === 'android') f = dir.createFile(name, mime);   // SAF klasörü: aynı ad varsa sistem "(1)" ekler
  else {
    const dot = name.lastIndexOf('.'), kok = dot > 0 ? name.slice(0, dot) : name, uz = dot > 0 ? name.slice(dot) : '';
    f = new File(dir, name);
    for (let i = 2; f.exists && i < 100; i++) f = new File(dir, `${kok} (${i})${uz}`);
    f.create();
  }
  writeContent(f, m);
  return { ok: true, name: f.name || name };
}

async function shareFallback(m: DownloadMsg): Promise<DownloadResult> {
  const { name, mime } = downloadMeta(m);
  const dir = new Directory(Paths.cache, 'paylas');
  dir.create({ intermediates: true, idempotent: true });
  const f = new File(dir, name);
  if (f.exists) f.delete();
  writeContent(f, m);
  if (!(await Sharing.isAvailableAsync())) throw new Error('Paylaşım bu cihazda kullanılamıyor');
  const UTI = mime === 'application/json' ? 'public.json' : mime === 'text/html' ? 'public.html' : mime.startsWith('text/') ? 'public.plain-text' : undefined;
  await Sharing.shareAsync(f.uri, { mimeType: mime, dialogTitle: name, UTI });
  return { ok: true, name, shared: true };
}

function Shell() {
  const insets = useSafeAreaInsets();
  const web = useRef<WebView>(null);
  const [source] = useState<Source | null>(pickSource);
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState<string | null>(null);
  const ready = useRef(false);
  const splashDone = useRef(false);
  const canGoBack = useRef(false);
  const pendingTap = useRef<Record<string, unknown> | null>(null);

  const hideSplash = useCallback(() => {
    if (splashDone.current) return;
    splashDone.current = true;
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  useEffect(() => { const t = setTimeout(hideSplash, 8000); return () => clearTimeout(t); }, [hideSplash]);
  useEffect(() => { if (!source) hideSplash(); }, [source, hideSplash]);

  const js = useCallback((code: string) => { web.current?.injectJavaScript(`try{${code}}catch(e){};true;`); }, []);
  // web tarafındaki isteğe bağlı geri bildirim fonksiyonu (tanımlıysa) çağrılır
  const call = useCallback((fn: string, arg: unknown) => js(`window.${fn}&&window.${fn}(${JSON.stringify(arg)})`), [js]);

  // Android bildirim kanalı açılışta hazır olsun (sistem ayarlarında görünür)
  useEffect(() => { ensureChannel().catch(() => {}); }, []);

  // Satın alma (Reklamları kaldır): iap.ts → web window.__lfIap(msg); açılışta mağazaya ön bağlantı
  const iap = useMemo(() => createIapBridge((msg) => js(`window.__lfIap&&window.__lfIap(${JSON.stringify(msg)})`)), [js]);
  useEffect(() => () => iap.dispose(), [iap]);
  useEffect(() => { iap.prefetch().catch(() => {}); }, [iap]);
  // Reklamlar (AdMob geçiş reklamı): ads.ts → web window.__lfAd(msg); reklam açıkken sayfa arka plana alınır
  const ads = useMemo(() => createAdsBridge(
    (msg) => js(`window.__lfAd&&window.__lfAd(${JSON.stringify(msg)})`),
    (state) => js(`window.__lfApp&&window.__lfApp(${JSON.stringify(state)})`),
  ), [js]);
  useEffect(() => () => ads.dispose(), [ads]);
  // Reklam SDK'sı web 'ad:init' (reklamsız mı?) bildirince başlar; açılışta önceden yüklenmez (reklamsız kullanıcıda hiç başlamaz)

  // Bildirime dokunma → uygulama açılır (ek yönlendirme yok); web isterse window.__lfOnNotificationTap ile öğrenir
  useEffect(() => {
    const deliver = (r: Notifications.NotificationResponse | null) => {
      if (!r) return;
      const data = { id: r.notification.request.identifier, ...(r.notification.request.content.data || {}) };
      if (ready.current) call('__lfOnNotificationTap', data); else pendingTap.current = data;
    };
    Notifications.getLastNotificationResponseAsync().then(deliver).catch(() => {});
    const sub = Notifications.addNotificationResponseReceivedListener(deliver);
    return () => sub.remove();
  }, [call]);

  // arka plan / ön plan → sayfaya bildir (web: document 'lf:appstate' olayı)
  useEffect(() => {
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'background' || s === 'inactive') js(`window.__lfApp&&window.__lfApp('background')`);
      else if (s === 'active') { js(`window.__lfApp&&window.__lfApp('active')`); iap.sweepNow().catch(() => {}); }   // bekleyen ödeme bu arada tamamlanmış olabilir
    });
    return () => sub.remove();
  }, [js, iap]);

  // Android geri tuşu: web pencere/panel kapatırsa (window.__lfBack → true) biter; alt sayfada geri; ana ekranda uygulamadan çık
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      js(`var h=window.__lfBack?window.__lfBack():false;window.__lfPost&&window.__lfPost({t:'back',handled:!!h});`);
      return true;
    });
    return () => sub.remove();
  }, [js]);

  // açılış zaman aşımı → yedek ekran
  useEffect(() => {
    if (!source) return;
    ready.current = false;
    const t = setTimeout(() => { if (!ready.current) setFailed('Uygulama zamanında açılamadı.'); }, BOOT_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [source, attempt]);

  const onMessage = useCallback((e: WebViewMessageEvent) => {
    let m: any;
    try { m = JSON.parse(e.nativeEvent.data); } catch { return; }
    switch (m && m.t) {
      case 'boot': break;
      case 'ready':
        ready.current = true; setFailed(null); hideSplash();
        if (pendingTap.current) { call('__lfOnNotificationTap', pendingTap.current); pendingTap.current = null; }
        break;
      case 'err':
        if (__DEV__) console.warn('[web]', m.m, m.s, m.l);
        break;
      case 'vib': {
        const ms = +m.ms || 20;
        const style = ms <= 25 ? Haptics.ImpactFeedbackStyle.Light : ms <= 60 ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Heavy;
        Haptics.impactAsync(style).catch(() => {});
        break;
      }
      case 'back':
        if (!m.handled) {
          if (canGoBack.current) web.current?.goBack();
          else BackHandler.exitApp();
        }
        break;
      case 'openUrl': openExternal(String(m.url || '')); break;
      // dosya indirme (program HTML / JSON yedek) → klasör seç + kaydet
      case 'download':
        saveToPickedFolder(m).then(
          (r) => call('__lfOnDownload', r),
          (err) => call('__lfOnDownload', { ok: false, err: String((err && err.message) || err) }),
        );
        break;
      // yerel bildirimler
      case 'notify':
        scheduleNotify(m).then(
          (id) => call('__lfOnNotifyResult', { id, ok: true }),
          (err) => call('__lfOnNotifyResult', { id: m.id, ok: false, err: String((err && err.message) || err) }),
        );
        break;
      case 'notify:cancel': Notifications.cancelScheduledNotificationAsync(String(m.id)).catch(() => {}); break;
      case 'notify:cancelAll': Notifications.cancelAllScheduledNotificationsAsync().catch(() => {}); break;
      case 'notify:permission':
        ensurePermission(true).then((ok) => call('__lfOnPermission', ok), () => call('__lfOnPermission', false));
        break;
      // satın alma (Reklamları kaldır)
      case 'iap:init': iap.init(m.skus); break;
      case 'iap:buy': iap.buy(m.productId); break;
      case 'iap:ack': iap.ack(m.transactionId); break;
      case 'iap:sweep': iap.sweepNow(); break;
      case 'iap:restore': iap.restore(); break;
      // reklamlar
      case 'ad:init': ads.init(m); break;
      case 'ad:noads': ads.setNoAds(m.on); break;
      case 'ad:show': ads.show(m.kind, m.id); break;
      case 'ad:privacy': ads.privacy(); break;
    }
  }, [hideSplash, call, iap, ads]);

  const gone = useRef(0);   // çizim süreci ölüm sayısı (onRenderProcessGone)
  const retry = useCallback(() => { setFailed(null); setAttempt((a) => a + 1); }, []);

  if (!source) {
    return (
      <View style={[styles.center, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
        <Text style={styles.title}>{APP_NAME}</Text>
        {__DEV__ ? (
          <Text style={styles.body}>
            Expo Go'da uygulama bilgisayardaki sunucudan yüklenir.{'\n\n'}
            1) Depo kökünde: python -m http.server 8085{'\n'}
            2) Bu projede .env dosyasına:{'\n'}EXPO_PUBLIC_APP_URL=http://BILGISAYAR-IP:8085/{'\n'}
            3) npx expo start ile yeniden başlatın.
          </Text>
        ) : (
          <Text style={styles.body}>Uygulama dosyaları bulunamadı. Lütfen uygulamayı yeniden yükleyin.</Text>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>
      <WebView
        key={attempt}
        ref={web}
        source={{ uri: source.uri }}
        style={styles.web}
        containerStyle={styles.web}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        incognito={false}
        cacheEnabled
        // gömülü dosyalar (file://)
        allowFileAccess
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        allowingReadAccessToURL={source.readAccess}
        // kamera / mikrofon yok
        mediaCapturePermissionGrantType="deny"
        // kaydırma var (uzun sayfa); esneme / yakınlaştırma yok
        bounces={false}
        // iOS yeni mimaride (Fabric) decelerationRate verilmezse yerel değişken 0 kalıyor → ana sayfa parmak kalkınca anında
        // duruyordu (atalet yok). "normal" = 0.998 (Safari ile aynı); iç kaydırma kutuları (Program hazırla) etkilenmiyordu.
        decelerationRate="normal"
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        setBuiltInZoomControls={false}
        setDisplayZoomControls={false}
        textZoom={100}
        allowsLinkPreview={false}
        // Android kodgen bu özelliği dizi bekler; metin verilince açılışta ClassCastException ile çöküyordu (10.10, Redmi Note 8)
        dataDetectorTypes={Platform.OS === 'ios' ? 'none' : undefined}
        allowsBackForwardNavigationGestures={false}
        pullToRefreshEnabled={false}
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        setSupportMultipleWindows={false}
        javaScriptCanOpenWindowsAutomatically={false}
        // performans
        androidLayerType="hardware"
        mixedContentMode={source.bundled ? 'never' : 'always'}
        webviewDebuggingEnabled={__DEV__}
        // köprü
        injectedJavaScriptBeforeContentLoaded={NATIVE_CFG + SHIM_SOURCE}
        injectedJavaScriptBeforeContentLoadedForMainFrameOnly
        injectedJavaScript={'true;'}
        onMessage={onMessage}
        onLoadEnd={() => { setTimeout(hideSplash, 800); }}
        onNavigationStateChange={(n) => { canGoBack.current = n.canGoBack; }}
        onShouldStartLoadWithRequest={(req) => {
          const u = req.url;
          if (/^(file|about|blob|data|javascript):/i.test(u)) return true;
          if (APP_URL && u.startsWith(new URL(APP_URL).origin)) return true;
          openExternal(u);   // dış bağlantılar tarayıcıda / ilgili uygulamada (mailto, wa.me, tel)
          return false;
        }}
        onError={(e) => { if (!ready.current) setFailed('Yükleme hatası: ' + e.nativeEvent.description); }}
        onContentProcessDidTerminate={() => web.current?.reload()}
        // Android'de çizim süreci (bellek) ölürse yeniden aç; 3 denemeden sonra açıklama + elle yeniden dene
        onRenderProcessGone={() => {
          gone.current += 1;
          if (gone.current > 3) { setFailed('Uygulama bu cihazda bellek yetersiz kaldığı için kapandı. Diğer uygulamaları kapatıp tekrar deneyin.'); return; }
          setAttempt((a) => a + 1);
        }}
      />
      {failed && (
        <View style={[styles.overlay, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
          <Text style={styles.title}>Uygulama açılamadı</Text>
          <Text style={styles.body}>{failed}</Text>
          <Pressable style={styles.btn} onPress={retry}><Text style={styles.btnText}>Tekrar dene</Text></Pressable>
        </View>
      )}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: BG }}>
      <StatusBar style="dark" />
      {Platform.OS === 'android' && <NavigationBar style="light" />}
      <Shell />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
  web: { flex: 1, backgroundColor: BG },
  center: { flex: 1, backgroundColor: BG, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  overlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(243,246,251,0.97)', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  title: { color: '#172338', fontSize: 26, fontWeight: '800', marginBottom: 16, textAlign: 'center' },
  body: { color: '#718096', fontSize: 16, lineHeight: 23, textAlign: 'center', marginBottom: 24 },
  btn: { backgroundColor: '#16a36b', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 14, marginTop: 10, minWidth: 220, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
