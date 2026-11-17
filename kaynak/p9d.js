// ---------- Sürüm 13 (17.11.2026): Takip merkezi — tercih sıralaması, uyum skoru, seri ve rozetler, besin öğeleri (mikro),
// vücut ölçüleri + ilerleme fotoğrafı, tansiyon / kan şekeri günlüğü, ilaç-takviye hatırlatıcısı, adım-uyku (Sağlık uygulaması),
// alınan antrenman programının kaydı, Android geri tuşu.
// TÜM VERİ CİHAZDA (D içinde; fotoğraflar ayrı IndexedDB 'lr_foto'). Sunucuya hiçbir şey gitmez. Sağlık değerleri yalnız bilgi amaçlıdır,
// tanı koymaz; sınıflamalar genel yetişkin kılavuzlarına dayanır (ESC/ESH 2023 tansiyon, ADA 2024 kan şekeri, WHO bel/kalça) ve
// her yerde "tıbbi tavsiye değildir, hekiminize danışın" notu bulunur.
Object.assign(S, {
  tkBtn:["Takip","Tracking","Трекинг","Verlauf","المتابعة"],
  tkTitle:["İlerlemen ve sağlığın","Your progress and health","Твой прогресс и здоровье","Dein Fortschritt und deine Gesundheit","تقدّمك وصحتك"],
  tkIntro:["Ölçülerin, sağlık değerlerin, hareketin ve rozetlerin burada. Tüm kayıtlar yalnız bu cihazda saklanır.","Your measurements, health values, activity and badges live here. Everything is stored only on this device.","Здесь твои замеры, показатели здоровья, активность и награды. Всё хранится только на этом устройстве.","Hier findest du Maße, Gesundheitswerte, Bewegung und Abzeichen. Alles wird nur auf diesem Gerät gespeichert.","هنا قياساتك وقيمك الصحية ونشاطك وشاراتك. تُحفظ جميع السجلات على هذا الجهاز فقط."],
  tkS_ozet:["Özet","Overview","Обзор","Übersicht","ملخص"],
  tkS_olcu:["Ölçüler","Measurements","Замеры","Maße","القياسات"],
  tkS_saglik:["Sağlık","Health","Здоровье","Gesundheit","الصحة"],
  tkS_aktivite:["Hareket ve uyku","Activity & sleep","Активность и сон","Bewegung & Schlaf","النشاط والنوم"],
  tkS_besin:["Besin öğeleri","Nutrients","Нутриенты","Nährstoffe","العناصر الغذائية"],
  tkS_rapor:["Rapor gönder","Send report","Отправить отчёт","Bericht senden","إرسال تقرير"],
  tkS_rozet:["Rozetler","Badges","Награды","Abzeichen","الشارات"],
  bu_mg:["mg","mg","мг","mg","ملغ"], bu_mcg:["µg","µg","мкг","µg","مكغ"], bu_g:["g","g","г","g","غ"],
  tkNot:["Bu bilgiler tanı ya da tedavi önerisi değildir. Sağlığınızla ilgili kararlar için hekiminize veya diyetisyeninize danışın.","This is not a diagnosis or treatment advice. Talk to your doctor or dietitian about health decisions.","Это не диагноз и не рекомендация по лечению. По вопросам здоровья обращайтесь к врачу или диетологу.","Dies ist keine Diagnose und keine Behandlungsempfehlung. Sprich bei Gesundheitsfragen mit deiner Ärztin, deinem Arzt oder deiner Ernährungsberatung.","هذه المعلومات ليست تشخيصًا ولا توصية علاجية. استشر طبيبك أو أخصائي التغذية في القرارات الصحية."],
  // Özet
  tkSeri:["Seri","Streak","Серия","Serie","السلسلة"],
  tkSeriN:["{n} gün","{n} days","{n} дн.","{n} Tage","{n} يوم"],
  tkSeriEn:["En uzun: {n} gün","Longest: {n} days","Рекорд: {n} дн.","Längste: {n} Tage","الأطول: {n} يوم"],
  tkSeriIpucu:["Her gün en az bir kayıt (öğün, su, tartı) seriyi sürdürür.","Log at least one thing a day (meal, water, weight) to keep the streak.","Хотя бы одна запись в день (еда, вода, вес) продлевает серию.","Mindestens ein Eintrag pro Tag (Mahlzeit, Wasser, Gewicht) hält die Serie.","سجّل شيئًا واحدًا على الأقل يوميًا (وجبة، ماء، وزن) لتستمر السلسلة."],
  tkUyum:["Plana uyum","Plan adherence","Соблюдение плана","Planeinhaltung","الالتزام بالخطة"],
  tkUyumBugun:["Bugün","Today","Сегодня","Heute","اليوم"],
  tkUyum7:["Son 7 gün ort.","7-day avg.","Среднее за 7 дней","Ø 7 Tage","متوسط 7 أيام"],
  tkUyumIpucu:["Yenen öğün oranı, kalori hedefine yakınlık ve su hedefinden hesaplanır.","Based on meals eaten, closeness to your calorie target and water.","Учитываются съеденные приёмы пищи, близость к цели по калориям и вода.","Aus gegessenen Mahlzeiten, Nähe zum Kalorienziel und Wasser berechnet.","يُحسب من الوجبات المتناولة والقرب من هدف السعرات والماء."],
  tkKilo:["Kilo","Weight","Вес","Gewicht","الوزن"],
  tkKiloYok:["Henüz tartı kaydı yok","No weigh-ins yet","Пока нет взвешиваний","Noch keine Wiegungen","لا توجد أوزان بعد"],
  tk30:["30 günde {f}","{f} in 30 days","{f} за 30 дней","{f} in 30 Tagen","{f} خلال 30 يومًا"],
  tkHizli:["Hızlı erişim","Quick access","Быстрый доступ","Schnellzugriff","وصول سريع"],
  tkRaporBtn:["📤 Diyetisyenine / antrenörüne rapor gönder","📤 Send a report to your dietitian / coach","📤 Отправить отчёт диетологу / тренеру","📤 Bericht an Ernährungsberatung / Coach senden","📤 أرسل تقريرًا إلى أخصائي التغذية / المدرب"],
  // Ölçüler
  tkKiloGrafik:["Kilo değişimi","Weight trend","Динамика веса","Gewichtsverlauf","تغيّر الوزن"],
  tkTartiEkle:["Bugünkü kilonu yaz","Enter today's weight","Введи сегодняшний вес","Heutiges Gewicht eingeben","أدخل وزن اليوم"],
  tkKaydet:["Kaydet","Save","Сохранить","Speichern","حفظ"],
  tkOlcuT:["Vücut ölçüleri (cm)","Body measurements (cm)","Объёмы тела (см)","Körpermaße (cm)","قياسات الجسم (سم)"],
  tkOlcuIpucu:["Mezurayla, sabah aç karnına, aynı noktalardan ölç. Boş bıraktıkların kaydedilmez.","Measure with a tape in the morning before eating, at the same spots. Empty fields are skipped.","Измеряй лентой утром натощак в одних и тех же местах. Пустые поля не сохраняются.","Morgens nüchtern mit dem Maßband an denselben Stellen messen. Leere Felder werden übersprungen.","قِس بشريط القياس صباحًا قبل الأكل وفي النقاط نفسها. لا تُحفظ الحقول الفارغة."],
  o_bel:["Bel","Waist","Талия","Taille","الخصر"],
  o_kalca:["Kalça","Hips","Бёдра","Hüfte","الورك"],
  o_boyun:["Boyun","Neck","Шея","Hals","الرقبة"],
  o_gogus:["Göğüs","Chest","Грудь","Brust","الصدر"],
  o_kol:["Kol","Arm","Рука","Oberarm","الذراع"],
  o_bacak:["Uyluk","Thigh","Бедро","Oberschenkel","الفخذ"],
  o_yag:["Yağ oranı (%)","Body fat (%)","Жир (%)","Körperfett (%)","نسبة الدهون (%)"],
  tkBKO:["Bel / kalça oranı","Waist-to-hip ratio","Талия / бёдра","Taille-Hüft-Verhältnis","نسبة الخصر إلى الورك"],
  tkBBO:["Bel / boy oranı","Waist-to-height ratio","Талия / рост","Taille-Größe-Verhältnis","نسبة الخصر إلى الطول"],
  tkNavy:["Tahmini yağ oranı (ABD Donanması yöntemi)","Estimated body fat (US Navy method)","Оценка % жира (метод ВМС США)","Geschätztes Körperfett (US-Navy-Methode)","نسبة الدهون التقديرية (طريقة البحرية الأمريكية)"],
  tkRiskYok:["Önerilen aralıkta","Within the recommended range","В рекомендуемых пределах","Im empfohlenen Bereich","ضمن النطاق الموصى به"],
  tkRiskVar:["Önerilen sınırın üstünde (WHO) — hekiminle konuşabilirsin","Above the recommended limit (WHO) — consider talking to your doctor","Выше рекомендуемого (ВОЗ) — стоит обсудить с врачом","Über dem empfohlenen Grenzwert (WHO) — sprich ggf. mit deiner Ärztin/deinem Arzt","أعلى من الحد الموصى به (منظمة الصحة العالمية) — يمكنك التحدث مع طبيبك"],
  tkOlcuGecmis:["Ölçü geçmişi","Measurement history","История замеров","Messverlauf","سجل القياسات"],
  tkSil:["Sil","Delete","Удалить","Löschen","حذف"],
  tkSilOnay:["Bu kayıt silinsin mi?","Delete this entry?","Удалить эту запись?","Diesen Eintrag löschen?","هل تريد حذف هذا السجل؟"],
  tkFotoT:["İlerleme fotoğrafları","Progress photos","Фото прогресса","Fortschrittsfotos","صور التقدم"],
  tkFotoIpucu:["Aynı ışıkta, aynı açıdan çek; fotoğraflar yalnız bu cihazda kalır.","Same light, same angle; photos stay on this device only.","Одинаковый свет и ракурс; фото остаются только на устройстве.","Gleiches Licht, gleicher Winkel; die Fotos bleiben nur auf diesem Gerät.","التقط الصورة بالإضاءة والزاوية نفسيهما؛ تبقى الصور على هذا الجهاز فقط."],
  tkFotoEkle:["📸 Fotoğraf ekle","📸 Add photo","📸 Добавить фото","📸 Foto hinzufügen","📸 إضافة صورة"],
  tkFotoKarsilastir:["İlk ve son","First vs latest","Первое и последнее","Erstes vs. letztes","الأولى والأخيرة"],
  tkFotoYok:["Henüz fotoğraf yok","No photos yet","Пока нет фото","Noch keine Fotos","لا توجد صور بعد"],
  // Sağlık
  tkTansiyon:["Tansiyon","Blood pressure","Давление","Blutdruck","ضغط الدم"],
  tkBuyuk:["Büyük (sistolik)","Systolic","Верхнее","Systolisch","الانقباضي"],
  tkKucuk:["Küçük (diyastolik)","Diastolic","Нижнее","Diastolisch","الانبساطي"],
  tkNabiz:["Nabız","Pulse","Пульс","Puls","النبض"],
  bp0:["İdeal","Optimal","Оптимальное","Optimal","مثالي"],
  bp1:["Normal","Normal","Нормальное","Normal","طبيعي"],
  bp2:["Yüksek-normal","High-normal","Высокое нормальное","Hoch-normal","طبيعي مرتفع"],
  bp3:["Yüksek (1. derece)","High (grade 1)","Высокое (1 ст.)","Erhöht (Grad 1)","مرتفع (الدرجة 1)"],
  bp4:["Yüksek (2. derece)","High (grade 2)","Высокое (2 ст.)","Erhöht (Grad 2)","مرتفع (الدرجة 2)"],
  bp5:["Çok yüksek","Very high","Очень высокое","Sehr hoch","مرتفع جدًا"],
  bpDusuk:["Düşük","Low","Низкое","Niedrig","منخفض"],
  bpAcil:["Çok yüksek değer: birkaç dakika dinlenip yeniden ölç. Göğüs ağrısı, nefes darlığı, bulanık görme gibi şikâyetin varsa hemen acil yardım çağır.","Very high reading: rest a few minutes and measure again. If you have chest pain, shortness of breath or blurred vision, call emergency services now.","Очень высокое значение: отдохни несколько минут и измерь снова. При боли в груди, одышке или нарушении зрения срочно вызови скорую.","Sehr hoher Wert: einige Minuten ruhen und erneut messen. Bei Brustschmerzen, Atemnot oder Sehstörungen sofort den Notruf wählen.","قراءة مرتفعة جدًا: استرح بضع دقائق ثم أعد القياس. إذا شعرت بألم في الصدر أو ضيق تنفس أو تشوش رؤية فاتصل بالطوارئ فورًا."],
  tkSeker:["Kan şekeri","Blood glucose","Сахар крови","Blutzucker","سكر الدم"],
  tkSekerZ_ac:["Açlık","Fasting","Натощак","Nüchtern","صائم"],
  tkSekerZ_tok:["Yemekten 2 sa sonra","2 h after meal","Через 2 ч после еды","2 Std. nach dem Essen","بعد الأكل بساعتين"],
  tkSekerZ_rast:["Rastgele","Random","В любое время","Zufällig","عشوائي"],
  gl0:["Hedef aralıkta","In target range","В целевом диапазоне","Im Zielbereich","ضمن النطاق المستهدف"],
  gl1:["Sınırda yüksek","Borderline high","Пограничное","Grenzwertig hoch","مرتفع حدّيًا"],
  gl2:["Yüksek","High","Высокое","Hoch","مرتفع"],
  glDusuk:["Düşük","Low","Низкое","Niedrig","منخفض"],
  glDusukNot:["Düşük değer: belirtin (titreme, terleme, baş dönmesi) varsa hekiminin önerdiği şekilde hızlı şeker al ve 15 dk sonra yeniden ölç.","Low reading: if you have symptoms (shaking, sweating, dizziness), take fast sugar as your doctor advised and re-check after 15 min.","Низкое значение: при симптомах (дрожь, пот, головокружение) прими быстрые углеводы, как советовал врач, и перепроверь через 15 мин.","Niedriger Wert: Bei Beschwerden (Zittern, Schwitzen, Schwindel) wie ärztlich empfohlen schnellen Zucker nehmen und nach 15 Min. erneut messen.","قراءة منخفضة: إذا ظهرت أعراض (رجفة، تعرّق، دوخة) فتناول سكرًا سريعًا كما نصحك طبيبك وأعد القياس بعد 15 دقيقة."],
  tkBirim:["Birim","Unit","Единицы","Einheit","الوحدة"],
  tkIlac:["İlaç ve takviyeler","Medicines & supplements","Лекарства и добавки","Medikamente & Ergänzungen","الأدوية والمكملات"],
  tkIlacAd:["Ad","Name","Название","Name","الاسم"],
  tkIlacDoz:["Doz / not","Dose / note","Доза / заметка","Dosis / Notiz","الجرعة / ملاحظة"],
  tkIlacSaat:["Saat","Time","Время","Uhrzeit","الوقت"],
  tkIlacEkle:["＋ Ekle","＋ Add","＋ Добавить","＋ Hinzufügen","＋ إضافة"],
  tkIlacHat:["Hatırlat","Remind me","Напоминать","Erinnern","ذكّرني"],
  tkIlacAlindi:["Alındı","Taken","Принято","Genommen","تم التناول"],
  tkIlacYok:["Liste boş. Hekiminin önerdiği ilaçları ve takviyeleri saatleriyle ekleyebilirsin.","Empty. Add the medicines and supplements your doctor recommended, with their times.","Список пуст. Добавь лекарства и добавки, назначенные врачом, со временем приёма.","Leer. Füge die ärztlich empfohlenen Medikamente und Ergänzungen mit Uhrzeit hinzu.","القائمة فارغة. أضف الأدوية والمكملات التي أوصى بها طبيبك مع أوقاتها."],
  tkIlacNot:["Uygulama dozu değiştirmez ve ilaç önermez; yalnız hatırlatır.","The app never changes doses or recommends medicines; it only reminds you.","Приложение не меняет дозы и не рекомендует лекарства — только напоминает.","Die App ändert keine Dosen und empfiehlt keine Medikamente – sie erinnert nur.","لا يغيّر التطبيق الجرعات ولا يوصي بأدوية؛ إنه يذكّرك فقط."],
  tkIlacBildirim:["{ad} zamanı","Time for {ad}","Пора: {ad}","Zeit für {ad}","حان وقت {ad}"],
  tkWebBildirim:["Hatırlatıcılar telefon uygulamasında çalışır.","Reminders work in the phone app.","Напоминания работают в мобильном приложении.","Erinnerungen funktionieren in der Handy-App.","تعمل التذكيرات في تطبيق الهاتف."],
  tkSaat:["Saat","Time","Время","Uhrzeit","الوقت"],
  tkGecmis:["Son kayıtlar","Recent entries","Последние записи","Letzte Einträge","آخر السجلات"],
  tkBos:["Henüz kayıt yok","No entries yet","Пока нет записей","Noch keine Einträge","لا توجد سجلات بعد"],
  // Aktivite
  tkAdim:["Adım","Steps","Шаги","Schritte","الخطوات"],
  tkAdimHedef:["Hedef {n}","Goal {n}","Цель {n}","Ziel {n}","الهدف {n}"],
  tkUyku:["Uyku (saat)","Sleep (hours)","Сон (часы)","Schlaf (Std.)","النوم (ساعات)"],
  tkUykuIpucu:["Yetişkinler için önerilen: 7–9 saat","Recommended for adults: 7–9 hours","Рекомендуется взрослым: 7–9 часов","Empfohlen für Erwachsene: 7–9 Stunden","الموصى به للبالغين: 7–9 ساعات"],
  tkSaglikAl:["❤️ Sağlık uygulamasından al","❤️ Import from Health","❤️ Загрузить из «Здоровья»","❤️ Aus Health übernehmen","❤️ استيراد من تطبيق الصحة"],
  tkSaglikAlA:["❤️ Health Connect'ten al","❤️ Import from Health Connect","❤️ Загрузить из Health Connect","❤️ Aus Health Connect übernehmen","❤️ استيراد من Health Connect"],
  tkSaglikNot:["Adım, uyku ve kilo yalnız okunur; cihazından çıkmaz, reklamda kullanılmaz.","Steps, sleep and weight are read only; they never leave your device and are never used for ads.","Шаги, сон и вес только считываются, не покидают устройство и не используются для рекламы.","Schritte, Schlaf und Gewicht werden nur gelesen, verlassen dein Gerät nicht und dienen nicht der Werbung.","تُقرأ الخطوات والنوم والوزن فقط؛ لا تغادر جهازك ولا تُستخدم للإعلانات."],
  tkSaglikTamam:["{a} gün adım, {u} gün uyku, {k} tartı alındı","Imported {a} days of steps, {u} of sleep, {k} weigh-ins","Загружено: шаги за {a} дн., сон за {u} дн., взвешиваний: {k}","Übernommen: {a} Tage Schritte, {u} Schlaf, {k} Wiegungen","تم استيراد خطوات {a} يوم، ونوم {u} يوم، و{k} وزن"],
  tkSaglikYok:["Bu cihazda sağlık verisi kaynağı bulunamadı.","No health data source on this device.","На устройстве нет источника данных о здоровье.","Keine Gesundheitsdatenquelle auf diesem Gerät.","لا يوجد مصدر بيانات صحية على هذا الجهاز."],
  tkSaglikIzin:["İzin verilmedi. Ayarlardan izin verebilirsin.","Permission not granted. You can allow it in Settings.","Разрешение не выдано. Его можно дать в настройках.","Keine Berechtigung. Du kannst sie in den Einstellungen erteilen.","لم يُمنح الإذن. يمكنك منحه من الإعدادات."],
  tkSon14:["Son 14 gün","Last 14 days","Последние 14 дней","Letzte 14 Tage","آخر 14 يومًا"],
  tkAnt:["Antrenman programın","Your workout plan","Твоя программа тренировок","Dein Trainingsplan","برنامجك التدريبي"],
  tkAntYok:["Antrenörün sana antrenman bağlantısı gönderdiğinde program burada görünür.","When your coach sends you a workout link, the plan appears here.","Когда тренер пришлёт ссылку на программу, она появится здесь.","Wenn dein Coach dir einen Trainingslink schickt, erscheint der Plan hier.","عندما يرسل لك مدربك رابط برنامج تدريبي سيظهر هنا."],
  tkAntBugun:["Bugün: {ad}","Today: {ad}","Сегодня: {ad}","Heute: {ad}","اليوم: {ad}"],
  tkAntDinlenme:["Bugün programında antrenman yok — dinlenme günü.","No workout scheduled today — rest day.","Сегодня тренировки нет — день отдыха.","Heute kein Training geplant – Ruhetag.","لا يوجد تمرين اليوم — يوم راحة."],
  tkAntYapilan:["Yaptığın","Done","Сделано","Gemacht","المنجز"],
  tkAntRekor:["Kişisel rekorlar","Personal records","Личные рекорды","Persönliche Rekorde","الأرقام الشخصية"],
  tkAntTamam:["✓ Antrenman kaydedildi","✓ Workout saved","✓ Тренировка сохранена","✓ Training gespeichert","✓ تم حفظ التمرين"],
  tkAntKaldir:["Programı kaldır","Remove plan","Удалить программу","Plan entfernen","إزالة البرنامج"],
  tkSet:["set","sets","подх.","Sätze","مجموعات"],
  tkTekrar:["tekrar","reps","повт.","Wdh.","تكرار"],
  tkDinlenme:["dinlenme {n} sn","rest {n} s","отдых {n} с","Pause {n} s","راحة {n} ث"],
  // Besin öğeleri
  tkBesinGun:["Bugün","Today","Сегодня","Heute","اليوم"],
  tkBesin7:["Son 7 gün ort.","7-day average","Среднее за 7 дней","Ø 7 Tage","متوسط 7 أيام"],
  tkBesinRef:["Referans","Reference","Норма","Referenz","المرجع"],
  tkBesinNot:["Değerler yenen öğünlerden hesaplanan TAHMİNDİR (USDA FoodData Central verisi). Referanslar yetişkinler için EFSA / WHO değerleridir; gebelik, emzirme ve hastalıklarda ihtiyaç farklıdır.","Values are ESTIMATES calculated from the meals you ate (USDA FoodData Central data). References are EFSA / WHO adult values; needs differ in pregnancy, breastfeeding and illness.","Значения — ОЦЕНКА по съеденным блюдам (данные USDA FoodData Central). Нормы — значения EFSA / ВОЗ для взрослых; при беременности, кормлении и болезнях потребности другие.","Die Werte sind SCHÄTZUNGEN aus deinen gegessenen Mahlzeiten (Daten: USDA FoodData Central). Referenzen: EFSA/WHO-Werte für Erwachsene; in Schwangerschaft, Stillzeit und bei Krankheit gilt anderes.","القيم تقديرية محسوبة من الوجبات التي تناولتها (بيانات USDA FoodData Central). المراجع قيم EFSA / منظمة الصحة العالمية للبالغين؛ تختلف الاحتياجات في الحمل والرضاعة والمرض."],
  tkBesinYok:["Bu dönemde yenen öğün işaretlenmemiş.","No meals marked as eaten in this period.","В этот период нет отмеченных приёмов пищи.","In diesem Zeitraum keine gegessenen Mahlzeiten markiert.","لا توجد وجبات مُعلّمة كمتناولة في هذه الفترة."],
  tkUstSinir:["üst sınır","upper limit","верхний предел","Obergrenze","الحد الأعلى"],
  mk_na:["Sodyum","Sodium","Натрий","Natrium","الصوديوم"],
  mk_k:["Potasyum","Potassium","Калий","Kalium","البوتاسيوم"],
  mk_ca:["Kalsiyum","Calcium","Кальций","Calcium","الكالسيوم"],
  mk_fe:["Demir","Iron","Железо","Eisen","الحديد"],
  mk_mg:["Magnezyum","Magnesium","Магний","Magnesium","المغنيسيوم"],
  mk_zn:["Çinko","Zinc","Цинк","Zink","الزنك"],
  mk_vita:["A vitamini","Vitamin A","Витамин A","Vitamin A","فيتامين A"],
  mk_vitc:["C vitamini","Vitamin C","Витамин C","Vitamin C","فيتامين C"],
  mk_vitd:["D vitamini","Vitamin D","Витамин D","Vitamin D","فيتامين D"],
  mk_b12:["B12 vitamini","Vitamin B12","Витамин B12","Vitamin B12","فيتامين B12"],
  mk_fol:["Folat","Folate","Фолат","Folat","الفولات"],
  mk_kol:["Kolesterol","Cholesterol","Холестерин","Cholesterin","الكوليسترول"],
  mk_doy:["Doymuş yağ","Saturated fat","Насыщенные жиры","Gesättigte Fette","الدهون المشبعة"],
  mkDNot:["D vitamininin asıl kaynağı güneş ışığıdır; besinlerden düşük çıkması olağandır.","Sunlight is the main source of vitamin D; low food intake is normal.","Основной источник витамина D — солнце; низкое потребление с едой — норма.","Hauptquelle für Vitamin D ist Sonnenlicht; niedrige Werte aus der Nahrung sind normal.","المصدر الرئيسي لفيتامين D هو أشعة الشمس؛ انخفاضه في الطعام أمر طبيعي."],
  // Rozetler
  rzYeni:["🏅 Yeni rozet: {ad}","🏅 New badge: {ad}","🏅 Новая награда: {ad}","🏅 Neues Abzeichen: {ad}","🏅 شارة جديدة: {ad}"],
  rzKilit:["Henüz açılmadı","Not unlocked yet","Ещё не открыта","Noch nicht freigeschaltet","لم تُفتح بعد"],
  rz_ilk:["İlk adım","First step","Первый шаг","Erster Schritt","الخطوة الأولى"], rzA_ilk:["İlk kaydını yaptın","You made your first entry","Ты сделал(а) первую запись","Dein erster Eintrag","أنجزت أول تسجيل"],
  rz_seri3:["3 günlük seri","3-day streak","Серия 3 дня","3-Tage-Serie","سلسلة 3 أيام"], rzA_seri3:["3 gün üst üste kayıt","Logged 3 days in a row","3 дня подряд","3 Tage am Stück","3 أيام متتالية"],
  rz_seri7:["Haftalık seri","Week streak","Серия неделя","Wochenserie","سلسلة أسبوع"], rzA_seri7:["7 gün üst üste kayıt","Logged 7 days in a row","7 дней подряд","7 Tage am Stück","7 أيام متتالية"],
  rz_seri30:["Aylık seri","Month streak","Серия месяц","Monatsserie","سلسلة شهر"], rzA_seri30:["30 gün üst üste kayıt","Logged 30 days in a row","30 дней подряд","30 Tage am Stück","30 يومًا متتاليًا"],
  rz_su7:["Su ustası","Hydration hero","Мастер воды","Wasserprofi","بطل الترطيب"], rzA_su7:["7 gün üst üste su hedefi","Water goal 7 days in a row","Цель по воде 7 дней подряд","Wasserziel 7 Tage am Stück","هدف الماء 7 أيام متتالية"],
  rz_uyum:["Plana sadık","On plan","Верность плану","Planfest","ملتزم بالخطة"], rzA_uyum:["7 gün üst üste %80+ uyum","80%+ adherence 7 days in a row","80%+ соблюдения 7 дней подряд","7 Tage am Stück 80 %+ Einhaltung","التزام 80%+ لسبعة أيام متتالية"],
  rz_tarti:["Düzenli tartı","Regular weigh-ins","Регулярное взвешивание","Regelmäßig gewogen","وزن منتظم"], rzA_tarti:["4 tartı kaydı","4 weigh-ins","4 взвешивания","4 Wiegungen","4 أوزان"],
  rz_olcu:["Mezura","Tape measure","Сантиметр","Maßband","شريط القياس"], rzA_olcu:["İlk vücut ölçüsü","First body measurement","Первый замер тела","Erste Körpermessung","أول قياس للجسم"],
  rz_foto:["Objektif","Snapshot","Объектив","Schnappschuss","لقطة"], rzA_foto:["Fotoğrafla ilk öğün","First meal from a photo","Первое блюдо по фото","Erste Mahlzeit per Foto","أول وجبة من صورة"],
  rz_barkod:["Etiket okuru","Label reader","Читатель этикеток","Etikettenleser","قارئ الملصقات"], rzA_barkod:["İlk barkod okutma","First barcode scan","Первое сканирование штрихкода","Erster Barcode-Scan","أول مسح باركود"],
  rz_rapor:["İletişimde","In touch","На связи","In Kontakt","على تواصل"], rzA_rapor:["İlk raporunu gönderdin","Sent your first report","Отправлен первый отчёт","Ersten Bericht gesendet","أرسلت أول تقرير"],
  rz_hedef5:["5 kilo yol","5 kg progress","5 кг прогресса","5 kg Fortschritt","تقدم 5 كغ"], rzA_hedef5:["Hedefe doğru 5 kg","5 kg toward your goal","5 кг к цели","5 kg Richtung Ziel","5 كغ نحو هدفك"],
  rz_adim:["Yürüyüşçü","Walker","Ходок","Spaziergänger","المشّاء"], rzA_adim:["Adım hedefine ulaştın","Reached your step goal","Достигнута цель по шагам","Schrittziel erreicht","وصلت إلى هدف الخطوات"],
  rz_ant:["Sporcu","Athlete","Спортсмен","Sportler","الرياضي"], rzA_ant:["5 antrenman kaydı","5 workouts logged","5 тренировок","5 Trainings","5 تمارين مسجلة"]
});

