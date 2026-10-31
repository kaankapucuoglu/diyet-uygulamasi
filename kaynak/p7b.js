// ---------- Öğün saatleri (tarihli: değişiklik o günden itibaren geçerli, geçmiş bozulmaz) ----------
const SAAT_IDLER = ['kahvalti','ara0','ogle','ara1','aksam','gece'];
const OGUN_IKON = {kahvalti:'☀️', ara0:'🍏', ogle:'🥗', ara1:'🍎', aksam:'🍗', gece:'🌙'};
const VARSAYILAN_SAAT = {kahvalti:'08:30', ara0:'10:30', ogle:'12:00', ara1:'15:00', aksam:'19:30', gece:'21:30'};
const dk = s => { const [h, m] = String(s || '0:0').split(':').map(Number); return (h || 0) * 60 + (m || 0); };
const ssYaz = n => { n = sinirla(Math.round(n / 15) * 15, 0, 23 * 60 + 45); return String(Math.floor(n / 60)).padStart(2, '0') + ':' + String(n % 60).padStart(2, '0'); };
// Ana öğünlere göre ara öğünler: kuşluk = kahvaltı-öğle ortası, ikindi = öğle-akşam ortası, gece = akşamdan 2 saat sonra
function araHesapla(s){
  const k = dk(s.kahvalti), o = dk(s.ogle), a = dk(s.aksam);
  return {ara0: ssYaz((k + o) / 2), ara1: ssYaz((o + a) / 2), gece: ssYaz(Math.min(a + 120, 23 * 60 + 30))};
}
// Bir tarihte geçerli saat seti (o tarihe kadar yapılan son değişiklik)
function saatSeti(k){
  let s = {...VARSAYILAN_SAAT};
  OGUN_TANIM.forEach(o => s[o.id] = o.saat);
  (D.planlar[0] && D.planlar[0][0] || []).forEach(o => { if (o.saat) s[o.id] = o.saat; });
  for (const g of D.saatGecmis || []) if (g.t <= k) s = {...s, ...g.s};
  return s;
}
const ogunSaati = (k, o) => (D.kayit[k] && D.kayit[k].saat && D.kayit[k].saat[o.id]) || saatSeti(k)[o.id] || o.saat;
const ogunEt = (k, o) => `${ogunAd(o)} ${ogunSaati(k, o)}`;
// k gününden itibaren geçerli yeni saatler; sonraki tarihli değişiklikler bu seçimle geçersiz olur
function saatKaydet(k, s){
  const eski = saatSeti(k);
  const fark = SAAT_IDLER.filter(id => s[id] && s[id] !== eski[id]);
  if (!fark.length) return false;
  D.saatGecmis = (D.saatGecmis || []).filter(g => g.t < k).concat([{t:k, s:{...eski, ...s}}]);
  logEkle('diger', null, T('lSaat', {d: etiket(k), l: fark.map(id => `${T('m_' + id)} ${eski[id]} → ${s[id]}`).join(', ')}));
  return true;
}
// Öğün başlığındaki saate dokununca: yalnız bu gün ya da bu günden itibaren
function saatDuzenle(oi){
  const o = menuOku(aktif)[oi], simdi = ogunSaati(aktif, o);
  ac(esc(T('saatTitle', {o: ogunAd(o)})), `<input class="search saat-in" id="saatIn" type="time" value="${simdi}" step="300">
    <div class="hint" style="margin-top:6px">${esc(etiket(aktif))}</div>
    <div class="acts"><button class="btn ghost" id="saatGun">${T('saatBuGun')}</button><button class="btn green" id="saatHer">${T('saatHerGun')}</button></div>
    <div class="hint" style="margin-top:8px">${T('saatHint')}</div>`);
  const yeni = () => /^\d\d:\d\d$/.test($('saatIn').value) ? $('saatIn').value : null;
  $('saatGun').onclick = () => {
    const v = yeni(); if (!v) return;
    const r = kayitAl(aktif); r.saat = {...(r.saat || {}), [o.id]: v};
    if (v !== simdi) logEkle('diger', aktif, T('lSaatGun', {o: ogunAd(o), a: simdi, b: v}));
    kaydet(); kapat(); ciz(); toast(T('tSaat'));
  };
  $('saatHer').onclick = () => {
    const v = yeni(); if (!v) return;
    const r = D.kayit[aktif]; if (r && r.saat) delete r.saat[o.id];
    saatKaydet(aktif, {...saatSeti(aktif), [o.id]: v});
    kaydet(); kapat(); ciz(); toast(T('tSaat'));
  };
}
// Ayarlar: öğün saatleri formu
function saatFormu(){
  const s = saatSeti(bugunK()), ara0 = menuOku(bugunK()).some(o => o.id === 'ara0');
  const alan = (id, ad) => `<label class="field"><span>${ad}</span><input type="time" id="st_${id}" value="${s[id]}" step="300"></label>`;
  return `<div class="grid3">${alan('kahvalti', T('m_kahvalti'))}${alan('ogle', T('m_ogle'))}${alan('aksam', T('m_aksam'))}</div>
    <div class="grid3">${ara0 ? alan('ara0', T('m_ara0')) : ''}${alan('ara1', T('m_ara1'))}${alan('gece', T('m_gece'))}</div>
    <div class="acts" style="margin-top:4px"><button class="btn ghost" id="saatOto">${T('saatOto')}</button><button class="btn" id="saatKaydetBtn">${T('saatKaydet')}</button></div>
    <div class="hint" style="margin-top:6px">${T('saatHint')}</div>`;
}
function saatFormuBagla(){
  const oku = id => $('st_' + id) && /^\d\d:\d\d$/.test($('st_' + id).value) ? $('st_' + id).value : null;
  $('saatOto').onclick = () => {
    const ara = araHesapla({kahvalti: oku('kahvalti'), ogle: oku('ogle'), aksam: oku('aksam')});
    for (const [id, v] of Object.entries(ara)) if ($('st_' + id)) $('st_' + id).value = v;
  };
  $('saatKaydetBtn').onclick = () => {
    const s = {};
    SAAT_IDLER.forEach(id => { const v = oku(id); if (v) s[id] = v; });
    if (!(dk(s.kahvalti) < dk(s.ogle) && dk(s.ogle) < dk(s.aksam))){ toast(T('saatHata')); return; }
    if (saatKaydet(bugunK(), s)) kaydet();
    ciz(); toast(T('tSaat'));
  };
}

