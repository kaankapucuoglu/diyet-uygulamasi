// ---------- Olaylar ----------
const cift = s => s.split(',').map(Number);
document.querySelector('.wrap').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const ds = b.dataset;
  if (ds.tarih){ aktif = ds.tarih; detayAcik = false; ciz(); return; }
  if (ds.hafta){ aktif = gunEkle(aktif, +ds.hafta); detayAcik = false; ciz(); return; }
  if (ds.bugun){ aktif = bugunK(); detayAcik = false; ciz(); return; }
  if (ds.detay){ detayAcik = !detayAcik; ciz(); return; }
  if (ds.yedim !== undefined){ yedimDegis(+ds.yedim); return; }
  if (ds.su){ suDegis(kayitOku(aktif).su + (+ds.su)); if (+ds.su > 0 && !gecmisMi(aktif)) toast(T('glassesDrunk', {n: kayitOku(aktif).su})); return; }
  if (ds.bardak !== undefined){ const i = +ds.bardak; suDegis(kayitOku(aktif).su === i + 1 ? i : i + 1); return; }
  if (ds.arti){ const [oi, ii] = cift(ds.arti); miktarAdim(oi, ii, +ds.yon); return; }
  if (ds.sil){ const [oi, ii] = cift(ds.sil); ogeSil(oi, ii); return; }
  if (ds.ekle !== undefined){ secimAc({mod:'ekle', oi:+ds.ekle}); return; }
  if (ds.degis){ const [oi, ii] = cift(ds.degis); secimAc({mod:'degis', oi, ii}); return; }
  if (ds.kiyas){ const [oi, ii] = cift(ds.kiyas); secimAc({mod:'kiyas', oi, ii}); return; }
  if (ds.tumlog){ loglarAc(); return; }
  if (ds.saat !== undefined){ saatDuzenle(+ds.saat); return; }
  if (ds.tog){ ogunTogla(ds.tog); return; }
  if (ds.tarti){ tartiKaydet(); return; }
  if (ds.togall !== undefined){ hepsiniTogla(ds.togall === '1'); return; }
  if (ds.progkaldir){ programKaldir(); return; }
});
document.querySelector('.wrap').addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.gram){ const [oi, ii] = cift(t.dataset.gram); miktarDegis(oi, ii, t.value); }
});
$('overlay').addEventListener('click', e => { if (e.target.id === 'overlay') kapat(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') kapat(); });
$('ayarBtn').addEventListener('click', () => ayarlarAc());
$('uyariBtn').addEventListener('click', uyarilarAc);
$('hamileBtn').addEventListener('click', hamileDegistir);
$('kocBtn').addEventListener('click', kocAc);
$('destekBtn').addEventListener('click', destekAc);

function ac(baslik, govde){
  $('sheet').innerHTML = `<div class="sheet-head"><h2>${baslik}</h2><button class="icon-btn" data-kapat="1" aria-label="✕">✕</button></div><div class="sheet-body" id="sbody">${govde || ''}</div>`;
  $('sheet').querySelector('[data-kapat]').onclick = kapat;
  $('overlay').classList.add('open'); document.body.style.overflow = 'hidden';
}
function kapat(){ $('overlay').classList.remove('open'); document.body.style.overflow = ''; }

// ---------- Yemek seç / değiştir / kıyasla ----------
let SE = null;
const SON = '__son', TUMU = '__tumu', BENZER = '__benzer';
// Değiştir/Kıyasla için benzer yemekler: aynı tür (ad/etiket ortak kelime, ör. "ekmek") önce, sonra aynı gruptaki besin değeri en yakınlar
// Türü değil niteliği/pişirmeyi anlatan kelimeler benzerlikte sayılmaz (ör. "tam buğday" ekmekle makarnayı eşleştirmesin)
const NITELIK = new Set(['tam','bugday','kepekli','haslama','haslanmis','izgara','firin','tava','yarim','yagli','sekersiz','tuzsuz','sade','light','kahvalti','yemek','yemegi','zeytinyagli','yogurtlu','kimyonlu','sumakli','derisiz','suzulmus','bugulama']);
const KAT_SIRA = ['et','balik','yumurta','sut','kahvaltilik','bitkisel','baklagil','anayemek','hamur','salata','sebze','tahil','pilav','corba','meyve','kuruyemis','atistirmalik','tatli','icecek','ozel'];
const GRUP = {et:'protein', balik:'protein', yumurta:'protein', bitkisel:'protein'};
function benzerler(fid, uygun = profilUygun(D.profil)){
  const f = yemek(fid);
  const sade = t => t.toLocaleLowerCase('tr-TR').replace(/[çğıöşüâû]/g, c => KATLA[c] || c);
  const kelimeler = y => new Set(sade(`${(y.n || [y.ad])[0]} ${y.e || ''}`).split(/[^a-z0-9]+/).filter(w => w.length > 2 && !NITELIK.has(w)));
  const kf = kelimeler(f), grup = y => GRUP[y.kat] || y.kat;
  const oz = y => { const k = y.k || 1; return [y.p * 4 / k, y.c * 4 / k, y.y * 9 / k]; };
  const [a1, a2, a3] = oz(f);
  return tumYemekler().filter(y => y.id !== f.id && uygun(y)).map(y => {
    const ortak = [...kelimeler(y)].filter(w => kf.has(w)).length;
    if (!ortak && grup(y) !== grup(f)) return null;
    const [b1, b2, b3] = oz(y);
    const puan = Math.abs(a1 - b1) * 2 + Math.abs(a2 - b2) + Math.abs(a3 - b3) - ortak * 0.9 + (y.kat === f.kat ? 0 : 0.8) - (f.b && y.b === f.b ? 0.8 : 0) + (DOKTOR_DISI.has(y.id) ? 0.5 : 0);   // aynı birim (ör. dilim) öne
    return [y.id, puan];
  }).filter(Boolean).sort((a, b) => a[1] - b[1]).slice(0, 20).map(([id]) => id);
}
// opts.ogun + opts.sonra: başkası için program ekranı (profil filtresi yok, seçim geri çağrıyla döner)
function secimAc(opts){
  const ogun = opts.ogun || menuOku(aktif)[opts.oi];
  SE = {...opts, ogunId: ogun.id, q:'', sec:null, g:0};
  SE.uygun = opts.koc ? () => true : profilUygun(D.profil);
  SE.son = sonSecilenler(ogun.id).filter(f => SE.uygun(yemek(f)));
  SE.mevcut = SE.ii !== undefined ? {...ogun.ogeler[SE.ii]} : null;
  SE.benzer = SE.mevcut ? benzerler(SE.mevcut.f, SE.uygun) : [];
  SE.kat = SE.benzer.length ? BENZER : SE.son.length ? SON : TUMU;   // değiştir/kıyasla: benzerleri; ekle: son seçilenler
  const baslik = T({ekle:'pAdd', degis:'pChange', kiyas:'pCompare'}[SE.mod], {o: ogunAd(ogun)});
  ac(esc(baslik) + (!opts.koc && gecmisMi(aktif) ? ` <span class="tag">${etiket(aktif)}</span>` : ''));
  listeGorunumu();
}
// Kıyaslarken adayın başlangıç miktarı: aynı ağırlığa denk gelen miktar
function esdegerMiktar(adayId){
  const aday = yemek(adayId);
  if (!SE.mevcut) return aday.d;
  const cf = yemek(SE.mevcut.f);
  if (aday.a && cf.a && aday.b === cf.b) return SE.mevcut.g;
  const gram = gramOf(cf, SE.mevcut.g);
  return aday.a ? Math.max(0.5, Math.round(gram / aday.a * 2) / 2) : yuv(gram);
}
function mevcutKart(){
  if (!SE.mevcut) return '';
  const f = yemek(SE.mevcut.f);
  return `<div class="cur"><small>${T('current')}</small><b>${esc(f.ad)} · ${miktarYazi(f, SE.mevcut.g)}</b><br><small>${bilgi(besin(SE.mevcut.f, SE.mevcut.g))}</small></div>`;
}
function listeGorunumu(){
  const lejant = `<div class="legend"><span><i style="background:var(--green)"></i>${T('good')}</span><span><i style="background:var(--red)"></i>${T('bad')}</span><span>${T('legendRule')}</span></div>`;
  const ipu = SE.mevcut ? `<div class="hint" style="margin-top:6px">${T('diffsFor', {g: yuv(gramOf(yemek(SE.mevcut.f), SE.mevcut.g))})}</div>${lejant}` : '';
  $('sbody').innerHTML = `${mevcutKart()}
    <input class="search" id="ara" type="text" inputmode="search" enterkeyhint="search" name="yemek-ara" role="searchbox" aria-autocomplete="list" placeholder="${esc(T('searchPh'))}" value="${esc(SE.q)}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" data-form-type="other" data-lpignore="true">
    <div class="chips" id="kategoriler"></div>${ipu}
    <div class="found" id="bulunan"></div>
    <ul class="flist" id="flist"></ul>
    <button class="btn ghost full" style="margin-top:12px" id="ozelEkle">${T('addCustom')}</button>`;
  $('ara').addEventListener('input', e => { SE.q = e.target.value; listeCiz(); });
  $('ozelEkle').addEventListener('click', ozelYemekFormu);
  kategoriCiz(); listeCiz();
}
function kategoriCiz(){
  const uygun = SE.uygun;
  const katlar = (SE.benzer.length ? [BENZER] : []).concat(SE.son.length ? [SON] : []).concat([TUMU, ...[...new Set(tumYemekler().filter(uygun).map(f => f.kat))].sort((a, b) => KAT_SIRA.indexOf(a) - KAT_SIRA.indexOf(b))]);
  const ad = k => k === BENZER ? T('similar') : k === SON ? T('recent') : k === TUMU ? T('all') : katAd(k);
  const daralt = SE.benzer.length > 0;   // değiştir/kıyasla modunda gruplar başta kapalı
  const gorunen = daralt && !SE.tumGruplar ? [BENZER] : katlar;
  $('kategoriler').innerHTML = gorunen.map(k => `<button class="chip${k === SON || k === BENZER ? ' recent' : ''}${k === SE.kat ? ' on' : ''}" data-kat="${esc(k)}">${esc(ad(k))}</button>`).join('')
    + (daralt ? `<button class="chip more" data-grup="1">${T(SE.tumGruplar ? 'lessGroups' : 'moreGroups')}</button>` : '');
  $('kategoriler').querySelectorAll('[data-kat]').forEach(b => b.onclick = () => { SE.kat = b.dataset.kat; kategoriCiz(); listeCiz(); });
  const g = $('kategoriler').querySelector('[data-grup]');
  if (g) g.onclick = () => {
    SE.tumGruplar = !SE.tumGruplar;
    if (!SE.tumGruplar && SE.kat !== BENZER){ SE.kat = BENZER; listeCiz(); }   // kapatınca benzerlere dön
    kategoriCiz();
  };
}
function listeCiz(){
  const q = SE.q.trim(), uygun = SE.uygun;
  let liste, A = null;
  if (q){
    // Arama tüm listede yapılır, en iyi eşleşen üstte
    A = aramaHazirla(q);
    liste = tumYemekler().map(f => [f, aramaPuani(f, A)]).filter(([, p]) => p >= 0)
      .sort((a, b) => b[1] - a[1] || a[0].ad.localeCompare(b[0].ad, LOC())).map(([f]) => f);
    $('bulunan').textContent = T('results', {q, n: liste.length});
  } else {
    // Öneri listelerinde profile uymayanlar (yemedikleri, sağlık odağına aykırı) gösterilmez
    // Kategoride: en çok seçtiklerin ve en sık yenenler başta
    liste = (SE.kat === BENZER ? SE.benzer.map(yemek) : SE.kat === SON ? SE.son.map(yemek)
      : tumYemekler().filter(f => SE.kat === TUMU || f.kat === SE.kat).map(f => [f, populerPuan(f)]).sort((a, b) => b[1] - a[1] || a[0].ad.localeCompare(b[0].ad, LOC())).map(([f]) => f)).filter(uygun);
    $('bulunan').textContent = '';
  }
  const sayac = D.son[SE.ogunId] || {};
  const eski = SE.mevcut ? besin(SE.mevcut.f, SE.mevcut.g) : null;
  $('flist').innerHTML = liste.length ? liste.map(f => {
    const alt = eski ? farkPilleri(eski, besin(f.id, esdegerMiktar(f.id))) : '';
    const n = (sayac[f.id] ? `<em>${T('times', {n: sayac[f.id].n})}</em>` : '') + (uygun(f) ? '' : `<em class="uyg">${T('uygunDegil')}</em>`);
    const ip = ipucu(f);
    return `<li><button class="frow" data-fid="${f.id}"><b>${isaretle(f.ad, A)}${n}</b><small>100 ${T('g')}: ${f.k} ${T('kcal')} · ${T('aP')} ${sayi(f.p)} · ${T('aK')} ${sayi(f.c)} · ${T('aS')} ${sayi(f.s)} · ${T('aY')} ${sayi(f.y)}${ip ? ' · ' + esc(ip) : ''}</small>${alt}</button></li>`;
  }).join('') : `<li class="empty">${T('noResult')}</li>`;
  $('flist').querySelectorAll('[data-fid]').forEach(b => b.onclick = () => { SE.sec = b.dataset.fid; SE.g = esdegerMiktar(SE.sec); detayGorunumu(); });
}
function kiyasKarti(eskiF, eskiM, yeniF, yeniM){
  const eski = besin(eskiF.id, eskiM), yeni = besin(yeniF.id, yeniM);
  const satir = ([a, ad, birim], faydali) => {
    const fark = yeni[a] - eski[a];
    return `<div class="crow"><span>${T(ad)} <em>${T(birim)}</em></span><span>${yuv(eski[a])}</span><span>${yuv(yeni[a])}</span><span class="pl ${farkSinif(fark, faydali)}">${fmtFark(fark)}</span></div>`;
  };
  const iyi = [], kotu = [];
  const yon = (f, ad) => T(f > 0 ? 'more' : 'less', {x: T(ad).toLocaleLowerCase(LOC())});
  FAYDALI.forEach(([a, ad]) => { const f = yeni[a] - eski[a]; if (Math.abs(f) >= 0.5) (f > 0 ? iyi : kotu).push(yon(f, ad)); });
  SINIRLI.forEach(([a, ad]) => { const f = yeni[a] - eski[a]; if (Math.abs(f) >= (a === 'k' ? 5 : 0.5)) (f < 0 ? iyi : kotu).push(yon(f, ad)); });
  const yorum = (iyi.length ? `<span class="g">✔ ${iyi.join(', ')}</span>` : '') + (iyi.length && kotu.length ? '<br>' : '') + (kotu.length ? `<span class="r">✖ ${kotu.join(', ')}</span>` : '') || T('same');
  return `<div class="kiyas">
    <div class="cmp-top"><div><small>${T('now')}</small><b>${esc(eskiF.ad)}</b><span>${miktarYazi(eskiF, eskiM)}</span></div><div class="arrow">${T('arrow')}</div><div><small>${T('newer')}</small><b>${esc(yeniF.ad)}</b><span>${miktarYazi(yeniF, yeniM)}</span></div></div>
    <div class="verdict">${yorum}</div>
    <div class="grp good"><h4>${T('goodGroup')}</h4><div class="crow head"><span></span><span>${T('now')}</span><span>${T('newer')}</span><span>${T('diff')}</span></div>${FAYDALI.map(s => satir(s, true)).join('')}</div>
    <div class="grp limit"><h4>${T('limitGroup')}</h4>${SINIRLI.map(s => satir(s, false)).join('')}</div>
  </div>`;
}
function detayGorunumu(){
  const f = yemek(SE.sec), adim = f.a ? 1 : 10;
  const butonlar = {
    ekle: `<button class="btn green" id="onay">${T('addToMeal')}</button>`,
    degis: `<button class="btn green" id="onay">${T('replaceWith')}</button>`,
    kiyas: `<button class="btn ghost" id="kapatBtn">${T('justCompare')}</button><button class="btn green" id="onay">${T('replaceWith')}</button>`
  }[SE.mod];
  const ip = ipucu(f);
  $('sbody').innerHTML = `<div class="det-name">${esc(f.ad)}</div>
    <div class="hint">100 ${T('g')}: ${f.k} ${T('kcal')} · ${T('protein')} ${sayi(f.p)} · ${T('carb')} ${sayi(f.c)} · ${T('sugar')} ${sayi(f.s)} · ${T('fat')} ${sayi(f.y)} · ${T('fiber')} ${sayi(f.l)}${ip ? ' · ' + esc(ip) : ''}</div>
    <div class="stepper">
      <button data-adim="-1" aria-label="${T('dec')}">−</button>
      <input autocomplete="off" autocorrect="off" spellcheck="false" id="gramIn" type="text" inputmode="decimal" value="${sayi(SE.g)}">
      <button data-adim="1" aria-label="${T('inc')}">+</button>
    </div>
    <div class="hint" style="text-align:center" id="birimYazi"></div>
    <div id="karsi"></div>
    <div class="acts">${butonlar}</div>
    <button class="btn ghost full" style="margin-top:8px" id="geri">${T('backList')}</button>`;
  const yenile = () => {
    $('birimYazi').textContent = f.a ? `${birimAd(f)} (≈ ${yuv(gramOf(f, SE.g))} ${T('g')})` : T('gram');
    $('karsi').innerHTML = SE.mevcut
      ? kiyasKarti(yemek(SE.mevcut.f), SE.mevcut.g, f, SE.g)
      : `<div class="cur" style="margin-top:12px"><small>${T('forAmt', {m: miktarYazi(f, SE.g)})}</small><b>${bilgi(besin(SE.sec, SE.g))}</b></div>`;
  };
  $('gramIn').addEventListener('input', e => { SE.g = miktarOku(f, e.target.value); yenile(); });
  $('sbody').querySelectorAll('[data-adim]').forEach(b => b.onclick = () => {
    const yon = +b.dataset.adim, a = f.a && SE.g + yon * adim < 1 ? 0.5 : adim;
    SE.g = Math.max(0, Math.round((SE.g + yon * a) * 2) / 2); $('gramIn').value = sayi(SE.g); yenile();
  });
  $('geri').onclick = listeGorunumu;
  if ($('kapatBtn')) $('kapatBtn').onclick = kapat;
  $('onay').onclick = () => {
    if (!(SE.g > 0)){ toast(T('tZero')); return; }
    kapat();
    if (SE.sonra) SE.sonra(SE.sec, SE.g);
    else if (SE.mod === 'ekle') ogeEkle(SE.oi, SE.sec, SE.g); else ogeDegis(SE.oi, SE.ii, SE.sec, SE.g);
  };
  yenile();
  $('sbody').scrollTop = 0;
}
function ozelYemekFormu(){
  const alan = (id, ad, ek = '') => `<label class="field"><span>${ad}</span><input autocomplete="off" autocorrect="off" spellcheck="false" id="${id}" type="text" inputmode="decimal" ${ek}></label>`;
  $('sbody').innerHTML = `<div class="det-name">${T('cTitle')}</div>
    <div class="hint" style="margin-bottom:12px">${T('cHint')}</div>
    <label class="field"><span>${T('cName')}</span><input autocomplete="off" autocorrect="off" spellcheck="false" id="oAd" placeholder="${esc(T('cNamePh'))}"></label>
    <div class="grid2">
      ${alan('oK', T('tKcal'))}${alan('oP', T('tProtein'))}${alan('oC', T('tCarb'))}${alan('oS', T('sugar') + ' (' + T('g') + ')')}
      ${alan('oY', T('tFat'))}${alan('oL', T('fiber') + ' (' + T('g') + ')')}${alan('oA', T('cPiece'))}${alan('oD', T('cDefault'), 'value="100"')}
    </div>
    <div class="acts"><button class="btn ghost" id="geri">${T('cancel')}</button><button class="btn green" id="oKaydet">${T('save')}</button></div>`;
  $('geri').onclick = listeGorunumu;
  $('oKaydet').onclick = () => {
    const ad = $('oAd').value.trim(); if (!ad){ toast(T('tName')); return; }
    const n = id => Math.max(0, +String($(id).value).replace(/[,٫]/g, '.') || 0);
    const a = n('oA');
    const f = {id:'oz' + Date.now(), ad, kat:'ozel', k:n('oK'), p:n('oP'), c:n('oC'), y:n('oY'), s:n('oS'), l:n('oL'), a, b: a ? 'adet' : '', d: n('oD') || (a ? 1 : 100), e:'', x:'', u:''};
    D.ozelYemek.push(f);
    logEkle('diger', null, T('lCustom', {y: ad}));
    kaydet(); toast(T('tListAdded', {y: ad}));
    SE.sec = f.id; SE.g = esdegerMiktar(f.id); detayGorunumu();
  };
}

// ---------- Tüm loglar ----------
let logFiltre = 'tum', logSayfa = 0;
const LOG_SAYFA = 50, LOG_PARCA = 10;
function loglarAc(){
  ac(T('logsTitle'));
  logSayfa = 0;
  const ciz2 = () => {
    let liste = D.log.slice().reverse();
    if (logFiltre === 'gun') liste = liste.filter(l => l.k === aktif);
    if (logFiltre === 'gecmis') liste = liste.filter(l => l.g);
    const sayfaSay = Math.max(1, Math.ceil(liste.length / LOG_SAYFA));
    logSayfa = Math.min(logSayfa, sayfaSay - 1);
    const sayfa = liste.slice(logSayfa * LOG_SAYFA, (logSayfa + 1) * LOG_SAYFA);
    let gosterilen = Math.min(LOG_PARCA, sayfa.length);
    const f = (id, ad) => `<button class="chip${logFiltre === id ? ' on' : ''}" data-lf="${id}">${ad}</button>`;
    const sayfalar = sayfaSay > 1 ? `<div class="sayfalar">
        <button class="nav-btn" data-ls="${logSayfa - 1}" ${logSayfa === 0 ? 'disabled' : ''} aria-label="‹">‹</button>
        <span>${T('sayfaN', {n: logSayfa + 1, t: sayfaSay, k: liste.length})}</span>
        <button class="nav-btn" data-ls="${logSayfa + 1}" ${logSayfa >= sayfaSay - 1 ? 'disabled' : ''} aria-label="›">›</button></div>` : '';
    $('sbody').innerHTML = `<div class="chips" style="margin-top:0">${f('tum', T('fAll'))}${f('gun', etiket(aktif))}${f('gecmis', T('fPast'))}</div>
      <ul class="logs" id="logListe">${sayfa.length ? sayfa.slice(0, gosterilen).map(l => logSatir(l)).join('') : `<li class="empty">${T('noRecords')}</li>`}</ul>${sayfalar}`;
    $('sbody').querySelectorAll('[data-lf]').forEach(b => b.onclick = () => { logFiltre = b.dataset.lf; logSayfa = 0; ciz2(); });
    $('sbody').querySelectorAll('[data-ls]').forEach(b => b.onclick = () => { logSayfa = +b.dataset.ls; ciz2(); $('sbody').scrollTop = 0; });
    // Aşağı kaydırdıkça sayfanın kalanını 10'ar ekle
    $('sbody').onscroll = () => {
      const g = $('sbody');
      if (gosterilen >= sayfa.length || g.scrollTop + g.clientHeight < g.scrollHeight - 80) return;
      $('logListe').insertAdjacentHTML('beforeend', sayfa.slice(gosterilen, gosterilen + LOG_PARCA).map(l => logSatir(l)).join(''));
      gosterilen += LOG_PARCA;
    };
  };
  ciz2();
}

// ---------- Dil seçimi ----------
function dilListesi(sec){
  return `<div class="opts">${DILLER.map(d => `<button class="opt${d.k === sec ? ' on' : ''}" data-dil="${d.k}"><span class="ic">${d.bayrak}</span><div><b>${d.ad}</b></div></button>`).join('')}</div>`;
}

// ---------- Ayarlar ve yedek ----------
function ayarlarAc(dilAcik = false){
  dilAcik = dilAcik === true;
  const P = D.profil, h = P.hedef ? hedefHesapla(P) : null;
  const alan = k => `<label class="field"><span>${T(HEDEF_ETIKET[k])}</span><input autocomplete="off" autocorrect="off" spellcheck="false" id="p_${k}" type="number" inputmode="numeric" value="${P[k]}"></label>`;
  ac(T('setTitle'), `
    <div class="ayar-ust"><button class="btn" id="logAc">📋 ${T('logs')}</button><button class="btn" id="yazAcBtn">✉️ ${T('fbBtn')}</button><button class="btn dil-ac" id="dilAc" aria-expanded="${!!dilAcik}">🌐 ${dil.toUpperCase()} <i>▾</i></button></div>
    <div id="dilListe" ${dilAcik ? '' : 'hidden'}>${dilListesi(dil)}</div>
    <div class="sec">${T('sProfile')}</div>
    <div class="cur"><b>${esc(P.ad || '—')}</b> · ${P.cins ? T(P.cins === 'k' ? 'female' : 'male') : ''} · ${P.yas} · ${P.boy} cm · ${sayi(P.kilo)} kg${h ? ` · ${T('bmi')} ${sayi(h.vki)}` : ''}<br>
      <small>${hamileMi() ? T('gHamile', {t: P.trimester || 1}) + ' · ' : ''}${P.hedef ? T('goalLbl') + ': ' + T('g_' + P.hedef) + ' · ' + T('a' + P.aktivite) : ''}${(P.odaklar || []).length ? ' · ' + T('odakLbl') + ': ' + P.odaklar.map(k => T(k === 'seker' ? 'g_seker' : 'o_' + k)).join(', ') : ''}<br>
      ${T('alerjiLbl')}: ${(P.alerjiler || []).length ? P.alerjiler.map(a => esc((alerjen(a) || {ad:a}).ad)).join(', ') : T('alerjiYok')}</small></div>
    <div class="acts"><button class="btn solid" id="profilDuzenle">${T('editProfile')}</button><button class="btn" id="alerjiDuzenle">${T('editAlerji')}</button></div>
    <div class="sec">${T('sBody')}</div>
    <div class="grid3">${[['yas', 'age', 1], ['boy', 'height', 1], ['kilo', 'weight', 0.5]].map(([k, ad]) => `<label class="field"><span>${T(ad)}</span><input autocomplete="off" id="b_${k}" type="text" inputmode="decimal" value="${sayi(P[k])}"></label>`).join('')}</div>
    <div class="hint" style="margin:-4px 0 8px">${T('bodyHint')}</div>
    <button class="btn full" id="olcuKaydet">${T('bodySave')}</button>
    <div class="sec">${T('sSaat')}</div>
    ${saatFormu()}
    <div class="sec">${T('sTargets')}</div>
    <div class="grid3">${HEDEF_KEYS.filter(k => k !== 'su' && k !== 'bardak').map(alan).join('')}
      <label class="field"><span>${T('bardakSu')}</span><div class="ikili"><input autocomplete="off" id="p_bardak" type="text" inputmode="numeric" value="${P.bardak}" aria-label="${esc(T('tGlass'))}"><b>/</b><input autocomplete="off" id="p_su" type="text" inputmode="numeric" value="${P.su}" aria-label="${esc(T('tWater'))}"></div></label></div>
    <button class="btn full" id="hedefKaydet">${T('save')}</button>
    <div class="sec">${T('sProg')}</div>
    ${D.program ? `<div class="acts" style="margin-top:0;margin-bottom:8px"><button class="btn ghost" id="progKaldirBtn">${T('progRemove')}</button></div>` : ''}
    <div class="hint">${esc(T('impPasteHint'))}</div>
    <div class="link-yapistir"><input class="search" id="linkYapistir" type="url" autocomplete="off" placeholder="https://…#p=…"><button class="btn" id="linkYukle">${T('impPasteBtn')}</button></div>
    ${/^https?:$/.test(location.protocol) && !bagimsiz() ? `<div class="sec">${T('instTitle')}</div><button class="btn solid full" id="yukleBtn">${T('instBtn')}</button>` : ''}
    <div class="sec">${T('sBackup')}</div>
    <div class="tip">${T('backupTip')}</div>
    <div class="acts"><button class="btn" id="yedekIndir">${T('dlBackup')}</button><button class="btn" id="yedekYukle">${T('ulBackup')}</button></div>
    <button class="btn ghost full" style="margin-top:8px" id="htmlIndir">${T('dlHtml')}</button>
    <div class="hint" style="margin-top:6px">${T('htmlHint')}</div>
    <input type="file" id="dosyaSec" accept=".json,application/json" hidden>
    <div class="sec">${T('sReset')}</div>
    <div class="acts"><button class="btn danger" id="planSifirla">${T('resetMenu')}</button><button class="btn danger" id="kayitSifirla">${T('resetRec')}</button></div>`);
  $('profilDuzenle').onclick = () => { kapat(); sihirbazAc(1); };
  $('alerjiDuzenle').onclick = () => { kapat(); sihirbazAc('alerji'); };
  saatFormuBagla();
  if ($('progKaldirBtn')) $('progKaldirBtn').onclick = programKaldir;
  if ($('yukleBtn')) $('yukleBtn').onclick = () => { kapat(); yukleAc(); };
  $('logAc').onclick = () => loglarAc();
  $('yazAcBtn').onclick = yazAc;
  $('dilAc').onclick = () => { const l = $('dilListe'); l.hidden = !l.hidden; $('dilAc').setAttribute('aria-expanded', !l.hidden); };
  $('linkYukle').onclick = async () => { const v = $('linkYapistir').value; kapat(); if (!(await programLinkiAc(v))) toast(T('impBad')); };
  $('olcuKaydet').onclick = () => {
    const oku = k => +String($('b_' + k).value).replace(/[,٫]/g, '.') || 0;
    const yeni = {yas: Math.round(oku('yas')), boy: Math.round(oku('boy')), kilo: Math.round(oku('kilo') * 2) / 2};
    if (!(yeni.yas >= 14 && yeni.yas <= 100 && yeni.boy >= 120 && yeni.boy <= 230 && yeni.kilo >= 30 && yeni.kilo <= 300)){ toast(T('errBody')); return; }
    const degisen = ['yas', 'boy', 'kilo'].filter(k => yeni[k] !== P[k]).map(k => `${T({yas:'age', boy:'height', kilo:'weight'}[k])}: ${sayi(P[k])} → ${sayi(yeni[k])}`);
    if (!degisen.length){ kapat(); return; }
    Object.assign(P, yeni);
    hedefleriYenile();
    logEkle('diger', null, T('lBody', {l: degisen.join(', ')}));
    kaydet(); ciz(); kapat(); toast(T('tSaved'));
    // Gönderilen program varsa planı bozma; yoksa yeni hedeflere göre planı yeniden hazırlamayı sor
    if (!D.program) onayAc(T('cBodyPlan'), () => { planYenile(); kaydet(); ciz(); toast(T('tSaved')); });
  };
  $('sbody').querySelectorAll('[data-dil]').forEach(b => b.onclick = () => { const y = $('sbody').scrollTop; D.ayar.dil = b.dataset.dil; kaydet(); ciz(); ayarlarAc(true); $('sbody').scrollTop = y; });
  $('hedefKaydet').onclick = () => {
    const degisen = [];
    HEDEF_KEYS.forEach(k => { const v = Math.max(0, Math.round(+$('p_' + k).value)) || P[k]; if (v !== P[k]) degisen.push(`${T(HEDEF_ETIKET[k])}: ${P[k]} → ${v}`); P[k] = v; });
    if (degisen.length) logEkle('diger', null, T('lTargets', {l: degisen.join(', ')}));
    kaydet(); ciz(); kapat(); toast(T('tSaved'));
  };
  $('yedekIndir').onclick = () => indir(JSON.stringify(D, null, 1), `${dosyaAdi()}_yedek_${bugunK()}.json`, 'application/json');
  $('yedekYukle').onclick = () => $('dosyaSec').click();
  $('dosyaSec').onchange = e => {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const v = JSON.parse(r.result);
        if (!v || v.v !== 2 || !(v.plan || v.planlar)) throw 0;
        D = tamamla(v);
        logEkle('diger', null, T('lBackup', {f: file.name}));
        kaydet(); kapat(); baslat2();
        toast(T('tBackupOk'));
      } catch(_){ toast(T('tBackupBad')); }
    };
    r.readAsText(file);
  };
  $('htmlIndir').onclick = () => {
    const veri = JSON.stringify(D).replace(/</g, '\\u003c');
    const html = KAYNAK.replace(/(<script type="application\/json" id="gomuluVeri">)[\s\S]*?(<\/script>)/, (_, a, b) => a + veri + b);
    indir(html, `${dosyaAdi()}_diyet_listesi.html`, 'text/html');
  };
  $('planSifirla').onclick = () => {
    onayAc(T('cResetMenu'), () => { planYenile(); kaydet(); ciz(); toast(T('tSaved')); });
  };
  $('kayitSifirla').onclick = () => {
    onayAc(T('cResetRec'), () => { D.kayit = {}; logEkle('diger', null, T('lResetRec')); kaydet(); ciz(); toast(T('tRecDel')); });
  };
}
// Profilden haftalık şablonu yeniden üret; bugün ve sonrasının özel menülerini temizle (geçmiş korunur)
function planYenile(){
  D.planlar = planOlustur(D.profil);
  D.planBaslangic = gunEkle(bugunK(), -haftaGunu(bugunK()));   // bu hafta = 1. hafta
  D.miktar = {};   // yeni planda eski miktar tercihleri geçersiz
  for (const k of Object.keys(D.kayit)) if (k >= bugunK()) delete D.kayit[k].ogunler;
  logEkle('diger', null, T('lPlan', {h: T('g_' + D.profil.hedef), k: D.profil.kcal, p: D.profil.protein}));
}
const dosyaAdi = () => (D.profil.ad || 'diyet').toLocaleLowerCase('tr-TR').replace(/[çğıöşü]/g, c => KATLA[c]).replace(/[^a-z0-9]+/g, '_') || 'diyet';
function indir(icerik, ad, tip){
  const url = URL.createObjectURL(new Blob([icerik], {type: tip + ';charset=utf-8'}));
  const a = document.createElement('a'); a.href = url; a.download = ad;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
  toast(T('tDownloaded', {f: ad}));
}

// ---------- Onay penceresi (X, Esc ya da dışarı dokununca kapanır) ----------
function onayAc(metin, evet, ek = ''){
  ac(T('confirmT'), `<p class="onay-metin">${esc(metin)}</p>${ek}<div class="acts"><button class="btn ghost" id="onayHayir">${T('cancel2')}</button><button class="btn green" id="onayEvet">${T('yes')}</button></div>`);
  $('onayHayir').onclick = kapat;
  $('onayEvet').onclick = () => { kapat(); evet(); };
}

// ---------- Uyarılar ----------
function uyarilarAc(){
  const b = (ik, bas, metin) => `<div class="uyari"><h4>${ik} ${T(bas)}</h4><p>${esc(T(metin))}</p></div>`;
  ac(T('warnTitle'), b('📊', 'wGenelT', 'wGenel') + b('🩺', 'wDoktorT', 'wDoktor') + b('🤰', 'wHamileT', 'wHamile')
    + b('🚫', 'wAlerjiT', 'wAlerji') + b('⚖️', 'wSorumT', 'wSorum') + b('🔒', 'wVeriT', 'wVeri'));
}

// ---------- Bize yazın (öneri / şikâyet) ----------
const DESTEK_EPOSTA = 'destek@maviplay.com';
function yazAc(){
  const cihaz = /iPhone|iPad|iPod/.test(navigator.userAgent) ? 'iOS' : /Android/.test(navigator.userAgent) ? 'Android' : 'PC';
  const link = `mailto:${DESTEK_EPOSTA}?subject=${encodeURIComponent(T('fbSubject'))}&body=${encodeURIComponent(T('fbBody', {dil: dil.toUpperCase(), cihaz}))}`;
  ac(T('fbTitle'), `<p class="onay-metin">${esc(T('fbText'))}</p>
    <div class="cur" style="text-align:center"><b dir="ltr">${DESTEK_EPOSTA}</b></div>
    <div class="acts"><a class="btn solid" href="${link}">${T('fbOpen')}</a><button class="btn ghost" id="epostaKopya">${T('fbCopy')}</button></div>`);
  $('epostaKopya').onclick = () => {
    const bitti = () => toast(T('tCopied'));
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(DESTEK_EPOSTA).then(bitti, () => {});
    else { const t = document.createElement('textarea'); t.value = DESTEK_EPOSTA; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); bitti(); } catch(e){} t.remove(); }
  };
}

