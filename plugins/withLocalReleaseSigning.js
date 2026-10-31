// Yerel (Windows) yayın derlemesi imzası: LF_KEYSTORE_PROPS ortam değişkeni bir .properties dosyasını
// gösteriyorsa (storeFile/storePassword/keyAlias/keyPassword) release bu anahtarla imzalanır (.dev/keystore.md).
// Değişken yoksa (ör. CI) Expo varsayılanı kalır.
const { withAppBuildGradle } = require('expo/config-plugins');

const MARK = '// lf-local-signing';

module.exports = function withLocalReleaseSigning(config) {
  return withAppBuildGradle(config, (cfg) => {
    let g = cfg.modResults.contents;
    if (g.includes(MARK)) return cfg;
    g = g.replace(/signingConfigs\s*\{/, `signingConfigs { ${MARK}
        if (System.getenv('LF_KEYSTORE_PROPS') && file(System.getenv('LF_KEYSTORE_PROPS')).exists()) {
            def lfProps = new Properties()
            file(System.getenv('LF_KEYSTORE_PROPS')).withInputStream { lfProps.load(it) }
            lfUpload {
                storeFile file(lfProps['storeFile'])
                storePassword lfProps['storePassword']
                keyAlias lfProps['keyAlias']
                keyPassword lfProps['keyPassword']
            }
        }`);
    // release derleme türü: yerel anahtar varsa onu kullan. Şablon "signingConfig signingConfigs.debug" (SDK ≤56) ya da
    // "signingConfig = signingConfigs.debug" (SDK 57) yazar; ikisi de yakalanır (eşittirsiz desen SDK 57'de hiç eşleşmiyordu
    // → release sessizce debug anahtarıyla imzalanıyordu).
    const before = g;
    g = g.replace(/(release\s*\{[^{}]*?)signingConfig\s*=?\s*signingConfigs\.debug/, `$1signingConfig = (signingConfigs.findByName('lfUpload') ?: signingConfigs.debug)`);
    if (g === before) throw new Error('[withLocalReleaseSigning] release signingConfig satırı bulunamadı — şablon değişmiş olabilir');
    cfg.modResults.contents = g;
    return cfg;
  });
};