// ---------- Öğünleri gizle / göster (seçim kaydedilir, her açılışta aynı) ----------
const ogunKapali = id => { const k = D.ayar.kapali || {}; return k[id] != null ? !!k[id] : !!D.ayar.hepsiKapali; };
function ogunAracCiz(){
  const menu = menuOku(aktif), acikVar = menu.some(o => !ogunKapali(o.id));
  $('ogunArac').innerHTML = menu.length ? `<button class="btn ghost tog-all" data-togall="${acikVar ? 1 : 0}">${T(acikVar ? 'hideAll' : 'showAll')}</button>` : '';
}
function ogunTogla(id){
  const acilacak = ogunKapali(id);
  togCiz(() => { const b = $('ogunler').querySelector(`[data-tog="${CSS.escape(id)}"]`); return b && b.closest('.meal'); }, acilacak,
    () => { D.ayar.kapali = {...(D.ayar.kapali || {}), [id]: !acilacak}; });
}
function hepsiniTogla(kapat){
  togCiz(() => $('ogunArac'), !kapat,
    () => { D.ayar.hepsiKapali = !!kapat; D.ayar.kapali = {}; });
}
// Açınca: öğün baştan görünecek şekilde kaydır. Gizleyince: ekran yerinde kalsın
// (sayfa kısalınca tarayıcı kaydırmayı yukarı çekmesin diye listenin alt boşluğu gerektiği kadar korunur)
function togCiz(hedef, acildi, degistir){
  const liste = $('ogunler'), once = hedef(), y0 = once ? once.getBoundingClientRect().top : 0;
  const diger = document.documentElement.scrollHeight - liste.offsetHeight;
  liste.style.minHeight = acildi ? '' : Math.max(0, Math.ceil(scrollY + innerHeight - diger)) + 'px';
  degistir(); kaydet(); ogunleriCiz(); ogunAracCiz();
  const el = hedef(); if (!el) return;
  if (acildi) window.scrollTo({top: el.getBoundingClientRect().top + scrollY - 8, behavior: 'smooth'});
  else window.scrollBy(0, el.getBoundingClientRect().top - y0);
}

// ---------- Kopyalama yardımcısı ----------
function kopyala(metin, mesaj){
  const bitti = () => toast(mesaj || T('tCopied'));
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(metin).then(bitti, () => eskiKopya());
  else eskiKopya();
  function eskiKopya(){ const t = document.createElement('textarea'); t.value = metin; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); bitti(); } catch(e){} t.remove(); }
}

// ---------- Destek ol ----------
// "Destek oldum" → düğme titremesi ve pazar hatırlatması kalıcı olarak kapanır
function destekVerildi(){ D.ayar.destekVerdi = true; kaydet(); ciz(); toast(T('supThanks')); }
// Pazar günleri ana ekranda kibar hatırlatma (günde bir kez; destek olana hiç gösterilmez)
function destekHatirlat(bugun = bugunK()){
  if (!D.ayar.kurulum || D.ayar.destekVerdi || haftaGunu(bugun) !== 6 || D.ayar.destekHatirlatma === bugun) return;
  setTimeout(() => {
    if ($('overlay').classList.contains('open') || !$('kurulum').hidden || !$('koc').hidden || $('tur') || $('rapor')) return;
    D.ayar.destekHatirlatma = bugun; kaydet();
    hatirlatmaAc();
  }, 2500);
}
function hatirlatmaAc(){
  ac('☕ ' + T('supRemT'), `<p class="onay-metin">${esc(T('supRemText'))}</p>
    <div class="acts"><button class="btn ghost" id="hatSonra">${T('instLater')}</button><button class="btn solid" id="hatDestek">☕ ${T('supBtn')}</button></div>`);
  $('hatSonra').onclick = kapat;
  $('hatDestek').onclick = () => icinden(hatirlatmaAc, destekAc);
}
const DESTEK = {iban:'TR37 0015 7000 0000 0091 2185 43', ad:'Kaan Kapucuoğlu', banka:'Npara'};
let destekTutar = 200;
function destekAc(){
  const satir = (k, ad, deger, ltr = true) => `<div class="kopya-satir"><div><small>${ad}</small><b${ltr ? ' dir="ltr"' : ''}>${esc(deger)}</b></div><button class="mini" data-kopya="${k}">📋 ${T('supCopy')}</button></div>`;
  const ciz2 = () => {
    $('sbody').innerHTML = `<p class="onay-metin">${esc(T('supText'))}</p>
      <div class="sec" style="margin-top:6px">${T('supAmount')}</div>
      <div class="chips" style="margin-top:0">${[50, 100, 200, 500].map(n => `<button class="chip${n === destekTutar ? ' on' : ''}" data-tutar="${n}">${n} ₺</button>`).join('')}</div>
      <div class="stepper"><button data-tadim="-50" aria-label="${T('dec')}">−</button><input id="tutarIn" type="text" inputmode="numeric" autocomplete="off" value="${destekTutar}"><button data-tadim="50" aria-label="${T('inc')}">+</button></div>
      <div class="hint" style="text-align:center;margin-bottom:10px">₺ TRY</div>
      ${satir('iban', T('supIban'), DESTEK.iban)}${satir('ad', T('supName'), DESTEK.ad, false)}${satir('banka', T('supBank'), DESTEK.banka, false)}
      ${satir('tutar', T('supAmount'), destekTutar + ' ₺')}${satir('aciklama', T('supDesc'), T('supDescVal'), false)}
      <button class="btn solid full" style="margin-top:10px" data-kopya="hepsi">${T('supCopyAll')}</button>
      <div class="tip" style="margin-top:12px">${esc(T('supHow'))}</div>
      <div class="hint" style="margin-top:8px">${esc(T('supForeign'))}</div>
      ${D.ayar.destekVerdi ? `<div class="wmsg info" style="margin-top:12px">${esc(T('supThanks'))}</div>` : `<button class="btn ghost full" style="margin-top:12px" data-verdim="1">${T('supDone')}</button>`}`;
    $('tutarIn').addEventListener('change', e => { destekTutar = sinirla(Math.round(+String(e.target.value).replace(/\D/g, '')) || 200, 10, 100000); ciz2(); });
  };
  ac(T('supTitle'));
  ciz2();
  $('sbody').onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.tutar){ destekTutar = +b.dataset.tutar; ciz2(); return; }
    if (b.dataset.verdim){ destekVerildi(); kapat(); return; }
    if (b.dataset.tadim){ destekTutar = sinirla(destekTutar + (+b.dataset.tadim), 10, 100000); ciz2(); return; }
    const k = b.dataset.kopya; if (!k) return;
    const deger = {iban: DESTEK.iban.replace(/\s/g, ''), ad: DESTEK.ad, banka: DESTEK.banka, tutar: String(destekTutar), aciklama: T('supDescVal'),
      hepsi: `${T('supIban')}: ${DESTEK.iban}\n${T('supName')}: ${DESTEK.ad}\n${T('supBank')}: ${DESTEK.banka}\n${T('supAmount')}: ${destekTutar} TL\n${T('supDesc')}: ${T('supDescVal')}`}[k];
    const ad = {iban: T('supIban'), ad: T('supName'), banka: T('supBank'), tutar: T('supAmount'), aciklama: T('supDesc'), hepsi: T('supCopyAll').replace(/^\S+\s/, '')}[k];
    kopyala(deger, T('supCopied', {x: ad}));
  };
}