// ---------- Hamilelik modu ----------
function hedefleriYenile(){
  const h = hedefHesapla(D.profil);
  Object.assign(D.profil, {kcal:h.kcal, protein:h.protein, karb:h.karb, seker:h.seker, yag:h.yag, lif:h.lif, su:h.su});
}
function hamileDegistir(){
  if (hamileMi()){
    onayAc(T('cHamileOff'), () => {
      D.profil.hamile = false; hedefleriYenile(); planYenile();
      logEkle('diger', null, T('lHamileOff'));
      kaydet(); ciz(); toast(T('tSaved'));
    });
    return;
  }
  let tri = D.profil.trimester || 1;
  const secenek = () => `<div class="opts" id="triSec">${[1, 2, 3].map(n => `<button class="opt${n === tri ? ' on' : ''}" data-tri="${n}"><span class="ic">🤰</span><div><b>${T('tri' + n)}</b></div></button>`).join('')}</div>`;
  onayAc(T('cHamileOn'), () => {
    D.profil.hamile = true; D.profil.trimester = tri; hedefleriYenile(); planYenile();
    logEkle('diger', null, T('lHamileOn', {t: tri}));
    kaydet(); ciz(); toast(T('tSaved'));
  }, `<div class="wsec">${T('trimQ')}</div>${secenek()}<div class="wmsg info">${esc(T('hamileNot'))}</div>`);
  $('sbody').addEventListener('click', e => {
    const b = e.target.closest('[data-tri]'); if (!b) return;
    tri = +b.dataset.tri;
    $('triSec').querySelectorAll('[data-tri]').forEach(x => x.classList.toggle('on', +x.dataset.tri === tri));
  });
}
