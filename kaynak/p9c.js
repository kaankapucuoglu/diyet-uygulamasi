// ---------- Reklam ve "Reklamları kaldır" (tek seferlik satın alma) — YALNIZ yerel kabukta (window.__LF_NATIVE) ----------
// Düz tarayıcıda (diyet.maviplay.com) reklam yok, satın alma bölümü çizilmez, hiçbir fonksiyon sarmalanmaz.
// Köprü sözleşmesi (kabuk tarafı: ads.ts / iap.ts):
//   web → kabuk  window.__lfPost({t:'ad:init', noAds}) · {t:'ad:noads', on} · {t:'ad:show', kind:'inter', id} · {t:'ad:privacy'}
//                {t:'iap:init', skus} · {t:'iap:buy', productId} · {t:'iap:ack', transactionId} · {t:'iap:sweep'} · {t:'iap:restore'}
//   kabuk → web  window.__lfAd({t:'ad:status', rewarded, inter, privacy, reason?} | {t:'ad:result', id, kind, ok, error?})
//                window.__lfIap({t:'iap:status', available, reason?} | {t:'iap:products', products:[{id, displayPrice, currency, price}]} |
//                               {t:'iap:result', ok, productId, transactionId?, restored?, pending?, cancelled?, error?} | {t:'iap:restored', ok})
//   Shim, bu parça yüklenene dek gelen kabuk mesajlarını window.__lfAdQ / window.__lfIapQ kuyruğunda tutar → açılışta sırayla işlenir.
// Sıklık (emsal ücretsiz diyet/kalori uygulamaları gibi, rahatsız etmeden): yalnız geçiş reklamı, ödüllü yok.
//   Tetikler: program oluşturma/yenileme bitince · her 5. yemek ekleme / "Yedim" · her 4. gün değiştirme · paylaşım/rapor penceresi kapanınca.
//   Sınırlar: reklamsız → asla · kurulum sihirbazı, onay/rıza penceresi, kullanım turu, rapor açıkken asla · ilk açılıştan sonraki 10 dk asla ·
//   iki reklam arası ≥180 sn · günde ≤8 · reklam hazır değilse (ad:status inter:false) sessizce atla.
//   Sayaçlar localStorage 'lf_reklam' anahtarında (cihaza özgü, eşitlenmez): {ilk, son, gun, n, s:{yemek, gun}, noads}
Object.assign(S, {
  rkT:["Reklamlar","Ads","Реклама","Werbung","الإعلانات"],
  rkIntro:["Uygulama ücretsizdir; ara sıra reklam gösterir.","The app is free and shows an occasional ad.","Приложение бесплатное и иногда показывает рекламу.","Die App ist kostenlos und zeigt gelegentlich Werbung.","التطبيق مجاني ويعرض إعلانات من حين لآخر."],
  rkKaldir:["Reklamları kaldır · {f}","Remove ads · {f}","Убрать рекламу · {f}","Werbung entfernen · {f}","إزالة الإعلانات · {f}"],
  rkTekSefer:["Tek seferlik ödeme; abonelik değildir.","One-time payment, not a subscription.","Разовый платёж, не подписка.","Einmalzahlung, kein Abo.","دفعة واحدة، وليست اشتراكاً."],
  rkGeriYukle:["Satın alımları geri yükle","Restore purchases","Восстановить покупки","Käufe wiederherstellen","استعادة المشتريات"],
  rkGizlilik:["Reklam gizlilik seçenekleri","Ad privacy options","Настройки конфиденциальности рекламы","Datenschutzoptionen für Werbung","خيارات خصوصية الإعلانات"],
  rkReklamsiz:["Reklamsız sürüm ✓ Teşekkürler","Ad-free version ✓ Thank you","Версия без рекламы ✓ Спасибо","Werbefreie Version ✓ Danke","نسخة بلا إعلانات ✓ شكراً لك"],
  rkMagazaYok:["Mağazaya bağlanılamadı. Biraz sonra yeniden dene.","Couldn't connect to the store. Please try again later.","Не удалось подключиться к магазину. Попробуйте позже.","Keine Verbindung zum Store. Bitte versuche es später erneut.","تعذّر الاتصال بالمتجر. حاول مرة أخرى لاحقاً."],
  rkTesekkur:["Teşekkürler! Reklamlar kaldırıldı 🎉","Thank you! Ads removed 🎉","Спасибо! Реклама отключена 🎉","Danke! Die Werbung ist entfernt 🎉","شكراً لك! أُزيلت الإعلانات 🎉"],
  rkGeriOk:["Satın alımın geri yüklendi; reklamlar kapalı.","Purchase restored; ads are off.","Покупка восстановлена, реклама отключена.","Kauf wiederhergestellt; die Werbung ist aus.","تمت استعادة الشراء؛ الإعلانات متوقفة."],
  rkGeriYok:["Geri yüklenecek satın alım bulunamadı.","No purchases to restore.","Нет покупок для восстановления.","Keine Käufe zum Wiederherstellen gefunden.","لا توجد مشتريات لاستعادتها."],
  rkBekliyor:["Ödeme bekleniyor; onaylanınca reklamlar kendiliğinden kapanır.","Payment pending; ads will turn off once it's confirmed.","Ожидается оплата; после подтверждения реклама отключится сама.","Zahlung ausstehend; nach der Bestätigung wird die Werbung automatisch ausgeschaltet.","الدفع قيد الانتظار؛ ستتوقف الإعلانات تلقائياً بعد تأكيده."],
  rkHata:["Satın alma tamamlanamadı. Yeniden dene.","The purchase couldn't be completed. Please try again.","Не удалось завершить покупку. Попробуйте ещё раз.","Der Kauf konnte nicht abgeschlossen werden. Bitte versuche es erneut.","تعذّر إتمام الشراء. حاول مرة أخرى."]
});

