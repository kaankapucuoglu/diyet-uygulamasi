// ---------- Ek yemekler 4: atıştırmalık, içecek, eksik ana yemek/çorba/kahvaltılıklar + öneri listeleri ----------
// Sütunlar YEMEK_SATIR ile aynı (bkz. p4d.js)
YEMEK_EK.push(
  // Atıştırmalık
  ['kraker_tam','atistirmalik',430,10,66,14,3,9,30,'','','','kraker tam buğday','Tam buğday kraker','Whole-wheat crackers','Цельнозерновые крекеры','Vollkorncracker','مقرمشات قمح كامل'],
  ['grisini','atistirmalik',410,12,68,9.5,3,3,25,'','','','grissini çubuk ekmek','Grissini (çubuk ekmek)','Grissini (breadsticks)','Гриссини (хлебные палочки)','Grissini (Brotstangen)','أصابع الخبز (غريسيني)'],
  ['cubuk_kraker','atistirmalik',420,9,72,10,3,3,30,'','t','','kraker çubuk tuzlu','Çubuk kraker (tuzlu)','Pretzel sticks (salted)','Солёные палочки','Salzstangen','أصابع مملحة'],
  ['patates_cipsi','atistirmalik',536,7,53,34,0.5,4.4,30,'','ty','','cips patates','Patates cipsi','Potato chips','Картофельные чипсы','Kartoffelchips','رقائق البطاطس'],
  ['misir_cipsi','atistirmalik',500,7,63,24,1,5,30,'','ty','','cips mısır tortilla','Mısır cipsi','Tortilla chips','Кукурузные чипсы','Tortillachips','رقائق الذرة'],
  ['biskuvi','atistirmalik',440,7.5,74,12.5,22,2,30,'','y','','bisküvi petibör','Sade bisküvi','Plain biscuits','Печенье (простое)','Butterkekse','بسكويت سادة'],
  ['kepekli_biskuvi','atistirmalik',450,8,66,17,18,7,30,'','y','','bisküvi kepekli tam buğday','Kepekli bisküvi','Wholegrain biscuits','Печенье с отрубями','Vollkornkekse','بسكويت بالنخالة'],
  ['yulaf_kurabiye','atistirmalik',400,9,55,16,8,6,2,'adet:25','e','','kurabiye yulaflı şekersiz ev yapımı','Yulaflı kurabiye (şekersiz)','Oat cookies (no added sugar)','Овсяное печенье (без сахара)','Haferkekse (ohne Zucker)','كوكيز الشوفان (بدون سكر)'],
  ['tuzlu_kurabiye','atistirmalik',500,8,52,29,3,2,3,'adet:15','dy','','kurabiye tuzlu çatal','Tuzlu kurabiye','Savoury cookies','Солёное печенье','Salzgebäck','كعك مالح'],
  ['muffin_yulaf','atistirmalik',260,8,35,10,8,4,1,'adet:60','ed','','muffin kek yulaflı şekersiz','Yulaflı muffin (şekersiz)','Oat muffin (no added sugar)','Овсяный маффин (без сахара)','Hafer-Muffin (ohne Zucker)','مافن الشوفان (بدون سكر)'],
  ['protein_puding','atistirmalik',85,10,7,1.5,4,0.5,200,'','d','','puding proteinli kakaolu','Proteinli puding','Protein pudding','Протеиновый пудинг','Proteinpudding','بودينغ بروتين'],
  ['yogurt_meyve_kase','atistirmalik',100,5,14,2.5,8,1.8,250,'','d','','yoğurt yulaf meyve kase','Yoğurt-yulaf-meyve kasesi','Yogurt bowl with oats & fruit','Йогурт с овсянкой и фруктами','Joghurt-Bowl mit Hafer & Obst','وعاء زبادي بالشوفان والفاكهة'],
  ['humus_havuc','atistirmalik',110,4,11,5.5,3,4.5,150,'','','','humus havuç çubuk','Humus + havuç çubukları','Hummus with carrot sticks','Хумус с морковными палочками','Hummus mit Karottensticks','حمص مع أصابع الجزر'],
  ['elma_fistik','atistirmalik',108,2.9,14.6,5.4,10.2,2.8,1,'adet:145','','','elma fıstık ezmesi','Elma + fıstık ezmesi','Apple with peanut butter','Яблоко с арахисовой пастой','Apfel mit Erdnussbutter','تفاح مع زبدة الفول السوداني'],
  ['patlak_fistik','atistirmalik',479,15.6,53,24,4.7,4.8,33,'','','','pirinç patlağı fıstık ezmesi','Pirinç patlağı + fıstık ezmesi','Rice cakes with peanut butter','Рисовые хлебцы с арахисовой пастой','Reiswaffeln mit Erdnussbutter','كعك الأرز مع زبدة الفول السوداني'],
  ['incir_ceviz','atistirmalik',360,6.5,50,18.5,35.6,8.9,55,'','','','kuru incir ceviz','Kuru incir + ceviz','Dried figs with walnuts','Сушёный инжир с грецкими орехами','Trockenfeigen mit Walnüssen','تين مجفف مع الجوز'],
  ['enerji_topu','atistirmalik',400,8,50,19,40,7,2,'adet:20','','','enerji topu hurmalı cevizli','Hurmalı cevizli enerji topu','Date & walnut energy balls','Энергетические шарики (финики, орехи)','Dattel-Walnuss-Energiebällchen','كرات الطاقة بالتمر والجوز'],
  ['kuru_meyve_bar','atistirmalik',380,7,55,14,40,6,1,'adet:35','','','bar kuru meyve şekersiz','Kuru meyve bar (şekersiz)','Fruit & nut bar (no added sugar)','Фруктово-ореховый батончик','Frucht-Nuss-Riegel (ohne Zucker)','لوح فواكه ومكسرات (بدون سكر)'],
  ['sutlu_cikolata','atistirmalik',535,7.6,59,30,52,3.4,4,'kare:5','dy','','çikolata sütlü','Sütlü çikolata','Milk chocolate','Молочный шоколад','Vollmilchschokolade','شوكولاتة بالحليب'],
  ['gofret','atistirmalik',520,6,62,27,40,2,1,'adet:35','y','','gofret çikolatalı','Gofret (çikolatalı)','Chocolate wafer','Вафли в шоколаде','Schokowaffel','ويفر بالشوكولاتة'],
  ['kestane','kuruyemis',245,3.2,53,2.2,10.6,5.1,50,'','','','kestane közlenmiş kebap','Kestane (közlenmiş)','Roasted chestnuts','Жареные каштаны','Geröstete Maronen','كستناء مشوية'],
  ['kek_ev','tatli',370,6,52,15,28,1,1,'dilim:50','dy','','kek ev yapımı sade','Kek (ev yapımı)','Homemade sponge cake','Домашний кекс','Rührkuchen (hausgemacht)','كيك منزلي'],
  ['meyve_salatasi','meyve',55,0.7,13.5,0.2,10.5,1.8,200,'','','','meyve salatası','Meyve salatası','Fruit salad','Фруктовый салат','Obstsalat','سلطة فواكه'],
  // Süt ürünü & peynir
  ['protein_yogurt','sut',60,10,4,0.3,4,0,150,'','d','','yoğurt proteinli yüksek protein','Proteinli yoğurt','High-protein yogurt','Высокобелковый йогурт','Proteinjoghurt','زبادي عالي البروتين'],
  ['beyazp_tam','sut',265,17,2,21,1.5,0,2,'dilim:30','dty','','peynir kahvaltı tam yağlı','Beyaz peynir (tam yağlı)','White cheese (full-fat feta)','Брынза (жирная)','Weißkäse (vollfett)','جبنة بيضاء (كاملة الدسم)'],
  ['kasar_light','sut',260,28,2,16,0.5,0,1,'dilim:20','dt','','peynir kaşar light az yağlı','Kaşar peyniri (light)','Kashar cheese (light)','Сыр кашар (лёгкий)','Kaşar-Käse (light)','جبنة قشقوان (خفيفة)'],
  ['mozzarella','sut',250,22,2.5,17,1,0,30,'','d','','peynir mozzarella','Mozzarella','Mozzarella','Моцарелла','Mozzarella','موزاريلا'],
  ['krem_peynir','sut',160,8,5,12,4,0,30,'','d','yk:20','peynir krem sürülebilir light','Krem peynir (light)','Cream cheese (light)','Сливочный сыр (лёгкий)','Frischkäse (light)','جبن كريمي (خفيف)'],
  // Kahvaltı
  ['yulaf_lapasi','tahil',90,4,13,2.5,4,1.5,250,'','d','','yulaf lapası sütlü kahvaltı','Yulaf lapası (sütlü)','Porridge (with milk)','Овсяная каша на молоке','Haferbrei (mit Milch)','عصيدة الشوفان بالحليب'],
  ['overnight','tahil',130,6,18,3.5,6,2.5,250,'','d','','yulaf overnight gece bekletilmiş chia sütlü kahvaltı','Gece bekletilmiş yulaf (overnight oats)','Overnight oats','Ленивая овсянка (овернайт)','Overnight Oats','شوفان منقوع (أوفرنايت)'],
  ['yumurtali_ekmek','yumurta',270,10,28,13,2.5,2,2,'dilim:45','ey','','yumurtalı ekmek tava kahvaltı','Yumurtalı ekmek (tava)','Eggy bread (French toast)','Гренки в яйце','Arme Ritter (French Toast)','خبز بالبيض (فرنش توست)'],
  ['kuymak','kahvaltilik',330,11,18,24,1,1,150,'','dy','','kuymak mıhlama mısır unu peynir karadeniz kahvaltı','Kuymak (mıhlama)','Kuymak (cornmeal & cheese fondue)','Куймак (мухлама)','Kuymak (Maismehl-Käse-Fondue)','كويماك (مهلامة)'],
  // İçecek
  ['smoothie','icecek',75,2.8,14,1,10.5,1.5,1,'bardak:250','d','','smoothie muz çilek yoğurtlu','Muzlu çilekli smoothie','Banana & strawberry smoothie','Смузи с бананом и клубникой','Bananen-Erdbeer-Smoothie','سموذي موز وفراولة'],
  ['protein_shake','icecek',85,9,9,1.5,7,0.5,1,'bardak:300','d','','protein shake sütlü muzlu','Protein shake (sütlü, muzlu)','Protein shake (milk & banana)','Протеиновый коктейль (молоко, банан)','Proteinshake (Milch & Banane)','مخفوق بروتين (حليب وموز)'],
  ['cappuccino','icecek',35,2.2,3.3,1.5,3.3,0,1,'fincan:200','d','','kahve cappuccino sütlü','Cappuccino (şekersiz)','Cappuccino (no sugar)','Капучино (без сахара)','Cappuccino (ohne Zucker)','كابتشينو (بدون سكر)'],
  ['salep','icecek',100,3.3,16,2.5,13,0.3,1,'bardak:200','d','','salep sıcak sütlü','Salep','Salep (hot milk drink)','Салеп','Salep (heißes Milchgetränk)','سحلب'],
  ['limonata','icecek',30,0.1,7.5,0,7,0.1,1,'bardak:250','','','limonata ev yapımı','Limonata (ev yapımı)','Homemade lemonade','Домашний лимонад','Hausgemachte Limonade','ليموناضة منزلية'],
  ['kola','icecek',42,0,10.6,0,10.6,0,1,'bardak:250','','','kola gazlı içecek','Kola','Cola','Кола','Cola','كولا'],
  ['kola_zero','icecek',0.4,0,0,0,0,0,1,'bardak:250','','','kola gazlı içecek şekersiz zero','Kola (şekersiz)','Cola (sugar-free)','Кола (без сахара)','Cola (zuckerfrei)','كولا (بدون سكر)'],
  // Ana yemek, sebze
  ['mucver','anayemek',140,6.5,12,7.5,3,1.8,4,'adet:50','ed','','mücver kabak fırın','Mücver (fırın)','Zucchini fritters (baked)','Оладьи из кабачков (запечённые)','Zucchinipuffer (Ofen)','عجة الكوسا (بالفرن)'],
  ['kapuska','anayemek',70,4.5,6,3.5,3,2.3,250,'','m','','kapuska lahana etli','Kapuska (etli lahana)','Cabbage stew with meat (kapuska)','Тушёная капуста с мясом','Kohleintopf mit Fleisch (Kapuska)','يخنة الملفوف باللحم'],
  ['fellah','anayemek',140,4,22,4,2,4,250,'','','','fellah köftesi bulgur','Fellah köftesi','Bulgur dumplings in tomato sauce (fellah köftesi)','Феллах-кёфте','Fellah-Köfte (Bulgurklößchen)','كفتة الفلاح'],
  ['cokertme','anayemek',230,12,14,14,2,1.5,300,'','mdy','','çökertme kebap patates yoğurt','Çökertme kebabı','Çökertme kebab (beef, fries & yogurt)','Чёкертме-кебаб','Çökertme-Kebab','كباب تشوكرتمة'],
  ['patlican_kizartma','sebze',190,1.5,9,17,4,3,150,'','y','','patlıcan kızartma','Patlıcan kızartması','Fried eggplant','Жареные баклажаны','Frittierte Aubergine','باذنجان مقلي'],
  // Pilav, makarna, patates
  ['ic_pilav','pilav',175,3.5,28,5.5,1.5,0.8,150,'','','servis:50','pilav iç pirinç fıstıklı','İç pilav','Spiced rice with nuts & currants (iç pilav)','Плов с орехами и изюмом','Gewürzreis mit Nüssen (İç Pilav)','أرز بالمكسرات والزبيب'],
  ['sebzeli_bulgur','pilav',115,3.3,20,2.5,1.8,4.5,150,'','','servis:50','bulgur pilav sebzeli','Sebzeli bulgur pilavı','Bulgur pilaf with vegetables','Булгур с овощами','Bulgur-Pilaw mit Gemüse','برغل بالخضار'],
  ['spagetti_bolonez','pilav',150,7.5,18,5,3,1.8,300,'','m','','makarna spagetti bolonez kıymalı','Spagetti bolonez','Spaghetti bolognese','Спагетти болоньезе','Spaghetti Bolognese','سباغيتي بولونيز'],
  ['ton_makarna','pilav',150,9,20,3.5,2,1.5,250,'','f','','makarna ton balıklı','Ton balıklı makarna','Tuna pasta','Макароны с тунцом','Thunfisch-Nudeln','معكرونة بالتونة'],
  ['firin_makarna','pilav',190,7.5,21,8.5,3,1,250,'','dey','','makarna fırın beşamel','Fırın makarna (beşamelli)','Baked pasta with béchamel','Запечённые макароны с бешамелем','Nudelauflauf mit Béchamel','معكرونة بالفرن بالبشاميل'],
  ['kumpir','pilav',170,5.5,18,8.5,2,2,1,'adet:450','dty','','kumpir patates fırın','Kumpir','Kumpir (loaded baked potato)','Кумпир (фаршированный картофель)','Kumpir (gefüllte Ofenkartoffel)','كومبير (بطاطس محشوة)'],
  // Çorba
  ['kremali_tavuk_corba','corba',65,4,5.5,3,0.8,0.3,250,'','cd','kepce:125','tavuk çorba kremalı','Kremalı tavuk çorbası','Cream of chicken soup','Куриный крем-суп','Hühnercremesuppe','شوربة الدجاج بالكريمة'],
  ['kabak_corba','corba',45,1.5,5,2,2.5,1.1,250,'','d','kepce:125','kabak çorba','Kabak çorbası','Zucchini soup','Суп из кабачков','Zucchinisuppe','شوربة الكوسا'],
  ['misir_corba','corba',70,2,11,2,3,1.2,250,'','d','kepce:125','mısır çorba','Mısır çorbası','Corn soup','Кукурузный суп','Maissuppe','شوربة الذرة'],
  ['paca','corba',80,9,2,4,0.2,0,250,'','m','kepce:125','paça kelle çorba','Kelle paça çorbası','Trotter soup (kelle paça)','Суп из ножек (келле пача)','Kelle-Paça-Suppe','شوربة الكوارع']
);
Object.assign(ALERJEN_EK, {
  kraker_tam:'gluten,bugday', grisini:'gluten,bugday,zeytin', cubuk_kraker:'gluten,bugday,susam', patates_cipsi:'patates', misir_cipsi:'misir', biskuvi:'gluten,bugday,sut', kepekli_biskuvi:'gluten,bugday',
  yulaf_kurabiye:'gluten,yulaf,bugday,yumurta', tuzlu_kurabiye:'gluten,bugday,sut,yumurta', muffin_yulaf:'gluten,yulaf,bugday,yumurta,sut,muz', protein_puding:'sut,kakao', yogurt_meyve_kase:'sut,gluten,yulaf,muz,cilek',
  humus_havuc:'nohut,susam,sarimsak,havuc', elma_fistik:'elma,yerfistigi', patlak_fistik:'pirinc,yerfistigi', incir_ceviz:'incir,ceviz,kuruyemis', enerji_topu:'hurma,ceviz,kuruyemis,kakao', kuru_meyve_bar:'hurma,kuruyemis,badem',
  sutlu_cikolata:'sut,kakao', gofret:'gluten,bugday,sut,kakao,findik,kuruyemis,soya', kestane:'kuruyemis', kek_ev:'gluten,bugday,yumurta,sut', meyve_salatasi:'elma,muz,narenciye,cilek',
  protein_yogurt:'sut', beyazp_tam:'sut', kasar_light:'sut', mozzarella:'sut', krem_peynir:'sut', yulaf_lapasi:'gluten,yulaf,sut', overnight:'gluten,yulaf,sut,chia', yumurtali_ekmek:'gluten,bugday,yumurta,sut', kuymak:'misir,sut',
  smoothie:'muz,cilek,sut', protein_shake:'sut,muz', cappuccino:'kafein,sut', salep:'sut,tarcin', limonata:'narenciye', kola:'kafein', kola_zero:'kafein',
  mucver:'kabak,yumurta,sut,gluten,bugday,sogan,nane', kapuska:'kirmizi,domates,sogan,biber', fellah:'gluten,bugday,domates,biber,sarimsak', cokertme:'kirmizi,patates,sut,sarimsak,domates', patlican_kizartma:'patlican',
  ic_pilav:'pirinc,kuruyemis,uzum,sogan', sebzeli_bulgur:'gluten,bugday,biber,havuc,domates,sogan', spagetti_bolonez:'gluten,bugday,kirmizi,domates,sogan,havuc', ton_makarna:'gluten,bugday,balik,domates',
  firin_makarna:'gluten,bugday,sut,yumurta', kumpir:'patates,sut,misir,zeytin,salatalik', kremali_tavuk_corba:'tavuk,sut,gluten,bugday', kabak_corba:'kabak,sut,sogan,patates', misir_corba:'misir,sut', paca:'kirmizi,sarimsak,gluten,bugday'
});
DOKTOR_DISI_EK.push('cubuk_kraker','patates_cipsi','misir_cipsi','biskuvi','kepekli_biskuvi','tuzlu_kurabiye','sutlu_cikolata','gofret','kek_ev','salep','limonata','kola','kola_zero',
  'yumurtali_ekmek','kuymak','cokertme','patlican_kizartma','kumpir','firin_makarna');
