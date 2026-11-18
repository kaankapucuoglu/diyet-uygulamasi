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
  bkAgirlik:["Paket","Pack","Упаковка","Packung","العبوة"],
  bkTekrar:["Tekrar dene","Try again","Повторить","Erneut versuchen","أعد المحاولة"],
  bkCevrimdisi:["Telefon çevrimdışı görünüyor. Bağlantı gelince yeniden dene ya da değerleri paketten elle ekle.","Your phone seems offline. Try again when connected or add the values from the package.","Похоже, нет сети. Повтори при подключении или введи значения с упаковки.","Dein Telefon scheint offline zu sein. Versuche es später erneut oder gib die Werte von der Packung ein.","يبدو أن الهاتف غير متصل. أعد المحاولة عند الاتصال أو أضف القيم من العبوة."],
  bkElleKisa:["Numarayı yaz","Type number","Ввести номер","Nummer eingeben","اكتب الرقم"],
  bkAyarlar:["Ayarları aç","Open settings","Открыть настройки","Einstellungen öffnen","فتح الإعدادات"],
  bkKontrol:["Numara hatalı görünüyor (son hane tutmuyor). Paketteki numarayı yeniden kontrol et.","The number looks wrong (check digit doesn't match). Check the number on the package.","Номер выглядит неверным (не сходится контрольная цифра). Проверь номер на упаковке.","Die Nummer scheint falsch zu sein (Prüfziffer stimmt nicht). Prüfe die Nummer auf der Packung.","يبدو الرقم خاطئًا (رقم التحقق لا يطابق). تحقّق من الرقم على العبوة."],
  bkFotoYok:["Fotoğrafta barkod bulunamadı.","No barcode found in the photo.","На фото не найден штрихкод.","Kein Barcode im Foto gefunden.","لم يُعثر على باركود في الصورة."],
  bkYenidenTara:["Yeniden tara","Scan again","Сканировать снова","Erneut scannen","امسح مجددًا"],
  bkTutarsiz:["Ürün bulundu ama veritabanındaki değerler tutarsız görünüyor: paketteki 100 g değerlerini kontrol edip kaydet.","Product found but its database values look inconsistent: check the per-100 g values on the package.","Продукт найден, но значения в базе выглядят неверными: проверь данные на 100 г на упаковке.","Produkt gefunden, aber die Werte wirken widersprüchlich: prüfe die Werte pro 100 g auf der Packung.","تم العثور على المنتج لكن قيمه في القاعدة تبدو غير متسقة: تحقّق من قيم 100 غ على العبوة."],
  bkYuzde:["Değerler 100 g (içecekte 100 ml) için — paketin besin tablosundan yaz.","Values per 100 g (100 ml for drinks) — from the package nutrition table.","Значения на 100 г (для напитков 100 мл) — с таблицы на упаковке.","Werte pro 100 g (Getränke 100 ml) – aus der Nährwerttabelle.","القيم لكل 100 غ (100 مل للمشروبات) — من جدول العبوة."],
  bkDuzelt:["Değerleri düzelt","Edit values","Исправить значения","Werte korrigieren","تعديل القيم"],
  bkHesap:["Kalori veritabanında yoktu; protein, karbonhidrat ve yağdan hesaplandı. Paketle karşılaştır.","Calories were missing; calculated from protein, carbs and fat. Compare with the package.","Калорий не было в базе; рассчитаны по БЖУ. Сверь с упаковкой.","Kalorien fehlten; aus Eiweiß, Kohlenhydraten und Fett berechnet. Mit der Packung abgleichen.","لم تكن السعرات متوفرة؛ حُسبت من البروتين والكربوهيدرات والدهون. قارنها بالعبوة."],
  bkCeliski:["Kalori ile besin değerleri birbirini tutmuyor; paketteki değerlerle karşılaştır.","Calories and macros don't match each other; compare with the package.","Калории и БЖУ не сходятся; сверь с упаковкой.","Kalorien und Makros passen nicht zusammen; mit der Packung abgleichen.","السعرات والمغذيات لا تتطابق؛ قارنها بالعبوة."],
  ftKaranlik:["Fotoğraf karanlık — daha aydınlık bir yerde, tabağın tam üstünden çekersen tanıma iyileşir.","The photo is dark — shooting in better light, straight above the plate, improves recognition.","Фото тёмное — при лучшем освещении и съёмке сверху распознавание лучше.","Das Foto ist dunkel – bei mehr Licht und von oben fotografiert klappt die Erkennung besser.","الصورة مظلمة — التصوير في إضاءة أفضل ومن فوق الطبق مباشرة يحسّن التعرّف."],
  ftBulanik:["Fotoğraf bulanık — telefonu sabit tutup yeniden çekmeyi dene.","The photo is blurry — hold the phone steady and retake.","Фото размыто — держи телефон ровно и пересними.","Das Foto ist unscharf – halte das Telefon ruhig und fotografiere erneut.","الصورة ضبابية — ثبّت الهاتف وأعد التصوير."],
  ftYenidenCek:["Yeniden çek","Retake","Переснять","Neu aufnehmen","إعادة التصوير"]
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
// 18.11: model dünya mutfağıyla eğitildi (pho/sushi gibi etiketler soluk, karışık tabaklarda öne çıkıyor). Öncelik:
// (1) kullanıcının sık seçtiği/yediği yemekler, (2) Türkiye'de sık yenenler (POP_SIRA), (3) pirinç + tavuk/et birlikte görülürse
// bileşik yemek (tavuklu/etli pilav). Puan yalnız SIRALAMAYI etkiler; besin değeri her zaman veritabanından, kullanıcı onaylar.
const PIRINC_ET = new Set([563, 572, 1964, 1383, 896, 1335, 1554, 1244, 471, 1450, 655, 1995, 1154]);   // pilav / pirinç / pirinçli yemekler
const TAVUK_ET = new Set([580, 30, 491, 1477, 588, 635, 443, 983, 1562, 815, 1571, 701, 401, 399, 1531]);   // haşlama/sote/döner tavuk vb.
function adayHesapla(tahmin, H){
  const puan = new Map();
  const ter = (typeof tercihSayaci === 'function' ? tercihSayaci().tum : {}) || {};
  const on = id => {
    let w = 1;
    const pop = typeof POP_SIRA !== 'undefined' && POP_SIRA.has(id), v = ter[id] || 0;
    if (pop) w *= 1.3 + 0.6 * Math.max(0, 1 - POP_SIRA.get(id) / 150);
    if (v > 0) w *= 1 + Math.min(1, Math.log1p(v) / 3);
    if (!pop && !(v > 0)) w *= 0.6;   // ne Türkiye'de sık yenen ne de kullanıcının yediği (pho, sushi…) → geri planda
    return w;
  };
  const ekle = (id, v) => { if (!yemek(id) || yemek(id).ad === id) return; puan.set(id, (puan.get(id) || 0) + v); };
  tahmin.forEach(t => (H[t.i] || []).forEach((id, j) => ekle(id, t.p * (1 - 0.18 * j))));
  const pirinc = tahmin.filter(t => PIRINC_ET.has(t.i)).reduce((a, t) => a + t.p, 0), tavuk = tahmin.filter(t => TAVUK_ET.has(t.i)).reduce((a, t) => a + t.p, 0);
  if (pirinc > 0.02){ ekle('tavuklu_pilav', pirinc * 0.6 + tavuk); ekle('pirinc', pirinc * 0.4); }
  if (tavuk > 0.02 && pirinc > 0.01) ekle('tavuklu_pilav', tavuk);
  if (tavuk > 0.03) ekle('tavuk_hasl', tavuk * 0.5);
  return [...puan.entries()].map(([id, p]) => [id, p * on(id)]).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([id, p]) => ({id, p}));
}

