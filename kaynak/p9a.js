// ---------- Hesap (sunucu) ve çevrimdışı-önce eşitleme ----------
// Sözleşme: docs/API.md. Veri her zaman önce cihazda (kaydet); hesap varsa 3 sn sonra sunucuya da yazılır (PUT /data, rev ile).
// Sunucu daha yeniyse (409 / açılışta GET) mevcut verileriBirlestir ile birleştirilir, sonra yeniden gönderilir.
// Hesapsızken hiçbir ağ isteği yapılmaz (sıralama görüntüleme hariç).
const API_BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://127.0.0.1:8097/api' : 'https://diyet.maviplay.com/api';
const RIZA_SURUM = '2026-11-01-2';            // sunucu RIZA_SURUM ile aynı; rıza metni değişince ikisi birden artar
const HESAP_ANAHTAR = ANAHTAR + '_hesap';   // localStorage: {token, kullanici, rev, son}
const ISTEK_SURE = 10000;                   // her istek 10 sn
// Ülke: tarayıcı dilinin bölgesi (tr-TR → TR); yoksa uygulama dilinden tahmin
function ulke(){
  try { const m = /[-_]([A-Za-z]{2})(\b|$)/.exec(navigator.language || ''); if (m) return m[1].toUpperCase(); } catch(e){}
  return {tr:'TR', de:'DE', ru:'RU'}[dil] || '';
}

const Hesap = (() => {
  let H = null;   // {token, kullanici, rev, son}; rev = yerel verinin eşit olduğu sunucu sürümü (-1: bilinmiyor → çek-birleştir)
  const oku = () => { try { H = JSON.parse(localStorage.getItem(HESAP_ANAHTAR) || 'null'); } catch(e){ H = null; } if (!H || !H.token) H = null; return H; };
  const yaz = () => { try { if (H) localStorage.setItem(HESAP_ANAHTAR, JSON.stringify(H)); else localStorage.removeItem(HESAP_ANAHTAR); } catch(e){} };
  const duyur = () => document.dispatchEvent(new CustomEvent('esitle'));
  oku();
  // Belirteç geçersiz / hesap silinmiş: oturum düşer, yerel veri kalır
  function dusur(){ H = null; yaz(); if (window.Esitle) Esitle.sifirla(); duyur(); }
  // Tüm istekler: JSON gövde, 10 sn zaman aşımı. Hata → {status, error, ...} fırlatır (status 0: ağ yok / zaman aşımı)
  async function istek(yontem, yol, govde, secenek = {}){
    const ctl = new AbortController(), z = setTimeout(() => ctl.abort(), ISTEK_SURE);
    const basliklar = {'Content-Type': 'application/json'};
    const tok = secenek.token || (secenek.auth !== false && H ? H.token : '');
    if (tok) basliklar.Authorization = 'Bearer ' + tok;
    let r;
    try { r = await fetch(API_BASE + yol, {method: yontem, headers: basliklar, body: govde === undefined ? undefined : JSON.stringify(govde), signal: ctl.signal, cache: 'no-store'}); }
    catch(e){ clearTimeout(z); throw {status: 0, error: e && e.name === 'AbortError' ? 'timeout' : 'network'}; }
    clearTimeout(z);
    let j = null;
    try { j = await r.json(); } catch(e){ j = null; }
    if (!r.ok){
      const hata = {status: r.status, ...(j && typeof j === 'object' ? j : {error: 'server'})};
      if (r.status === 401 && hata.error === 'auth' && H && !secenek.token) dusur();
      throw hata;
    }
    return j;
  }
  const oturumAc = (r, rev) => { H = {token: r.token, kullanici: r.user, rev, son: 0}; yaz(); duyur(); return r.user; };
  return {
    istek,
    durum: () => ({giris: !!H, kullanici: H ? H.kullanici : null, token: H ? H.token : null}),
    _oturum: () => H, _yaz: yaz,
    kullaniciGuncelle(u){ if (H){ H.kullanici = u; yaz(); duyur(); } },
    // Yeni hesap: sunucuda veri yok → yerel veri gönderilir (rev 0)
    async kaydol(u, p, consent){ return oturumAc(await istek('POST', '/register', {username: u, password: p, lang: dil, country: ulke(), consent}, {auth: false}), 0); },
    // Giriş: sunucudaki veri bilinmiyor → ilk çekimde birleştirilir
    async gir(u, p){ return oturumAc(await istek('POST', '/login', {username: u, password: p}, {auth: false}), -1); },
    async cik(){ try { if (H) await istek('POST', '/logout'); } catch(e){} dusur(); },
    async sil(p){ await istek('DELETE', '/account', {password: p}); dusur(); },
    async sifre(eski, yeni){ const r = await istek('POST', '/password', {old: eski, new: yeni}); if (H && r.token){ H.token = r.token; yaz(); } return r; },
    async riza(c){ const r = await istek('POST', '/consent', c); if (H){ H.kullanici = {...H.kullanici, consent: r.consent, lb_optin: r.lb_optin}; yaz(); duyur(); } return r; },
    async ben(){ const r = await istek('GET', '/me'); if (H){ H.kullanici = r.user; yaz(); } return r.user; },
    kontrol: u => istek('GET', '/users/check?u=' + encodeURIComponent(u), undefined, {auth: false}),
    disaAktar: () => istek('GET', '/export'),
    paylas: (kind, to, payload, title) => istek('POST', '/share', {kind, to: to || null, payload, title: title || ''}),
    gelenKutusu: () => istek('GET', '/inbox'),
    paylasimAl: kod => istek('GET', '/share/' + encodeURIComponent(kod)),
    goruldu: kod => istek('POST', '/share/' + encodeURIComponent(kod) + '/seen'),
    siralama: (scope, country) => istek('GET', `/leaderboard?scope=${scope}&me=1${country ? '&country=' + encodeURIComponent(country) : ''}`),
    istatistik: st => istek('PUT', '/stats', st)
  };
})();

