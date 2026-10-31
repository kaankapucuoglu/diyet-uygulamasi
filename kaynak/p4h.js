// ---------- Ek yemekler 6: Sporcu & Takviye (protein tozları, kreatin, amino asitler, karbonhidrat/enerji ürünleri, vitamin) ----------
// Sütunlar YEMEK_SATIR ile aynı (bkz. p4d.js). Takviyeler otomatik plana girmez (DOKTOR_DISI_EK); aramadan ve kategoriden eklenir.
Object.assign(S, {
  k_sporcu:["Sporcu & Takviye","Sports nutrition & supplements","Спортпит и добавки","Sportnahrung & Supplements","تغذية رياضية ومكملات"]
});
// Daha önce başka kategorilerde olan sporcu ürünleri bu gruba taşınır
Object.assign(KAT_DEGIS, {whey:'sporcu', vegan_protein:'sporcu', probar:'sporcu', protein_puding:'sporcu', protein_shake:'sporcu'});
YEMEK_EK.push(
  // Protein tozları
  ['whey_izolat','sporcu',370,88,2,1,1.5,0,1,'olcek:30','d','','protein tozu whey izolat isolate sporcu','Whey izolat protein tozu','Whey isolate protein powder','Изолят сывороточного протеина','Whey-Isolat-Proteinpulver','بروتين مصل اللبن المعزول'],
  ['kazein','sporcu',360,78,6,1.5,3,1,1,'olcek:30','d','','protein tozu kazein casein gece sporcu','Kazein protein tozu','Casein protein powder','Казеиновый протеин','Casein-Proteinpulver','بروتين الكازين'],
  ['yumurta_protein','sporcu',375,80,5,1,3,0,1,'olcek:30','e','','protein tozu yumurta beyazı albumin sporcu','Yumurta beyazı protein tozu','Egg-white protein powder','Протеин из яичного белка','Eiklar-Proteinpulver','بروتين بياض البيض'],
  ['kolajen','sporcu',360,90,0,0,0,0,1,'olcek:10','','','kolajen collagen peptit toz takviye','Kolajen tozu (hidrolize)','Collagen powder (hydrolysed)','Коллаген (гидролизованный)','Kollagenpulver (hydrolysiert)','مسحوق الكولاجين'],
  ['mass_gainer','sporcu',380,15,75,3,15,1,1,'olcek:100','d','','mass gainer kilo aldırıcı karbonhidrat protein tozu sporcu','Mass gainer (kilo aldırıcı)','Mass gainer','Гейнер','Mass Gainer','مكمل زيادة الوزن (ماس جينر)'],
  // Hazır protein ürünleri
  ['protein_sut','sporcu',70,8,5,1.8,5,0,330,'','d','kutu:330','proteinli süt içeceği hazır protein shake','Proteinli süt içeceği (hazır)','Protein milk drink (ready-to-drink)','Протеиновый молочный напиток','Protein-Milchdrink (trinkfertig)','مشروب حليب بالبروتين'],
  ['protein_yulaf','sporcu',230,20,27,4.5,6,3.5,250,'','d','kase:250','yulaf protein whey proteinli yulaf lapası sporcu','Proteinli yulaf lapası (whey ile)','Protein oats (with whey)','Протеиновая овсянка (с сывороточным белком)','Protein-Haferbrei (mit Whey)','شوفان بالبروتين (مع واي)'],
  ['protein_pankek','sporcu',360,35,40,6,5,5,1,'olcek:50','de','','protein pankek karışımı toz sporcu','Protein pankek karışımı (toz)','Protein pancake mix (dry)','Смесь для протеиновых панкейков','Protein-Pancake-Mix (trocken)','خليط بانكيك البروتين'],
  ['protein_kurabiye','sporcu',410,25,45,15,8,8,1,'adet:75','de','','protein kurabiye cookie sporcu','Protein kurabiye','Protein cookie','Протеиновое печенье','Protein-Cookie','كوكيز البروتين'],
  ['protein_cips','sporcu',400,40,35,11,2,3,30,'','t','','protein cips proteinli','Protein cipsi','Protein chips','Протеиновые чипсы','Protein-Chips','رقائق البروتين'],
  ['protein_dondurma','sporcu',150,10,18,4,6,3,100,'','d','kase:100','dondurma proteinli light','Proteinli dondurma','Protein ice cream','Протеиновое мороженое','Protein-Eis','آيس كريم بالبروتين'],
  // Performans takviyeleri (kalorisi yok denecek kadar az)
  ['kreatin','sporcu',0,0,0,0,0,0,1,'olcek:5','','','kreatin monohidrat creatine takviye sporcu','Kreatin monohidrat','Creatine monohydrate','Креатин моногидрат','Kreatin-Monohydrat','كرياتين مونوهيدرات'],
  ['bcaa','sporcu',380,90,3,0,1,0,1,'olcek:10','','','bcaa amino asit dallı zincirli takviye sporcu','BCAA (toz)','BCAA powder','BCAA (порошок)','BCAA-Pulver','أحماض أمينية متفرعة (BCAA)'],
  ['eaa','sporcu',380,90,3,0,1,0,1,'olcek:10','','','eaa esansiyel amino asit takviye sporcu','EAA (esansiyel amino asit, toz)','EAA powder (essential amino acids)','EAA (незаменимые аминокислоты)','EAA-Pulver (essenzielle Aminosäuren)','أحماض أمينية أساسية (EAA)'],
  ['glutamin','sporcu',400,100,0,0,0,0,1,'olcek:5','','','glutamin l-glutamine takviye sporcu','L-Glutamin','L-Glutamine','L-глютамин','L-Glutamin','إل-جلوتامين'],
  ['beta_alanin','sporcu',0,0,0,0,0,0,1,'olcek:3','','','beta alanin takviye sporcu','Beta-alanin','Beta-alanine','Бета-аланин','Beta-Alanin','بيتا ألانين'],
  ['sitrulin','sporcu',0,0,0,0,0,0,1,'olcek:6','','','sitrulin malat citrulline pump takviye','Sitrulin malat','Citrulline malate','Цитруллин малат','Citrullin-Malat','سيترولين مالات'],
  ['l_karnitin','sporcu',0,0,0,0,0,0,1,'adet:25','','','l-karnitin carnitine sıvı shot takviye','L-Karnitin (sıvı shot)','L-Carnitine (liquid shot)','L-карнитин (жидкий)','L-Carnitin (flüssig)','إل-كارنيتين (سائل)'],
  ['pre_workout','sporcu',60,10,5,0,1,0,1,'olcek:10','','','pre workout antrenman öncesi kafein takviye','Pre-workout (antrenman öncesi)','Pre-workout powder','Предтренировочный комплекс','Pre-Workout-Pulver','مكمل ما قبل التمرين'],
  // Karbonhidrat, enerji & sıvı
  ['sporcu_icecegi','sporcu',24,0,6,0,6,0,500,'','t','kutu:500','sporcu içeceği izotonik','Sporcu içeceği (izotonik)','Sports drink (isotonic)','Изотонический напиток','Sportgetränk (isotonisch)','مشروب رياضي متساوي التوتر'],
  ['elektrolit','sporcu',0,0,0,0,0,0,1,'adet:4','','','elektrolit tablet tuz mineral şekersiz','Elektrolit (şekersiz tablet)','Electrolyte tablet (sugar-free)','Электролиты (таблетка без сахара)','Elektrolyt-Tablette (zuckerfrei)','أقراص إلكتروليت (بدون سكر)'],
  ['enerji_jeli','sporcu',270,0,67,0,30,0,1,'adet:40','','','enerji jeli gel koşu maraton','Enerji jeli','Energy gel','Энергетический гель','Energiegel','جل الطاقة'],
  ['sporcu_bar','sporcu',380,6,70,8,30,4,1,'adet:50','','','enerji barı karbonhidrat bar koşu bisiklet','Enerji barı (karbonhidrat)','Energy bar (carb)','Энергетический батончик','Energieriegel','لوح طاقة (كربوهيدرات)'],
  ['maltodekstrin','sporcu',380,0,95,0,5,0,1,'olcek:30','','','maltodekstrin karbonhidrat tozu','Maltodekstrin','Maltodextrin','Мальтодекстрин','Maltodextrin','مالتوديكسترين'],
  ['dekstroz','sporcu',365,0,91,0,91,0,1,'olcek:30','','','dekstroz glikoz şeker tozu','Dekstroz (glikoz)','Dextrose (glucose)','Декстроза (глюкоза)','Dextrose (Traubenzucker)','دكستروز (جلوكوز)'],
  ['yulaf_unu','sporcu',375,13,60,7,1,10,50,'','','','yulaf unu instant oats öğütülmüş yulaf sporcu','Yulaf unu (instant oats)','Oat flour (instant oats)','Овсяная мука','Hafermehl (Instant)','دقيق الشوفان'],
  ['pirinc_kremasi','sporcu',370,6.5,82,1,0.5,1,50,'','','','pirinç kreması cream of rice sporcu','Pirinç kreması (cream of rice)','Cream of rice (dry)','Рисовый крем (сухой)','Reiscreme (trocken)','كريمة الأرز'],
  ['fistik_tozu','sporcu',420,50,33,12,8,8,1,'olcek:12','','','fıstık ezmesi tozu pb2 yağı alınmış','Fıstık ezmesi tozu (yağı azaltılmış)','Peanut butter powder (defatted)','Порошок арахисовой пасты','Erdnussbutterpulver (entölt)','مسحوق زبدة الفول السوداني'],
  // Sağlık takviyeleri
  ['omega3','sporcu',900,0,0,100,0,0,2,'adet:1','f','','omega 3 balık yağı kapsül takviye','Omega-3 balık yağı (kapsül)','Omega-3 fish oil (capsule)','Омега-3 рыбий жир (капсула)','Omega-3-Fischöl (Kapsel)','أوميغا 3 زيت السمك (كبسولة)'],
  ['multivitamin','sporcu',0,0,0,0,0,0,1,'adet:1.5','','','multivitamin vitamin tablet takviye','Multivitamin (tablet)','Multivitamin (tablet)','Мультивитамины (таблетка)','Multivitamin (Tablette)','فيتامينات متعددة (قرص)']
);
Object.assign(ALERJEN_EK, {
  whey_izolat:'sut', kazein:'sut', yumurta_protein:'yumurta', kolajen:'', mass_gainer:'sut', protein_sut:'sut', protein_yulaf:'sut,yulaf,gluten', protein_pankek:'sut,yumurta,gluten,yulaf',
  protein_kurabiye:'sut,gluten,bugday,yumurta,soya', protein_cips:'sut,soya', protein_dondurma:'sut', kreatin:'', bcaa:'', eaa:'', glutamin:'', beta_alanin:'', sitrulin:'', l_karnitin:'',
  pre_workout:'kafein', sporcu_icecegi:'', elektrolit:'', enerji_jeli:'', sporcu_bar:'gluten,yulaf,kuruyemis', maltodekstrin:'misir', dekstroz:'misir', yulaf_unu:'yulaf,gluten', pirinc_kremasi:'pirinc',
  fistik_tozu:'yerfistigi', omega3:'balik', multivitamin:''
});
// Otomatik planda kullanılmaz (takviye, kalorisiz ya da yalnız antrenman çevresi için)
DOKTOR_DISI_EK.push('kolajen','mass_gainer','protein_kurabiye','protein_cips','protein_dondurma','kreatin','bcaa','eaa','glutamin','beta_alanin','sitrulin','l_karnitin','pre_workout',
  'sporcu_icecegi','elektrolit','enerji_jeli','sporcu_bar','maltodekstrin','dekstroz','omega3','multivitamin');
// Hamilelikte doktora danışılmadan önerilmeyen takviyeler
HAMILE_DISI_EK.push('kreatin','bcaa','eaa','glutamin','beta_alanin','sitrulin','l_karnitin','pre_workout');
POPULER.push('whey_izolat','kreatin','protein_sut','bcaa','kazein','protein_yulaf','sporcu_icecegi','omega3');
OGUN_ONERI.kahvalti.push('protein_yulaf','protein_pankek');
OGUN_ONERI.ara1.push('protein_sut','whey_izolat');
