// ---------- Sürüm 13: Profesyonel mod (diyetisyen, hekim, antrenör) ----------
// • Ayarlar → "Profesyonel mod": açıkken üstte "Program hazırla" görünür (eski kullanıcılarda Program hazırla kullanılmışsa kendiliğinden açık).
// • Unvan / ad / kurum / iletişim / logo: programın başlığına ve yazdırılan programa (PDF) girer.
// • Program hazırla ekranı sekmeleri: 🥗 Beslenme (mevcut) · 🏋️ Antrenman (hareket kütüphanesi p4l.js, #a= paylaşım linki) · 👥 Danışanlarım.
// • Danışanlarım: danışanın gönderdiği durum raporları (#r=) danışan kartına kaydedilir; anamnez, kan tahlili, görüşme notları, kontrol tarihi.
//   SUNUCUSUZ: tüm danışan verisi YALNIZ hazırlayanın cihazındadır (bağlantıyla gelen veriyi danışanın kendisi gönderir).
//   Hukuk: sağlık verisi → veri sorumlusu uzmanın kendisidir; danışandan açık rıza alması, cihazını kilitli tutması hatırlatılır.
// • Değişim listesi: günün toplamından yaklaşık değişim sayıları (Türkiye Diyetisyenler Derneği değişim değerleri: süt 9K/6P/6Y,
//   et 6P/5Y, ekmek 15K/2P, sebze 6K/1P, meyve 15K, yağ 5Y). Yaklaşık değerdir; uzmanın planlaması içindir.
Object.assign(S, {
  prMod:["Profesyonel mod","Professional mode","Профессиональный режим","Profi-Modus","الوضع الاحترافي"],
  prModAcik:["Diyetisyen, hekim veya antrenörsen aç: Program hazırla, Danışanlarım ve antrenman programı görünür.","Turn on if you're a dietitian, doctor or coach: shows Program builder, My clients and workout plans.","Включи, если ты диетолог, врач или тренер: появятся конструктор программ, клиенты и тренировки.","Aktiviere ihn als Ernährungsberatung, Ärztin/Arzt oder Coach: Programmersteller, Klient:innen und Trainingspläne erscheinen.","فعّله إذا كنت أخصائي تغذية أو طبيبًا أو مدربًا: يظهر منشئ البرامج وعملائي وبرامج التمارين."],
  prBilgi:["Unvan ve iletişim (programda ve PDF'te görünür)","Title and contact (shown on plans and PDFs)","Звание и контакты (в программе и PDF)","Titel und Kontakt (auf Plänen und PDFs)","اللقب ووسائل التواصل (تظهر في البرنامج وملف PDF)"],
  prUnvan:["Unvan","Title","Звание","Titel","اللقب"],
  prUnvanPh:["Dyt. / Uzm. Dyt. / Dr. / Antrenör","Dietitian / Dr. / Coach","Диетолог / Dr. / Тренер","Ernährungsberaterin / Dr. / Coach","أخصائي تغذية / د. / مدرب"],
  prAd:["Ad soyad","Full name","Имя и фамилия","Vor- und Nachname","الاسم الكامل"],
  prKurum:["Kurum / klinik","Clinic / organisation","Клиника / организация","Praxis / Einrichtung","العيادة / المؤسسة"],
  prTel:["Telefon","Phone","Телефон","Telefon","الهاتف"],
  prEposta:["E-posta","Email","Эл. почта","E-Mail","البريد الإلكتروني"],
  prLogo:["Logo","Logo","Логотип","Logo","الشعار"],
  prLogoSec:["Logo seç","Choose logo","Выбрать логотип","Logo wählen","اختر الشعار"],
  prLogoKaldir:["Logoyu kaldır","Remove logo","Удалить логотип","Logo entfernen","إزالة الشعار"],
  prKaydedildi:["✓ Kaydedildi","✓ Saved","✓ Сохранено","✓ Gespeichert","✓ تم الحفظ"],
  prS_b:["🥗 Beslenme","🥗 Nutrition","🥗 Питание","🥗 Ernährung","🥗 التغذية"],
  prS_a:["🏋️ Antrenman","🏋️ Workout","🏋️ Тренировки","🏋️ Training","🏋️ التمارين"],
  prS_d:["👥 Danışanlarım","👥 My clients","👥 Мои клиенты","👥 Meine Klient:innen","👥 عملائي"],
  // Danışanlar
  prDIntro:["Danışanlarının gönderdiği durum raporlarını, anamnezi, kan tahlillerini ve görüşme notlarını tek yerde tut.","Keep your clients' status reports, history, blood tests and session notes in one place.","Храни отчёты клиентов, анамнез, анализы и заметки о встречах в одном месте.","Behalte Statusberichte, Anamnese, Laborwerte und Sitzungsnotizen deiner Klient:innen an einem Ort.","احتفظ بتقارير عملائك وتاريخهم الطبي وتحاليلهم وملاحظات الجلسات في مكان واحد."],
  kocKlinik:["Klinik durum (isteğe bağlı)","Clinical condition (optional)","Клиническое состояние (необязательно)","Klinischer Zustand (optional)","الحالة السريرية (اختياري)"],
  kocEmzirme:["Emzirme","Breastfeeding","Грудное вскармливание","Stillzeit","الرضاعة"],
  kocKlinikNot:["Hedef hesabına ve otomatik programa yansır (kan şekeri: karbonhidrat %40'a kadar; tansiyon: tuzlu yiyecekler çıkar; kolesterol: doymuş yağlılar çıkar; emzirme: +500 kcal, +0,7 L su — EFSA). Klinik kararı sen verirsin.","Applied to targets and auto-plan (glucose: carbs up to 40%; blood pressure: salty foods out; cholesterol: saturated-fat foods out; breastfeeding: +500 kcal, +0.7 L water — EFSA). The clinical decision is yours.","Учитывается в целях и автопрограмме (сахар: углеводы до 40%; давление: без солёного; холестерин: без насыщенных жиров; кормление: +500 ккал, +0,7 л воды — EFSA). Клиническое решение за тобой.","Fließt in Ziele und Auto-Plan ein (Blutzucker: Kohlenhydrate bis 40 %; Blutdruck: ohne Salziges; Cholesterin: ohne gesättigte Fette; Stillzeit: +500 kcal, +0,7 L Wasser – EFSA). Die klinische Entscheidung triffst du.","تنعكس على الأهداف والبرنامج التلقائي (السكر: كربوهيدرات حتى 40%؛ الضغط: بدون الأطعمة المالحة؛ الكوليسترول: بدون الدهون المشبعة؛ الرضاعة: +500 سعرة و0.7 لتر ماء — EFSA). القرار السريري لك."],
  prDanisanYok:["Henüz danışan yok. Danışanın Takip → Rapor gönder ile sana rapor bağlantısı gönderince \"Danışanlarıma kaydet\" ile ekleyebilir ya da elle oluşturabilirsin.","No clients yet. When a client sends you a report link (Tracking → Send report), tap \"Save to my clients\", or create one manually.","Пока нет клиентов. Когда клиент пришлёт ссылку на отчёт (Трекинг → Отправить отчёт), нажми «Сохранить в клиенты» или создай вручную.","Noch keine Klient:innen. Wenn dir jemand einen Berichtslink schickt (Verlauf → Bericht senden), tippe auf „Bei Klient:innen speichern“ oder lege manuell an.","لا يوجد عملاء بعد. عندما يرسل لك عميل رابط تقرير (المتابعة ← إرسال تقرير) اضغط «حفظ في عملائي» أو أنشئه يدويًا."],
  prYeni:["＋ Yeni danışan","＋ New client","＋ Новый клиент","＋ Neue:r Klient:in","＋ عميل جديد"],
  prYapistir:["🔗 Rapor bağlantısı yapıştır","🔗 Paste report link","🔗 Вставить ссылку на отчёт","🔗 Berichtslink einfügen","🔗 لصق رابط التقرير"],
  prYapistirPh:["https://diyet.maviplay.com/app/#r=…","https://diyet.maviplay.com/app/#r=…","https://diyet.maviplay.com/app/#r=…","https://diyet.maviplay.com/app/#r=…","https://diyet.maviplay.com/app/#r=…"],
  prAc:["Aç","Open","Открыть","Öffnen","فتح"],
  prAra:["Danışan ara","Search clients","Поиск клиентов","Klient:innen suchen","ابحث عن عميل"],
  prGizlilik:["Danışan verileri yalnız bu cihazda saklanır, hiçbir sunucuya gönderilmez. Sağlık verisi olduğu için KVKK kapsamında veri sorumlusu sensin: danışanından açık rıza al, cihazını kilitli tut, gereksiz kalan kayıtları sil.","Client data is stored only on this device and never sent to any server. As this is health data, you are the data controller (GDPR/KVKK): get your client's explicit consent, keep your device locked and delete records you no longer need.","Данные клиентов хранятся только на этом устройстве и никуда не отправляются. Это данные о здоровье — оператором являешься ты: получи явное согласие клиента, блокируй устройство и удаляй ненужные записи.","Klient:innendaten werden nur auf diesem Gerät gespeichert und an keinen Server gesendet. Da es Gesundheitsdaten sind, bist du Verantwortliche:r (DSGVO): hole die ausdrückliche Einwilligung ein, sperre dein Gerät und lösche nicht mehr benötigte Daten.","تُحفظ بيانات العملاء على هذا الجهاز فقط ولا تُرسل إلى أي خادم. ولأنها بيانات صحية فأنت المسؤول عنها: احصل على موافقة صريحة من عميلك، وأبقِ جهازك مقفلًا، واحذف السجلات غير اللازمة."],
  prKaydet:["Danışanlarıma kaydet","Save to my clients","Сохранить в клиенты","Bei Klient:innen speichern","حفظ في عملائي"],
  prKimin:["Bu rapor hangi danışanın?","Which client is this report for?","Чей это отчёт?","Zu wem gehört dieser Bericht?","لأي عميل هذا التقرير؟"],
  prYeniAdla:["Yeni danışan: {a}","New client: {a}","Новый клиент: {a}","Neu: {a}","عميل جديد: {a}"],
  prEklendi:["✓ {a} kartına eklendi","✓ Added to {a}","✓ Добавлено: {a}","✓ Zu {a} hinzugefügt","✓ أُضيف إلى {a}"],
  prZatenVar:["Bu rapor zaten kayıtlı","This report is already saved","Этот отчёт уже сохранён","Dieser Bericht ist schon gespeichert","هذا التقرير محفوظ مسبقًا"],
  prDanisanlar:["‹ Danışanlar","‹ Clients","‹ Клиенты","‹ Klient:innen","‹ العملاء"],
  prSonRapor:["Son rapor: {d}","Last report: {d}","Последний отчёт: {d}","Letzter Bericht: {d}","آخر تقرير: {d}"],
  prRaporYok:["Rapor yok","No reports","Нет отчётов","Keine Berichte","لا توجد تقارير"],
  prKontrol:["Kontrol tarihi","Next check-up","Дата контроля","Nächster Termin","موعد المتابعة"],
  prKontrolGecti:["Kontrol tarihi geçti","Check-up date passed","Дата контроля прошла","Termin überschritten","فات موعد المتابعة"],
  prRaporlar:["Raporlar","Reports","Отчёты","Berichte","التقارير"],
  prKiloTrend:["Kilo (raporlardan)","Weight (from reports)","Вес (из отчётов)","Gewicht (aus Berichten)","الوزن (من التقارير)"],
  prAnamnez:["Anamnez","Medical history","Анамнез","Anamnese","التاريخ الطبي"],
  an_hedef:["Başvuru nedeni / hedef","Reason / goal","Причина обращения / цель","Anlass / Ziel","سبب المراجعة / الهدف"],
  an_hastalik:["Hastalıklar / tanılar","Conditions / diagnoses","Заболевания / диагнозы","Erkrankungen / Diagnosen","الأمراض / التشخيصات"],
  an_ilac:["Kullandığı ilaçlar / takviyeler","Medicines / supplements","Лекарства / добавки","Medikamente / Ergänzungen","الأدوية / المكملات"],
  an_alerji:["Alerji / intolerans","Allergies / intolerances","Аллергии / непереносимость","Allergien / Unverträglichkeiten","الحساسية / عدم التحمل"],
  an_ameliyat:["Geçirilmiş ameliyatlar","Past surgeries","Перенесённые операции","Frühere Operationen","العمليات السابقة"],
  an_aile:["Aile öyküsü","Family history","Семейный анамнез","Familienanamnese","التاريخ العائلي"],
  an_beslenme:["Beslenme alışkanlıkları","Eating habits","Пищевые привычки","Essgewohnheiten","العادات الغذائية"],
  an_aktivite:["Fiziksel aktivite","Physical activity","Физическая активность","Körperliche Aktivität","النشاط البدني"],
  an_uyku:["Uyku / stres","Sleep / stress","Сон / стресс","Schlaf / Stress","النوم / التوتر"],
  an_sigara:["Sigara / alkol","Smoking / alcohol","Курение / алкоголь","Rauchen / Alkohol","التدخين / الكحول"],
  an_not:["Diğer notlar","Other notes","Прочие заметки","Weitere Notizen","ملاحظات أخرى"],
  prTahlil:["Kan tahlili","Blood tests","Анализы крови","Blutwerte","تحاليل الدم"],
  prTahlilEkle:["＋ Tahlil sonucu ekle","＋ Add test result","＋ Добавить анализ","＋ Laborwert hinzufügen","＋ إضافة نتيجة تحليل"],
  prTahlilNot:["Referans aralıkları laboratuvara göre değişir; rapordaki aralığı esas al.","Reference ranges vary by lab; use the range on the lab report.","Референсы зависят от лаборатории; ориентируйся на бланк анализа.","Referenzbereiche variieren je Labor; maßgeblich ist der Laborbefund.","تختلف النطاقات المرجعية حسب المختبر؛ اعتمد نطاق تقرير المختبر."],
  prNotlar:["Görüşme notları","Session notes","Заметки о встречах","Sitzungsnotizen","ملاحظات الجلسات"],
  prNotEkle:["Not ekle","Add note","Добавить заметку","Notiz hinzufügen","إضافة ملاحظة"],
  prProgramHazirla:["🥗 Program hazırla","🥗 Build nutrition plan","🥗 Составить программу","🥗 Ernährungsplan erstellen","🥗 إعداد برنامج غذائي"],
  prAntHazirla:["🏋️ Antrenman yaz","🏋️ Write workout","🏋️ Составить тренировку","🏋️ Training erstellen","🏋️ كتابة تمرين"],
  prDisaAktar:["⬇ Dışa aktar","⬇ Export","⬇ Экспорт","⬇ Exportieren","⬇ تصدير"],
  prSil:["🗑 Danışanı sil","🗑 Delete client","🗑 Удалить клиента","🗑 Löschen","🗑 حذف العميل"],
  prSilOnay:["{a} ve tüm kayıtları bu cihazdan silinsin mi?","Delete {a} and all records from this device?","Удалить {a} и все записи с устройства?","{a} und alle Daten von diesem Gerät löschen?","هل تريد حذف {a} وكل سجلاته من هذا الجهاز؟"],
  prAdSor:["Danışanın adı","Client name","Имя клиента","Name","اسم العميل"],
  // Antrenman
  prAntBaslik:["Antrenman programı","Workout plan","Программа тренировок","Trainingsplan","البرنامج التدريبي"],
  prAntIntro:["Gün seç, hareketleri ekle, set–tekrar–ağırlığı yaz; bağlantıyı danışanına gönder. Danışan programı Takip ekranında görür ve yaptıklarını kaydeder.","Pick days, add exercises with sets, reps and load, then send the link. Your client sees the plan in Tracking and logs what they did.","Выбери дни, добавь упражнения с подходами, повторами и весом и отправь ссылку. Клиент увидит программу в «Трекинге» и будет отмечать выполненное.","Wähle Tage, füge Übungen mit Sätzen, Wiederholungen und Gewicht hinzu und sende den Link. Die Person sieht den Plan im Verlauf und trägt ihr Training ein.","اختر الأيام وأضف التمارين مع المجموعات والتكرارات والأوزان ثم أرسل الرابط. يرى عميلك البرنامج في شاشة المتابعة ويسجّل ما أنجزه."],
  prAntAd:["Program adı","Plan name","Название программы","Planname","اسم البرنامج"],
  prAntKime:["Danışan","Client","Клиент","Klient:in","العميل"],
  prAntGunAd:["Günün başlığı (ör. Göğüs + arka kol)","Day title (e.g. Chest + triceps)","Название дня (напр. Грудь + трицепс)","Tagestitel (z. B. Brust + Trizeps)","عنوان اليوم (مثل: صدر + ترايسبس)"],
  prHareketEkle:["＋ Hareket ekle","＋ Add exercise","＋ Добавить упражнение","＋ Übung hinzufügen","＋ إضافة تمرين"],
  prHareketSec:["Hareket seç","Choose exercise","Выбор упражнения","Übung wählen","اختر تمرينًا"],
  prHareketAra:["Hareket ara","Search exercises","Поиск упражнений","Übungen suchen","ابحث عن تمرين"],
  prOzelHareket:["Listede yok: \"{q}\" adıyla ekle","Not listed: add as \"{q}\"","Нет в списке: добавить «{q}»","Nicht dabei: als „{q}“ hinzufügen","غير موجود: أضفه باسم «{q}»"],
  prTumu:["Tümü","All","Все","Alle","الكل"],
  prSet:["Set","Sets","Подх.","Sätze","مجموعات"], prTekrar:["Tekrar","Reps","Повт.","Wdh.","تكرار"], prKg:["kg","kg","кг","kg","كغ"], prDn:["Dinl. (sn)","Rest (s)","Отдых (с)","Pause (s)","راحة (ث)"], prHNot:["Not","Note","Заметка","Notiz","ملاحظة"],
  prAntLink:["🔗 Paylaşım linki oluştur","🔗 Create share link","🔗 Создать ссылку","🔗 Link erstellen","🔗 إنشاء رابط مشاركة"],
  prAntYazdir:["🖨 Yazdır / PDF","🖨 Print / PDF","🖨 Печать / PDF","🖨 Drucken / PDF","🖨 طباعة / PDF"],
  prAntTemizle:["Programı temizle","Clear plan","Очистить программу","Plan leeren","مسح البرنامج"],
  prAntBos:["Önce en az bir güne hareket ekle.","Add exercises to at least one day first.","Сначала добавь упражнения хотя бы в один день.","Füge zuerst Übungen zu mindestens einem Tag hinzu.","أضف تمارين ليوم واحد على الأقل أولًا."],
  prAntGeldi:["{h} sana bir antrenman programı gönderdi","{h} sent you a workout plan","{h} прислал(а) тебе программу тренировок","{h} hat dir einen Trainingsplan geschickt","أرسل لك {h} برنامجًا تدريبيًا"],
  prAntGeldiAnon:["Sana bir antrenman programı gönderildi","You've been sent a workout plan","Тебе прислали программу тренировок","Dir wurde ein Trainingsplan geschickt","أُرسل إليك برنامج تدريبي"],
  prAntKaydet:["Programımı kaydet","Save as my plan","Сохранить программу","Als meinen Plan speichern","احفظه كبرنامجي"],
  prAntKaydedildi:["✓ Antrenman programın kaydedildi — Takip → Hareket ve uyku","✓ Workout plan saved — Tracking → Activity & sleep","✓ Программа сохранена — Трекинг → Активность и сон","✓ Trainingsplan gespeichert – Verlauf → Bewegung & Schlaf","✓ تم حفظ البرنامج — المتابعة ← النشاط والنوم"],
  prAntBozuk:["Antrenman bağlantısı açılamadı (eksik ya da bozuk).","Could not open the workout link (incomplete or damaged).","Не удалось открыть ссылку (неполная или повреждена).","Der Trainingslink konnte nicht geöffnet werden.","تعذّر فتح رابط التمرين."],
  prAntNot:["Programı danışanının sağlık durumuna göre sen belirlersin; uygulama hareket önermez.","You set the plan based on your client's health; the app doesn't prescribe exercises.","Программу определяешь ты с учётом здоровья клиента; приложение ничего не назначает.","Du legst den Plan nach dem Gesundheitszustand fest; die App verordnet keine Übungen.","أنت من يحدد البرنامج وفق الحالة الصحية لعميلك؛ لا يصف التطبيق تمارين."],
  prPaylasMetin:["{a} için antrenman programı","Workout plan for {a}","Программа тренировок для {a}","Trainingsplan für {a}","برنامج تدريبي لـ {a}"],
  // Değişim
  dgBaslik:["Değişim (yaklaşık)","Exchanges (approx.)","Обмены (прибл.)","Austauscheinheiten (ca.)","البدائل (تقريبًا)"],
  dg_sut:["Süt","Milk","Молоко","Milch","الحليب"], dg_et:["Et","Meat","Мясо","Fleisch","اللحم"], dg_ekmek:["Ekmek","Bread","Хлеб","Brot","الخبز"],
  dg_sebze:["Sebze","Veg","Овощи","Gemüse","الخضار"], dg_meyve:["Meyve","Fruit","Фрукты","Obst","الفاكهة"], dg_yag:["Yağ","Fat","Жир","Fett","الدهون"]
});