const Esitle = {durum: 'kapali', hata: '', gelen: 0, son: 0};
(() => {
  let kirliMi = false, seri = 0, zaman = null, ucusta = false, geri = null, hataSay = 0, sonGelen = 0, sonIstatistik = '';
  const giris = () => Hesap.durum().giris;
  function durumYaz(d, hata = ''){
    if (Esitle.durum === d && Esitle.hata === hata) return;
    Esitle.durum = d; Esitle.hata = hata;
    document.dispatchEvent(new CustomEvent('esitle'));
  }
  // Nesne anahtar sırasından bağımsız karşılaştırma (guncel sayılmaz): birleşim sunucudakiyle aynıysa yeniden göndermek gereksiz
  const kanonik = x => JSON.stringify(x, (k, v) => v && typeof v === 'object' && !Array.isArray(v) ? Object.keys(v).sort().reduce((o, a) => { if (v[a] !== undefined) o[a] = v[a]; return o; }, {}) : v);
  function esitMi(gelen){ try { return kanonik({...D, guncel: 0}) === kanonik({...tamamla(kopya(gelen)), guncel: 0}); } catch(e){ return false; } }
  // Sunucudan gelen veriyi yerelle birleştir (p7b verileriBirlestir): sessiz — bildirim, log satırı ve pencere kapatma yok, bakılan gün korunur
  function birlestir(gelen){
    if (!gelen || typeof gelen !== 'object' || gelen.v !== 2) return false;
    const t0 = toast, l0 = logEkle, k0 = kapat, aktif0 = aktif, detay0 = detayAcik;
    toast = () => {}; logEkle = () => {}; kapat = () => {};
    try { verileriBirlestir(gelen); }
    catch(e){ console.warn('eşitleme: birleştirme başarısız', e); return false; }
    finally { toast = t0; logEkle = l0; kapat = k0; }
    if (aktif !== aktif0 && $('kurulum').hidden){ aktif = aktif0; detayAcik = detay0; ciz(); }
    return true;
  }
  function geriPlanla(){
    clearTimeout(geri);
    hataSay = Math.min(hataSay + 1, 6);
    geri = setTimeout(() => { if (kirliMi) gonder(); else cek(); }, 15000 * Math.pow(2, hataSay - 1));   // 15 sn, 30 sn, 1 dk … 8 dk
  }
  function hataIsle(e){
    if (!e || e.status === 0) { durumYaz(navigator.onLine ? 'hata' : 'cevrimdisi', 'network'); geriPlanla(); return; }
    if (e.status === 401){ durumYaz('kapali'); return; }   // oturum düştü (Hesap.dusur)
    if (e.status === 403 && e.error === 'consent'){ durumYaz('hata', 'consent'); return; }   // rıza verilince kirli() yeniden tetikler
    durumYaz('hata', e.error || 'server'); geriPlanla();
  }
  // kaydet() sonrası: 3 sn bekle, art arda değişiklikleri tek istekte topla
  function kirli(){
    if (!giris()) return;
    kirliMi = true; seri++;
    if (!ucusta) durumYaz(navigator.onLine ? 'bekliyor' : 'cevrimdisi');
    clearTimeout(zaman); zaman = setTimeout(gonder, 3000);
  }
  async function gonder(){
    clearTimeout(zaman);
    if (!giris() || !kirliMi) return;
    if (!navigator.onLine){ durumYaz('cevrimdisi'); return; }   // online olayında devam
    if (ucusta){ zaman = setTimeout(gonder, 1500); return; }
    const H = Hesap._oturum(), s0 = seri;
    ucusta = true; durumYaz('gonderiliyor');
    try {
      const r = await Hesap.istek('PUT', '/data', {base_rev: Math.max(0, H.rev), updated_at: D.guncel || 0, data: D});
      H.rev = r.rev; H.son = Date.now(); Hesap._yaz(); hataSay = 0;
      if (seri === s0) kirliMi = false;
      Esitle.son = H.son;
    } catch(e){
      ucusta = false;
      if (e && e.status === 409 && e.data !== undefined){
        // sunucu daha yeni: birleştir, aynıysa bitti; farklıysa birleşimi gönder
        birlestir(e.data); H.rev = e.rev; H.son = Date.now(); Hesap._yaz();
        if (esitMi(e.data)){ kirliMi = false; durumYaz('esit'); }
        else if (hataSay < 3){ hataSay++; return gonder(); }
        else { hataSay = 0; durumYaz('hata', 'conflict'); }
        return;
      }
      if (e && e.status === 409){ H.rev = e.rev; Hesap._yaz(); return gonder(); }   // sunucuda veri yok, rev kaymış
      hataIsle(e); return;
    }
    ucusta = false;
    if (kirliMi) return gonder();
    durumYaz('esit'); istatistikGonder();
  }
  // Açılış, online ve öne gelişte: sunucudaki sürüm bilinenden farklıysa birleştir
  async function cek(){
    if (!giris() || !navigator.onLine || ucusta) return;
    const H = Hesap._oturum();
    ucusta = true;
    try {
      const r = await Hesap.istek('GET', '/data');
      if (r.data == null){ H.rev = r.rev || 0; if (D.ayar.kurulum){ kirliMi = true; seri++; } }
      else if (r.rev !== H.rev){
        birlestir(r.data); H.rev = r.rev;   // birleştirme kaydet() → kirli() çağırır; sonuç sunucudakiyle aynıysa göndermeye gerek yok
        kirliMi = !esitMi(r.data);
        if (kirliMi) seri++;
      }
      H.son = Date.now(); Esitle.son = H.son; Hesap._yaz(); hataSay = 0;
    } catch(e){ ucusta = false; hataIsle(e); return; }
    ucusta = false;
    if (kirliMi) await gonder(); else { durumYaz('esit'); istatistikGonder(); }
    gelenKutusuSay();
  }
  // Sıralama için seri / gün / su ortalaması (yalnız katılım açıksa, değer değişince, en çok 10 dk'da bir)
  function istatistikHesapla(){
    const K = D.kayit || {}, gunler = Object.keys(K).filter(k => K[k] && Object.values(K[k].yendi || {}).some(Boolean)).sort(), kume = new Set(gunler);
    let streak = 0, k = bugunK();
    if (!kume.has(k)) k = gunEkle(k, -1);
    while (kume.has(k)){ streak++; k = gunEkle(k, -1); }
    const son = gunler.slice(-30), bardak = D.profil.bardak || 250;
    const water_avg = son.length ? Math.round(son.reduce((t, g) => t + (K[g].su || 0) * bardak, 0) / son.length) : 0;
    return {streak, days: gunler.length, water_avg, country: ulke()};
  }
  let istatistikZaman = 0;
  async function istatistikGonder(zorla = false){
    const u = Hesap.durum().kullanici;
    if (!u || !u.lb_optin || !navigator.onLine) return null;
    const st = istatistikHesapla(), imza = JSON.stringify(st);
    if (!zorla && imza === sonIstatistik && Date.now() - istatistikZaman < 600000) return null;
    try { const r = await Hesap.istatistik(st); sonIstatistik = imza; istatistikZaman = Date.now(); return r; } catch(e){ return null; }
  }
  // Gelen kutusu: okunmamış sayısı (en çok dakikada bir); artınca kısa bildirim
  let gelenZaman = 0;
  async function gelenKutusuSay(zorla = false){
    if (!giris() || !navigator.onLine || (!zorla && Date.now() - gelenZaman < 60000)) return;
    gelenZaman = Date.now();
    try {
      const l = await Hesap.gelenKutusu(), n = l.filter(x => !x.seen).length;
      if (n > sonGelen && sonGelen >= 0 && Esitle.son) toast('📥 ' + T('ibT') + ': ' + n);
      sonGelen = n;
      if (Esitle.gelen !== n){ Esitle.gelen = n; document.dispatchEvent(new CustomEvent('esitle')); }
    } catch(e){}
  }
  Object.assign(Esitle, {
    kirli, gonder, cek, gelenKutusuSay, istatistikGonder, istatistikHesapla, esitMi,
    kirliMi: () => kirliMi,
    // Çıkış / hesap silme: kuyruk boşalır, rozet kapanır
    sifirla(){ clearTimeout(zaman); clearTimeout(geri); kirliMi = false; ucusta = false; hataSay = 0; sonGelen = 0; Esitle.gelen = 0; Esitle.son = 0; durumYaz('kapali'); },
    // Giriş sonrası: sunucudaki veriyi çek (yerel bilinmiyor sayılır), bekleyen varsa gönder
    async ilkCek(){ const H = Hesap._oturum(); if (!H) return; if (H.rev < 0 || !Esitle.son) ucusta = false; await cek(); },
    // Ayarlar › Şimdi eşitle
    async simdi(){ hataSay = 0; clearTimeout(geri); if (!giris()){ durumYaz('kapali'); return; } await cek(); if (kirliMi) await gonder(); await gelenKutusuSay(true); }
  });
  window.addEventListener('online', () => { if (!giris()) return; durumYaz(kirliMi ? 'bekliyor' : 'esit'); hataSay = 0; cek(); });
  window.addEventListener('offline', () => { if (giris()) durumYaz('cevrimdisi'); });
  document.addEventListener('visibilitychange', () => {
    if (!giris()) return;
    if (document.visibilityState === 'visible') cek();
    else if (kirliMi) gonder();   // arka plana atılırken bekletmeden gönder
  });
  if (giris()){ durumYaz(navigator.onLine ? 'bekliyor' : 'cevrimdisi'); setTimeout(cek, 1200); }
})();
// Üst düzey const bağları window'da görünmez: p5 kaydet() kancası (window.Esitle) ve test sayfaları için
window.Hesap = Hesap; window.Esitle = Esitle; window.RIZA_SURUM = RIZA_SURUM;
