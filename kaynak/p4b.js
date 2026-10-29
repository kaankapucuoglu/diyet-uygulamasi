// ---------- Alerjenler ----------
// [id, arama kelimeleri (eş anlamlılar), tr, en, ru, de, ar] — AB'nin 14 ana alerjeni + yaygın besin/baharat hassasiyetleri
const ALERJEN_SATIR = [
  ['gluten','gluten çölyak un','Gluten','Gluten','Глютен','Gluten','الغلوتين'],
  ['bugday','buğday un ekmek makarna bulgur irmik','Buğday','Wheat','Пшеница','Weizen','القمح'],
  ['cavdar','çavdar','Çavdar','Rye','Рожь','Roggen','الجاودار'],
  ['yulaf','yulaf','Yulaf','Oats','Овёс','Hafer','الشوفان'],
  ['pirinc','pirinç','Pirinç','Rice','Рис','Reis','الأرز'],
  ['sut','süt laktoz peynir yoğurt kazein whey tereyağı kaymak','Süt ve süt ürünleri (laktoz)','Milk & dairy (lactose)','Молоко и молочные продукты (лактоза)','Milch & Milchprodukte (Laktose)','الحليب ومشتقاته (اللاكتوز)'],
  ['yumurta','yumurta','Yumurta','Egg','Яйца','Ei','البيض'],
  ['balik','balık levrek somon ton hamsi çipura palamut deniz','Balık','Fish','Рыба','Fisch','السمك'],
  ['kabuklu','kabuklu deniz ürünü karides midye istakoz yengeç kalamar ahtapot','Kabuklu deniz ürünleri','Shellfish & molluscs','Моллюски и ракообразные','Schalen- & Weichtiere','المحار والقشريات'],
  ['yerfistigi','yer fıstığı fıstık ezmesi','Yer fıstığı','Peanut','Арахис','Erdnuss','الفول السوداني'],
  ['kuruyemis','kuruyemiş sert kabuklu ağaç yemişi','Sert kabuklu yemişler (tümü)','Tree nuts (all)','Орехи (все)','Schalenfrüchte (alle)','المكسرات (كلها)'],
  ['ceviz','ceviz','Ceviz','Walnut','Грецкий орех','Walnuss','الجوز'],
  ['badem','badem','Badem','Almond','Миндаль','Mandel','اللوز'],
  ['findik','fındık','Fındık','Hazelnut','Фундук','Haselnuss','البندق'],
  ['soya','soya tofu edamame','Soya','Soy','Соя','Soja','الصويا'],
  ['susam','susam tahin','Susam','Sesame','Кунжут','Sesam','السمسم'],
  ['hardal','hardal','Hardal','Mustard','Горчица','Senf','الخردل'],
  ['kereviz','kereviz','Kereviz','Celery','Сельдерей','Sellerie','الكرفس'],
  ['sulfit','sülfit kükürt koruyucu kuru meyve','Sülfit','Sulphites','Сульфиты','Sulfite','الكبريتيت'],
  ['tavuk','tavuk piliç','Tavuk','Chicken','Курица','Huhn','الدجاج'],
  ['hindi','hindi','Hindi','Turkey','Индейка','Pute','الديك الرومي'],
  ['kirmizi','kırmızı et dana kuzu kıyma alfa-gal','Kırmızı et (alfa-gal)','Red meat (alpha-gal)','Красное мясо (альфа-гал)','Rotes Fleisch (Alpha-Gal)','اللحوم الحمراء (ألفا غال)'],
  ['nohut','nohut leblebi','Nohut','Chickpea','Нут','Kichererbse','الحمص'],
  ['mercimek','mercimek','Mercimek','Lentil','Чечевица','Linse','العدس'],
  ['fasulye','fasulye barbunya','Fasulye','Beans','Фасоль','Bohnen','الفاصولياء'],
  ['bezelye','bezelye','Bezelye','Pea','Горох','Erbse','البازلاء'],
  ['domates','domates salça','Domates','Tomato','Помидор','Tomate','الطماطم'],
  ['salatalik','salatalık hıyar','Salatalık','Cucumber','Огурец','Gurke','الخيار'],
  ['patlican','patlıcan','Patlıcan','Eggplant','Баклажан','Aubergine','الباذنجان'],
  ['kabak','kabak','Kabak','Zucchini','Кабачок','Zucchini','الكوسا'],
  ['biber','biber pul biber kırmızı biber paprika','Biber','Pepper (capsicum)','Перец','Paprika','الفلفل'],
  ['sogan','soğan','Soğan','Onion','Лук','Zwiebel','البصل'],
  ['sarimsak','sarımsak','Sarımsak','Garlic','Чеснок','Knoblauch','الثوم'],
  ['ispanak','ıspanak','Ispanak','Spinach','Шпинат','Spinat','السبانخ'],
  ['brokoli','brokoli','Brokoli','Broccoli','Брокколи','Brokkoli','البروكلي'],
  ['karnabahar','karnabahar','Karnabahar','Cauliflower','Цветная капуста','Blumenkohl','القرنبيط'],
  ['patates','patates','Patates','Potato','Картофель','Kartoffel','البطاطس'],
  ['elma','elma','Elma','Apple','Яблоко','Apfel','التفاح'],
  ['armut','armut','Armut','Pear','Груша','Birne','الكمثرى'],
  ['muz','muz','Muz','Banana','Банан','Banane','الموز'],
  ['narenciye','narenciye portakal mandalina limon greyfurt','Narenciye','Citrus','Цитрусовые','Zitrusfrüchte','الحمضيات'],
  ['cilek','çilek','Çilek','Strawberry','Клубника','Erdbeere','الفراولة'],
  ['kayisi','kayısı','Kayısı','Apricot','Абрикос','Aprikose','المشمش'],
  ['hurma','hurma','Hurma','Date','Финик','Dattel','التمر'],
  ['uzum','üzüm kuru üzüm','Üzüm','Grape','Виноград','Traube','العنب'],
  ['zeytin','zeytin zeytinyağı','Zeytin','Olive','Оливки','Olive','الزيتون'],
  ['kabak_cekirdegi','kabak çekirdeği çekirdek','Kabak çekirdeği','Pumpkin seed','Тыквенные семечки','Kürbiskerne','بذور اليقطين'],
  ['chia','chia','Chia','Chia','Чиа','Chia','الشيا'],
  ['keten','keten tohumu','Keten tohumu','Flaxseed','Семена льна','Leinsamen','بذور الكتان'],
  ['kakao','kakao çikolata','Kakao / çikolata','Cocoa / chocolate','Какао / шоколад','Kakao / Schokolade','الكاكاو / الشوكولاتة'],
  ['bal','bal arı','Bal','Honey','Мёд','Honig','العسل'],
  ['kafein','kafein kahve çay','Kafein','Caffeine','Кофеин','Koffein','الكافيين'],
  ['tarcin','tarçın','Tarçın','Cinnamon','Корица','Zimt','القرفة'],
  ['kimyon','kimyon','Kimyon','Cumin','Кумин','Kreuzkümmel','الكمون'],
  ['sumak','sumak','Sumak','Sumac','Сумах','Sumach','السماق'],
  ['nane','nane','Nane','Mint','Мята','Minze','النعناع']
];
const ALERJENLER = ALERJEN_SATIR.concat(ALERJEN_SATIR_EK).map(r => {
  const a = {id:r[0], e:r[1], n:r.slice(2, 7)};
  Object.defineProperty(a, 'ad', {get(){ return this.n[DI()] || this.n[0]; }});
  return a;
});
// Yemeklerin bilinen ana içerikleri (alerji filtresi bunlara göre çalışır)
const YEMEK_ALERJEN = {
  tavuk:'tavuk', tavuk_hasl:'tavuk', tavuk_firin:'tavuk', tavuk_tava:'tavuk', tavuk_sis:'tavuk,sut,sarimsak,biber',
  tavuk_kofte:'tavuk,yumurta,gluten,bugday,sogan', tavuk_baget:'tavuk', hindi:'hindi', hindi_hasl:'hindi',
  biftek:'kirmizi', biftek_tava:'kirmizi', dana_hasl:'kirmizi', dana_sis:'kirmizi,biber,sogan',
  kofte:'kirmizi,gluten,bugday,yumurta,sogan,kimyon', kofte_firin:'kirmizi,gluten,bugday,yumurta,sogan,kimyon', kofte_tava:'kirmizi,gluten,bugday,yumurta,sogan,kimyon',
  levrek:'balik', levrek_firin:'balik', levrek_bug:'balik,sogan,domates', cipura:'balik', palamut:'balik', somon_izgara:'balik', somon:'balik', somon_tava:'balik',
  hamsi:'balik', hamsi_tava:'balik', ton:'balik',
  yumurta:'yumurta', yumurta_sahanda:'yumurta', yumurta_pose:'yumurta', ybeyaz:'yumurta', omlet:'yumurta,biber,sogan', menemen:'yumurta,domates,biber', cilbir:'yumurta,sut,sarimsak,biber',
  beyazp:'sut', lor:'sut', kasar:'sut', yogurt:'sut', suzme:'sut', kefir:'sut', sut:'sut', ayran:'sut',
  cacik:'sut,salatalik,sarimsak,nane', semizotu:'sut,sarimsak', kereviz:'sut,kereviz',
  mercimek:'mercimek', nohut:'nohut', nohut_salata:'nohut,sogan,kimyon,domates', piyaz:'fasulye,sogan,sumak,domates', fasulye:'fasulye,kirmizi,sogan,domates',
  yesil_mercimek:'mercimek,sogan', mkofte:'mercimek,gluten,bugday,sogan,nane,biber', nohut_ispanak:'nohut,ispanak,sogan', leblebi:'nohut',
  tofu:'soya', edamame:'soya', soya_yogurt:'soya', soya_sut:'soya', vegan_protein:'soya',
  tamekmek:'gluten,bugday', cavdar:'gluten,cavdar,bugday', beyazekmek:'gluten,bugday', lavas:'gluten,bugday', galeta:'gluten,bugday', yulaf:'gluten,yulaf',
  bulgur:'gluten,bugday', pirinc:'pirinc', tammakarna:'gluten,bugday', makarna:'gluten,bugday', patates:'patates', patates_firin:'patates', patates_kizartma:'patates',
  tpatates:'patates', patlak:'pirinc', manti:'gluten,bugday,yumurta,sut,kirmizi,sarimsak,sogan', pankek:'gluten,yulaf,yumurta,sut,tarcin',
  coban:'domates,salatalik,sogan,biber,zeytin', tfasulye:'fasulye,sogan,domates,zeytin', ispanak:'ispanak,sogan,zeytin', ispanak_hasl:'ispanak',
  ispanak_kiyma:'ispanak,kirmizi,sogan', brokoli:'brokoli', karnabahar:'karnabahar', izgarasebze:'patlican,kabak,biber', firin_sebze:'patlican,kabak,biber,sogan,zeytin',
  hasl_sebze:'kabak,patates', kabak_kiyma:'kabak,kirmizi,sogan,domates', karniyarik:'patlican,kirmizi,sogan,domates,biber', turlu:'kirmizi,patlican,kabak,biber,domates,sogan',
  bezelye:'bezelye,kirmizi,sogan', kabak_dolma:'kabak,kirmizi,gluten,bugday,sogan,domates', domates:'domates', salatalik:'salatalik', zeytin:'zeytin',
  mcorba:'mercimek,sogan', scorba:'patates,sogan,kabak', yayla:'sut,pirinc,yumurta,gluten,bugday,nane',
  elma:'elma', firin_elma:'elma,tarcin', armut:'armut', muz:'muz', portakal:'narenciye', mandalina:'narenciye', cilek:'cilek',
  kayisi:'kayisi,sulfit', hurma:'hurma', uzum_kuru:'uzum,sulfit',
  ceviz:'kuruyemis,ceviz', badem:'kuruyemis,badem', findik:'kuruyemis,findik', kabak_cek:'kabak_cekirdegi', fistikezme:'yerfistigi',
  chia:'chia', keten:'keten', zeytinyagi:'zeytin',
  bitter:'kakao,sut,kafein', chia_puding:'chia,sut,kakao', sutlac:'sut,pirinc', bal:'bal', whey:'sut', probar:'sut,soya,kuruyemis,yerfistigi',
  kahve:'kafein,sut', yesilcay:'kafein',
  tavuk_but:'tavuk', tavuk_kanat:'tavuk', tavuk_doner:'tavuk,sut,biber,sarimsak', et_doner:'kirmizi,sogan', kavurma:'kirmizi,sogan', pirzola:'kirmizi',
  adana:'kirmizi,biber,sogan', tavuk_sote:'tavuk,biber,domates,sogan', et_sote:'kirmizi,biber,domates,sogan', sebzeli_tavuk:'tavuk,patates,biber,sogan,domates',
  tavuklu_pilav:'tavuk,pirinc', tas_kebabi:'kirmizi,sogan,domates,patates', izmir_kofte:'kirmizi,patates,domates,biber,sogan,gluten,bugday,yumurta',
  etli_nohut:'nohut,kirmizi,sogan,domates', tavuk_durum:'tavuk,gluten,bugday,domates,sut', tavuk_salata:'tavuk,domates,salatalik,zeytin', tavuk_corba:'tavuk,gluten,bugday'
};
// Hamilelikte önerilmeyenler: az pişmiş/akışkan yumurta, yüksek cıvalı olabilecek ton balığı, yüksek kafein
const HAMILE_DISI = new Set(['yumurta_pose', 'yumurta_sahanda', 'cilbir', 'ton', 'yesilcay']);
Object.assign(YEMEK_ALERJEN, ALERJEN_EK);
['rafadan', 'ton_salata', 'ciger', 'pastirma'].forEach(id => HAMILE_DISI.add(id));
YEMEKLER.forEach(f => { if (KAT_DEGIS[f.id]) f.kat = KAT_DEGIS[f.id]; });
YEMEKLER.forEach(f => { f.al = (YEMEK_ALERJEN[f.id] || '').split(',').filter(Boolean); });
const alerjen = id => ALERJENLER.find(a => a.id === id);
