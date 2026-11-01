// ---------- Ek yemekler 7: Ev yemekleri & esnaf lokantası, çorba, pilav/makarna, peynir çeşitleri, kahvaltılık, içecek, tatlı, sporcu (fit kase, çiğ/kuru tartım) ----------
// Sütunlar YEMEK_SATIR ile aynı (bkz. p4d.js). Değerler 100 g içindir (TÜRKOMP / USDA FoodData Central temelli, tarif ortalaması).
// Kızartma, işlenmiş, şekerli, sos/çeşni ve çiğ/kuru tartım kalemleri otomatik plana girmez (DOKTOR_DISI_EK); aramadan ve kategoriden eklenir.
YEMEK_EK.push(
  // Zeytinyağlılar
  ['zy_bamya','anayemek',75,1.8,7,4.5,2.5,3,200,'','','','bamya zeytinyağlı sebze yemeği etsiz','Zeytinyağlı bamya','Okra in olive oil','Бамия в оливковом масле','Okra in Olivenöl','بامية بزيت الزيتون'],
  ['zy_bezelye','anayemek',85,3.5,10,3.5,3.5,4,200,'','','','bezelye zeytinyağlı havuçlu patatesli etsiz','Zeytinyağlı bezelye','Peas in olive oil (with carrot & potato)','Горошек в оливковом масле (с морковью и картофелем)','Erbsen in Olivenöl (mit Karotte & Kartoffel)','بازلاء بزيت الزيتون (مع الجزر والبطاطس)'],
  ['zy_karnabahar','anayemek',60,1.8,5.5,3.5,2,2.2,200,'','','','karnabahar zeytinyağlı sebze yemeği etsiz','Zeytinyağlı karnabahar','Cauliflower in olive oil','Цветная капуста в оливковом масле','Blumenkohl in Olivenöl','قرنبيط بزيت الزيتون'],
  ['zy_turlu','anayemek',70,1.8,7.5,3.8,3.5,2.5,250,'','','','türlü zeytinyağlı etsiz sebze güveç patlıcan kabak fasulye','Zeytinyağlı türlü (etsiz)','Vegetable stew in olive oil (meatless türlü)','Овощное рагу в оливковом масле (без мяса)','Gemüseeintopf in Olivenöl (ohne Fleisch)','خضار مشكلة بزيت الزيتون (بدون لحم)'],
  // Etli sebze, kuru baklagil ve güveç yemekleri
  ['etli_pirasa','anayemek',95,5,8,4.8,2.5,1.5,250,'','m','','pırasa etli kıymalı yemek','Etli pırasa','Leeks with meat','Лук-порей с мясом','Lauch mit Fleisch','كراث باللحم'],
  ['patates_musakka','anayemek',125,6,11,6.3,2,1.5,250,'','m','','patates musakka oturtma kıymalı fırın','Patates musakka','Potato moussaka (with minced meat)','Картофельная мусака с фаршем','Kartoffel-Moussaka mit Hackfleisch','مسقعة البطاطس باللحم المفروم'],
  ['kabak_musakka','anayemek',85,5.5,5,4.8,3,1.3,250,'','m','','kabak musakka kıymalı fırın','Kabak musakka','Zucchini moussaka (with minced meat)','Мусака из кабачков с фаршем','Zucchini-Moussaka mit Hackfleisch','مسقعة الكوسا باللحم المفروم'],
  ['elbasan_tava','anayemek',150,11,5,9.5,2.5,0.3,250,'','mdy','','elbasan tava kuzu yoğurtlu fırın','Elbasan tava','Elbasan tava (lamb baked with yogurt)','Эльбасан-тава (баранина, запечённая с йогуртом)','Elbasan Tava (Lamm mit Joghurt überbacken)','إلباسان طاوة (لحم ضأن بالزبادي في الفرن)'],
  ['kuzu_kapama','anayemek',135,12,3.5,8,1.5,1,250,'','my','','kuzu kapama marul taze soğan bahar yemeği','Kuzu kapama','Lamb kapama (braised with lettuce & spring onion)','Ягнёнок капама (тушёный с салатом и зелёным луком)','Lamm-Kapama (mit Salat & Frühlingszwiebeln geschmort)','كابما لحم الضأن (مطهو مع الخس والبصل الأخضر)'],
  ['etli_barbunya','anayemek',120,7,13,4.3,2,4.5,250,'','m','','barbunya etli kuru baklagil yemek','Etli barbunya','Borlotti beans with meat','Фасоль борлотти с мясом','Borlotti-Bohnen mit Fleisch','فاصولياء حمراء مرقطة باللحم'],
  ['kuru_borulce','anayemek',115,6,15,3.5,2,5,250,'','','','kuru börülce yemeği zeytinyağlı baklagil etsiz','Kuru börülce yemeği (zeytinyağlı)','Black-eyed pea stew (in olive oil)','Рагу из фасоли вигна (в оливковом масле)','Augenbohnen-Eintopf (in Olivenöl)','لوبياء مجففة مطبوخة بزيت الزيتون'],
  ['mantar_guvec','anayemek',120,7,4,8.5,2,1.2,200,'','dy','','mantar güveç kaşarlı kiremitte fırın','Kaşarlı mantar güveç','Baked mushrooms with kashar cheese (clay pot)','Грибы, запечённые с сыром кашар (в горшочке)','Champignons mit Kaşar-Käse überbacken (Tontopf)','فطر بالجبن القشقوان في الفخار'],
  ['hindi_sote','anayemek',120,17,4,4,2.5,1.2,250,'','c','','hindi sote sebzeli tava','Hindi sote (sebzeli)','Turkey sauté with vegetables','Индейка соте с овощами','Puten-Sauté mit Gemüse','ديك رومي سوتيه بالخضار'],
  ['pilavustu_doner','anayemek',175,11,18,6.5,0.5,0.5,300,'','c','','pilav üstü tavuk döner pilavüstü','Pilav üstü tavuk döner','Chicken döner over rice','Куриный донер на рисе','Hähnchen-Döner auf Reis','شاورما دجاج على الأرز'],
  ['mucver_tava','anayemek',210,7,13,14.5,2,1.5,4,'adet:50','ed','','mücver kabak tava kızartma','Mücver (tava)','Zucchini fritters (pan-fried)','Кабачковые оладьи (жареные)','Zucchinipuffer (gebraten)','عجة الكوسا (مقلية)'],
  // Dolma & sarma
  ['domates_dolma','anayemek',100,5,10,4.3,3,1.2,2,'adet:120','m','','domates dolması etli kıymalı pirinçli','Domates dolması (etli)','Stuffed tomatoes with meat','Фаршированные помидоры с мясом','Gefüllte Tomaten mit Fleisch','طماطم محشية باللحم'],
  ['karalahana_sarma','anayemek',110,5.5,11,4.8,1.5,2.5,6,'adet:35','m','','kara lahana sarması karalahana dolması karadeniz etli','Kara lahana sarması (etli)','Stuffed collard greens (with meat)','Голубцы из листовой капусты с мясом','Gefüllter Schwarzkohl (mit Fleisch)','ملفوف أسود محشي باللحم'],
  ['sogan_dolma','anayemek',125,5,13,6,4,1.5,5,'adet:40','m','','soğan dolması etli antep nar ekşili','Soğan dolması (etli)','Stuffed onions with meat','Фаршированный лук с мясом','Gefüllte Zwiebeln mit Fleisch','بصل محشي باللحم'],
  // Fit kaseler (sporcu öğünü, meal prep)
  ['hindi_kinoa_kase','anayemek',103,11.8,7.9,2.4,1.4,1.6,350,'','c','','fit kase hindi kinoa sebze sporcu meal prep bowl','Fit kase: hindi + kinoa + sebze','Fit bowl: turkey, quinoa & veg','Фит-боул: индейка, киноа, овощи','Fit-Bowl: Pute, Quinoa & Gemüse','وعاء رياضي: ديك رومي وكينوا وخضار'],
  ['biftek_kase','anayemek',129,10.8,11.3,4.2,0.8,0.8,350,'','m','','fit kase dana bonfile biftek pirinç sebze sporcu meal prep bowl','Fit kase: dana bonfile + pirinç + sebze','Fit bowl: beef, rice & veg','Фит-боул: говядина, рис, овощи','Fit-Bowl: Rind, Reis & Gemüse','وعاء رياضي: لحم بقري وأرز وخضار'],
  ['tavuk_tpatates_kase','anayemek',114,12.6,9.3,2.8,2.7,2.1,350,'','c','','fit kase tavuk tatlı patates brokoli sporcu meal prep bowl','Fit kase: tavuk + tatlı patates + brokoli','Fit bowl: chicken, sweet potato & broccoli','Фит-боул: курица, батат, брокколи','Fit-Bowl: Hähnchen, Süßkartoffel & Brokkoli','وعاء رياضي: دجاج وبطاطا حلوة وبروكلي'],
  ['tavuk_bulgur_kase','anayemek',113,12,10.6,2.4,1.2,2.3,350,'','cd','','fit kase tavuk bulgur nohut yoğurt sporcu meal prep bowl','Fit kase: tavuk + bulgur + nohut + yoğurt','Fit bowl: chicken, bulgur, chickpeas & yogurt','Фит-боул: курица, булгур, нут, йогурт','Fit-Bowl: Hähnchen, Bulgur, Kichererbsen & Joghurt','وعاء رياضي: دجاج وبرغل وحمص وزبادي'],
  ['ton_kase','anayemek',105,7.5,14.4,1.8,1.5,0.8,350,'','f','','fit kase ton balığı pirinç mısır sebze sporcu meal prep bowl','Fit kase: ton balığı + pirinç + sebze','Fit bowl: tuna, rice & veg','Фит-боул: тунец, рис, овощи','Fit-Bowl: Thunfisch, Reis & Gemüse','وعاء رياضي: تونة وأرز وخضار'],
  // Çorbalar
  ['beyran','corba',70,5.5,5,3.2,0.2,0.2,250,'','m','kepce:125','beyran çorbası antep kuzu etli pirinçli sarımsaklı','Beyran çorbası','Beyran soup (lamb & rice, Gaziantep)','Суп бейран (баранина с рисом)','Beyran-Suppe (Lamm mit Reis)','شوربة بيران (لحم ضأن وأرز)'],
  ['karnabahar_corba','corba',45,2,5,2,2.2,1.2,250,'','d','kepce:125','karnabahar çorbası sütlü kremalı','Karnabahar çorbası','Cauliflower soup','Суп из цветной капусты','Blumenkohlsuppe','شوربة القرنبيط'],
  ['patates_corba','corba',55,1.5,8,2,0.8,0.8,250,'','d','kepce:125','patates çorbası sütlü','Patates çorbası','Potato soup','Картофельный суп','Kartoffelsuppe','شوربة البطاطس'],
  ['balik_corba','corba',50,5,3.5,1.8,0.8,0.5,250,'','f','kepce:125','balık çorbası terbiyeli sebzeli','Balık çorbası','Fish soup','Рыбный суп','Fischsuppe','شوربة السمك'],
  ['tavuk_suyu','corba',15,2,0.5,0.5,0.2,0,250,'','c','kepce:125','tavuk suyu bulyon et suyu sade yağsız hasta','Tavuk suyu (sade)','Chicken broth (clear)','Куриный бульон','Hühnerbrühe (klar)','مرق الدجاج'],
  ['karalahana_corba','corba',55,2.5,7.5,1.8,1,2.5,250,'','','kepce:125','kara lahana çorbası karalahana karadeniz fasulyeli mısır unlu','Kara lahana çorbası','Collard greens soup (Black Sea style)','Суп из листовой капусты (черноморский)','Schwarzkohlsuppe (Schwarzmeer-Art)','شوربة الملفوف الأسود (على طريقة البحر الأسود)'],
  // Pilav, bulgur & makarna
  ['etli_pilav','pilav',175,8,22,6,0.2,0.4,250,'','m','servis:50','etli pilav kuşbaşılı pirinç pilavı et','Etli pilav (kuşbaşılı)','Rice pilaf with diced meat','Плов с мясом','Reis-Pilaw mit Fleischwürfeln','أرز مع قطع اللحم'],
  ['mercimekli_bulgur','pilav',130,5,22,2.8,0.8,5,150,'','','servis:50','mercimekli bulgur pilavı yeşil mercimek','Mercimekli bulgur pilavı','Bulgur pilaf with lentils','Булгур с чечевицей','Bulgur-Pilaw mit Linsen','برغل بالعدس'],
  ['arpa_sehriye','pilav',150,4.5,25,3.5,1.5,1.5,150,'','','servis:50','arpa şehriye pilavı orzo','Arpa şehriye pilavı','Orzo pilaf','Плов из пасты орзо','Orzo-Pilaw (Kritharaki)','أرز الشعيرية (لسان العصفور)'],
  ['bulgur_hasl','pilav',83,3.1,18.6,0.2,0.1,4.5,150,'','','servis:50','bulgur haşlama yağsız sade sporcu pilavlık','Bulgur (haşlama, yağsız)','Bulgur (boiled, no oil)','Булгур отварной (без масла)','Bulgur (gekocht, ohne Öl)','برغل مسلوق (بدون زيت)'],
  ['pirinc_hasl','pilav',130,2.7,28.2,0.3,0.1,0.4,150,'','','servis:50','pirinç haşlama yağsız beyaz pirinç sporcu baldo osmancık','Pirinç (haşlama, yağsız)','White rice (boiled, no oil)','Белый рис отварной (без масла)','Weißer Reis (gekocht, ohne Öl)','أرز أبيض مسلوق (بدون زيت)'],
  ['siyez_bulgur','pilav',125,4.5,21,2.5,0.3,4.5,150,'','','servis:50','siyez bulguru pilavı einkorn','Siyez bulguru pilavı','Einkorn bulgur pilaf (siyez)','Плов из булгура однозернянки (сиез)','Einkorn-Bulgur-Pilaw (Siyez)','برغل القمح الأحادي الحبة (سييز)'],
  ['yogurtlu_makarna','pilav',150,5.5,22,4.5,2,1.2,250,'','d','','yoğurtlu makarna sarımsaklı','Yoğurtlu makarna','Pasta with garlic yogurt','Макароны с чесночным йогуртом','Nudeln mit Knoblauchjoghurt','معكرونة بالزبادي والثوم'],
  ['peynirli_makarna','pilav',190,7.5,24,7,1,1.2,250,'','dy','','beyaz peynirli makarna tereyağlı','Beyaz peynirli makarna','Pasta with white cheese (Turkish style)','Макароны с белым сыром','Nudeln mit Weißkäse (türkische Art)','معكرونة بالجبن الأبيض'],
  ['sebzeli_makarna','pilav',125,4.5,20,3,2.5,3,250,'','','','sebzeli makarna kepekli tam buğday','Sebzeli makarna (kepekli)','Whole-wheat pasta with vegetables','Цельнозерновые макароны с овощами','Vollkornnudeln mit Gemüse','معكرونة قمح كامل بالخضار'],
  ['tpatates_hasl','pilav',76,1.4,17.7,0.1,5.7,2.5,150,'','','','tatlı patates haşlama sporcu','Tatlı patates (haşlama)','Sweet potato (boiled)','Батат отварной','Süßkartoffel (gekocht)','بطاطا حلوة مسلوقة'],
  // Et, şarküteri & çiğ tartım
  ['tavuk_iskender','et',185,13,15,8.5,2,1,300,'','cdy','','tavuk iskender kebap yoğurtlu pide domates soslu tereyağlı','Tavuk İskender','Chicken İskender','Искендер с курицей','Hähnchen-İskender','إسكندر بالدجاج'],
  ['kulbasti','et',175,29,0,6.5,0,0,150,'','m','','külbastı dana ızgara kırmızı et','Dana külbastı (ızgara)','Beef külbastı (grilled thin cutlet)','Кюльбасты (тонкий говяжий стейк на гриле)','Külbastı (dünnes Rinderschnitzel, gegrillt)','كولباستي (شريحة لحم بقري رقيقة مشوية)'],
  ['tavuk_fume','et',110,20,2,2.5,1,0,3,'dilim:15','ct','','tavuk füme göğüs dilim şarküteri kahvaltı','Tavuk göğsü füme','Smoked chicken breast (slices)','Копчёная куриная грудка (ломтики)','Geräucherte Hähnchenbrust (Scheiben)','صدر دجاج مدخن (شرائح)'],
  ['dana_fume','et',130,21,1.5,4.5,0.5,0,3,'dilim:15','mt','','dana füme et jambon dilim şarküteri kahvaltı','Dana füme (dilim)','Smoked beef (slices)','Копчёная говядина (ломтики)','Geräuchertes Rindfleisch (Scheiben)','لحم بقري مدخن (شرائح)'],
  ['tavuk_cig','et',120,22.5,0,2.6,0,0,150,'','c','','tavuk göğsü çiğ ağırlık tartım pişmemiş sporcu meal prep','Tavuk göğsü (çiğ tartım)','Chicken breast (raw weight)','Куриная грудка (вес в сыром виде)','Hähnchenbrust (Rohgewicht)','صدر دجاج (الوزن نيئاً)'],
  ['dana_kiyma_cig','et',176,20,0,10,0,0,125,'','m','','dana kıyma çiğ ağırlık tartım %10 yağlı pişmemiş sporcu','Dana kıyma (çiğ tartım, %10 yağlı)','Minced beef, 10% fat (raw weight)','Говяжий фарш, 10% жира (вес в сыром виде)','Rinderhack, 10 % Fett (Rohgewicht)','لحم بقري مفروم 10% دهون (الوزن نيئاً)'],
  // Balık
  ['kilic','balik',172,23.5,0,7.9,0,0,180,'','f','','kılıç balığı şiş ızgara deniz ürünü','Kılıç balığı (ızgara)','Swordfish (grilled)','Рыба-меч (гриль)','Schwertfisch (gegrillt)','سمك أبو سيف (مشوي)'],
  ['mezgit_tava','balik',210,16,8,12.5,0.3,0.3,200,'','f','','mezgit tava kızartma unlu balık','Mezgit (tava)','Whiting (pan-fried)','Мерланг (жареный)','Wittling (gebraten)','سمك البياض (مقلي)'],
  // Yumurta
  ['kiymali_yumurta','yumurta',200,15,2.5,14.5,1.5,0.5,150,'','em','','kıymalı yumurta tava kahvaltı','Kıymalı yumurta','Eggs with minced meat','Яичница с фаршем','Eier mit Hackfleisch','بيض باللحم المفروم'],
  ['lorlu_omlet','yumurta',150,13,2,10,1.8,0,150,'','ed','','lorlu omlet lor peynirli yumurta sporcu kahvaltı','Lorlu omlet','Omelette with lor (curd cheese)','Омлет с творожным сыром (лор)','Omelett mit Lor-Quarkkäse','عجة بالجبن القريش'],
  ['yulafli_omlet','yumurta',175,11.5,10,10,0.8,1.5,150,'','ed','','yulaflı omlet yumurta yulaf sporcu kahvaltı fit','Yulaflı omlet','Oat omelette','Омлет с овсяными хлопьями','Haferflocken-Omelett','عجة بالشوفان'],
  ['sade_omlet','yumurta',175,12,1,13.5,0.8,0,120,'','e','','sade omlet yumurta tava kahvaltı','Sade omlet','Plain omelette','Омлет без добавок','Einfaches Omelett','عجة سادة'],
  ['yumurta_iri','yumurta',155,13,1.1,11,1.1,0,2,'adet:60','e','','haşlanmış yumurta iri büyük boy l xl kahvaltı','Haşlanmış yumurta (iri boy)','Boiled egg (large)','Варёное яйцо (крупное)','Gekochtes Ei (groß)','بيض مسلوق (حجم كبير)'],
  ['yumurta_kucuk','yumurta',155,13,1.1,11,1.1,0,2,'adet:42','e','','haşlanmış yumurta küçük boy s kahvaltı','Haşlanmış yumurta (küçük boy)','Boiled egg (small)','Варёное яйцо (мелкое)','Gekochtes Ei (klein)','بيض مسلوق (حجم صغير)'],
  ['kayisi_yumurta','yumurta',155,13,1.1,11,1.1,0,2,'adet:50','e','','kayısı kıvamında yumurta orta haşlanmış kahvaltı','Kayısı kıvamında yumurta','Medium-boiled egg (jammy yolk)','Яйцо в мешочек','Wachsweiches Ei','بيض نصف مسلوق (صفار كريمي)'],
  ['sucuklu_menemen','yumurta',150,8,4,11.5,2.5,1,200,'','emty','','sucuklu menemen yumurta kahvaltı','Sucuklu menemen','Menemen with sucuk','Менемен с суджуком','Menemen mit Sucuk','منمن بالسجق'],
  ['kasarli_yumurta','yumurta',220,15,1.2,17.5,0.8,0,130,'','edy','','kaşarlı yumurta sahanda kahvaltı','Sahanda kaşarlı yumurta','Fried eggs with kashar cheese','Глазунья с сыром кашар','Spiegeleier mit Kaşar-Käse','بيض مقلي بالجبن القشقوان'],
  ['muz_yumurta_pankek','yumurta',125,6.8,13.7,5.4,7.5,1.5,200,'','e','','muzlu yumurtalı pankek iki malzemeli unsuz fit sporcu','Muzlu yumurtalı pankek (unsuz)','Banana-egg pancakes (flourless)','Банановые панкейки на яйцах (без муки)','Bananen-Ei-Pancakes (ohne Mehl)','بان كيك الموز والبيض (بدون دقيق)'],
  // Peynir çeşitleri, yoğurt, kefir & sütlü içecekler
  ['beyazp_light','sut',160,18,2,9,1.5,0,2,'dilim:30','dt','','beyaz peynir light az yağlı yarım yağlı kahvaltı diyet','Beyaz peynir (light)','White cheese (light)','Белый сыр (лайт)','Weißkäse (light)','جبنة بيضاء (لايت)'],
  ['koyun_peyniri','sut',290,16,1.5,24.5,1,0,2,'dilim:30','dty','','koyun peyniri beyaz peynir tam yağlı kahvaltı','Koyun peyniri (beyaz, tam yağlı)','Sheep milk white cheese (full-fat)','Белый сыр из овечьего молока','Weißkäse aus Schafsmilch (vollfett)','جبنة بيضاء من حليب الغنم'],
  ['eski_kasar','sut',390,28,1.5,30.5,0.5,0,1,'dilim:20','dty','','eski kaşar olgun peynir kahvaltı','Eski kaşar','Aged kashar cheese','Выдержанный сыр кашар','Gereifter Kaşar-Käse','جبنة قشقوان معتقة'],
  ['otlu_peynir','sut',280,18,2,22,1,0.3,30,'','dty','kibrit:30','otlu peynir van peyniri kahvaltı','Otlu peynir (Van)','Herbed cheese (otlu peynir, Van)','Сыр с травами (отлу пейнир, Ван)','Kräuterkäse (Otlu Peynir, Van)','جبنة بالأعشاب (أوتلو، وان)'],
  ['kars_gravyeri','sut',400,28,0.5,32,0.3,0,1,'dilim:20','dty','','kars gravyeri gravyer peyniri kahvaltı','Kars gravyeri','Kars gruyère','Карсский грюйер','Kars-Gruyère','جبنة غرويير قارص'],
  ['mihalic','sut',380,27,1,30,0.5,0,30,'','dty','kibrit:30','mihaliç peyniri kelle peyniri koyun kahvaltı','Mihaliç peyniri','Mihaliç cheese (hard sheep cheese)','Сыр михалич (твёрдый овечий)','Mihaliç-Käse (Hartkäse vom Schaf)','جبنة ميهاليتش (جبنة غنم صلبة)'],
  ['ucgen_peynir','sut',230,10,6,18.5,5,0,2,'adet:15','dty','','üçgen peynir sürülebilir eritme peynir çocuk kahvaltı','Üçgen peynir (sürülebilir)','Spreadable cheese triangle','Плавленый сыр (треугольник)','Schmelzkäse-Ecke','جبن مثلثات قابل للدهن'],
  ['labne_light','sut',130,7,5,9,4,0,30,'','d','yk:20','labne light az yağlı sürülebilir peynir kahvaltı','Labne (light)','Labneh (light)','Лабне (лайт)','Labneh (light)','لبنة (لايت)'],
  ['yunan_yogurdu_0','sut',59,10.2,3.6,0.4,3.2,0,150,'','d','','yunan yoğurdu yağsız greek yogurt sporcu protein','Yunan yoğurdu (yağsız, %0)','Greek yogurt (0% fat)','Греческий йогурт (0% жирности)','Griechischer Joghurt (0 % Fett)','زبادي يوناني (0% دسم)'],
  ['skyr_meyveli','sut',85,9,11,0.2,10,0.3,150,'','d','','skyr meyveli çilekli yoğurt protein','Skyr (meyveli)','Skyr (fruit)','Скир с фруктами','Skyr (Frucht)','سكير بالفواكه'],
  ['kefir_light','sut',38,3.5,4.5,0.5,4.5,0,250,'','d','bardak:250','kefir light yağsız içecek','Kefir (yağsız)','Kefir (fat-free)','Кефир обезжиренный','Kefir (fettfrei)','كفير خالي الدسم'],
  ['kefir_meyveli','sut',75,3,11,1.8,10,0.2,250,'','d','bardak:250','kefir meyveli çilekli şekerli içecek','Kefir (meyveli)','Fruit kefir','Фруктовый кефир','Frucht-Kefir','كفير بالفواكه'],
  ['kakaolu_sut','sut',80,3.2,11,2.5,10,0.5,200,'','d','bardak:200','kakaolu süt çikolatalı süt şekerli içecek','Kakaolu süt','Chocolate milk','Шоколадное молоко','Kakaomilch','حليب بالكاكاو'],
  // Kahvaltılık
  ['kahvaltilik_sos','kahvaltilik',80,1.8,9,4,6,2,30,'','t','yk:20','kahvaltılık sos domates biber ezmesi hazır sürülebilir','Kahvaltılık sos (domates-biber, hazır)','Breakfast sauce (tomato & pepper, ready-made)','Соус для завтрака (томатно-перечный, готовый)','Frühstückssoße (Tomate-Paprika, fertig)','صلصة الفطور (طماطم وفلفل، جاهزة)'],
  ['petek_bal','kahvaltilik',300,0.4,78,0.5,74,0,20,'','','yk:20','petek bal kahvaltı','Petek bal','Honeycomb','Сотовый мёд','Wabenhonig','عسل بالشمع'],
  ['serpme_kahvalti','kahvaltilik',230,10,20,12.5,7,2,450,'','edty','','serpme kahvaltı köy kahvaltısı tabağı restoran 1 kişilik','Serpme kahvaltı (1 kişilik, ortalama)','Turkish spread breakfast (1 person, average)','Турецкий завтрак-ассорти (на 1 человека, в среднем)','Türkisches Frühstück (Serpme, 1 Person, Durchschnitt)','فطور تركي مشكل (لشخص واحد، متوسط)'],
  // Hamur işi
  ['karisik_pide','hamur',265,12.5,28,11.5,2,1.5,3,'dilim:60','mdty','','karışık pide kıymalı kaşarlı sucuklu','Karışık pide (kıymalı-kaşarlı-sucuklu)','Mixed pide (minced meat, cheese & sucuk)','Пиде ассорти (фарш, сыр, суджук)','Gemischte Pide (Hackfleisch, Käse & Sucuk)','بيدا مشكلة (لحم مفروم وجبن وسجق)'],
  ['fit_lahmacun','hamur',190,13,24,4.5,2.5,4,1,'adet:120','m','','fit lahmacun lavaşta tam buğday yağsız kıyma ev yapımı diyet','Fit lahmacun (tam buğday lavaşta)','Fit lahmacun (on whole-wheat lavash, lean mince)','Фит-лахмаджун (на цельнозерновом лаваше)','Fit-Lahmacun (auf Vollkorn-Lavash, mageres Hack)','لحم بعجين صحي (على خبز لافاش قمح كامل)'],
  ['lavas_pizza','hamur',200,11,24,6.5,3,3.5,1,'adet:150','d','','lavaş pizza tam buğday sebzeli light kaşarlı fit diyet','Lavaş pizza (tam buğday, sebzeli)','Lavash pizza (whole-wheat, with veg & light cheese)','Пицца на лаваше (цельнозерновом, с овощами)','Lavash-Pizza (Vollkorn, mit Gemüse & Light-Käse)','بيتزا لافاش (قمح كامل بالخضار وجبن خفيف)'],
  ['icli_kofte_kizartma','hamur',260,9,24,14,1,3,2,'adet:60','my','','içli köfte kızartma bulgur kıyma','İçli köfte (kızartma)','Stuffed bulgur balls (fried)','Ичли кёфте (жареные)','Gefüllte Bulgurbällchen (frittiert)','كبة مقلية'],
  ['milfoy_borek','hamur',330,8,28,21,1.5,1,1,'adet:80','dy','','milföy böreği peynirli puf böreği','Milföy böreği (peynirli)','Puff pastry börek (with cheese)','Бёрек из слоёного теста (с сыром)','Blätterteig-Börek (mit Käse)','بوريك بعجينة الميلفوي (بالجبن)'],
  ['tam_simit','hamur',280,11,48,5,3,6.5,1,'adet:100','','','tam buğday simit kepekli simit susamlı','Tam buğday simit','Whole-wheat simit','Цельнозерновой симит','Vollkorn-Simit','سميت بالقمح الكامل'],
  // Sandviç & dürüm
  ['simit_tost','sandvic',310,13,40,11,3.5,2.5,1,'adet:140','dt','','simit tost kaşarlı simit','Kaşarlı simit tost','Toasted simit with kashar cheese','Симит-тост с сыром кашар','Simit-Toast mit Kaşar-Käse','توست سميت بالجبن القشقوان'],
  ['peynirli_durum','sandvic',210,10,25,7.5,2,3,1,'adet:150','dt','','peynirli dürüm lavaş beyaz peynir domates salatalık kahvaltı','Peynirli dürüm (tam buğday lavaş)','White cheese wrap (whole-wheat lavash)','Ролл с белым сыром (цельнозерновой лаваш)','Weißkäse-Wrap (Vollkorn-Lavash)','لفافة جبنة بيضاء (خبز لافاش قمح كامل)'],
  // Salata & meze
  ['deniz_borulcesi','salata',55,1.5,3.5,4,0.5,1.5,100,'','','','deniz börülcesi meze zeytinyağlı sarımsaklı','Deniz börülcesi (zeytinyağlı)','Samphire (in olive oil & garlic)','Солерос (в оливковом масле с чесноком)','Queller (in Olivenöl & Knoblauch)','السالكورنيا (بزيت الزيتون والثوم)'],
  ['tarama','salata',420,4,9,41,1,0.3,30,'','ft','yk:20','tarama meze balık yumurtası','Tarama','Taramasalata (fish roe dip)','Тарама (паштет из рыбной икры)','Taramas (Fischrogen-Creme)','تاراما (صلصة بطارخ السمك)'],
  ['yogurtlu_pancar','salata',70,3.5,7,3.2,5.5,1.2,150,'','d','','yoğurtlu pancar salatası meze','Yoğurtlu pancar salatası','Beetroot with yogurt (meze)','Свёкла с йогуртом (мезе)','Rote Bete mit Joghurt (Meze)','شمندر بالزبادي (مازة)'],
  // Sebze, kızartma & salça
  ['balkabagi','sebze',30,1,6.5,0.1,2.8,1.5,200,'','','','bal kabağı balkabağı fırın','Bal kabağı (fırın)','Pumpkin (baked)','Тыква (запечённая)','Kürbis (Ofen)','يقطين (بالفرن)'],
  ['kabak_kizartma','sebze',130,2.5,8,10,2.5,1.2,150,'','','','kabak kızartması yoğurtlu','Kabak kızartması','Fried zucchini','Жареные кабачки','Frittierte Zucchini','كوسا مقلية'],
  ['karnabahar_kizartma','sebze',150,4,9,11,2,2,150,'','e','','karnabahar kızartması yumurtalı unlu','Karnabahar kızartması','Fried cauliflower (battered)','Жареная цветная капуста в кляре','Frittierter Blumenkohl (im Teig)','قرنبيط مقلي (مغطس بالخليط)'],
  ['domates_salcasi','sebze',82,4.3,18.9,0.5,12.2,4.1,15,'','t','yk:15','domates salçası salça','Domates salçası','Tomato paste','Томатная паста','Tomatenmark','معجون الطماطم'],
  ['biber_salcasi','sebze',75,3,13,1,9,4,15,'','t','yk:15','biber salçası acı tatlı salça','Biber salçası','Red pepper paste','Перечная паста','Paprikamark','معجون الفلفل الأحمر'],
  ['lahana_tursusu','sebze',20,1,3.5,0.1,1.5,2.5,50,'','t','','lahana turşusu turşu','Lahana turşusu','Pickled cabbage','Квашеная капуста (по-турецки)','Eingelegter Weißkohl','مخلل الملفوف'],
  // Meyve & meyve ürünleri
  ['medjool','meyve',277,1.8,75,0.2,66,6.7,2,'adet:24','','','medjool hurma iri hurma','Medjool hurması','Medjool date','Финик меджул','Medjool-Dattel','تمر مجهول'],
  ['murdum','meyve',46,0.7,11.4,0.3,9.9,1.4,2,'adet:40','','','mürdüm eriği kırmızı erik mor erik','Mürdüm eriği','Red plum (mürdüm)','Слива (мюрдюм)','Pflaume (Mürdüm)','برقوق أحمر (موردوم)'],
  ['limon_suyu','meyve',22,0.4,6.9,0.2,2.5,0.3,15,'','','yk:15','limon suyu limon sos salata','Limon suyu','Lemon juice','Лимонный сок','Zitronensaft','عصير الليمون'],
  ['nar_eksisi','meyve',260,0.5,64,0.2,55,0.5,10,'','','yk:20','nar ekşisi sos salata','Nar ekşisi','Pomegranate molasses','Гранатовый соус (наршараб)','Granatapfelsirup','دبس الرمان'],
  // İçecekler: çay, kahve, taze sıkma
  ['cay_sekerli','icecek',20,0,5.3,0,5,0,2,'bardak:100','','','çay şekerli 1 şekerli bir küp şeker','Çay (1 şekerli)','Tea (1 sugar cube)','Чай (1 кусочек сахара)','Tee (1 Stück Zucker)','شاي (بمكعب سكر واحد)'],
  ['turk_kahvesi_orta','icecek',30,0.1,7.5,0,7.1,0,1,'fincan:70','','','türk kahvesi orta şekerli','Türk kahvesi (orta şekerli)','Turkish coffee (medium sweet)','Кофе по-турецки (средней сладости)','Türkischer Kaffee (mittelsüß)','قهوة تركية (وسط)'],
  ['kahve_3u1','icecek',47,0.4,7.5,1.8,6.5,0,1,'fincan:170','y','','hazır kahve 3ü1 3 ü 1 arada üçü bir arada nescafe neskafe şekerli kremalı','Hazır kahve (3\'ü 1 arada)','3-in-1 instant coffee','Растворимый кофе 3 в 1','3-in-1-Instantkaffee','قهوة سريعة التحضير 3 في 1'],
  ['granul_kahve','icecek',12,0.9,1.3,0.4,1.2,0,1,'fincan:200','d','','granül kahve hazır kahve nescafe neskafe sütlü şekersiz instant','Granül kahve (sütlü, şekersiz)','Instant coffee with milk (no sugar)','Растворимый кофе с молоком (без сахара)','Instantkaffee mit Milch (ohne Zucker)','قهوة سريعة التحضير بالحليب (بدون سكر)'],
  ['flat_white','icecek',37,2.6,3.8,1.2,3.8,0,1,'fincan:200','d','','flat white kahve sütlü espresso','Flat white','Flat white','Флэт уайт','Flat White','فلات وايت'],
  ['cold_brew','icecek',2,0.2,0,0,0,0,1,'fincan:300','','','cold brew soğuk demleme kahve sade buzlu','Soğuk demleme kahve (cold brew)','Cold brew coffee (black)','Колд брю (кофе холодного заваривания)','Cold-Brew-Kaffee (schwarz)','قهوة باردة التخمير (سادة)'],
  ['karamel_latte','icecek',62,2.4,9.5,1.3,9.3,0,1,'fincan:300','d','','karamel latte şuruplu kahve şekerli aromalı','Karamel latte (şuruplu)','Caramel latte (with syrup)','Карамельный латте (с сиропом)','Karamell-Latte (mit Sirup)','لاتيه بالكراميل (مع الشراب)'],
  ['kusburnu_cayi','icecek',2,0,0.5,0,0.3,0,1,'fincan:200','','','kuşburnu çayı bitki çayı şekersiz','Kuşburnu çayı (şekersiz)','Rosehip tea (unsweetened)','Чай из шиповника (без сахара)','Hagebuttentee (ungesüßt)','شاي ثمر الورد (بدون سكر)'],
  ['elma_cayi','icecek',32,0,8,0,7.8,0,1,'bardak:150','','','elma çayı toz hazır şekerli','Elma çayı (toz, hazırlanmış)','Apple tea (instant, sweetened)','Яблочный чай (растворимый, сладкий)','Apfeltee (Instant, gesüßt)','شاي التفاح (سريع التحضير، محلّى)'],
  ['elma_suyu','icecek',46,0.1,11.3,0.1,9.6,0.2,1,'bardak:200','','','elma suyu taze sıkma meyve suyu','Elma suyu (taze sıkma)','Apple juice (freshly squeezed)','Яблочный сок (свежевыжатый)','Apfelsaft (frisch gepresst)','عصير تفاح (طازج)'],
  ['greyfurt_suyu','icecek',39,0.5,9.2,0.1,7.3,0.1,1,'bardak:200','','','greyfurt suyu taze sıkma meyve suyu','Greyfurt suyu (taze sıkma)','Grapefruit juice (freshly squeezed)','Грейпфрутовый сок (свежевыжатый)','Grapefruitsaft (frisch gepresst)','عصير الجريب فروت (طازج)'],
  ['karisik_meyve_suyu','icecek',43,0.6,10,0.2,8,0.4,1,'bardak:250','','','karışık meyve suyu taze sıkma portakal havuç elma','Karışık meyve suyu (taze sıkma)','Fresh mixed juice (orange, carrot & apple)','Свежевыжатый сок (апельсин, морковь, яблоко)','Frisch gepresster Mischsaft (Orange, Karotte & Apfel)','عصير طازج مشكل (برتقال وجزر وتفاح)'],
  ['hindistan_suyu','icecek',19,0.7,3.7,0.2,2.6,1.1,330,'','','kutu:330','hindistan cevizi suyu doğal elektrolit sporcu','Hindistan cevizi suyu','Coconut water','Кокосовая вода','Kokoswasser','ماء جوز الهند'],
  ['gazoz','icecek',40,0,10,0,10,0,1,'bardak:250','','','gazoz gazlı içecek şekerli','Gazoz','Turkish lemon soda (gazoz)','Газоз (сладкая газировка)','Gazoz (türkische Limonade)','جازوز (مشروب غازي تركي)'],
  ['sira','icecek',70,0.3,17,0,16,0.2,1,'bardak:200','','','şıra üzüm şırası','Şıra (üzüm)','Şıra (grape must drink)','Шыра (напиток из виноградного сусла)','Şıra (Traubenmost-Getränk)','شيرا (مشروب عصير العنب)'],
  // Tatlılar
  ['firin_sutlac','tatli',135,3.5,22,3.5,15,0.1,150,'','d','','fırın sütlaç sütlü tatlı','Fırın sütlaç','Baked rice pudding','Запечённый рисовый пудинг','Gebackener Milchreis','أرز بالحليب في الفرن'],
  ['krem_karamel','tatli',140,4,22,4,21,0,120,'','ed','','krem karamel sütlü tatlı','Krem karamel','Crème caramel','Крем-карамель','Crème Caramel','كريم كراميل'],
  ['ekmek_kadayifi','tatli',330,4.5,50,13,38,0.8,120,'','dy','','ekmek kadayıfı kaymaklı şerbetli tatlı','Ekmek kadayıfı (kaymaklı)','Bread kadayıf with clotted cream','Экмек кадаиф с каймаком','Ekmek Kadayıfı mit Kaymak','كنافة الخبز بالقشطة'],
  ['un_helvasi','tatli',470,5,55,26,32,1,60,'','dy','','un helvası helva','Un helvası','Flour halva','Мучная халва','Mehl-Halva','حلاوة الطحين'],
  ['yas_pasta','tatli',260,4,32,13,22,0.6,1,'dilim:100','edy','','yaş pasta doğum günü pastası kremalı meyveli','Yaş pasta (meyveli, kremalı)','Cream cake (layer cake with fruit)','Бисквитный торт со сливками и фруктами','Sahnetorte (mit Obst)','كيكة كريمة (بالفواكه)'],
  ['sufle','tatli',390,6,40,23,32,2,1,'adet:110','edy','','sufle çikolatalı akışkan kek','Sufle (çikolatalı)','Chocolate soufflé (lava cake)','Шоколадный фондан (суфле)','Schokoladensoufflé (Lavakuchen)','سوفليه الشوكولاتة'],
  // Kuruyemiş & yağ
  ['fistikezme_sekerli','kuruyemis',600,22,24,49,13,5,15,'','','tk:8','fıstık ezmesi şekerli kremalı market','Fıstık ezmesi (şekerli)','Peanut butter (sweetened)','Арахисовая паста (с сахаром)','Erdnussbutter (gesüßt)','زبدة الفول السوداني (محلاة)'],
  ['margarin','kuruyemis',717,0.2,0.7,80,0,0,5,'','y','tk:5','margarin kahvaltılık yağ','Margarin','Margarine','Маргарин','Margarine','سمن نباتي (مارجرين)'],
  ['karisik_kuruyemis_tuzlu','kuruyemis',600,18,22,50,4,7,30,'','t','','karışık kuruyemiş tuzlu kavrulmuş çerez','Karışık kuruyemiş (kavrulmuş, tuzlu)','Mixed nuts (roasted, salted)','Ореховая смесь (жареная, солёная)','Nussmischung (geröstet, gesalzen)','مكسرات مشكلة (محمصة ومملحة)'],
  // Tahıl, ekmek & kuru tartım
  ['misir_patlagi','tahil',385,8,79,3,0.5,5,2,'adet:8','','','mısır patlağı corn cake mısır krakeri','Mısır patlağı','Corn cake (puffed corn)','Кукурузный хлебец','Maiswaffel','كعك الذرة المنفوخ'],
  ['yulaf_lapasi_su','tahil',71,2.5,12,1.5,0.3,1.7,250,'','','','yulaf lapası suyla sütsüz kahvaltı sporcu','Yulaf lapası (suyla)','Porridge (made with water)','Овсяная каша на воде','Haferbrei (mit Wasser)','عصيدة الشوفان بالماء'],
  ['granola_balli','tahil',450,9,66,16,22,6,40,'','','','granola ballı hazır market kahvaltılık gevrek','Granola (ballı, hazır)','Granola (honey, ready-made)','Гранола (с мёдом, готовая)','Granola (mit Honig, fertig)','جرانولا (بالعسل، جاهزة)'],
  ['siyez_ekmegi','tahil',245,10,44,2.5,2.5,6.5,2,'dilim:30','','','siyez ekmeği einkorn ekmek','Siyez ekmeği','Einkorn bread (siyez)','Хлеб из однозернянки (сиез)','Einkornbrot (Siyez)','خبز القمح الأحادي الحبة (سييز)'],
  ['protein_ekmek','tahil',260,23,18,14,2,10,2,'dilim:30','','','proteinli ekmek düşük karbonhidrat low carb sporcu','Proteinli ekmek (düşük karbonhidratlı)','High-protein bread (low-carb)','Белковый хлеб (низкоуглеводный)','Eiweißbrot (Low Carb)','خبز عالي البروتين (قليل الكربوهيدرات)'],
  ['pirinc_cig','tahil',365,7.1,80,0.7,0.1,1.3,60,'','','','pirinç çiğ kuru ağırlık tartım pişmemiş sporcu meal prep','Pirinç (çiğ tartım)','White rice (dry weight)','Белый рис (вес в сухом виде)','Weißer Reis (Trockengewicht)','أرز أبيض (الوزن جافاً)'],
  ['makarna_kuru','tahil',371,13,75,1.5,2.7,3.2,70,'','','','makarna kuru ağırlık çiğ tartım pişmemiş sporcu','Makarna (kuru tartım)','Pasta (dry weight)','Макароны (вес в сухом виде)','Nudeln (Trockengewicht)','معكرونة (الوزن جافة)'],
  ['bulgur_cig','tahil',342,12.3,76,1.3,0.4,12.5,60,'','','','bulgur kuru ağırlık çiğ tartım pişmemiş sporcu','Bulgur (kuru tartım)','Bulgur (dry weight)','Булгур (вес в сухом виде)','Bulgur (Trockengewicht)','برغل (الوزن جافاً)'],
  ['kinoa_cig','tahil',368,14.1,64,6.1,0,7,60,'','','','kinoa kuru ağırlık çiğ tartım pişmemiş sporcu','Kinoa (kuru tartım)','Quinoa (dry weight)','Киноа (вес в сухом виде)','Quinoa (Trockengewicht)','كينوا (الوزن جافة)'],
  ['pankek_klasik','tahil',230,6,34,7.5,12,1,150,'','ed','','pankek klasik şuruplu akçaağaç ballı unlu','Pankek (klasik, şuruplu)','Pancakes (classic, with syrup)','Панкейки (классические, с сиропом)','Pancakes (klassisch, mit Sirup)','بان كيك (كلاسيكي بالشراب)'],
  // Sporcu: ev yapımı protein içecekleri
  ['proffee','sporcu',82,11.8,4.6,1.8,4.3,0,1,'bardak:300','d','','proffee proteinli kahve whey buzlu kahve sporcu','Proteinli kahve (proffee)','Protein coffee (proffee)','Протеиновый кофе (proffee)','Proteinkaffee (Proffee)','قهوة بالبروتين (بروفي)'],
  ['ev_gainer','sporcu',114,5,16.1,3.8,6.4,1.9,1,'bardak:400','d','','gainer ev yapımı kilo alma shake yulaf muz fıstık ezmesi süt sporcu','Ev yapımı gainer (süt, yulaf, muz, fıstık ezmesi)','Homemade gainer shake (milk, oats, banana & peanut butter)','Домашний гейнер (молоко, овсянка, банан, арахисовая паста)','Selbstgemachter Gainer-Shake (Milch, Hafer, Banane & Erdnussbutter)','مخفوق زيادة الوزن منزلي (حليب وشوفان وموز وزبدة فول سوداني)'],
  ['protein_smoothie','sporcu',70,8.9,6.8,1,5.5,0.9,1,'bardak:350','d','','proteinli smoothie orman meyveli whey yoğurtlu sporcu','Proteinli orman meyveli smoothie','Protein berry smoothie (yogurt & whey)','Протеиновый ягодный смузи (йогурт и протеин)','Protein-Beeren-Smoothie (Joghurt & Whey)','سموذي التوت بالبروتين (زبادي وواي)'],
  // Atıştırmalık
  ['chia_puding_meyve','atistirmalik',79,3.7,8.6,3.6,4.4,3.3,150,'','d','','chia puding meyveli çilekli sütlü şekersiz','Meyveli chia puding (sütlü, şekersiz)','Chia pudding (milk & berries, no sugar)','Пудинг чиа (на молоке, с ягодами, без сахара)','Chia-Pudding (Milch & Beeren, ohne Zucker)','بودنغ الشيا (بالحليب والتوت، بدون سكر)'],
  ['cikolata_bar','atistirmalik',490,8,60,24,50,2,1,'adet:50','dy','','çikolata bar karamelli fıstıklı','Çikolata bar (karamelli, fıstıklı)','Chocolate bar (caramel & peanut)','Шоколадный батончик (карамель и арахис)','Schokoriegel (Karamell & Erdnuss)','لوح شوكولاتة (كراميل وفول سوداني)']
);
Object.assign(ALERJEN_EK, {
  zy_bamya:'domates,sogan,zeytin', zy_bezelye:'bezelye,havuc,patates,sogan,zeytin', zy_karnabahar:'karnabahar,havuc,sogan,zeytin', zy_turlu:'patlican,kabak,biber,domates,sogan,patates,fasulye,zeytin',
  etli_pirasa:'kirmizi,pirinc,havuc,sogan,fodmap', patates_musakka:'kirmizi,patates,domates,biber,sogan', kabak_musakka:'kabak,kirmizi,domates,biber,sogan', elbasan_tava:'kirmizi,sut,yumurta,gluten,bugday',
  kuzu_kapama:'kirmizi,sogan', etli_barbunya:'fasulye,kirmizi,havuc,sogan,domates', kuru_borulce:'fasulye,sogan,domates,zeytin', mantar_guvec:'mantar,sut,biber,domates,histamin', hindi_sote:'hindi,biber,domates,sogan',
  pilavustu_doner:'tavuk,pirinc,sut,biber,sarimsak', mucver_tava:'kabak,yumurta,sut,gluten,bugday,sogan,nane', domates_dolma:'domates,kirmizi,pirinc,sogan,nane', karalahana_sarma:'kirmizi,pirinc,sogan,domates',
  sogan_dolma:'sogan,kirmizi,pirinc,domates,biber', hindi_kinoa_kase:'hindi,kabak,biber,domates,zeytin', biftek_kase:'kirmizi,pirinc,brokoli,biber,zeytin', tavuk_tpatates_kase:'tavuk,patates,brokoli,zeytin',
  tavuk_bulgur_kase:'tavuk,gluten,bugday,nohut,sut,domates,salatalik', ton_kase:'balik,pirinc,misir,salatalik,havuc,zeytin,histamin,nikel',
  beyran:'kirmizi,pirinc,sarimsak,biber', karnabahar_corba:'karnabahar,sut,sogan', patates_corba:'patates,sut,sogan,havuc', balik_corba:'balik,havuc,patates,sogan,kereviz,yumurta', tavuk_suyu:'tavuk',
  karalahana_corba:'fasulye,misir,sogan', etli_pilav:'kirmizi,pirinc', mercimekli_bulgur:'gluten,bugday,mercimek,sogan', arpa_sehriye:'gluten,bugday,domates', bulgur_hasl:'gluten,bugday', pirinc_hasl:'pirinc',
  siyez_bulgur:'gluten,bugday', yogurtlu_makarna:'gluten,bugday,sut,sarimsak', peynirli_makarna:'gluten,bugday,sut', sebzeli_makarna:'gluten,bugday,kabak,biber,domates,zeytin', tpatates_hasl:'patates',
  tavuk_iskender:'tavuk,gluten,bugday,sut,domates', kulbasti:'kirmizi', tavuk_fume:'tavuk,histamin', dana_fume:'kirmizi,histamin', tavuk_cig:'tavuk', dana_kiyma_cig:'kirmizi',
  kilic:'balik,histamin', mezgit_tava:'balik,gluten,bugday',
  kiymali_yumurta:'yumurta,kirmizi,domates,biber,sogan', lorlu_omlet:'yumurta,sut', yulafli_omlet:'yumurta,yulaf,gluten,sut', sade_omlet:'yumurta', yumurta_iri:'yumurta', yumurta_kucuk:'yumurta', kayisi_yumurta:'yumurta',
  sucuklu_menemen:'yumurta,kirmizi,domates,biber,sarimsak,kimyon,histamin', kasarli_yumurta:'yumurta,sut,histamin', muz_yumurta_pankek:'yumurta,muz',
  beyazp_light:'sut', koyun_peyniri:'sut', eski_kasar:'sut,histamin', otlu_peynir:'sut,histamin', kars_gravyeri:'sut,histamin', mihalic:'sut,histamin', ucgen_peynir:'sut', labne_light:'sut', yunan_yogurdu_0:'sut',
  skyr_meyveli:'sut', kefir_light:'sut', kefir_meyveli:'sut,cilek', kakaolu_sut:'sut,kakao',
  kahvaltilik_sos:'domates,biber,sogan', petek_bal:'bal', serpme_kahvalti:'yumurta,sut,gluten,bugday,zeytin,domates,salatalik,bal,kirmizi,susam,histamin',
  karisik_pide:'kirmizi,gluten,bugday,sut,domates,biber,histamin', fit_lahmacun:'kirmizi,gluten,bugday,domates,biber,sogan', lavas_pizza:'gluten,bugday,sut,domates,biber,mantar,zeytin',
  icli_kofte_kizartma:'kirmizi,gluten,bugday,sogan,ceviz,kuruyemis', milfoy_borek:'gluten,bugday,sut,yumurta', tam_simit:'gluten,bugday,susam,uzum',
  simit_tost:'gluten,bugday,susam,uzum,sut,histamin', peynirli_durum:'gluten,bugday,sut,domates,salatalik',
  deniz_borulcesi:'zeytin,sarimsak', tarama:'balik,gluten,bugday,histamin', yogurtlu_pancar:'sut,sarimsak',
  balkabagi:'', kabak_kizartma:'kabak,gluten,bugday', karnabahar_kizartma:'karnabahar,yumurta,gluten,bugday', domates_salcasi:'domates', biber_salcasi:'biber', lahana_tursusu:'histamin',
  medjool:'hurma,fodmap', murdum:'fodmap', limon_suyu:'narenciye', nar_eksisi:'',
  cay_sekerli:'kafein', turk_kahvesi_orta:'kafein', kahve_3u1:'kafein,sut', granul_kahve:'kafein,sut', flat_white:'kafein,sut', cold_brew:'kafein', karamel_latte:'kafein,sut', kusburnu_cayi:'',
  elma_cayi:'elma', elma_suyu:'elma', greyfurt_suyu:'narenciye', karisik_meyve_suyu:'narenciye,havuc,elma', hindistan_suyu:'', gazoz:'', sira:'uzum',
  firin_sutlac:'sut,pirinc', krem_karamel:'sut,yumurta', ekmek_kadayifi:'gluten,bugday,sut', un_helvasi:'gluten,bugday,sut', yas_pasta:'gluten,bugday,sut,yumurta', sufle:'gluten,bugday,sut,yumurta,kakao',
  fistikezme_sekerli:'yerfistigi', margarin:'', karisik_kuruyemis_tuzlu:'kuruyemis,yerfistigi,findik,badem,kaju,antepfistigi',
  misir_patlagi:'misir', yulaf_lapasi_su:'gluten,yulaf', granola_balli:'gluten,yulaf,bal,kuruyemis', siyez_ekmegi:'gluten,bugday', protein_ekmek:'gluten,bugday,soya,keten,susam,sut',
  pirinc_cig:'pirinc', makarna_kuru:'gluten,bugday', bulgur_cig:'gluten,bugday', kinoa_cig:'', pankek_klasik:'gluten,bugday,yumurta,sut',
  proffee:'sut,kafein,tatlandirici', ev_gainer:'sut,yulaf,gluten,muz,yerfistigi', protein_smoothie:'sut,tatlandirici',
  chia_puding_meyve:'chia,sut,cilek', cikolata_bar:'yerfistigi,sut,kakao,soya'
});
// Otomatik planda kullanılmaz: kızartma, işlenmiş/füme et, şekerli, sos/çeşni, restoran porsiyonu, whey içerenler ve çiğ/kuru tartım kalemleri
DOKTOR_DISI_EK.push('mucver_tava','pilavustu_doner','tavuk_iskender','tavuk_fume','dana_fume','tavuk_cig','dana_kiyma_cig','mezgit_tava','sucuklu_menemen',
  'ucgen_peynir','skyr_meyveli','kefir_meyveli','kakaolu_sut','kahvaltilik_sos','petek_bal','serpme_kahvalti','karisik_pide','icli_kofte_kizartma','milfoy_borek','simit_tost','tarama',
  'kabak_kizartma','karnabahar_kizartma','domates_salcasi','biber_salcasi','lahana_tursusu','limon_suyu','nar_eksisi',
  'cay_sekerli','turk_kahvesi_orta','kahve_3u1','karamel_latte','elma_cayi','gazoz','sira',
  'firin_sutlac','krem_karamel','ekmek_kadayifi','un_helvasi','yas_pasta','sufle','fistikezme_sekerli','margarin','karisik_kuruyemis_tuzlu',
  'granola_balli','pirinc_cig','makarna_kuru','bulgur_cig','kinoa_cig','pankek_klasik','proffee','ev_gainer','protein_smoothie','cikolata_bar');
