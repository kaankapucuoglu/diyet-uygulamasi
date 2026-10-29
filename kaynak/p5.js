// ---------- Öğün düzeni ve temel menü ----------
const ANAHTAR = 'diyet_uygulamasi_v1', ESKI_ANAHTAR = 'kaan_diyet_v2';
const SURUM = 7;
// Doktor listesindeki öğün düzeni: 3 ana + 2 ara öğün
const OGUN_TANIM = [
  {id:'kahvalti', ad:'Kahvaltı', saat:'08:30', ico:'☀️'},
  {id:'ogle', ad:'Öğle Yemeği', saat:'12:00', ico:'🥗'},
  {id:'ara1', ad:'Ara Öğün', saat:'15:00', ico:'🍎'},
  {id:'aksam', ad:'Akşam Yemeği', saat:'19:30', ico:'🍗'},
  {id:'gece', ad:'Gece Ara Öğün', saat:'21:30', ico:'🌙'}
];
// Doktor listesi temelli, protein ağırlıklı temel hafta (Pzt..Paz); plan bu menüden hedefe göre ölçeklenir
const ORNEK_PLAN = [
  [[['yumurta',2],['beyazp',2],['cavdar',2],['zeytin',5],['domates',100],['salatalik',100]],
   [['tavuk',150],['nohut_salata',100],['salata',150],['tamekmek',1]],
   [['suzme',150],['ceviz',10],['elma',1]],
   [['levrek',200],['izgarasebze',200],['cacik',150],['tamekmek',1]],
   [['kefir',200],['badem',10]]],
  [[['menemen',200],['lor',45],['tamekmek',2],['salatalik',100]],
   [['mcorba',250],['tavuk_hasl',120],['yogurt',100],['tamekmek',1]],
   [['kahve',1],['leblebi',30],['bitter',2]],
   [['tavuk_sis',200],['firin_sebze',200],['coban',150],['tamekmek',1]],
   [['yogurt',150],['ceviz',10],['keten',5]]],
  [[['tamekmek',2],['lor',60],['yumurta',1],['ybeyaz',2],['zeytin',5],['salatalik',100]],
   [['tavuk',150],['salata',200],['beyazp',1],['yogurt',60],['galeta',1],['tamekmek',1]],
   [['kefir',250],['kabak_cek',15]],
   [['biftek',170],['brokoli',150],['karnabahar',150],['salata',100],['tamekmek',1]],
   [['chia_puding',150]]],
  [[['yumurta',2],['cavdar',1],['beyazp',1],['domates',100],['salatalik',100]],
   [['lavas',0.5],['dana_sis',180],['salata',100],['ayran',250]],
   [['suzme',150],['armut',1],['ceviz',10]],
   [['levrek_firin',200],['kinoa',100],['coban',150]],
   [['yogurt',150],['keten',5],['galeta',1]]],
  [[['omlet',120],['ybeyaz',2],['beyazp',1],['cavdar',2],['zeytin',5],['domates',100]],
   [['piyaz',150],['tavuk_firin',120],['ayran',250],['cavdar',1]],
   [['kahve',1],['badem',15],['bitter',2]],
   [['tavuk_baget',200],['patates_firin',100],['salata',150]],
   [['kefir',200],['kabak_cek',10]]],
  [[['yumurta',2],['lor',45],['tamekmek',2],['domates',100],['salatalik',100],['zeytin',5]],
   [['mkofte',4],['tavuk_hasl',130],['yogurt',150],['salata',100]],
   [['suzme',150],['cilek',100],['ceviz',10]],
   [['tavuk_kofte',180],['coban',150],['cacik',150],['tamekmek',1]],
   [['chia_puding',150]]],
  [[['pankek',150],['yogurt',100],['yumurta',1],['beyazp',1]],
   [['tavuk',150],['kinoa',100],['salata',150],['ayran',250]],
   [['kefir',250],['elma',1],['badem',10]],
   [['somon',150],['salata',150],['cavdar',1]],
   [['chia_puding',150]]]
];
// Dönen 2., 3. ve 4. haftalar (aynı kurallar, farklı yemekler) — doktor listesi gibi 4 haftada bir tekrar eder
const HAFTA_2 = [
  [[['omlet',150],['lor',45],['cavdar',2],['domates',100],['salatalik',100]], [['hindi',150],['bulgur',120],['cacik',150],['salata',100]],
   [['kefir',250],['findik',15]], [['cipura',200],['hasl_sebze',200],['salata',150],['tamekmek',1]], [['suzme',150],['chia',10]]],
  [[['yulaf',40],['sut',200],['ceviz',10],['elma',1]], [['yesil_mercimek',250],['tavuk_hasl',100],['yogurt',150],['tamekmek',1]],
   [['suzme',150],['mandalina',2]], [['tavuk_firin',180],['ispanak',200],['yogurt',100],['cavdar',1]], [['kefir',200],['badem',10]]],
  [[['yumurta',2],['beyazp',1],['tamekmek',2],['zeytin',5],['salatalik',100]], [['ton',80],['nohut_salata',150],['salata',150]],
   [['kahve',1],['bitter',2],['badem',10]], [['kofte_firin',150],['izgarasebze',200],['cacik',150],['tamekmek',1]], [['firin_elma',1],['yogurt',100],['ceviz',10]]],
  [[['menemen',200],['beyazp',1],['cavdar',2]], [['tavuk_sis',180],['kinoa',100],['coban',150]],
   [['suzme',150],['cilek',100],['keten',5]], [['palamut',200],['salata',150],['tamekmek',1]], [['kefir',200],['kabak_cek',10]]],
  [[['yumurta',2],['lor',45],['tamekmek',2],['domates',100],['zeytin',5]], [['mkofte',4],['tavuk_hasl',100],['ayran',250],['salata',100]],
   [['kefir',200],['armut',1],['ceviz',10]], [['somon_izgara',150],['brokoli',150],['salata',100],['cavdar',1]], [['chia_puding',150]]],
  [[['pankek',150],['suzme',100],['yumurta',1]], [['dana_sis',150],['lavas',0.5],['salata',150],['ayran',250]],
   [['kahve',1],['leblebi',30]], [['tavuk_baget',200],['firin_sebze',200],['yogurt',100]], [['yogurt',150],['keten',5],['galeta',1]]],
  [[['omlet',150],['beyazp',1],['cavdar',2],['domates',100],['salatalik',100]], [['fasulye',250],['bulgur',100],['cacik',150]],
   [['suzme',150],['portakal',1],['badem',10]], [['levrek_bug',200],['hasl_sebze',200],['cavdar',1]], [['kefir',200],['ceviz',10]]]
];
const HAFTA_3 = [
  [[['yumurta_pose',2],['beyazp',1],['cavdar',2],['domates',100],['salatalik',100]], [['tavuk',150],['tammakarna',100],['salata',150]],
   [['kefir',250],['ceviz',10]], [['hamsi',200],['salata',150],['cavdar',1]], [['suzme',150],['cilek',100]]],
  [[['lor',60],['tamekmek',2],['yumurta',1],['zeytin',5],['domates',100]], [['piyaz',150],['tavuk_kofte',150],['salata',100]],
   [['kahve',1],['bitter',2],['findik',10]], [['turlu',250],['yogurt',150],['tamekmek',1]], [['kefir',200],['badem',10]]],
  [[['yulaf',40],['sut',200],['fistikezme',10],['cilek',100]], [['hindi_hasl',150],['nohut_salata',100],['salata',150]],
   [['suzme',150],['elma',1]], [['biftek',150],['izgarasebze',200],['cacik',150]], [['chia_puding',150]]],
  [[['omlet',150],['lor',45],['cavdar',2]], [['mcorba',250],['tavuk_sis',150],['salata',100],['tamekmek',1]],
   [['kefir',250],['kabak_cek',15]], [['cipura',200],['brokoli',150],['salata',100],['cavdar',1]], [['firin_elma',1],['yogurt',100]]],
  [[['yumurta',2],['beyazp',1],['tamekmek',2],['salatalik',100]], [['kabak_kiyma',250],['yogurt',150],['tamekmek',1]],
   [['suzme',150],['mandalina',2]], [['tavuk_firin',180],['kinoa',100],['coban',150]], [['kefir',200],['ceviz',10]]],
  [[['menemen',200],['lor',45],['cavdar',1]], [['ton',80],['tammakarna',100],['salata',150]],
   [['ayran',250],['leblebi',30]], [['bezelye',250],['cacik',150],['cavdar',1]], [['suzme',150],['keten',5]]],
  [[['pankek',150],['yogurt',100],['beyazp',1]], [['tavuk',150],['bulgur',100],['semizotu',150]],
   [['kahve',1],['badem',15]], [['somon',150],['hasl_sebze',200],['cavdar',1]], [['chia_puding',150]]]
];
const HAFTA_4 = [
  [[['omlet',150],['beyazp',1],['tamekmek',2],['zeytin',5],['domates',100]], [['ispanak_kiyma',250],['yogurt',150],['tamekmek',1]],
   [['suzme',150],['armut',1]], [['levrek',200],['firin_sebze',200],['salata',100]], [['kefir',200],['findik',10]]],
  [[['yumurta',2],['lor',45],['cavdar',2],['salatalik',100]], [['tavuk_hasl',150],['kinoa',100],['kereviz',150]],
   [['kahve',1],['bitter',2],['ceviz',10]], [['kabak_dolma',3],['yogurt',150],['salata',100]], [['suzme',150],['chia',10]]],
  [[['yulaf',40],['suzme',150],['elma',1],['ceviz',10]], [['dana_sis',150],['bulgur',100],['coban',150]],
   [['kefir',250],['kabak_cek',10]], [['hindi',150],['brokoli',150],['mcorba',250]], [['firin_elma',1],['yogurt',100]]],
  [[['yumurta_pose',2],['beyazp',1],['cavdar',2],['domates',100]], [['nohut_ispanak',250],['tavuk_hasl',100],['yogurt',100]],
   [['suzme',150],['cilek',100]], [['palamut',200],['salata',150],['tamekmek',1]], [['kefir',200],['badem',10]]],
  [[['menemen',200],['lor',45],['tamekmek',1]], [['tavuk_sis',180],['tammakarna',100],['salata',150]],
   [['ayran',250],['leblebi',30]], [['karniyarik',250],['cacik',150]], [['chia_puding',150]]],
  [[['omlet',150],['beyazp',1],['cavdar',2],['salatalik',100]], [['yayla',250],['hindi',150],['salata',100],['tamekmek',1]],
   [['kahve',1],['findik',15]], [['cipura',200],['hasl_sebze',200],['cavdar',1]], [['kefir',200],['ceviz',10]]],
  [[['pankek',150],['suzme',100],['yumurta',1]], [['biftek',150],['patates_firin',100],['salata',150]],
   [['suzme',150],['portakal',1]], [['tavuk_kofte',180],['izgarasebze',200],['cacik',150]], [['yogurt',150],['keten',5],['galeta',1]]]
];
const TEMEL_HAFTALAR = [ORNEK_PLAN, HAFTA_2, HAFTA_3, HAFTA_4];
// Yenmeyen/sınırlı yemek için öncelikli karşılıklar (sırayla ilk izinli olan)
const TERCIH = {
  beyazp:['lor','tofu'], kasar:['lor','tofu'], zeytin:['ceviz','badem'], ton:['tavuk_hasl','levrek','tofu'], leblebi:['kabak_cek','badem'],
  ayran:['kefir','soya_sut'], yayla:['mcorba','scorba'], kofte:['tavuk_kofte','mkofte'], kofte_firin:['tavuk_kofte','mkofte'], kofte_tava:['tavuk_kofte','mkofte'],
  biftek_tava:['biftek','tavuk','tofu'], manti:['tammakarna'], patates_kizartma:['patates_firin'], karniyarik:['firin_sebze'], hamsi_tava:['hamsi','tavuk','tofu'],
  yumurta:['tofu'], ybeyaz:['tofu'], omlet:['tofu'], menemen:['tofu'], cilbir:['tofu'], pankek:['yulaf'],
  yogurt:['soya_yogurt'], suzme:['soya_yogurt'], kefir:['soya_sut'], sut:['soya_sut'], cacik:['soya_yogurt'], semizotu:['salata'], kereviz:['salata']
};
const SIVI = new Set(['sut','kefir','ayran','soya_sut','kahve','yesilcay']);
// Kalori yetmezse ara öğüne eklenecek besleyici seçenekler (ilk uygun olan)
const EK_SECENEK = [[['yulaf',50],['sut',250],['fistikezme',15]], [['yulaf',50],['soya_sut',250],['fistikezme',15]], [['tamekmek',2],['fistikezme',20],['domates',100]],
  [['badem',30],['galeta',2]], [['tpatates',200],['zeytinyagi',5]], [['kinoa',150],['nohut',80]], [['muz',1],['ceviz',20]], [['patlak',4],['hurma',25]]];   // sona doğru alerjiye uygun seçenekler