// ================= Tercih sıralaması =================
// Kullanıcının seçtiği (D.son) ve YEDİĞİ (yenen öğünlerdeki yemekler) kalemler yakın tarih ağırlıklı sayılır (yarı ömür 45–60 gün).
// Önerilenler: kendi tercihleri en üstte → her kategorinin en çok tercih ettiği kalemleri otomatik eklenir → genel öneriler.
// Kategori listeleri: kendi tercih sayısı, sonra Türkiye'de en sık yenenler (POPULER + POPULER_EK). Her seçim / "Yedim" sırayı günceller.
let TERCIH_ON = null, TERCIH_Z = 0;
function tercihSayaci(){
  if (TERCIH_ON && Date.now() - TERCIH_Z < 3000) return TERCIH_ON;
  const og = {}, tum = {}, simdi = Date.now(), bugun = tarihDen(bugunK()).getTime();
  const ekle = (o, f, v) => { if (!(v > 0)) return; (og[o] || (og[o] = {}))[f] = (og[o][f] || 0) + v; tum[f] = (tum[f] || 0) + v; };
  for (const [o, m] of Object.entries(D.son || {})) for (const [f, v] of Object.entries(m || {})) {
    const yas = v && v.t ? Math.max(0, (simdi - v.t) / 864e5) : 60;
    ekle(o, f, (v && v.n || 0) * Math.pow(0.5, yas / 60));
  }
  for (const [k, r] of Object.entries(D.kayit || {})){
    if (!r || !r.yendi) continue;
    const gun = (bugun - tarihDen(k).getTime()) / 864e5;
    if (!(gun >= 0 && gun <= 120)) continue;
    const w = 0.5 * Math.pow(0.5, gun / 45);
    let menu; try { menu = menuOku(k); } catch(e){ continue; }
    for (const o of menu) if (r.yendi[o.id]) for (const it of o.ogeler || []) ekle(o.id, it.f, w);
  }
  TERCIH_ON = {og, tum}; TERCIH_Z = Date.now();
  return TERCIH_ON;
}
const tercihSifirla = () => { TERCIH_ON = null; };
if (typeof POPULER_EK !== 'undefined') POPULER_EK.forEach((id, i) => { if (!POP_SIRA.has(id)) POP_SIRA.set(id, 25 + i * 2); });
const ONERI_EN_COK = 60;
sonSecilenler = function(ogunId){
  const puan = {}, t = tercihSayaci(), kendi = t.og[ogunId] || {};
  const ekle = (f, v) => { puan[f] = (puan[f] || 0) + v; };
  D.planlar.flat().forEach(gun => gun.filter(o => o.id === ogunId).forEach(o => o.ogeler.forEach(it => ekle(it.f, 1))));
  for (const [f, v] of Object.entries(kendi)) ekle(f, v * 10);
  // başka öğünlerde sık tercih edilenler az ağırlıkla (ör. her öğünde içilen ayran)
  for (const [f, v] of Object.entries(t.tum)) if (!kendi[f]) ekle(f, Math.min(v, 3) * 0.6);
  const liste = OGUN_ONERI[ogunId] || OGUN_ONERI.ara1;
  liste.forEach((f, i) => ekle(f, 0.9 - i * 0.004));
  // Bu öğünde önerilen kategorilerin EN ÇOK TERCİH EDİLEN kalemleri (kendi tercihi; yoksa Türkiye geneli) otomatik eklenir
  const katlar = [...new Set(liste.slice(0, 80).map(f => (YEMEK_HARITA.get(f) || {}).kat).filter(Boolean))];
  for (const kat of katlar){
    const aday = tumYemekler().filter(f => f.kat === kat);
    aday.map(f => [f.id, t.tum[f.id] || 0]).filter(x => x[1] > 0).sort((a, b) => b[1] - a[1]).slice(0, 3).forEach(([f, v]) => ekle(f, 2 + Math.min(v, 5)));
    aday.filter(f => POP_SIRA.has(f.id)).sort((a, b) => POP_SIRA.get(a.id) - POP_SIRA.get(b.id)).slice(0, 2).forEach(f => ekle(f.id, 0.95));
  }
  const varOlan = new Set(tumYemekler().map(f => f.id));
  return Object.entries(puan).filter(([f]) => varOlan.has(f)).sort((a, b) => b[1] - a[1]).slice(0, ONERI_EN_COK).map(([f]) => f);
};
populerPuan = function(f){
  const n = tercihSayaci().tum[f.id] || 0;
  return n * 1000 + (POP_SIRA.has(f.id) ? 500 - POP_SIRA.get(f.id) : 0);
};
const YEMEK_HARITA = new Map(YEMEKLER.map(f => [f.id, f]));
// seçim / yedim değişince önbellek boşalsın
(function(){
  const k0 = kaydet;
  kaydet = function(){ tercihSifirla(); return k0.apply(this, arguments); };
})();

