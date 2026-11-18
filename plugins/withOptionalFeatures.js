// Play "zorunlu donanım özelliği" uyarısı (18.11, vc14): CAMERA izni kamerayı ve otomatik odağı, ML Kit'in dikey kilitli görünmez
// GmsBarcodeScanningDelegateActivity'si android.hardware.screen.portrait'i ZORUNLU yapıyordu → ~1.800 cihaz (Chromebook, araç, TV,
// bazı tabletler) uygulamayı yükleyemiyordu. Kamera yalnız fotoğraf/barkod için; yoksa uygulama galeri ve elle girişle çalışır.
const { withAndroidManifest } = require('expo/config-plugins');

const OZELLIK = ['android.hardware.camera', 'android.hardware.camera.autofocus', 'android.hardware.camera.any', 'android.hardware.screen.portrait', 'android.hardware.screen.landscape'];

module.exports = function withOptionalFeatures(config) {
  return withAndroidManifest(config, (c) => {
    const m = c.modResults.manifest;
    m['uses-feature'] = (m['uses-feature'] || []).filter((f) => !OZELLIK.includes(f.$['android:name']));
    for (const ad of OZELLIK) m['uses-feature'].push({ $: { 'android:name': ad, 'android:required': 'false' } });
    return c;
  });
};
