// ---------- Fark rozetleri ----------
function fmtFark(n, birim=''){
  const a = Math.abs(n) < 10 ? Math.round(n * 10) / 10 : Math.round(n);
  if (a === 0) return '±0' + birim;
  return (a > 0 ? '+' : '−') + sayi(Math.abs(a)) + birim;
}
// Faydalı (protein, lif): artış yeşil. Sınırlanacak (kalori, karb, şeker, yağ): artış kırmızı.
const FAYDALI = [['p','protein','g'],['l','fiber','g']];
const SINIRLI = [['k','calories','kcal'],['c','carb','g'],['s','sugar','g'],['y','fat','g']];
const KISA = {p:'aP', l:'aL', k:'kcal', c:'aK', s:'aS', y:'aY'};
const farkSinif = (fark, faydali) => Math.abs(fark) < 0.5 ? 'eq' : ((fark > 0) === faydali ? 'up' : 'bad');
function farkPilleri(eski, yeni){
  const pil = (a, faydali) => `<span class="pl ${farkSinif(yeni[a]-eski[a], faydali)}">${T(KISA[a])} ${fmtFark(yeni[a]-eski[a])}</span>`;
  return '<div class="pills">' + FAYDALI.map(([a]) => pil(a, true)).join('') + SINIRLI.map(([a]) => pil(a, false)).join('') + '</div>';
}