const NOADS_URUN = 'com.maviplay.liferoutine.noads';
const REKLAM_ANAHTAR = 'lf_reklam';
const REKLAM = {ilkSure: 10 * 60000, aralik: 180000, gunluk: 8, yemekHer: 5, gunHer: 4, gecikme: 1000, fiyat: '99,99 TL'};
// magaza: null = henüz bilinmiyor, true/false = iap:status · aliniyor/geriYukleniyor: düğme kilidi · sonNoAds: kabuğa en son bildirilen
const Reklam = {inter: false, privacy: false, magaza: null, fiyat: '', aliniyor: false, geriYukleniyor: false, bekliyor: false, sonNoAds: null, sonSupur: 0};
const yerelKabuk = () => !!window.__LF_NATIVE;
function lfGonder(o){ try { if (window.__lfPost) window.__lfPost(o); } catch(e){} }   // shim yoksa no-op
function rdOku(){ try { const v = JSON.parse(localStorage.getItem(REKLAM_ANAHTAR) || 'null'); return v && typeof v === 'object' ? v : {}; } catch(e){ return {}; } }
function rdYaz(R){ try { localStorage.setItem(REKLAM_ANAHTAR, JSON.stringify(R)); } catch(e){} }
// Reklamsız: D.ayar.reklamsiz (hesapla eşitlenir) ya da cihaz yansısı lf_reklam.noads (yedekten dönüş vb. D değişse de kaybolmasın)
const reklamsizMi = () => !!((D && D.ayar && D.ayar.reklamsiz) || rdOku().noads);

