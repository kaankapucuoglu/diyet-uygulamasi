// ---------- Sürüm 13: Fotoğrafla ekle (cihaz içi yemek tanıma) ve Barkod okut (Open Food Facts) ----------
// FOTOĞRAF: Fotoğraf cihazdan ÇIKMAZ. ai/tani.js (Google AIY food_V1, Apache 2.0) cihazda ilk 10 yemek adayını verir; ai/harita.json bu
// adayları uygulamanın yemek veritabanına bağlar. Doğru yöntem YARI OTOMATİK'tir (literatür: fotoğraftan porsiyon tahmini güvenilir değil;
// model kartı da besin tahmini için kullanılmamasını söyler): kullanıcı adaylardan doğru yemeği seçer, porsiyonu kendisi onaylar;
// kalori ve makrolar uygulamanın veritabanından gelir. Fotoğraf öğün günlüğüne küçük resim olarak (yalnız bu cihazda, IndexedDB) eklenir.
// BARKOD: yerel tarayıcı (extra.tsx, expo-camera) → Open Food Facts API (ODbL; yalnız barkod numarası gönderilir, kişisel veri yok) →
// ürün kullanıcının "özel yemekleri"ne 100 g değerleriyle eklenir. Kaynak atfı: "© Open Food Facts katkıcıları (ODbL)".
Object.assign(S, {
  ftBaslik:["Öğün fotoğrafı","Meal photo","Фото блюда","Essensfoto","صورة الوجبة"],
  ftKamera:["Fotoğraf çek","Take photo","Сделать фото","Foto aufnehmen","التقاط صورة"],
  ftGaleri:["Galeriden seç","Choose from gallery","Выбрать из галереи","Aus Galerie wählen","اختيار من المعرض"],
  ftGizlilik:["Fotoğraf cihazında tanınır; hiçbir sunucuya gönderilmez.","The photo is recognised on your device and never sent to any server.","Фото распознаётся на устройстве и никуда не отправляется.","Das Foto wird auf deinem Gerät erkannt und an keinen Server gesendet.","يتم التعرّف على الصورة على جهازك ولا تُرسل إلى أي خادم."],
  ftAnaliz:["Fotoğraf inceleniyor","Analysing photo","Анализ фото","Foto wird analysiert","جارٍ تحليل الصورة"],
  ftHazirlaniyor:["Tanıma modeli hazırlanıyor… (ilk seferde birkaç saniye)","Preparing the recognition model… (a few seconds the first time)","Подготовка модели… (в первый раз несколько секунд)","Erkennungsmodell wird vorbereitet … (beim ersten Mal ein paar Sekunden)","جارٍ تجهيز نموذج التعرّف… (بضع ثوانٍ في المرة الأولى)"],
  ftTaniniyor:["Yemek tanınıyor…","Recognising the dish…","Распознаём блюдо…","Gericht wird erkannt …","جارٍ التعرّف على الطبق…"],
  ftAdaylar:["Fotoğraftakiler","In the photo","На фото","Auf dem Foto","في الصورة"],
  ftTahmin:["Tahmin: {y}","Guess: {y}","Вероятно: {y}","Vermutung: {y}","التخمين: {y}"],
  ftEminDegil:["Tam emin olamadım — listeden doğru olanı seç ya da ara.","I'm not sure — pick the right one from the list or search.","Не уверен — выбери верное из списка или найди поиском.","Nicht ganz sicher – wähle das Richtige aus der Liste oder suche.","لست متأكدًا — اختر الصحيح من القائمة أو ابحث."],
  ftIpucu:["Doğru yemekleri işaretle ve porsiyonu kontrol et: kalori, seçtiğin yemek ve miktardan hesaplanır.","Tick the right dishes and check the portion: calories come from the dish and amount you choose.","Отметь верные блюда и проверь порцию: калории считаются по выбранному блюду и количеству.","Markiere die richtigen Gerichte und prüfe die Portion: Die Kalorien ergeben sich aus Gericht und Menge.","حدّد الأطباق الصحيحة وتحقّق من الكمية: تُحسب السعرات من الطبق والكمية التي تختارها."],
  ftBulunamadi:["Fotoğrafta tanıdığım bir yemek çıkmadı. Aramadan ekleyebilirsin.","I couldn't recognise a dish. You can add it by searching.","Не удалось распознать блюдо. Добавь через поиск.","Kein Gericht erkannt. Du kannst es über die Suche hinzufügen.","لم أتعرّف على طبق. يمكنك إضافته بالبحث."],
  ftHata:["Fotoğraf açılamadı.","Couldn't open the photo.","Не удалось открыть фото.","Foto konnte nicht geöffnet werden.","تعذّر فتح الصورة."],
  ftModelHata:["Tanıma şu an çalışmadı; yemeği aramadan ekleyebilirsin.","Recognition didn't work right now; add the dish by searching.","Распознавание сейчас не сработало; добавь блюдо через поиск.","Die Erkennung hat gerade nicht funktioniert; füge das Gericht über die Suche hinzu.","لم يعمل التعرّف الآن؛ أضف الطبق بالبحث."],
  ftIzin:["Kamera izni verilmedi. Telefon ayarlarından izin verebilirsin.","Camera permission denied. You can allow it in phone settings.","Нет доступа к камере. Разреши его в настройках телефона.","Keine Kameraberechtigung. Du kannst sie in den Telefoneinstellungen erteilen.","لم يُمنح إذن الكاميرا. يمكنك منحه من إعدادات الهاتف."],
  ftListe:["Listeden seç","Pick from list","Выбрать из списка","Aus Liste wählen","اختر من القائمة"],
  ftSilOnay:["Bu öğün fotoğrafı silinsin mi?","Delete this meal photo?","Удалить это фото блюда?","Dieses Essensfoto löschen?","هل تريد حذف صورة الوجبة هذه؟"],
  bkIpucu:["Ürünün barkodunu çerçevenin içine getir","Fit the product barcode inside the frame","Наведи штрихкод продукта на рамку","Halte den Barcode in den Rahmen","ضع باركود المنتج داخل الإطار"],
  bkIzin:["Barkod okumak için kamera izni gerekli.","Camera permission is needed to scan barcodes.","Для сканирования нужен доступ к камере.","Zum Scannen wird die Kamera benötigt.","يلزم إذن الكاميرا لمسح الباركود."],
  bkIzinVer:["İzin ver","Allow","Разрешить","Erlauben","السماح"],
  bkFener:["Fener","Torch","Фонарик","Licht","الكشاف"],
  bkKapat:["Kapat","Close","Закрыть","Schließen","إغلاق"],
  bkElleT:["Barkod numarası","Barcode number","Номер штрихкода","Barcode-Nummer","رقم الباركود"],
  bkElleIpucu:["Paketin üzerindeki 8–13 haneli numarayı yaz.","Type the 8–13 digit number on the package.","Введи 8–13-значный номер с упаковки.","Gib die 8–13-stellige Nummer von der Verpackung ein.","اكتب الرقم المكوّن من 8–13 خانة على العبوة."],
  bkAra:["Ara","Search","Найти","Suchen","بحث"],
  bkFotodan:["📷 Fotoğraftan oku","📷 Read from photo","📷 Считать с фото","📷 Vom Foto lesen","📷 القراءة من صورة"],
  bkAraniyor:["Ürün aranıyor…","Looking up product…","Ищем продукт…","Produkt wird gesucht …","جارٍ البحث عن المنتج…"],
  bkYok:["Bu barkod Open Food Facts veritabanında bulunamadı. Ürünü değerleriyle kendin ekleyebilirsin.","This barcode isn't in the Open Food Facts database. You can add the product with its values yourself.","Этого штрихкода нет в базе Open Food Facts. Можно добавить продукт с его значениями вручную.","Dieser Barcode ist nicht in der Open-Food-Facts-Datenbank. Du kannst das Produkt mit seinen Werten selbst anlegen.","هذا الباركود غير موجود في قاعدة بيانات Open Food Facts. يمكنك إضافة المنتج بقيمه بنفسك."],
  bkEksik:["Ürün bulundu ama besin değerleri eksik: paketteki 100 g değerlerini kontrol edip tamamla.","Product found but nutrition values are incomplete: check the per-100 g values on the package.","Продукт найден, но не хватает значений: проверь данные на 100 г на упаковке.","Produkt gefunden, aber Nährwerte unvollständig: prüfe die Werte pro 100 g auf der Verpackung.","تم العثور على المنتج لكن القيم الغذائية ناقصة: تحقّق من قيم 100 غ على العبوة."],
  bkAg:["İnternet bağlantısı yok ya da yanıt gelmedi. Bağlanınca yeniden dene.","No internet connection or no response. Try again when online.","Нет интернета или ответа. Попробуй снова при подключении.","Keine Internetverbindung oder keine Antwort. Versuche es online erneut.","لا يوجد اتصال بالإنترنت أو لم يصل رد. أعد المحاولة عند الاتصال."],
  bkGecersiz:["Barkod 8–14 rakam olmalı.","A barcode has 8–14 digits.","Штрихкод — 8–14 цифр.","Ein Barcode hat 8–14 Ziffern.","يتكون الباركود من 8–14 رقمًا."],
  bkKaynak:["Veri: © Open Food Facts katkıcıları (ODbL). Paketteki değerlerle karşılaştır.","Data: © Open Food Facts contributors (ODbL). Compare with the package.","Данные: © участники Open Food Facts (ODbL). Сверь с упаковкой.","Daten: © Open-Food-Facts-Mitwirkende (ODbL). Mit der Verpackung abgleichen.","البيانات: © مساهمو Open Food Facts (ODbL). قارنها بالعبوة."],
  bkElleEkle:["Elle ekle","Add manually","Добавить вручную","Manuell hinzufügen","إضافة يدويًا"],
  bkAgirlik:["Paket","Pack","Упаковка","Packung","العبوة"]
});

