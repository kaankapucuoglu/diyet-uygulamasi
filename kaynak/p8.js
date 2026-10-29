// ---------- Kurulum sihirbazı ----------
let W = null, wAdim = 0, wHata = '';
const HEDEFLER = [['ver','🔥'],['sekil','🏋️'],['koru','⚖️'],['kas','💪'],['al','📈']];
const odakAd = k => T(k === 'seker' ? 'g_seker' : 'o_' + k);
const wAdimlar = () => ['dil','ad','olcu','hedef','aktivite', ...(W.hedef === 'ver' || W.hedef === 'al' ? ['kilo'] : []), 'tercih','ozet'];
function sihirbazAc(baslangic = 0){
  W = {...kopya(D.profil), dil: D.ayar.dil || 'tr'};
  wAdim = baslangic; wHata = '';
  document.body.classList.add('wiz-acik');
  $('kurulum').hidden = false;
  wCiz();
}
function sihirbazKapat(){
  document.body.classList.remove('wiz-acik');
  $('kurulum').hidden = true;
  ciz();
}
const wStepper = (alan, etiketKey, adim) => `<div class="wfield"><label for="w_${alan}">${T(etiketKey)}</label>
  <div class="stepper"><button data-wadim="${alan}" data-yon="-${adim}" aria-label="${T('dec')}">−</button>
  <input autocomplete="off" autocorrect="off" spellcheck="false" id="w_${alan}" data-wf="${alan}" type="text" inputmode="decimal" value="${sayi(W[alan])}">
  <button data-wadim="${alan}" data-yon="${adim}" aria-label="${T('inc')}">+</button></div></div>`;
const wOpt = (data, deger, sec, ic, baslik, alt = '', kapali = false) =>
  `<button class="opt${sec ? ' on' : ''}" data-${data}="${deger}"${kapali ? ' disabled' : ''}><span class="ic">${ic}</span><div><b>${baslik}</b>${alt ? `<small>${alt}</small>` : ''}</div></button>`;