HAMILE_DISI_EK.push('ton_makarna');
// Listeler: sık yenenler ve öğün önerileri
POPULER.push('kasarli_sandvic','peynirli_sandvic','tavuk_doner_durum','tavuk_sandvic','kofte_ekmek','cig_kofte_durum','hamburger','pizza_karisik','tantuni','balik_ekmek','kumru','ayvalik_tostu','sucuklu_tost',
  'kokorec','tavuk_wrap','sade_pogaca','zeytinli_pogaca','kol_boregi','gozleme_kiyma','pide_sucuklu','krep','pisi','ramazan_pidesi','koy_ekmegi','inegol_kofte','kuru_kofte','tavuk_sinitzel','limonlu_tavuk',
  'sezar_salata','akdeniz_salata','yesil_salata_zy','mucver','ic_pilav','kumpir','spagetti_bolonez','yulaf_lapasi','protein_yogurt','patates_cipsi','kek_ev','kola');
OGUN_ONERI.kahvalti.push('peynirli_sandvic','kasarli_sandvic','lorlu_sandvic','yumurtali_sandvic','avokadolu_sandvic','hindi_sandvic','sade_pogaca','zeytinli_pogaca','tam_pogaca','krep','gozleme_ispanak',
  'koy_ekmegi','kepekli_ekmek','tam_tost_ekmegi','yulaf_lapasi','overnight','beyazp_tam','kasar_light','krem_peynir','pide_yumurtali');