// ================= Model yükleme =================
let aiHazir = null, harita = null;
function aiYukle(){
  if (aiHazir) return aiHazir;
  aiHazir = new Promise((ok, hata) => {
    if (window.YemekTani) return ok();
    const s = document.createElement('script'); s.src = 'ai/tani.js'; s.onload = () => ok(); s.onerror = () => hata(new Error('ai/tani.js'));
    document.head.appendChild(s);
  }).then(() => window.YemekTani.hazirla());
  aiHazir.catch(() => { aiHazir = null; });
  return aiHazir;
}
async function haritaYukle(){
  if (harita) return harita;
  const r = await fetch('ai/harita.json'); harita = await r.json(); return harita;
}
const resimYukle = src => new Promise((ok, hata) => { const im = new Image(); im.onload = () => ok(im); im.onerror = hata; im.src = src; });
// Model adaylarını (etiket, olasılık) veritabanı yemeklerine çevir: her etiketin eşlemesi olasılıkla ağırlıklanır (ilk eşleşme en güçlü)
function adayHesapla(tahmin, H){
  const puan = new Map(), kaynak = new Map();
  tahmin.forEach(t => (H[t.i] || []).forEach((id, j) => {
    if (!yemek(id) || yemek(id).ad === id) return;
    puan.set(id, (puan.get(id) || 0) + t.p * (1 - 0.18 * j));
    if (!kaynak.has(id)) kaynak.set(id, t);
  }));
  return [...puan.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([id, p]) => ({id, p}));
}

