// Çevrimdışı çalışma: ilk açılışta uygulama dosyaları telefona kaydedilir, sonra internetsiz de açılır.
// Yeni sürüm yayınlarken SURUM'u artır; eski önbellek silinir.
const SURUM = 'diyet-v18';
const DOSYALAR = ['./', './index.html', './manifest.webmanifest', './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SURUM).then(c => c.addAll(DOSYALAR)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(adlar => Promise.all(adlar.filter(a => a !== SURUM).map(a => caches.delete(a)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const istek = e.request;
  if (istek.method !== 'GET' || new URL(istek.url).origin !== location.origin) return;
  // Sayfa: önce internet (güncel sürüm), 4 sn'de cevap yoksa ya da internet yoksa kayıtlı kopya
  if (istek.mode === 'navigate'){
    e.respondWith(new Promise(coz => {
      let bitti = false;
      const yedek = () => caches.match('./index.html').then(r => { if (!bitti){ bitti = true; coz(r); } });
      const zaman = setTimeout(yedek, 4000);
      fetch(istek).then(r => {
        clearTimeout(zaman);
        if (r.ok) caches.open(SURUM).then(c => c.put('./index.html', r.clone()));
        if (!bitti){ bitti = true; coz(r); }
      }).catch(() => { clearTimeout(zaman); yedek(); });
    }));
    return;
  }
  // Diğer dosyalar (simgeler, manifest): önce kayıtlı kopya
  e.respondWith(caches.match(istek).then(r => r || fetch(istek).then(y => {
    if (y.ok) caches.open(SURUM).then(c => c.put(istek, y.clone()));
    return y;
  })));
});