OGUN_ONERI.ara0.push('fistik_muz_sandvic','elma_fistik','yogurt_meyve_kase','protein_yogurt','kraker_tam','humus_havuc');
OGUN_ONERI.ogle.push('tavuk_sandvic','ton_sandvic','hindi_sandvic','tavuk_wrap','hindi_wrap','ton_wrap','sebzeli_wrap','tavuk_doner_durum','tavuk_tantuni','cig_kofte_durum','falafel_durum','balik_ekmek',
  'tavuk_burger','ev_burger','tavuk_panini','caprese_sandvic','sezar_salata','akdeniz_salata','kinoa_salata','mercimek_salata','somon_salata','biftek_salata','pide_tavuklu','pizza_sebzeli','gozleme_kiyma',
  'sebzeli_bulgur','spagetti_bolonez','tavuklu_makarna');
OGUN_ONERI.ara1.push('kraker_tam','grisini','elma_fistik','patlak_fistik','humus_havuc','incir_ceviz','enerji_topu','kuru_meyve_bar','yulaf_kurabiye','muffin_yulaf','protein_puding','protein_yogurt',
  'yogurt_meyve_kase','meyve_salatasi','kestane','smoothie','protein_shake');
OGUN_ONERI.aksam.push('kontrfile','dana_rosto','kuzu_haslama','kuzu_kol','inegol_kofte','sis_kofte','akcaabat_kofte','hindi_sis','hindi_kofte','hindi_but','limonlu_tavuk','tavuk_sinitzel','tavuk_kanat_firin',
  'butun_tavuk','tavuk_adana','tavuk_sarma','tavuk_fajita','tavuk_wok','tavuk_kori','tavuklu_kinoa','mucver','kapuska','ali_nazik','fellah','dana_yahni','sezar_salata','somon_salata','biftek_salata',
  'yesil_salata_zy','sogus','kabak_corba','kremali_tavuk_corba');
OGUN_ONERI.gece.push('protein_puding','protein_yogurt','meyve_salatasi');
