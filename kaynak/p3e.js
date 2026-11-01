// Onay ekranı metinleri: hesap açılırken KVKK aydınlatma + sağlık verisi açık rızası + koşullar + yaş + isteğe bağlı sıralama
// Metin sürümü sunucuya consent.ver olarak gider (docs/API.md → POST /register, POST /consent). Metin değişirse sürümü artır ve yeniden rıza iste.
// Kullanım: T('cBoxKvkk', {link: `<a href="${HUKUK_URL.aydinlatma}#${dil}" target="_blank" rel="noopener">${T('cBoxKvkkLink')}</a>`})
Object.assign(S, {
  // Başlık ve giriş (3 cümle: ne topluyoruz, nerede, neden rıza)
  cTitle:["Hesap açmadan önce","Before you create an account","Перед созданием аккаунта","Bevor du ein Konto anlegst","قبل إنشاء الحساب"],
  cIntro:["Hesap açarsan profilin, öğün ve su kayıtların, tartı ve ölçülerin cihazların arasında eşitlenmek için Almanya'daki (AB içi) sunucumuza yazılır. Bu bilgiler sağlık verisi sayılır; işlenmeleri ve yurt dışına aktarılmaları için açık rızan gerekir. Bu veriler reklam için kullanılmaz, üçüncü taraflarla paylaşılmaz ve takip yapılmaz; verilerini istediğin zaman indirebilir veya silebilirsin.",
    "If you create an account, your profile, meal and water logs, weigh-ins and measurements are stored on our server in Germany (within the EU) so they sync across your devices. This is health data, so we need your explicit consent to process it and transfer it abroad. This data is never used for advertising or shared with third parties, and there is no tracking; you can download or delete your data at any time.",
    "Если вы создадите аккаунт, ваш профиль, записи о еде и воде, взвешивания и замеры будут сохраняться на нашем сервере в Германии (в ЕС) для синхронизации между устройствами. Это данные о здоровье, поэтому для их обработки и передачи за рубеж нужно ваше явное согласие. Эти данные не используются для рекламы и не передаются третьим лицам, слежки нет; вы можете скачать или удалить свои данные в любой момент.",
    "Legst du ein Konto an, werden dein Profil, deine Mahlzeiten- und Wasserprotokolle sowie Wiegungen und Maße auf unserem Server in Deutschland (in der EU) gespeichert, damit sie zwischen deinen Geräten synchron bleiben. Das sind Gesundheitsdaten; für ihre Verarbeitung und Übermittlung ins Ausland brauchen wir deine ausdrückliche Einwilligung. Diese Daten werden nie für Werbung genutzt oder an Dritte weitergegeben, und es gibt kein Tracking; du kannst deine Daten jederzeit herunterladen oder löschen.",
    "إذا أنشأت حساباً فسيُحفَظ ملفك الشخصي وسجلات الوجبات والماء والوزن والقياسات على خادمنا في ألمانيا (داخل الاتحاد الأوروبي) لمزامنتها بين أجهزتك. وهذه بيانات صحية، لذا نحتاج إلى موافقتك الصريحة لمعالجتها ونقلها إلى خارج البلاد. لا تُستخدَم هذه البيانات للإعلانات ولا تُشارَك مع أطراف ثالثة، ولا يوجد تتبّع؛ ويمكنك تنزيل بياناتك أو حذفها في أي وقت."],

  // Onay kutuları (zorunlu olanlar: Kvkk, Health, Terms, Age · isteğe bağlı: Lb)
  cBoxKvkk:["{link} okudum ve anladım.","I have read and understood the {link}.","Я прочитал(а) и понял(а) {link}.","Ich habe das {link} gelesen und verstanden.","قرأتُ {link} وفهمتُه."],
  cBoxKvkkLink:["Aydınlatma metnini","privacy notice","уведомление об обработке данных","Informationsschreiben","إشعار معالجة البيانات"],
  cBoxHealth:["Sağlık verilerimin işlenmesine ve Almanya'daki sunucuya aktarılmasına açık rıza veriyorum.","I give my explicit consent to the processing of my health data and its transfer to the server in Germany.","Я даю явное согласие на обработку моих данных о здоровье и их передачу на сервер в Германии.","Ich willige ausdrücklich in die Verarbeitung meiner Gesundheitsdaten und ihre Übermittlung an den Server in Deutschland ein.","أُعطي موافقتي الصريحة على معالجة بياناتي الصحية ونقلها إلى الخادم في ألمانيا."],
  cBoxTerms:["{link} kabul ediyorum.","I accept the {link}.","Я принимаю {link}.","Ich akzeptiere die {link}.","أقبل {link}."],
  cBoxTermsLink:["Kullanım koşullarını","terms of use","условия использования","Nutzungsbedingungen","شروط الاستخدام"],
  cBoxAge:["16 yaşından büyüğüm.","I am over 16 years old.","Мне больше 16 лет.","Ich bin über 16 Jahre alt.","أنا أكبر من 16 عاماً."],
  cBoxLb:["Sıralamaya katılmak istiyorum: yalnız kullanıcı adım ve seri gün sayım görünür (isteğe bağlı; Ayarlar'dan değiştirilebilir).","I want to join the leaderboard: only my username and streak are shown (optional; can be changed in Settings).","Хочу участвовать в рейтинге: видны только моё имя пользователя и серия дней (необязательно; меняется в настройках).","Ich möchte an der Rangliste teilnehmen: Nur mein Benutzername und meine Serie sind sichtbar (optional; in den Einstellungen änderbar).","أريد الانضمام إلى الترتيب: يظهر اسم المستخدم وعدد أيام سلسلتي فقط (اختياري؛ يمكن تغييره من الإعدادات)."],
  cNeedAll:["Devam etmek için işaretli olmayan zorunlu kutuları işaretle.","Tick the required boxes to continue.","Отметьте обязательные пункты, чтобы продолжить.","Bitte die Pflichtfelder ankreuzen, um fortzufahren.","علّم الخانات الإلزامية للمتابعة."],

  // Düğmeler
  cAccept:["Kabul et ve hesap aç","Accept and create account","Принять и создать аккаунт","Zustimmen und Konto anlegen","أوافق وأنشئ الحساب"],
  cLater:["Hesapsız devam et","Continue without an account","Продолжить без аккаунта","Ohne Konto fortfahren","المتابعة من دون حساب"],
  cLaterNote:["Hesapsız kullanımda verilerin yalnız bu cihazda kalır; rıza gerekmez.","Without an account your data stays on this device only; no consent is needed.","Без аккаунта данные остаются только на этом устройстве; согласие не требуется.","Ohne Konto bleiben deine Daten nur auf diesem Gerät; eine Einwilligung ist nicht nötig.","من دون حساب تبقى بياناتك على هذا الجهاز فقط؛ ولا تلزم أي موافقة."],

  // Rızayı geri çekme ve tıbbi uyarı
  cWithdraw:["Rızanı istediğin zaman geri çekebilirsin: Ayarlar → Hesap → Hesabı sil. Hesabın ve sunucudaki verilerin silinir; cihazındaki veriler kalır.","You can withdraw your consent at any time: Settings → Account → Delete account. Your account and server data are deleted; the data on your device stays.","Вы можете отозвать согласие в любой момент: Настройки → Аккаунт → Удалить аккаунт. Аккаунт и данные на сервере удаляются; данные на устройстве остаются.","Du kannst deine Einwilligung jederzeit widerrufen: Einstellungen → Konto → Konto löschen. Konto und Serverdaten werden gelöscht; die Daten auf deinem Gerät bleiben.","يمكنك سحب موافقتك في أي وقت: الإعدادات → الحساب → حذف الحساب. يُحذَف حسابك وبياناتك على الخادم؛ وتبقى البيانات على جهازك."],
  cMedical:["Uygulama tıbbi tavsiye vermez. Beslenmeni değiştirmeden önce hekimine veya diyetisyenine danış.","The app does not provide medical advice. Consult your doctor or dietitian before changing your diet.","Приложение не даёт медицинских рекомендаций. Перед изменением питания проконсультируйтесь с врачом или диетологом.","Die App bietet keine medizinische Beratung. Sprich vor einer Ernährungsumstellung mit deiner Ärztin, deinem Arzt oder einer Ernährungsfachkraft.","التطبيق لا يقدّم نصيحة طبية. استشر طبيبك أو أخصائي التغذية قبل تغيير نظامك الغذائي."],

  // Bağlantı etiketleri (ekranın altındaki belge listesi; Ayarlar → Hesap içinde de kullanılır)
  cLinks:["Belgeler","Documents","Документы","Dokumente","الوثائق"],
  cLinkPriv:["Gizlilik Politikası","Privacy Policy","Политика конфиденциальности","Datenschutzerklärung","سياسة الخصوصية"],
  cLinkKvkk:["Aydınlatma Metni","Privacy Notice (KVKK)","Уведомление KVKK","KVKK-Informationsschreiben","إشعار KVKK"],
  cLinkConsent:["Açık Rıza Metni","Explicit Consent","Явное согласие","Ausdrückliche Einwilligung","الموافقة الصريحة"],
  cLinkTerms:["Kullanım Koşulları","Terms of Use","Условия использования","Nutzungsbedingungen","شروط الاستخدام"],
  cLinkDelete:["Hesap silme","Account deletion","Удаление аккаунта","Konto löschen","حذف الحساب"]
});