// ================= Uyum skoru, seri =================
// Günlük uyum (0–100): yenen öğün oranı %45 + kalori hedefine yakınlık %40 + su hedefi %15. Kayıt yoksa null.
function uyumGun(k){
  if (!kayitVar(k)) return null;
  const r = kayitOku(k), menu = menuOku(k).filter(o => !ogunKapali(o.id));
  const yenen = menu.filter(o => r.yendi[o.id]).length, oran = menu.length ? yenen / menu.length : 0;
  const kc = yenenToplam(k).k, h = +D.profil.kcal || 0;
  const kal = h && yenen ? Math.max(0, 1 - Math.abs(kc - h) / h) : 0;
  const suH = suHedefi(k), su = suH ? Math.min(1, (r.su * D.profil.bardak) / suH) : 0;
  return Math.round(100 * (0.45 * oran + 0.40 * kal + 0.15 * su));
}
const kayitGunleri = () => Object.keys(D.kayit || {}).filter(kayitVar).sort();
const tartiGunleri = () => Object.keys(D.tartim || {});
const herhangiKayit = k => kayitVar(k) || (D.tartim && D.tartim[k] != null) || !!(D.olcum && D.olcum[k]);
function seriHesapla(){
  const gunler = new Set([...kayitGunleri(), ...tartiGunleri(), ...Object.keys(D.olcum || {})].filter(herhangiKayit));
  let k = bugunK(); if (!gunler.has(k)) k = gunEkle(k, -1);
  let n = 0; while (gunler.has(k)){ n++; k = gunEkle(k, -1); }
  let enUzun = 0, cur = 0, onceki = null;
  [...gunler].sort().forEach(g => { cur = onceki && gunEkle(onceki, 1) === g ? cur + 1 : 1; enUzun = Math.max(enUzun, cur); onceki = g; });
  return {n, enUzun: Math.max(enUzun, n)};
}
// ardışık N gün koşulu (bugünden geriye değil, herhangi bir dönemde)
function ardisik(kosul, n){
  let cur = 0, onceki = null;
  for (const g of kayitGunleri()){ if (kosul(g)){ cur = onceki && gunEkle(onceki, 1) === g ? cur + 1 : 1; onceki = g; if (cur >= n) return true; } else { cur = 0; onceki = null; } }
  return false;
}