const BOS_PROFIL = {ad:'', cins:'', hamile:false, ara0:false, trimester:1, yas:30, boy:170, kilo:70, hedefKilo:65, hedef:'', odaklar:[], alerjiler:[], aktivite:2, hiz:0.5, haric:[],
  kcal:1800, protein:130, karb:180, seker:55, yag:60, lif:25, su:2500, bardak:250};
const HEDEF_KEYS = ['kcal','protein','karb','seker','yag','su','bardak'];
const HEDEF_ETIKET = {kcal:'tKcal', protein:'tProtein', karb:'tCarb', seker:'tSugar', yag:'tFat', su:'tWater', bardak:'tGlass'};

function varsayilanDurum(){
  return {v:2, surum:SURUM, guncel:0, profil:{...BOS_PROFIL}, ayar:{dil:'tr', kurulum:false}, ozelYemek:[], log:[], son:{}, kayit:{}, planlar:[], planBaslangic:''};
}
// Eski sürüm verisini yeni yapıya taşı (geçmiş kayıtlar korunur, profil sihirbazda tamamlanır)
function tamamla(x){
  for (const k of ['ozelYemek','log']) if (!x[k]) x[k] = [];
  for (const k of ['son','kayit']) if (!x[k]) x[k] = {};
  if (!x.ayar) x.ayar = {dil:'tr', kurulum:false};
  x.profil = {...BOS_PROFIL, ...x.profil};
  if (!x.profil.haric) x.profil.haric = [];
  if (!x.profil.odaklar) x.profil.odaklar = [];
  if (!x.profil.alerjiler) x.profil.alerjiler = [];
  // Eski tek seçimli "Kan şekeri" hedefi → kilo hedefi + kan şekeri odağı
  if (x.profil.hedef === 'seker'){
    x.profil.hedef = vki(x.profil) >= 25 ? 'ver' : 'koru';
    if (!x.profil.odaklar.includes('seker')) x.profil.odaklar.push('seker');
  }
  x.ozelYemek.forEach(f => {
    if (f.s == null) f.s = 0; if (f.l == null) f.l = 0; if (f.a == null) f.a = 0; if (!f.b) f.b = f.a ? 'adet' : '';
    if (!f.e) f.e = ''; f.x = f.x || ''; f.kat = 'ozel';
  });
  if ((x.surum || 0) < 3){
    // v2: adetli yemekler gram tutuluyordu → adet/dilime çevir
    const cevir = ogunler => ogunler.forEach(o => o.ogeler.forEach(it => {
      const f = YEMEKLER.find(y => y.id === it.f);
      if (f && f.a) it.g = Math.max(0.5, Math.round(it.g / f.a * 2) / 2);
    }));
    Object.values(x.kayit).forEach(r => { if (r.ogunler) cevir(r.ogunler); });
  }
  if ((x.surum || 0) < 6) (x.plan || (x.planlar && x.planlar[0]) || []).forEach(gun => gun.forEach(o => o.ogeler.forEach(it => {
    const f = YEMEKLER.find(y => y.id === it.f);
    if (f && f.kat === 'meyve' && f.a && it.g > 2) it.g = 2;
  })));
  // Tek haftalık eski plan → 1. hafta (kullanıcının değişiklikleri korunur); eksik haftalar açılışta profile göre üretilir
  if (!x.planlar){ x.planlar = x.plan && x.plan.length ? [x.plan] : []; delete x.plan; }
  if (!x.planBaslangic) x.planBaslangic = '';
  x.surum = SURUM;
  return x;
}