// ---------- Başkası için program (diyetisyen / spor hocası) ----------
const PAYLASIM_TABAN = 'https://diyet.maviplay.com/app/';
const KOC_GUN = 7;
function kocBos(){
  return {a:'', h:'', n:'', t:{kcal:'', protein:'', karb:'', yag:''}, ara0:false, saat:{...VARSAYILAN_SAAT},
    gun: Array.from({length: KOC_GUN}, () => ({})), not: Array.from({length: KOC_GUN}, () => ({})), sec:0};
}
const kocOgunler = K => ['kahvalti', ...(K.ara0 ? ['ara0'] : []), 'ogle', 'ara1', 'aksam', 'gece'];
// Haftanın günleri (Pzt..Paz) seçili dilde
const haftaGunAd = (i, uzun) => new Date(2024, 0, 1 + i, 12).toLocaleDateString(LOC(), {weekday: uzun ? 'long' : RTL() ? 'narrow' : 'short'}).replace('.', '');
let kocKaydetZaman = null;
function kocKaydet(){ clearTimeout(kocKaydetZaman); kocKaydetZaman = setTimeout(kaydet, 400); }
function kocAc(){
  if (!D.koc) D.koc = kocBos();
  kapat();
  document.body.classList.add('wiz-acik');
  $('koc').hidden = false;
  kocCiz();
  $('koc').scrollTop = 0;
}
function kocKapat(){
  clearTimeout(kocKaydetZaman); kaydet();
  document.body.classList.remove('wiz-acik');
  $('koc').hidden = true;
  ciz();
}
function kocGunToplam(K, i){ return topla(kocOgunler(K).flatMap(id => K.gun[i][id] || [])); }
function kocCiz(){
  const K = D.koc, i = K.sec, ogunler = kocOgunler(K);
  const hedefAlan = (k, ad) => `<label class="field"><span>${ad}</span><input data-kt="${k}" type="text" inputmode="numeric" autocomplete="off" value="${esc(K.t[k] || '')}" placeholder="—"></label>`;
  const gunDolu = j => ogunler.some(id => (K.gun[j][id] || []).length);
  const t = kocGunToplam(K, i), hd = K.t;
  const tHucre = (ad, v, h, birim) => `<div class="${h && v > h * 1.05 ? 'asti' : ''}"><small>${ad}</small><b>${yuv(v)}</b> <span>${h ? '/ ' + h + ' ' : ''}${birim}</span></div>`;
  const ogunKart = id => {
    const liste = K.gun[i][id] || [];
    const satirlar = liste.map((it, ii) => {
      const f = yemek(it.f);
      return `<li class="item"><div class="item-info"><b>${esc(f.ad)}</b><small>${bilgi(besin(it.f, it.g))}</small></div>
        <div class="item-ctl"><div class="gram"><button class="adim" data-kadim="${id},${ii}" data-yon="-1" aria-label="${T('dec')}">−</button><label class="val"><input autocomplete="off" type="text" inputmode="decimal" value="${sayi(it.g)}" data-kgram="${id},${ii}" aria-label="${T('amount')}"><span>${birimAd(f)}</span></label><button class="adim" data-kadim="${id},${ii}" data-yon="1" aria-label="${T('inc')}">+</button></div>
        <div class="item-acts"><button class="mini" data-kdegis="${id},${ii}" title="${esc(T('change'))}">${ikonlu('change')}</button><button class="mini del" data-ksil="${id},${ii}" title="${esc(T('remove'))}">${ikonlu('remove')}</button></div></div></li>`;
    }).join('');
    const tt = topla(liste);
    return `<article class="card meal">
      <div class="meal-head"><div class="meal-ico">${OGUN_IKON[id]}</div><div class="meal-title"><b>${T('m_' + id)}</b><span>${K.saat[id]} · ${yuv(tt.k)} ${T('kcal')} · ${T('aP')} ${yuv(tt.p)} ${T('g')}</span></div></div>
      <ul class="items">${satirlar}</ul>
      <input class="koc-not" data-knot="${id}" type="text" autocomplete="off" maxlength="120" placeholder="${esc(T('kocMealNotePh'))}" value="${esc(K.not[i][id] || '')}">
      <button class="add-food" data-kekle="${id}">${T('kocAdd')}</button>
    </article>`;
  };
  $('koc').innerHTML = `<div class="wiz-in koc-in">
    <div class="wiz-top"><div class="wiz-brand">🥗 ${T('app')}</div><button class="icon-btn" data-kkapat="1" aria-label="✕">✕</button></div>
    <h2>${T('kocTitle')}</h2><p class="wiz-sub">${esc(T('kocIntro'))}</p>
    <div class="card">
      <div class="grid2"><label class="field"><span>${T('kocClient')}</span><input data-kf="a" autocomplete="off" maxlength="40" value="${esc(K.a)}"></label>
      <label class="field"><span>${T('kocAuthor')}</span><input data-kf="h" autocomplete="off" maxlength="60" placeholder="${esc(T('kocAuthorPh'))}" value="${esc(K.h)}"></label></div>
      <label class="field"><span>${T('kocNote')}</span><textarea data-kf="n" rows="2" maxlength="400" placeholder="${esc(T('kocNotePh'))}">${esc(K.n)}</textarea></label>
      <div class="sec" style="margin-top:4px">${T('kocTargets')}</div>
      <div class="grid4">${hedefAlan('kcal', T('tKcal'))}${hedefAlan('protein', T('tProtein'))}${hedefAlan('karb', T('tCarb'))}${hedefAlan('yag', T('tFat'))}</div>
    </div>
    <div class="sec">${T('kocMeals')}</div>
    <div class="card">
      <div class="grid3">${ogunler.map(id => `<label class="field"><span>${OGUN_IKON[id]} ${T('m_' + id)}</span><input type="time" step="300" data-ksaat="${id}" value="${K.saat[id]}"></label>`).join('')}</div>
      <label class="koc-check"><input type="checkbox" data-kara0="1" ${K.ara0 ? 'checked' : ''}> ${T('kocAra0')}</label>
    </div>
    <div class="sec">${T('kocDays')}</div>
    <div class="days koc-days">${Array.from({length: KOC_GUN}, (_, j) => `<button class="day${j === i ? ' active' : ''}" data-kgun="${j}"><b>${haftaGunAd(j)}</b><i class="${gunDolu(j) ? 'on' : ''}"></i></button>`).join('')}</div>
    <div class="koc-gun-arac">${i > 0 ? `<button class="chip" data-konceki="1">${T('kocCopyPrev')}</button>` : ''}<button class="chip" data-khepsi="1">${T('kocCopyAll')}</button><button class="chip" data-ktemizle="1">${T('kocClear')}</button></div>
    <h3 class="koc-gun-bas">${haftaGunAd(i, true)}</h3>
    <section class="meals">${ogunler.map(ogunKart).join('')}</section>
    <div class="card" style="margin-top:14px"><h3>${T('kocDayTotal')} · ${haftaGunAd(i, true)}</h3><div class="plan-grid">
      ${tHucre(T('calories'), t.k, +hd.kcal, T('kcal'))}${tHucre(T('protein'), t.p, +hd.protein, T('g'))}${tHucre(T('carbS'), t.c, +hd.karb, T('g'))}${tHucre(T('fat'), t.y, +hd.yag, T('g'))}${tHucre(T('sugar'), t.s, 0, T('g'))}${tHucre(T('fiber'), t.l, 0, T('g'))}
    </div></div>
    <div id="kocLink"></div>
    <div class="wnav koc-nav"><button class="btn ghost" data-kyeni="1">${T('kocNew')}</button><button class="btn ghost" data-kyazdir="1">${T('kocPrint')}</button><button class="btn green" data-klink="1">${T('kocLink')}</button></div>
    <div class="hint" style="text-align:center;margin-top:6px">${T('kocDraft')}</div>
  </div>`;
}
function kocYemekSec(id, ii){
  const K = D.koc, liste = K.gun[K.sec][id] || (K.gun[K.sec][id] = []);
  const ogun = {id, ad: T('m_' + id), ogeler: liste};
  secimAc({mod: ii === undefined ? 'ekle' : 'degis', ogun, ii, koc: true, sonra: (f, g) => {
    if (ii === undefined) liste.push({f, g}); else liste[ii] = {f, g};
    kocKaydet(); kocCiz();
  }});
}
$('koc').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const K = D.koc, ds = b.dataset, gun = K.gun[K.sec];
  const par = s => { const [id, ii] = s.split(','); return [id, +ii]; };
  if (ds.kkapat){ kocKapat(); return; }
  if (ds.kgun){ K.sec = +ds.kgun; kocKaydet(); kocCiz(); return; }
  if (ds.kekle){ kocYemekSec(ds.kekle); return; }
  if (ds.kdegis){ const [id, ii] = par(ds.kdegis); kocYemekSec(id, ii); return; }
  if (ds.ksil){ const [id, ii] = par(ds.ksil); gun[id].splice(ii, 1); kocKaydet(); kocCiz(); return; }
  if (ds.kadim){
    const [id, ii] = par(ds.kadim), it = gun[id][ii], f = yemek(it.f), yon = +ds.yon;
    const adim = f.a ? (it.g + yon < 1 || (yon > 0 && it.g < 1) ? 0.5 : 1) : (it.g + yon * 5 <= 30 ? 5 : 10);
    it.g = Math.max(f.a ? 0.5 : 5, it.g + yon * adim); kocKaydet(); kocCiz(); return;
  }
  if (ds.konceki){ K.gun[K.sec] = kopya(K.gun[K.sec - 1]); K.not[K.sec] = kopya(K.not[K.sec - 1]); kocKaydet(); kocCiz(); toast('✓'); return; }
  if (ds.khepsi){ for (let j = 0; j < KOC_GUN; j++) if (j !== K.sec){ K.gun[j] = kopya(gun); K.not[j] = kopya(K.not[K.sec]); } kocKaydet(); kocCiz(); toast('✓'); return; }
  if (ds.ktemizle){ K.gun[K.sec] = {}; K.not[K.sec] = {}; kocKaydet(); kocCiz(); return; }
  if (ds.kyeni){ onayAc(T('cKocNew'), () => { D.koc = kocBos(); kaydet(); kocCiz(); }); return; }
  if (ds.kyazdir){ kocYazdir(); return; }
  if (ds.klink){ kocLinkOlustur(); return; }
});
$('koc').addEventListener('input', e => {
  const t = e.target, K = D.koc; if (!K) return;
  if (t.dataset.kf){ K[t.dataset.kf] = t.value; kocKaydet(); return; }
  if (t.dataset.kt){ K.t[t.dataset.kt] = t.value.replace(/[^\d]/g, ''); kocKaydet(); return; }
  if (t.dataset.knot){ K.not[K.sec][t.dataset.knot] = t.value; kocKaydet(); return; }
});
$('koc').addEventListener('change', e => {
  const t = e.target, K = D.koc; if (!K) return;
  if (t.dataset.ksaat && /^\d\d:\d\d$/.test(t.value)){ K.saat[t.dataset.ksaat] = t.value; kocKaydet(); kocCiz(); return; }
  if (t.dataset.kara0){ K.ara0 = t.checked; kocKaydet(); kocCiz(); return; }
  if (t.dataset.kt){ kocCiz(); return; }
  if (t.dataset.kgram){
    const [id, ii] = t.dataset.kgram.split(','), it = K.gun[K.sec][id][+ii];
    it.g = miktarOku(yemek(it.f), t.value) || it.g; kocKaydet(); kocCiz();
  }
});
// Programı link için sıkıştır: kısa alan adları, yalnız kullanılan özel yemekler
function kocPaket(){
  const K = D.koc, ids = kocOgunler(K);
  const g = K.gun.map(gun => ids.map(id => (gun[id] || []).map(it => [it.f, it.g])));
  if (!g.some(gun => gun.some(o => o.length))) return null;
  const m = K.not.map(n => ids.map(id => (n[id] || '').trim()));
  const kullanilan = new Set(g.flat(2).map(x => x[0]));
  const y = (D.ozelYemek || []).filter(f => kullanilan.has(f.id)).map(f => ({id:f.id, ad:f.ad, k:f.k, p:f.p, c:f.c, y:f.y, s:f.s, l:f.l, a:f.a, b:f.b, d:f.d}));
  const t = {}; for (const k of ['kcal','protein','karb','yag']) if (+K.t[k] > 0) t[k] = +K.t[k];
  const P = {v:1, a:K.a.trim(), h:K.h.trim(), n:K.n.trim(), l:dil, o: ids.map(id => [id, K.saat[id]]), g};
  if (m.some(gun => gun.some(Boolean))) P.m = m;
  if (y.length) P.y = y;
  if (Object.keys(t).length) P.t = t;
  return P;
}
const b64url = bytes => { let s = ''; bytes.forEach(b => s += String.fromCharCode(b)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
const b64oku = s => { const b = atob(s.replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(b, c => c.charCodeAt(0)); };
async function akisla(veri, akim){ return new Uint8Array(await new Response(new Blob([veri]).stream().pipeThrough(akim)).arrayBuffer()); }
async function paketKodla(P){
  const ham = new TextEncoder().encode(JSON.stringify(P));
  if (window.CompressionStream){ try { return 'z' + b64url(await akisla(ham, new CompressionStream('deflate-raw'))); } catch(e){} }
  return 'j' + b64url(ham);
}
async function paketCoz(kod){
  const tur = kod[0], veri = b64oku(kod.slice(1));
  let ham = veri;
  if (tur === 'z'){
    ham = null;
    if (window.DecompressionStream){ try { ham = await akisla(veri, new DecompressionStream('deflate-raw')); } catch(e){} }
    if (!ham) ham = inflateRaw(veri);   // eski tarayıcı (iOS < 16.4, eski Samsung Internet)
  }
  return JSON.parse(new TextDecoder().decode(ham));
}
// Saf JS deflate-raw çözücü (RFC 1951): DecompressionStream('deflate-raw') olmayan tarayıcılar için
const L_TABAN = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
const L_EK = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];
const M_TABAN = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
const M_EK = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
function inflateRaw(src){
  let pos = 0, bit = 0, cnt = 0, son = 0;
  const out = [];
  const bits = n => {
    while (cnt < n){ if (pos >= src.length) throw new Error('eksik'); bit |= src[pos++] << cnt; cnt += 8; }
    const v = bit & ((1 << n) - 1); bit >>>= n; cnt -= n; return v;
  };
  const tablo = uz => {
    const sayi = new Uint16Array(16), sira = new Uint16Array(16), sym = new Uint16Array(uz.length);
    uz.forEach(l => sayi[l]++); sayi[0] = 0;
    for (let i = 1; i < 16; i++) sira[i] = sira[i - 1] + sayi[i - 1];
    uz.forEach((l, i) => { if (l) sym[sira[l]++] = i; });
    return {sayi, sym};
  };
  const coz = t => {
    let top = 0, cur = 0, len = 0;
    do { cur = 2 * cur + bits(1); len++; if (len > 15) throw new Error('kod'); top += t.sayi[len]; cur -= t.sayi[len]; } while (cur >= 0);
    return t.sym[top + cur];
  };
  while (!son){
    son = bits(1);
    const tip = bits(2);
    if (tip === 0){
      bit = 0; cnt = 0;
      const n = src[pos] | (src[pos + 1] << 8); pos += 4;
      if (pos + n > src.length) throw new Error('eksik');
      for (let i = 0; i < n; i++) out.push(src[pos++]);
      continue;
    }
    let lt, mt;
    if (tip === 1){
      const uz = new Array(288).fill(8, 0, 144).fill(9, 144, 256).fill(7, 256, 280).fill(8, 280, 288);
      lt = tablo(uz); mt = tablo(new Array(30).fill(5));
    } else if (tip === 2){
      const hlit = bits(5) + 257, hdist = bits(5) + 1, hclen = bits(4) + 4;
      const SIRA = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15], kl = new Array(19).fill(0);
      for (let i = 0; i < hclen; i++) kl[SIRA[i]] = bits(3);
      const kt = tablo(kl), uz = [];
      while (uz.length < hlit + hdist){
        const s = coz(kt);
        if (s < 16) uz.push(s);
        else if (s === 16){ const p = uz[uz.length - 1]; for (let r = 3 + bits(2); r--;) uz.push(p); }
        else if (s === 17){ for (let r = 3 + bits(3); r--;) uz.push(0); }
        else { for (let r = 11 + bits(7); r--;) uz.push(0); }
      }
      lt = tablo(uz.slice(0, hlit)); mt = tablo(uz.slice(hlit, hlit + hdist));
    } else throw new Error('tip');
    for (;;){
      const s = coz(lt);
      if (s < 256){ out.push(s); continue; }
      if (s === 256) break;
      const i = s - 257, n = L_TABAN[i] + bits(L_EK[i]), di = coz(mt), m = M_TABAN[di] + bits(M_EK[di]);
      if (m > out.length) throw new Error('mesafe');
      for (let k = 0; k < n; k++) out.push(out[out.length - m]);
    }
  }
  return new Uint8Array(out);
}
async function kocLinkOlustur(){
  const P = kocPaket();
  if (!P){ toast(T('kocEmpty')); return; }
  const kod = await paketKodla(P), url = PAYLASIM_TABAN + '#p=' + kod + '&n=' + kod.length;
  const ad = P.a || '—';
  const mesaj = T('kocShareMsg', {a: ad, u: url});
  $('kocLink').innerHTML = `<div class="card link-kart"><div class="wmsg info" style="margin-top:0">${esc(T('kocLinkReady'))}</div>
    <textarea class="link-alan" readonly rows="3">${esc(url)}</textarea><div class="hint">${T('kocLinkLen', {n: url.length})}</div>
    <div class="acts"><button class="btn solid" id="linkKopya">${T('kocCopyLink')}</button>
    <a class="btn green" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(mesaj)}">${T('kocWhatsapp')}</a>
    ${navigator.share ? `<button class="btn" id="linkPaylas">${T('kocShare')}</button>` : ''}</div></div>`;
  $('linkKopya').onclick = () => kopyala(url);
  if ($('linkPaylas')) $('linkPaylas').onclick = () => navigator.share({title: T('app'), text: T('kocShareMsg', {a: ad, u: ''}).trim(), url}).catch(() => {});
  $('kocLink').scrollIntoView({behavior:'smooth', block:'center'});
}
// Yazdırılabilir program (tarayıcıdan PDF olarak da kaydedilebilir)
function kocYazdir(){
  const P = kocPaket();
  if (!P){ toast(T('kocEmpty')); return; }
  const ids = P.o.map(o => o[0]);
  const gunHtml = (gun, i) => `<section><h2>${esc(haftaGunAd(i, true))}</h2><table>${ids.map((id, oi) => gun[oi].length ? `<tr><th>${esc(P.o[oi][1])}<br>${esc(T('m_' + id))}</th><td>${gun[oi].map(([f, g]) => esc(yemek(f).ad) + ' — ' + esc(miktarYazi(yemek(f), g))).join('<br>')}${P.m && P.m[i][oi] ? `<br><i>${esc(P.m[i][oi])}</i>` : ''}</td><td class="k">${yuv(topla(gun[oi].map(([f, g]) => ({f, g}))).k)} kcal</td></tr>` : '').join('')}</table></section>`;
  const html = `<!DOCTYPE html><html lang="${dil}" dir="${RTL() ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><title>${esc(T('app'))} · ${esc(P.a)}</title><style>
    body{font-family:system-ui,"Segoe UI",Roboto,sans-serif;color:#172338;margin:24px;font-size:13px}h1{font-size:20px;margin:0 0 4px}p{margin:2px 0;color:#40506a}
    section{break-inside:avoid;margin-top:14px}h2{font-size:15px;margin:0 0 6px;color:#16a36b}table{width:100%;border-collapse:collapse}th,td{border:1px solid #dfe5ee;padding:6px 8px;text-align:start;vertical-align:top}
    th{width:120px;background:#f5f8fc;font-weight:700}td.k{width:70px;text-align:end;white-space:nowrap;color:#718096}</style></head><body>
    <h1>${esc(T('app'))}${P.a ? ' · ' + esc(T('kocFor', {a: P.a})) : ''}</h1>${P.h ? `<p>${esc(T('kocBy', {h: P.h}))}</p>` : ''}${P.n ? `<p>${esc(P.n)}</p>` : ''}
    ${P.t ? `<p>${Object.entries(P.t).map(([k, v]) => T(HEDEF_ETIKET[k]) + ': ' + v).join(' · ')}</p>` : ''}
    ${P.g.map(gunHtml).join('')}<script>onload=()=>setTimeout(()=>print(),300)<\/script></body></html>`;
  const w = window.open('', '_blank');
  if (w){ w.document.write(html); w.document.close(); } else indir(html, `program_${(P.a || 'diyet').replace(/[^\wçğıöşüÇĞİÖŞÜ]+/g, '_')}.html`, 'text/html');
}

// ---------- Program linkiyle gelen programı yükle ----------
const BEKLEYEN = ANAHTAR + '_bekleyen_program';
function programDogrula(P){
  if (!P || P.v !== 1 || !Array.isArray(P.o) || !Array.isArray(P.g) || !P.o.length || P.g.length < 1 || P.g.length > 14) return null;
  const ozel = {};
  (Array.isArray(P.y) ? P.y : []).slice(0, 50).forEach(f => {
    if (!f || typeof f.id !== 'string') return;
    const n = v => sinirla(+v || 0, 0, 1000);
    ozel[f.id] = {id:'pk_' + String(f.id).replace(/[^\w]/g, '').slice(0, 30), ad:String(f.ad || '?').slice(0, 60), kat:'ozel', k:n(f.k), p:n(f.p), c:n(f.c), y:n(f.y), s:n(f.s), l:n(f.l), a:n(f.a), b:f.a ? String(f.b || 'adet').slice(0, 12) : '', d:n(f.d) || 100, e:'', x:'', u:''};
  });
  const bilinen = new Set(YEMEKLER.map(f => f.id));
  const o = P.o.filter(x => Array.isArray(x) && SAAT_IDLER.includes(x[0])).map(([id, s]) => [id, /^\d\d:\d\d$/.test(s) ? s : VARSAYILAN_SAAT[id]]);
  if (!o.length) return null;
  const g = P.g.map(gun => o.map((_, oi) => ((gun || [])[oi] || []).filter(x => Array.isArray(x) && (bilinen.has(x[0]) || ozel[x[0]]) && +x[1] > 0)
    .slice(0, 30).map(([f, m]) => ({f: ozel[f] ? ozel[f].id : f, g: sinirla(+m, 0.5, 2000)}))));
  const m = Array.isArray(P.m) ? P.m.map(gun => o.map((_, oi) => String(((gun || [])[oi]) || '').slice(0, 120))) : null;
  const t = {};
  if (P.t) for (const k of ['kcal','protein','karb','yag']) if (+P.t[k] > 0) t[k] = sinirla(Math.round(+P.t[k]), 1, 10000);
  return {a:String(P.a || '').slice(0, 40), h:String(P.h || '').slice(0, 60), n:String(P.n || '').slice(0, 400), l:DILLER.some(d => d.k === P.l) ? P.l : '', o, g, m, t, ozel:Object.values(ozel)};
}
function programUygula(P){
  if (!D.program) D.oncekiPlan = {planlar: kopya(D.planlar), planBaslangic: D.planBaslangic, miktar: kopya(D.miktar || {})};
  // 7 güne tamamla (daha kısa programda günler sırayla tekrar eder)
  const hafta = Array.from({length: 7}, (_, i) => {
    const gi = i % P.g.length;
    return P.o.map(([id, saat], oi) => ({id, ad: T('m_' + id), saat, ico: OGUN_IKON[id], ogeler: kopya(P.g[gi][oi]), ...(P.m && P.m[gi][oi] ? {not: P.m[gi][oi]} : {})}));
  });
  const bugun = bugunK();
  P.ozel.forEach(f => { if (!D.ozelYemek.some(y => y.id === f.id)) D.ozelYemek.push(f); });
  D.planlar = [hafta];
  D.planBaslangic = gunEkle(bugun, -haftaGunu(bugun));
  D.miktar = {};
  menuleriTemizle(true);
  saatKaydet(bugun, Object.fromEntries(P.o));
  if (P.t.kcal) D.profil.kcal = P.t.kcal;
  if (P.t.protein) D.profil.protein = P.t.protein;
  if (P.t.karb) D.profil.karb = P.t.karb;
  if (P.t.yag) D.profil.yag = P.t.yag;
  D.program = {a:P.a, h:P.h, n:P.n, t:Date.now()};
  logEkle('diger', null, T('lImport', {h: P.h || T('progAnon'), a: P.a || '—'}));
  aktif = bugun; detayAcik = false;
  kaydet(); ciz(); toast(T('impDone'));
}
function programKaldir(){
  onayAc(T('cProgRemove'), () => {
    const o = D.oncekiPlan;
    if (o && o.planlar && o.planlar.length){ D.planlar = o.planlar; D.planBaslangic = o.planBaslangic; D.miktar = o.miktar || {}; }
    else D.planlar = planOlustur(D.profil);
    menuleriTemizle();
    hedefleriYenile();
    D.program = null; D.oncekiPlan = null;
    logEkle('diger', null, T('lProgRemove'));
    kaydet(); ciz(); toast(T('tSaved'));
  });
}
// Evet → yükle (kurulum bitmemişse önce profil, sonra otomatik); Hayır / kapat → yükleme
function programSor(P){
  const ogunSay = P.o.length, gunSay = P.g.length;
  const kim = [P.h ? T('kocBy', {h: P.h}) : '', P.a ? T('kocFor', {a: P.a}) : ''].filter(Boolean).join(' · ');
  ac(T('confirmT'), `<p class="onay-metin"><b>${esc(T('impQ'))}</b></p>
    ${kim ? `<div class="cur"><b>📋 ${esc(kim)}</b>${P.n ? `<br><small>${esc(P.n)}</small>` : ''}</div>` : ''}
    <div class="hint">${esc(T('impInfo', {d: gunSay, m: ogunSay}))}</div>
    ${D.ayar.kurulum ? '' : `<div class="wmsg info">${esc(T('impSetup'))}</div>`}
    <div class="acts"><button class="btn ghost" id="impHayir">${T('impNo')}</button><button class="btn green" id="impEvet">${T('impYes')}</button></div>`);
  const linkTemizle = () => { if (/^#p=/.test(location.hash)) try { history.replaceState(null, '', location.pathname + location.search); } catch(e){} };
  $('impHayir').onclick = () => { linkTemizle(); if (geriFn) geriFn(); else kapat(); toast(T('impNot')); };
  $('impEvet').onclick = () => {
    linkTemizle(); kapat();
    if (D.ayar.kurulum) programUygula(P);
    else { try { localStorage.setItem(BEKLEYEN, JSON.stringify(P)); } catch(e){} programBekleyen = P; toast(T('impSetup')); }
  };
}
let programBekleyen = null;
// Kurulum bitince bekleyen programı otomatik yükle
function bekleyenProgramYukle(){
  let P = programBekleyen;
  if (!P){ try { P = JSON.parse(localStorage.getItem(BEKLEYEN) || 'null'); } catch(e){} }
  try { localStorage.removeItem(BEKLEYEN); } catch(e){}
  programBekleyen = null;
  if (P) programUygula(P);
}
async function programLinkiAc(metin){
  if (/#y=/.test(String(metin || ''))) return yenenLinkiAc(metin);   // yapıştırılan "yediklerim" linki
  const m = String(metin || '').match(/#p=([A-Za-z0-9_-]+)(?:&n=(\d+))?/);
  if (!m) return false;
  let P = null;
  if (!m[2] || +m[2] === m[1].length){ try { P = programDogrula(await paketCoz(m[1])); } catch(e){} }
  if (!P){ ac(T('confirmT'), `<p class="onay-metin">${esc(T('impBad'))}</p><div class="hint">${esc(T('impPasteHint'))}</div><div class="acts"><button class="btn green" data-kapat="1">${T('tamam')}</button></div>`); $('sbody').querySelector('[data-kapat]').onclick = kapat; return true; }
  if (!D.ayar.kurulum && P.l && $('kurulum') && !$('kurulum').hidden && W){ W.dil = P.l; wCiz(); }
  programSor(P);
  return true;
}
// Açılışta adres çubuğundaki program linki (# kısmı sunucuya gitmez)
function adresProgramKontrol(){
  if (/^#y=/.test(location.hash)){ yenenLinkiAc(location.hash); return; }
  if (!/^#p=/.test(location.hash)) return;
  programLinkiAc(location.hash);
}
window.addEventListener('hashchange', adresProgramKontrol);

// ---------- Ana ekrandaki program bandı ----------
function programBantCiz(){
  const P = D.program, el = $('programBant');
  if (!P){ el.innerHTML = ''; return; }
  el.innerHTML = `<div class="prog-bant"><div><b>${esc(P.h ? T('progBanner', {h: P.h}) : '📋 ' + T('progAnon'))}</b>${P.a ? ` <span class="tag">${esc(T('kocFor', {a: P.a}))}</span>` : ''}${P.n ? `<p>${esc(P.n)}</p>` : ''}</div>
    <button class="btn ghost" data-progkaldir="1">${T('progRemove')}</button></div>`;
}

// ---------- Uygulama olarak yükle (Android: tek dokunuş, iPhone: adımlar) ----------
let kurulumOlayi = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); kurulumOlayi = e; });
const bagimsiz = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
const iosMu = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const mobilMu = () => iosMu() || /Android/.test(navigator.userAgent);
function yukleAc(){
  if (kurulumOlayi){ kurulumOlayi.prompt(); kurulumOlayi.userChoice.finally(() => { kurulumOlayi = null; }); return; }
  const adimlar = T(iosMu() ? 'instIos' : 'instAndroid').split('|');
  ac(T('instTitle'), `<ol class="adimlar">${adimlar.map(a => `<li>${esc(a)}</li>`).join('')}</ol>`);
}

// ---------- Yediklerimi paylaş: günün yenen öğünleri (saat, yemek, miktar, besin) linkin içinde ----------
// Link: …/app/#y=<sıkıştırılmış>&n=<uzunluk>; açan kişi belge görünümünde görür, "PDF olarak kaydet" ile PDF alır (sunucuya veri gitmez)
function yenenPaketi(k){
  const r = kayitOku(k), P = D.profil, v = Math.round;
  return {v:1, a: P.ad || '', d: k, l: dil, h: [P.kcal, P.protein, P.karb, P.seker, P.yag, P.lif], su: [r.su * P.bardak, P.su],
    o: menuOku(k).map(o => [ogunAd(o), ogunSaati(k, o), r.yendi[o.id] ? 1 : 0, r.yendi[o.id] ? o.ogeler.map(it => {
      const f = yemek(it.f), b = besin(it.f, it.g);
      return [f.ad, miktarYazi(f, it.g), v(b.k), v(b.p), v(b.c), v(b.s), v(b.y), v(b.l)];
    }) : []])};
}
async function yenenPaylasAc(k){
  const Y = yenenPaketi(k), yenen = Y.o.filter(o => o[2]);
  if (!yenen.length){ toast(T('shNone')); return; }
  const kod = await paketKodla(Y), url = PAYLASIM_TABAN + '#y=' + kod + '&n=' + kod.length;
  const baslik = (Y.a ? Y.a + ' · ' : '') + T('shText', {d: etiket(k)});
  ac(T('shTitle'), `<div class="cur"><b>${esc(etiket(k))} · ${T('shMeals', {n: yenen.length})} · ${yuv(yenenToplam(k).k)} ${T('kcal')}</b><br>
      <small>${yenen.map(o => esc(o[1] + ' ' + o[0])).join(' · ')}</small></div>
    <div class="hint" style="margin:10px 0 4px">${esc(T('shInfo'))}</div>
    <div class="acts">${navigator.share ? `<button class="btn solid" id="shGonder">${T('shSend')}</button>` : ''}<button class="btn" id="shKopya">${T('shCopy')}</button></div>
    <button class="btn ghost full" style="margin-top:8px" id="shOnizle">${T('shPreview')}</button>`);
  if ($('shGonder')) $('shGonder').onclick = () => navigator.share({title: baslik, text: baslik, url}).catch(() => {});
  $('shKopya').onclick = () => kopyala(url);
  $('shOnizle').onclick = () => yenenRaporAc(Y);
}
async function yenenLinkiAc(metin){
  const m = String(metin || '').match(/#y=([A-Za-z0-9_-]+)(?:&n=(\d+))?/);
  if (!m) return false;
  let Y = null;
  if (!m[2] || +m[2] === m[1].length){
    try { Y = await paketCoz(m[1]); } catch(e){}
    if (!Y || Y.v !== 1 || !Array.isArray(Y.o) || !/^\d{4}-\d\d-\d\d$/.test(Y.d)) Y = null;
  }
  if (!Y){ if (/^#y=/.test(location.hash)) raporLinkTemizle(); toast(T('rpBad')); return true; }
  yenenRaporAc(Y);
  return true;
}
const raporLinkTemizle = () => { try { history.replaceState(null, '', location.pathname + location.search); } catch(e){} };
// Belge görünümü (A4 sayfa); yazdırma/PDF'te yalnız bu sayfa çıkar
function yenenRaporAc(Y){
  kapat();
  if ($('rapor')) $('rapor').remove();
  const dil0 = dil; if (!D.ayar.kurulum && DILLER.some(d => d.k === Y.l)) dil = Y.l;   // kurulumsuz alıcı: gönderenin dili
  const n = x => Math.round(+x || 0), top = [0, 0, 0, 0, 0, 0];
  const yenen = Y.o.filter(o => o[2] && Array.isArray(o[3])), yenmeyen = Y.o.filter(o => !o[2]);
  yenen.forEach(o => o[3].forEach(it => { for (let i = 0; i < 6; i++) top[i] += n(it[2 + i]); }));
  const h = Array.isArray(Y.h) ? Y.h : [], ad = [T('calories'), T('protein'), T('carb'), T('sugar'), T('fat'), T('fiber')];
  const birim = i => i ? T('g') : T('kcal'), kisa = [T('kcal'), T('protein'), T('carbS'), T('sugar'), T('fat'), T('fiber')];
  const tarih = tarihDen(Y.d).toLocaleDateString(LOC(), {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  const su = Array.isArray(Y.su) ? Y.su : [0, 0];
  const kutu = (baslik, deger, hedef, b) => `<div class="rp-kutu"><small>${baslik}</small><b>${deger}</b> <span>${b}${hedef ? ' / ' + hedef : ''}</span></div>`;
  const html = `<div class="rapor" id="rapor" translate="no" dir="${RTL() ? 'rtl' : 'ltr'}">
    <div class="rapor-arac"><button class="btn solid" id="rpPdf">${T('rpPdf')}</button><button class="btn ghost" id="rpKapat">✕ ${T('rpClose')}</button></div>
    <article class="rapor-sayfa">
      <header class="rp-bas"><div><small>🥗 ${T('rpTitle')}</small><h1>${esc(String(Y.a || '').slice(0, 40)) || '—'}</h1><p>${esc(tarih)}</p></div></header>
      <section class="rp-ozet">${ad.map((a, i) => kutu(a, n(top[i]), n(h[i]), birim(i))).join('')}${kutu('💧 ' + T('water'), litre(n(su[0])), n(su[1]) ? litre(n(su[1])) : '', T('L'))}</section>
      ${yenen.map(o => {
        const t = [0, 0, 0, 0, 0, 0]; o[3].forEach(it => { for (let i = 0; i < 6; i++) t[i] += n(it[2 + i]); });
        return `<section class="rp-ogun"><h2><span class="rp-saat">${esc(String(o[1] || ''))}</span>${esc(String(o[0] || ''))}<em>${t[0]} ${T('kcal')}</em></h2>
          <table><thead><tr><th>${T('rpFood')}</th>${kisa.map(k => `<th>${k}</th>`).join('')}</tr></thead>
          <tbody>${o[3].map(it => `<tr><td><b>${esc(String(it[0] || ''))}</b><small>${esc(String(it[1] || ''))}</small></td>${[2, 3, 4, 5, 6, 7].map(i => `<td data-l="${kisa[i - 2]}">${n(it[i])}</td>`).join('')}</tr>`).join('')}</tbody>
          <tfoot><tr><td>${T('rpMealTotal')}</td>${t.map((x, j) => `<td data-l="${kisa[j]}">${x}</td>`).join('')}</tr></tfoot></table></section>`;
      }).join('')}
      ${yenmeyen.length ? `<p class="rp-yenmeyen"><b>${T('rpNotEaten')}:</b> ${yenmeyen.map(o => esc(String(o[1] || '') + ' ' + String(o[0] || ''))).join(' · ')}</p>` : ''}
      <footer class="rp-alt">${T('rpFooter')} · diyet.maviplay.com</footer>
    </article></div>`;
  dil = dil0;
  document.body.insertAdjacentHTML('beforeend', html);
  document.body.classList.add('rapor-acik');
  const baslik0 = document.title;
  document.title = `${String(Y.a || '').slice(0, 40)} ${Y.d}`.trim();   // PDF dosya adı
  $('rapor').scrollTop = 0;
  $('rpPdf').onclick = () => window.print();
  $('rpKapat').onclick = () => {
    $('rapor').remove(); document.body.classList.remove('rapor-acik'); document.title = baslik0;
    if (/^#y=/.test(location.hash)) raporLinkTemizle();
  };
}

// ---------- Kullanım turu: ilk açılışta bir kez (Geç ile atlanır, bir daha çıkmaz); Ayarlar → Kullanım turu ile yeniden ----------
// [hedef seçici (yoksa ortada kart), metin no]; hedefi ekranda olmayan adım atlanır (ör. öğünler gizliyse)
const TUR = [[null, 1], ['#gunler', 2], ['.top-btns', 3], ['#ozet .card', 4], ['#ozet [data-paylas]', 5], ['#ozet .water-card', 6],
  ['#ogunler .meal .meal-head', 7], ['#ogunler .item .gram', 8], ['#ogunler [data-kiyas]', 9], ['#ogunler [data-degis]', 10],
  ['#ogunler [data-sil]', 11], ['#ogunler .add-food', 12], ['#ayarBtn', 13], [null, 14]];
let turAdim = -1;
const turHedef = i => TUR[i][0] ? [...document.querySelectorAll(TUR[i][0])].find(e => e.getClientRects().length) || null : null;
function turKontrol(){
  if (D.ayar.turGoruldu || !D.ayar.kurulum) return;
  setTimeout(() => {
    if (D.ayar.turGoruldu || $('tur') || $('rapor') || !$('kurulum').hidden || !$('koc').hidden || $('overlay').classList.contains('open') || /^#[py]=/.test(location.hash)) return;
    turBaslat();
  }, 900);
}
function turBaslat(){
  kapat();
  if (aktif !== bugunK()){ aktif = bugunK(); ciz(); }
  if ($('tur')) $('tur').remove();
  document.body.insertAdjacentHTML('beforeend', `<div class="tur" id="tur"><div class="tur-isik" id="turIsik"></div>
    <div class="tur-kart" id="turKart" role="dialog" aria-modal="true" aria-live="polite"><small id="turNo"></small><h3 id="turBas"></h3><p id="turMetin"></p>
    <div class="tur-dug"><button class="btn ghost" id="turGec">${T('tourSkip')}</button><span></span><button class="btn ghost" id="turGeri">‹ ${T('back')}</button><button class="btn solid" id="turIleri"></button></div></div></div>`);
  $('turGec').onclick = turBitir;
  $('turGeri').onclick = () => turGit(turAdim - 1, -1);
  $('turIleri').onclick = () => turAdim >= TUR.length - 1 ? turBitir() : turGit(turAdim + 1, 1);
  turGit(0, 1);
}
function turGit(i, yon){
  while (i > 0 && i < TUR.length - 1 && TUR[i][0] && !turHedef(i)) i += yon;   // ekranda olmayanı atla
  if (i < 0) i = 0;
  turAdim = i;
  const n = TUR[i][1], el = turHedef(i);
  $('turNo').textContent = `${i + 1} / ${TUR.length}`;
  $('turBas').textContent = T('tur' + n + 'T'); $('turMetin').textContent = T('tur' + n);
  $('turGeri').hidden = i === 0;
  $('turIleri').textContent = i >= TUR.length - 1 ? T('tourDone') : T('tourNext') + ' ›';
  if (el) el.scrollIntoView({block: 'center'});
  requestAnimationFrame(turKonum);
}
function turKonum(){
  const isik = $('turIsik'), kart = $('turKart'); if (!isik || turAdim < 0) return;
  const el = turHedef(turAdim), vw = document.documentElement.clientWidth, vh = innerHeight;
  if (!el){ isik.className = 'tur-isik bos'; kart.style.cssText = ''; kart.className = 'tur-kart orta'; return; }
  const r = el.getBoundingClientRect(), p = 6;
  isik.className = 'tur-isik';
  Object.assign(isik.style, {left: r.left - p + 'px', top: r.top - p + 'px', width: r.width + p * 2 + 'px', height: r.height + p * 2 + 'px'});
  kart.className = 'tur-kart';
  const kw = Math.min(360, vw - 24), kh = kart.offsetHeight;
  const ust = r.bottom + p + 12 + kh < vh ? r.bottom + p + 12 : Math.max(12, r.top - p - 12 - kh);
  kart.style.cssText = `left:${Math.round(Math.min(Math.max(12, r.left + r.width / 2 - kw / 2), vw - kw - 12))}px;top:${Math.round(ust)}px;width:${kw}px`;
}
function turBitir(){
  turAdim = -1;
  if ($('tur')) $('tur').remove();
  D.ayar.turGoruldu = true; kaydet();
}
window.addEventListener('resize', () => { if ($('tur')) turKonum(); });
window.addEventListener('scroll', () => { if ($('tur')) turKonum(); }, {passive: true});