// ================= Mod ve profil =================
const proAcik = () => !!(D && D.ayar && D.ayar.pro);
function proIlkAyar(){
  if (!D || !D.ayar || D.ayar.pro !== undefined) return;
  const K = D.koc, kullanildi = (D.kocArsiv || []).length > 0 || !!(K && Array.isArray(K.gun) && K.gun.some(g => g && Object.values(g).some(l => (l || []).length)));
  D.ayar.pro = kullanildi; kaydet();
}
function proGorunum(){
  proIlkAyar();
  if ($('kocBtn')) $('kocBtn').hidden = !proAcik();
  const n = document.querySelectorAll('.top-btns .tool-btn:not([hidden])').length;
  const ust = document.querySelector('.top-btns'); if (ust) ust.style.setProperty('--btn-say', n);
}
const proImza = () => { const P = D.pro || {}; return [P.unvan, P.ad].filter(Boolean).join(' ').trim(); };

// Ayarlar bölümü (data-ak="pro")
function proBolumuEkle(){
  const sb = $('sbody'); if (!sb || sb.querySelector('[data-ak="pro"]')) return;
  const P = D.pro || {}, acik = proAcik();
  const alan = (k, ad, tip, ph) => `<label class="field"><span>${ad}</span><input autocomplete="off" type="${tip || 'text'}" id="pr_${k}" maxlength="${k === 'ad' || k === 'kurum' ? 60 : 40}" value="${esc(P[k] || '')}"${ph ? ` placeholder="${esc(ph)}"` : ''}></label>`;
  sb.insertAdjacentHTML('beforeend', `<div class="ayar-blok" data-ak="pro"><div class="sec">👩‍⚕️ ${T('prMod')}</div>
    <div class="saat-liste"><button class="saat-ek${acik ? ' on' : ''}" id="proTog" aria-pressed="${acik}"><span class="kutu">${acik ? '✓' : ''}</span>${T('prMod')}</button></div>
    <div class="hint" style="margin-top:6px">${esc(T('prModAcik'))}</div>
    ${acik ? `<div class="sec" style="margin-top:12px">${T('prBilgi')}</div>
      <div class="grid3">${alan('unvan', T('prUnvan'), 'text', T('prUnvanPh'))}${alan('ad', T('prAd'))}${alan('kurum', T('prKurum'))}${alan('tel', T('prTel'), 'tel')}${alan('eposta', T('prEposta'), 'email')}</div>
      <div class="pr-logo"><span class="pr-logo-kutu">${P.logo ? `<img alt="" src="${P.logo}">` : '🏷️'}</span><button class="btn" id="prLogoSec">${T('prLogoSec')}</button>${P.logo ? `<button class="btn ghost" id="prLogoKaldir">${T('prLogoKaldir')}</button>` : ''}</div>
      <button class="btn solid full" id="proKaydet">${T('tkKaydet')}</button>` : ''}
  </div>`);
  $('proTog').onclick = () => { D.ayar.pro = !proAcik(); kaydet(); proGorunum(); const y = sb.scrollTop; ayarlarAc(); $('sbody').scrollTop = y; };
  if ($('proKaydet')) $('proKaydet').onclick = () => {
    const o = {...(D.pro || {})}; ['unvan', 'ad', 'kurum', 'tel', 'eposta'].forEach(k => o[k] = $('pr_' + k).value.trim());
    D.pro = o; kaydet(); toast(T('prKaydedildi'));
  };
  if ($('prLogoSec')) $('prLogoSec').onclick = () => fotoSec('galeri').then(async d => {
    if (!d) return; const n0 = acSayac; D.pro = {...(D.pro || {}), logo: await gorselKucult(d, 240, 0.85)}; kaydet();
    if (acSayac !== n0 || !$('overlay').classList.contains('open')) return;   // kullanıcı Ayarlar'ı kapattıysa yeniden açma
    const y = sb.scrollTop; ayarlarAc(); $('sbody').scrollTop = y;
  });
  if ($('prLogoKaldir')) $('prLogoKaldir').onclick = () => { if (D.pro) delete D.pro.logo; kaydet(); const y = sb.scrollTop; ayarlarAc(); $('sbody').scrollTop = y; };
}
(function(){
  const i = AYAR_SIRA.indexOf('bildirim'); AYAR_SIRA.splice(i >= 0 ? i : AYAR_SIRA.length, 0, 'pro');
  const a0 = ayarlarAc;
  ayarlarAc = function(){ const r = a0.apply(this, arguments); proBolumuEkle(); ayarSirala(); return r; };
  proGorunum();
})();