// ================= Rozetler =================
const ROZETLER = [
  ['ilk', '🌱', () => kayitGunleri().length > 0 || tartiGunleri().length > 0],
  ['seri3', '🔥', () => seriHesapla().enUzun >= 3],
  ['seri7', '🔥', () => seriHesapla().enUzun >= 7],
  ['seri30', '🏆', () => seriHesapla().enUzun >= 30],
  ['su7', '💧', () => ardisik(g => kayitOku(g).su * D.profil.bardak >= suHedefi(g), 7)],
  ['uyum', '🎯', () => ardisik(g => (uyumGun(g) || 0) >= 80, 7)],
  ['tarti', '⚖️', () => tartiGunleri().length >= 4],
  ['olcu', '📏', () => Object.keys(D.olcum || {}).length > 0],
  ['foto', '📷', () => !!(D.sayac && D.sayac.foto)],
  ['barkod', '🏷️', () => !!(D.sayac && D.sayac.barkod)],
  ['rapor', '📤', () => !!(D.sayac && D.sayac.rapor)],
  ['hedef5', '🥇', () => { const t = tartimlar(); if (t.length < 2 || !D.profil.hedefKilo) return false; const ilk = t[0][1], son = t[t.length - 1][1], yon = Math.sign(D.profil.hedefKilo - ilk); return yon !== 0 && (son - ilk) * yon >= 5; }],
  ['adim', '👟', () => Object.values(D.aktivite || {}).some(a => a && a.adim >= adimHedefi())],
  ['ant', '🏋️', () => Object.keys(D.antLog || {}).length >= 5]
];
function sayacArtir(k){ (D.sayac || (D.sayac = {}))[k] = (D.sayac[k] || 0) + 1; }
// Yeni açılan rozet: bir kez kutlanır (D.rozet {id: tarih})
function rozetKontrol(sessiz){
  if (!D || !D.ayar || !D.ayar.kurulum) return;
  const r = D.rozet || (D.rozet = {}); let yeni = null;
  for (const [id, , kosul] of ROZETLER){ if (r[id]) continue; let ok = false; try { ok = kosul(); } catch(e){} if (ok){ r[id] = bugunK(); yeni = id; } }
  if (yeni){ kaydet(); if (!sessiz) setTimeout(() => toast(T('rzYeni', {ad: T('rz_' + yeni)}), 3200), 600); }
}

// ================= Besin öğeleri (mikro) =================
const MIKRO_ALAN = ['na', 'k', 'ca', 'fe', 'mg', 'zn', 'vita', 'vitc', 'vitd', 'b12', 'fol', 'kol', 'doy'];
const MIKRO_BIRIM0 = {na:'mg', k:'mg', ca:'mg', fe:'mg', mg:'mg', zn:'mg', vita:'mcg', vitc:'mg', vitd:'mcg', b12:'mcg', fol:'mcg', kol:'mg', doy:'g'};
const MIKRO_BIRIM = new Proxy({}, {get: (o, a) => T('bu_' + (MIKRO_BIRIM0[a] || 'mg'))});
// Yetişkin referansları: EFSA DRV (2017–2023) + WHO (sodyum <2000 mg; doymuş yağ <%10 enerji); 'ust' = aşılmaması önerilen üst sınır
function mikroReferans(){
  const P = D.profil, k = P.cins === 'k', hamile = k && !!P.hamile, yas = +P.yas || 30;
  return {
    na: {ust: 2000}, k: {ref: 3500}, ca: {ref: yas < 25 ? 1000 : 950}, fe: {ref: k ? (hamile ? 16 : yas <= 50 ? 16 : 11) : 11},
    mg: {ref: k ? 300 : 350}, zn: {ref: k ? 8 : 11}, vita: {ref: k ? (hamile ? 700 : 650) : 750}, vitc: {ref: k ? (hamile ? 105 : 95) : 110},
    vitd: {ref: 15}, b12: {ref: hamile ? 4.5 : 4}, fol: {ref: hamile ? 600 : 330}, kol: {ust: 300}, doy: {ust: Math.round((+P.kcal || 2000) * 0.1 / 9)}
  };
}
// Bir yemeğin 100 g başına mikro değerleri: MIKRO (p4m.js, USDA eşlemesi) veya özel yemekte (barkod) kayıtlı alanlar
function mikroDeger(f){
  if (f && f.mk) return f.mk;
  if (typeof MIKRO !== 'undefined' && MIKRO[f.id]) return MIKRO[f.id];
  return null;
}
function mikroTopla(gunler){
  const top = Object.fromEntries(MIKRO_ALAN.map(a => [a, 0])); let gunSay = 0, kalem = 0, bilinmeyen = 0;
  for (const k of gunler){
    const r = kayitOku(k); let var_ = false;
    for (const o of menuOku(k)) if (r.yendi[o.id]) for (const it of o.ogeler){
      const f = yemek(it.f), m = mikroDeger(f), g = gramOf(f, it.g) / 100; kalem++; var_ = true;
      if (!m){ bilinmeyen++; continue; }
      MIKRO_ALAN.forEach((a, i) => { const v = Array.isArray(m) ? m[i] : m[a]; if (v > 0) top[a] += v * g; });
    }
    if (var_) gunSay++;
  }
  if (gunSay) for (const a of MIKRO_ALAN) top[a] /= gunSay;
  return {top, gunSay, kalem, bilinmeyen};
}

// ================= Ölçüler =================
const OLCU_ALAN = ['bel', 'kalca', 'boyun', 'gogus', 'kol', 'bacak', 'yag'];
const olcumler = () => Object.entries(D.olcum || {}).sort((a, b) => a[0] < b[0] ? -1 : 1);
const sonOlcu = alan => { const l = olcumler().filter(([, o]) => o[alan] > 0); return l.length ? l[l.length - 1][1][alan] : null; };
function navyYag(){
  const P = D.profil, bel = sonOlcu('bel'), boyun = sonOlcu('boyun'), kalca = sonOlcu('kalca'), boy = +P.boy;
  if (!bel || !boyun || !boy) return null;
  let y;
  if (P.cins === 'k'){ if (!kalca || bel + kalca - boyun <= 0) return null; y = 495 / (1.29579 - 0.35004 * Math.log10(bel + kalca - boyun) + 0.22100 * Math.log10(boy)) - 450; }
  else { if (bel - boyun <= 0) return null; y = 495 / (1.0324 - 0.19077 * Math.log10(bel - boyun) + 0.15456 * Math.log10(boy)) - 450; }
  return y > 2 && y < 70 ? Math.round(y * 10) / 10 : null;
}

