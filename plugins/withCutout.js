// Android çentik kipi: varsayılan kip pencereyi çentiğin ALTINA sıkıştırır (yatayda yanlarda siyah bant, bazı cihazlarda
// yuvarlatılmış pencere köşeleri içeriği keser). shortEdges: pencere tüm ekranı kaplar; çentik/sistem çubuğu payı
// react-native-safe-area-context ile App.tsx'te WebView'ın etrafına dolgu olarak uygulanır (sayfa çubukların altına girmez).
const { withAndroidStyles } = require('expo/config-plugins');
module.exports = (config) => withAndroidStyles(config, (c) => {
  const app = c.modResults.resources.style.find((s) => s.$.name === 'AppTheme');
  if (app) {
    app.item = (app.item || []).filter((i) => i.$.name !== 'android:windowLayoutInDisplayCutoutMode');
    app.item.push({ $: { name: 'android:windowLayoutInDisplayCutoutMode', 'tools:targetApi': '28' }, _: 'shortEdges' });
  }
  return c;
});