// ================= Program hazırla: sekmeler =================
function kocSekme(){ return (D.koc && D.koc.sekme) || 'b'; }
(function(){
  const k0 = kocCiz;
  kocCiz = function(){
    const r = k0.apply(this, arguments);
    const alt = $('koc').querySelector('.wiz-sub');
    if (alt && !$('kocSekmeler')){
      alt.insertAdjacentHTML('afterend', `<div class="seg seg-genis koc-sekmeler" id="kocSekmeler" role="tablist">${['b', 'a', 'd'].map(s => `<button class="${kocSekme() === s ? 'on' : ''}" role="tab" aria-selected="${kocSekme() === s}" data-ksekme="${s}">${T('prS_' + s).replace(/^(\S+) /, '<span class="ks-ik">$1</span> ')}</button>`).join('')}</div>`);
      $('kocSekmeler').querySelectorAll('[data-ksekme]').forEach(b => b.onclick = () => { D.koc.sekme = b.dataset.ksekme; kaydet(); kocCiz(); $('koc').scrollTop = 0; });
    }
    if (kocSekme() !== 'b'){
      const h2 = $('koc').querySelector('.koc-in > h2'), al = $('koc').querySelector('.wiz-sub');
      if (h2) h2.textContent = kocSekme() === 'a' ? '🏋️ ' + T('prAntBaslik') : '👥 ' + T('prS_d').replace(/^👥 /, '');
      if (al) al.textContent = kocSekme() === 'a' ? T('prAntIntro') : T('prDIntro');
      let el = $('kocSekmeler').nextElementSibling;
      while (el){ el.classList.add('koc-gizli'); el = el.nextElementSibling; }
      $('kocSekmeler').insertAdjacentHTML('afterend', '<div id="proIc" class="pro-ic"></div>');
      if (kocSekme() === 'a') antCiz(); else danisanlarCiz();
    }
    return r;
  };
  // Hazırlayan bilgisi boşsa uzman profilinden doldurulur
  const a0 = kocAc;
  kocAc = function(){
    if (!D.koc) D.koc = kocBos();
    const P = D.pro || {};
    if (!(D.koc.h || '').trim() && proImza()) D.koc.h = proImza();
    if (!(D.koc.il || '').trim() && (P.tel || P.eposta)) D.koc.il = P.tel || P.eposta;
    return a0.apply(this, arguments);
  };
})();