// Hamilelikte önerilmeyenler: yüksek cıvalı/konserve ton ve kılıç balığı, füme et, az pişmiş yumurta, çiğ sütten yapılabilen geleneksel peynirler, işlenmiş balık yumurtası
HAMILE_DISI_EK.push('ton_kase','kilic','tavuk_fume','dana_fume','kayisi_yumurta','kasarli_yumurta','otlu_peynir','mihalic','kars_gravyeri','tarama','serpme_kahvalti');
POPULER.push('cay_sekerli','turk_kahvesi_orta','kahve_3u1','pirinc_hasl','bulgur_hasl','beyazp_light','labne_light','yunan_yogurdu_0','kefir_light','zy_bezelye','zy_turlu','etli_pirasa',
  'patates_musakka','domates_dolma','etli_pilav','mercimekli_bulgur','tavuk_suyu','misir_patlagi','yulaf_lapasi_su','tpatates_hasl','tavuk_cig','pirinc_cig','fit_lahmacun','eski_kasar');
OGUN_ONERI.kahvalti.push('lorlu_omlet','yulafli_omlet','sade_omlet','kiymali_yumurta','yumurta_iri','kayisi_yumurta','muz_yumurta_pankek','beyazp_light','labne_light','koyun_peyniri','eski_kasar',
  'otlu_peynir','kars_gravyeri','yulaf_lapasi_su','siyez_ekmegi','tam_simit','protein_ekmek','peynirli_durum','yunan_yogurdu_0');
