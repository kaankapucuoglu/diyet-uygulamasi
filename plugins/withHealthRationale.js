// Health Connect izin gerekçesi (Play şartı): ACTION_SHOW_PERMISSIONS_RATIONALE ve Android 14+ VIEW_PERMISSION_USAGE,
// uygulamanın ana ekranını değil GİZLİLİK POLİTİKASINI göstermeli. react-native-health-connect eklentisi bu filtreleri
// MainActivity'ye bağlıyor → burada küçük bir HealthRationaleActivity yazılır (gizlilik sayfasını tarayıcıda açıp kapanır)
// ve iki filtre de ona taşınır. app.json'da "react-native-health-connect" eklentisinden ÖNCE yazılmalı (Expo modları ters sırada çalışır; bu mod onunkinden sonra işler).
const { withAndroidManifest, withDangerousMod, AndroidConfig } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

const URL = 'https://diyet.maviplay.com/app/legal/gizlilik.html';
const AD = 'HealthRationaleActivity';

function javaKaynak(paket) {
  return `package ${paket};

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

/** Health Connect izin gerekçesi: gizlilik politikasını açar (Play Health Connect şartı). */
public class ${AD} extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    try {
      Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse("${URL}"));
      i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      startActivity(i);
    } catch (Exception e) {
      // tarayıcı yoksa uygulamayı aç (gizlilik metni Ayarlar > Gizlilik'te)
      Intent m = getPackageManager().getLaunchIntentForPackage(getPackageName());
      if (m != null) startActivity(m);
    }
    finish();
  }
}
`;
}

module.exports = function withHealthRationale(config) {
  config = withAndroidManifest(config, (c) => {
    const app = AndroidConfig.Manifest.getMainApplicationOrThrow(c.modResults);
    const ana = (app.activity || []).find((a) => a.$['android:name'] === '.MainActivity');
    if (ana && ana['intent-filter']) {
      ana['intent-filter'] = ana['intent-filter'].filter((f) => !(f.action || []).some((x) => x.$['android:name'] === 'androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE'));
    }
    app.activity = (app.activity || []).filter((a) => a.$['android:name'] !== '.' + AD);
    app.activity.push({
      $: { 'android:name': '.' + AD, 'android:exported': 'true', 'android:theme': '@android:style/Theme.Translucent.NoTitleBar', 'android:excludeFromRecents': 'true' },
      'intent-filter': [{ action: [{ $: { 'android:name': 'androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE' } }] }],
    });
    for (const al of app['activity-alias'] || []) {
      if ((al['intent-filter'] || []).some((f) => (f.action || []).some((x) => x.$['android:name'] === 'android.intent.action.VIEW_PERMISSION_USAGE'))) {
        al.$['android:targetActivity'] = '.' + AD;
      }
    }
    return c;
  });
  config = withDangerousMod(config, ['android', async (c) => {
    const paket = c.android && c.android.package;
    const dir = path.join(c.modRequest.platformProjectRoot, 'app', 'src', 'main', 'java', ...paket.split('.'));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, AD + '.java'), javaKaynak(paket));
    return c;
  }]);
  return config;
};
