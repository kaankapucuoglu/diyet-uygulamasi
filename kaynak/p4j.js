// ---------- Ek yemekler 8: Proteinli/meyveli yoğurt, ayran-kefir-sütlü içecekler, peynir çeşitleri, ara öğün kombinasyonları, bisküvi-kraker-kek-kurabiye, pastane (cevizli çörek, açma, poğaça), eksik ev yemekleri, sebze, çorba, pilav ----------
// Sütunlar YEMEK_SATIR ile aynı (bkz. p4.js). Değerler 100 g içindir (TÜRKOMP / USDA FoodData Central temelli; kombinasyonlar bileşen ağırlıklarından hesaplandı).
// Kızartma, işlenmiş, şekerli, tuzlu çerez ve kuru tartım kalemleri otomatik plana girmez (DOKTOR_DISI_EK); aramadan ve kategoriden eklenir.
YEMEK_EK.push(
  // Proteinli, meyveli ve özel yoğurtlar
  ['protein_yogurt_cilek','sut',72,9,7,0.8,6,0.3,150,'','d','','proteinli yoğurt çilekli meyveli protein yüksek proteinli light sporcu','Proteinli yoğurt (çilekli)','High-protein yogurt (strawberry)','Высокобелковый йогурт (клубничный)','Proteinjoghurt (Erdbeere)','زبادي عالي البروتين (بالفراولة)'],
  ['protein_yogurt_seftali','sut',72,9,7,0.8,6,0.3,150,'','d','','proteinli yoğurt şeftalili meyveli protein yüksek proteinli light sporcu','Proteinli yoğurt (şeftalili)','High-protein yogurt (peach)','Высокобелковый йогурт (персиковый)','Proteinjoghurt (Pfirsich)','زبادي عالي البروتين (بالخوخ)'],
  ['protein_yogurt_orman','sut',72,9,7,0.8,6,0.5,150,'','d','','proteinli yoğurt orman meyveli böğürtlen yaban mersini protein light sporcu','Proteinli yoğurt (orman meyveli)','High-protein yogurt (mixed berries)','Высокобелковый йогурт (лесные ягоды)','Proteinjoghurt (Waldbeeren)','زبادي عالي البروتين (بالتوت المشكل)'],
  ['cilekli_yogurt','sut',92,3.3,14,2.5,13,0.3,125,'','d','','çilekli yoğurt meyveli yoğurt şekerli market kase','Çilekli yoğurt','Strawberry yogurt','Клубничный йогурт','Erdbeerjoghurt','زبادي بالفراولة'],
  ['seftalili_yogurt','sut',92,3.3,14,2.5,13,0.3,125,'','d','','şeftalili yoğurt meyveli yoğurt şekerli market kase','Şeftalili yoğurt','Peach yogurt','Персиковый йогурт','Pfirsichjoghurt','زبادي بالخوخ'],
  ['orman_meyveli_yogurt','sut',92,3.3,14,2.5,13,0.5,125,'','d','','orman meyveli yoğurt meyveli yoğurt şekerli market kase','Orman meyveli yoğurt','Mixed berry yogurt','Йогурт с лесными ягодами','Waldbeerjoghurt','زبادي بالتوت المشكل'],
  ['yogurt_cilek_ev','sut',40,2.7,6.1,1,5,0.8,250,'','d','','yoğurt çilek taze meyveli şekersiz ev yapımı ara öğün diyet','Yoğurt + taze çilek (şekersiz)','Yogurt with fresh strawberries (no sugar)','Йогурт со свежей клубникой (без сахара)','Joghurt mit frischen Erdbeeren (ohne Zucker)','زبادي بالفراولة الطازجة (بدون سكر)'],
  ['suzme_meyve','sut',70,6.1,6.8,2.1,5.7,0.7,230,'','d','','süzme yoğurt meyve şekersiz ara öğün protein diyet kase','Süzme yoğurt + meyve (şekersiz)','Strained yogurt with fruit (no sugar)','Процеженный йогурт с фруктами (без сахара)','Abgetropfter Joghurt mit Obst (ohne Zucker)','زبادي مصفى بالفواكه (بدون سكر)'],
  ['keci_yogurdu','sut',64,3.6,4.5,3.5,4.5,0,150,'','d','','keçi yoğurdu keçi sütü yoğurt','Keçi yoğurdu','Goat milk yogurt','Йогурт из козьего молока','Ziegenjoghurt','زبادي حليب الماعز'],
  ['koyun_yogurdu','sut',100,5.5,5,6.5,5,0,150,'','dy','','koyun yoğurdu koyun sütü yoğurt tam yağlı','Koyun yoğurdu','Sheep milk yogurt','Йогурт из овечьего молока','Schafsjoghurt','زبادي حليب الغنم'],
  ['laktozsuz_yogurt','sut',60,3.6,4.5,3,4.5,0,150,'','d','','laktozsuz yoğurt laktoz intoleransı','Laktozsuz yoğurt','Lactose-free yogurt','Безлактозный йогурт','Laktosefreier Joghurt','زبادي خالٍ من اللاكتوز'],
  ['kaymakli_yogurt','sut',80,3.5,4.5,5.5,4.5,0,150,'','dy','','kaymaklı yoğurt tam yağlı kaymak tabakalı','Kaymaklı yoğurt (tam yağlı)','Cream-top yogurt (full-fat)','Йогурт со сливочной пенкой (жирный)','Joghurt mit Rahmschicht (vollfett)','زبادي بالقشطة (كامل الدسم)'],
  // Ayran, kefir & sütlü içecekler
  ['yayik_ayran','sut',32,1.6,2.8,1.6,2.8,0,250,'','dt','bardak:250','yayık ayranı köpüklü ayran içecek yoğurt','Yayık ayranı','Churned ayran (yayık)','Пахтаный айран (яйык)','Butter-Ayran (Yayık)','عيران مخضوض (يايك)'],
  ['protein_ayran','sut',38,4.5,3,0.8,3,0,250,'','dt','bardak:250','proteinli ayran yüksek proteinli içecek sporcu','Proteinli ayran','High-protein ayran','Высокобелковый айран','Protein-Ayran','عيران عالي البروتين'],
  ['muzlu_sut','sut',70,3,11,1.5,10.5,0,200,'','d','bardak:200','muzlu süt hazır şekerli aromalı içecek çocuk','Muzlu süt (hazır)','Banana milk (ready-made)','Банановое молоко (готовое)','Bananenmilch (fertig)','حليب بالموز (جاهز)'],
  ['cilekli_sut','sut',70,3,11,1.5,10.5,0,200,'','d','bardak:200','çilekli süt hazır şekerli aromalı içecek çocuk','Çilekli süt (hazır)','Strawberry milk (ready-made)','Клубничное молоко (готовое)','Erdbeermilch (fertig)','حليب بالفراولة (جاهز)'],
  ['sut_muz_ev','sut',60,2.6,10.9,1.1,7.3,0.9,250,'','d','bardak:250','muzlu süt ev yapımı şekersiz blender ara öğün','Muzlu süt (ev yapımı, şekersiz)','Homemade banana milk (no sugar)','Домашнее банановое молоко (без сахара)','Hausgemachte Bananenmilch (ohne Zucker)','حليب بالموز منزلي (بدون سكر)'],
  ['balli_sut','sut',55,3.2,7.4,1.5,7.4,0,200,'','d','bardak:200','ballı süt sıcak süt bal gece','Ballı süt','Milk with honey','Молоко с мёдом','Milch mit Honig','حليب بالعسل'],
  ['zerdecalli_sut','sut',48,3.3,5,1.6,4.8,0.2,200,'','d','bardak:200','zerdeçallı süt altın süt golden milk tarçınlı şekersiz gece','Zerdeçallı süt (şekersiz)','Turmeric milk (golden milk, no sugar)','Куркумное молоко (без сахара)','Kurkumamilch (Goldene Milch, ohne Zucker)','حليب بالكركم (بدون سكر)'],
  ['kakao_sut','sut',52,3.7,6.1,1.8,4.7,0.8,200,'','d','bardak:200','sütlü kakao sıcak kakao şekersiz şeker ilavesiz gece','Sütlü kakao (şeker ilavesiz)','Hot cocoa with milk (no added sugar)','Какао на молоке (без сахара)','Kakao mit Milch (ohne Zuckerzusatz)','كاكاو بالحليب (بدون سكر مضاف)'],
  // Lor, labne & peynir çeşitleri
  ['lor_yagsiz','sut',72,13,3,0.8,3,0,50,'','d','yk:15','lor peyniri yağsız light diyet protein kahvaltı','Lor peyniri (yağsız)','Fat-free curd cheese (lor)','Обезжиренный творожный сыр (лор)','Magerer Quarkkäse (Lor)','جبن قريش خالي الدسم'],
  ['lor_dereotu','sut',128,11.4,2.9,8.1,2.9,0.2,60,'','d','yk:15','dereotlu lor zeytinyağlı lor ezmesi kahvaltı','Dereotlu lor (zeytinyağlı)','Curd cheese with dill & olive oil','Творожный сыр с укропом и оливковым маслом','Quarkkäse mit Dill & Olivenöl','جبن قريش بالشبت وزيت الزيتون'],
  ['krem_peynir_tam','sut',230,5.5,4,21.5,3.5,0,30,'','dy','yk:20','krem peynir tam yağlı sürülebilir peynir kahvaltı','Krem peynir (tam yağlı)','Cream cheese (full-fat)','Сливочный сыр (жирный)','Frischkäse (Doppelrahmstufe)','جبنة كريمية (كاملة الدسم)'],
  ['civil','sut',215,27,1.5,11,1,0,30,'','dt','kibrit:30','civil peyniri çeçil tel peynir erzurum kahvaltı','Civil peyniri (çeçil)','Civil cheese (string cheese, çeçil)','Сыр чечил (косичка)','Civil-Käse (Fadenkäse, Çeçil)','جبنة جديلة (تشيتشيل)'],
  ['mavi_peynir','sut',353,21,2.3,29,0.5,0,20,'','dty','','mavi peynir küflü peynir rokfor gorgonzola','Mavi küflü peynir (rokfor tipi)','Blue cheese (Roquefort-style)','Голубой сыр с плесенью (типа рокфор)','Blauschimmelkäse (Roquefort-Art)','جبنة زرقاء (نوع روكفور)'],
  ['gouda','sut',356,25,2.2,27,2.2,0,1,'dilim:20','dty','','gouda peyniri sarı peynir dilim kahvaltı','Gouda peyniri','Gouda cheese','Сыр гауда','Gouda','جبنة غودا'],
  ['ricotta','sut',174,11,3,13,0.3,0,50,'','d','yk:20','ricotta peyniri taze peynir lor','Ricotta peyniri','Ricotta','Рикотта','Ricotta','جبنة ريكوتا'],
  ['mini_peynir','sut',305,22,0.5,24,0,0,1,'adet:20','dty','','mini peynir tekli paket atıştırmalık peynir çocuk beslenme','Mini peynir (tekli paket)','Mini cheese (single snack portion)','Мини-сыр (порционный)','Mini-Käse (Snackportion)','جبنة صغيرة (حصة فردية)'],
  ['eritme_peynir','sut',300,16,5,24,4,0,1,'dilim:18','dty','','dilim eritme peynir tost peyniri hamburger peyniri işlenmiş','Dilim eritme peynir (tost peyniri)','Processed cheese slice','Плавленый сыр (ломтики)','Schmelzkäsescheibe','جبنة شرائح مطبوخة'],
  // Sporcu: proteinli ürünler
  ['protein_puding_vanilya','sporcu',82,10,7,1.5,4,0,200,'','d','','proteinli puding vanilyalı protein tatlı sporcu','Proteinli puding (vanilyalı)','High-protein pudding (vanilla)','Высокобелковый пудинг (ванильный)','Proteinpudding (Vanille)','بودنغ عالي البروتين (بالفانيليا)'],
  ['protein_sut_kakao','sporcu',70,8,6,1.5,5,0.5,250,'','d','kutu:250','proteinli süt kakaolu çikolatalı hazır protein içecek sporcu','Proteinli süt (kakaolu, hazır)','High-protein chocolate milk (ready-made)','Высокобелковое шоколадное молоко (готовое)','Protein-Kakaomilch (fertig)','حليب بالكاكاو عالي البروتين (جاهز)'],
  ['protein_gofret','sporcu',430,25,38,20,12,5,1,'adet:40','d','','proteinli gofret protein wafer sporcu atıştırmalık','Proteinli gofret','Protein wafer bar','Протеиновые вафли','Protein-Waffel','ويفر بالبروتين'],
  ['probar_sekersiz','sporcu',350,33,30,14,3,6,1,'adet:55','d','','protein bar şekersiz şeker ilavesiz yüksek proteinli sporcu','Protein bar (şeker ilavesiz)','Protein bar (no added sugar)','Протеиновый батончик (без сахара)','Proteinriegel (ohne Zuckerzusatz)','لوح بروتين (بدون سكر مضاف)'],
  ['mug_cake','sporcu',255,29.9,17.1,8.2,2,3,1,'adet:120','ed','','proteinli kupa kek mug cake whey yulaf mikrodalga sporcu tatlı','Proteinli kupa kek (mug cake)','Protein mug cake','Протеиновый кекс в кружке','Protein-Tassenkuchen (Mug Cake)','كيك الكوب بالبروتين'],
  // Ara öğün: kuruyemiş, kuru meyve ve peynir kombinasyonları
  ['kayisi_badem','atistirmalik',354,9.3,49.3,17,36.8,9.1,36,'','','','kuru kayısı badem ara öğün kuruyemiş kuru meyve','Kuru kayısı + badem','Dried apricots & almonds','Курага с миндалём','Getrocknete Aprikosen & Mandeln','مشمش مجفف ولوز'],
  ['leblebi_uzum','atistirmalik',330,12.6,68.5,2.8,30.5,7.9,40,'','','cay:40','leblebi kuru üzüm çerez ara öğün','Leblebi + kuru üzüm','Roasted chickpeas & raisins','Жареный нут с изюмом','Geröstete Kichererbsen & Rosinen','حمص محمص وزبيب'],
  ['findik_uzum','atistirmalik',463,9,48,30.8,31.7,6.7,30,'','','','fındık kuru üzüm çerez ara öğün kuruyemiş','Fındık + kuru üzüm','Hazelnuts & raisins','Фундук с изюмом','Haselnüsse & Rosinen','بندق وزبيب'],
  ['trail_mix','atistirmalik',480,11.4,38.8,33.2,24.4,7.8,30,'','','','kuruyemiş kuru meyve karışımı tuzsuz trail mix öğrenci karışımı badem fındık ceviz kaju üzüm kayısı','Kuruyemiş + kuru meyve karışımı (tuzsuz)','Mixed nuts & dried fruit (unsalted trail mix)','Смесь орехов и сухофруктов (несолёная)','Studentenfutter (ungesalzen)','خليط المكسرات والفواكه المجففة (غير مملح)'],
  ['cerez_karisik','atistirmalik',495,24.3,32.7,32,3,9.6,30,'','t','','karışık çerez leblebi yer fıstığı çekirdek tuzlu kavrulmuş','Karışık çerez (leblebi, fıstık, çekirdek, tuzlu)','Mixed salted snack nuts (roasted chickpeas, peanuts, seeds)','Солёная смесь (нут, арахис, семечки)','Gesalzene Knabbermischung (Kichererbsen, Erdnüsse, Kerne)','مكسرات مشكلة مملحة (حمص، فول سوداني، بذور)'],
  ['sekerli_leblebi','atistirmalik',380,10,78,3,50,6,30,'','','','şekerli leblebi beyaz leblebi şeker kaplı çerez','Şekerli leblebi','Sugar-coated roasted chickpeas','Нут в сахарной глазури (леблеби)','Kichererbsen mit Zuckerglasur','حمص محمص مغطى بالسكر'],
  ['hurma_fistik','atistirmalik',400,11.2,53.8,19.5,44.1,7.2,26,'','','','hurma fıstık ezmesi ara öğün sporcu antrenman öncesi','Hurma + fıstık ezmesi','Dates with peanut butter','Финики с арахисовой пастой','Datteln mit Erdnussbutter','تمر بزبدة الفول السوداني'],
  ['muz_fistik','atistirmalik',145,3.8,22.7,5.8,11.9,3,135,'','','','muz fıstık ezmesi ara öğün sporcu antrenman öncesi','Muz + fıstık ezmesi','Banana with peanut butter','Банан с арахисовой пастой','Banane mit Erdnussbutter','موز بزبدة الفول السوداني'],
  ['elma_ceviz','atistirmalik',95,1.4,14,4.8,9.9,2.7,1,'adet:140','','','elma ceviz ara öğün diyet','Elma + ceviz','Apple & walnuts','Яблоко с грецкими орехами','Apfel & Walnüsse','تفاح وجوز'],
  ['peynir_ceviz','atistirmalik',315,16.5,5,26.8,1.8,1.7,40,'','dt','','beyaz peynir ceviz ara öğün kahvaltı diyet','Beyaz peynir + ceviz','White cheese & walnuts','Белый сыр с грецкими орехами','Weißkäse & Walnüsse','جبنة بيضاء وجوز'],
  ['lor_meyve','atistirmalik',75,6.5,9,1.9,6.5,1,200,'','d','','lor peyniri meyve kasesi ara öğün protein diyet şekersiz','Lor peyniri + meyve kasesi','Curd cheese & fruit bowl','Творожный сыр с фруктами','Quarkkäse mit Obst','جبن قريش مع الفواكه'],
  ['patlak_labne','atistirmalik',226,7.4,33.5,6.7,2.8,1.5,48,'','d','','pirinç patlağı labne light ara öğün diyet','Pirinç patlağı + labne (light)','Rice cakes with light labneh','Рисовые хлебцы с лабне (лайт)','Reiswaffeln mit Labneh (light)','كعك الأرز مع لبنة خفيفة'],
  ['ton_kraker','atistirmalik',220,20.6,21.7,5.7,1,3,60,'','ft','','ton balıklı kraker tam buğday ara öğün protein','Ton balıklı kraker','Tuna on wholegrain crackers','Тунец на цельнозерновых крекерах','Thunfisch auf Vollkorncrackern','تونة على مقرمشات القمح الكامل'],
  ['simit_peynir','atistirmalik',277,11.6,42.8,7.1,3.4,2.3,1,'adet:130','dt','','simit beyaz peynir ara öğün kahvaltı çay yanı','Simit + beyaz peynir','Simit with white cheese','Симит с белым сыром','Simit mit Weißkäse','سميت مع جبنة بيضاء'],
  ['granola_kase','atistirmalik',114,6.6,12.9,4.1,6.4,1.5,260,'','d','','süzme yoğurt granola meyve kase bowl ara öğün kahvaltı','Süzme yoğurt, granola ve meyve kasesi','Greek yogurt bowl with granola & fruit','Боул из греческого йогурта с гранолой и фруктами','Joghurt-Bowl mit Granola & Obst','وعاء زبادي مصفى مع الجرانولا والفواكه'],
  ['acai_kase','atistirmalik',120,2.5,20,4,12,4,300,'','','','açai kasesi acai bowl meyve granola smoothie bowl','Açai kasesi (meyveli, granolalı)','Açaí bowl (with fruit & granola)','Асаи-боул (с фруктами и гранолой)','Açaí-Bowl (mit Obst & Granola)','وعاء الأساي (بالفواكه والجرانولا)'],
  // Ara öğün: bar, kraker, bisküvi, cips & şekerleme
  ['musli_bar','atistirmalik',400,6,68,12,30,5,1,'adet:25','','','müsli bar meyveli tahıl bar ara öğün','Müsli bar (meyveli)','Muesli bar (with fruit)','Мюсли-батончик (с фруктами)','Müsliriegel (mit Früchten)','لوح ميوسلي (بالفواكه)'],
  ['kuruyemis_bar','atistirmalik',520,15,30,40,15,7,1,'adet:40','','','kuruyemiş bar bademli fındıklı bar ara öğün','Kuruyemiş bar (bademli, fındıklı)','Nut bar (almonds & hazelnuts)','Ореховый батончик (миндаль, фундук)','Nussriegel (Mandeln & Haselnüsse)','لوح المكسرات (لوز وبندق)'],
  ['yulaf_kraker','atistirmalik',430,10,62,16,3,8,30,'','','','yulaflı kraker yulaf krakeri ara öğün','Yulaflı kraker','Oat crackers','Овсяные крекеры','Hafercracker','مقرمشات الشوفان'],
  ['kraker_tuzlu','atistirmalik',480,8,63,20,6,2.5,30,'','ty','','kraker tuzlu sade yuvarlak kraker çerez','Kraker (tuzlu, sade)','Salted crackers (plain)','Солёные крекеры','Salzcracker','مقرمشات مملحة (سادة)'],
  ['biskuvi_sekersiz','atistirmalik',440,9,64,17,3,9,3,'adet:10','','','tam tahıllı bisküvi şeker ilavesiz şekersiz diyabetik diyet','Tam tahıllı bisküvi (şeker ilavesiz)','Wholegrain biscuits (no added sugar)','Цельнозерновое печенье (без сахара)','Vollkornkekse (ohne Zuckerzusatz)','بسكويت الحبوب الكاملة (بدون سكر مضاف)'],
  ['yulaf_biskuvi','atistirmalik',470,7,66,19,20,6,3,'adet:12','y','','yulaflı bisküvi hazır paketli','Yulaflı bisküvi (hazır)','Oat biscuits (packaged)','Овсяное печенье (магазинное)','Haferkekse (abgepackt)','بسكويت الشوفان (معبأ)'],
  ['kremali_biskuvi','atistirmalik',480,5,68,21,35,2,3,'adet:12','y','','kremalı bisküvi sandviç bisküvi kakaolu vanilyalı','Kremalı bisküvi','Cream-filled biscuits','Печенье с кремовой начинкой','Kekse mit Cremefüllung','بسكويت محشو بالكريمة'],
  ['cikolatali_biskuvi','atistirmalik',500,6,64,24,35,3,2,'adet:15','y','','çikolata kaplı bisküvi çikolatalı bisküvi','Çikolata kaplı bisküvi','Chocolate-coated biscuits','Печенье в шоколадной глазури','Schokoladenkekse (überzogen)','بسكويت مغطى بالشوكولاتة'],
  ['incirli_biskuvi','atistirmalik',370,4,70,9,40,4,2,'adet:18','','','incirli bisküvi incir dolgulu bisküvi','İncir dolgulu bisküvi','Fig-filled biscuits','Печенье с инжирной начинкой','Feigenkekse (gefüllt)','بسكويت محشو بالتين'],
  ['bebe_biskuvi','atistirmalik',430,8,76,10.5,22,2.5,4,'adet:6','','','bebe bisküvisi çocuk bisküvisi sade','Bebe bisküvisi','Plain baby biscuits','Детское печенье','Babykekse','بسكويت الأطفال'],
  ['muz_yulaf_kurabiye','atistirmalik',210,6.5,43,2.5,12,5.7,2,'adet:25','','','muzlu yulaflı kurabiye şekersiz iki malzemeli fit diyet','Muzlu yulaflı kurabiye (şekersiz)','Banana oat cookies (no sugar)','Бананово-овсяное печенье (без сахара)','Bananen-Hafer-Kekse (ohne Zucker)','كوكيز الموز والشوفان (بدون سكر)'],
  ['fit_kek','atistirmalik',280,8,40,10,12,4,1,'dilim:60','e','','yulaflı muzlu kek şekersiz fit kek ev yapımı diyet','Yulaflı muzlu kek (şekersiz, ev yapımı)','Oat & banana cake (no sugar, homemade)','Овсяно-банановый кекс (без сахара, домашний)','Hafer-Bananen-Kuchen (ohne Zucker, hausgemacht)','كيك الشوفان والموز (بدون سكر، منزلي)'],
  ['bitter85','atistirmalik',580,11,22,48,12,13,2,'kare:5','','','bitter çikolata yüzde 85 kakao yoğun','Bitter çikolata (%85)','Dark chocolate (85%)','Горький шоколад (85%)','Zartbitterschokolade (85 %)','شوكولاتة داكنة (85%)'],
  ['bitter55','atistirmalik',545,6,55,33,45,7,2,'kare:5','','','bitter çikolata yüzde 55 yarı bitter','Bitter çikolata (%55)','Dark chocolate (55%)','Тёмный шоколад (55%)','Halbbitterschokolade (55 %)','شوكولاتة داكنة (55%)'],
  ['muz_cipsi','atistirmalik',519,2.3,58.4,33.6,35.3,7.7,20,'','y','','muz cipsi kurutulmuş muz kızarmış çerez','Muz cipsi','Banana chips','Банановые чипсы','Bananenchips','رقائق الموز'],
  ['light_cips','atistirmalik',440,6.5,72,14,3,5,25,'','t','','fırında patates cipsi light az yağlı cips','Fırında patates cipsi (az yağlı)','Baked potato chips (reduced fat)','Запечённые картофельные чипсы (с пониженным жиром)','Gebackene Kartoffelchips (fettreduziert)','رقائق بطاطس مخبوزة (قليلة الدهن)'],
  ['jelibon','atistirmalik',343,6.9,77,0.2,46,0,25,'','','','jelibon şekerleme meyveli jöle şeker','Jelibon (meyveli)','Gummy candies (fruit jelly)','Жевательный мармелад','Fruchtgummi','حلوى الجيلي بالفواكه'],
  // Tatlılar: sütlü tatlı, kek, kurabiye & şerbetli
  ['vanilya_puding','tatli',120,3,20,3,15,0,150,'','d','','vanilyalı puding sütlü tatlı','Vanilyalı puding','Vanilla pudding','Ванильный пудинг','Vanillepudding','بودنغ الفانيليا'],
  ['light_muhallebi','tatli',70,3.5,11,1.5,5,0,150,'','d','','muhallebi light tatlandırıcılı şekersiz diyet sütlü tatlı','Muhallebi (light, tatlandırıcılı)','Milk pudding (light, with sweetener)','Молочный пудинг (лайт, с подсластителем)','Milchpudding (light, mit Süßstoff)','مهلبية (لايت، بمحلٍّ صناعي)'],
  ['frozen_yogurt','tatli',135,3.5,24,3,22,0,100,'','d','','dondurulmuş yoğurt frozen yogurt dondurma','Dondurulmuş yoğurt (frozen yogurt)','Frozen yogurt','Замороженный йогурт','Frozen Joghurt','زبادي مجمد'],
  ['nice_cream','tatli',92,1.6,21.5,0.6,13,2.3,150,'','d','','muzlu dondurma şekersiz ev yapımı dondurulmuş muz fit tatlı','Muzlu dondurma (şekersiz, ev yapımı)','Banana nice cream (homemade, no sugar)','Банановое мороженое (домашнее, без сахара)','Bananeneis (hausgemacht, ohne Zucker)','آيس كريم الموز (منزلي، بدون سكر)'],
  ['kemalpasa','tatli',280,5,55,5,45,0.5,2,'adet:30','','','kemalpaşa tatlısı şerbetli peynir tatlısı','Kemalpaşa tatlısı','Kemalpaşa (cheese dumplings in syrup)','Кемальпаша (сырные шарики в сиропе)','Kemalpaşa (Käsebällchen in Sirup)','حلوى كمال باشا (كرات الجبن بالشراب)'],
  ['kalburabasti','tatli',400,5,55,18,35,1.5,2,'adet:30','y','','kalburabastı şerbetli tatlı cevizli','Kalburabastı','Kalburabastı (syrup-soaked walnut pastry)','Калбурабасты (печенье в сиропе с орехами)','Kalburabastı (Sirupgebäck mit Walnüssen)','كالبورابستي (معجنات بالجوز والشراب)'],
  ['sutlu_nuriye','tatli',320,6,40,15,28,1,2,'adet:40','y','','sütlü nuriye baklava sütlü şerbet fındıklı','Sütlü nuriye','Sütlü nuriye (milk-syrup baklava)','Сютлю нурие (пахлава с молочным сиропом)','Sütlü Nuriye (Baklava mit Milchsirup)','نورية بالحليب (بقلاوة بشراب الحليب)'],
  ['ekler','tatli',262,6.4,24,15.7,14,0.6,1,'adet:50','edy','','ekler çikolatalı pastane tatlı','Ekler (çikolatalı)','Chocolate éclair','Эклер (шоколадный)','Schokoladen-Eclair','إكلير بالشوكولاتة'],
  ['mozaik_pasta','tatli',460,5,55,25,35,2,1,'dilim:50','dy','','mozaik pasta bisküvili kakaolu pasta','Mozaik pasta','Chocolate biscuit cake (mosaic cake)','Шоколадная колбаса из печенья (мозаика)','Mosaikkuchen (Keks-Schokoladen-Kuchen)','كيك الموزاييك (بسكويت وشوكولاتة)'],
  ['havuclu_kek','tatli',360,5,45,18,28,1.5,1,'dilim:60','ey','','havuçlu cevizli kek tarçınlı kek dilimi','Havuçlu cevizli kek','Carrot & walnut cake','Морковный кекс с грецкими орехами','Karotten-Walnuss-Kuchen','كيك الجزر والجوز'],
  ['elmali_kek','tatli',340,5,50,14,28,1.5,1,'dilim:60','ey','','elmalı tarçınlı kek kek dilimi','Elmalı tarçınlı kek','Apple cinnamon cake','Яблочный кекс с корицей','Apfel-Zimt-Kuchen','كيك التفاح والقرفة'],
  ['islak_kek','tatli',400,5,55,18,35,2.5,1,'dilim:70','edy','','ıslak kek kakaolu soslu kek dilimi','Islak kek (kakaolu)','Wet chocolate cake (ıslak kek)','Влажный шоколадный кекс','Saftiger Schokokuchen (Islak Kek)','الكيك المبلل بالكاكاو'],
  ['cikolatali_muffin','tatli',420,6,52,22,30,2,1,'adet:90','edy','','çikolatalı muffin kek pastane','Çikolatalı muffin','Chocolate muffin','Шоколадный маффин','Schokoladenmuffin','مافن بالشوكولاتة'],
  ['donut','tatli',420,5,50,22,22,1.5,1,'adet:65','y','','donut şekerli kaplamalı pastane','Donut (şekerli kaplamalı)','Glazed doughnut','Пончик в глазури','Donut (glasiert)','دونات مزجج'],
  ['cevizli_kurabiye','tatli',490,6,55,28,25,2,2,'adet:20','y','','cevizli kurabiye ev yapımı pastane','Cevizli kurabiye','Walnut cookies','Печенье с грецкими орехами','Walnusskekse','كوكيز بالجوز'],
  ['tahinli_kurabiye','tatli',490,8,52,28,22,3,2,'adet:20','','','tahinli kurabiye ev yapımı','Tahinli kurabiye','Tahini cookies','Печенье с тахини','Tahini-Kekse','كوكيز بالطحينة'],
  ['kakaolu_kurabiye','tatli',485,6,60,25,28,3,2,'adet:20','y','','kakaolu kurabiye çikolatalı ev yapımı','Kakaolu kurabiye (ev yapımı)','Cocoa cookies (homemade)','Печенье с какао (домашнее)','Kakaokekse (hausgemacht)','كوكيز بالكاكاو (منزلية)'],
  ['elmali_kurabiye','tatli',420,5,55,20,20,2,2,'adet:30','y','','elmalı kurabiye tarçınlı ev yapımı','Elmalı kurabiye','Apple-filled cookies','Печенье с яблочной начинкой','Apfelkekse (gefüllt)','كوكيز محشوة بالتفاح'],
  ['acibadem','tatli',460,9,60,20,50,3,2,'adet:15','','','acıbadem kurabiyesi bademli kurabiye','Acıbadem kurabiyesi','Turkish almond cookies (acıbadem)','Миндальное печенье (аджибадем)','Mandelmakronen (Acıbadem)','كوكيز اللوز التركي'],
  ['hosaf','tatli',75,0.5,18,0.1,16,1,200,'','','','hoşaf komposto kuru meyve kayısı üzüm erik','Hoşaf (kuru meyve, az şekerli)','Hoşaf (dried fruit compote, lightly sweetened)','Хошаф (компот из сухофруктов, малосладкий)','Hoşaf (Trockenobst-Kompott, leicht gesüßt)','خوشاف (كومبوت الفواكه المجففة، قليل السكر)'],
  // Pastane & hamur işi
  ['cevizli_corek','hamur',400,7,48,20,16,2.5,1,'adet:90','y','','cevizli çörek pastane çörek tatlı çörek','Cevizli çörek','Walnut çörek (sweet walnut bun)','Сдобная булочка с грецкими орехами (чёрек)','Walnuss-Çörek (süßes Hefegebäck)','كعكة الجوز (تشوريك)'],
  ['paskalya_coregi','hamur',350,8,52,12,15,2,1,'dilim:50','e','','paskalya çöreği mahlepli çörek örgü çörek pastane','Paskalya çöreği','Turkish sweet braided bread (paskalya çöreği)','Сдобный плетёный хлеб (пасхальный чёрек)','Türkischer Hefezopf (Paskalya Çöreği)','خبز مضفور حلو (تشوريك)'],
  ['kiymali_pogaca','hamur',350,10,38,18,3,1.5,1,'adet:80','my','','kıymalı poğaça pastane','Kıymalı poğaça','Minced meat poğaça','Погача с мясным фаршем','Poğaça mit Hackfleisch','بوغاتشا باللحم المفروم'],
  ['yulafli_pogaca','hamur',300,11,38,12,3,5,1,'adet:70','d','','yulaflı poğaça fit poğaça peynirli ev yapımı diyet','Yulaflı poğaça (fit, peynirli)','Oat poğaça (fit, with cheese)','Овсяная погача с сыром (фит)','Hafer-Poğaça (fit, mit Käse)','بوغاتشا الشوفان (صحية، بالجبن)'],
  ['peynirli_acma','hamur',380,9,42,20,5,1.5,1,'adet:90','dy','','peynirli açma pastane kahvaltı','Peynirli açma','Açma with cheese','Ачма с сыром','Açma mit Käse','أتشما بالجبن'],
  ['zeytinli_acma','hamur',380,7,45,20,4,2,1,'adet:90','ty','','zeytinli açma pastane kahvaltı','Zeytinli açma','Açma with olives','Ачма с оливками','Açma mit Oliven','أتشما بالزيتون'],
  ['cikolatali_kruvasan','hamur',420,6.5,45,24,16,2.5,1,'adet:70','dy','','çikolatalı kruvasan pastane','Çikolatalı kruvasan','Chocolate croissant','Круассан с шоколадом','Schokocroissant','كرواسون بالشوكولاتة'],
  ['gul_boregi','hamur',290,9,27,16,2,1,1,'adet:80','dy','','gül böreği peynirli börek el açması','Gül böreği (peynirli)','Rose börek (cheese-filled spiral)','Бёрек-розочка с сыром','Rosen-Börek (mit Käse)','بوريك الوردة (بالجبن)'],
  ['tarcinli_rulo','hamur',380,6,55,15,25,2,1,'adet:90','dy','','tarçınlı rulo çörek tarçınlı çörek cinnamon roll pastane','Tarçınlı rulo çörek','Cinnamon roll','Булочка с корицей','Zimtschnecke','لفائف القرفة'],
  ['cavdar_simit','hamur',290,10,50,7,4,6.5,1,'adet:90','','','çavdarlı simit susamlı','Çavdarlı simit','Rye simit','Ржаной симит','Roggen-Simit','سميت بالجاودار'],
  // Ekmek & tahıl
  ['cok_tahilli','tahil',250,10,40,4.5,4,7,2,'dilim:30','','','çok tahıllı ekmek tahıllı ekmek tohumlu','Çok tahıllı ekmek','Multigrain bread','Многозерновой хлеб','Mehrkornbrot','خبز متعدد الحبوب'],
  ['tandir_ekmek','tahil',255,8.5,52,1.5,2,2.5,1,'dilim:50','','','tandır ekmeği köy ekmeği','Tandır ekmeği','Tandır bread','Тандырный хлеб','Tandır-Brot','خبز التنور'],
  ['cevizli_ekmek','tahil',280,9,40,9,3,5,2,'dilim:30','','','cevizli ekmek','Cevizli ekmek','Walnut bread','Хлеб с грецкими орехами','Walnussbrot','خبز بالجوز'],
  ['zeytinli_ekmek','tahil',265,8,45,6,2.5,3,2,'dilim:30','t','','zeytinli ekmek','Zeytinli ekmek','Olive bread','Хлеб с оливками','Olivenbrot','خبز بالزيتون'],
  ['kepekli_gevrek','tahil',340,10,66,2.5,16,15,30,'','','','kepekli gevrek kahvaltılık gevrek lifli bran','Kepekli kahvaltılık gevrek','Bran flakes (breakfast cereal)','Отрубные хлопья (сухой завтрак)','Kleieflocken (Frühstücksflocken)','رقائق النخالة (حبوب الإفطار)'],
  ['galeta_sade','tahil',400,11,74,5.5,5,4,2,'adet:10','','','galeta sade dilimli peksimet','Galeta (sade)','Rusks (plain)','Сухари (простые)','Zwieback (natur)','خبز محمص (سادة)'],
  // İçecekler
  ['su_kefiri','icecek',18,0.2,4.5,0,3.5,0,250,'','','bardak:250','su kefiri probiyotik fermente içecek','Su kefiri','Water kefir','Водный кефир (тибетский гриб)','Wasserkefir','كفير الماء'],
  ['kefir_smoothie','icecek',78,3.6,11.5,1.9,5.6,1.1,250,'','d','bardak:250','kefirli smoothie muzlu yulaflı ara öğün','Kefirli muzlu yulaflı smoothie','Kefir smoothie (banana & oats)','Смузи на кефире (банан и овсянка)','Kefir-Smoothie (Banane & Hafer)','سموذي الكفير (موز وشوفان)'],
  ['yulaf_smoothie','icecek',81,3.5,14.3,1.5,6.9,1.4,300,'','d','bardak:300','sütlü muzlu yulaflı smoothie ara öğün kahvaltı','Sütlü muzlu yulaf smoothie','Banana oat smoothie (with milk)','Бананово-овсяный смузи на молоке','Bananen-Hafer-Smoothie (mit Milch)','سموذي الموز والشوفان بالحليب'],
  ['hazir_soguk_kahve','icecek',60,2.5,9,1.5,8.5,0,250,'','d','kutu:250','soğuk kahve hazır şişe kutu sütlü şekerli','Soğuk kahve (hazır, şişe/kutu)','Ready-to-drink iced coffee (bottle/can)','Холодный кофе (готовый, в бутылке)','Eiskaffee (trinkfertig, Flasche/Dose)','قهوة مثلجة جاهزة (زجاجة/علبة)'],
  ['sutlu_turk_kahvesi','icecek',50,3.4,5,1.6,4.8,0,1,'fincan:70','d','','sütlü türk kahvesi sütle pişmiş kahve şekersiz','Sütlü Türk kahvesi (şekersiz)','Turkish coffee made with milk (no sugar)','Кофе по-турецки на молоке (без сахара)','Türkischer Kaffee mit Milch (ohne Zucker)','قهوة تركية بالحليب (بدون سكر)'],
  ['frappe','icecek',90,1.5,14,3,13,0,1,'fincan:350','d','','frappe buzlu kahve kremalı şekerli','Frappe (buzlu kahve, şekerli)','Frappé (blended iced coffee, sweetened)','Фраппе (сладкий)','Frappé (gesüßt)','فرابيه (محلّى)'],
  ['visne_nektari','icecek',55,0.3,13,0,12,0.1,1,'bardak:200','','','vişne nektarı vişne suyu paketli meyve suyu','Vişne nektarı (paketli)','Sour cherry nectar (packaged)','Вишнёвый нектар (пакетированный)','Sauerkirschnektar (abgepackt)','عصير الكرز الحامض (نكتار معبأ)'],
  ['zencefil_cayi','icecek',2,0.1,0.5,0,0.2,0,1,'fincan:200','','','zencefilli limonlu çay bitki çayı şekersiz','Zencefilli limonlu çay (şekersiz)','Ginger lemon tea (unsweetened)','Имбирный чай с лимоном (без сахара)','Ingwer-Zitronen-Tee (ungesüßt)','شاي الزنجبيل بالليمون (بدون سكر)'],
  // Et & şarküteri
  ['dana_jambon','et',115,18,1.5,4,1,0,3,'dilim:10','mt','','dana jambon şarküteri kahvaltı sandviç','Dana jambon','Beef ham (sliced)','Говяжья ветчина (ломтики)','Rinderschinken (Scheiben)','لحم بقري مطبوخ (شرائح)'],
  ['tavuk_sucuk','et',275,16,3,22,1,0,3,'dilim:10','cty','','tavuk sucuk piliç sucuk kahvaltı','Tavuk sucuk','Chicken sucuk (sausage)','Куриный суджук','Hähnchen-Sucuk','سجق دجاج'],
  ['kiyma_orta','et',250,24,0,17,0,0,100,'','my','','dana kıyma orta yağlı sote kırmızı et','Dana kıyma (orta yağlı, sote)','Minced beef (medium-fat, sautéed)','Говяжий фарш (средней жирности, обжаренный)','Rinderhack (mittelfett, angebraten)','لحم بقري مفروم (متوسط الدهن، مقلي)'],
  ['tavuk_but_hasl','et',152,24,0,6,0,0,150,'','c','','tavuk but haşlama derisiz piliç','Tavuk but (haşlama, derisiz)','Chicken thigh (boiled, skinless)','Куриное бедро (отварное, без кожи)','Hähnchenkeule (gekocht, ohne Haut)','فخذ دجاج (مسلوق، بدون جلد)'],
  // Balık & deniz ürünü
  ['istavrit_izgara','balik',155,20,0,8,0,0,150,'','f','','istavrit ızgara deniz ürünü','İstavrit (ızgara)','Horse mackerel (grilled)','Ставрида (гриль)','Stöcker (gegrillt)','سمك الصوريل (مشوي)'],
  ['cipura_firin','balik',140,22,0,6,0,0,200,'','f','','çipura fırın deniz ürünü','Çipura (fırın)','Sea bream (baked)','Дорадо (запечённая)','Dorade (Ofen)','دنيس (بالفرن)'],
  ['somon_bug','balik',190,21,1,11,0.5,0.2,150,'','f','','somon buğulama haşlama deniz ürünü','Somon (buğulama)','Salmon (steamed)','Лосось (на пару)','Lachs (gedünstet)','سلمون (على البخار)'],
  ['karides_sote','balik',150,20,1.5,7,0.5,0.2,150,'','fd','','karides sote tereyağlı sarımsaklı deniz ürünü','Karides sote (tereyağlı)','Sautéed shrimp (with butter)','Креветки соте (на сливочном масле)','Garnelen in Butter (sautiert)','روبيان سوتيه (بالزبدة)'],
  ['panga_firin','balik',90,15,0,3,0,0,200,'','f','','panga fileto pangasius fırın beyaz balık','Panga fileto (fırın)','Pangasius fillet (baked)','Филе пангасиуса (запечённое)','Pangasiusfilet (Ofen)','فيليه سمك البانجا (بالفرن)'],
  // Yumurta & bitkisel
  ['kabakli_yumurta','yumurta',100,6,3,7,2,0.8,200,'','e','','kabaklı yumurta kabak sote kahvaltı tava','Kabaklı yumurta','Eggs with zucchini','Яйца с кабачками','Eier mit Zucchini','بيض بالكوسا'],
  ['avokado_yumurta','yumurta',165,6.7,5.8,13.8,0.8,4.2,1,'adet:120','e','','fırında avokadolu yumurta avokado kahvaltı','Fırında avokadolu yumurta','Baked egg in avocado','Яйцо, запечённое в авокадо','Im Ofen gebackenes Ei in Avocado','بيض مخبوز في الأفوكادو'],
  ['tofu_scramble','bitkisel',130,12,3,8,1,1.5,150,'','','','tofu çırpma vegan yumurta yerine sebzeli kahvaltı','Sebzeli tofu çırpma (vegan)','Tofu scramble (vegan, with vegetables)','Скрэмбл из тофу (веганский, с овощами)','Tofu-Rührei (vegan, mit Gemüse)','توفو مخفوق (نباتي، بالخضار)'],
  // Baklagil: kuru tartım
  ['nohut_kuru','baklagil',378,20.5,63,6,11,12.2,50,'','','','nohut kuru tartım çiğ pişmemiş sporcu meal prep','Nohut (kuru tartım)','Chickpeas (dry weight)','Нут (вес в сухом виде)','Kichererbsen (Trockengewicht)','حمص (الوزن جافاً)'],
  ['mercimek_kuru','baklagil',358,24,63,2.2,2,11,50,'','','','kırmızı mercimek kuru tartım çiğ pişmemiş','Kırmızı mercimek (kuru tartım)','Red lentils (dry weight)','Красная чечевица (вес в сухом виде)','Rote Linsen (Trockengewicht)','عدس أحمر (الوزن جافاً)'],
  ['kfasulye_kuru','baklagil',333,23,60,0.9,2.2,15,50,'','','','kuru fasulye kuru tartım çiğ pişmemiş','Kuru fasulye (kuru tartım)','White beans (dry weight)','Белая фасоль (вес в сухом виде)','Weiße Bohnen (Trockengewicht)','فاصولياء بيضاء (الوزن جافة)'],
  // Ana yemek
  ['oturtma','anayemek',110,5.5,6,7,3.5,2.5,250,'','my','','patlıcan oturtma kıymalı patlıcan fırın','Patlıcan oturtma','Eggplant oturtma (with minced meat)','Отуртма (баклажаны с фаршем)','Auberginen-Oturtma (mit Hackfleisch)','أوتورتما الباذنجان (باللحم المفروم)'],
  ['patates_yemegi','anayemek',90,1.8,13,3.5,2,1.8,250,'','','','patates yemeği etsiz salçalı sulu','Patates yemeği (etsiz, salçalı)','Potato stew (meatless, with tomato paste)','Тушёный картофель (без мяса, с томатной пастой)','Kartoffeleintopf (ohne Fleisch, mit Tomatenmark)','يخنة البطاطس (بدون لحم، بمعجون الطماطم)'],
  ['tavuk_bezelye','anayemek',95,8,8,3.5,3,3,250,'','c','','tavuklu bezelye yemeği piliç havuçlu','Tavuklu bezelye','Peas with chicken','Горошек с курицей','Erbsen mit Hähnchen','بازلاء بالدجاج'],
  ['tavuk_nohut','anayemek',125,10,12,4,2,4,250,'','c','','tavuklu nohut yemeği piliç','Tavuklu nohut','Chickpeas with chicken','Нут с курицей','Kichererbsen mit Hähnchen','حمص بالدجاج'],
  // Pilav, makarna & patates
  ['sehriyeli_bulgur','pilav',130,3.8,22,3,0.4,4,150,'','','servis:50','şehriyeli bulgur pilavı','Şehriyeli bulgur pilavı','Bulgur pilaf with vermicelli','Булгур с вермишелью','Bulgur-Pilaw mit Fadennudeln','برغل بالشعيرية'],
  ['bezelyeli_pilav','pilav',150,3.5,26,3.5,1,1.5,150,'','','servis:50','bezelyeli pirinç pilavı','Bezelyeli pirinç pilavı','Rice pilaf with peas','Рисовый плов с горошком','Reis-Pilaw mit Erbsen','أرز بالبازلاء'],
  ['tavuklu_bulgur','pilav',145,8,18,4,0.8,3.5,250,'','c','','tavuklu bulgur pilavı piliç','Tavuklu bulgur pilavı','Bulgur pilaf with chicken','Булгур с курицей','Bulgur-Pilaw mit Hähnchen','برغل بالدجاج'],
  ['kinoa_pilav','pilav',125,4.2,19,3.5,1,2.8,150,'','','','sebzeli kinoa pilavı','Sebzeli kinoa pilavı','Quinoa pilaf with vegetables','Киноа с овощами','Quinoa-Pilaw mit Gemüse','كينوا بالخضار'],
  ['kremali_makarna','pilav',180,5.5,22,8,1.5,1.2,250,'','dy','','kremalı mantarlı makarna krema','Kremalı mantarlı makarna','Creamy mushroom pasta','Паста со сливочно-грибным соусом','Nudeln mit Pilz-Sahne-Soße','معكرونة بالكريمة والفطر'],
  ['tereyagli_makarna','pilav',180,5.5,30,4.5,0.6,1.8,200,'','y','','tereyağlı makarna sade makarna spagetti','Tereyağlı makarna','Buttered pasta','Макароны со сливочным маслом','Nudeln mit Butter','معكرونة بالزبدة'],
  ['patates_baharatli','pilav',115,2,18,4,0.8,2.2,150,'','','','fırın baharatlı patates elma dilim zeytinyağlı','Fırın baharatlı patates (elma dilim)','Oven-roasted spiced potato wedges','Запечённые картофельные дольки со специями','Ofenkartoffelspalten (gewürzt)','بطاطس مشوية بالفرن متبلة'],
  // Çorbalar
  ['tavuk_sebze_corba','corba',42,3.5,4.5,1.2,1.5,1,250,'','c','kepce:125','tavuklu sebze çorbası piliç havuç patates','Tavuklu sebze çorbası','Chicken & vegetable soup','Куриный суп с овощами','Hühnersuppe mit Gemüse','شوربة الدجاج بالخضار'],
  ['terbiyeli_tavuk_corba','corba',55,4,5,2,0.5,0.3,250,'','ce','kepce:125','terbiyeli tavuk çorbası limonlu yumurtalı ekşili','Terbiyeli tavuk çorbası','Chicken soup with egg-lemon sauce','Куриный суп с яично-лимонной заправкой','Hühnersuppe mit Ei-Zitronen-Legierung','شوربة الدجاج بصلصة البيض والليمون'],
  ['kereviz_corba','corba',42,1.2,5,2,2,1.5,250,'','d','kepce:125','kereviz çorbası sebze çorbası','Kereviz çorbası','Celeriac soup','Суп из сельдерея','Selleriesuppe','شوربة الكرفس'],
  ['bezelye_corba','corba',55,3,7.5,1.5,2.5,2.2,250,'','','kepce:125','bezelye çorbası sebze çorbası','Bezelye çorbası','Pea soup','Суп из зелёного горошка','Erbsensuppe','شوربة البازلاء'],
  // Salata
  ['semizotu_salata','salata',55,1.8,3.5,4,1,1,150,'','','','semizotu salatası zeytinyağlı limonlu','Semizotu salatası (zeytinyağlı)','Purslane salad (with olive oil)','Салат из портулака (с оливковым маслом)','Portulaksalat (mit Olivenöl)','سلطة البقلة (بزيت الزيتون)'],
  ['domates_salata','salata',48,0.9,4.5,3,2.8,1.2,150,'','','','soğanlı domates salatası zeytinyağlı','Soğanlı domates salatası','Tomato & onion salad','Салат из помидоров с луком','Tomaten-Zwiebel-Salat','سلطة الطماطم والبصل'],
  ['meksika_salata','salata',100,4,14,3.5,3,4,150,'','','','mısırlı fasulyeli salata meksika salatası kırmızı fasulye','Mısırlı fasulyeli salata (Meksika usulü)','Mexican salad (corn & kidney beans)','Мексиканский салат (кукуруза и фасоль)','Mexikanischer Salat (Mais & Kidneybohnen)','سلطة مكسيكية (ذرة وفاصولياء حمراء)'],
  // Sebze
  ['sebze_sote','sebze',55,1.5,6,3,3.5,2.2,200,'','','','karışık sebze sote kabak biber havuç tava','Karışık sebze sote','Sautéed mixed vegetables','Овощи соте (ассорти)','Gemischtes Pfannengemüse','خضار مشكلة سوتيه'],
  ['kabak_sote','sebze',45,1.3,3.5,3,2,1.1,200,'','','','kabak sote zeytinyağlı sarımsaklı','Kabak sote','Sautéed zucchini','Кабачки соте','Zucchini aus der Pfanne','كوسا سوتيه'],
  ['havuc_hasl','sebze',35,0.8,8.2,0.2,3.5,3,100,'','','','havuç haşlama garnitür','Havuç (haşlama)','Carrots (boiled)','Морковь (отварная)','Karotten (gekocht)','جزر (مسلوق)'],
  ['garnitur','sebze',55,3,10,0.4,4,3.5,100,'','','','garnitür bezelye havuç mısır haşlama','Garnitür (bezelye, havuç, mısır)','Mixed vegetable side (peas, carrots & corn)','Овощной гарнир (горошек, морковь, кукуруза)','Gemüsebeilage (Erbsen, Karotten & Mais)','طبق جانبي من الخضار (بازلاء وجزر وذرة)'],
  ['mantar_izgara','sebze',28,3.1,3.3,0.5,1.7,1,150,'','','','mantar ızgara közde','Mantar (ızgara)','Mushrooms (grilled)','Грибы (гриль)','Champignons (gegrillt)','فطر (مشوي)'],
  ['pazi_hasl','sebze',22,1.9,4.1,0.1,1.1,2.1,150,'','','','pazı haşlama yeşil yapraklı sebze','Pazı (haşlama)','Swiss chard (boiled)','Мангольд (отварной)','Mangold (gekocht)','سلق (مسلوق)'],
  ['semizotu_cig','sebze',23,2,3.4,0.4,1,1,100,'','','','semizotu çiğ yeşillik','Semizotu (çiğ)','Purslane (raw)','Портулак (сырой)','Portulak (roh)','بقلة (نيئة)'],
  // Hazır & sandviç
  ['konserve_sarma','hazir',150,2.5,20,7,2,2,100,'','','','yaprak sarma konserve zeytinyağlı hazır','Zeytinyağlı yaprak sarma (konserve)','Stuffed vine leaves in olive oil (canned)','Долма в виноградных листьях (консервы)','Gefüllte Weinblätter in Olivenöl (Konserve)','ورق عنب محشي بزيت الزيتون (معلب)'],
  ['mikrodalga_misir','hazir',480,8,55,25,1,9,30,'','ty','','mikrodalga patlamış mısır tereyağlı paket','Mikrodalga patlamış mısır (tereyağlı)','Microwave popcorn (butter flavour)','Попкорн для микроволновки (со сливочным вкусом)','Mikrowellen-Popcorn (Butter)','فشار الميكروويف (بنكهة الزبدة)'],
  ['beyazp_tost','sandvic',188,12.3,20.1,6.6,2.8,2.9,1,'adet:110','dt','','beyaz peynirli tost tam buğday peynirli tost kahvaltı','Beyaz peynirli tost (tam buğday)','White cheese toastie (whole-wheat)','Тост с белым сыром (цельнозерновой)','Weißkäse-Toast (Vollkorn)','توست بالجبنة البيضاء (قمح كامل)'],
  ['sucuk_ekmek','sandvic',285,10.4,27.5,14.6,3.2,1.7,1,'adet:190','mty','','sucuk ekmek yarım ekmek arası sokak','Sucuk ekmek (yarım ekmek)','Grilled sucuk in bread (half loaf)','Суджук в хлебе (полбатона)','Sucuk im Brot (halbes Brot)','سجق تركي في الخبز (نصف رغيف)'],
  // Kuruyemiş
  ['antep_tuzlu','kuruyemis',570,20,28,45,7.7,10,30,'','t','','antep fıstığı kavrulmuş tuzlu çerez','Antep fıstığı (kavrulmuş, tuzlu)','Pistachios (roasted, salted)','Фисташки (жареные, солёные)','Pistazien (geröstet, gesalzen)','فستق حلبي (محمص ومملح)'],
  ['kaju_tuzlu','kuruyemis',580,15,33,46,5,3,30,'','t','','kaju kavrulmuş tuzlu çerez','Kaju (kavrulmuş, tuzlu)','Cashews (roasted, salted)','Кешью (жареный, солёный)','Cashewkerne (geröstet, gesalzen)','كاجو (محمص ومملح)'],
  // Meyve
  ['pitaya','meyve',60,1.2,13,0.4,8,3,150,'','','','ejder meyvesi pitaya egzotik meyve','Ejder meyvesi (pitaya)','Dragon fruit (pitaya)','Питахайя (драконий фрукт)','Drachenfrucht (Pitaya)','فاكهة التنين (بيتايا)'],
  ['papaya','meyve',43,0.5,11,0.3,7.8,1.7,150,'','','','papaya egzotik meyve','Papaya','Papaya','Папайя','Papaya','بابايا'],
  ['lici','meyve',66,0.8,16.5,0.4,15.2,1.3,100,'','','','liçi egzotik meyve','Liçi','Lychee','Личи','Litschi','ليتشي'],
  ['musmula','meyve',47,0.5,10.6,0.2,8,5,4,'adet:25','','','muşmula döngel kış meyvesi','Muşmula','Medlar','Мушмула','Mispel','زعرور (مشملة)'],
  ['goji','meyve',349,14.3,77,0.4,46,13,15,'','','yk:10','goji meyvesi kuru goji berry kurutulmuş','Goji meyvesi (kuru)','Goji berries (dried)','Ягоды годжи (сушёные)','Goji-Beeren (getrocknet)','توت الغوجي (مجفف)']
);
Object.assign(ALERJEN_EK, {
  protein_yogurt_cilek:'sut,cilek,tatlandirici', protein_yogurt_seftali:'sut,tatlandirici', protein_yogurt_orman:'sut,cilek,tatlandirici',
  cilekli_yogurt:'sut,cilek', seftalili_yogurt:'sut', orman_meyveli_yogurt:'sut,cilek', yogurt_cilek_ev:'sut,cilek', suzme_meyve:'sut',
  keci_yogurdu:'sut', koyun_yogurdu:'sut', laktozsuz_yogurt:'sut', kaymakli_yogurt:'sut',
  yayik_ayran:'sut', protein_ayran:'sut', muzlu_sut:'sut,muz', cilekli_sut:'sut,cilek,gida_boyasi', sut_muz_ev:'sut,muz', balli_sut:'sut,bal', zerdecalli_sut:'sut,tarcin', kakao_sut:'sut,kakao',
  lor_yagsiz:'sut', lor_dereotu:'sut,zeytin', krem_peynir_tam:'sut', civil:'sut', mavi_peynir:'sut,histamin', gouda:'sut,histamin', ricotta:'sut', mini_peynir:'sut', eritme_peynir:'sut',
  protein_puding_vanilya:'sut,tatlandirici', protein_sut_kakao:'sut,kakao,tatlandirici', protein_gofret:'sut,gluten,bugday,soya,kakao,tatlandirici', probar_sekersiz:'sut,soya,kakao,tatlandirici',
  mug_cake:'sut,yumurta,gluten,yulaf,kakao',
  kayisi_badem:'kayisi,sulfit,kuruyemis,badem', leblebi_uzum:'nohut,uzum,sulfit', findik_uzum:'kuruyemis,findik,uzum,sulfit', trail_mix:'kuruyemis,badem,findik,ceviz,kaju,uzum,kayisi,sulfit',
  cerez_karisik:'nohut,yerfistigi,kabak_cekirdegi,aycekirdegi', sekerli_leblebi:'nohut,gida_boyasi', hurma_fistik:'hurma,yerfistigi', muz_fistik:'muz,yerfistigi', elma_ceviz:'elma,kuruyemis,ceviz',
  peynir_ceviz:'sut,kuruyemis,ceviz', lor_meyve:'sut', patlak_labne:'pirinc,sut', ton_kraker:'balik,gluten,bugday,histamin,nikel', simit_peynir:'gluten,bugday,susam,uzum,sut',
  granola_kase:'sut,gluten,yulaf,kuruyemis', acai_kase:'muz,gluten,yulaf',
  musli_bar:'gluten,yulaf,kuruyemis', kuruyemis_bar:'kuruyemis,badem,findik,bal', yulaf_kraker:'gluten,yulaf,bugday', kraker_tuzlu:'gluten,bugday', biskuvi_sekersiz:'gluten,bugday,yulaf,tatlandirici',
  yulaf_biskuvi:'gluten,yulaf,bugday', kremali_biskuvi:'gluten,bugday,sut,kakao', cikolatali_biskuvi:'gluten,bugday,sut,kakao,soya', incirli_biskuvi:'gluten,bugday,incir', bebe_biskuvi:'gluten,bugday,sut',
  muz_yulaf_kurabiye:'muz,gluten,yulaf', fit_kek:'gluten,yulaf,muz,yumurta,sut', bitter85:'kakao,sut,kafein', bitter55:'kakao,sut,kafein', muz_cipsi:'muz', light_cips:'patates', jelibon:'gida_boyasi',
  vanilya_puding:'sut', light_muhallebi:'sut,tatlandirici', frozen_yogurt:'sut', nice_cream:'muz,sut', kemalpasa:'gluten,bugday,sut,yumurta', kalburabasti:'gluten,bugday,kuruyemis,ceviz,sut,yumurta',
  sutlu_nuriye:'gluten,bugday,sut,kuruyemis,findik', ekler:'gluten,bugday,sut,yumurta,kakao', mozaik_pasta:'gluten,bugday,sut,kakao,yumurta', havuclu_kek:'gluten,bugday,yumurta,havuc,kuruyemis,ceviz,tarcin',
  elmali_kek:'gluten,bugday,yumurta,elma,tarcin,sut', islak_kek:'gluten,bugday,yumurta,sut,kakao', cikolatali_muffin:'gluten,bugday,yumurta,sut,kakao', donut:'gluten,bugday,sut,yumurta,soya',
  cevizli_kurabiye:'gluten,bugday,kuruyemis,ceviz,sut,yumurta', tahinli_kurabiye:'gluten,bugday,susam', kakaolu_kurabiye:'gluten,bugday,kakao,sut,yumurta', elmali_kurabiye:'gluten,bugday,elma,tarcin,sut,yumurta',
  acibadem:'kuruyemis,badem,yumurta', hosaf:'kayisi,uzum,sulfit',
  cevizli_corek:'gluten,bugday,kuruyemis,ceviz,sut,yumurta', paskalya_coregi:'gluten,bugday,sut,yumurta', kiymali_pogaca:'gluten,bugday,kirmizi,sut,yumurta,sogan', yulafli_pogaca:'gluten,yulaf,bugday,sut,yumurta',
  peynirli_acma:'gluten,bugday,sut,yumurta', zeytinli_acma:'gluten,bugday,sut,yumurta,zeytin', cikolatali_kruvasan:'gluten,bugday,sut,yumurta,kakao,soya', gul_boregi:'gluten,bugday,sut,yumurta',
  tarcinli_rulo:'gluten,bugday,sut,yumurta,tarcin', cavdar_simit:'gluten,bugday,cavdar,susam,uzum',
  cok_tahilli:'gluten,bugday,cavdar,yulaf,keten,susam', tandir_ekmek:'gluten,bugday', cevizli_ekmek:'gluten,bugday,kuruyemis,ceviz', zeytinli_ekmek:'gluten,bugday,zeytin', kepekli_gevrek:'gluten,bugday,arpa',
  galeta_sade:'gluten,bugday',
  su_kefiri:'', kefir_smoothie:'sut,muz,gluten,yulaf', yulaf_smoothie:'sut,muz,gluten,yulaf', hazir_soguk_kahve:'kafein,sut', sutlu_turk_kahvesi:'kafein,sut', frappe:'kafein,sut', visne_nektari:'', zencefil_cayi:'narenciye',
  dana_jambon:'kirmizi,histamin', tavuk_sucuk:'tavuk,sarimsak,kimyon,biber,histamin', kiyma_orta:'kirmizi', tavuk_but_hasl:'tavuk',
  istavrit_izgara:'balik', cipura_firin:'balik', somon_bug:'balik', karides_sote:'kabuklu,sut,sarimsak', panga_firin:'balik',
  kabakli_yumurta:'yumurta,kabak', avokado_yumurta:'yumurta,avokado', tofu_scramble:'soya,biber,sogan',
  nohut_kuru:'nohut', mercimek_kuru:'mercimek', kfasulye_kuru:'fasulye',
  oturtma:'patlican,kirmizi,domates,biber,sogan', patates_yemegi:'patates,domates,sogan,biber', tavuk_bezelye:'tavuk,bezelye,havuc,patates,sogan,domates', tavuk_nohut:'tavuk,nohut,sogan,domates',
  sehriyeli_bulgur:'gluten,bugday', bezelyeli_pilav:'pirinc,bezelye', tavuklu_bulgur:'tavuk,gluten,bugday,domates', kinoa_pilav:'havuc,bezelye,sogan,zeytin', kremali_makarna:'gluten,bugday,sut,mantar',
  tereyagli_makarna:'gluten,bugday,sut', patates_baharatli:'patates,zeytin,biber',
  tavuk_sebze_corba:'tavuk,havuc,patates,kabak,sogan', terbiyeli_tavuk_corba:'tavuk,yumurta,narenciye,gluten,bugday,pirinc', kereviz_corba:'kereviz,sut,patates,sogan', bezelye_corba:'bezelye,patates,sogan',
  semizotu_salata:'domates,sogan,zeytin,narenciye', domates_salata:'domates,sogan,zeytin', meksika_salata:'misir,fasulye,biber,domates,sogan,zeytin',
  sebze_sote:'kabak,biber,havuc,sogan,zeytin', kabak_sote:'kabak,zeytin,sarimsak', havuc_hasl:'havuc', garnitur:'bezelye,havuc,misir', mantar_izgara:'mantar', pazi_hasl:'', semizotu_cig:'',
  konserve_sarma:'pirinc,uzum,sogan,zeytin,nane', mikrodalga_misir:'misir,sut', beyazp_tost:'gluten,bugday,sut,domates', sucuk_ekmek:'kirmizi,gluten,bugday,sarimsak,kimyon,biber,domates,histamin',
  antep_tuzlu:'kuruyemis,antepfistigi', kaju_tuzlu:'kuruyemis,kaju',
  pitaya:'', papaya:'', lici:'', musmula:'', goji:'sulfit'
});
// Kategori düzeltmeleri (yanlış grupta duranlar): dünya mutfağı yemekleri "Ana Yemek"ten Dünya Mutfağı'na, meyveli yoğurt süt ürünlerine, fava mezelere
Object.assign(KAT_DEGIS, {sushi:'dunya', chili:'dunya', lazanya:'dunya', risotto:'dunya', nohut_kori:'dunya', tavuk_fajita:'dunya', tavuk_teriyaki:'dunya', meyveli_yogurt:'sut', fava:'salata'});
// Otomatik planda kullanılmaz: şekerli meyveli yoğurt/aromalı süt, işlenmiş peynir/şarküteri, tuzlu çerez, bisküvi-cips-şekerleme, pastane tatlıları, kremalı makarna, hazır kalemler ve kuru tartım
DOKTOR_DISI_EK.push('cilekli_yogurt','seftalili_yogurt','orman_meyveli_yogurt','muzlu_sut','cilekli_sut','balli_sut','eritme_peynir','protein_gofret',
  'cerez_karisik','sekerli_leblebi','bitter55','muz_cipsi','light_cips','jelibon','kraker_tuzlu','yulaf_biskuvi','kremali_biskuvi','cikolatali_biskuvi','incirli_biskuvi','bebe_biskuvi',
  'vanilya_puding','frozen_yogurt','kemalpasa','kalburabasti','sutlu_nuriye','ekler','mozaik_pasta','havuclu_kek','elmali_kek','islak_kek','cikolatali_muffin','donut',
  'cevizli_kurabiye','tahinli_kurabiye','kakaolu_kurabiye','elmali_kurabiye','acibadem','hosaf','cevizli_corek','paskalya_coregi','cikolatali_kruvasan','tarcinli_rulo',
  'hazir_soguk_kahve','frappe','visne_nektari','dana_jambon','tavuk_sucuk','nohut_kuru','mercimek_kuru','kfasulye_kuru','kremali_makarna','konserve_sarma','mikrodalga_misir','sucuk_ekmek',
  'antep_tuzlu','kaju_tuzlu');
