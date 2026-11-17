// LifeRoutine — Expo yapılandırması. Sabit ayarlar app.json'da; GÖRÜNEN AD yalnız burada (TEK YER).
// APP_NAME'i değiştir → ana ekran / ayarlar adı (iOS CFBundleDisplayName, Android app_name; 5 dilde) ve
// App.tsx'teki yedek ekran başlığı (Constants.expoConfig.name) birlikte değişir. Mağaza listeleme adı ayrıdır.
const APP_NAME = 'LifeRoutine';
const DILLER = ['tr', 'en', 'ru', 'de', 'ar'];
// iOS izin açıklamaları (InfoPlist.strings, dil başına). Varsayılan Türkçe metinler app.json eklenti ayarlarında.
const IZIN = {
  NSCameraUsageDescription: {
    tr: 'LifeRoutine, besin paketlerinin barkodunu okumak ve öğün fotoğrafı çekmek için kamerayı kullanır. Görüntüler cihazınızdan çıkmaz.',
    en: 'LifeRoutine uses the camera to scan food package barcodes and take meal photos. Images never leave your device.',
    ru: 'LifeRoutine использует камеру, чтобы сканировать штрихкоды продуктов и фотографировать блюда. Снимки не покидают ваше устройство.',
    de: 'LifeRoutine nutzt die Kamera, um Barcodes von Lebensmitteln zu scannen und Mahlzeiten zu fotografieren. Die Bilder verlassen dein Gerät nicht.',
    ar: 'يستخدم LifeRoutine الكاميرا لمسح الباركود على عبوات الطعام وتصوير الوجبات. لا تغادر الصور جهازك.',
  },
  NSPhotoLibraryUsageDescription: {
    tr: 'LifeRoutine, seçtiğiniz öğün fotoğrafını cihazınızda tanımak için kullanır. Fotoğraf cihazınızdan çıkmaz.',
    en: 'LifeRoutine uses the meal photo you choose to recognise the dish on your device. The photo never leaves your device.',
    ru: 'LifeRoutine использует выбранное вами фото блюда, чтобы распознать его на устройстве. Фото не покидает ваше устройство.',
    de: 'LifeRoutine verwendet das ausgewählte Essensfoto, um das Gericht auf deinem Gerät zu erkennen. Das Foto verlässt dein Gerät nicht.',
    ar: 'يستخدم LifeRoutine صورة الوجبة التي تختارها للتعرّف على الطبق على جهازك. لا تغادر الصورة جهازك.',
  },
  NSHealthShareUsageDescription: {
    tr: 'LifeRoutine, günlük adım, uyku ve kilo bilgilerinizi takip ekranında göstermek için Sağlık uygulamasından okur. Bu veriler cihazınızdan çıkmaz ve reklamda kullanılmaz.',
    en: 'LifeRoutine reads your daily steps, sleep and weight from Health to show them on the tracking screen. This data never leaves your device and is never used for advertising.',
    ru: 'LifeRoutine считывает шаги, сон и вес из приложения «Здоровье», чтобы показать их на экране отслеживания. Эти данные не покидают устройство и не используются для рекламы.',
    de: 'LifeRoutine liest deine täglichen Schritte, deinen Schlaf und dein Gewicht aus Health, um sie in der Übersicht anzuzeigen. Diese Daten verlassen dein Gerät nicht und werden nicht für Werbung genutzt.',
    ar: 'يقرأ LifeRoutine خطواتك اليومية ونومك ووزنك من تطبيق صحتي لعرضها في شاشة المتابعة. لا تغادر هذه البيانات جهازك ولا تُستخدم للإعلانات.',
  },
  NSHealthUpdateUsageDescription: {
    tr: 'LifeRoutine Sağlık uygulamasına veri yazmaz; adım, uyku ve kilo bilgilerinizi yalnız okur. Bu veriler cihazınızdan çıkmaz.',
    en: 'LifeRoutine does not write any data to Health; it only reads your steps, sleep and weight. This data never leaves your device.',
    ru: 'LifeRoutine не записывает данные в «Здоровье», а только считывает шаги, сон и вес. Эти данные не покидают устройство.',
    de: 'LifeRoutine schreibt keine Daten in Health, sondern liest nur Schritte, Schlaf und Gewicht. Diese Daten verlassen dein Gerät nicht.',
    ar: 'لا يكتب LifeRoutine أي بيانات في تطبيق الصحة؛ بل يقرأ خطواتك ونومك ووزنك فقط. لا تغادر هذه البيانات جهازك.',
  },
};
const izinMetni = (d) => Object.fromEntries(Object.entries(IZIN).map(([k, v]) => [k, v[d]]));

module.exports = ({ config }) => ({
  ...config,
  name: APP_NAME,
  // app.json "locales" eşdeğeri; dosya yolu yerine satır içi nesne (expo/config-plugins ikisini de kabul eder)
  locales: Object.fromEntries(DILLER.map((d) => [d, { ios: { CFBundleDisplayName: APP_NAME, ...izinMetni(d) }, android: { app_name: APP_NAME } }])),
});