OGUN_ONERI.ara0.push('yunan_yogurdu_0','kefir_light','medjool','murdum','misir_patlagi','chia_puding_meyve');
OGUN_ONERI.ogle.push('zy_bamya','zy_bezelye','zy_karnabahar','zy_turlu','etli_pirasa','kabak_musakka','patates_musakka','domates_dolma','karalahana_sarma','etli_barbunya','kuru_borulce','hindi_sote',
  'hindi_kinoa_kase','biftek_kase','tavuk_tpatates_kase','tavuk_bulgur_kase','ton_kase','karnabahar_corba','tavuk_suyu','beyran','mercimekli_bulgur','bulgur_hasl','pirinc_hasl','siyez_bulgur',
  'sebzeli_makarna','fit_lahmacun','lavas_pizza');
OGUN_ONERI.ara1.push('yunan_yogurdu_0','kefir_light','medjool','murdum','misir_patlagi','chia_puding_meyve');
OGUN_ONERI.aksam.push('kulbasti','kilic','hindi_sote','zy_bezelye','zy_karnabahar','zy_turlu','zy_bamya','etli_pirasa','kabak_musakka','elbasan_tava','kuzu_kapama','domates_dolma','karalahana_sarma',
  'sogan_dolma','mantar_guvec','hindi_kinoa_kase','tavuk_tpatates_kase','biftek_kase','balik_corba','patates_corba','bulgur_hasl','pirinc_hasl','tpatates_hasl','balkabagi','deniz_borulcesi','yogurtlu_pancar');