function wHitap(){
  if (!W.ad) return '';
  return dil === 'tr' ? `${W.ad} ${W.cins === 'k' ? T('hanim') : W.cins === 'e' ? T('bey') : ''}`.trim() : W.ad;
}
function wCiz(){
  dil = W.dil; document.documentElement.lang = dil; document.documentElement.dir = RTL() ? 'rtl' : 'ltr';
  const adimlar = wAdimlar(); wAdim = Math.min(wAdim, adimlar.length - 1);
  const ad = adimlar[wAdim], b = vki(W);
  let baslik = '', alt = '', govde = '';
  if (ad === 'dil'){
    baslik = T('wLangT'); alt = T('wLangS');
    govde = `<div class="opts">${DILLER.map(d => wOpt('wdil', d.k, d.k === W.dil, d.k.toUpperCase(), d.ad).replace('class="ic"', 'class="ic kod"')).join('')}</div>`;
  } else if (ad === 'ad'){
    baslik = T('wNameT'); alt = T('wNameS');
    govde = `<div class="wfield"><label for="wAd">${T('name')}</label><input class="wname" id="wAd" data-wf="ad" value="${esc(W.ad)}" placeholder="${esc(T('namePh'))}" autocomplete="off" autocorrect="off" autocapitalize="words" spellcheck="false" enterkeyhint="next" maxlength="30"></div>
      <div class="wsec">${T('gender')}</div>
      <div class="opts">${wOpt('wcins', 'e', W.cins === 'e', '👨', T('male'))}${wOpt('wcins', 'k', W.cins === 'k', '👩', T('female'))}</div>
      <div class="hint" style="margin-top:8px">${T('genderWhy')}</div>`;
  } else if (ad === 'olcu'){
    baslik = T('wBodyT'); alt = T('wBodyS');
    govde = wStepper('yas', 'age', 1) + wStepper('boy', 'height', 1) + wStepper('kilo', 'weight', 0.5)
      + `<div class="wmsg info" id="wVki">${T('bmi')}: <b>${sayi(b)}</b> · ${T(vkiSinif(b))}</div>`;
  } else if (ad === 'hedef'){
    baslik = T('wGoalT'); alt = T('wGoalS');
    const zayif = b < 18.5;
    govde = `<div class="opts">${HEDEFLER.map(([k, ic]) => wOpt('whedef', k, W.hedef === k, ic, T('g_' + k), T('gd_' + k), zayif && (k === 'ver' || k === 'sekil'))).join('')}</div>`
      + (zayif ? `<div class="wmsg warn">${T('warnLow')}</div>` : '') + (W.yas < 18 ? `<div class="wmsg warn">${T('warn18')}</div>` : '')
      + `<div class="wsec">${T('wOdakT')}</div><div class="hint" style="margin:-2px 0 8px">${T('wOdakS')}</div>`
      + `<div class="opts">${ODAKLAR.map(([k, ic]) => wOpt('wodak', k, (W.odaklar || []).includes(k), ic, odakAd(k), T('od_' + k))).join('')}</div>`;
  } else if (ad === 'aktivite'){
    baslik = T('wActT'); alt = T('wActS');
    govde = `<div class="opts">${[1,2,3,4,5].map(i => wOpt('wakt', i, W.aktivite === i, ['🪑','🚶','🏃','🚴','🏋️'][i-1], T('a' + i), T('ad' + i))).join('')}</div>`;
  } else if (ad === 'kilo'){
    baslik = T('wKiloT'); alt = W.hedef === 'ver' ? T('wKiloS') : '';
    govde = wStepper('hedefKilo', 'targetW', 0.5);
    if (W.hedef === 'ver') govde += `<div class="wsec">${T('pace')}</div><div class="opts">${[[0.25,'p1','🐢'],[0.5,'p2','✅'],[0.75,'p3','⚡']].map(([h, k, ic]) => wOpt('whiz', h, W.hiz === h, ic, T(k), T('perWeek', {n: sayi(h)}))).join('')}</div>`;
    govde += `<div class="wmsg info" id="wSure"></div>`;
  } else if (ad === 'tercih'){
    baslik = T('wPrefT'); alt = T('wPrefS');
    const h = new Set(W.haric);
    const preset = h.size === 0 ? 'hepsi' : ['m','c','f'].every(x => h.has(x)) && h.size === 3 ? 'vejetaryen' : h.size === 5 ? 'vegan' : '';
    govde = `<div class="opts">${wOpt('wpreset', 'hepsi', preset === 'hepsi', '🍽️', T('everything'))}${wOpt('wpreset', 'vejetaryen', preset === 'vejetaryen', '🥦', T('vegetarian'))}${wOpt('wpreset', 'vegan', preset === 'vegan', '🌱', T('vegan'))}</div>
      <div class="wsec">${T('dontEat')}</div>
      <div class="opts">${[['m','🥩'],['c','🍗'],['f','🐟'],['e','🥚'],['d','🥛']].map(([x, ic]) => wOpt('wharic', x, h.has(x), ic, T('x_' + x))).join('')}</div>`;
  } else {
    const h = hedefHesapla(W);
    baslik = T('wSumT', {ad: esc(wHitap())}); alt = T('wSumS');
    const kut = (ad, deger, birim, cls = '') => `<div class="stat${cls}"><small>${ad}</small><b>${deger}</b> <span>${birim}</span></div>`;
    govde = `<div class="stats">
        ${kut(T('dailyTarget'), h.kcal, T('kcal'), ' hl')}${kut(T('protein'), h.protein, T('g'), ' hl')}
        ${kut(T('carb'), h.karb, T('g'))}${kut(T('fat'), h.yag, T('g'))}${kut(T('sugar'), '<span dir="ltr">≤ ' + h.seker + '</span>', T('g'))}
        ${kut(T('fiber'), h.lif, T('g'))}${kut('💧 ' + T('water'), litre(h.su), T('L'), ' water')}
        ${kut(T('bmi'), sayi(h.vki), T(vkiSinif(h.vki)))}${kut(T('bmr'), h.bmr, T('kcal'))}${kut(T('tdee'), h.tdee, T('kcal'))}
      </div>
      <div class="wmsg info">${T('goalLbl')}: <b>${T('g_' + W.hedef)}</b> · ${T('a' + W.aktivite)}${h.hafta ? ' · ' + T('weeks', {n: h.hafta}) : ''}</div>
      ${(W.odaklar || []).map(k => `<div class="wmsg info"><b>${ODAKLAR.find(o => o[0] === k)[1]} ${odakAd(k)}:</b> ${T('od_' + k)}</div>`).join('')}
      <details class="method"><summary>${T('method')}</summary><ul>${T('methodTxt').split('|').concat(T('methodOdak')).map(s => `<li>${esc(s)}</li>`).join('')}</ul></details>
      <div class="wmsg warn">${T('disclaimer')}</div>`;
  }
  const ilk = wAdim === 0, son = ad === 'ozet';
  $('kurulum').innerHTML = `<div class="wiz-in">
    <div class="wiz-top"><div class="wiz-brand">🥗 ${T('app')}</div><div style="display:flex;align-items:center;gap:10px"><span class="wiz-step">${T('stepOf', {a: wAdim + 1, b: adimlar.length})}</span>${D.ayar.kurulum ? `<button class="icon-btn" data-wkapat="1" aria-label="✕">✕</button>` : ''}</div></div>
    <div class="wiz-bar"><i style="width:${(wAdim + 1) / adimlar.length * 100}%"></i></div>
    <h2>${baslik}</h2>${alt ? `<p class="wiz-sub">${alt}</p>` : ''}
    <div class="wiz-body">${govde}${wHata ? `<div class="wmsg err">${wHata}</div>` : ''}</div>
    <div class="wnav">${ilk ? '' : `<button class="btn ghost" data-wgeri="1">${T('back')}</button>`}<button class="btn ${son ? 'green' : 'solid'}" data-wileri="1">${son ? T('create') : T('next')}</button></div>
  </div>`;
  wSureYaz();
  $('kurulum').scrollTop = 0;
}
// Canlı alanlar: VKİ ve tahmini süre (input yazarken yeniden çizmeden)
function wSureYaz(){
  const el = $('wSure');
  if (el){ const h = hedefHesapla(W); el.textContent = h.hafta ? T('weeks', {n: h.hafta}) : T('errTarget'); el.className = 'wmsg ' + (h.hafta ? 'info' : 'warn'); }
  const v = $('wVki');
  if (v){ const b = vki(W); v.innerHTML = `${T('bmi')}: <b>${sayi(b)}</b> · ${T(vkiSinif(b))}`; }
}
function wDogrula(ad){
  if (ad === 'ad' && (!W.ad.trim() || !W.cins)) return T('errName');
  if (ad === 'olcu' && !(W.yas >= 14 && W.yas <= 100 && W.boy >= 120 && W.boy <= 230 && W.kilo >= 30 && W.kilo <= 300)) return T('errBody');
  if (ad === 'hedef' && (!W.hedef || (vki(W) < 18.5 && (W.hedef === 'ver' || W.hedef === 'sekil')))) return W.hedef ? T('warnLow') : T('errGoal');
  if (ad === 'kilo' && ((W.hedef === 'ver' && !(W.hedefKilo < W.kilo && W.hedefKilo >= 30)) || (W.hedef === 'al' && !(W.hedefKilo > W.kilo)))) return T('errTarget');
  return '';
}
function wBitir(){
  const h = hedefHesapla(W);
  const {dil: secilenDil, ...profil} = W;
  profil.ad = profil.ad.trim();
  D.profil = {...profil, kcal:h.kcal, protein:h.protein, karb:h.karb, seker:h.seker, yag:h.yag, lif:h.lif, su:h.su};
  D.ayar.dil = secilenDil; D.ayar.kurulum = true;
  dil = secilenDil;
  planYenile(); kaydet();
  aktif = bugunK(); detayAcik = false;
  sihirbazKapat();
  toast('👋 ' + selam());
}
$('kurulum').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b || b.disabled) return;
  const ds = b.dataset;
  if (ds.wkapat){ sihirbazKapat(); return; }
  if (ds.wdil){ W.dil = ds.wdil; wCiz(); return; }
  if (ds.wcins){ W.cins = ds.wcins; wHata = ''; wCiz(); return; }
  if (ds.whedef){
    W.hedef = ds.whedef; wHata = '';
    if (W.hedef === 'ver' && !(W.hedefKilo < W.kilo)) W.hedefKilo = Math.round(Math.max(W.kilo - 5, 18.5 * Math.pow(W.boy / 100, 2)));
    if (W.hedef === 'al' && !(W.hedefKilo > W.kilo)) W.hedefKilo = Math.round(W.kilo + 4);
    wCiz(); return;
  }
  if (ds.wodak){ const o = new Set(W.odaklar || []); o.has(ds.wodak) ? o.delete(ds.wodak) : o.add(ds.wodak); W.odaklar = [...o]; wCiz(); return; }
  if (ds.wakt){ W.aktivite = +ds.wakt; wCiz(); return; }
  if (ds.whiz){ W.hiz = +ds.whiz; wCiz(); return; }
  if (ds.wpreset){ W.haric = {hepsi:[], vejetaryen:['m','c','f'], vegan:['m','c','f','e','d']}[ds.wpreset]; wCiz(); return; }
  if (ds.wharic){ const h = new Set(W.haric); h.has(ds.wharic) ? h.delete(ds.wharic) : h.add(ds.wharic); W.haric = [...h]; wCiz(); return; }
  if (ds.wadim){
    const alan = ds.wadim, yeni = Math.round((+W[alan] + (+ds.yon)) * 2) / 2;
    W[alan] = Math.max(0, yeni); $('w_' + alan).value = sayi(W[alan]); wSureYaz(); return;
  }
  if (ds.wgeri){ wHata = ''; wAdim = Math.max(0, wAdim - 1); wCiz(); return; }
  if (ds.wileri){
    const ad = wAdimlar()[wAdim];
    wHata = wDogrula(ad);
    if (wHata){ wCiz(); return; }
    if (ad === 'ozet'){ wBitir(); return; }
    wAdim++; wCiz();
  }
});
$('kurulum').addEventListener('input', e => {
  const alan = e.target.dataset.wf; if (!alan) return;
  W[alan] = alan === 'ad' ? e.target.value : Math.max(0, +String(e.target.value).replace(/[,٫]/g, '.') || 0);
  wSureYaz();
});

