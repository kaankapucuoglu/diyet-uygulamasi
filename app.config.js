// LifeRoutine — Expo yapılandırması. Sabit ayarlar app.json'da; GÖRÜNEN AD yalnız burada (TEK YER).
// APP_NAME'i değiştir → ana ekran / ayarlar adı (iOS CFBundleDisplayName, Android app_name; 5 dilde) ve
// App.tsx'teki yedek ekran başlığı (Constants.expoConfig.name) birlikte değişir. Mağaza listeleme adı ayrıdır.
const APP_NAME = 'LifeRoutine';
const DILLER = ['tr', 'en', 'ru', 'de', 'ar'];

module.exports = ({ config }) => ({
  ...config,
  name: APP_NAME,
  // app.json "locales" eşdeğeri; dosya yolu yerine satır içi nesne (expo/config-plugins ikisini de kabul eder)
  locales: Object.fromEntries(DILLER.map((d) => [d, { ios: { CFBundleDisplayName: APP_NAME }, android: { app_name: APP_NAME } }])),
});