// İlk açılış: D.ayar.ilkAcilis yoksa şimdi yazılır. kaydet() ÇAĞRILMAZ — açılışta kaydetmek IndexedDB'deki daha yeni kopyayı
// boş durumla ezebilir; değer bir sonraki doğal kayıtla kalıcı olur. Cihaz yansısı lf_reklam.ilk: eşitlemeyle gelen eski tarih de
// bu cihazdaki ilk 10 dakikayı korusun diye ikisinin büyüğü alınır.
function ilkAcilis(){
  const R = rdOku(), simdi = Date.now();
  if (!(R.ilk > 0)){ R.ilk = simdi; rdYaz(R); }
  if (D && D.ayar && !(D.ayar.ilkAcilis > 0)) D.ayar.ilkAcilis = R.ilk;
  return Math.max(R.ilk, (D && D.ayar && D.ayar.ilkAcilis) || 0);
}
// Şu an geçiş reklamı gösterilebilir mi? (tüm sınırlar burada; tetik anında değil, gösterim anında denetlenir)
function reklamUygun(){
  if (!yerelKabuk() || reklamsizMi() || !Reklam.inter || document.visibilityState === 'hidden') return false;
  if (!D || !D.ayar || !D.ayar.kurulum || !$('kurulum').hidden || document.body.classList.contains('wiz-acik')) return false;   // kurulum sihirbazı (W)
  if ($('overlay').classList.contains('open') && $('sheet').querySelector('#onayEvet, #impEvet, #rKvkk, #rSaglik')) return false;   // onay / rıza penceresi
  if ($('tur') || $('rapor') || ($('koc') && !$('koc').hidden)) return false;   // kullanım turu, rapor belgesi, başkası için program ekranı
  const R = rdOku(), simdi = Date.now(), ilk = ilkAcilis();
  if (ilk <= simdi && simdi - ilk < REKLAM.ilkSure) return false;
  if (R.son > 0 && R.son <= simdi && simdi - R.son < REKLAM.aralik) return false;   // saat geri alındıysa (son > şimdi) kilitlenmez
  if (R.gun === bugunK() && (R.n || 0) >= REKLAM.gunluk) return false;
  return true;
}
function reklamGoster(){
  if (!reklamUygun()) return;
  const R = rdOku(), bugun = bugunK();
  if (R.gun !== bugun){ R.gun = bugun; R.n = 0; }
  R.n = (R.n || 0) + 1; R.son = Date.now();
  const id = 'i' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  rdYaz(R);
  lfGonder({t: 'ad:show', kind: 'inter', id});
}
// Tetik: 'program' | 'yemek' (her 5.) | 'gun' (her 4.) | 'paylas' | 'rapor'. Gösterim kısa gecikmeyle (ekran çizilsin, bildirim görünsün).
let reklamSessiz = 0, reklamZaman = null;
function reklamTetik(neden){
  if (!yerelKabuk() || reklamSessiz || reklamsizMi()) return;
  const her = {yemek: REKLAM.yemekHer, gun: REKLAM.gunHer}[neden];
  if (her){
    const R = rdOku(), s = R.s && typeof R.s === 'object' ? R.s : (R.s = {});
    s[neden] = ((s[neden] || 0) + 1) % her;
    rdYaz(R);
    if (s[neden]) return;
  }
  clearTimeout(reklamZaman);
  reklamZaman = setTimeout(reklamGoster, REKLAM.gecikme);
}
// Kabuğa reklamsız durumunu bildir (yalnız değişince); D başka kaynaktan gelip reklamsız dediyse cihaz yansısı da yazılır
function reklamsizBildir(ilk){
  const on = reklamsizMi();
  if (on && D && D.ayar && !D.ayar.reklamsiz) D.ayar.reklamsiz = true;   // bir sonraki doğal kayıtla kalıcı olur
  if (on && !rdOku().noads){ const R = rdOku(); R.noads = true; rdYaz(R); }
  if (Reklam.sonNoAds === on) return;
  Reklam.sonNoAds = on;
  lfGonder(ilk ? {t: 'ad:init', noAds: on} : {t: 'ad:noads', on});
}