// ================= Değişim listesi =================
function degisimHesapla(ogeler){
  let sut = 0, meyve = 0, sebze = 0, t = {c: 0, p: 0, y: 0};
  for (const it of ogeler){
    const f = yemek(it.f), b = besin(it.f, it.g); t.c += b.c; t.p += b.p; t.y += b.y;
    if (f.kat === 'sut' && b.c >= 2) sut += b.c / 9;
    else if (f.kat === 'meyve') meyve += b.c / 15;
    else if (f.kat === 'sebze' || f.kat === 'salata') sebze += Math.max(b.c, 1) / 6;
  }
  const ekmek = Math.max(0, (t.c - sut * 9 - meyve * 15 - sebze * 6) / 15);
  const et = Math.max(0, (t.p - sut * 6 - sebze * 1 - ekmek * 2) / 6);
  const yag = Math.max(0, (t.y - sut * 6 - et * 5) / 5);
  const y2 = v => Math.round(v * 2) / 2;
  return {sut: y2(sut), et: y2(et), ekmek: y2(ekmek), sebze: y2(sebze), meyve: y2(meyve), yag: y2(yag)};
}
const degisimYazi = d => Object.entries(d).filter(([, v]) => v > 0).map(([k, v]) => `${T('dg_' + k)} ${sayi(v)}`).join(' · ');
(function(){
  const t0 = kocToplamHtml;
  kocToplamHtml = function(K, i){
    const h = t0.apply(this, arguments);
    const og = kocOgunler(K).flatMap(id => (K.gun[i] || {})[id] || []);
    if (!og.length || !proAcik()) return h;
    return h + `<div class="hint koc-degisim">🔁 <b>${T('dgBaslik')}:</b> ${esc(degisimYazi(degisimHesapla(og)))}</div>`;
  };
})();
// Yazdırılan programın başlığı (logo, unvan, kurum) ve gün altına değişim satırı (p7b.js kocYazdir çağırır)
function proBaslikHtml(){
  const P = D.pro || {}; if (!proAcik() || !(P.logo || P.kurum || proImza())) return '';
  return `<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;padding-bottom:10px;border-bottom:2px solid #16a36b">${P.logo ? `<img alt="" src="${P.logo}" style="max-height:56px;max-width:140px;object-fit:contain">` : ''}<div><b style="font-size:15px">${esc(proImza())}</b>${P.kurum ? `<br><span style="color:#40506a">${esc(P.kurum)}</span>` : ''}${P.tel || P.eposta ? `<br><span style="color:#718096">${esc([P.tel, P.eposta].filter(Boolean).join(' · '))}</span>` : ''}</div></div>`;
}
function degisimSatirHtml(gun){
  if (!proAcik()) return '';
  const og = gun.flat().map(([f, g]) => ({f, g})); if (!og.length) return '';
  return `<p style="margin-top:4px;font-size:12px;color:#40506a">🔁 ${esc(T('dgBaslik'))}: ${esc(degisimYazi(degisimHesapla(og)))}</p>`;
}