// ---------- Arama (regex; büyük/küçük harf, Türkçe/Almanca/Rusça/Arapça harf farkı duyarsız) ----------
const HARF = {a:'aâä', c:'cç', g:'gğ', i:'iıİI', o:'oö', s:'sşß', u:'uüû', 'е':'её', 'ا':'اأإآ', 'ه':'هة', 'ي':'يى'};
const KATLA = {'ç':'c','ğ':'g','ı':'i','i':'i','ö':'o','ş':'s','ü':'u','â':'a','û':'u','ä':'a','ß':'s','ё':'е','أ':'ا','إ':'ا','آ':'ا','ة':'ه','ى':'ي'};
function kelimeDeseni(w){
  return [...w.toLocaleLowerCase(dil === 'tr' ? 'tr-TR' : undefined)].map(ch => {
    const kok = KATLA[ch] || ch;
    if (HARF[kok]) return '[' + HARF[kok] + HARF[kok].toUpperCase() + ']';
    return ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }).join('');
}
// "tavuk haşlama" → kelimelerin hepsi; "balık|yumurta" veya "balık, yumurta" → herhangi biri
function aramaHazirla(q){
  const alternatifler = q.split(/[|,،]/).map(s => s.trim()).filter(Boolean).map(s => s.split(/\s+/).map(w => new RegExp(kelimeDeseni(w), 'i')));
  const hepsi = alternatifler.flat().map(r => r.source);
  return {alternatifler, isaret: hepsi.length ? new RegExp('(' + hepsi.join('|') + ')', 'gi') : null};
}
function aramaPuani(f, A){
  const metin = `${f.ad} ${(f.n || []).join(' ')} ${katAd(f.kat)} ${f.e}`;
  let enIyi = -1;
  for (const kelimeler of A.alternatifler){
    if (!kelimeler.every(r => r.test(metin))) continue;
    let p = 0;
    kelimeler.forEach((r, i) => {
      const m = f.ad.match(r);
      if (!m) p += 1;
      else if (m.index === 0) p += i === 0 ? 8 : 4;
      else if (/[\s(]/.test(f.ad[m.index - 1])) p += 3;
      else p += 2;
    });
    enIyi = Math.max(enIyi, p);
  }
  return enIyi;
}
const isaretle = (ad, A) => A && A.isaret ? ad.split(A.isaret).map((p, i) => i % 2 ? `<mark>${esc(p)}</mark>` : esc(p)).join('') : esc(ad);

// ---------- Tarih ve gün menüsü ----------
const tarihAnahtar = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
const tarihDen = k => { const [y, m, g] = k.split('-').map(Number); return new Date(y, m - 1, g, 12); };
const bugunK = () => tarihAnahtar(new Date());
const haftaGunu = k => (tarihDen(k).getDay() + 6) % 7;
const gunEkle = (k, n) => { const d = tarihDen(k); d.setDate(d.getDate() + n); return tarihAnahtar(d); };
const gunKisa = k => tarihDen(k).toLocaleDateString(LOC(), {weekday: RTL() ? 'narrow' : 'short'}).replace('.', '');
const gunUzun = k => tarihDen(k).toLocaleDateString(LOC(), {weekday:'long'});
const etiket = k => tarihDen(k).toLocaleDateString(LOC(), {day:'numeric', month:'short'}) + ' ' + tarihDen(k).toLocaleDateString(LOC(), {weekday:'short'});
const gecmisMi = k => k < bugunK();
// 4 haftalık dönüşte bu tarihin hafta sırası (0..3); başlangıç planın oluşturulduğu haftanın pazartesisi
function haftaNo(k){
  const n = D.planlar.length || 1, bas = D.planBaslangic || gunEkle(bugunK(), -haftaGunu(bugunK()));
  const fark = Math.round((tarihDen(gunEkle(k, -haftaGunu(k))) - tarihDen(bas)) / 6048e5);
  return ((fark % n) + n) % n;
}

let aktif = bugunK(), detayAcik = false;
const kayitOku = k => D.kayit[k] || {yendi:{}, su:0};
function kayitAl(k){ if (!D.kayit[k]) D.kayit[k] = {yendi:{}, su:0}; return D.kayit[k]; }
// Günün menüsü: o güne ait kayıt varsa o, yoksa haftalık şablon
// Miktar hafızası: bir öğünde yemeğin miktarı değişince, şablondan gelen günlerde aynı öğündeki aynı yemek o miktarla gelir
function sablon(k){
  const gun = D.planlar[haftaNo(k)][haftaGunu(k)], m = D.miktar || {};
  if (!Object.keys(m).length) return gun;
  return gun.map(o => m[o.id] ? {...o, ogeler: o.ogeler.map(it => m[o.id][it.f] != null ? {...it, g: m[o.id][it.f]} : it)} : o);
}
function miktarHatirla(ogunId, f, g){ (D.miktar || (D.miktar = {}))[ogunId] = {...(D.miktar[ogunId] || {}), [f]: g}; }
const menuOku = k => (D.kayit[k] && D.kayit[k].ogunler) || sablon(k);
function menuYaz(k){ const r = kayitAl(k); if (!r.ogunler) r.ogunler = kopya(sablon(k)); return r.ogunler; }
const yenenToplam = k => { const r = kayitOku(k); return topla(menuOku(k).filter(o => r.yendi[o.id]).flatMap(o => o.ogeler)); };
const kayitVar = k => { const r = D.kayit[k]; return !!r && (r.su > 0 || Object.values(r.yendi).some(Boolean)); };

// ---------- Log ----------
function logEkle(tur, k, m){
  D.log.push({t:Date.now(), k, tur, m, g: k ? gecmisMi(k) : false});
  if (D.log.length > 2000) D.log.splice(0, D.log.length - 2000);
}
function logSatir(l, tarihGoster = true){
  const z = new Date(l.t);
  const saat = z.toLocaleDateString(LOC(), {day:'2-digit', month:'2-digit'}) + ' ' + z.toLocaleTimeString(LOC(), {hour:'2-digit', minute:'2-digit'});
  const ad = l.g && l.tur === 'ekle' ? T('lt_gecmisEkle') : T('lt_' + (S['lt_' + l.tur] ? l.tur : 'diger'));
  return `<li class="log"><time>${saat}</time><div class="log-body"><span class="lb ${l.tur}">${ad}</span>${l.g && l.tur !== 'ekle' ? `<span class="lb gecmis">${T('lt_gecmis')}</span>` : ''}${tarihGoster && l.k ? `<b>${etiket(l.k)}</b> · ` : ''}${esc(l.m)}</div></li>`;
}
function toast(m){
  const t = $('toast'); t.textContent = m; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2200);
}