// Hamilelikte önerilmeyenler: küflü peynir, çiğ sütten yapılabilen geleneksel peynir, şarküteri (listeria), konserve ton
HAMILE_DISI_EK.push('mavi_peynir','civil','dana_jambon','ton_kraker');
POPULER.push('cevizli_corek','protein_yogurt_cilek','cilekli_yogurt','yayik_ayran','muzlu_sut','balli_sut','peynir_ceviz','simit_peynir','leblebi_uzum','trail_mix','cerez_karisik',
  'peynirli_acma','kiymali_pogaca','cikolatali_kruvasan','gul_boregi','cevizli_kurabiye','havuclu_kek','islak_kek','mozaik_pasta','kemalpasa','beyazp_tost','sutlu_turk_kahvesi',
  'tavuk_nohut','oturtma','patates_yemegi','sehriyeli_bulgur','bezelyeli_pilav','terbiyeli_tavuk_corba','domates_salata','sebze_sote','cipura_firin','istavrit_izgara','dana_jambon','bitter85');
OGUN_ONERI.kahvalti.push('lor_yagsiz','lor_dereotu','civil','mini_peynir','cok_tahilli','tandir_ekmek','cevizli_ekmek','zeytinli_ekmek','cavdar_simit','yulafli_pogaca','kabakli_yumurta',
  'avokado_yumurta','tofu_scramble','beyazp_tost');