// ================= Danışanlarım =================
const PR = {ara: '', sec: null};
const danisanlar = () => D.danisanlar || (D.danisanlar = []);
const danisanBul = id => danisanlar().find(x => x.id === id);
function danisanYeni(ad){ const d = {id: 'd' + Date.now().toString(36), ad: String(ad || '').trim().slice(0, 60) || '—', raporlar: [], an: {}, tahlil: [], notlar: [], kt: ''}; danisanlar().push(d); kaydet(); return d; }
const raporKimlik = R => `${R.d0}|${R.d1}|${(R.g || []).length}|${(R.g || []).reduce((t, x) => t + (+x[1] || 0), 0)}`;
function danisanKilo(d){ const m = new Map(); for (const R of d.raporlar) for (const [k, kg] of (R.t || [])) m.set(k, kg); return [...m.entries()].sort((a, b) => a[0] < b[0] ? -1 : 1); }
function danisanlarCiz(){
  const el = $('proIc'); if (!el) return;
  if (PR.sec && danisanBul(PR.sec)) return danisanKartCiz(danisanBul(PR.sec));
  PR.sec = null;
  const q = PR.ara.trim().toLocaleLowerCase(LOC()), bugun = bugunK();
  const liste = danisanlar().filter(d => !q || d.ad.toLocaleLowerCase(LOC()).includes(q))
    .sort((a, b) => ((b.raporlar[b.raporlar.length - 1] || {}).d1 || '').localeCompare((a.raporlar[a.raporlar.length - 1] || {}).d1 || ''));
  el.innerHTML = `<div class="pr-ust"><input class="search" id="prAra" type="text" inputmode="search" autocomplete="off" placeholder="${esc(T('prAra'))}" value="${esc(PR.ara)}"><button class="btn solid" id="prYeni">${T('prYeni')}</button></div>
    <div class="pr-yapistir"><input type="text" id="prLink" autocomplete="off" placeholder="${esc(T('prYapistirPh'))}" aria-label="${esc(T('prYapistir'))}"><button class="btn" id="prLinkAc">${T('prAc')}</button></div>
    ${liste.length ? `<div class="pr-liste">${liste.map(d => {
      const R = d.raporlar[d.raporlar.length - 1], kilo = danisanKilo(d), son = kilo[kilo.length - 1], ilk = kilo[0];
      const uy = R ? (R.g || []).filter(x => x[10] != null) : [], u = uy.length ? Math.round(uy.reduce((t, x) => t + x[10], 0) / uy.length) : null;
      const kt = d.kt && d.kt < bugun;
      return `<button class="card pr-kart" data-dsec="${esc(String(d.id))}"><b>${esc(d.ad)}</b>
        <small>${R ? esc(T('prSonRapor', {d: rpDonemYaz(R)})) : T('prRaporYok')}</small>
        <span class="pr-etiketler">${u != null ? `<span class="tk-etiket ${u >= 80 ? 'yesil' : u >= 50 ? 'sari' : 'kirmizi'}">🎯 ${u}%</span>` : ''}${son ? `<span class="tk-etiket">⚖️ ${sayi(son[1])} kg${ilk && ilk !== son ? ' (' + farkKg(son[1], ilk[1]) + ')' : ''}</span>` : ''}${d.kt ? `<span class="tk-etiket ${kt ? 'kirmizi' : ''}">📅 ${esc(kisaTarih(d.kt))}</span>` : ''}</span></button>`;
    }).join('')}</div>` : `<p class="hint pr-bos">${esc(T('prDanisanYok'))}</p>`}
    <p class="tk-not">🔒 ${esc(T('prGizlilik'))}</p>`;
  $('prAra').oninput = e => { PR.ara = e.target.value; const p = e.target.selectionStart; danisanlarCiz(); $('prAra').focus(); try { $('prAra').setSelectionRange(p, p); } catch(x){} };
  $('prYeni').onclick = () => adSor('', ad => { const d = danisanYeni(ad); PR.sec = d.id; danisanlarCiz(); });
  $('prLinkAc').onclick = () => { const v = $('prLink').value; if (/#r=/.test(v)) raporLinkiAc(v); else if (/#a=/.test(v)) antLinkiAc(v); else toast(T('rpBozuk')); };
  el.querySelectorAll('[data-dsec]').forEach(b => b.onclick = () => { PR.sec = b.dataset.dsec; danisanlarCiz(); $('koc').scrollTop = 0; });
}
function adSor(on, sonra){
  ac(esc(T('prAdSor')), `<label class="field"><span>${T('prAdSor')}</span><input autocomplete="off" type="text" id="prAdV" maxlength="60" value="${esc(on || '')}"></label><div class="acts"><button class="btn ghost" data-kapat="1">${T('impNo')}</button><button class="btn green" id="prAdOk">${T('tkKaydet')}</button></div>`);
  $('sbody').querySelector('[data-kapat]').onclick = kapat;
  const ok = () => { const v = $('prAdV').value.trim(); if (!v){ $('prAdV').focus(); return; } kapat(); sonra(v); };
  $('prAdOk').onclick = ok; $('prAdV').onkeydown = e => { if (e.key === 'Enter') ok(); };
  setTimeout(() => $('prAdV') && $('prAdV').focus(), 200);
}
const TAHLIL = [['glukoz', 'mg/dL', 70, 99], ['hba1c', '%', 4, 5.6], ['kol', 'mg/dL', 0, 199], ['ldl', 'mg/dL', 0, 129], ['hdl', 'mg/dL', 40, 999], ['tg', 'mg/dL', 0, 149],
  ['alt', 'U/L', 0, 40], ['kre', 'mg/dL', 0.5, 1.2], ['tsh', 'mIU/L', 0.4, 4], ['ferritin', 'ng/mL', 15, 300], ['b12', 'pg/mL', 200, 900], ['vitd', 'ng/mL', 30, 100], ['hb', 'g/dL', 12, 17]];
Object.assign(S, {
  th_glukoz:["Açlık glukozu","Fasting glucose","Глюкоза натощак","Nüchternglukose","سكر صائم"], th_hba1c:["HbA1c","HbA1c","HbA1c","HbA1c","HbA1c"], th_kol:["Total kolesterol","Total cholesterol","Общий холестерин","Gesamtcholesterin","الكوليسترول الكلي"],
  th_ldl:["LDL","LDL","ЛПНП","LDL","LDL"], th_hdl:["HDL","HDL","ЛПВП","HDL","HDL"], th_tg:["Trigliserit","Triglycerides","Триглицериды","Triglyzeride","الدهون الثلاثية"],
  th_alt:["ALT","ALT","АЛТ","ALT","ALT"], th_kre:["Kreatinin","Creatinine","Креатинин","Kreatinin","الكرياتينين"], th_tsh:["TSH","TSH","ТТГ","TSH","TSH"], th_ferritin:["Ferritin","Ferritin","Ферритин","Ferritin","الفيريتين"],
  th_b12:["B12","B12","B12","B12","B12"], th_vitd:["D vitamini (25-OH)","Vitamin D (25-OH)","Витамин D (25-OH)","Vitamin D (25-OH)","فيتامين D"], th_hb:["Hemoglobin","Haemoglobin","Гемоглобин","Hämoglobin","الهيموغلوبين"]
});
function danisanKartCiz(d){
  const el = $('proIc'), kilo = danisanKilo(d), AN = ['hedef', 'hastalik', 'ilac', 'alerji', 'ameliyat', 'aile', 'beslenme', 'aktivite', 'uyku', 'sigara', 'not'];
  const ty = (d.tahlil || []).slice().sort((a, b) => a.k < b.k ? 1 : -1);
  el.innerHTML = `<button class="btn ghost pr-geri" id="prGeri">${T('prDanisanlar')}</button>
    <div class="card"><div class="pr-bas"><input class="pr-ad" id="prAdD" type="text" maxlength="60" value="${esc(d.ad)}" aria-label="${esc(T('prAdSor'))}">
      <label class="field"><span>${T('prKontrol')}</span><input type="date" id="prKt" value="${esc(d.kt || '')}"></label></div>
      ${d.kt && d.kt < bugunK() ? `<div class="tk-uyari sari">📅 ${T('prKontrolGecti')}</div>` : ''}
      <div class="pr-dugmeler"><button class="btn green" id="prProg">${T('prProgramHazirla')}</button><button class="btn solid" id="prAntY">${T('prAntHazirla')}</button><button class="btn" id="prDis">${T('prDisaAktar')}</button><button class="btn del-btn" id="prSil">${T('prSil')}</button></div></div>
    <div class="card"><div class="kart-bas"><h3>📊 ${T('prRaporlar')}</h3></div>
      ${d.raporlar.length ? `<ul class="tk-liste">${d.raporlar.slice().reverse().map((R, j) => { const i = d.raporlar.length - 1 - j, g = R.g || [], n = g.length, ort = n ? Math.round(g.reduce((t, x) => t + (+x[1] || 0), 0) / n) : 0, uy = g.filter(x => x[10] != null), u = uy.length ? Math.round(uy.reduce((t, x) => t + x[10], 0) / uy.length) : null;
        return `<li><button class="pr-rapor" data-ropen="${i}"><b>${esc(rpDonemYaz(R))}</b><span class="hint">${T('rpKayitGun')}: ${n} · ${ort} ${T('kcal')}${u != null ? ' · 🎯 ' + u + '%' : ''}</span></button><button class="mini del" data-rsil="${i}" aria-label="${esc(T('tkSil'))}">✕</button></li>`; }).join('')}</ul>` : `<p class="hint">${T('prRaporYok')}</p>`}
      ${kilo.length > 1 ? `<div class="sec" style="margin-top:10px">${T('prKiloTrend')}</div>` + cizgiGrafik([{n: kilo}], {enAz: 2, xYaz: kisaTarih}) : ''}</div>
    <div class="card"><div class="kart-bas"><h3>🩺 ${T('prAnamnez')}</h3></div>
      <div class="pr-anamnez">${AN.map(k => `<label class="field"><span>${T('an_' + k)}</span><textarea data-an="${k}" rows="2" maxlength="600">${esc((d.an || {})[k] || '')}</textarea></label>`).join('')}</div></div>
    <div class="card"><div class="kart-bas"><h3>🧪 ${T('prTahlil')}</h3></div>
      <div class="pr-tahlil-form"><label class="field"><span>${T('tkTarih')}</span><input type="date" id="thK" value="${bugunK()}"></label>
        ${TAHLIL.map(([k, b]) => `<label class="field"><span>${T('th_' + k)} <small>${b}</small></span><input autocomplete="off" type="text" inputmode="decimal" data-th="${k}"></label>`).join('')}</div>
      <button class="btn solid full" id="thEkle">${T('prTahlilEkle')}</button>
      ${ty.length ? `<div class="tk-tablo-kap"><table class="tk-tablo"><thead><tr><th>${T('tkTarih')}</th>${TAHLIL.filter(([k]) => ty.some(x => x.v[k] != null)).map(([k]) => `<th>${T('th_' + k)}</th>`).join('')}<th></th></tr></thead>
        <tbody>${ty.map((x, i) => `<tr><td>${esc(kisaTarih(x.k))}</td>${TAHLIL.filter(([k]) => ty.some(y => y.v[k] != null)).map(([k, , lo, hi]) => { const v = x.v[k]; return `<td class="${v != null && (v < lo || v > hi) ? 'dis' : ''}">${v != null ? sayi(v) : '—'}</td>`; }).join('')}<td><button class="mini del" data-thsil="${esc(x.t)}" aria-label="${esc(T('tkSil'))}">✕</button></td></tr>`).join('')}</tbody></table></div>` : ''}
      <p class="hint" style="margin-top:6px">${esc(T('prTahlilNot'))}</p></div>
    <div class="card"><div class="kart-bas"><h3>📝 ${T('prNotlar')}</h3></div>
      <label class="field"><span>${T('prNotEkle')}</span><textarea id="prNotV" rows="3" maxlength="1000"></textarea></label><button class="btn solid full" id="prNotEkle">${T('prNotEkle')}</button>
      ${(d.notlar || []).length ? `<ul class="tk-liste pr-notlar">${d.notlar.slice().reverse().map(n => `<li><span class="tk-zaman">${esc(saatYazisi(n.t))}</span><span class="pr-not-metin">${esc(n.m)}</span><button class="mini del" data-nsil="${n.t}" aria-label="${esc(T('tkSil'))}">✕</button></li>`).join('')}</ul>` : ''}</div>
    <p class="tk-not">🔒 ${esc(T('prGizlilik'))}</p>`;
  const kayit = () => { kaydet(); };
  $('prGeri').onclick = () => { PR.sec = null; danisanlarCiz(); };
  $('prAdD').onchange = e => { d.ad = e.target.value.trim().slice(0, 60) || d.ad; kayit(); };
  $('prKt').onchange = e => { d.kt = e.target.value || ''; kayit(); danisanKartCiz(d); };
  el.querySelectorAll('[data-an]').forEach(t => t.onchange = () => { (d.an || (d.an = {}))[t.dataset.an] = t.value.trim(); kayit(); });
  $('thEkle').onclick = () => {
    const v = {}; el.querySelectorAll('[data-th]').forEach(i => { const x = sayiOku(i.value); if (x != null && x >= 0) v[i.dataset.th] = x; });
    if (!Object.keys(v).length){ toast(T('tkGecersiz')); return; }
    (d.tahlil || (d.tahlil = [])).push({t: Date.now(), k: $('thK').value || bugunK(), v}); kayit(); danisanKartCiz(d);
  };
  el.querySelectorAll('[data-thsil]').forEach(b => b.onclick = () => onayAc(T('tkSilOnay'), () => { d.tahlil = d.tahlil.filter(x => String(x.t) !== b.dataset.thsil); kayit(); kapat(); danisanKartCiz(d); }));
  $('prNotEkle').onclick = () => { const m = $('prNotV').value.trim(); if (!m) return; (d.notlar || (d.notlar = [])).push({t: Date.now(), m: m.slice(0, 1000)}); kayit(); danisanKartCiz(d); };
  el.querySelectorAll('[data-nsil]').forEach(b => b.onclick = () => onayAc(T('tkSilOnay'), () => { d.notlar = d.notlar.filter(n => String(n.t) !== b.dataset.nsil); kayit(); kapat(); danisanKartCiz(d); }));
  el.querySelectorAll('[data-ropen]').forEach(b => b.onclick = () => raporGoster(d.raporlar[+b.dataset.ropen], false));
  el.querySelectorAll('[data-rsil]').forEach(b => b.onclick = () => onayAc(T('tkSilOnay'), () => { d.raporlar.splice(+b.dataset.rsil, 1); kayit(); kapat(); danisanKartCiz(d); }));
  $('prProg').onclick = () => { D.koc.a = d.ad; D.koc.sekme = 'b'; kaydet(); kocCiz(); $('koc').scrollTop = 0; };
  $('prAntY').onclick = () => { antProgram().a = d.ad; D.koc.sekme = 'a'; kaydet(); kocCiz(); $('koc').scrollTop = 0; };
  $('prDis').onclick = () => indir(JSON.stringify({tur: 'liferoutine-danisan', v: 1, tarih: new Date().toISOString(), danisan: d}, null, 1), `danisan_${d.ad.replace(/[^\wçğıöşüÇĞİÖŞÜ]+/g, '_')}.json`, 'application/json');
  $('prSil').onclick = () => onayAc(T('prSilOnay', {a: d.ad}), () => { D.danisanlar = danisanlar().filter(x => x.id !== d.id); PR.sec = null; kaydet(); kapat(); danisanlarCiz(); });
}
// Rapor görünümündeki "Danışanlarıma kaydet"
function danisanaKaydetSor(R){
  const kaydetTo = d => {
    if (d.raporlar.some(x => raporKimlik(x) === raporKimlik(R))){ toast(T('prZatenVar')); return; }
    d.raporlar.push(R); d.raporlar.sort((a, b) => a.d1 < b.d1 ? -1 : 1); if (d.raporlar.length > 80) d.raporlar.splice(0, d.raporlar.length - 80);
    kaydet(); toast(T('prEklendi', {a: d.ad}), 2600);
  };
  const ad = String(R.a || '').trim(), ayni = danisanlar().filter(d => ad && d.ad.toLocaleLowerCase(LOC()) === ad.toLocaleLowerCase(LOC()));
  const diger = danisanlar().filter(d => !ayni.includes(d));
  ac(esc(T('prKimin')), `<div class="pr-secim">${ayni.concat(diger).map(d => `<button class="btn${ayni.includes(d) ? ' green' : ''}" data-dkay="${d.id}">${esc(d.ad)}</button>`).join('')}
    <button class="btn solid" id="prYeniK">${ad ? esc(T('prYeniAdla', {a: ad})) : T('prYeni')}</button></div>`);
  $('sbody').querySelectorAll('[data-dkay]').forEach(b => b.onclick = () => { kapat(); kaydetTo(danisanBul(b.dataset.dkay)); });
  $('prYeniK').onclick = () => { if (ad){ kapat(); kaydetTo(danisanYeni(ad)); } else adSor('', a => kaydetTo(danisanYeni(a))); };
}

// ================= Antrenman programı (hazırlayan) =================
const antProgram = () => D.kocAnt || (D.kocAnt = {ad: '', a: '', h: proImza(), n: '', gunler: []});
function antCiz(){
  const el = $('proIc'), A = antProgram(); if (!el) return;
  if (!A.h && proImza()) A.h = proImza();
  const gunVar = g => A.gunler.find(x => x.g === g);
  el.innerHTML = `<div class="card"><div class="kart-bas"><h3>🏋️ ${T('prAntBaslik')}</h3></div>
      <p class="hint" style="margin-bottom:8px">${esc(T('prAntIntro'))}</p>
      <div class="grid3"><label class="field"><span>${T('prAntAd')}</span><input autocomplete="off" type="text" id="anAd" maxlength="60" value="${esc(A.ad || '')}"></label>
        <label class="field"><span>${T('prAntKime')}</span><input autocomplete="off" type="text" id="anKime" maxlength="60" value="${esc(A.a || '')}"></label>
        <label class="field"><span>${T('kocAuthor')}</span><input autocomplete="off" type="text" id="anH" maxlength="60" value="${esc(A.h || '')}"></label></div>
      <div class="days ant-gunsec">${[0, 1, 2, 3, 4, 5, 6].map(g => `<button class="day${gunVar(g) ? ' active' : ''}" data-angun="${g}"><b>${esc(haftaGunAd(g))}</b></button>`).join('')}</div></div>
    ${A.gunler.slice().sort((a, b) => a.g - b.g).map(G => `<div class="card ant-gun" data-ag="${G.g}">
      <div class="kart-bas"><h3>${esc(haftaGunAd(G.g, true))}</h3></div>
      <label class="field"><span>${T('prAntGunAd')}</span><input autocomplete="off" type="text" data-agad="${G.g}" maxlength="60" value="${esc(G.ad || '')}"></label>
      <ul class="ant-duzen">${(G.h || []).map((h, i) => `<li><div class="ant-duzen-bas"><b>${esc(egzAd(h))}</b><span class="ant-sira"><button class="mini" data-hyuk="${G.g},${i}" aria-label="▲">▲</button><button class="mini" data-hasa="${G.g},${i}" aria-label="▼">▼</button><button class="mini del" data-hsil="${G.g},${i}" aria-label="${esc(T('tkSil'))}">✕</button></span></div>
        <div class="ant-alanlar"><label><span>${T('prSet')}</span><input autocomplete="off" type="text" inputmode="numeric" data-hs="${G.g},${i}" value="${esc(h.s || '')}"></label><label><span>${T('prTekrar')}</span><input autocomplete="off" type="text" data-ht="${G.g},${i}" value="${esc(h.t || '')}" maxlength="12"></label><label><span>${T('prKg')}</span><input autocomplete="off" type="text" inputmode="decimal" data-hkg="${G.g},${i}" value="${esc(h.kg || '')}" maxlength="8"></label><label><span>${T('prDn')}</span><input autocomplete="off" type="text" inputmode="numeric" data-hdn="${G.g},${i}" value="${esc(h.dn || '')}" maxlength="4"></label></div>
        <input class="koc-not" autocomplete="off" type="text" data-hn="${G.g},${i}" maxlength="80" placeholder="${esc(T('prHNot'))}" value="${esc(h.n || '')}"></li>`).join('')}</ul>
      <button class="add-food" data-hekle="${G.g}">${T('prHareketEkle')}</button></div>`).join('')}
    <div class="card"><label class="field"><span>${T('prHNot')}</span><textarea id="anNot" rows="2" maxlength="300">${esc(A.n || '')}</textarea></label>
      <div class="pr-dugmeler"><button class="btn green" id="anLink">${T('prAntLink')}</button><button class="btn" id="anYaz">${T('prAntYazdir')}</button><button class="btn ghost" id="anTemiz">${T('prAntTemizle')}</button></div>
      <p class="hint" style="margin-top:6px">${esc(T('prAntNot'))}</p></div>`;
  const kayit = () => kaydet();
  const bul = s => { const [g, i] = s.split(',').map(Number); return [A.gunler.find(x => x.g === g), i]; };
  $('anAd').onchange = e => { A.ad = e.target.value.trim(); kayit(); };
  $('anKime').onchange = e => { A.a = e.target.value.trim(); kayit(); };
  $('anH').onchange = e => { A.h = e.target.value.trim(); kayit(); };
  $('anNot').onchange = e => { A.n = e.target.value.trim(); kayit(); };
  el.querySelectorAll('[data-angun]').forEach(b => b.onclick = () => {
    const g = +b.dataset.angun, v = gunVar(g);
    if (v){ if ((v.h || []).length) onayAc(T('tkSilOnay'), () => { A.gunler = A.gunler.filter(x => x !== v); kayit(); kapat(); antCiz(); }); else { A.gunler = A.gunler.filter(x => x !== v); kayit(); antCiz(); } }
    else { A.gunler.push({g, ad: '', h: []}); kayit(); antCiz(); }
  });
  el.querySelectorAll('[data-agad]').forEach(i => i.onchange = () => { const G = gunVar(+i.dataset.agad); if (G){ G.ad = i.value.trim(); kayit(); } });
  const alan = (sel, k, f) => el.querySelectorAll(`[${sel}]`).forEach(i => i.onchange = () => { const [G, j] = bul(i.getAttribute(sel)); if (G && G.h[j]){ G.h[j][k] = f ? f(i.value) : i.value.trim(); kayit(); } });
  alan('data-hs', 's', v => String(v).replace(/\D/g, '').slice(0, 2)); alan('data-ht', 't'); alan('data-hkg', 'kg'); alan('data-hdn', 'dn', v => String(v).replace(/\D/g, '').slice(0, 4)); alan('data-hn', 'n');
  el.querySelectorAll('[data-hsil]').forEach(b => b.onclick = () => { const [G, j] = bul(b.dataset.hsil); G.h.splice(j, 1); kayit(); antCiz(); });
  el.querySelectorAll('[data-hyuk],[data-hasa]').forEach(b => b.onclick = () => {
    const [G, j] = bul(b.dataset.hyuk || b.dataset.hasa), k = j + (b.dataset.hyuk ? -1 : 1);
    if (k < 0 || k >= G.h.length) return; [G.h[j], G.h[k]] = [G.h[k], G.h[j]]; kayit(); antCiz();
  });
  el.querySelectorAll('[data-hekle]').forEach(b => b.onclick = () => hareketSec(+b.dataset.hekle));
  $('anLink').onclick = antLinkPaylas;
  $('anYaz').onclick = antYazdir;
  $('anTemiz').onclick = () => onayAc(T('tkSilOnay'), () => { D.kocAnt = null; kaydet(); kapat(); antCiz(); });
}
const AS = {q: '', g: ''};
function hareketSec(gun){
  ac(esc(T('prHareketSec')), `<input class="search" id="hAra" type="text" inputmode="search" autocomplete="off" placeholder="${esc(T('prHareketAra'))}" value="${esc(AS.q)}">
    <div class="chips" id="hGrup">${['', ...EGZ_GRUP].map(g => `<button class="chip${AS.g === g ? ' on' : ''}" data-hg="${g}">${g ? T('eg_' + g) : T('prTumu')}</button>`).join('')}</div>
    <ul class="flist" id="hListe"></ul>`);
  const ciz2 = () => {
    const q = AS.q.trim(), A = q ? aramaHazirla(q) : null;
    const l = EGZ.filter(e => (!AS.g || e.g === AS.g) && (!A || A.alternatifler.some(k => k.every(r => r.test(e.n.join(' '))))));
    $('hListe').innerHTML = l.map(e => `<li><button class="frow" data-hid="${e.id}"><b>${esc(e.ad)}</b><small>${T('eg_' + e.g)}</small></button></li>`).join('')
      + (q ? `<li><button class="frow" data-hozel="1"><b>＋ ${esc(T('prOzelHareket', {q}))}</b></button></li>` : '');
    $('hListe').querySelectorAll('[data-hid]').forEach(b => b.onclick = () => ekle({e: b.dataset.hid}));
    const oz = $('hListe').querySelector('[data-hozel]'); if (oz) oz.onclick = () => ekle({e: 'ozel', a: q.slice(0, 60)});
  };
  const ekle = h => { const G = antProgram().gunler.find(x => x.g === gun); if (!G) return; G.h.push({...h, s: '3', t: '10', kg: '', dn: '90', n: ''}); kaydet(); kapat(); antCiz(); };
  $('hAra').oninput = e => { AS.q = e.target.value; ciz2(); };
  $('hGrup').querySelectorAll('[data-hg]').forEach(b => b.onclick = () => { AS.g = b.dataset.hg; $('hGrup').querySelectorAll('[data-hg]').forEach(x => x.classList.toggle('on', x === b)); ciz2(); });
  ciz2();
}
// Paylaşım paketi: {v:1, ad, a, h, n, il, g:[[gün, başlık, [[e, a, s, t, kg, dn, n], …]], …]}
function antPaket(){
  const A = antProgram(), g = A.gunler.filter(G => (G.h || []).length).sort((x, y) => x.g - y.g).map(G => [G.g, G.ad || '', G.h.map(h => [h.e, h.e === 'ozel' ? h.a || '' : '', h.s || '', h.t || '', h.kg || '', h.dn || '', h.n || ''])]);
  if (!g.length) return null;
  const P = D.pro || {};
  return {v: 1, ad: A.ad || '', a: A.a || '', h: A.h || '', n: A.n || '', il: P.tel || P.eposta || '', g};
}
function antDogrula(P){
  if (!P || P.v !== 1 || !Array.isArray(P.g) || !P.g.length || P.g.length > 7) return null;
  const s = (x, n) => String(x == null ? '' : x).slice(0, n);
  const gunler = P.g.filter(x => Array.isArray(x) && x[0] >= 0 && x[0] <= 6 && Array.isArray(x[2])).map(([g, ad, h]) => ({g: +g, ad: s(ad, 60), h: h.slice(0, 40).map(x => ({e: EGZ_HARITA.has(x[0]) ? x[0] : 'ozel', a: s(x[1] || (EGZ_HARITA.has(x[0]) ? '' : x[0]), 60), s: s(x[2], 3), t: s(x[3], 12), kg: s(x[4], 8), dn: s(x[5], 4), n: s(x[6], 80)}))}));
  return gunler.length ? {ad: s(P.ad, 60), a: s(P.a, 60), h: s(P.h, 60), n: s(P.n, 300), il: s(P.il, 80), gunler} : null;
}
async function antLinkPaylas(){
  const P = antPaket(); if (!P){ toast(T('prAntBos')); return; }
  const kod = await paketKodla(P), url = PAYLASIM_TABAN + '#a=' + kod + '&n=' + kod.length, metin = T('prPaylasMetin', {a: P.a || P.ad || T('tkAnt')});
  ac(esc(T('prAntLink').replace(/^🔗 /, '')), `<div class="cur"><b>${esc(P.ad || T('prAntBaslik'))}</b>${P.a ? ' · ' + esc(P.a) : ''}<br><small>${P.g.map(g => esc(haftaGunAd(g[0], true)) + ' (' + g[2].length + ')').join(' · ')}</small></div>
    <div class="rp-dugmeler" style="margin-top:10px"><button class="btn green" id="anWa">💬 ${T('rpWhatsapp')}</button><button class="btn solid" id="anPay">${T('rpPaylas')}</button><button class="btn" id="anKop">🔗 ${T('rpKopyala')}</button></div>`);
  $('anWa').onclick = () => window.open('https://wa.me/?text=' + encodeURIComponent(metin + '\n' + url), '_blank');
  $('anPay').onclick = () => { if (navigator.share) navigator.share({title: metin, text: metin, url}).catch(() => {}); else kopyala(url); };
  $('anKop').onclick = () => kopyala(url);
}
function antYazdir(){
  const P = antPaket(); if (!P){ toast(T('prAntBos')); return; }
  const html = `<!DOCTYPE html><html lang="${dil}" dir="${RTL() ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><title>${esc(P.ad || T('prAntBaslik'))}</title><style>
    body{font-family:system-ui,"Segoe UI",Roboto,sans-serif;color:#172338;margin:24px;font-size:13px}h1{font-size:20px;margin:0 0 4px}p{margin:2px 0;color:#40506a}
    section{break-inside:avoid;margin-top:14px}h2{font-size:15px;margin:0 0 6px;color:#2563eb}table{width:100%;border-collapse:collapse}th,td{border:1px solid #dfe5ee;padding:6px 8px;text-align:start;vertical-align:top}th{background:#f5f8fc}</style></head><body>
    ${proBaslikHtml()}<h1>${esc(P.ad || T('prAntBaslik'))}${P.a ? ' · ' + esc(P.a) : ''}</h1>${P.h ? `<p>${esc(P.h)}</p>` : ''}${P.n ? `<p>${esc(P.n)}</p>` : ''}
    ${P.g.map(([g, ad, h]) => `<section><h2>${esc(haftaGunAd(g, true))}${ad ? ' — ' + esc(ad) : ''}</h2><table><thead><tr><th>${T('prHareketSec')}</th><th>${T('prSet')}</th><th>${T('prTekrar')}</th><th>${T('prKg')}</th><th>${T('prDn')}</th><th>${T('prHNot')}</th></tr></thead>
      <tbody>${h.map(x => `<tr><td>${esc(egzAd({e: x[0], a: x[1]}))}</td><td>${esc(x[2])}</td><td>${esc(x[3])}</td><td>${esc(x[4])}</td><td>${esc(x[5])}</td><td>${esc(x[6])}</td></tr>`).join('')}</tbody></table></section>`).join('')}
    <p style="margin-top:16px;font-size:11px;color:#718096">${esc(T('prAntNot'))}</p><script>onload=()=>setTimeout(()=>print(),300)<\/script></body></html>`;
  const dosya = `antrenman_${(P.a || P.ad || 'program').replace(/[^\wçğıöşüÇĞİÖŞÜ]+/g, '_')}.html`;
  if (window.__LF_NATIVE){ indir(html.replace('<script>onload=()=>setTimeout(()=>print(),300)<\/script>', ''), dosya, 'text/html'); return; }
  const w = window.open('', '_blank'); if (w){ w.document.write(html); w.document.close(); } else indir(html, dosya, 'text/html');
}
// ================= Antrenman bağlantısı (alıcı) =================
async function antLinkiAc(metin){
  const m = String(metin || '').match(/#a=([A-Za-z0-9_-]+)(?:&n=(\d+))?/);
  if (!m) return false;
  let A = null;
  if (!m[2] || +m[2] === m[1].length){ try { A = antDogrula(await paketCoz(m[1])); } catch(e){} }
  const temizle = () => { if (/^#a=/.test(location.hash)) raporLinkTemizle(); };
  if (!A){ temizle(); toast(T('prAntBozuk')); return true; }
  ac(esc(A.ad || T('prAntBaslik')), `<p class="onay-metin">${esc(A.h ? T('prAntGeldi', {h: A.h}) : T('prAntGeldiAnon'))}</p>
    <ul class="tk-liste">${A.gunler.map(g => `<li><b>${esc(haftaGunAd(g.g, true))}${g.ad ? ' — ' + esc(g.ad) : ''}</b><span class="hint">${g.h.map(egzAd).map(esc).join(', ')}</span></li>`).join('')}</ul>
    ${A.n ? `<p class="hint" style="margin-top:8px">${esc(A.n)}</p>` : ''}
    <div class="acts"><button class="btn ghost" id="anHayir">${T('impNo')}</button><button class="btn green" id="anEvet">${T('prAntKaydet')}</button></div>`);
  $('anHayir').onclick = () => { kapat(); temizle(); };
  $('anEvet').onclick = () => { D.ant = {...A, t: Date.now()}; kaydet(); kapat(); temizle(); toast(T('prAntKaydedildi'), 3500); if (D.ayar.kurulum) setTimeout(() => takipAc('aktivite'), 400); };
  return true;
}
(function(){
  const k = () => { if (/^#a=/.test(location.hash)) setTimeout(() => antLinkiAc(location.hash), 450); };
  window.addEventListener('hashchange', k);
  if (document.readyState === 'complete') k(); else window.addEventListener('load', k);
})();
// Ana ekrandaki antrenman kartına bugünün programı satırı
(function(){
  const a0 = antrenmanKarti;
  antrenmanKarti = function(k){
    const h = a0.apply(this, arguments);
    if (!D.ant || k !== bugunK()) return h;
    const g = antBugun(); if (!g) return h;
    return h + `<div class="card bant ant-kart ant"><div class="bant-bas"><b>🏋️ ${esc(T('tkAntBugun', {ad: g.ad || D.ant.ad || T('tkAnt')}))}</b><small>${g.h.length} · ${esc(g.h.slice(0, 3).map(egzAd).join(', '))}${g.h.length > 3 ? '…' : ''}</small></div><button class="btn solid" data-antac="1">${T('tkS_aktivite')} ›</button></div>`;
  };
  document.querySelector('.wrap').addEventListener('click', e => { if (e.target.closest('[data-antac]')) takipAc('aktivite'); });
})();
