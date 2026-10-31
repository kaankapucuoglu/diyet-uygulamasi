// LifeFit: depo kökündeki yayın dosyalarını (tek dosya index.html + sw.js + manifest + icons/ + legal/) uygulama içi pakete (web/) KOPYALAR.
// Paketleme/derleme yok (uygulama tek dosya; index.html'i kaynak/derle.py üretir — önce onu çalıştırın).
//  - index.html: <head> başına app-shim.js eklenir (köprü; WebView ayrıca enjekte eder, çift çalışma korumalı).
//    Service worker kaydı yerel uygulamada çalışmamalı: kaynak zaten https kontrolü yapıyor; yapmıyorsa `if (!window.__LF_NATIVE && …)` ile sarmalanır.
//  - icons/: yalnız index.html / manifest / sw.js'in andığı simgeler (eski kopyalar pakete girmez).
//  - shim/app-shim.js → web/app-shim.js + src/shimSource.ts (WebView'e enjekte edilen kopya; depoya girer).
// Kullanım: npm run sync-web   (SYNC_OUT=klasör → başka yere üret)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = process.env.SYNC_OUT ? path.resolve(process.env.SYNC_OUT) : path.join(ROOT, 'web');

const cp = (a, b) => { fs.mkdirSync(path.dirname(b), { recursive: true }); fs.copyFileSync(a, b); };
const must = (p) => { if (!fs.existsSync(p)) throw new Error('[sync-web] yok: ' + path.relative(ROOT, p)); return p; };
const kb = (p) => (fs.statSync(p).size / 1024).toFixed(0) + ' KB';

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// ---- index.html ----
let html = fs.readFileSync(must(path.join(ROOT, 'index.html')), 'utf8');
if (!/viewport-fit=cover/.test(html)) throw new Error('[sync-web] index.html: viewport-fit=cover yok');
if (/<script[^>]*type="module"/.test(html)) throw new Error('[sync-web] index.html: ES modül betiği var — kabuk tek dosya (klasik betik) bekler');
// köprü betiği: charset meta'sından hemen sonra (uygulama betiklerinden önce çalışmalı)
const TAG = '<script src="app-shim.js"></script>';
if (!/app-shim\.js/.test(html)) {
  const n0 = html.length;
  html = html.replace(/<meta charset="[^"]*">/i, (m) => m + '\n' + TAG);
  if (html.length === n0) html = html.replace(/<head>/i, (m) => m + '\n' + TAG);
}
if ((html.match(/app-shim\.js/g) || []).length !== 1) throw new Error('[sync-web] app-shim.js eklenemedi / birden fazla');
// service worker: yerel uygulamada (file://) kayıt olmamalı
const swLine = html.split('\n').find((l) => l.includes('serviceWorker.register('));
let swNote = 'yok';
if (swLine) {
  if (/location\.protocol|__LF_NATIVE/.test(swLine)) swNote = 'kaynakta korumalı';
  else {
    const before = html;
    html = html.replace(/if \('serviceWorker' in navigator/g, "if (!window.__LF_NATIVE && 'serviceWorker' in navigator");
    if (html === before) throw new Error('[sync-web] serviceWorker kaydı korumasız ve otomatik sarmalanamadı — kaynak/ içinde kontrol edin');
    swNote = '__LF_NATIVE ile sarmalandı';
  }
}
fs.writeFileSync(path.join(OUT, 'index.html'), html);

// ---- sw.js, manifest ----
for (const f of ['sw.js', 'manifest.webmanifest']) { const p = path.join(ROOT, f); if (fs.existsSync(p)) cp(p, path.join(OUT, f)); }

// ---- icons/: yalnız anılanlar ----
const refs = new Set();
for (const f of ['index.html', 'manifest.webmanifest', 'sw.js']) {
  const p = path.join(ROOT, f);
  if (fs.existsSync(p)) for (const m of fs.readFileSync(p, 'utf8').matchAll(/icons\/([\w.\-]+)/g)) refs.add(m[1]);
}
let iconCount = 0;
for (const name of refs) {
  const p = path.join(ROOT, 'icons', name);
  if (fs.existsSync(p)) { cp(p, path.join(OUT, 'icons', name)); iconCount++; }
  else console.warn('[sync-web] uyarı: anılan simge yok: icons/' + name);
}

// ---- legal/ (gizlilik, koşullar — uygulama içinden açılabilir) ----
const legalDir = path.join(ROOT, 'legal');
let legalCount = 0;
if (fs.existsSync(legalDir)) {
  for (const f of fs.readdirSync(legalDir)) {
    if (/\.(html?|css|png|svg|jpe?g|webp|pdf)$/i.test(f)) { cp(path.join(legalDir, f), path.join(OUT, 'legal', f)); legalCount++; }
  }
}

// ---- köprü betiği ----
const shim = fs.readFileSync(must(path.join(ROOT, 'shim', 'app-shim.js')), 'utf8');
fs.writeFileSync(path.join(OUT, 'app-shim.js'), shim);
if (!process.env.SYNC_OUT) {
  fs.mkdirSync(path.join(ROOT, 'src'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'src', 'shimSource.ts'),
    '// OTOMATİK ÜRETİLİR (scripts/sync-web.mjs) — düzenlemeyin, shim/app-shim.js dosyasını düzenleyin.\n' +
    'export const SHIM_SOURCE: string = ' + JSON.stringify(shim) + ';\n');
}
console.log(`web/ hazır → ${OUT}\n  index.html ${kb(path.join(OUT, 'index.html'))} · app-shim.js ${kb(path.join(OUT, 'app-shim.js'))} · simge ${iconCount} · legal ${legalCount} · service worker: ${swNote}`);
