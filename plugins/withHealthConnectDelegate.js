// Health Connect (react-native-health-connect): izin penceresinin sonucunu alabilmek için MainActivity.onCreate içinde
// HealthConnectPermissionDelegate.setPermissionDelegate(this) çağrılmalı (kütüphane README'si). expo-health-connect eklentisi
// yalnız izin gerekçesi etkinliğini (rationale) ekliyor; bu eklenti temsilciyi ekler. Okunan veri türleri app.json android.permissions'ta.
const { withMainActivity } = require('expo/config-plugins');

const IMPORT = 'import dev.matinzd.healthconnect.permissions.HealthConnectPermissionDelegate';
const CALL = 'HealthConnectPermissionDelegate.setPermissionDelegate(this)';

module.exports = (config) => withMainActivity(config, (c) => {
  if (c.modResults.language !== 'kt') throw new Error('[withHealthConnectDelegate] MainActivity Kotlin değil');
  let s = c.modResults.contents;
  if (!s.includes(IMPORT)) s = s.replace(/^(package [^\n]+\n)/, `$1\n${IMPORT}\n`);
  if (!s.includes(CALL)) {
    if (/super\.onCreate\([^)]*\)/.test(s)) {
      s = s.replace(/(super\.onCreate\([^)]*\))/, `$1\n    ${CALL}`);
    } else {
      if (!s.includes('import android.os.Bundle')) s = s.replace(/^(package [^\n]+\n)/, '$1\nimport android.os.Bundle\n');
      s = s.replace(/(class MainActivity[^{]*\{)/, `$1\n  override fun onCreate(savedInstanceState: Bundle?) {\n    super.onCreate(savedInstanceState)\n    ${CALL}\n  }\n`);
    }
  }
  if (!s.includes(CALL) || !s.includes(IMPORT)) throw new Error('[withHealthConnectDelegate] MainActivity yamalanamadı');
  c.modResults.contents = s;
  return c;
});