// ---------- Çizim ----------
function selam(){
  const P = D.profil;
  if (!P.ad) return T('greetNo');
  if (dil === 'tr') return T('greetTR', {ad: P.ad, u: P.cins === 'k' ? T('hanim') : T('bey')});
  return T('greet', {ad: '⁨' + P.ad + '⁩'});   // yön yalıtımı: Arapçada Latin isim karışmasın
}
function dilUygula(){
  dil = D.ayar.dil || 'tr';
  document.documentElement.lang = dil;
  document.documentElement.dir = RTL() ? 'rtl' : 'ltr';
}
function ciz(){
  dilUygula();
  const P = D.profil;
  document.title = T('app');
  $('ust').textContent = T('eyebrow');
  $('dilBar').innerHTML = DILLER.map(d => `<button class="lang${d.k === dil ? ' on' : ''}" data-dilsec="${d.k}" title="${d.ad}" aria-pressed="${d.k === dil}"><b>${d.k.toUpperCase()}</b><small>${d.ad}</small></button>`).join('');
  $('baslik').textContent = selam();
  $('lGecmis').textContent = T('history'); $('lLog').textContent = T('logs'); $('lAyar').textContent = T('settings');
  const d = tarihDen(aktif);
  const odak = (P.odaklar || []).map(k => T(k === 'seker' ? 'g_seker' : 'o_' + k));
  const hedef = P.hedef ? [T('g_' + P.hedef), ...odak].join(' + ') + ' · ' : '';
  $('altBaslik').textContent = `${gunUzun(aktif)}, ${d.toLocaleDateString(LOC(), {day:'numeric', month:'long', year:'numeric'})} · ${hedef}${P.kcal} ${T('kcal')} · ${sayi(P.kilo)} kg`;
  $('dipNot').textContent = T('foot');
  gunleriCiz(); ozetCiz(); ogunleriCiz(); altCiz(); logKartCiz(); kayitDurumYaz();
  ustHizala();
}
// Başlık satırı sığmayıp kırılırsa düğmeleri de sola hizala (sağda boşluk kalmasın)
function ustHizala(){
  const satir = document.querySelector('.top-row'); if (!satir) return;
  satir.classList.remove('kirik', 'kirik-dil');
  const ayniSatir = (a, b) => { const x = a.getBoundingClientRect(), y = b.getBoundingClientRect(); return y.top < x.bottom && y.bottom > x.top; };
  const h = $('baslik'), dl = $('dilBar'), db = satir.querySelector('.top-btns');
  // Hepsi tek satıra sığmıyorsa (dil kartları ya da düğmeler alt satıra indiyse) her şeyi sola hizala
  if (!ayniSatir(h, dl) || !ayniSatir(h, db)) satir.classList.add('kirik', 'kirik-dil');
}
window.addEventListener('resize', ustHizala);
function gunleriCiz(){
  const bas = gunEkle(aktif, -haftaGunu(aktif)), son = gunEkle(bas, 6), bugun = bugunK();
  const kisa = k => tarihDen(k).toLocaleDateString(LOC(), {day:'numeric', month:'short'});
  $('haftaNav').innerHTML = `<div class="lbl">${kisa(bas)} – ${kisa(son)}</div><span class="tag hafta-tag">${T('weekN', {n: haftaNo(aktif) + 1, t: D.planlar.length})}</span>
    ${aktif !== bugun ? `<button class="today-btn" data-bugun="1">${T('today')}</button>` : ''}`;
  $('gunler').innerHTML = [0,1,2,3,4,5,6].map(i => {
    const k = gunEkle(bas, i);
    const cls = (k === aktif ? ' active' : '') + (k === bugun ? ' today' : '') + (k < bugun ? ' past' : '');
    return `<button class="day${cls}" data-tarih="${k}"><b>${gunKisa(k)}</b><span>${tarihDen(k).getDate()}</span><i class="${kayitVar(k) ? 'on' : ''}"></i></button>`;
  }).join('');
}
// Hedef çubuğu: hedefe kadar renkli, hedefi aşan kısım kırmızı; hedef noktası çizgiyle işaretli
// Sınır hedeflerinde (kalori, karb, şeker, yağ) aşım kırmızı; "en az" hedeflerinde (protein, lif, su) aşım yeşil
function cubuk(v, hedef, enAz = false){
  if (!hedef) return '<div class="bar"></div>';
  const olcek = Math.max(v, hedef), ok = Math.min(v, hedef) / olcek * 100, fazla = Math.max(0, v - hedef) / olcek * 100;
  return `<div class="bar"><i class="ok" style="width:${ok.toFixed(1)}%"></i>${fazla > 0 ? `<i class="over${enAz ? ' iyi' : ''}" style="width:${fazla.toFixed(1)}%"></i><u style="inset-inline-start:${(hedef / olcek * 100).toFixed(1)}%"></u>` : ''}</div>`;
}
// Çubuğun altındaki satır: kalan miktar, kırmızı aşım ya da yeşil "hedef tamam"
function kalanYazi(v, hedef, birim, enAz = false){
  if (v <= hedef) return `<div class="kalan">${T('remaining', {n: yuv(hedef - v) + ' ' + birim})}</div>`;
  const n = yuv(v - hedef) + ' ' + birim;
  return enAz ? `<div class="kalan tamam">${T('reached', {n})}</div>` : `<div class="kalan asti">${T('over', {n})}</div>`;
}
function ozetCiz(){
  const P = D.profil, kay = kayitOku(aktif), menu = menuOku(aktif), yenen = yenenToplam(aktif);
  const bardakSay = Math.ceil(P.su / P.bardak), ml = kay.su * P.bardak;
  if (gecmisMi(aktif)){
    const yenenOgun = menu.filter(o => kay.yendi[o.id]);
    const stat = (ad, deger, birim, hedef, enAz = false) => {
      const asti = hedef && deger > hedef;
      return `<div class="stat${asti ? (enAz ? ' tamam' : ' asti') : ''}"><small>${ad}</small><b>${deger}</b> <span>${birim}${hedef ? ' / ' + hedef : ''}</span>${asti ? `<div class="kalan ${enAz ? 'tamam' : 'asti'}">${enAz ? '✓ ' : ''}+${deger - hedef} ${birim}</div>` : ''}</div>`;
    };
    $('ozet').innerHTML = `<div class="card past-card">
      <div class="past-head"><h3>${T('daySummary', {d: etiket(aktif)})}</h3><span class="tag">${T('pastRecord')}</span></div>
      <div class="stats">
        <div class="stat water"><small>💧 ${T('water')}</small><b>${litre(ml)}</b> <span>${T('L')} / ${litre(P.su)}</span>
          <div class="stat-acts"><button data-su="-1" aria-label="${T('dec')}">−</button><span>${T('glassN', {n: kay.su})}</span><button data-su="1" aria-label="${T('inc')}">+</button></div></div>
        ${stat(T('calories'), yuv(yenen.k), T('kcal'), P.kcal)}
        ${stat(T('protein'), yuv(yenen.p), T('g'), P.protein, true)}
        ${stat(T('carb'), yuv(yenen.c), T('g'), P.karb)}
        ${stat(T('sugar'), yuv(yenen.s), T('g'), P.seker)}
        ${stat(T('fat'), yuv(yenen.y), T('g'), P.yag)}
        ${stat(T('fiber'), yuv(yenen.l), T('g'), P.lif, true)}
      </div>
      <div class="eaten-list">${yenenOgun.length
        ? `<b>${T('eatenMeals', {n: yenenOgun.length, t: menu.length})}</b> ` + yenenOgun.map(o => `${esc(ogunAd(o))} ${o.saat}`).join(' · ')
        : T('noEaten')}</div>
      <div class="acts"><button class="btn ${detayAcik ? 'ghost' : 'solid'}" data-detay="1">${detayAcik ? T('hideDetail') : T('showDetail')}</button></div>
    </div>`;
    return;
  }
  const plan = topla(menu.flatMap(o => o.ogeler));
  const makro = (cls, ad, a, hedef, enAz = false) => `<div class="macro ${cls}"><small>${ad}</small><b>${yuv(a)}</b><span class="hint"> / <span class="tgt">${hedef}</span> ${T('g')}</span>${cubuk(a, hedef, enAz)}${kalanYazi(a, hedef, T('g'), enAz)}</div>`;
  // Günün planı hedeflerle yan yana; hedefi aşan değer kırmızı
  // Plan yaklaşık olduğu için %3'e kadar aşım kırmızı sayılmaz
  const pHucre = (ad, v, hedef, birim, enAz = false) => `<div class="${hedef && v > hedef * 1.03 ? (enAz ? 'tamam' : 'asti') : ''}"><small>${ad}</small><b>${yuv(v)}</b> <span>/ ${hedef} ${birim}</span></div>`;
  const bardakGoster = Math.max(bardakSay, kay.su);
  $('ozet').innerHTML = `
    <div class="card">
      <h3>${aktif === bugunK() ? T('eatenToday') : T('eaten')}</h3>
      <div class="kcal-big"><b>${yuv(yenen.k)}</b><span>/ <span class="tgt">${P.kcal}</span> ${T('kcal')} · ${T('hedefK')}</span></div>
      ${cubuk(yenen.k, P.kcal)}${kalanYazi(yenen.k, P.kcal, T('kcal'))}
      <div class="macros">${makro('p', T('protein'), yenen.p, P.protein, true)}${makro('c', T('carbS'), yenen.c, P.karb)}${makro('s', T('sugar'), yenen.s, P.seker)}${makro('y', T('fat'), yenen.y, P.yag)}</div>
      <div class="plan-box"><h4>${T('dayPlan')} · ${T('hedefK')}</h4><div class="plan-grid">
        ${pHucre(T('calories'), plan.k, P.kcal, T('kcal'))}${pHucre(T('protein'), plan.p, P.protein, T('g'), true)}${pHucre(T('carbS'), plan.c, P.karb, T('g'))}
        ${pHucre(T('sugar'), plan.s, P.seker, T('g'))}${pHucre(T('fat'), plan.y, P.yag, T('g'))}${pHucre(T('fiber'), plan.l, P.lif, T('g'), true)}
      </div></div>
    </div>
    <div class="card">
      <h3>${T('water')}</h3>
      <div class="water-head"><b>${litre(ml)} ${T('L')}</b><span>/ <span class="tgt">${litre(P.su)} ${T('L')}</span> · ${T('glassN', {n: kay.su + '/' + bardakSay})}</span></div>
      ${cubuk(ml, P.su, true)}${kalanYazi(ml, P.su, 'ml', true)}
      <div class="glasses">${Array.from({length: bardakGoster}, (_, i) => `<button class="glass${i < kay.su ? ' full' : ''}${i >= bardakSay ? ' ekstra' : ''}" data-bardak="${i}" aria-label="${i+1}"></button>`).join('')}</div>
      <div class="water-btns">
        <button class="btn ghost" data-su="-1">${T('minusGlass')}</button>
        <button class="btn solid" data-su="1" style="flex:1">${T('drank', {ml: P.bardak})}</button>
      </div>
    </div>`;
}
function ogunleriCiz(){
  if (gecmisMi(aktif) && !detayAcik){ $('ogunler').innerHTML = ''; return; }
  const menu = menuOku(aktif), kay = kayitOku(aktif), gecmis = gecmisMi(aktif);
  $('ogunler').innerHTML = menu.map((o, oi) => {
    const t = topla(o.ogeler), yendi = !!kay.yendi[o.id];
    const ogeler = o.ogeler.length ? o.ogeler.map((it, ii) => {
      const f = yemek(it.f);
      const agirlik = f.a ? `≈ ${yuv(gramOf(f, it.g))} ${T('g')} · ` : '';
      return `<li class="item">
        <div class="item-row">
          <div class="item-info"><b>${esc(f.ad)}</b><small>${agirlik}${bilgi(besin(it.f, it.g))}</small></div>
          <div class="gram"><button class="adim" data-arti="${oi},${ii}" data-yon="-1" aria-label="${T('dec')}">−</button><label class="val"><input autocomplete="off" autocorrect="off" spellcheck="false" type="text" inputmode="decimal" value="${sayi(it.g)}" data-gram="${oi},${ii}" aria-label="${T('amount')}"><span>${birimAd(f)}</span></label><button class="adim" data-arti="${oi},${ii}" data-yon="1" aria-label="${T('inc')}">+</button></div>
        </div>
        <div class="item-acts">
          <button class="mini cmp" data-kiyas="${oi},${ii}">${T('compare')}</button>
          <button class="mini" data-degis="${oi},${ii}">${T('change')}</button>
          <button class="mini del" data-sil="${oi},${ii}">${T('remove')}</button>
        </div>
      </li>`;
    }).join('') : `<li class="empty">${T('noItems')}</li>`;
    return `<article class="card meal${yendi ? ' eaten' : ''}">
      <div class="meal-head">
        <div class="meal-ico">${o.ico}</div>
        <div class="meal-title"><b>${esc(ogunAd(o))}</b><span>${o.saat} · ${yuv(t.k)} ${T('kcal')} · ${T('aP')} ${yuv(t.p)} ${T('g')} · ${T('aS')} ${yuv(t.s)} ${T('g')}</span></div>
        <button class="eat-btn" data-yedim="${oi}">${yendi ? T('ateDone') : (gecmis ? T('notEaten') : T('ate'))}</button>
      </div>
      <ul class="items">${ogeler}</ul>
      <button class="add-food" data-ekle="${oi}">${T('addFood')}</button>
    </article>`;
  }).join('');
}
function altCiz(){
  if (gecmisMi(aktif) && !detayAcik){ $('altIslem').innerHTML = ''; return; }
  const ozel = !!(D.kayit[aktif] && D.kayit[aktif].ogunler), gun = gunUzun(aktif);
  $('altIslem').innerHTML = `<button class="btn ghost" data-sablon="1">${T('makeDefault', {gun})}</button>`
    + (ozel ? `<button class="btn ghost" data-sablondan="1">${T('revertDay', {gun})}</button>` : '');
}
function logKartCiz(){
  const liste = D.log.filter(l => l.k === aktif).slice(-10).reverse();
  $('logKart').innerHTML = `<div class="log-head"><h3>${T('logOf', {d: etiket(aktif)})}</h3><button class="mini cmp" data-tumlog="1">${T('allLogs')}</button></div>
    <ul class="logs">${liste.length ? liste.map(l => logSatir(l, false)).join('') : `<li class="empty" style="padding:8px 0">${T('noDayLogs')}</li>`}</ul>`;
}