OGUN_ONERI.ara0.push('protein_yogurt_cilek','protein_yogurt_seftali','protein_yogurt_orman','yogurt_cilek_ev','suzme_meyve','granola_kase','lor_meyve','kayisi_badem','leblebi_uzum','findik_uzum',
  'hurma_fistik','muz_fistik','elma_ceviz','peynir_ceviz','patlak_labne','ton_kraker','yulaf_kraker','biskuvi_sekersiz','muz_yulaf_kurabiye','kefir_smoothie','yulaf_smoothie','sut_muz_ev',
  'protein_ayran','papaya','pitaya','musmula','lici');
OGUN_ONERI.ogle.push('tavuk_nohut','tavuk_bezelye','oturtma','patates_yemegi','tavuklu_bulgur','kinoa_pilav','sehriyeli_bulgur','bezelyeli_pilav','tavuk_sebze_corba','terbiyeli_tavuk_corba',
  'kereviz_corba','bezelye_corba','semizotu_salata','domates_salata','meksika_salata','cipura_firin','panga_firin','istavrit_izgara');
OGUN_ONERI.ara1.push('protein_yogurt_cilek','protein_yogurt_seftali','protein_yogurt_orman','yogurt_cilek_ev','suzme_meyve','lor_meyve','trail_mix','kuruyemis_bar','musli_bar','hurma_fistik',
  'muz_fistik','elma_ceviz','peynir_ceviz','patlak_labne','ton_kraker','yulaf_kraker','biskuvi_sekersiz','fit_kek','muz_yulaf_kurabiye','bitter85','kefir_smoothie','yulaf_smoothie','protein_ayran',
  'protein_sut_kakao','probar_sekersiz','mug_cake','protein_puding_vanilya','light_muhallebi','nice_cream','papaya','pitaya','lici','musmula');
