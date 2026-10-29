// Tanıtım sayfası için küçük önbellek (uygulamanın kendi önbelleği /app/sw.js'te)
const SURUM = 'diyet-site-v1';
self.addEventListener('install', e => { e.waitUntil(caches.open(SURUM).then(c => c.addAll(['/'])).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(a => Promise.all(a.filter(x => x.startsWith('diyet-site-') && x !== SURUM).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  // /app/ altını uygulamanın kendi servis çalışanı yönetir
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.pathname.startsWith('/app/')) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok && e.request.mode === 'navigate') caches.open(SURUM).then(c => c.put('/', r.clone())); return r; })
    .catch(() => caches.match(e.request.mode === 'navigate' ? '/' : e.request)));
});