// ---------- Değişiklik işlemleri (hepsi loglanır) ----------
function suDegis(yeni){
  const k = kayitAl(aktif), eski = k.su, max = Math.ceil(D.profil.su / D.profil.bardak) + 8;
  yeni = sinirla(yeni, 0, max);
  if (yeni === eski) return;
  k.su = yeni;
  logEkle('su', aktif, T('lWater', {a: eski, b: yeni, l: litre(yeni * D.profil.bardak)}));
  kaydet(); ciz();
}
function yedimDegis(oi){
  const o = menuYaz(aktif)[oi], k = kayitAl(aktif);
  k.yendi[o.id] = !k.yendi[o.id];
  const t = topla(o.ogeler);
  logEkle('yedim', aktif, k.yendi[o.id]
    ? T('lAte', {o: ogunAd(o), k: yuv(t.k), l: o.ogeler.map(i => yemek(i.f).ad + ' ' + miktarYazi(yemek(i.f), i.g)).join(', ') || '—'})
    : T('lUnate', {o: ogunAd(o)}));
  kaydet(); ciz();
}
function ogeEkle(oi, f, g){
  const o = menuYaz(aktif)[oi], y = yemek(f);
  o.ogeler.push({f, g});
  sonSecimKaydet(o.id, f); miktarHatirla(o.id, f, g);
  logEkle('ekle', aktif, T('lAdd', {o: ogunAd(o), y: y.ad, m: miktarYazi(y, g)}));
  kaydet(); ciz();
  toast(gecmisMi(aktif) ? T('tAddedPast', {d: etiket(aktif)}) : T('tAdded', {y: y.ad}));
}
function ogeDegis(oi, ii, f, g){
  const o = menuYaz(aktif)[oi], eski = o.ogeler[ii];
  if (eski.f === f && eski.g === g) return;
  o.ogeler[ii] = {f, g};
  sonSecimKaydet(o.id, f); miktarHatirla(o.id, f, g);
  const ey = yemek(eski.f), yy = yemek(f);
  logEkle('degis', aktif, T('lChange', {o: ogunAd(o), a: `${ey.ad} ${miktarYazi(ey, eski.g)}`, b: `${yy.ad} ${miktarYazi(yy, g)}`}));
  kaydet(); ciz(); toast(T('tReplaced', {y: yy.ad}));
}
function miktarDegis(oi, ii, ham){
  const o = menuYaz(aktif)[oi], it = o.ogeler[ii], f = yemek(it.f), g = miktarOku(f, ham);
  if (it.g === g){ ciz(); return; }
  // Aynı yemeğe art arda basılırsa (10 sn içinde) tek log satırında birleştir: ilk değer → son değer
  const anahtar = `${aktif}|${oi}|${ii}|${it.f}`, son = D.log[D.log.length - 1];
  if (son && son.tur === 'gram' && son.a === anahtar && Date.now() - son.t < 10000){
    son.m = T('lAmount', {o: ogunAd(o), y: f.ad, a: son.ilk, b: miktarYazi(f, g)}); son.t = Date.now();
  } else {
    logEkle('gram', aktif, T('lAmount', {o: ogunAd(o), y: f.ad, a: miktarYazi(f, it.g), b: miktarYazi(f, g)}));
    Object.assign(D.log[D.log.length - 1], {a: anahtar, ilk: miktarYazi(f, it.g)});
  }
  it.g = g; miktarHatirla(o.id, it.f, g); kaydet(); ciz();
}
// − / + düğmesi: adette 1'er (1'in altında 0,5), gramda 10'ar (30 g'a kadar 5'er); en az bir adım kalır
function miktarAdim(oi, ii, yon){
  const it = menuOku(aktif)[oi].ogeler[ii], f = yemek(it.f), m = it.g;
  const adim = f.a ? (m + yon < 1 || (yon > 0 && m < 1) ? 0.5 : 1) : (m + yon * 5 <= 30 ? 5 : 10);
  miktarDegis(oi, ii, Math.max(f.a ? 0.5 : 5, m + yon * adim));
}
function ogeSil(oi, ii){
  const o = menuYaz(aktif)[oi], it = o.ogeler[ii], f = yemek(it.f);
  o.ogeler.splice(ii, 1);
  logEkle('sil', aktif, T('lRemove', {o: ogunAd(o), y: f.ad, m: miktarYazi(f, it.g)}));
  kaydet(); ciz(); toast(T('tRemoved', {y: f.ad}));
}
// ---------- Son seçilenler (öğün bazında) ----------
function sonSecimKaydet(ogunId, f){
  const s = D.son[ogunId] || (D.son[ogunId] = {});
  s[f] = {n: (s[f] ? s[f].n : 0) + 1, t: Date.now()};
}
function sonSecilenler(ogunId){
  const puan = {};
  D.planlar.flat().forEach(gun => gun.filter(o => o.id === ogunId).forEach(o => o.ogeler.forEach(it => puan[it.f] = (puan[it.f] || 0) + 1)));
  for (const [f, v] of Object.entries(D.son[ogunId] || {})) puan[f] = (puan[f] || 0) + v.n * 10 + v.t / 1e14;
  const varOlan = new Set(tumYemekler().map(f => f.id));
  return Object.entries(puan).filter(([f]) => varOlan.has(f)).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([f]) => f);
}