// ================= Fotoğrafla ekle =================
let FOTO_BEKLEYEN = null;
let FOTO_OI = null;
function fotoIleEkle(oi){ FOTO_OI = oi; taramaKalici('foto', oi); fotoKaynakSor(data => { if (data) { taramaSil(); fotoAnaliz(oi, data); } else taramaSil(); }, T('ftBaslik')); }
// sonuç geldiğinde bekleyen istek yoksa (iOS sayfayı yeniden yükledi / Android etkinliği öldürüldü) kayıtlı bağlamla analiz et
(function(){
  const f0 = window.__lfOnFoto;
  window.__lfOnFoto = r => {
    if (fotoBekleyen) return f0(r);
    if (!r || !r.ok || !r.data) return;
    const oi = taramaAl('foto');
    if (oi != null && D.ayar && D.ayar.kurulum) fotoAnaliz(oi, r.data);
  };
})();
// "Yeniden çek": seçici başlığındaki düğme
document.addEventListener('click', e => {
  const b = e.target && e.target.closest && e.target.closest('[data-ftyeniden]');
  if (!b || !SE || !SE.foto) return;
  const oi = SE.oi != null ? SE.oi : FOTO_OI; if (oi == null) return;
  FOTO_BEKLEYEN = null; kapat(); setTimeout(() => fotoIleEkle(oi), 80);
});
async function fotoAnaliz(oi, data){
  const ogun = menuOku(aktif)[oi]; if (!ogun) return;
  ac('📷 ' + esc(T('ftAnaliz')), `<div class="ft-analiz"><img src="${data}" alt="${esc(T('ftOgunFoto'))}"><div class="ft-bekle"><span class="spin" aria-hidden="true"></span><span id="ftDurum">${T('ftHazirlaniyor')}</span></div></div>`);
  const n = acSayac;
  let adaylar = [], guven = 0, ilk = '', kaliteNot = '';
  try {
    await aiYukle();
    if ($('ftDurum')) $('ftDurum').textContent = T('ftTaniniyor');
    const [im, H] = await Promise.all([resimYukle(data), haritaYukle()]);
    const sonuc = window.YemekTani.taniCoklu ? await window.YemekTani.taniCoklu(im, 20) : {liste: await window.YemekTani.tani(im, 20), isik: 128, net: 999};
    adaylar = adayHesapla(sonuc.liste, H); guven = adaylar.length ? adaylar[0].p : 0; ilk = adaylar.length ? yemek(adaylar[0].id).ad : '';
    // düşük güven: modelin ilk 6 adayının arkasına kullanıcının bu öğünde sık yedikleri (Lose It / MFP mantığı: kişisel geçmişle eşle)
    if (guven < 0.12){
      const var_ = new Set(adaylar.map(a => a.id)), sik = (typeof sonSecilenler === 'function' ? sonSecilenler(ogun.id) : []).filter(id => !var_.has(id) && yemek(id) && yemek(id).ad !== id).slice(0, 6);
      adaylar = adaylar.slice(0, 6).concat(sik.map(id => ({id, p: 0})), adaylar.slice(6)).slice(0, 14);
    }
    kaliteNot = sonuc.isik < 70 ? 'ftKaranlik' : sonuc.net < 25 ? 'ftBulanik' : '';
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
  secimAc({mod: 'ekle', oi, foto: {ids: adaylar.map(a => a.id), img: data, guven, ilk, kalite: kaliteNot}});
}
// Seçici başlığında fotoğraf ve tahmin (p7.js listeGorunumu çağırır)
function fotoUstHtml(){
  const F = SE.foto; if (!F) return '';
  const kal = F.kalite ? `<small class="ft-kalite">💡 ${esc(T(F.kalite))}</small>` : '';
  return `<div class="ft-ust"><img src="${F.img}" alt="${esc(T('ftOgunFoto'))}"><div><b>${esc(F.guven >= 0.18 ? T('ftTahmin', {y: F.ilk}) : T('ftEminDegil'))}</b><small>${esc(T('ftIpucu'))}</small>${kal}<button type="button" class="ft-yeniden" data-ftyeniden="1" style="border:0;background:none;padding:4px 0 0;color:var(--blue);font:inherit;font-weight:700;cursor:pointer">📷 ${esc(T('ftYenidenCek'))}</button></div></div>`;
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
// Akış (benzer uygulamalardaki gibi): tara (kontrol hanesi doğrulanır, 2 kez aynı okuma) → önce cihazdaki önbellek (daha önce okunan
// ürün çevrimdışı da gelir) → yerel kabuk Open Food Facts'e sorar (WebView'in file:// kökeninden istek bazı cihazlarda düşüyordu) →
// değerler denetlenir (kJ→kcal, tuz→sodyum, 100 ml, saçma porsiyon) → ürün kartı + miktar; değerler yanlışsa "Düzelt".
// Bulunamadı / eksik → paketteki değerlerle elle ekle. Ağ yok → Tekrar dene / Elle ekle.
let barkodBekleyen = null;
const TARAMA_K = 'lf_tarama';   // tarama bağlamı: iOS kamera açıkken sayfayı yeniden yüklerse sonuç kaldığı yerden devam eder
function taramaYaz(tur, oi){ try { const o = menuOku(aktif)[oi]; sessionStorage.setItem(TARAMA_K, JSON.stringify({tur, oi, k: aktif, o: o && o.id, t: Date.now()})); } catch(e){} }
function taramaAl(tur){
  try {
    const x = JSON.parse(sessionStorage.getItem(TARAMA_K) || localStorage.getItem(TARAMA_K) || 'null'); taramaSil();
    if (!x || x.tur !== tur || Date.now() - x.t > 15 * 60000) return null;
    if (x.k !== aktif && x.k){ aktif = x.k; ciz(); }
    const m = menuOku(aktif), oi = m.findIndex(o => o.id === x.o);
    return oi >= 0 ? oi : (m[x.oi] ? x.oi : null);
  } catch(e){ return null; }
}
function taramaSil(){ try { sessionStorage.removeItem(TARAMA_K); localStorage.removeItem(TARAMA_K); } catch(e){} }
// sessionStorage süreç ölünce de silinebilir → kamera açılırken localStorage'a da yaz
function taramaKalici(tur, oi){ taramaYaz(tur, oi); try { localStorage.setItem(TARAMA_K, sessionStorage.getItem(TARAMA_K)); } catch(e){} }

window.__lfOnBarkod = r => {
  r = r || {};
  let f = barkodBekleyen; barkodBekleyen = null;
  if (!f){   // sayfa bu arada yeniden yüklendi: kayıtlı bağlamla devam
    const oi = taramaAl('barkod'); if (oi == null) return;
    f = barkodSonucIsle(oi);
  } else taramaSil();
  f(r);
};
const barkodSonucIsle = oi => r => {
  if (r.ok && r.kod) barkodAra(oi, String(r.kod));
  else if (r.elle) barkodElle(oi);
};
function barkodIleEkle(oi){
  if (window.__LF_NATIVE && !window.__LF_NATIVE.fallback && window.__lfPost){
    barkodBekleyen = barkodSonucIsle(oi);
    taramaKalici('barkod', oi);
    window.__lfPost({t: 'barkod', l: {kapat: T('bkKapat'), ipucu: T('bkIpucu'), izin: T('bkIzin'), izinVer: T('bkIzinVer'), fener: T('bkFener'), elle: T('bkElleKisa'), ayarlar: T('bkAyarlar')}});
    return;
  }
  barkodElle(oi);
}
// GTIN kontrol hanesi (EAN-8/UPC-A/EAN-13/GTIN-14). Elle yazılan numarada yazım hatasını yakalar.
function gtinGecerli(k){
  if (!/^\d+$/.test(k) || ![8, 12, 13, 14].includes(k.length)) return false;
  let t = 0;
  for (let i = k.length - 2, c = 3; i >= 0; i--, c = c === 3 ? 1 : 3) t += +k[i] * c;
  return (10 - t % 10) % 10 === +k[k.length - 1];
}
// Tarayıcıda / elle: numarayı yaz ya da (BarcodeDetector varsa) fotoğraftan oku
function barkodElle(oi){
  const algilayici = 'BarcodeDetector' in window;
  ac('🏷️ ' + T('bkEkle'), `<label class="field"><span>${T('bkElleT')}</span><input autocomplete="off" type="text" inputmode="numeric" id="bkKod" maxlength="14" placeholder="8690000000000"></label>
    <p class="hint">${esc(T('bkElleIpucu'))}</p>
    <div class="acts">${algilayici ? `<button class="btn" id="bkFoto">${T('bkFotodan')}</button>` : ''}<button class="btn solid" id="bkAra">${T('bkAra')}</button></div>`);
  const ara = () => {
    const k = $('bkKod').value.replace(/\D/g, '');
    if (k.length < 8 || k.length > 14){ toast(T('bkGecersiz')); return; }
    if (!gtinGecerli(k) && k.length !== 8){ toast(T('bkKontrol'), 3500); return; }   // UPC-E (8) ayrıca açılır; elle 8 haneye izin
    barkodAra(oi, k);
  };
  $('bkAra').onclick = ara;
  $('bkKod').onkeydown = e => { if (e.key === 'Enter') ara(); };
  if ($('bkFoto')) $('bkFoto').onclick = () => fotoSec('galeri').then(async data => {
    if (!data) return;
    try { const im = await resimYukle(data), b = await new BarcodeDetector({formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e']}).detect(im); if (b.length){ barkodAra(oi, String(b[0].rawValue).replace(/\D/g, '')); return; } } catch(e){}
    toast(T('bkFotoYok'), 3000);
  });
  setTimeout(() => $('bkKod') && $('bkKod').focus(), 200);
}
const offSayi = v => { const n = typeof v === 'string' ? parseFloat(v.replace(',', '.')) : +v; return v !== '' && v != null && isFinite(n) && n >= 0 ? n : null; };
// Ürün sorgusu: yerel kabukta yerel ağ (User-Agent, yeniden deneme, ikinci sunucu); tarayıcıda fetch
let urunN = 0; const urunBekleyen = new Map();
window.__lfOnUrun = r => { const f = urunBekleyen.get(r && r.n); if (f){ urunBekleyen.delete(r.n); f(r); } };
function urunSorgula(kod){
  if (window.__LF_NATIVE && !window.__LF_NATIVE.fallback && window.__lfPost){
    return new Promise(ok => {
      const n = ++urunN; urunBekleyen.set(n, ok);
      window.__lfPost({t: 'urun', kod, n});
      setTimeout(() => { if (urunBekleyen.has(n)){ urunBekleyen.delete(n); ok({ok: false, ag: true}); } }, 45000);
    });
  }
  return (async () => {
    for (let d = 0; d < 2; d++){
      try {
        const ctl = new AbortController(), zm = setTimeout(() => ctl.abort(), 12000);
        const r = await fetch(`https://world.openfoodfacts.org/api/v2/product/${kod}.json?fields=code,product_name,product_name_${dil},product_name_tr,product_name_en,generic_name,generic_name_tr,brands,quantity,product_quantity,product_quantity_unit,serving_quantity,nutrition_data_per,nutriments,categories_tags`, {signal: ctl.signal});
        clearTimeout(zm);
        if (r.status === 404) return {ok: true, bulundu: false};
        if (!r.ok) continue;
        const j = await r.json();
        return j && j.status === 1 && j.product ? {ok: true, bulundu: true, urun: j.product} : {ok: true, bulundu: false};
      } catch(e){}
    }
    return {ok: false, ag: true};
  })();
}
// OFF ürününü uygulama biçimine çevir + denetle. Döner: {ad, deger, tam, sivi, adet, birim, uyari}
function urunCoz(p, kod){
  const N = Object.assign({}, p.nutriments || {});
  // porsiyon miktarı: serving_quantity yoksa serving_size metnindeki SON g/ml sayısı ("12 oz (355 ml)" → 355)
  let sqHam = offSayi(p.serving_quantity);
  if (!sqHam){ const m = [...String(p.serving_size || '').matchAll(/(\d+(?:[.,]\d+)?)\s*(g|gr|ml)\b/gi)].pop(); if (m) sqHam = offSayi(m[1]); }
  // yalnız porsiyon başına değer girilmişse (nutrition_data_per=serving) 100 g'a çevir
  if (sqHam && sqHam > 0) ['energy-kcal', 'energy-kj', 'energy', 'proteins', 'carbohydrates', 'fat', 'sugars', 'fiber', 'sodium', 'salt', 'saturated-fat'].forEach(a => {
    if (offSayi(N[a + '_100g']) == null && offSayi(N[a + '_serving']) != null) N[a + '_100g'] = N[a + '_serving'] / sqHam * 100;
  });
  const temiz = s => String(s || '').replace(/\s+/g, ' ').trim();
  const marka = temiz(String(p.brands || '').split(',')[0]);
  let ad = temiz(p['product_name_' + dil] || p.product_name_tr || p.product_name || p.generic_name_tr || p.generic_name || p.product_name_en);
  if (/�/.test(ad)) ad = temiz(p.product_name_tr || p.product_name || '');      // bozuk kodlanmış dil alanı
  if (!ad){   // ad yoksa: kategori (en:kefir → Kefir) ya da barkod
    const kat = (p.categories_tags || []).map(String).reverse().find(c => /^(tr|en):/.test(c));
    ad = kat ? kat.replace(/^[a-z]{2}:/, '').replace(/-/g, ' ').replace(/^./, c => c.toLocaleUpperCase(LOC())) : '';
  }
  const tamAd = [marka && !ad.toLocaleLowerCase(LOC()).includes(marka.toLocaleLowerCase(LOC())) ? marka : '', ad].filter(Boolean).join(' ') || ('🏷️ ' + kod);
  // enerji: kcal → yoksa kJ/4,184 → yoksa makrolardan (4/4/9) hesap (uyarılı)
  let k = offSayi(N['energy-kcal_100g']), uyari = '';
  if (k == null && offSayi(N['energy-kj_100g']) != null) k = N['energy-kj_100g'] / 4.184;
  if (k == null && offSayi(N['energy_100g']) != null) k = N['energy_100g'] / 4.184;          // energy_100g her zaman kJ
  const pr = offSayi(N.proteins_100g), c = offSayi(N.carbohydrates_100g), y = offSayi(N.fat_100g);
  if (k == null && pr != null && c != null && y != null){ k = pr * 4 + c * 4 + y * 9; uyari = 'hesap'; }
  let na = offSayi(N.sodium_100g); if (na == null && offSayi(N.salt_100g) != null) na = N.salt_100g / 2.5;
  const deger = {k: k == null ? null : Math.round(k), p: pr, c, y, s: offSayi(N.sugars_100g), l: offSayi(N.fiber_100g), na, doy: offSayi(N['saturated-fat_100g'])};
  // saçmalık denetimi: 100 g'da 900 kcal üstü yok; makro toplamı 100 g'ı aşamaz; şeker ≤ karbonhidrat; doymuş ≤ yağ
  const topla = (pr || 0) + (c || 0) + (y || 0);
  let tutarsiz = (deger.k != null && deger.k > 905) || topla > 102;
  if (deger.s != null && c != null && deger.s > c + 0.5) deger.s = c;
  if (deger.doy != null && y != null && deger.doy > y) deger.doy = y;
  // enerji makrolarla çok çelişiyorsa (±%35 ve 40 kcal) kontrol ettir
  if (deger.k != null && pr != null && c != null && y != null && !uyari){ const hesap = pr * 4 + c * 4 + y * 9; if (Math.abs(hesap - deger.k) > Math.max(40, deger.k * 0.35)) uyari = 'celiski'; }
  const tam = !!(ad && deger.k != null && pr != null && c != null && y != null && !tutarsiz);
  // sıvı mı? (100 ml başına değer ya da ml/l paket)
  const sivi = /ml/i.test(String(p.nutrition_data_per || '')) || /^(ml|l|cl)$/i.test(String(p.product_quantity_unit || '')) || /\d\s*(ml|cl|l|lt)\b/i.test(String(p.quantity || ''));
  // porsiyon: 5–500 g arası ve paketin tamamı değilse (1 L kefirde "porsiyon = 1000 ml" yazılıyordu)
  const paket = offSayi(p.product_quantity), sq = sqHam;
  let adet = 0, birim = '';
  if (sq && sq >= 5 && sq <= 500 && !(paket && sq >= paket && paket > 250)){ adet = Math.round(sq); birim = 'porsiyon'; }
  else if (sivi){ adet = 200; birim = 'bardak'; }
  return {ad: tamAd, deger, tam, tutarsiz, sivi, adet, birim, uyari};
}
let barkodMesgul = '';
async function barkodAra(oi, kod){
  kod = String(kod || '').replace(/\D/g, '');
  if (kod.length === 12) kod = '0' + kod;
  if (!kod || barkodMesgul === kod) return;           // aynı kod için ikinci istek (çift dokunma) yok
  sayacArtir('barkod'); kaydet(); rozetKontrol(true);
  const onceki = (D.barkod || {})[kod] || (kod[0] === '0' ? (D.barkod || {})[kod.slice(1)] : null);
  if (onceki && D.ozelYemek.some(f => f.id === onceki)){ barkodSecimeAc(oi, onceki, kod); return; }   // önbellek: çevrimdışı da çalışır
  ac('🏷️ ' + esc(kod), `<div class="ft-bekle"><span class="spin" aria-hidden="true"></span><span>${T('bkAraniyor')}</span></div>`);
  const n = acSayac;
  barkodMesgul = kod;
  let r;
  try { r = await urunSorgula(kod); } catch(e){ r = {ok: false, ag: true}; } finally { barkodMesgul = ''; }
  if (acSayac !== n) return;   // kullanıcı pencereyi kapattı
  if (!r.ok){
    const cevrimdisi = navigator.onLine === false;
    $('sbody').innerHTML = `<p class="onay-metin">${esc(T(cevrimdisi ? 'bkCevrimdisi' : 'bkAg'))}</p><div class="acts"><button class="btn" id="bkElle">${T('bkElleEkle')}</button><button class="btn solid" id="bkTekrar">↻ ${T('bkTekrar')}</button></div>`;
    $('bkTekrar').onclick = () => barkodAra(oi, kod);
    $('bkElle').onclick = () => barkodElleForm(oi, kod, {});
    return;
  }
  if (!r.bulundu){
    $('sbody').innerHTML = `<p class="onay-metin">${esc(T('bkYok'))}</p><div class="acts"><button class="btn ghost" id="bkYeniden">${T('bkYenidenTara')}</button><button class="btn solid" id="bkElle">${T('bkElleEkle')}</button></div>`;
    $('bkElle').onclick = () => barkodElleForm(oi, kod, {});
    $('bkYeniden').onclick = () => { kapat(); barkodIleEkle(oi); };
    return;
  }
  const u = urunCoz(r.urun, kod);
  if (!u.tam){
    $('sbody').innerHTML = `<p class="onay-metin">${esc(T(u.tutarsiz ? 'bkTutarsiz' : 'bkEksik'))}</p><div class="acts"><button class="btn solid" id="bkElle">${T('bkElleEkle')}</button></div>`;
    $('bkElle').onclick = () => barkodElleForm(oi, kod, {ad: u.ad.replace(/^🏷️ \d+$/, ''), ...u.deger, sivi: u.sivi, adet: u.adet, birim: u.birim});
    return;
  }
  const f = barkodYemekOlustur(kod, u.ad, u.deger, {na: u.deger.na, doy: u.deger.doy, adet: u.adet, birim: u.birim, sivi: u.sivi});
  barkodSecimeAc(oi, f.id, kod, u.uyari);
}
// Ürün → özel yemek (100 g / 100 ml değerleri). Porsiyon/bardak varsa birim olarak tanımlanır.
function barkodYemekOlustur(kod, ad, v, ek){
  const r1 = x => Math.round((+x || 0) * 10) / 10;
  const id = 'bk' + kod, adet = ek.adet && ek.adet > 0 && ek.adet < 2000 ? Math.round(ek.adet) : 0;
  const f = {id, ad: String(ad).slice(0, 80), kat: 'ozel', k: Math.round(v.k), p: r1(v.p), c: r1(v.c), y: r1(v.y), s: r1(Math.min(v.s || 0, v.c || 0)), l: r1(v.l), a: adet, b: adet ? (ek.birim || 'porsiyon') : '', d: adet ? 1 : 100, e: ek.sivi ? 'içecek' : '', x: '', u: '', bk: kod,
    mk: {na: ek.na != null ? Math.round(ek.na * 1000) : 0, doy: ek.doy != null ? r1(ek.doy) : 0}};
  D.ozelYemek = D.ozelYemek.filter(y => y.id !== id); D.ozelYemek.push(f);
  (D.barkod || (D.barkod = {}))[kod] = id;
  kaydet();
  return f;
}
// Eksik/bulunmayan/yanlış ürün: değerleri kullanıcı paketten girer (100 g ya da 100 ml)
function barkodElleForm(oi, kod, on){
  const alan = (id, ad, v) => `<label class="field"><span>${ad}</span><input autocomplete="off" type="text" inputmode="decimal" id="${id}" value="${v != null ? sayi(v) : ''}"></label>`;
  ac('🏷️ ' + esc(kod), `<label class="field"><span>${T('tkIlacAd')}</span><input autocomplete="off" type="text" id="bkAd" maxlength="80" value="${esc(on.ad || '')}"></label>
    <div class="hint" style="margin:-2px 0 8px">${esc(T('bkYuzde'))}</div>
    <div class="grid3">${alan('bkK', T('calories') + ' (' + T('kcal') + ')', on.k)}${alan('bkP', T('protein') + ' (g)', on.p)}${alan('bkC', T('carb') + ' (g)', on.c)}${alan('bkS', T('sugar') + ' (g)', on.s)}${alan('bkY', T('fat') + ' (g)', on.y)}${alan('bkL', T('fiber') + ' (g)', on.l)}</div>
    <div class="acts"><button class="btn solid" id="bkKaydet">${T('tkKaydet')}</button></div>`);
  $('bkKaydet').onclick = () => {
    const g = id => sayiOku($(id).value), ad = $('bkAd').value.trim();
    const v = {k: g('bkK'), p: g('bkP'), c: g('bkC'), s: g('bkS'), y: g('bkY'), l: g('bkL')};
    const neg = Object.values(v).some(x => x != null && x < 0);
    // kcal boşsa makrolardan hesapla; makrolar 100 g'ı aşamaz, şeker karbonhidrattan büyük olamaz
    if (v.k == null && v.p != null && v.c != null && v.y != null) v.k = Math.round(v.p * 4 + v.c * 4 + v.y * 9);
    if (!ad || neg || v.k == null || v.k > 905 || (v.p || 0) + (v.c || 0) + (v.y || 0) > 102 || (v.s || 0) > (v.c || 0) + 0.5 && v.c != null){ toast(T('tkGecersiz')); return; }
    const f = barkodYemekOlustur(kod, ad, {k: v.k, p: v.p || 0, c: v.c || 0, s: v.s || 0, y: v.y || 0, l: v.l || 0}, {na: on.na, doy: on.doy, adet: on.adet, birim: on.birim, sivi: on.sivi});
    barkodSecimeAc(oi, f.id, kod);
  };
}
// Ürünü seçicinin ayrıntı görünümünde aç: kullanıcı miktarı ayarlayıp ekler; kaynak + "Düzelt"
function barkodSecimeAc(oi, id, kod, uyari){
  secimAc({mod: 'ekle', oi});
  const f = yemek(id);
  SE.sec = id; SE.g = (f.a ? 1 : 100); SE.barkod = kod;
  detayGorunumu();
  const yer = $('sbody');
  const sabit = yer && yer.querySelector('.alt-sabit');
  if (yer && !yer.querySelector('.bk-kaynak')){
    const not = uyari ? `<p class="hint bk-uyari">⚠️ ${esc(T(uyari === 'hesap' ? 'bkHesap' : 'bkCeliski'))}</p>` : '';
    (sabit || yer).insertAdjacentHTML(sabit ? 'beforebegin' : 'beforeend', `${not}<p class="hint bk-kaynak">🏷️ ${esc(kod)} · <a href="https://world.openfoodfacts.org/product/${encodeURIComponent(kod)}" target="_blank" rel="noopener">${esc(T('bkKaynak'))}</a> · <button type="button" id="bkDuzelt" style="border:0;background:none;padding:0;color:var(--blue);font:inherit;text-decoration:underline;cursor:pointer">✏️ ${esc(T('bkDuzelt'))}</button></p>`);
    const d = $('bkDuzelt');
    if (d) d.onclick = () => barkodElleForm(oi, kod, {ad: f.ad, k: f.k, p: f.p, c: f.c, s: f.s, y: f.y, l: f.l, na: f.mk && f.mk.na ? f.mk.na / 1000 : null, doy: f.mk && f.mk.doy, adet: f.a, birim: f.b, sivi: f.e === 'içecek'});
  }
}