// ---------- Başlat ----------
function baslat2(){
  dilUygula();
  if (!D.ayar.kurulum || !D.planlar.length){ sihirbazAc(0); return; }
  // Eski tek haftalık plan: 1. hafta korunur, 2–4. haftalar profile göre üretilir
  if (D.planlar.length < TEMEL_HAFTALAR.length){
    const yeni = planOlustur(D.profil);
    for (let i = D.planlar.length; i < yeni.length; i++) D.planlar.push(yeni[i]);
    if (!D.planBaslangic) D.planBaslangic = gunEkle(bugunK(), -haftaGunu(bugunK()));
    kaydet();
  }
  ciz();
}
D = tamamla(enYeni(lsOku(), gomuluOku()) || varsayilanDurum());
baslat2();
try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch(e){}
try { localStorage.setItem(ANAHTAR + '_test', '1'); localStorage.removeItem(ANAHTAR + '_test'); } catch(e){ depoCalisiyor = false; }
idbOku().then(v => {
  const yeni = enYeni(v, D);
  if (yeni && yeni !== D && (yeni.guncel || 0) > (D.guncel || 0)){ D = tamamla(yeni); if ($('kurulum').hidden) baslat2(); }
});
// Sayfa arka plana atılınca son hali yaz
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && D.guncel) { try { localStorage.setItem(ANAHTAR, JSON.stringify(D)); } catch(e){} } });
// Çevrimdışı çalışma: web adresinden açıldıysa uygulama dosyalarını telefona kaydet (dosyadan açılınca çalışmaz, gerek de yok)
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(() => {});
// Telefon klavyesi: görünen alanı ölç, klavye açıksa işaretle, odaklanan alanı ortaya kaydır
let enBuyukYukseklik = 0, sonGenislik = 0;
function gorunenAlan(){
  const v = window.visualViewport; if (!v) return;
  if (Math.abs(v.width - sonGenislik) > 40){ sonGenislik = v.width; enBuyukYukseklik = 0; }   // döndürme/pencere değişimi
  const odak = document.activeElement;
  const yaziAlani = odak && /^(INPUT|TEXTAREA)$/.test(odak.tagName) && odak.type !== 'file';
  if (!yaziAlani) enBuyukYukseklik = Math.max(enBuyukYukseklik, v.height, window.innerHeight);
  const r = document.documentElement.style;
  r.setProperty('--vv-h', v.height + 'px');
  r.setProperty('--vv-top', v.offsetTop + 'px');
  document.body.classList.toggle('klavye', !!yaziAlani && v.height < (enBuyukYukseklik || window.innerHeight) * 0.85);
}
window.addEventListener('orientationchange', () => { enBuyukYukseklik = 0; setTimeout(gorunenAlan, 300); });
if (window.visualViewport){
  visualViewport.addEventListener('resize', gorunenAlan);
  visualViewport.addEventListener('scroll', gorunenAlan);
  gorunenAlan();
}
document.addEventListener('focusin', e => {
  if (!/^(INPUT|TEXTAREA)$/.test(e.target.tagName) || e.target.type === 'file') return;
  setTimeout(() => { gorunenAlan(); e.target.scrollIntoView({block:'center', behavior:'smooth'}); }, 350);
});
document.addEventListener('focusout', () => setTimeout(gorunenAlan, 100));
// Gece yarısını geçince "bugün" değişsin
setInterval(() => { if (!document.hidden && $('kurulum').hidden) gunleriCiz(); }, 60000);
</script>
</body>
</html>