OGUN_ONERI.gece.push('yunan_yogurdu_0','kefir_light','chia_puding_meyve','kusburnu_cayi');
// Entegrasyon notu (bu dosya p4h.js ile p4.js arasına girer; aşağıdaki kümeler sonraki parçalarda tanımlı olduğundan buradan değiştirilemez):
// - p5.js SIVI kümesine eklenmeli (içecek yalnız içecekle değişsin, porsiyon ml olarak ölçeklensin): SIVI_EK
// - p4b.js LAKTOZ_DUSUK kümesine eklenmeli (olgun/sert peynir): LAKTOZ_DUSUK_EK
const SIVI_EK = ['cay_sekerli','turk_kahvesi_orta','kahve_3u1','granul_kahve','flat_white','cold_brew','karamel_latte','kusburnu_cayi','elma_cayi','elma_suyu','greyfurt_suyu',
  'karisik_meyve_suyu','hindistan_suyu','gazoz','sira','kefir_light','kefir_meyveli','kakaolu_sut','proffee','ev_gainer','protein_smoothie'];
const LAKTOZ_DUSUK_EK = ['eski_kasar','kars_gravyeri','mihalic','otlu_peynir','koyun_peyniri','beyazp_light'];

// ---------- Şablon haftalar 5–8 (ORNEK_PLAN biçimi: gün başına [kahvaltı, öğle, ara öğün, akşam, gece]; adet birimlide adet, diğerlerinde gram) ----------
// Diyetisyen tarzı, protein ağırlıklı; kızartma/şekerli/işlenmiş (DOKTOR_DISI) yok; akşama içecek konmaz (program ekler); haftada 2 balık, 1–2 baklagil günü
// 5. hafta: Akdeniz & zeytinyağlılar
const HAFTA_5 = [
  [[['yumurta',2],['beyazp_light',2],['cavdar',2],['zeytin',5],['domates',100],['salatalik',100]], [['hindi_sote',250],['bulgur_hasl',100],['coban',150]],
   [['yunan_yogurdu_0',150],['cilek',150]], [['levrek',200],['zy_karnabahar',200],['salata',150],['tamekmek',1]], [['kefir',200],['ceviz',10]]],
  [[['lorlu_omlet',150],['tamekmek',2],['domates',100],['yesil_biber',2],['zeytin',5]], [['karnabahar_corba',250],['tavuk',120],['salata',150],['tamekmek',1]],
   [['elma',1],['badem',15]], [['kulbasti',150],['zy_bezelye',200],['yogurt',150]], [['suzme',150],['keten',5]]],
  [[['yulaf',40],['sut',200],['yumurta',1],['ceviz',10],['cilek',100]], [['kuru_borulce',250],['tavuk_hasl',100],['cacik',150],['tamekmek',1]],
   [['suzme',150],['kivi',1]], [['tavuk_firin',150],['tpatates_hasl',150],['brokoli',150],['salata',100]], [['kefir_light',250],['badem',10]]],
  [[['yumurta',2],['labne_light',30],['siyez_ekmegi',2],['domates',100],['salatalik',100],['roka',30]], [['dana_sis',150],['siyez_bulgur',100],['coban',150]],
   [['yogurt',150],['murdum',2]], [['zy_turlu',250],['hindi',120],['yogurt',100],['tamekmek',1]], [['kefir',200],['findik',10]]],
  [[['sade_omlet',120],['beyazp',1],['cavdar',2],['domates',100],['salatalik',100]], [['etli_pirasa',250],['yogurt',150],['tamekmek',1]],
   [['suzme',150],['armut',1]], [['somon_izgara',150],['deniz_borulcesi',100],['salata',150],['cavdar',1]], [['yogurt',150],['ceviz',10]]],
  [[['menemen',200],['lor',45],['tamekmek',2],['zeytin',5],['salatalik',100]], [['hindi_kinoa_kase',350],['cacik',150],['salata',100]],
   [['kefir',250],['kabak_cek',15]], [['kabak_musakka',250],['yogurt',150],['salata',100],['tamekmek',1]], [['chia_puding_meyve',150]]],
  [[['muz_yumurta_pankek',200],['yunan_yogurdu_0',100],['beyazp_light',1],['ceviz',10]], [['tavuk',150],['pirinc_hasl',100],['yogurtlu_pancar',100],['salata',100]],
   [['suzme',150],['medjool',1]], [['domates_dolma',2],['yogurt',150],['salata',150]], [['kefir',200],['badem',10]]]
];
// 6. hafta: Sporcu / yüksek protein
const HAFTA_6 = [
  [[['yulafli_omlet',150],['ybeyaz',2],['beyazp_light',2],['tamekmek',1],['domates',100],['salatalik',100]], [['tavuk',150],['bulgur_hasl',150],['cacik',150],['salata',100]],
   [['yunan_yogurdu_0',150],['muz',1]], [['biftek',150],['tpatates_hasl',150],['brokoli',150],['salata',100]], [['kefir_light',250],['ceviz',10]]],
  [[['yumurta',2],['ybeyaz',2],['lor',60],['protein_ekmek',2],['domates',100],['salatalik',100]], [['hindi',150],['kinoa',100],['salata',150],['yogurt',100]],
   [['misir_patlagi',2],['fistikezme',10]], [['somon',150],['esmer_pirinc',100],['izgarasebze',200]], [['suzme',150],['chia',10]]],
  [[['yulaf_lapasi_su',250],['yunan_yogurdu_0',100],['yumurta',1],['yabanmersini',100]], [['yesil_mercimek',250],['tavuk_hasl',120],['yogurt',150],['tamekmek',1]],
   [['elma',1],['badem',15]], [['hindi_kofte',180],['firin_sebze',200],['cacik',150]], [['kefir',200],['kabak_cek',10]]],
  [[['menemen',200],['ybeyaz',2],['lor',45],['cavdar',2],['zeytin',5]], [['tavuk_tpatates_kase',350],['cacik',150],['salata',100]],
   [['protein_yogurt',150],['cilek',150]], [['kulbasti',150],['bulgur_hasl',100],['coban',150]], [['yunan_yogurdu_0',150],['ceviz',10]]],
  [[['yumurta',2],['beyazp_light',2],['tamekmek',2],['domates',100],['salatalik',100],['zeytin',5]], [['biftek_kase',350],['yogurt',150],['salata',100]],
   [['suzme',150],['portakal',1]], [['tavuk_sis',180],['siyez_bulgur',100],['coban',150]], [['kefir_light',250],['badem',10]]],
  [[['muz_yumurta_pankek',200],['lor',45],['yunan_yogurdu_0',100],['ceviz',10]], [['hindi_sote',250],['esmer_pirinc',100],['salata',150]],
   [['skyr',150],['kivi',1]], [['levrek',200],['hasl_sebze',200],['salata',150],['cavdar',1]], [['suzme',150],['keten',5]]],
  [[['lorlu_omlet',150],['ybeyaz',2],['siyez_ekmegi',1],['domates',100],['salatalik',100]], [['kofte_firin',150],['bulgur_hasl',100],['cacik',150],['salata',100]],
   [['kefir',250],['muz',1]], [['tavuk_baget',200],['tpatates',150],['brokoli',150]], [['chia_puding_meyve',150]]]
];
// 7. hafta: Ev yemekleri & esnaf lokantası (hafifletilmiş)
const HAFTA_7 = [
  [[['yumurta',2],['beyazp',2],['tamekmek',2],['zeytin',5],['domates',100],['salatalik',100]], [['etli_barbunya',250],['bulgur',100],['cacik',150]],
   [['suzme',150],['elma',1]], [['tavuk_firin',150],['zy_bamya',200],['salata',150],['tamekmek',1]], [['kefir',200],['ceviz',10]]],
  [[['menemen',200],['lor',45],['cavdar',2],['salatalik',100]], [['karalahana_corba',250],['hindi',120],['salata',150],['tamekmek',1]],
   [['kefir',250],['findik',15]], [['kabak_musakka',250],['yogurt',150],['salata',100],['tamekmek',1]], [['suzme',150],['murdum',2]]],
  [[['yumurta',2],['koyun_peyniri',1],['cavdar',2],['domates',100],['yesil_biber',2]], [['tavuk_sote',250],['bulgur_hasl',100],['yogurt',150],['salata',100]],
   [['yogurt',150],['armut',1]], [['palamut',200],['deniz_borulcesi',100],['salata',150],['tamekmek',1]], [['kefir',200],['badem',10]]],
  [[['peynirli_omlet',150],['domates',100],['salatalik',100],['tamekmek',2],['zeytin',5]], [['karalahana_sarma',6],['yogurt',150],['salata',100]],
   [['suzme',150],['mandalina',2]], [['hindi_kofte',150],['zy_karnabahar',200],['cacik',150]], [['yogurt',150],['ceviz',10]]],
  [[['yumurta',2],['beyazp_light',2],['siyez_ekmegi',2],['domates',100],['salatalik',100]], [['etli_nohut',250],['bulgur_hasl',100],['coban',150]],
   [['kefir_light',250],['kuru_incir',2]], [['dana_sis',150],['izgarasebze',200],['yogurtlu_pancar',100]], [['suzme',150],['keten',5]]],
  [[['yumurta',2],['lor',60],['tamekmek',2],['zeytin',5],['domates',100],['roka',30]], [['tavuk_suyu',250],['tavuk',120],['sebzeli_makarna',150],['salata',100]],
   [['yogurt',150],['cilek',150]], [['hamsi',200],['salata',150],['misir_ekmegi',1]], [['kefir',200],['findik',10]]],
  [[['sade_omlet',120],['beyazp',2],['tamekmek',2],['salatalik',100],['domates',100]], [['domates_dolma',2],['yogurt',150],['salata',150]],
   [['suzme',150],['kivi',1]], [['izmir_kofte',250],['cacik',150],['salata',100]], [['yogurt',150],['badem',10]]]
];
// 8. hafta: Karadeniz-Ege karışık
const HAFTA_8 = [
  [[['yulaf',40],['sut',200],['yumurta',1],['ceviz',10],['muz',1]], [['hindi_sis',180],['siyez_bulgur',100],['coban',150]],
   [['kefir',250],['badem',10]], [['tavuk_guvec',250],['yogurt',150],['tamekmek',1]], [['suzme',150],['chia',5]]],
  [[['yumurta',2],['kasar_light',1],['cavdar',2],['zeytin',5],['domates',100],['salatalik',100]], [['ezogelin',250],['tavuk_hasl',120],['salata',150]],
   [['yunan_yogurdu_0',150],['yabanmersini',100]], [['alabalik',200],['zy_bezelye',150],['salata',150],['cavdar',1]], [['kefir_light',250],['ceviz',10]]],
  [[['menemen',200],['beyazp_light',2],['tamekmek',2],['salatalik',100]], [['kfasulye_zy',250],['bulgur_hasl',100],['tavuk_hasl',100],['salata',100]],
   [['suzme',150],['portakal',1]], [['hindi_kofte',180],['balkabagi',200],['cacik',150]], [['yogurt',150],['findik',10]]],
  [[['lorlu_omlet',150],['domates',100],['salatalik',100],['cavdar',2],['zeytin',5]], [['dana_sis',150],['bulgur',100],['coban',150]],
   [['kefir',250],['kuru_erik',3]], [['hindi_kinoa_kase',350],['yogurt',150],['salata',100]], [['suzme',150],['keten',5]]],
  [[['yumurta',2],['labne_light',30],['tamekmek',2],['domates',100],['salatalik',100],['roka',30]], [['tavuk_bulgur_kase',350],['salata',150],['ayran',250]],
   [['yogurt',150],['elma',1]], [['biftek',150],['firin_sebze',200],['salata',100],['tamekmek',1]], [['kefir',200],['ceviz',10]]],
  [[['sade_omlet',120],['lor',45],['siyez_ekmegi',2],['zeytin',5],['domates',100]], [['tavuk',150],['tammakarna',100],['salata',150]],
   [['suzme',150],['medjool',1]], [['cipura',200],['izgarasebze',150],['salata',150],['cavdar',1]], [['yogurt',150],['badem',10]]],
  [[['muz_yumurta_pankek',200],['suzme',100],['ceviz',10],['beyazp_light',1]], [['kabak_dolma',3],['yogurt',150],['salata',150]],
   [['kefir_light',250],['findik',10]], [['tavuk_sis',180],['pirinc_hasl',100],['cacik',150]], [['chia_puding_meyve',150]]]
];