// ---------- Kabuk → web ----------
window.__lfAd = function(m){
  if (!m || typeof m !== 'object') return;
  if (m.t === 'ad:status'){
    const p0 = Reklam.privacy;
    Reklam.inter = !!m.inter; Reklam.privacy = !!m.privacy;
    if (p0 !== Reklam.privacy) reklamBolumuCiz();
    return;
  }
  // Reklam süresince kabuk uygulamayı zaten duraklatır; sonrasında yalnız zaman damgası (180 sn bekleme reklam kapanınca başlar)
  if (m.t === 'ad:result'){ const R = rdOku(); R.son = Date.now(); rdYaz(R); }
};
window.__lfIap = function(m){
  if (!m || typeof m !== 'object') return;
  if (m.t === 'iap:status'){ Reklam.magaza = !!m.available; reklamBolumuCiz(); return; }
  if (m.t === 'iap:products'){
    const p = (Array.isArray(m.products) ? m.products : []).find(x => x && x.id === NOADS_URUN);
    if (p && p.displayPrice) Reklam.fiyat = String(p.displayPrice);
    reklamBolumuCiz(); return;
  }
  if (m.t === 'iap:result'){ satinAlmaSonucu(m); return; }
  if (m.t === 'iap:restored'){
    Reklam.geriYukleniyor = false;
    if (!m.ok) toast(T('rkMagazaYok'));
    else if (!reklamsizMi()) toast(T('rkGeriYok'));
    reklamBolumuCiz();
  }
};
// Satın alma / geri yükleme / bekleyen işlem sonucu. Sıra: teslim (D.ayar) → kaydet() → mağazaya onay (iap:ack) → kabuğa reklamsız
function satinAlmaSonucu(m){
  Reklam.aliniyor = false;
  if (m.ok && m.productId === NOADS_URUN){
    const tx = m.transactionId != null && m.transactionId !== '' ? String(m.transactionId) : '';
    const liste = Array.isArray(D.ayar.iapTx) ? D.ayar.iapTx : [];
    if (tx && liste.includes(tx)){ lfGonder({t: 'iap:ack', transactionId: tx}); reklamBolumuCiz(); return; }   // aynı işlem yeniden geldi: yalnız onay
    const onceden = reklamsizMi();
    D.ayar.reklamsiz = true;
    if (tx) D.ayar.iapTx = liste.concat(tx).slice(-50);
    Reklam.bekliyor = false;
    kaydet();
    const R = rdOku(); R.noads = true; rdYaz(R);
    if (tx) lfGonder({t: 'iap:ack', transactionId: tx});
    Reklam.sonNoAds = true; lfGonder({t: 'ad:noads', on: true});
    clearTimeout(reklamZaman);
    if (m.restored) toast(T('rkGeriOk'), 3500);
    else if (!onceden) toast(T('rkTesekkur'), 3500);
    reklamBolumuCiz();
    return;
  }
  if (m.pending){ Reklam.bekliyor = true; toast(T('rkBekliyor'), 4000); }
  else if (!m.cancelled && !m.ok) toast(T('rkHata'));   // iptal sessiz
  reklamBolumuCiz();
}

// ---------- Ayarlar › Reklamlar bölümü (hesap bölümünün hemen altında; yalnız yerel kabukta) ----------
document.head.insertAdjacentHTML('beforeend', `<style>
.rk-kart b{color:var(--green)}
#reklamBolum .wmsg{margin-top:8px}
</style>`);
function reklamBolumuEkle(){
  if (!yerelKabuk()) return;
  const sb = $('sbody'); if (!sb || $('reklamBolum')) return;
  const kutu = document.createElement('div'); kutu.id = 'reklamBolum';
  sb.appendChild(kutu);   // yeri ayarSirala() belirler (kullanım turunun altı)
  reklamBolumuCiz();
  // Kapanmamış (onaylanmamış / bekleyen) işlemleri kabuktan yeniden iste — ayarlar içi yeniden çizimlerde en çok 20 sn'de bir
  if (Date.now() - Reklam.sonSupur > 20000){ Reklam.sonSupur = Date.now(); lfGonder({t: 'iap:sweep'}); }
}
function reklamBolumuCiz(){
  const el = $('reklamBolum'); if (!el) return;
  const gizlilik = Reklam.privacy ? `<button class="btn ghost" id="rkGizlilikBtn">${T('rkGizlilik')}</button>` : '';
  if (reklamsizMi()){
    el.innerHTML = `<div class="sec">📢 ${T('rkT')}</div><div class="cur rk-kart"><b>✨ ${esc(T('rkReklamsiz'))}</b></div>`
      + (gizlilik ? `<div class="acts hs-acts" style="margin-top:0">${gizlilik}</div>` : '');
  } else {
    const kapali = Reklam.magaza === false, ios = window.__LF_NATIVE && window.__LF_NATIVE.platform === 'ios';
    el.innerHTML = `<div class="sec">📢 ${T('rkT')}</div><div class="hint">${esc(T('rkIntro'))}</div>
      <div class="acts hs-acts"><button class="btn green" id="rkAlBtn" ${kapali || Reklam.aliniyor ? 'disabled' : ''}>${esc(T('rkKaldir', {f: Reklam.fiyat || REKLAM.fiyat}))}</button>${ios ? `<button class="btn ghost" id="rkGeriBtn" ${kapali || Reklam.geriYukleniyor ? 'disabled' : ''}>${T('rkGeriYukle')}</button>` : ''}${gizlilik}</div>
      ${kapali ? `<div class="wmsg warn">${esc(T('rkMagazaYok'))}</div>` : `<div class="hint" style="margin-top:6px">${esc(T('rkTekSefer'))}</div>`}
      ${Reklam.bekliyor ? `<div class="wmsg info">${esc(T('rkBekliyor'))}</div>` : ''}`;
  }
  const al = $('rkAlBtn'), geri = $('rkGeriBtn'), gz = $('rkGizlilikBtn');
  if (al) al.onclick = () => {
    Reklam.aliniyor = true; reklamBolumuCiz();
    lfGonder({t: 'iap:buy', productId: NOADS_URUN});
    clearTimeout(Reklam._z); Reklam._z = setTimeout(() => { Reklam.aliniyor = false; reklamBolumuCiz(); }, 60000);   // kabuk yanıt vermezse düğme açılır
  };
  if (geri) geri.onclick = () => {
    Reklam.geriYukleniyor = true; reklamBolumuCiz();
    lfGonder({t: 'iap:restore'});
    setTimeout(() => { if (Reklam.geriYukleniyor){ Reklam.geriYukleniyor = false; reklamBolumuCiz(); } }, 30000);
  };
  if (gz) gz.onclick = () => lfGonder({t: 'ad:privacy'});
}