OGUN_ONERI.aksam.push('cipura_firin','somon_bug','panga_firin','istavrit_izgara','karides_sote','tavuk_but_hasl','tavuk_bezelye','tavuk_nohut','oturtma','sebze_sote','kabak_sote','havuc_hasl',
  'garnitur','mantar_izgara','pazi_hasl','semizotu_salata','domates_salata','patates_baharatli','kinoa_pilav','kereviz_corba','bezelye_corba','tavuk_sebze_corba','terbiyeli_tavuk_corba');
OGUN_ONERI.gece.push('zerdecalli_sut','kakao_sut','laktozsuz_yogurt','keci_yogurdu','yogurt_cilek_ev','protein_puding_vanilya','light_muhallebi','zencefil_cayi','protein_yogurt_orman');
// Entegrasyon notu (bu dosya p4i.js ile p4.js arasına girer; aşağıdaki kümeler sonraki parçalarda tanımlı olduğundan buradan değiştirilemez):
// - p5.js SIVI kümesine eklenmeli (içecek yalnız içecekle değişsin, porsiyon ml olarak ölçeklensin): SIVI_EK2.forEach(id => SIVI.add(id));
// - p4b.js LAKTOZ_DUSUK kümesine eklenmeli (laktozsuz yoğurt, olgun/yarı sert peynir): LAKTOZ_DUSUK_EK2.forEach(id => LAKTOZ_DUSUK.add(id));
const SIVI_EK2 = ['yayik_ayran','protein_ayran','muzlu_sut','cilekli_sut','sut_muz_ev','balli_sut','zerdecalli_sut','kakao_sut','protein_sut_kakao','su_kefiri','kefir_smoothie','yulaf_smoothie',
  'hazir_soguk_kahve','sutlu_turk_kahvesi','frappe','visne_nektari','zencefil_cayi'];
