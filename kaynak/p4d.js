// ---------- Ek yemekler 2: sandviç, tost & dürüm, ekmek çeşitleri, börek/pide/hamur işi ----------
// Sütunlar YEMEK_SATIR ile aynı: [id, kategori, kcal, protein, karb, yağ, şeker, lif (100 g), varsayılan miktar, 'birim:gram', içerik, porsiyon notu, arama, tr, en, ru, de, ar]
// Planda kendiliğinden kullanılmayacaklar (kızartma, işlenmiş et, şekerli): DOKTOR_DISI_EK; hamilelikte önerilmeyenler: HAMILE_DISI_EK (p4b.js ekler)
const DOKTOR_DISI_EK = [], HAMILE_DISI_EK = [];
Object.assign(S, {
  k_sandvic:["Sandviç, Tost & Dürüm","Sandwiches, toasties & wraps","Сэндвичи, тосты и роллы","Sandwiches, Toasts & Wraps","السندويشات والتوست واللفائف"]
});
Object.assign(KAT_DEGIS, {tost:'sandvic', karisik_tost:'sandvic', tavuk_durum:'sandvic'});
YEMEK_EK.push(
  // Sandviç (ekmek arası)
  ['peynirli_sandvic','sandvic',160,10,19,5,3,2.8,1,'adet:120','dt','','sandviç ekmek arası beyaz peynir domates salatalık kahvaltı','Beyaz peynirli sandviç (tam buğday)','White cheese sandwich (whole-wheat)','Сэндвич с брынзой (цельнозерновой)','Weißkäse-Sandwich (Vollkorn)','ساندويش جبنة بيضاء (قمح كامل)'],
  ['kasarli_sandvic','sandvic',213,13,20,9,2.7,3,1,'adet:110','dty','','sandviç ekmek arası kaşar peynir kahvaltı','Kaşarlı sandviç (tam buğday)','Kashar cheese sandwich (whole-wheat)','Сэндвич с сыром кашар (цельнозерновой)','Kaşar-Käse-Sandwich (Vollkorn)','ساندويش جبنة قشقوان (قمح كامل)'],
  ['lorlu_sandvic','sandvic',134,9.8,17.8,2.7,3.3,2.6,1,'adet:130','d','','sandviç ekmek arası lor peynir domates maydanoz kahvaltı','Lor peynirli sandviç (tam buğday)','Curd cheese sandwich (whole-wheat)','Сэндвич с творожным сыром (цельнозерновой)','Quarkkäse-Sandwich (Vollkorn)','ساندويش جبن قريش (قمح كامل)'],
  ['yumurtali_sandvic','sandvic',159,10,17,5.5,2.5,2.5,1,'adet:130','e','','sandviç ekmek arası haşlanmış yumurta kahvaltı','Yumurtalı sandviç (tam buğday)','Egg sandwich (whole-wheat)','Сэндвич с яйцом (цельнозерновой)','Eier-Sandwich (Vollkorn)','ساندويش بيض (قمح كامل)'],
  ['avokadolu_sandvic','sandvic',190,9.7,17.5,9.2,2,4,1,'adet:140','e','','sandviç ekmek arası avokado yumurta kahvaltı','Avokadolu yumurtalı sandviç','Avocado & egg sandwich','Сэндвич с авокадо и яйцом','Avocado-Ei-Sandwich','ساندويش أفوكادو وبيض'],
  ['hindi_sandvic','sandvic',136,10.6,16.6,3.5,2.6,2.6,1,'adet:140','cdt','','sandviç ekmek arası hindi füme marul domates','Hindi füme sandviç (tam buğday)','Smoked turkey sandwich (whole-wheat)','Сэндвич с копчёной индейкой','Putenbrust-Sandwich (Vollkorn)','ساندويش ديك رومي مدخن (قمح كامل)'],
  ['tavuk_sandvic','sandvic',151,16.6,14.5,2.6,2.1,2.3,1,'adet:155','c','','sandviç ekmek arası ızgara tavuk piliç','Tavuklu sandviç (tam buğday)','Grilled chicken sandwich (whole-wheat)','Сэндвич с курицей гриль (цельнозерновой)','Hähnchen-Sandwich (Vollkorn)','ساندويش دجاج مشوي (قمح كامل)'],
  ['ton_sandvic','sandvic',144,12.5,17.7,3,2.5,2.6,1,'adet:145','ft','','sandviç ekmek arası ton balığı mısır','Ton balıklı sandviç (tam buğday)','Tuna sandwich (whole-wheat)','Сэндвич с тунцом (цельнозерновой)','Thunfisch-Sandwich (Vollkorn)','ساندويش تونة (قمح كامل)'],
  ['somonlu_sandvic','sandvic',188,10.8,21,6.3,2,2.7,1,'adet:120','fdt','','sandviç ekmek arası füme somon labne çavdar roka','Füme somonlu sandviç (çavdar)','Smoked salmon sandwich (rye)','Сэндвич с копчёным лососем (ржаной)','Räucherlachs-Sandwich (Roggen)','ساندويش سلمون مدخن (جاودار)'],
  ['hellimli_sandvic','sandvic',214,13,18.8,9.8,2.8,2.8,1,'adet:120','dt','','sandviç ekmek arası hellim ızgara domates','Hellimli sandviç','Grilled halloumi sandwich','Сэндвич с халуми','Halloumi-Sandwich','ساندويش حلوم مشوي'],
  ['pastirmali_sandvic','sandvic',265,15,23,12,2.5,2.5,1,'adet:120','mdt','','sandviç ekmek arası pastırma kaşar','Pastırmalı kaşarlı sandviç','Pastırma & cheese sandwich','Сэндвич с бастурмой и сыром','Pastırma-Käse-Sandwich','ساندويش بسطرمة وجبن'],
  ['fistik_muz_sandvic','sandvic',212,8.8,30,7.5,8.5,4.4,1,'adet:125','','','sandviç ekmek arası fıstık ezmesi muz','Fıstık ezmeli muzlu sandviç','Peanut butter & banana sandwich','Сэндвич с арахисовой пастой и бананом','Erdnussbutter-Bananen-Sandwich','ساندويش زبدة الفول السوداني والموز'],
  ['caprese_sandvic','sandvic',212,10,24,8.1,1.9,1.4,1,'adet:155','d','','sandviç ciabatta mozzarella domates fesleğen','Domatesli mozzarellalı sandviç (ciabatta)','Tomato & mozzarella ciabatta','Чиабатта с томатами и моцареллой','Ciabatta mit Tomate & Mozzarella','ساندويش طماطم وموزاريلا (تشاباتا)'],
  ['tavuk_panini','sandvic',230,16,22,8.5,2,1.8,1,'adet:180','cd','','sandviç panini tavuk kaşar sıcak','Tavuklu panini (kaşarlı)','Chicken & cheese panini','Панини с курицей и сыром','Hähnchen-Käse-Panini','بانيني دجاج وجبن'],
  ['kulup_sandvic','sandvic',230,12,20,11,3,1.5,1,'adet:250','cdey','','sandviç club kulüp tavuk hindi yumurta mayonez','Kulüp sandviç (club)','Club sandwich','Клаб-сэндвич','Club-Sandwich','كلوب ساندويش'],
  ['kofte_ekmek','sandvic',221,11.6,26,7.6,3,1.6,1,'adet:250','my','','köfte ekmek arası yarım ekmek','Köfte ekmek (yarım ekmek)','Meatball sandwich (half loaf)','Кёфте в хлебе (полбатона)','Frikadellen-Brot (halbes Brot)','ساندويش كفتة (نصف رغيف)'],
  ['balik_ekmek','sandvic',206,11.5,24,6.8,2.9,1.5,1,'adet:260','f','','balık ekmek uskumru ekmek arası','Balık ekmek (uskumru)','Fish sandwich (mackerel)','Балык-экмек (скумбрия в хлебе)','Fischbrötchen (Makrele)','ساندويش سمك (ماكريل)'],
  ['kokorec','sandvic',280,13,22,16,2,1.2,1,'adet:250','mty','','kokoreç ekmek arası yarım ekmek sakatat','Kokoreç (yarım ekmek)','Kokoreç (grilled lamb intestines, half loaf)','Кокореч (полбатона)','Kokoreç (halbes Brot)','كوكوريتش (نصف رغيف)'],
  ['kumru','sandvic',270,12,28,12,3,1.5,1,'adet:220','mdty','','kumru izmir sucuk kaşar domates sandviç','Kumru (sucuk-kaşar)','Kumru (İzmir sucuk & cheese sandwich)','Кумру (сэндвич с суджуком и сыром)','Kumru (İzmir-Sandwich mit Sucuk & Käse)','كومرو (ساندويش سجق وجبن)'],
  ['sosisli','sandvic',280,9.5,27,15,4,1.2,1,'adet:150','mty','','sosisli sandviç sosis hot dog','Sosisli sandviç','Hot dog','Хот-дог','Hotdog','هوت دوغ'],
  // Tost
  ['tost_beyaz','sandvic',320,14.7,28.8,16,3,1.5,1,'adet:105','dty','','tost kaşarlı beyaz ekmek','Kaşarlı tost (beyaz ekmek)','Cheese toastie (white bread)','Тост с сыром (белый хлеб)','Käsetoast (Weißbrot)','توست بالجبن (خبز أبيض)'],
  ['sucuklu_tost','sandvic',330,12,33,16,3.7,1.8,1,'adet:90','mty','','tost sucuk','Sucuklu tost','Sucuk toastie','Тост с суджуком','Sucuk-Toast','توست بالسجق'],
  ['ayvalik_tostu','sandvic',290,13,27,14,4,1.8,1,'adet:250','mdty','','tost ayvalık sucuk salam kaşar','Ayvalık tostu','Ayvalık toastie (loaded)','Тост по-айвалыкски','Ayvalık-Toast','توست أيفاليك'],
  ['bazlama_tost','sandvic',290,12.3,39.5,9.4,1.6,1.9,1,'adet:160','dty','','tost bazlama kaşar','Kaşarlı bazlama tost','Cheese bazlama toastie','Тост из базламы с сыром','Bazlama-Käsetoast','توست بازلاما بالجبن'],
  // Dürüm & wrap
  ['tavuk_doner_durum','sandvic',203,13.5,21,7,1.5,1,1,'adet:220','cd','','dürüm tavuk döner lavaş wrap','Tavuk döner dürüm','Chicken döner wrap','Шаурма с курицей (дюрюм)','Hähnchen-Döner-Dürüm','لفافة شاورما دجاج'],
  ['et_doner_durum','sandvic',230,12,20,11,1.5,1,1,'adet:220','my','','dürüm et döner lavaş wrap','Et döner dürüm','Beef döner wrap','Шаурма с мясом (дюрюм)','Fleisch-Döner-Dürüm','لفافة شاورما لحم'],
  ['tavuk_doner_ekmek','sandvic',215,13,25,7,2.5,1.3,1,'adet:230','cd','','tavuk döner ekmek arası yarım ekmek','Tavuk döner (yarım ekmek)','Chicken döner sandwich (half loaf)','Куриный донер в хлебе','Hähnchen-Döner im Brot','شاورما دجاج بالخبز'],
  ['et_doner_ekmek','sandvic',240,12,25,10,2.5,1.3,1,'adet:230','my','','et döner ekmek arası yarım ekmek','Et döner (yarım ekmek)','Beef döner sandwich (half loaf)','Мясной донер в хлебе','Fleisch-Döner im Brot','شاورما لحم بالخبز'],
  ['adana_durum','sandvic',235,11,20,12,2,1.5,1,'adet:230','my','','dürüm adana kebap lavaş','Adana dürüm','Adana kebab wrap','Адана-кебаб в лаваше','Adana-Dürüm','لفافة كباب أضنة'],
  ['tantuni','sandvic',210,13,22,8,1.5,1.5,1,'adet:200','m','','tantuni dürüm dana lavaş mersin','Tantuni (dana)','Tantuni (beef wrap)','Тантуни (с говядиной)','Tantuni (Rind-Wrap)','طنطوني (لحم بقري)'],
  ['tavuk_tantuni','sandvic',185,14,22,5,1.5,1.5,1,'adet:200','c','','tantuni dürüm tavuk lavaş','Tavuk tantuni','Chicken tantuni wrap','Тантуни с курицей','Hähnchen-Tantuni','طنطوني دجاج'],
  ['cig_kofte_durum','sandvic',178,5.5,33,2.5,2.5,3.5,1,'adet:200','','','dürüm çiğ köfte etsiz lavaş yeşillik','Çiğ köfte dürüm','Vegan çiğ köfte wrap','Чи кёфте в лаваше','Çiğ-Köfte-Dürüm','لفافة تشي كفتة'],
  ['falafel_durum','sandvic',230,7.5,28,10,2,5,1,'adet:220','','','dürüm falafel humus wrap vegan','Falafel dürüm (humuslu)','Falafel wrap with hummus','Фалафель в лаваше с хумусом','Falafel-Wrap mit Hummus','لفافة فلافل بالحمص'],
  ['tavuk_wrap','sandvic',181,16,16,4.9,1.7,2.6,1,'adet:185','cd','','wrap dürüm tavuk sezar tortilla','Tavuklu sezar wrap (tam buğday)','Chicken Caesar wrap (whole-wheat)','Ролл «Цезарь» с курицей','Hähnchen-Caesar-Wrap (Vollkorn)','لفافة سيزر بالدجاج (قمح كامل)'],
  ['hindi_wrap','sandvic',161,9.6,17.8,4.8,2.1,3,1,'adet:170','cdt','','wrap dürüm hindi füme labne roka tortilla','Hindi füme wrap','Smoked turkey wrap','Ролл с копчёной индейкой','Putenbrust-Wrap','لفافة ديك رومي مدخن'],
  ['ton_wrap','sandvic',151,11,17.8,3.1,2.1,2.9,1,'adet:180','fdt','','wrap dürüm ton balığı tortilla','Ton balıklı wrap','Tuna wrap','Ролл с тунцом','Thunfisch-Wrap','لفافة تونة'],
  ['sebzeli_wrap','sandvic',149,5.1,20,4.7,2.3,4.7,1,'adet:180','','','wrap dürüm humus sebze vegan tortilla','Humuslu sebzeli wrap','Hummus & vegetable wrap','Ролл с хумусом и овощами','Hummus-Gemüse-Wrap','لفافة خضار بالحمص'],
  // Burger
  ['hamburger','sandvic',250,13,24,11,5,1.5,1,'adet:200','my','','burger hamburger köfte','Hamburger','Hamburger','Гамбургер','Hamburger','هامبرغر'],
  ['cheeseburger','sandvic',265,14,22,13.5,5,1.3,1,'adet:220','mdty','','burger cheeseburger peynirli','Cheeseburger','Cheeseburger','Чизбургер','Cheeseburger','تشيز برغر'],
  ['tavuk_burger','sandvic',200,15,22,6,4,1.8,1,'adet:200','c','','burger tavuk ızgara','Tavuk burger (ızgara)','Chicken burger (grilled)','Бургер с курицей (гриль)','Hähnchenburger (gegrillt)','برغر دجاج (مشوي)'],
  ['ev_burger','sandvic',190,15,18,6.5,3,3,1,'adet:220','m','','burger ev yapımı yağsız kıyma tam buğday','Ev yapımı burger (tam buğday, yağsız)','Homemade lean burger (whole-wheat)','Домашний бургер (постный, цельнозерновой)','Hausgemachter Burger (mager, Vollkorn)','برغر منزلي (قليل الدهن، قمح كامل)'],
  ['islak_burger','sandvic',290,11,30,14,4,1,1,'adet:120','my','','burger ıslak hamburger taksim','Islak hamburger','Wet burger (ıslak hamburger)','Мокрый бургер (ыслак)','Nasser Burger (Islak)','برغر مبلل (إسلاك)'],
  // Ekmek çeşitleri
  ['koy_ekmegi','tahil',250,8.5,48,2,2.5,4,1,'dilim:30','','','ekmek köy','Köy ekmeği','Village bread','Деревенский хлеб','Bauernbrot','خبز قروي'],
  ['kepekli_ekmek','tahil',240,10,43,3,3.5,7,2,'dilim:25','','','ekmek kepekli','Kepekli ekmek','Bran bread','Хлеб с отрубями','Kleiebrot','خبز بالنخالة'],
  ['karabugday_ekmegi','tahil',230,8,42,3,1.5,6,2,'dilim:30','','','ekmek karabuğday glutensiz','Karabuğday ekmeği','Buckwheat bread','Гречневый хлеб','Buchweizenbrot','خبز الحنطة السوداء'],
  ['glutensiz_ekmek','tahil',250,4,45,6,3,5,2,'dilim:30','','','ekmek glutensiz çölyak','Glutensiz ekmek','Gluten-free bread','Безглютеновый хлеб','Glutenfreies Brot','خبز خالٍ من الغلوتين'],
  ['ramazan_pidesi','tahil',270,9,53,2.5,2.5,2.3,1,'dilim:50','','','ekmek pide ramazan','Pide (Ramazan pidesi)','Turkish flatbread (pide)','Лепёшка пиде','Fladenbrot (Pide)','خبز بيدا'],
  ['baget','tahil',275,9,55,1.5,3,2.5,1,'dilim:30','','','ekmek baget','Baget ekmek','Baguette','Багет','Baguette','خبز باغيت'],
  ['ciabatta','tahil',270,9,52,3,1.5,2.4,1,'dilim:40','','','ekmek ciabatta','Ciabatta','Ciabatta','Чиабатта','Ciabatta','تشاباتا'],
  ['tost_ekmegi','tahil',265,9,49,3.5,5,2.7,2,'dilim:30','','','ekmek tost beyaz','Tost ekmeği (beyaz)','Sandwich bread (white)','Тостовый хлеб (белый)','Toastbrot (weiß)','خبز توست (أبيض)'],
  ['tam_tost_ekmegi','tahil',250,11,43,3.5,5,6,2,'dilim:30','','','ekmek tost tam buğday','Tam buğday tost ekmeği','Whole-wheat sandwich bread','Цельнозерновой тостовый хлеб','Vollkorn-Toastbrot','خبز توست (قمح كامل)'],
  ['hamburger_ekmegi','tahil',280,9.5,50,4.5,6,2.2,1,'adet:60','d','','ekmek hamburger burger susamlı','Hamburger ekmeği','Burger bun','Булочка для бургера','Burgerbrötchen','خبز برغر'],
  ['tortilla','tahil',300,9,50,7.5,2.5,7.5,1,'adet:60','','','ekmek tortilla wrap dürüm tam buğday','Tam buğday tortilla (wrap)','Whole-wheat tortilla (wrap)','Цельнозерновая тортилья','Vollkorn-Tortilla (Wrap)','تورتيلا قمح كامل'],
  // Poğaça, açma, çörek, simit
  ['sade_pogaca','hamur',380,8,45,18,3,1.5,1,'adet:60','dy','','poğaça sade kahvaltı','Sade poğaça','Plain poğaça','Погача (простая)','Poğaça (natur)','بوغاتشا سادة'],
  ['zeytinli_pogaca','hamur',370,7.5,42,19,2.5,2,1,'adet:70','dty','','poğaça zeytinli kahvaltı','Zeytinli poğaça','Olive poğaça','Погача с оливками','Oliven-Poğaça','بوغاتشا بالزيتون'],
  ['patatesli_pogaca','hamur',340,7,45,15,2.5,2,1,'adet:70','dy','','poğaça patatesli kahvaltı','Patatesli poğaça','Potato poğaça','Погача с картофелем','Kartoffel-Poğaça','بوغاتشا بالبطاطس'],
  ['tam_pogaca','hamur',320,10,38,14,2.5,4.5,1,'adet:70','d','','poğaça tam buğday peynirli fırın kahvaltı','Tam buğday poğaça (peynirli)','Whole-wheat cheese poğaça','Цельнозерновая погача с сыром','Vollkorn-Käse-Poğaça','بوغاتشا قمح كامل بالجبن'],
  ['bagel','hamur',275,10.5,53,2,6,2.3,1,'adet:100','','','bagel simit susamlı','Bagel (susamlı)','Sesame bagel','Бейгл с кунжутом','Sesam-Bagel','بيغل بالسمسم'],
  ['kandil_simidi','hamur',420,9,58,17,6,2,3,'adet:15','dy','','kandil simidi susamlı kurabiye','Kandil simidi','Kandil simidi (small sesame rings)','Кандиль-симит (маленькие бублики)','Kandil Simidi (kleine Sesamringe)','كعك القنديل بالسمسم'],
  ['hashasli_corek','hamur',420,8.5,52,20,18,2.5,1,'adet:80','y','','çörek haşhaşlı','Haşhaşlı çörek','Poppy seed pastry (haşhaşlı çörek)','Булочка с маком','Mohngebäck (Haşhaşlı Çörek)','كعكة بالخشخاش'],
  ['tahinli_corek','hamur',430,9,54,20,20,3,1,'adet:80','y','','çörek tahinli','Tahinli çörek','Tahini pastry (tahinli çörek)','Булочка с тахини','Tahin-Gebäck','كعكة بالطحينة'],
  ['ay_coregi','hamur',400,7,52,18,20,2.5,1,'adet:90','dy','','çörek ay çöreği cevizli üzümlü','Ay çöreği','Crescent pastry with walnuts (ay çöreği)','Ай-чёреги (рогалик с орехами)','Ay Çöreği (Walnuss-Hörnchen)','كعكة الهلال بالجوز'],
  ['kruvasan','hamur',406,8,46,21,11,2.6,1,'adet:60','dy','','kruvasan croissant tereyağlı','Kruvasan (sade)','Croissant (plain)','Круассан','Croissant','كرواسون'],
  ['kruvasan_peynir','hamur',390,11,38,22,7,2,1,'adet:80','dy','','kruvasan croissant peynirli','Peynirli kruvasan','Cheese croissant','Круассан с сыром','Käse-Croissant','كرواسون بالجبن'],
  // Börek
  ['kol_boregi','hamur',290,9,28,16,2,1.2,150,'','dy','','börek kol peynirli fırın','Kol böreği (peynirli)','Rolled cheese börek (kol böreği)','Рулет-бёрек с сыром','Käse-Börek-Rolle','بوريك ملفوف بالجبن'],
  ['tavuklu_borek','hamur',240,11,24,11,2,1,150,'','cd','','börek tavuk fırın','Tavuklu börek','Chicken börek','Бёрек с курицей','Hähnchen-Börek','بوريك بالدجاج'],
  ['pirasali_borek','hamur',220,6.5,26,10,3,2,150,'','d','','börek pırasa fırın','Pırasalı börek','Leek börek','Бёрек с луком-пореем','Lauch-Börek','بوريك بالكراث'],
  ['talas_boregi','hamur',330,10,27,20,1.5,1.2,1,'adet:100','my','','börek talaş kıymalı milföy','Talaş böreği (kıymalı)','Puff pastry with minced meat (talaş böreği)','Талаш-бёрек с фаршем','Blätterteig mit Hackfleisch (Talaş Böreği)','بوريك تالاش باللحم المفروم'],
  ['pacanga','hamur',320,13,25,19,1.5,1,2,'adet:60','mdty','','börek paçanga pastırma kaşar kızartma','Paçanga böreği','Pastırma & cheese börek (paçanga)','Пачанга-бёрек','Paçanga-Börek','بوريك باتشانغا'],
  ['cig_borek','hamur',330,10,30,19,1,1.2,1,'adet:100','my','','börek çiğ börek kıymalı kızartma','Çiğ börek','Fried meat pastry (çiğ börek)','Чебурек','Çiğ Börek (frittierte Teigtasche)','بوريك مقلي باللحم'],
  ['sigara_kizartma','hamur',320,8.5,27,20,2,1,3,'adet:30','dy','','börek sigara peynir kızartma','Sigara böreği (kızartma)','Cheese rolls (fried)','Сигара-бёрек (жареный)','Zigarren-Börek (frittiert)','بوريك سيجارة (مقلي)'],
  // Gözleme, pişi, katmer, krep
  ['gozleme_kiyma','hamur',250,11,30,9.5,1.5,1.5,200,'','m','','gözleme kıymalı','Kıymalı gözleme','Minced meat gözleme','Гёзлеме с фаршем','Gözleme mit Hackfleisch','جوزليمة باللحم المفروم'],
  ['gozleme_ispanak','hamur',220,9,29,7.5,1.5,2.5,200,'','d','','gözleme ıspanaklı peynirli','Ispanaklı peynirli gözleme','Spinach & cheese gözleme','Гёзлеме со шпинатом и сыром','Gözleme mit Spinat & Käse','جوزليمة بالسبانخ والجبن'],
  ['pisi','hamur',350,7,45,16,2,1.5,2,'adet:50','y','','pişi hamur kızartma kahvaltı','Pişi','Fried dough (pişi)','Пиши (жареные лепёшки)','Pişi (frittierter Teig)','بيشي (عجين مقلي)'],
  ['katmer','hamur',380,7.5,45,19,2,1.5,1,'adet:100','dy','','katmer tereyağlı hamur kahvaltı','Katmer (tereyağlı)','Layered butter flatbread (katmer)','Катмер (слоёная лепёшка)','Katmer (Butter-Fladen)','خبز كاتمر بالزبدة'],
  ['krep','hamur',220,7,28,9,5,0.8,2,'adet:60','ed','','krep pankek kahvaltı','Krep (sade)','Crêpe (plain)','Блинчик','Crêpe (natur)','كريب سادة'],
  // Pide & pizza
  ['pide_sucuklu','hamur',290,13,29,13.5,2,1.3,3,'dilim:60','mdty','','pide sucuklu kaşarlı','Sucuklu kaşarlı pide','Sucuk & cheese pide','Пиде с суджуком и сыром','Pide mit Sucuk & Käse','بيدا بالسجق والجبن'],
  ['pide_yumurtali','hamur',285,12,30,13,2,1.2,3,'dilim:60','edty','','pide yumurtalı kaşarlı karadeniz','Yumurtalı kaşarlı pide','Egg & cheese pide (Black Sea style)','Пиде с яйцом и сыром','Pide mit Ei & Käse','بيدا بالبيض والجبن'],
  ['pide_ispanakli','hamur',220,8,30,7.5,2,2.5,3,'dilim:60','d','','pide ıspanaklı peynirli','Ispanaklı pide','Spinach pide','Пиде со шпинатом','Spinat-Pide','بيدا بالسبانخ'],
  ['pide_tavuklu','hamur',230,14,29,6.5,2,1.5,3,'dilim:60','cd','','pide tavuklu kaşarlı','Tavuklu pide','Chicken pide','Пиде с курицей','Hähnchen-Pide','بيدا بالدجاج'],
  ['pizza_karisik','hamur',270,11,30,11.5,3.5,2,2,'dilim:100','mdty','','pizza karışık sucuk sosis','Pizza (karışık)','Pizza (mixed toppings)','Пицца (ассорти)','Pizza (gemischt)','بيتزا مشكلة'],
  ['pizza_margarita','hamur',250,10.5,31,9.5,3.5,1.8,2,'dilim:100','dt','','pizza margarita mozzarella','Pizza (margarita)','Pizza (margherita)','Пицца «Маргарита»','Pizza Margherita','بيتزا مارغريتا'],
  ['pizza_tavuklu','hamur',245,13,29,8.5,3,2,2,'dilim:100','cd','','pizza tavuklu','Tavuklu pizza','Chicken pizza','Пицца с курицей','Hähnchen-Pizza','بيتزا بالدجاج'],
  ['pizza_sebzeli','hamur',210,9.5,28,7,3.5,4,2,'dilim:100','d','','pizza sebzeli tam buğday','Sebzeli pizza (tam buğday)','Vegetable pizza (whole-wheat)','Овощная пицца (цельнозерновая)','Gemüsepizza (Vollkorn)','بيتزا خضار (قمح كامل)']
);
Object.assign(ALERJEN_EK, {
  peynirli_sandvic:'gluten,bugday,sut,domates,salatalik', kasarli_sandvic:'gluten,bugday,sut,domates', lorlu_sandvic:'gluten,bugday,sut,domates', yumurtali_sandvic:'gluten,bugday,yumurta,domates',
  avokadolu_sandvic:'gluten,bugday,avokado,yumurta', hindi_sandvic:'gluten,bugday,hindi,sut,domates', tavuk_sandvic:'gluten,bugday,tavuk,sut,domates', ton_sandvic:'gluten,bugday,balik,misir,yumurta,domates',
  somonlu_sandvic:'gluten,cavdar,bugday,balik,sut', hellimli_sandvic:'gluten,bugday,sut,domates', pastirmali_sandvic:'gluten,bugday,kirmizi,sut,sarimsak,biber', fistik_muz_sandvic:'gluten,bugday,yerfistigi,muz',
  caprese_sandvic:'gluten,bugday,sut,domates,zeytin', tavuk_panini:'gluten,bugday,tavuk,sut,domates', kulup_sandvic:'gluten,bugday,tavuk,hindi,sut,yumurta,domates', kofte_ekmek:'gluten,bugday,kirmizi,yumurta,sogan,kimyon,domates',
  balik_ekmek:'gluten,bugday,balik,sogan', kokorec:'gluten,bugday,kirmizi,domates,biber,kimyon', kumru:'gluten,bugday,susam,sut,kirmizi,domates,biber,sarimsak', sosisli:'gluten,bugday,kirmizi,domates,hardal,yumurta',
  tost_beyaz:'gluten,bugday,sut', sucuklu_tost:'gluten,bugday,kirmizi,sarimsak,kimyon,biber', ayvalik_tostu:'gluten,bugday,sut,kirmizi,domates,yumurta,salatalik,sarimsak', bazlama_tost:'gluten,bugday,sut',
  tavuk_doner_durum:'gluten,bugday,tavuk,sut,domates,biber,sarimsak', et_doner_durum:'gluten,bugday,kirmizi,domates,sogan', tavuk_doner_ekmek:'gluten,bugday,tavuk,sut,domates,biber,sarimsak', et_doner_ekmek:'gluten,bugday,kirmizi,domates,sogan',
  adana_durum:'gluten,bugday,kirmizi,biber,sogan,domates', tantuni:'gluten,bugday,kirmizi,domates,sogan,biber', tavuk_tantuni:'gluten,bugday,tavuk,domates,sogan,biber', cig_kofte_durum:'gluten,bugday,biber,sogan,domates',
  falafel_durum:'gluten,bugday,nohut,susam,sarimsak,sogan,domates', tavuk_wrap:'gluten,bugday,tavuk,sut,sarimsak', hindi_wrap:'gluten,bugday,hindi,sut,domates', ton_wrap:'gluten,bugday,balik,sut,misir',
  sebzeli_wrap:'gluten,bugday,nohut,susam,sarimsak,domates,salatalik', hamburger:'gluten,bugday,susam,kirmizi,domates,sogan,yumurta,hardal', cheeseburger:'gluten,bugday,susam,kirmizi,sut,domates,sogan,yumurta,hardal',
  tavuk_burger:'gluten,bugday,susam,tavuk,domates,yumurta', ev_burger:'gluten,bugday,kirmizi,domates,sogan', islak_burger:'gluten,bugday,kirmizi,domates,sarimsak',
  koy_ekmegi:'gluten,bugday', kepekli_ekmek:'gluten,bugday', karabugday_ekmegi:'', glutensiz_ekmek:'pirinc,misir', ramazan_pidesi:'gluten,bugday,susam,yumurta', baget:'gluten,bugday', ciabatta:'gluten,bugday,zeytin',
  tost_ekmegi:'gluten,bugday', tam_tost_ekmegi:'gluten,bugday', hamburger_ekmegi:'gluten,bugday,susam,sut', tortilla:'gluten,bugday',
  sade_pogaca:'gluten,bugday,sut,yumurta', zeytinli_pogaca:'gluten,bugday,sut,yumurta,zeytin', patatesli_pogaca:'gluten,bugday,sut,yumurta,patates', tam_pogaca:'gluten,bugday,sut,yumurta', bagel:'gluten,bugday,susam',
  kandil_simidi:'gluten,bugday,susam,sut,yumurta', hashasli_corek:'gluten,bugday,sut,yumurta', tahinli_corek:'gluten,bugday,susam,sut,yumurta', ay_coregi:'gluten,bugday,ceviz,kuruyemis,uzum,sut,yumurta,tarcin',
  kruvasan:'gluten,bugday,sut,yumurta', kruvasan_peynir:'gluten,bugday,sut,yumurta', kol_boregi:'gluten,bugday,sut,yumurta', tavuklu_borek:'gluten,bugday,tavuk,sut,yumurta,sogan', pirasali_borek:'gluten,bugday,sut,yumurta,sogan',
  talas_boregi:'gluten,bugday,kirmizi,sogan,sut,yumurta', pacanga:'gluten,bugday,kirmizi,sut,sarimsak,biber', cig_borek:'gluten,bugday,kirmizi,sogan', sigara_kizartma:'gluten,bugday,sut',
  gozleme_kiyma:'gluten,bugday,kirmizi,sogan', gozleme_ispanak:'gluten,bugday,ispanak,sut,sogan', pisi:'gluten,bugday', katmer:'gluten,bugday,sut', krep:'gluten,bugday,yumurta,sut',
  pide_sucuklu:'gluten,bugday,sut,kirmizi,sarimsak,kimyon,biber', pide_yumurtali:'gluten,bugday,sut,yumurta', pide_ispanakli:'gluten,bugday,ispanak,sut,sogan', pide_tavuklu:'gluten,bugday,tavuk,sut,domates,biber',
  pizza_karisik:'gluten,bugday,sut,kirmizi,domates,biber,mantar,zeytin', pizza_margarita:'gluten,bugday,sut,domates', pizza_tavuklu:'gluten,bugday,sut,tavuk,domates,biber,mantar', pizza_sebzeli:'gluten,bugday,sut,domates,biber,mantar,zeytin,sogan'
});
DOKTOR_DISI_EK.push('kulup_sandvic','kofte_ekmek','kokorec','kumru','sosisli','tost_beyaz','sucuklu_tost','ayvalik_tostu','et_doner_durum','et_doner_ekmek','adana_durum','hamburger','cheeseburger','islak_burger',
  'pacanga','talas_boregi','cig_borek','sigara_kizartma','pisi','katmer','pide_sucuklu','pizza_karisik','pizza_margarita','kruvasan','kruvasan_peynir','kandil_simidi','hashasli_corek','tahinli_corek','ay_coregi');
HAMILE_DISI_EK.push('ton_sandvic','ton_wrap','somonlu_sandvic','pastirmali_sandvic','pacanga','kokorec');