// ================= Fotoğrafla ekle =================
let FOTO_BEKLEYEN = null;
function fotoIleEkle(oi){ fotoKaynakSor(data => { if (data) fotoAnaliz(oi, data); }, T('ftBaslik')); }
async function fotoAnaliz(oi, data){
  const ogun = menuOku(aktif)[oi]; if (!ogun) return;
  ac('📷 ' + esc(T('ftAnaliz')), `<div class="ft-analiz"><img src="${data}" alt="${esc(T('ftOgunFoto'))}"><div class="ft-bekle"><span class="spin" aria-hidden="true"></span><span id="ftDurum">${T('ftHazirlaniyor')}</span></div></div>`);
  const n = acSayac;
  let adaylar = [], guven = 0, ilk = '';
  try {
    await aiYukle();
    if ($('ftDurum')) $('ftDurum').textContent = T('ftTaniniyor');
    const [im, H] = await Promise.all([resimYukle(data), haritaYukle()]);
    const t = await window.YemekTani.tani(im, 10);
    adaylar = adayHesapla(t, H); guven = adaylar.length ? adaylar[0].p : 0; ilk = adaylar.length ? yemek(adaylar[0].id).ad : '';
  } catch(e){
    if (acSayac !== n) return;
    $('sbody').innerHTML = `<div class="ft-analiz"><img src="${data}" alt=""></div><p class="onay-metin">${esc(T('ftModelHata'))}</p><div class="acts"><button class="btn solid" id="ftListe">${T('ftListe')}</button></div>`;
    $('ftListe').onclick = () => { FOTO_BEKLEYEN = {data, k: aktif, o: ogun.id}; secimAc({mod: 'ekle', oi}); };
    return;
  }
  if (acSayac !== n) return;   // kullanıcı pencereyi kapattı
  FOTO_BEKLEYEN = {data, k: aktif, o: ogun.id};
  if (!adaylar.length){
    $('sbody').innerHTML = `<div class="ft-analiz"><img src="${data}" alt=""></div><p class="onay-metin">${esc(T('ftBulunamadi'))}</p><div class="acts"><button class="btn solid" id="ftListe">${T('ftListe')}</button></div>`;
    $('ftListe').onclick = () => secimAc({mod: 'ekle', oi});
    return;
  }
  secimAc({mod: 'ekle', oi, foto: {ids: adaylar.map(a => a.id), img: data, guven, ilk}});
}
// Seçici başlığında fotoğraf ve tahmin (p7.js listeGorunumu çağırır)
function fotoUstHtml(){
  const F = SE.foto; if (!F) return '';
  return `<div class="ft-ust"><img src="${F.img}" alt="${esc(T('ftOgunFoto'))}"><div><b>${esc(F.guven >= 0.18 ? T('ftTahmin', {y: F.ilk}) : T('ftEminDegil'))}</b><small>${esc(T('ftIpucu'))}</small></div></div>`;
}
// Fotoğraftan sonra eklenen yemekler → fotoğraf o öğünün günlüğüne kaydedilir
async function ogunFotoKaydet(oi){
  const F = FOTO_BEKLEYEN; FOTO_BEKLEYEN = null;
  if (!F || F.k !== aktif) return;
  const o = menuOku(aktif)[oi]; if (!o || o.id !== F.o) return;
  try {
    const a = 'ogun|' + Date.now(), kucuk = await gorselKucult(F.data, 320, 0.78);
    await fotoYaz(a, {b: F.data, k: kucuk});
    (D.ogunFoto || (D.ogunFoto = [])).push({a, k: F.k, o: F.o});
    sayacArtir('foto'); kaydet(); rozetKontrol(); ogunFotolariCiz();
  } catch(e){}
}
(function(){
  const e0 = ogeEkle, e1 = ogelerEkle;
  ogeEkle = function(oi){ const r = e0.apply(this, arguments); if (FOTO_BEKLEYEN) ogunFotoKaydet(oi); return r; };
  ogelerEkle = function(oi){ const r = e1.apply(this, arguments); if (FOTO_BEKLEYEN) ogunFotoKaydet(oi); return r; };
  // pencere fotoğraf eklenmeden kapanırsa bekleyen fotoğraf düşer
  const k0 = kapat;
  kapat = function(){ const r = k0.apply(this, arguments); setTimeout(() => { if (!$('overlay').classList.contains('open')) FOTO_BEKLEYEN = null; }, 50); return r; };
})();
// Öğün kartında o günün fotoğrafları (küçük resimler)
async function ogunFotolariCiz(){
  const liste = (D.ogunFoto || []).filter(x => x.k === aktif);
  document.querySelectorAll('[data-ofoto]').forEach(el => { if (!liste.some(x => x.o === el.dataset.ofoto)){ el.hidden = true; el.innerHTML = ''; } });
  if (!liste.length) return;
  const veri = await Promise.all(liste.map(x => fotoOku(x.a)));
  liste.forEach((x, i) => {
    const el = document.querySelector(`[data-ofoto="${CSS.escape(x.o)}"]`); if (!el || !veri[i]) return;
    if (!el.querySelector(`[data-ofotoac="${CSS.escape(x.a)}"]`)) el.insertAdjacentHTML('beforeend', `<button class="ogun-foto" data-ofotoac="${esc(x.a)}" aria-label="${esc(T('ftOgunFoto'))}"><img alt="" src="${veri[i].k}"></button>`);
    el.hidden = false;
  });
}
async function ogunFotoGoster(a){
  const v = await fotoOku(a); if (!v) return;
  ac('📷 ' + esc(T('ftOgunFoto')), `<div class="ft-analiz"><img src="${v.b}" alt=""></div><div class="acts"><button class="btn ghost" data-kapat="1">${T('bkKapat')}</button><button class="btn del-btn" id="ftSil">🗑 ${T('tkSil')}</button></div>`);
  $('sbody').querySelector('[data-kapat]').onclick = kapat;
  $('ftSil').onclick = () => onayAc(T('ftSilOnay'), async () => { await fotoSil(a); D.ogunFoto = (D.ogunFoto || []).filter(x => x.a !== a); kaydet(); kapat(); ciz(); });
}
(function(){
  const o0 = ogunleriCiz;
  ogunleriCiz = function(){ const r = o0.apply(this, arguments); ogunFotolariCiz(); return r; };
})();