// ---------- Yalnız yerel kabukta: açılış mesajları ve tetik sarmalamaları (web'de mevcut davranış hiç değişmez) ----------
if (yerelKabuk()){
  ilkAcilis();
  reklamsizBildir(true);                                   // {t:'ad:init', noAds}
  lfGonder({t: 'iap:init', skus: [NOADS_URUN]});

  // Ayarlar penceresine Reklamlar bölümü (p9b'nin hesap sarmalamasının üstüne)
  const ayarlarAcR0 = ayarlarAc;
  ayarlarAc = function(){ const r = ayarlarAcR0.apply(this, arguments); reklamBolumuEkle(); return r; };
  // D başka kaynaktan yenilenince (IndexedDB, yedek, eşitleme birleştirmesi → baslat2) reklamsız durumu kabuğa yeniden bildir
  const baslat2R0 = baslat2;
  baslat2 = function(){ const r = baslat2R0.apply(this, arguments); reklamsizBildir(false); return r; };

  // 1) Haftalık program oluşturma/yenileme bitince (sihirbaz sonu, menüyü sıfırla, hedef/ölçü ya da hamilelik değişince)
  const planYenileR0 = planYenile;
  planYenile = function(){ const r = planYenileR0.apply(this, arguments); reklamTetik('program'); return r; };
  // Ayarlar'da antrenman günü seçerken her dokunuşta plan yenilenir → bu yoldan reklam yok
  const antrenmanGunuDegisR0 = antrenmanGunuDegis;
  antrenmanGunuDegis = function(){ reklamSessiz++; try { return antrenmanGunuDegisR0.apply(this, arguments); } finally { reklamSessiz--; } };

  // 2) Öğüne yemek ekleme ve "Yedim" işareti (ikisi tek sayaç, her 5.'de)
  const ogeEkleR0 = ogeEkle;
  ogeEkle = function(){ const r = ogeEkleR0.apply(this, arguments); reklamTetik('yemek'); return r; };
  const yedimDegisR0 = yedimDegis;
  yedimDegis = function(oi){
    const r = yedimDegisR0.apply(this, arguments);
    try { const o = menuOku(aktif)[oi]; if (o && kayitOku(aktif).yendi[o.id]) reklamTetik('yemek'); } catch(e){}   // yalnız "yedim" (geri alma sayılmaz)
    return r;
  };

  // 3) Gün değiştirme (gün düğmesi, hafta okları, "Bugün"; her 4.'de). Tıklama p7.js'teki satır içi dinleyicide işlenir (sarmalanacak fonksiyon yok):
  //    yakalama aşamasında önceki gün alınır, kabarcık aşamasında (p7 dinleyicisinden sonra) değiştiyse sayılır.
  const wrapEl = document.querySelector('.wrap');
  if (wrapEl){
    let gunOnce = null;
    wrapEl.addEventListener('click', e => { const b = e.target.closest('button'); gunOnce = b && (b.dataset.tarih || b.dataset.hafta || b.dataset.bugun) ? aktif : null; }, true);
    wrapEl.addEventListener('click', () => { if (gunOnce !== null && aktif !== gunOnce) reklamTetik('gun'); gunOnce = null; });
  }

  // 4) "Yediklerimi paylaş" penceresi kapanınca (Önizle → rapor açılırsa gösterim anında rapor açık olduğu için atlanır)
  const kapatR0 = kapat;
  kapat = function(){
    const pay = $('overlay').classList.contains('open') && !!$('shKopya');
    const r = kapatR0.apply(this, arguments);
    if (pay) reklamTetik('paylas');
    return r;
  };
  // 5) Rapor (belge görünümü) kapanınca — #rpKapat kendi onclick'iyle raporu kaldırır, bu dinleyici ondan sonra çalışır
  document.addEventListener('click', e => { if (e.target.closest && e.target.closest('#rpKapat')) reklamTetik('rapor'); });

  // Shim'in kuyrukladığı kabuk mesajları (bu parça yüklenmeden gelen ad:status, iap:status/products, açılışta teslim edilen iap:result…)
  for (const [q, f] of [['__lfAdQ', window.__lfAd], ['__lfIapQ', window.__lfIap]]){
    const kuyruk = Array.isArray(window[q]) ? window[q].splice(0) : [];
    kuyruk.forEach(m => { try { f(m); } catch(e){ console.warn('kabuk mesajı işlenemedi', e); } });
  }
}