const LAKTOZ_DUSUK_EK2 = ['laktozsuz_yogurt','gouda','mavi_peynir','mini_peynir'];

// Yeni ara öğün seçenekleri "Önerilenler"de görünsün (02.11): liste yalnız ilk 45 öneriyi gösteriyor, sona eklenenler hiç
// görünmüyordu. İlk 6 eski önerinin ardından yeni ve eski seçenekler sırayla dizilir; kalan eski öneriler sonra gelir.
function oneriOneAl(ogun, ids){
  const l = OGUN_ONERI[ogun]; if (!l) return;
  const kalan = l.filter(id => !ids.includes(id)), sonuc = kalan.slice(0, 6), son = kalan.slice(6);
  for (let i = 0; i < Math.max(ids.length, son.length); i++){ if (i < ids.length) sonuc.push(ids[i]); if (i < son.length) sonuc.push(son[i]); }
  l.splice(0, l.length, ...new Set(sonuc));
}
oneriOneAl('ara0', ['protein_yogurt_cilek', 'yogurt_cilek_ev', 'kayisi_badem', 'meyveli_yogurt', 'elma_ceviz', 'leblebi_uzum', 'protein_yogurt_orman', 'peynir_ceviz', 'findik_uzum', 'suzme_meyve', 'muz_fistik', 'kefir_smoothie', 'lor_meyve']);
oneriOneAl('ara1', ['protein_yogurt_cilek', 'kayisi_badem', 'meyveli_yogurt', 'trail_mix', 'elma_ceviz', 'protein_yogurt_orman', 'leblebi_uzum', 'hurma_fistik', 'yogurt_cilek_ev', 'peynir_ceviz', 'protein_ayran', 'muz_fistik', 'suzme_meyve', 'lor_meyve', 'kefir_smoothie']);
oneriOneAl('gece', ['zerdecalli_sut', 'laktozsuz_yogurt', 'yogurt_cilek_ev', 'protein_puding_vanilya']);