// ================= Barkod =================
let barkodBekleyen = null;
window.__lfOnBarkod = r => { const f = barkodBekleyen; barkodBekleyen = null; if (f) f(r || {}); };
function barkodIleEkle(oi){
  if (window.__LF_NATIVE && !window.__LF_NATIVE.fallback && window.__lfPost){
    barkodBekleyen = r => { if (r.ok && r.kod) barkodAra(oi, r.kod); };
    window.__lfPost({t: 'barkod', l: {kapat: T('bkKapat'), ipucu: T('bkIpucu'), izin: T('bkIzin'), izinVer: T('bkIzinVer'), fener: T('bkFener')}});
    return;
  }
  barkodElle(oi);
}
// Tarayıcıda: numarayı yaz ya da (BarcodeDetector varsa) fotoğraftan oku
function barkodElle(oi){
  const algilayici = 'BarcodeDetector' in window;
  ac('🏷️ ' + T('bkEkle'), `<label class="field"><span>${T('bkElleT')}</span><input autocomplete="off" type="text" inputmode="numeric" id="bkKod" maxlength="14" placeholder="8690000000000"></label>
    <p class="hint">${esc(T('bkElleIpucu'))}</p>
    <div class="acts">${algilayici ? `<button class="btn" id="bkFoto">${T('bkFotodan')}</button>` : ''}<button class="btn solid" id="bkAra">${T('bkAra')}</button></div>`);
  const ara = () => { const k = $('bkKod').value.replace(/\D/g, ''); if (k.length < 8 || k.length > 14){ toast(T('bkGecersiz')); return; } barkodAra(oi, k); };
  $('bkAra').onclick = ara;
  $('bkKod').onkeydown = e => { if (e.key === 'Enter') ara(); };
  if ($('bkFoto')) $('bkFoto').onclick = () => fotoSec('galeri').then(async data => {
    if (!data) return;
    try { const im = await resimYukle(data), b = await new BarcodeDetector({formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e']}).detect(im); if (b.length){ barkodAra(oi, String(b[0].rawValue).replace(/\D/g, '')); return; } } catch(e){}
    toast(T('bkGecersiz'));
  });
  setTimeout(() => $('bkKod') && $('bkKod').focus(), 200);
}
const offSayi = v => { const n = +v; return isFinite(n) && n >= 0 ? n : null; };
async function barkodAra(oi, kod){
  sayacArtir('barkod'); kaydet(); rozetKontrol(true);
  const onceki = (D.barkod || {})[kod];
  if (onceki && D.ozelYemek.some(f => f.id === onceki)){ barkodSecimeAc(oi, onceki, kod); return; }
  ac('🏷️ ' + esc(kod), `<div class="ft-bekle"><span class="spin" aria-hidden="true"></span><span>${T('bkAraniyor')}</span></div>`);
  const n = acSayac;
  let p = null, ag = false;
  try {
    const ctl = 'AbortController' in window ? new AbortController() : null, zm = setTimeout(() => ctl && ctl.abort(), 12000);
    const r = await fetch(`https://world.openfoodfacts.org/api/v2/product/${kod}.json?fields=code,product_name,product_name_${dil},product_name_tr,product_name_en,brands,quantity,serving_quantity,nutriments`, ctl ? {signal: ctl.signal} : {});
    clearTimeout(zm);
    if (r.status === 404) p = null; else if (!r.ok) ag = true; else { const j = await r.json(); p = j && j.status === 1 ? j.product : null; }
  } catch(e){ ag = true; }
  if (acSayac !== n) return;
  if (ag){ $('sbody').innerHTML = `<p class="onay-metin">${esc(T('bkAg'))}</p><div class="acts"><button class="btn solid" id="bkTekrar">${T('bkAra')}</button></div>`; $('bkTekrar').onclick = () => barkodAra(oi, kod); return; }
  const N = (p && p.nutriments) || {};
  const ad = p ? String(p['product_name_' + dil] || p.product_name_tr || p.product_name || p.product_name_en || '').trim() : '';
  const marka = p ? String(p.brands || '').split(',')[0].trim() : '';
  let kcal = offSayi(N['energy-kcal_100g']);
  if (kcal == null && offSayi(N['energy_100g']) != null) kcal = Math.round(N['energy_100g'] / 4.184);   // kJ → kcal
  const deger = {k: kcal, p: offSayi(N.proteins_100g), c: offSayi(N.carbohydrates_100g), y: offSayi(N.fat_100g), s: offSayi(N.sugars_100g), l: offSayi(N.fiber_100g)};
  const tam = p && ad && deger.k != null && deger.p != null && deger.c != null && deger.y != null;
  if (!p || !tam){
    $('sbody').innerHTML = `<p class="onay-metin">${esc(T(p ? 'bkEksik' : 'bkYok'))}</p><div class="acts"><button class="btn solid" id="bkElle">${T('bkElleEkle')}</button></div>`;
    $('bkElle').onclick = () => barkodElleForm(oi, kod, {ad: [marka, ad].filter(Boolean).join(' '), ...deger, na: offSayi(N.sodium_100g)});
    return;
  }
  const f = barkodYemekOlustur(kod, [marka && !ad.toLocaleLowerCase(LOC()).includes(marka.toLocaleLowerCase(LOC())) ? marka : '', ad].filter(Boolean).join(' '), deger,
    {na: offSayi(N.sodium_100g), doy: offSayi(N['saturated-fat_100g']), adet: offSayi(p.serving_quantity)});
  barkodSecimeAc(oi, f.id, kod);
}
// Ürün → özel yemek (100 g değerleri). Porsiyon (serving_quantity) varsa birim "porsiyon" olarak tanımlanır.
function barkodYemekOlustur(kod, ad, v, ek){
  const r1 = x => Math.round((+x || 0) * 10) / 10;
  const id = 'bk' + kod, adet = ek.adet && ek.adet > 0 && ek.adet < 2000 ? Math.round(ek.adet) : 0;
  const f = {id, ad: String(ad).slice(0, 80), kat: 'ozel', k: Math.round(v.k), p: r1(v.p), c: r1(v.c), y: r1(v.y), s: r1(Math.min(v.s || 0, v.c || 0)), l: r1(v.l), a: adet, b: adet ? 'porsiyon' : '', d: adet ? 1 : 100, e: '', x: '', u: '', bk: kod,
    mk: {na: ek.na != null ? Math.round(ek.na * 1000) : 0, doy: ek.doy != null ? r1(ek.doy) : 0}};
  D.ozelYemek = D.ozelYemek.filter(y => y.id !== id); D.ozelYemek.push(f);
  (D.barkod || (D.barkod = {}))[kod] = id;
  kaydet();
  return f;
}
// Eksik/bulunmayan ürün: değerleri kullanıcı paketten girer
function barkodElleForm(oi, kod, on){
  const alan = (id, ad, v) => `<label class="field"><span>${ad}</span><input autocomplete="off" type="text" inputmode="decimal" id="${id}" value="${v != null ? sayi(v) : ''}"></label>`;
  ac('🏷️ ' + esc(kod), `<label class="field"><span>${T('tkIlacAd')}</span><input autocomplete="off" type="text" id="bkAd" maxlength="80" value="${esc(on.ad || '')}"></label>
    <div class="hint" style="margin:-2px 0 8px">100 ${T('g')}</div>
    <div class="grid3">${alan('bkK', T('calories') + ' (' + T('kcal') + ')', on.k)}${alan('bkP', T('protein') + ' (g)', on.p)}${alan('bkC', T('carb') + ' (g)', on.c)}${alan('bkS', T('sugar') + ' (g)', on.s)}${alan('bkY', T('fat') + ' (g)', on.y)}${alan('bkL', T('fiber') + ' (g)', on.l)}</div>
    <div class="acts"><button class="btn solid" id="bkKaydet">${T('tkKaydet')}</button></div>`);
  $('bkKaydet').onclick = () => {
    const g = id => sayiOku($(id).value), ad = $('bkAd').value.trim();
    const v = {k: g('bkK'), p: g('bkP'), c: g('bkC'), s: g('bkS'), y: g('bkY'), l: g('bkL')};
    if (!ad || v.k == null || v.k < 0 || v.k > 950){ toast(T('tkGecersiz')); return; }
    const f = barkodYemekOlustur(kod, ad, {k: v.k, p: v.p || 0, c: v.c || 0, s: v.s || 0, y: v.y || 0, l: v.l || 0}, {na: on.na});
    barkodSecimeAc(oi, f.id, kod);
  };
}
// Ürünü seçicinin ayrıntı görünümünde aç: kullanıcı miktarı ayarlayıp ekler
function barkodSecimeAc(oi, id, kod){
  secimAc({mod: 'ekle', oi});
  SE.sec = id; SE.g = (yemek(id).a ? 1 : 100); SE.barkod = kod;
  detayGorunumu();
  const yer = $('sbody');
  const sabit = yer && yer.querySelector('.alt-sabit');
  if (yer && !yer.querySelector('.bk-kaynak')) (sabit || yer).insertAdjacentHTML(sabit ? 'beforebegin' : 'beforeend', `<p class="hint bk-kaynak">🏷️ ${esc(kod)} · <a href="https://world.openfoodfacts.org/product/${encodeURIComponent(kod)}" target="_blank" rel="noopener">${esc(T('bkKaynak'))}</a></p>`);
}