// ---------- Ayarlar sırası (kullanıcı 01.11): sık kullanılanlar üstte, gereksizler aşağıda; en altta hesap ve sıfırla ----------
const AYAR_SIRA = ['ust', 'tur', 'reklam', 'program', 'tasi', 'yedek', 'olcu', 'saat', 'hedef', 'profil', 'regl', 'yukle', 'spor', 'antrenman', 'bildirim', 'yasal', 'sifirla'];
let rkGozlemci = null;
function ayarSirala(){
  const sb = $('sbody'); if (!sb) return;
  const bul = k => k === 'reklam' ? $('reklamBolum') : sb.querySelector(`:scope > .ayar-blok[data-ak="${k}"]`);
  for (const k of AYAR_SIRA){ const el = bul(k); if (el) sb.appendChild(el); }
  rkTitresimKur();
}
// Reklamlar kartı: ayarlar açılınca bir kez titrer; aşağı kaydırılıp yeniden göründüğünde ("Reklamları kaldır") tekrar titrer
function rkTitresimKur(){
  if (rkGozlemci){ rkGozlemci.disconnect(); rkGozlemci = null; }
  const el = $('reklamBolum'), sb = $('sbody');
  if (!el || !sb || reklamsizMi()) return;
  el.classList.add('rk-kutu');
  const titret = () => { el.classList.remove('titre'); void el.offsetWidth; el.classList.add('titre'); };
  el.addEventListener('animationend', () => el.classList.remove('titre'));
  let ayrildi = true;   // ilk görünüşte titresin
  if (!('IntersectionObserver' in window)){ setTimeout(titret, 350); return; }
  rkGozlemci = new IntersectionObserver(girdiler => {
    for (const g of girdiler){
      if (g.isIntersecting && g.intersectionRatio >= 0.6){ if (ayrildi){ ayrildi = false; setTimeout(titret, 250); } }
      else if (!g.isIntersecting) ayrildi = true;
    }
  }, {root: sb, threshold: [0, 0.6]});
  rkGozlemci.observe(el);
}
{
  const ayarlarAcS0 = ayarlarAc;
  ayarlarAc = function(){ const r = ayarlarAcS0.apply(this, arguments); ayarSirala(); return r; };
}

// ---------- Sunucu kaldırıldı (01.11.2026): eski sürümden kalan hesap oturumu temizlenir; tüm veriler yalnız cihazda ----------
try { localStorage.removeItem(ANAHTAR + '_hesap'); } catch(e){}
// ---------- Yakınlaştırma kapalı (kullanıcı 01.11): iki parmakla büyütme engellenir (iOS gesture* + çoklu dokunma) ----------
['gesturestart', 'gesturechange', 'gestureend'].forEach(ad => document.addEventListener(ad, e => e.preventDefault(), {passive: false}));
document.addEventListener('touchmove', e => { if (e.touches && e.touches.length > 1) e.preventDefault(); }, {passive: false});