// ---------- Kayıt: localStorage + IndexedDB + gömülü veri ----------
let D = null, depoCalisiyor = true;
function gomuluOku(){ try { return JSON.parse(document.getElementById('gomuluVeri').textContent); } catch(e){ return null; } }
function lsOku(){
  try {
    const s = localStorage.getItem(ANAHTAR) || localStorage.getItem(ESKI_ANAHTAR);
    return s ? JSON.parse(s) : null;
  } catch(e){ depoCalisiyor = false; return null; }
}
function idbAc(){
  return new Promise((res, rej) => {
    try {
      const r = indexedDB.open('diyet_uygulamasi', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('veri');
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    } catch(e){ rej(e); }
  });
}
async function idbOku(){
  try {
    const db = await idbAc();
    return await new Promise(res => {
      const q = db.transaction('veri').objectStore('veri').get(ANAHTAR);
      q.onsuccess = () => res(q.result || null);
      q.onerror = () => res(null);
    });
  } catch(e){ return null; }
}
async function idbYaz(veri){
  try { const db = await idbAc(); db.transaction('veri','readwrite').objectStore('veri').put(veri, ANAHTAR); } catch(e){}
}
let kayitZamani = null;
function kaydet(){
  D.guncel = Date.now();
  let ok = true;
  try { localStorage.setItem(ANAHTAR, JSON.stringify(D)); } catch(e){ ok = false; }
  idbYaz(kopya(D));
  depoCalisiyor = ok;
  kayitZamani = new Date();
  kayitDurumYaz();
}
function kayitDurumYaz(){
  const el = $('kayitDurum');
  if (!depoCalisiyor){ el.className = 'save-chip warn'; el.textContent = T('storageWarn'); return; }
  el.className = 'save-chip';
  el.textContent = T('autosave');
}
const enYeni = (...a) => a.filter(x => x && x.v === 2 && (x.plan || x.planlar)).sort((p, q) => (q.guncel || 0) - (p.guncel || 0))[0] || null;

// ---------- Yardımcılar ----------
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const kopya = x => JSON.parse(JSON.stringify(x));
const tumYemekler = () => YEMEKLER.concat(D.ozelYemek || []);
const yemek = id => tumYemekler().find(f => f.id === id) || {id, ad:'?', kat:'', k:0,p:0,c:0,y:0,s:0,l:0,d:100,a:0,b:'',e:'',x:'',u:''};
const sayi = n => new Intl.NumberFormat(LOC(), {maximumFractionDigits:1, useGrouping:false}).format(n);
const gramOf = (f, m) => f.a ? m * f.a : m;
const birimAd = f => f.a ? (S['u_' + f.b] ? T('u_' + f.b) : f.b) : T('g');
const miktarYazi = (f, m) => `${sayi(m)} ${birimAd(f)}`;
const katAd = k => S['k_' + k] ? T('k_' + k) : k;
const ogunAd = o => S['m_' + o.id] ? T('m_' + o.id) : o.ad;
function ipucu(f){
  if (f.a) return T('piece', {b: birimAd(f), g: f.a});
  if (!f.u) return '';
  const [tur, g] = f.u.split(':');
  return S['h_' + tur] ? T('h_' + tur, {g}) : '';
}
function besin(fid, m){
  const f = yemek(fid), x = gramOf(f, +m || 0) / 100;
  return {k:f.k*x, p:f.p*x, c:f.c*x, s:(f.s||0)*x, y:f.y*x, l:(f.l||0)*x};
}
function topla(ogeler){
  return ogeler.reduce((t, o) => { const b = besin(o.f, o.g); for (const a in t) t[a] += b[a]; return t; }, {k:0,p:0,c:0,s:0,y:0,l:0});
}
const yuv = n => Math.round(n);
const bilgi = b => `${yuv(b.k)} ${T('kcal')} · ${T('aP')} ${yuv(b.p)} · ${T('aK')} ${yuv(b.c)} · ${T('aS')} ${yuv(b.s)} · ${T('aY')} ${yuv(b.y)}`;
const litre = ml => new Intl.NumberFormat(LOC(), {maximumFractionDigits:2}).format(ml / 1000);
function miktarOku(f, v){
  const n = Math.max(0, +String(v).replace(/[,٫]/g, '.') || 0);
  return f.a ? Math.round(n * 2) / 2 : Math.round(n);
}
const sinirla = (v, a, b) => Math.min(b, Math.max(a, v));

// ---------- Hedef hesaplama (Mifflin-St Jeor, FAO/WHO PAL, ISSN, WHO) ----------
const PAL = [1.2, 1.375, 1.55, 1.725, 1.9];
const PROTEIN_KG = {ver:1.8, sekil:2.0, koru:1.2, kas:1.8, al:1.6};
// Ek sağlık odakları kalori hedefine eklenen kurallardır; menüde dışlanacak içerik harfi (t tuzlu, y doymuş yağı yüksek)
const ODAKLAR = [['seker','🩺',''], ['tansiyon','❤️','t'], ['kolesterol','🫀','y']];
function vki(p){ return p.kilo / Math.pow(p.boy / 100, 2); }
function vkiSinif(b){ return b < 18.5 ? 'bmi1' : b < 25 ? 'bmi2' : b < 30 ? 'bmi3' : 'bmi4'; }
function hedefHesapla(p){
  const bmr = 10 * p.kilo + 6.25 * p.boy - 5 * p.yas + (p.cins === 'k' ? -161 : 5);
  const tdee = bmr * PAL[(p.aktivite || 2) - 1];
  const b = vki(p), od = new Set(p.odaklar || []), seker = od.has('seker');
  const hamile = p.cins === 'k' && !!p.hamile, tri = p.trimester || 1;
  let kcal = tdee;
  if (hamile) kcal = tdee + [0, 340, 450][tri - 1];
  else if (p.hedef === 'ver') kcal = tdee - Math.min(p.hiz * 7700 / 7, tdee * 0.25);
  else if (p.hedef === 'sekil') kcal = tdee * 0.9;
  else if (p.hedef === 'kas') kcal = tdee * 1.1;
  else if (p.hedef === 'al') kcal = tdee * 1.15;
  const taban = p.cins === 'k' ? 1200 : 1500;
  kcal = Math.round(Math.max(kcal, Math.min(taban, tdee)) / 50) * 50;
  const refKilo = b > 25 ? 25 * Math.pow(p.boy / 100, 2) : p.kilo;
  const pKg = Math.max(PROTEIN_KG[p.hedef] || 1.2, seker ? 1.3 : 0);
  const protein = Math.round(Math.min(hamile ? 1.1 * p.kilo + (tri >= 2 ? 25 : 0) : pKg * refKilo, kcal * 0.35 / 4));
  // Kan şekeri: yağ %30, karbonhidrat en çok %40, şeker %10 · Kolesterol: yağ %28'de kalır, doymuş yağlı kalemler menüden çıkar
  const yag = Math.round(kcal * (seker ? 0.30 : 0.28) / 9);
  let karb = Math.round((kcal - protein * 4 - yag * 9) / 4);
  if (seker) karb = Math.min(karb, Math.round(kcal * 0.40 / 4));
  const sekerG = Math.round(kcal * (seker ? 0.10 : 0.13) / 4);
  // Lif: 14 g/1000 kcal; kolesterol ve kan şekerinde en az 30 g (çözünür lif LDL ve kan şekerini düşürür)
  const lif = Math.max(Math.round(kcal / 1000 * 14), od.has('kolesterol') || seker ? 30 : 0);
  const su = sinirla(Math.round((p.kilo * 35 + (p.aktivite >= 3 ? 500 : 0) + (hamile ? 300 : 0)) / 250) * 250, 1500, 4000);
  let hafta = 0;
  if (!hamile && p.hedef === 'ver' && p.hedefKilo < p.kilo) hafta = Math.ceil((p.kilo - p.hedefKilo) / p.hiz);
  if (!hamile && p.hedef === 'al' && p.hedefKilo > p.kilo) hafta = Math.ceil((p.hedefKilo - p.kilo) / 0.35);
  return {bmr:Math.round(bmr), tdee:Math.round(tdee), vki:b, kcal, protein, karb, seker: sekerG, yag, lif, su, hafta};
}

// ---------- Plan üretici ----------
// Rol: P protein kaynağı, K karbonhidrat kaynağı, Y yağ kaynağı, S sabit (sebze, karışık yemek, içecek)
function rol(f){
  if (!f.k) return 'S';
  const ps = f.p * 4 / f.k, cs = f.c * 4 / f.k, ys = f.y * 9 / f.k;
  if (['et','balik','yumurta','bitkisel'].includes(f.kat) || ps >= 0.4) return 'P';
  if (ys >= 0.6) return 'Y';
  if (cs >= 0.5 && ['tahil','pilav','meyve','baklagil','anayemek'].includes(f.kat)) return 'K';
  return 'S';
}
// Miktarı birime göre yuvarla: yumurta tam adet, diğer adetler 0,5'lik (ekmek en çok 3 dilim); gram 30 altı 5'lik, üstü 10'luk
function yuvarla(f, m){
  if (f.a){
    if (f.kat === 'yumurta') return sinirla(Math.round(m), 1, f.id === 'ybeyaz' ? 6 : 4);
    return sinirla(Math.round(m * 2) / 2, 0.5, f.b === 'dilim' ? 3 : f.kat === 'meyve' ? 2 : 4);
  }
  return sinirla(m < 30 ? Math.round(m / 5) * 5 : Math.round(m / 10) * 10, 5, 400);
}
function birlestir(ogeler){
  const m = new Map();
  ogeler.forEach(it => m.set(it.f, (m.get(it.f) || 0) + it.g));
  return [...m].map(([f, g]) => ({f, g: yuvarla(yemek(f), g)}));
}
// Profile uygun mu: yenmeyenler + sağlık odaklarının dışladığı içerik (tansiyon: tuzlu, kolesterol: doymuş yağı yüksek)
function profilUygun(p){
  const haric = new Set([...(p.haric || []), ...ODAKLAR.filter(([k]) => (p.odaklar || []).includes(k)).map(([, , x]) => x).filter(Boolean)]);
  const alerji = new Set(p.alerjiler || []), hamile = p.cins === 'k' && !!p.hamile;
  return f => !(f.x || '').split('').some(c => haric.has(c)) && !(f.al || []).some(a => alerji.has(a)) && !(hamile && HAMILE_DISI.has(f.id));
}
// 4 haftalık dönen plan: her temel hafta aynı kurallarla profile göre hazırlanır
const planOlustur = p => TEMEL_HAFTALAR.map(h => araOgunEkle(p, haftaOlustur(p, h)));
// Kuşluk ara öğün isteyene: ikindi ara öğününden bir kalem (tercihen meyve) kahvaltıdan sonraya taşınır, günlük kalori değişmez
function araOgunEkle(p, hafta){
  if (!p.ara0) return hafta;
  const izinli = profilUygun(p);
  return hafta.map(gun => {
    if (gun.some(o => o.id === 'ara0')) return gun;
    const ara1 = gun.find(o => o.id === 'ara1'), ogeler = [];
    if (ara1 && ara1.ogeler.length > 1){
      let i = ara1.ogeler.findIndex(it => yemek(it.f).kat === 'meyve');
      if (i < 0) i = ara1.ogeler.length - 1;
      ogeler.push(ara1.ogeler.splice(i, 1)[0]);
    } else {
      const f = ['elma','mandalina','armut','portakal'].find(id => izinli(yemek(id)));
      if (f) ogeler.push({f, g: 1});
    }
    const ki = gun.findIndex(o => o.id === 'kahvalti');
    return [...gun.slice(0, ki + 1), {id:'ara0', ad:'Kuşluk Ara Öğün', saat:VARSAYILAN_SAAT.ara0, ico:OGUN_IKON.ara0, ogeler}, ...gun.slice(ki + 1)];
  });
}
function haftaOlustur(p, temel){
  const izinli = profilUygun(p);
  const kullanilan = {};
  // Yenmeyen yemeği, benzer makro dağılımlı izinli bir yemekle aynı kaloride değiştir
  const degistir = it => {
    const f = yemek(it.f);
    if (izinli(f)) return it;
    // Önce akla yatkın karşılık (izinliyse), yoksa makro benzerliğine göre ara
    const tercih = (TERCIH[f.id] || []).map(yemek).find(y => y.id && izinli(y));
    if (tercih){ const gr = besin(it.f, it.g).k / (tercih.k || 1) * 100; return {f: tercih.id, g: yuvarla(tercih, tercih.a ? gr / tercih.a : gr)}; }
    const oz = y => { const k = y.k || 1; return [y.p * 4 / k, y.c * 4 / k, y.y * 9 / k]; };
    const [a1, a2, a3] = oz(f);
    let en = null, enP = 1e9;
    const proteinKat = ['et','balik','yumurta','bitkisel'];
    for (const y of YEMEKLER){
      if (!izinli(y) || DOKTOR_DISI.has(y.id) || y.id === 'whey' || y.id === 'vegan_protein') continue;
      if (SIVI.has(y.id) !== SIVI.has(f.id)) continue;   // içecek yalnız içecekle değişir
      const [b1, b2, b3] = oz(y);
      const katUyum = y.kat === f.kat ? 0 : (proteinKat.includes(f.kat) && proteinKat.includes(y.kat)) ? 0.2 : 0.8;
      const puan = Math.abs(a1 - b1) * 3 + Math.abs(a2 - b2) + Math.abs(a3 - b3) + katUyum + (kullanilan[y.id] || 0) * 0.12;
      if (puan < enP){ enP = puan; en = y; }
    }
    if (!en) return null;   // uygun karşılık yok (ör. çok sayıda alerji): kalem çıkarılır
    kullanilan[en.id] = (kullanilan[en.id] || 0) + 1;
    const gram = besin(it.f, it.g).k / (en.k || 1) * 100;
    return {f: en.id, g: yuvarla(en, en.a ? gram / en.a : gram)};
  };
  const plan = temel.map(gun => OGUN_TANIM.map((o, i) => ({...o, ogeler: birlestir(gun[i].map(([f, g]) => degistir({f, g})).filter(Boolean))})));
  plan.forEach(gun => gunuOlcekle(gun, p, izinli));
  return plan;
}
function gunuOlcekle(gun, p, izinli){
  const hepsi = () => gun.flatMap(o => o.ogeler);
  const top = r => topla(hepsi().filter(it => !r || rol(yemek(it.f)) === r));
  const uygula = (r, k) => gun.forEach(o => o.ogeler.forEach(it => { const f = yemek(it.f); if (rol(f) === r) it.g = yuvarla(f, it.g * k); }));
  const tumu = () => top().k;
  // 1) Protein hedefi
  const pP = top('P').p, pDiger = tumu() ? top().p - pP : 0;
  if (pP > 0) uygula('P', sinirla((p.protein - pDiger) / pP, 0.6, 2.5));
  // 2) Karbonhidratla kaloriyi tuttur
  const kAyarla = () => { const kK = top('K').k; if (kK > 0) uygula('K', sinirla((p.kcal - (tumu() - kK)) / kK, 0.35, 2.5)); };
  kAyarla();
  // 3) Yağ kaynaklarıyla ince ayar
  const kY = top('Y').k;
  if (kY > 0) uygula('Y', sinirla((kY + p.kcal - tumu()) / kY, 0.5, 1.6));
  // 4) Hâlâ eksikse ara öğünlere sırayla besleyici ek (kas/kilo alma gibi yüksek kalorili hedefler)
  const uygunEkler = EK_SECENEK.filter(s => s.every(([f]) => izinli(yemek(f))));
  for (const [i, ogunId] of ['ara1','gece','kahvalti'].entries()){
    if (tumu() >= p.kcal * 0.95 || !uygunEkler.length) break;
    const ek = uygunEkler[i % uygunEkler.length], ogun = gun.find(o => o.id === ogunId) || gun[0];
    ogun.ogeler = birlestir(ogun.ogeler.concat(ek.map(([f, g]) => ({f, g}))));
    kAyarla();
  }
  // 5) Şeker sınırı aşılıyorsa şekerli kalemleri (meyve, süt ürünü, tatlı) azalt, kaloriyi tahılla geri tamamla
  const sekerli = f => !['sebze','salata','corba'].includes(f.kat) && f.k && f.s * 4 / f.k >= 0.2;
  const sToplam = topla(hepsi().filter(it => sekerli(yemek(it.f)))).s;
  if (top().s > p.seker * 1.05 && sToplam > 0){
    const k = sinirla(1 - (top().s - p.seker) / sToplam, 0.5, 1);
    gun.forEach(o => o.ogeler.forEach(it => { const f = yemek(it.f); if (sekerli(f)) it.g = yuvarla(f, it.g * k); }));
    kAyarla();
  }
  // 6) Hâlâ fazlaysa sebze dışındaki sabit kalemleri (karışık yemek, süt ürünü) biraz azalt
  if (tumu() > p.kcal * 1.07){
    const azalt = f => rol(f) === 'S' && !['sebze','salata'].includes(f.kat);
    const kS = topla(hepsi().filter(it => azalt(yemek(it.f)))).k;
    if (kS > 0){ const k = sinirla((kS + p.kcal - tumu()) / kS, 0.7, 1); gun.forEach(o => o.ogeler.forEach(it => { const f = yemek(it.f); if (azalt(f)) it.g = yuvarla(f, it.g * k); })); }
  }
}