// ================= Sağlık değerleri =================
// Tansiyon sınıfı: ESC/ESH 2023 muayenehane değerleri (yetişkin). Sınıf, iki değerden yüksek olanına göre belirlenir.
function tansiyonSinif(s, d){
  if (s < 90 || d < 60) return {k: 'bpDusuk', c: 'mavi'};
  const sn = s >= 180 ? 5 : s >= 160 ? 4 : s >= 140 ? 3 : s >= 130 ? 2 : s >= 120 ? 1 : 0;
  const dn = d >= 110 ? 5 : d >= 100 ? 4 : d >= 90 ? 3 : d >= 85 ? 2 : d >= 80 ? 1 : 0;
  const n = Math.max(sn, dn);
  return {k: 'bp' + n, c: n <= 1 ? 'yesil' : n === 2 ? 'sari' : 'kirmizi', acil: n === 5};
}
// Kan şekeri (mg/dL): ADA 2024 tanı eşikleri (açlık 100/126, tokluk 2. saat 140/200; <70 düşük). Rastgele ölçümde ≥200 yüksek.
function sekerSinif(v, z){
  if (v < 70) return {k: 'glDusuk', c: 'mavi', dusuk: true};
  const [a, b] = z === 'ac' ? [100, 126] : z === 'tok' ? [140, 200] : [140, 200];
  return v >= b ? {k: 'gl2', c: 'kirmizi'} : v >= a ? {k: 'gl1', c: 'sari'} : {k: 'gl0', c: 'yesil'};
}
const sekerBirim = () => D.ayar.sekerBirim || (dil === 'ru' ? 'mmol' : 'mg');
const sekerGoster = v => sekerBirim() === 'mmol' ? sayi(Math.round(v / 18.016 * 10) / 10) : String(Math.round(v));
const adimHedefi = () => +(D.profil.adimHedef || 8000);
const saatYazisi = t => new Date(t).toLocaleString(LOC(), {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'});

// ================= İlerleme fotoğrafları (IndexedDB, ayrı veritabanı) =================
function fotoDb(){
  return new Promise((ok, hata) => {
    try { const r = indexedDB.open('lr_foto', 1); r.onupgradeneeded = () => r.result.createObjectStore('f'); r.onsuccess = () => ok(r.result); r.onerror = () => hata(r.error); }
    catch(e){ hata(e); }
  });
}
async function fotoYaz(anahtar, veri){ const db = await fotoDb(); return new Promise(ok => { const t = db.transaction('f', 'readwrite'); t.objectStore('f').put(veri, anahtar); t.oncomplete = () => ok(true); t.onerror = () => ok(false); }); }
async function fotoOku(anahtar){ try { const db = await fotoDb(); return await new Promise(ok => { const q = db.transaction('f').objectStore('f').get(anahtar); q.onsuccess = () => ok(q.result || null); q.onerror = () => ok(null); }); } catch(e){ return null; } }
async function fotoSil(anahtar){ try { const db = await fotoDb(); db.transaction('f', 'readwrite').objectStore('f').delete(anahtar); } catch(e){} }
// Görseli küçült (uzun kenar en çok `en` px) → JPEG data URL
function gorselKucult(src, en, kalite){
  return new Promise((ok, hata) => {
    const im = new Image();
    im.onload = () => {
      const o = Math.min(1, en / Math.max(im.naturalWidth, im.naturalHeight)), c = document.createElement('canvas');
      c.width = Math.round(im.naturalWidth * o); c.height = Math.round(im.naturalHeight * o);
      const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(im, 0, 0, c.width, c.height);
      ok(c.toDataURL('image/jpeg', kalite || 0.82));
    };
    im.onerror = () => hata(new Error('görsel açılamadı'));
    im.src = src;
  });
}
// Fotoğraf seç/çek: yerel kabukta yerel ekran (extra.tsx), tarayıcıda dosya girişi. Sonuç: data URL ya da null.
let fotoBekleyen = null;
window.__lfOnFoto = r => { const f = fotoBekleyen; fotoBekleyen = null; if (f) f(r || {}); };
function fotoSec(kaynak){
  if (window.__LF_NATIVE && window.__lfPost && !window.__LF_NATIVE.fallback){
    return new Promise(ok => {
      fotoBekleyen = r => {
        if (r && r.ok && r.data) ok(r.data);
        else { if (r && r.izin === false) toast(T('ftIzin'), 3500); else if (r && r.hata) toast(T('ftHata'), 3000); ok(null); }
      };
      window.__lfPost({t: 'foto', kaynak});
    });
  }
  return new Promise(ok => {
    const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*';
    if (kaynak === 'kamera') inp.setAttribute('capture', 'environment');
    inp.onchange = () => {
      const f = inp.files && inp.files[0]; if (!f){ ok(null); return; }
      const r = new FileReader(); r.onload = () => gorselKucult(r.result, 768, 0.82).then(ok, () => ok(null)); r.onerror = () => ok(null); r.readAsDataURL(f);
    };
    inp.click();
  });
}
// Kamera / galeri seçimi (yerel kabukta iki düğme; tarayıcıda tek dosya girişi — telefon tarayıcısı ikisini de sunar)
function fotoKaynakSor(sonra, baslik){
  if (!(window.__LF_NATIVE && !window.__LF_NATIVE.fallback)){ fotoSec('galeri').then(sonra); return; }
  ac(esc(baslik || T('ftBaslik')), `<div class="ft-kaynak"><button class="btn solid" id="ftKamera">📷 ${T('ftKamera')}</button><button class="btn" id="ftGaleri">🖼️ ${T('ftGaleri')}</button></div><p class="hint" style="margin-top:10px">${esc(T('ftGizlilik'))}</p>`);
  $('ftKamera').onclick = () => { kapat(); fotoSec('kamera').then(sonra); };
  $('ftGaleri').onclick = () => { kapat(); fotoSec('galeri').then(sonra); };
}

// ================= Grafikler (satır içi SVG; RTL'de de soldan sağa) =================
function cizgiGrafik(seriler, o = {}){
  const W = 640, H = o.h || 170, pl = 40, pr = 12, pt = 12, pb = 26;
  const tum = seriler.flatMap(s => s.n); if (!tum.length) return '';
  const xs = [...new Set(tum.map(p => p[0]))].sort(), xi = new Map(xs.map((x, i) => [x, i]));
  let lo = Math.min(...tum.map(p => p[1]), o.hedef != null ? o.hedef : Infinity), hi = Math.max(...tum.map(p => p[1]), o.hedef != null ? o.hedef : -Infinity);
  if (hi - lo < (o.enAz || 1)){ const m = (hi + lo) / 2; lo = m - (o.enAz || 1) / 2; hi = m + (o.enAz || 1) / 2; }
  const pad = (hi - lo) * 0.12; lo -= pad; hi += pad;
  const X = i => xs.length === 1 ? (pl + W - pr) / 2 : pl + i * (W - pl - pr) / (xs.length - 1), Y = v => pt + (hi - v) * (H - pt - pb) / (hi - lo);
  const ticks = [lo + pad, (lo + hi) / 2, hi - pad];
  let s = `<svg class="grafik" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${esc(o.etiket || '')}">`;
  ticks.forEach(t => { s += `<line x1="${pl}" x2="${W - pr}" y1="${Y(t)}" y2="${Y(t)}" class="g-izgara"/><text x="${pl - 6}" y="${Y(t) + 4}" class="g-y">${sayi(Math.round(t * 10) / 10)}</text>`; });
  if (o.hedef != null) s += `<line x1="${pl}" x2="${W - pr}" y1="${Y(o.hedef)}" y2="${Y(o.hedef)}" class="g-hedef"/>`;
  const eti = xs.length <= 8 ? xs : [xs[0], xs[Math.floor(xs.length / 2)], xs[xs.length - 1]];
  eti.forEach(x => { s += `<text x="${X(xi.get(x))}" y="${H - 7}" class="g-x">${esc(o.xYaz ? o.xYaz(x) : x)}</text>`; });
  seriler.forEach((sr, j) => {
    const pts = sr.n.map(p => [X(xi.get(p[0])), Y(p[1])]);
    if (pts.length > 1) s += `<polyline points="${pts.map(p => p.join(',')).join(' ')}" class="g-cizgi g${j}" vector-effect="non-scaling-stroke"/>`;
    pts.forEach(p => { s += `<circle cx="${p[0]}" cy="${p[1]}" r="3.2" class="g-nokta g${j}"/>`; });
  });
  return `<div class="grafik-kap" dir="ltr">${s}</svg></div>`;
}
function cubukGrafik(noktalar, o = {}){
  const W = 640, H = o.h || 130, pl = 6, pr = 6, pt = 10, pb = 22, n = noktalar.length; if (!n) return '';
  const hi = Math.max(o.hedef || 0, ...noktalar.map(p => p[1] || 0)) * 1.1 || 1, bw = (W - pl - pr) / n;
  let s = `<svg class="grafik" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img">`;
  noktalar.forEach((p, i) => {
    const h = (p[1] || 0) / hi * (H - pt - pb), x = pl + i * bw + bw * 0.18, ok = o.hedef ? (o.enAz ? p[1] >= o.hedef : p[1] <= o.hedef) : true;
    s += `<rect x="${x}" y="${H - pb - h}" width="${bw * 0.64}" height="${Math.max(h, p[1] ? 2 : 0)}" rx="3" class="g-cubuk${p[1] ? (ok ? ' iyi' : ' az') : ''}"/>`;
    const adim = Math.ceil(n / 7);
    if (i === n - 1 || (i % adim === 0 && n - 1 - i >= adim)) s += `<text x="${x + bw * 0.32}" y="${H - 7}" class="g-x">${esc(o.xYaz ? o.xYaz(p[0]) : p[0])}</text>`;
  });
  if (o.hedef) s += `<line x1="${pl}" x2="${W - pr}" y1="${H - pb - o.hedef / hi * (H - pt - pb)}" y2="${H - pb - o.hedef / hi * (H - pt - pb)}" class="g-hedef"/>`;
  return `<div class="grafik-kap" dir="ltr">${s}</svg></div>`;
}
const kisaTarih = k => tarihDen(k).toLocaleDateString(LOC(), {day: 'numeric', month: 'short'});

// ================= Takip ekranı (tam ekran) =================
const TK = {sekme: 'ozet', besin: 'gun'};
function takipKap(){
  if (!$('takip')){ document.body.insertAdjacentHTML('beforeend', '<div class="wiz takip" id="takip" hidden></div>'); }
  return $('takip');
}
function takipAc(sekme){
  kapat(); if (sekme) TK.sekme = sekme;
  takipKap().hidden = false; document.body.classList.add('wiz-acik');
  takipCiz(); $('takip').scrollTop = 0;
}
function takipKapat(){ if (!$('takip')) return; kaydet(); $('takip').hidden = true; if ($('koc').hidden) document.body.classList.remove('wiz-acik'); ciz(); }
const TK_SEKMELER = [['ozet', '🏠'], ['olcu', '📏'], ['saglik', '❤️'], ['aktivite', '👟'], ['besin', '🥦'], ['rapor', '📤'], ['rozet', '🏅']];
function takipCiz(){
  const el = takipKap();
  el.innerHTML = `<div class="wiz-in tk-in">
    <div class="wiz-top"><div class="wiz-brand">📊 ${T('tkBtn')}</div><button class="icon-btn" data-tkkapat="1" aria-label="✕">✕</button></div>
    <h2>${T('tkTitle')}</h2><p class="wiz-sub">${esc(T('tkIntro'))}</p>
    <div class="tk-sekmeler" role="tablist">${TK_SEKMELER.map(([k, ik]) => `<button class="chip${TK.sekme === k ? ' on' : ''}" role="tab" aria-selected="${TK.sekme === k}" data-tks="${k}">${ik} ${T('tkS_' + k)}</button>`).join('')}</div>
    <div id="tkIcerik" class="tk-icerik"></div>
  </div>`;
  el.querySelector('[data-tkkapat]').onclick = takipKapat;
  el.querySelectorAll('[data-tks]').forEach(b => b.onclick = () => { TK.sekme = b.dataset.tks; takipCiz(); });
  ({ozet: tkOzet, olcu: tkOlcu, saglik: tkSaglik, aktivite: tkAktivite, besin: tkBesin, rapor: tkRapor, rozet: tkRozet}[TK.sekme] || tkOzet)();
}
const tkIc = html => { $('tkIcerik').innerHTML = html; return $('tkIcerik'); };
const tkNotHtml = () => `<p class="tk-not">ⓘ ${esc(T('tkNot'))}</p>`;
const sayiOku = v => { const n = parseFloat(String(v || '').replace(',', '.')); return isFinite(n) ? n : null; };

function tkOzet(){
  const s = seriHesapla(), bu = uyumGun(bugunK());
  const son7 = Array.from({length: 7}, (_, i) => gunEkle(bugunK(), i - 6)), u7 = son7.map(k => [k, uyumGun(k)]);
  const u7v = u7.filter(x => x[1] != null), ort = u7v.length ? Math.round(u7v.reduce((t, x) => t + x[1], 0) / u7v.length) : null;
  const t = tartimlar(), sonT = t.length ? t[t.length - 1] : null;
  const once = t.filter(([g]) => g <= gunEkle(bugunK(), -30)), t30 = sonT && once.length ? farkKg(sonT[1], once[once.length - 1][1]) : null;
  const ak = (D.aktivite || {})[bugunK()] || {};
  const ilacBugun = (D.ilac || []).filter(i => i.aktif !== false);
  const el = tkIc(`<div class="tk-kartlar">
      <div class="card tk-kart"><small>🔥 ${T('tkSeri')}</small><b class="tk-buyuk">${T('tkSeriN', {n: s.n})}</b><span class="hint">${T('tkSeriEn', {n: s.enUzun})}</span><p class="hint">${esc(T('tkSeriIpucu'))}</p></div>
      <div class="card tk-kart"><small>🎯 ${T('tkUyum')}</small><div class="tk-ikili"><div><span class="hint">${T('tkUyumBugun')}</span><b class="tk-buyuk">${bu != null ? bu + '%' : '—'}</b></div><div><span class="hint">${T('tkUyum7')}</span><b class="tk-buyuk">${ort != null ? ort + '%' : '—'}</b></div></div>
        ${cubukGrafik(u7.map(x => [x[0], x[1] || 0]), {hedef: 80, enAz: true, h: 90, xYaz: k => gunKisa(k)})}<p class="hint">${esc(T('tkUyumIpucu'))}</p></div>
      <div class="card tk-kart"><small>⚖️ ${T('tkKilo')}</small>${sonT ? `<b class="tk-buyuk">${sayi(sonT[1])} kg</b><span class="hint">${esc(kisaTarih(sonT[0]))}${t30 ? ' · ' + esc(T('tk30', {f: t30})) : ''}</span>${D.profil.hedefKilo ? `<span class="hint">${esc(hedefDurum(sonT[1]))}</span>` : ''}` : `<span class="hint">${T('tkKiloYok')}</span>`}
        <button class="btn ghost full" data-git="olcu" style="margin-top:8px">📏 ${T('tkS_olcu')}</button></div>
      <div class="card tk-kart"><small>👟 ${T('tkS_aktivite')}</small><div class="tk-ikili"><div><span class="hint">${T('tkAdim')}</span><b class="tk-buyuk">${ak.adim != null ? sayi(ak.adim) : '—'}</b></div><div><span class="hint">${T('tkUyku')}</span><b class="tk-buyuk">${ak.uyku != null ? sayi(ak.uyku) : '—'}</b></div></div>
        ${ilacBugun.length ? `<span class="hint">💊 ${ilacBugun.map(i => esc(i.saat + ' ' + i.ad)).join(' · ')}</span>` : ''}
        <button class="btn ghost full" data-git="aktivite" style="margin-top:8px">👟 ${T('tkS_aktivite')}</button></div>
    </div>
    <button class="btn green full tk-rapor-btn" data-git="rapor">${T('tkRaporBtn')}</button>
    <div class="sec" style="margin-top:14px">${T('tkHizli')}</div>
    <div class="tk-hizli">${TK_SEKMELER.slice(1).map(([k, ik]) => `<button class="btn" data-git="${k}">${ik} ${T('tkS_' + k)}</button>`).join('')}</div>
    ${tkNotHtml()}`);
  el.querySelectorAll('[data-git]').forEach(b => b.onclick = () => { TK.sekme = b.dataset.git; takipCiz(); $('takip').scrollTop = 0; });
}

function tkOlcu(){
  const P = D.profil, t = tartimlar(), son = olcumler().slice(-1)[0], sonO = son ? son[1] : {};
  const bel = sonOlcu('bel'), kalca = sonOlcu('kalca'), bko = bel && kalca ? Math.round(bel / kalca * 100) / 100 : null, bbo = bel && P.boy ? Math.round(bel / P.boy * 100) / 100 : null;
  const bkoRisk = bko != null && bko >= (P.cins === 'k' ? 0.85 : 0.90), bboRisk = bbo != null && bbo >= 0.5, navy = navyYag();
  const alan = a => `<label class="field"><span>${T('o_' + a)}</span><input autocomplete="off" type="text" inputmode="decimal" data-olcu="${a}" value="${sonO[a] && son[0] === bugunK() ? sayi(sonO[a]) : ''}" placeholder="${sonO[a] ? sayi(sonO[a]) : '—'}"></label>`;
  const el = tkIc(`<div class="card">
      <div class="kart-bas"><h3>⚖️ ${T('tkKiloGrafik')}</h3></div>
      ${t.length ? cizgiGrafik([{n: t.slice(-60)}], {hedef: P.hedefKilo || null, enAz: 2, xYaz: kisaTarih, etiket: T('tkKiloGrafik')}) : `<p class="hint">${T('tkKiloYok')}</p>`}
      <div class="tk-satir"><label class="field"><span>${T('tkTartiEkle')} (kg)</span><input autocomplete="off" type="text" inputmode="decimal" id="tkTarti" value="${D.tartim && D.tartim[bugunK()] != null ? sayi(D.tartim[bugunK()]) : ''}"></label><button class="btn solid" id="tkTartiKaydet">${T('tkKaydet')}</button></div>
    </div>
    <div class="card">
      <div class="kart-bas"><h3>📏 ${T('tkOlcuT')}</h3></div>
      <p class="hint" style="margin-bottom:8px">${esc(T('tkOlcuIpucu'))}</p>
      <div class="grid3">${OLCU_ALAN.map(alan).join('')}</div>
      <button class="btn solid full" id="tkOlcuKaydet">${T('tkKaydet')}</button>
      ${bko != null || bbo != null || navy != null ? `<div class="tk-oranlar">
        ${bko != null ? `<div class="tk-oran ${bkoRisk ? 'risk' : 'iyi'}"><small>${T('tkBKO')}</small><b>${sayi(bko)}</b><span>${T(bkoRisk ? 'tkRiskVar' : 'tkRiskYok')}</span></div>` : ''}
        ${bbo != null ? `<div class="tk-oran ${bboRisk ? 'risk' : 'iyi'}"><small>${T('tkBBO')}</small><b>${sayi(bbo)}</b><span>${T(bboRisk ? 'tkRiskVar' : 'tkRiskYok')}</span></div>` : ''}
        ${navy != null ? `<div class="tk-oran"><small>${T('tkNavy')}</small><b>%${sayi(navy)}</b></div>` : ''}
      </div>` : ''}
      ${olcumler().filter(([, o]) => o.bel).length > 1 ? cizgiGrafik([{n: olcumler().filter(([, o]) => o.bel).map(([k, o]) => [k, o.bel])}, {n: olcumler().filter(([, o]) => o.kalca).map(([k, o]) => [k, o.kalca])}], {enAz: 4, xYaz: kisaTarih}) + `<div class="g-lejant"><span class="g0">● ${T('o_bel')}</span><span class="g1">● ${T('o_kalca')}</span></div>` : ''}
      ${olcumler().length ? `<div class="sec" style="margin-top:12px">${T('tkOlcuGecmis')}</div><div class="tk-tablo-kap"><table class="tk-tablo"><thead><tr><th>${T('tkTarih')}</th>${OLCU_ALAN.map(a => `<th>${T('o_' + a).replace(/ \(%\)| \(.*\)/, '')}</th>`).join('')}<th></th></tr></thead>
        <tbody>${olcumler().slice(-12).reverse().map(([k, o]) => `<tr><td>${esc(kisaTarih(k))}</td>${OLCU_ALAN.map(a => `<td>${o[a] ? sayi(o[a]) : '—'}</td>`).join('')}<td><button class="mini del" data-olcusil="${k}" aria-label="${esc(T('tkSil'))}">✕</button></td></tr>`).join('')}</tbody></table></div>` : ''}
    </div>
    <div class="card">
      <div class="kart-bas"><h3>📸 ${T('tkFotoT')}</h3><button class="btn solid" id="tkFotoEkle">${T('tkFotoEkle')}</button></div>
      <p class="hint">${esc(T('tkFotoIpucu'))}</p>
      <div class="tk-fotolar" id="tkFotolar">${(D.ilerleme || []).length ? '' : `<p class="hint">${T('tkFotoYok')}</p>`}</div>
    </div>${tkNotHtml()}`);
  $('tkTartiKaydet').onclick = () => {
    const v = sayiOku($('tkTarti').value);
    if (!(v >= 25 && v <= 350)){ toast(T('tkGecersiz')); return; }
    (D.tartim || (D.tartim = {}))[bugunK()] = Math.round(v * 10) / 10;
    if (bugunK() >= (tartimlar().slice(-1)[0] || [''])[0]) D.profil.kilo = Math.round(v * 10) / 10;
    logEkle('tarti', bugunK(), sayi(v) + ' kg'); kaydet(); rozetKontrol(); tkOlcu(); toast('✓');
  };
  $('tkOlcuKaydet').onclick = () => {
    const o = {}; let n = 0;
    el.querySelectorAll('[data-olcu]').forEach(i => { const v = sayiOku(i.value); if (v != null && v > 0 && v < (i.dataset.olcu === 'yag' ? 75 : 260)){ o[i.dataset.olcu] = Math.round(v * 10) / 10; n++; } });
    if (!n){ toast(T('tkGecersiz')); return; }
    (D.olcum || (D.olcum = {}))[bugunK()] = {...(D.olcum[bugunK()] || {}), ...o};
    kaydet(); rozetKontrol(); tkOlcu(); toast('✓');
  };
  el.querySelectorAll('[data-olcusil]').forEach(b => b.onclick = () => onayAc(T('tkSilOnay'), () => { delete D.olcum[b.dataset.olcusil]; kaydet(); kapat(); takipAc('olcu'); }));
  $('tkFotoEkle').onclick = () => fotoKaynakSor(async data => {
    if (!data) return;
    const k = 'ilerleme|' + Date.now(), kucuk = await gorselKucult(data, 360, 0.8);
    await fotoYaz(k, {b: data, k: kucuk});
    (D.ilerleme || (D.ilerleme = [])).push({a: k, d: bugunK()}); kaydet(); takipAc('olcu');
  }, T('tkFotoT'));
  ilerlemeFotolariCiz();
}
async function ilerlemeFotolariCiz(){
  const kap = $('tkFotolar'), l = D.ilerleme || []; if (!kap || !l.length) return;
  const veriler = await Promise.all(l.map(x => fotoOku(x.a)));
  const kart = (x, v) => v ? `<figure class="tk-foto"><button data-fotoac="${esc(x.a)}"><img alt="" src="${v.k}"></button><figcaption>${esc(kisaTarih(x.d))}<button class="mini del" data-fotosil="${esc(x.a)}" aria-label="${esc(T('tkSil'))}">✕</button></figcaption></figure>` : '';
  const ilk = l.find((x, i) => veriler[i]), son = [...l].reverse().find((x, i) => veriler[l.length - 1 - i]);
  kap.innerHTML = (ilk && son && ilk !== son ? `<div class="tk-karsi"><div class="sec">${T('tkFotoKarsilastir')}</div><div class="tk-karsi-ic">${kart(ilk, veriler[l.indexOf(ilk)])}${kart(son, veriler[l.indexOf(son)])}</div></div>` : '')
    + `<div class="tk-foto-grid">${l.map((x, i) => kart(x, veriler[i])).reverse().join('')}</div>`;
  kap.querySelectorAll('[data-fotoac]').forEach(b => b.onclick = async () => { const v = await fotoOku(b.dataset.fotoac); if (v) gorselGoster(v.b); });
  kap.querySelectorAll('[data-fotosil]').forEach(b => b.onclick = () => onayAc(T('tkSilOnay'), async () => {
    await fotoSil(b.dataset.fotosil); D.ilerleme = (D.ilerleme || []).filter(x => x.a !== b.dataset.fotosil); kaydet(); kapat(); takipAc('olcu');
  }));
}
function gorselGoster(src){
  if ($('gorselTam')) $('gorselTam').remove();
  document.body.insertAdjacentHTML('beforeend', `<div class="gorsel-tam" id="gorselTam" role="dialog" aria-modal="true"><img alt="" src="${src}"><button class="icon-btn" aria-label="✕">✕</button></div>`);
  $('gorselTam').onclick = () => $('gorselTam').remove();
}

function tkSaglik(){
  const bp = (D.tansiyon || []).slice(-30), gl = (D.seker || []).slice(-30), ilac = D.ilac || [], bugunAl = (D.ilacLog || {})[bugunK()] || {};
  const birim = sekerBirim();
  const el = tkIc(`<div class="card">
      <div class="kart-bas"><h3>❤️ ${T('tkTansiyon')} <small class="hint">mmHg</small></h3></div>
      <div class="grid3"><label class="field"><span>${T('tkBuyuk')}</span><input autocomplete="off" type="text" inputmode="numeric" id="bpS" placeholder="120"></label>
        <label class="field"><span>${T('tkKucuk')}</span><input autocomplete="off" type="text" inputmode="numeric" id="bpD" placeholder="80"></label>
        <label class="field"><span>${T('tkNabiz')}</span><input autocomplete="off" type="text" inputmode="numeric" id="bpN" placeholder="—"></label></div>
      <button class="btn solid full" id="bpKaydet">${T('tkKaydet')}</button>
      <div id="bpUyari"></div>
      ${bp.length > 1 ? cizgiGrafik([{n: bp.map(x => [x.t, x.s])}, {n: bp.map(x => [x.t, x.d])}], {enAz: 20, xYaz: x => kisaTarih(tarihAnahtar(new Date(x)))}) + `<div class="g-lejant"><span class="g0">● ${T('tkBuyuk')}</span><span class="g1">● ${T('tkKucuk')}</span></div>` : ''}
      <div class="sec" style="margin-top:10px">${T('tkGecmis')}</div>
      ${bp.length ? `<ul class="tk-liste">${bp.slice(-8).reverse().map(x => { const c = tansiyonSinif(x.s, x.d); return `<li><span class="tk-zaman">${esc(saatYazisi(x.t))}</span><b>${x.s}/${x.d}</b>${x.n ? `<span class="hint">♥ ${x.n}</span>` : ''}<span class="tk-etiket ${c.c}">${T(c.k)}</span><button class="mini del" data-bpsil="${x.t}" aria-label="${esc(T('tkSil'))}">✕</button></li>`; }).join('')}</ul>` : `<p class="hint">${T('tkBos')}</p>`}
    </div>
    <div class="card">
      <div class="kart-bas"><h3>🩸 ${T('tkSeker')}</h3><div class="seg" role="group" aria-label="${esc(T('tkBirim'))}"><button class="${birim === 'mg' ? 'on' : ''}" data-birim="mg">mg/dL</button><button class="${birim === 'mmol' ? 'on' : ''}" data-birim="mmol">mmol/L</button></div></div>
      <div class="tk-satir"><label class="field"><span>${T('tkSeker')} (${birim === 'mg' ? 'mg/dL' : 'mmol/L'})</span><input autocomplete="off" type="text" inputmode="decimal" id="glV"></label>
        <label class="field"><span>${T('tkSaat')}</span><select id="glZ">${['ac', 'tok', 'rast'].map(z => `<option value="${z}">${T('tkSekerZ_' + z)}</option>`).join('')}</select></label>
        <button class="btn solid" id="glKaydet">${T('tkKaydet')}</button></div>
      <div id="glUyari"></div>
      <div class="sec" style="margin-top:10px">${T('tkGecmis')}</div>
      ${gl.length ? `<ul class="tk-liste">${gl.slice(-8).reverse().map(x => { const c = sekerSinif(x.v, x.z); return `<li><span class="tk-zaman">${esc(saatYazisi(x.t))}</span><b>${sekerGoster(x.v)}</b><span class="hint">${T('tkSekerZ_' + x.z)}</span><span class="tk-etiket ${c.c}">${T(c.k)}</span><button class="mini del" data-glsil="${x.t}" aria-label="${esc(T('tkSil'))}">✕</button></li>`; }).join('')}</ul>` : `<p class="hint">${T('tkBos')}</p>`}
    </div>
    <div class="card">
      <div class="kart-bas"><h3>💊 ${T('tkIlac')}</h3></div>
      ${ilac.length ? `<ul class="tk-liste tk-ilac">${ilac.map(i => `<li><label class="tk-onay"><input type="checkbox" data-ilacal="${i.id}"${bugunAl[i.id] ? ' checked' : ''}><span>${T('tkIlacAlindi')}</span></label><b>${esc(i.ad)}</b><span class="hint">${esc(i.saat)}${i.doz ? ' · ' + esc(i.doz) : ''}${i.hat ? ' · 🔔' : ''}</span><button class="mini del" data-ilacsil="${i.id}" aria-label="${esc(T('tkSil'))}">✕</button></li>`).join('')}</ul>` : `<p class="hint">${esc(T('tkIlacYok'))}</p>`}
      <div class="tk-ilac-form">
        <label class="field"><span>${T('tkIlacAd')}</span><input autocomplete="off" type="text" id="ilAd" maxlength="40"></label>
        <label class="field"><span>${T('tkIlacDoz')}</span><input autocomplete="off" type="text" id="ilDoz" maxlength="40"></label>
        <label class="field"><span>${T('tkIlacSaat')}</span><input type="time" id="ilSaat" value="09:00"></label>
        <label class="tk-onay tk-hat"><input type="checkbox" id="ilHat" checked><span>🔔 ${T('tkIlacHat')}</span></label>
      </div>
      <button class="btn solid full" id="ilEkle">${T('tkIlacEkle')}</button>
      <p class="hint" style="margin-top:6px">${esc(T('tkIlacNot'))}${window.__LF_NATIVE ? '' : ' ' + esc(T('tkWebBildirim'))}</p>
    </div>${tkNotHtml()}`);
  const uyar = (id, html) => { $(id).innerHTML = html; };
  $('bpKaydet').onclick = () => {
    const s = sayiOku($('bpS').value), d = sayiOku($('bpD').value), n = sayiOku($('bpN').value);
    if (!(s >= 60 && s <= 260 && d >= 30 && d <= 160 && s > d)){ toast(T('tkGecersiz')); return; }
    (D.tansiyon || (D.tansiyon = [])).push({t: Date.now(), s: Math.round(s), d: Math.round(d), ...(n >= 30 && n <= 220 ? {n: Math.round(n)} : {})});
    D.tansiyon = D.tansiyon.slice(-400); kaydet(); const c = tansiyonSinif(s, d); tkSaglik();
    if (c.acil) uyar('bpUyari', `<div class="tk-uyari kirmizi">⚠️ ${esc(T('bpAcil'))}</div>`);
  };
  el.querySelectorAll('[data-birim]').forEach(b => b.onclick = () => { D.ayar.sekerBirim = b.dataset.birim; kaydet(); tkSaglik(); });
  $('glKaydet').onclick = () => {
    let v = sayiOku($('glV').value); if (v == null){ toast(T('tkGecersiz')); return; }
    if (sekerBirim() === 'mmol') v = v * 18.016;
    if (!(v >= 20 && v <= 700)){ toast(T('tkGecersiz')); return; }
    const z = $('glZ').value; (D.seker || (D.seker = [])).push({t: Date.now(), v: Math.round(v), z}); D.seker = D.seker.slice(-400);
    kaydet(); const c = sekerSinif(v, z); tkSaglik();
    if (c.dusuk) uyar('glUyari', `<div class="tk-uyari mavi">ⓘ ${esc(T('glDusukNot'))}</div>`);
  };
  el.querySelectorAll('[data-bpsil]').forEach(b => b.onclick = () => onayAc(T('tkSilOnay'), () => { D.tansiyon = D.tansiyon.filter(x => String(x.t) !== b.dataset.bpsil); kaydet(); kapat(); takipAc('saglik'); }));
  el.querySelectorAll('[data-glsil]').forEach(b => b.onclick = () => onayAc(T('tkSilOnay'), () => { D.seker = D.seker.filter(x => String(x.t) !== b.dataset.glsil); kaydet(); kapat(); takipAc('saglik'); }));
  el.querySelectorAll('[data-ilacal]').forEach(c => c.onchange = () => { const L = D.ilacLog || (D.ilacLog = {}), g = L[bugunK()] || (L[bugunK()] = {}); if (c.checked) g[c.dataset.ilacal] = Date.now(); else delete g[c.dataset.ilacal]; kaydet(); });
  el.querySelectorAll('[data-ilacsil]').forEach(b => b.onclick = () => onayAc(T('tkSilOnay'), () => {
    if (window.__lfCancelNotify) window.__lfCancelNotify('ilac-' + b.dataset.ilacsil);
    D.ilac = D.ilac.filter(i => i.id !== b.dataset.ilacsil); kaydet(); kapat(); takipAc('saglik');
  }));
  $('ilEkle').onclick = () => {
    const ad = $('ilAd').value.trim(), saat = $('ilSaat').value || '09:00';
    if (!ad){ $('ilAd').focus(); return; }
    const i = {id: 'i' + Date.now().toString(36), ad: ad.slice(0, 40), doz: $('ilDoz').value.trim().slice(0, 40), saat, hat: $('ilHat').checked, aktif: true};
    (D.ilac || (D.ilac = [])).push(i); kaydet(); ilacBildirimKur(i); tkSaglik();
  };
}
function ilacBildirimKur(i){
  if (!(window.__LF_NATIVE && window.__lfNotify) || !i.hat) return;
  const [h, m] = String(i.saat).split(':').map(Number);
  window.__lfNotify({id: 'ilac-' + i.id, title: '💊 ' + T('tkIlacBildirim', {ad: i.ad}), body: i.doz || T('tkIlac'), hour: h, minute: m, repeat: 'daily'});
}

function tkAktivite(){
  const A = D.aktivite || {}, bug = A[bugunK()] || {}, hedef = adimHedefi();
  const g14 = Array.from({length: 14}, (_, i) => gunEkle(bugunK(), i - 13));
  const yerel = window.__LF_NATIVE && !window.__LF_NATIVE.fallback && window.__lfPost;
  const el = tkIc(`<div class="card">
      <div class="kart-bas"><h3>👟 ${T('tkAdim')} <small class="hint">${T('tkAdimHedef', {n: sayi(hedef)})}</small></h3>${yerel ? `<button class="btn" id="tkSaglikAl">${T(window.__LF_NATIVE.platform === 'android' ? 'tkSaglikAlA' : 'tkSaglikAl')}</button>` : ''}</div>
      <div class="tk-satir"><label class="field"><span>${T('tkAdim')} · ${esc(T('tkUyumBugun'))}</span><input autocomplete="off" type="text" inputmode="numeric" id="tkAdimV" value="${bug.adim != null ? bug.adim : ''}"></label>
        <label class="field"><span>${T('tkUyku')}</span><input autocomplete="off" type="text" inputmode="decimal" id="tkUykuV" value="${bug.uyku != null ? sayi(bug.uyku) : ''}"></label>
        <button class="btn solid" id="tkAktKaydet">${T('tkKaydet')}</button></div>
      ${yerel ? `<p class="hint">${esc(T('tkSaglikNot'))}</p>` : ''}
      <div class="sec" style="margin-top:10px">${T('tkAdim')} · ${T('tkSon14')}</div>
      ${cubukGrafik(g14.map(k => [k, (A[k] || {}).adim || 0]), {hedef, enAz: true, xYaz: k => kisaTarih(k)})}
      <div class="sec" style="margin-top:6px">${T('tkUyku')} · ${T('tkSon14')}</div>
      ${cubukGrafik(g14.map(k => [k, (A[k] || {}).uyku || 0]), {hedef: 7, enAz: true, xYaz: k => kisaTarih(k)})}
      <p class="hint">${esc(T('tkUykuIpucu'))}</p>
    </div>
    ${antrenmanBolumu()}${tkNotHtml()}`);
  $('tkAktKaydet').onclick = () => {
    const a = sayiOku($('tkAdimV').value), u = sayiOku($('tkUykuV').value);
    const o = {...(A[bugunK()] || {})};
    if (a != null && a >= 0 && a <= 100000) o.adim = Math.round(a); if (u != null && u >= 0 && u <= 20) o.uyku = Math.round(u * 10) / 10;
    (D.aktivite || (D.aktivite = {}))[bugunK()] = o; kaydet(); rozetKontrol(); tkAktivite(); toast('✓');
  };
  if ($('tkSaglikAl')) $('tkSaglikAl').onclick = () => saglikAl(30);
  antrenmanBagla(el);
}
let saglikBekleyen = null;
window.__lfOnSaglik = r => { const f = saglikBekleyen; saglikBekleyen = null; if (f) f(r || {}); };
function saglikAl(gun){
  if (!window.__lfPost) return;
  saglikBekleyen = r => {
    if (!r.ok){ toast(T(r.yok ? 'tkSaglikYok' : 'tkSaglikIzin'), 3500); return; }
    const A = D.aktivite || (D.aktivite = {});
    (r.adim || []).forEach(([k, v]) => { A[k] = {...(A[k] || {}), adim: v, kaynak: r.kaynak}; });
    (r.uyku || []).forEach(([k, v]) => { if (v > 0) A[k] = {...(A[k] || {}), uyku: v, kaynak: r.kaynak}; });
    let kn = 0; (r.kilo || []).forEach(([k, v]) => { const T0 = D.tartim || (D.tartim = {}); if (T0[k] == null && v >= 25 && v <= 350){ T0[k] = v; kn++; } });
    kaydet(); rozetKontrol(); toast(T('tkSaglikTamam', {a: (r.adim || []).length, u: (r.uyku || []).length, k: kn}), 3500);
    if ($('takip') && !$('takip').hidden && TK.sekme === 'aktivite') tkAktivite();
  };
  window.__lfPost({t: 'saglik', gun});
}

// ---- Alınan antrenman programı (D.ant, antrenörün #a= bağlantısıyla gelir; p9f.js) ----
const antBugun = () => D.ant && (D.ant.gunler || []).find(g => g.g === haftaGunu(bugunK())) || null;
function antrenmanBolumu(){
  if (!D.ant) return `<div class="card"><div class="kart-bas"><h3>🏋️ ${T('tkAnt')}</h3></div><p class="hint">${esc(T('tkAntYok'))}</p></div>`;
  const g = antBugun(), log = ((D.antLog || {})[bugunK()]) || {};
  const rekor = {};
  for (const gl of Object.values(D.antLog || {})) for (const [e, v] of Object.entries(gl || {})) if (v && v.kg > 0 && (!rekor[e] || v.kg > rekor[e].kg)) rekor[e] = v;
  return `<div class="card">
    <div class="kart-bas"><h3>🏋️ ${esc(D.ant.ad || T('tkAnt'))}</h3>${D.ant.h ? `<small class="hint">${esc(D.ant.h)}</small>` : ''}</div>
    ${g ? `<div class="sec">${esc(T('tkAntBugun', {ad: g.ad || haftaGunAd(g.g, true)}))}</div>
      <ul class="ant-liste">${(g.h || []).map((h, i) => { const l = log[h.e + '#' + i] || {}; return `<li><div class="ant-ad"><b>${esc(egzAd(h))}</b><small>${h.s || '—'} ${T('tkSet')} × ${esc(h.t || '—')} ${T('tkTekrar')}${h.kg ? ' · ' + esc(h.kg) + ' kg' : ''}${h.dn ? ' · ' + T('tkDinlenme', {n: h.dn}) : ''}${h.n ? ' · ' + esc(h.n) : ''}</small></div>
        <div class="ant-kayit"><label><span>kg</span><input autocomplete="off" type="text" inputmode="decimal" data-antkg="${i}" value="${l.kg != null ? sayi(l.kg) : ''}"></label><label><span>${T('tkTekrar')}</span><input autocomplete="off" type="text" inputmode="numeric" data-antt="${i}" value="${l.t != null ? l.t : ''}"></label></div></li>`; }).join('')}</ul>
      <button class="btn solid full" id="antKaydet">${T('tkKaydet')}</button>` : `<p class="hint">${esc(T('tkAntDinlenme'))}</p>`}
    ${Object.keys(rekor).length ? `<div class="sec" style="margin-top:10px">${T('tkAntRekor')}</div><ul class="tk-liste">${Object.entries(rekor).slice(0, 12).map(([e, v]) => `<li><b>${esc(egzAd({e: e.split('#')[0], a: v.a}))}</b><span class="tk-etiket yesil">${sayi(v.kg)} kg × ${v.t || '—'}</span></li>`).join('')}</ul>` : ''}
    <button class="btn ghost full" style="margin-top:10px" id="antKaldir">${T('tkAntKaldir')}</button>
  </div>`;
}
function antrenmanBagla(el){
  if ($('antKaydet')) $('antKaydet').onclick = () => {
    const g = antBugun(); if (!g) return;
    const L = D.antLog || (D.antLog = {}), o = {};
    (g.h || []).forEach((h, i) => { const kg = sayiOku((el.querySelector(`[data-antkg="${i}"]`) || {}).value), t = sayiOku((el.querySelector(`[data-antt="${i}"]`) || {}).value); if (kg != null || t != null) o[h.e + '#' + i] = {kg: kg != null ? Math.round(kg * 10) / 10 : null, t: t != null ? Math.round(t) : null, a: h.a || ''}; });
    L[bugunK()] = o; kaydet(); rozetKontrol(); toast(T('tkAntTamam'));
  };
  if ($('antKaldir')) $('antKaldir').onclick = () => onayAc(T('tkSilOnay'), () => { D.ant = null; kaydet(); kapat(); takipAc('aktivite'); });
}

function tkBesin(){
  const gunler = TK.besin === 'gun' ? [bugunK()] : Array.from({length: 7}, (_, i) => gunEkle(bugunK(), i - 6));
  const M = mikroTopla(gunler), R = mikroReferans();
  const satir = a => {
    const v = M.top[a], r = R[a], ref = r.ref || r.ust, yuzde = ref ? Math.round(v / ref * 100) : 0;
    const asti = r.ust && v > r.ust, dusuk = r.ref && yuzde < 50;
    const deger = a === 'fe' || a === 'zn' || a === 'vitd' || a === 'b12' || a === 'doy' ? Math.round(v * 10) / 10 : Math.round(v);
    return `<li class="mk-satir"><div class="mk-ad"><b>${T('mk_' + a)}</b><small>${sayi(deger)} ${MIKRO_BIRIM[a]} · ${r.ust ? T('tkUstSinir') : T('tkBesinRef')} ${sayi(ref)} ${MIKRO_BIRIM[a]}</small></div>
      <div class="mk-bar"><i class="${asti ? 'asti' : dusuk ? 'dusuk' : 'iyi'}" style="width:${Math.min(100, yuzde)}%"></i></div><span class="mk-yuzde${asti ? ' asti' : ''}">${yuzde}%</span></li>`;
  };
  const el = tkIc(`<div class="card">
    <div class="kart-bas"><h3>🥦 ${T('tkS_besin')}</h3><div class="seg"><button class="${TK.besin === 'gun' ? 'on' : ''}" data-bd="gun">${T('tkBesinGun')}</button><button class="${TK.besin === 'hafta' ? 'on' : ''}" data-bd="hafta">${T('tkBesin7')}</button></div></div>
    ${M.gunSay ? `<ul class="mk-liste">${MIKRO_ALAN.map(satir).join('')}</ul><p class="hint" style="margin-top:6px">${esc(T('mkDNot'))}</p>` : `<p class="hint">${T('tkBesinYok')}</p>`}
    <p class="tk-not">ⓘ ${esc(T('tkBesinNot'))}</p></div>${tkNotHtml()}`);
  el.querySelectorAll('[data-bd]').forEach(b => b.onclick = () => { TK.besin = b.dataset.bd; tkBesin(); });
}

function tkRozet(){
  const r = D.rozet || {};
  tkIc(`<div class="rz-grid">${ROZETLER.map(([id, ik]) => `<div class="rz${r[id] ? ' acik' : ''}"><span class="rz-ik">${r[id] ? ik : '🔒'}</span><b>${T('rz_' + id)}</b><small>${T('rzA_' + id)}</small><em>${r[id] ? esc(kisaTarih(r[id])) : T('rzKilit')}</em></div>`).join('')}</div>`);
}

// ================= Cihaz taşıma: sürüm 13 alanlarının birleşimi (p7b.js verileriBirlestir çağırır) =================
// A = güncel taraf, B = öbürü. Günlük nesneler gün gün, listeler kimlik/zaman damgasıyla birleşir; hiçbir taraftan kayıt düşmez.
function ekAlanBirlestir(A, B){
  const nesne = k => ({...(B[k] || {}), ...(A[k] || {})});
  const liste = (k, anahtar) => { const m = new Map(); for (const x of (B[k] || []).concat(A[k] || [])) if (x) m.set(String(x[anahtar]), x); return [...m.values()]; };
  const gunGun = k => { const o = {...(B[k] || {})}; for (const [g, v] of Object.entries(A[k] || {})) o[g] = {...(o[g] || {}), ...v}; return o; };
  const sayac = {...(B.sayac || {})}; for (const [k, v] of Object.entries(A.sayac || {})) sayac[k] = Math.max(sayac[k] || 0, v);
  const r = {olcum: gunGun('olcum'), aktivite: gunGun('aktivite'), antLog: nesne('antLog'), ilacLog: gunGun('ilacLog'), rozet: {...(A.rozet || {}), ...(B.rozet || {})}, sayac,
    tansiyon: liste('tansiyon', 't').sort((x, y) => x.t - y.t), seker: liste('seker', 't').sort((x, y) => x.t - y.t), ilac: liste('ilac', 'id'),
    danisanlar: liste('danisanlar', 'id'), barkod: nesne('barkod'), ilerleme: liste('ilerleme', 'a'), ogunFoto: liste('ogunFoto', 'a')};
  if (!A.ant && B.ant) r.ant = B.ant;
  if (!A.pro && B.pro) r.pro = B.pro;
  if (!A.kocAnt && B.kocAnt) r.kocAnt = B.kocAnt;
  return r;
}

// ================= Ana ekran bağlantıları =================
Object.assign(S, {tkTarih:["Tarih","Date","Дата","Datum","التاريخ"], tkGecersiz:["Geçerli bir değer yaz","Enter a valid value","Введи корректное значение","Gib einen gültigen Wert ein","أدخل قيمة صحيحة"]});
(function(){
  // Üst düğme: 📊 Takip (Program hazırla düğmesinden önce)
  const b = document.createElement('button'); b.className = 'tool-btn'; b.id = 'takipBtn';
  b.innerHTML = '<span>📊</span><small id="lTakip"></small>';
  const ust = document.querySelector('.top-btns'); if (ust) ust.insertBefore(b, $('kocBtn') || ust.firstChild);
  b.onclick = () => takipAc('ozet');
  const d0 = dilUygula;
  dilUygula = function(){ const r = d0.apply(this, arguments); if ($('lTakip')) $('lTakip').textContent = T('tkBtn'); return r; };
  // Seri çipi + rozet kontrolü her çizimde
  const c0 = ciz;
  ciz = function(){
    const r = c0.apply(this, arguments);
    if ($('lTakip')) $('lTakip').textContent = T('tkBtn');
    const s = D && D.ayar && D.ayar.kurulum ? seriHesapla() : {n: 0};
    let cip = $('seriCip');
    if (s.n >= 2){ if (!cip && $('cipSatir')){ $('cipSatir').insertAdjacentHTML('afterbegin', '<button class="cip seri-cip" id="seriCip"></button>'); cip = $('seriCip'); }
      if (cip){ cip.textContent = '🔥 ' + T('tkSeriN', {n: s.n}); cip.onclick = () => takipAc('rozet'); } }
    else if (cip) cip.remove();
    rozetKontrol();
    return r;
  };
  // p8 ilk çizimi bu dosyadan önce yapar → etiket ve seri çipi şimdi bir kez
  if ($('lTakip')) $('lTakip').textContent = T('tkBtn');
  try { if (D.ayar.kurulum) setTimeout(() => { const s = seriHesapla(); if (s.n >= 2 && $('cipSatir') && !$('seriCip')){ $('cipSatir').insertAdjacentHTML('afterbegin', '<button class="cip seri-cip" id="seriCip"></button>'); $('seriCip').textContent = '🔥 ' + T('tkSeriN', {n: s.n}); $('seriCip').onclick = () => takipAc('rozet'); } rozetKontrol(true); }, 0); } catch(e){}
  // Açılışta ilaç hatırlatıcılarını yeniden kur (yerel bildirimler uygulama güncellemesinde silinmiş olabilir)
  setTimeout(() => { try { (D.ilac || []).forEach(ilacBildirimKur); } catch(e){} }, 4000);
})();

// ================= Android geri tuşu =================
// Açık katmanı kapatır: tam ekran görsel → rapor → pencere (Geri varsa geri) → Takip → Program hazırla. Ana ekranda false (uygulamadan çık).
window.__lfBack = function(){
  try {
    if ($('gorselTam')){ $('gorselTam').remove(); return true; }
    if ($('rapor') && $('rpKapat')){ $('rpKapat').click(); return true; }
    if ($('tur') && $('turGec')){ $('turGec').click(); return true; }
    if ($('overlay').classList.contains('open')){ if (geriFn) geriFn(); else kapat(); return true; }
    if ($('takip') && !$('takip').hidden){ takipKapat(); return true; }
    if (!$('koc').hidden){ const k = $('koc').querySelector('[data-kkapat]'); if (k) k.click(); else kocKapat(); return true; }
  } catch(e){}
  return false;
};
