// Expo config plugin: web/ klasörünü (scripts/sync-web.mjs çıktısı: index.html, sw.js, manifest, icons/, legal/) yerel projelere gömer.
//  Android: android/app/src/main/assets/www  → file:///android_asset/www/index.html
//  iOS:     ios/www (Xcode "folder reference", Copy Bundle Resources) → <App>.app/www/index.html
// `npx expo prebuild` sırasında (yerelde ve CI'da) çalışır. Önce `npm run sync-web` ile web/ üretilmiş olmalı (web/ depoya girer).
const fs = require('fs');
const path = require('path');
const { withDangerousMod, withXcodeProject, IOSConfig } = require('expo/config-plugins');

const DIR = 'www';

function copyDir(src, dst) {
  fs.rmSync(dst, { recursive: true, force: true });
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

function webSource(projectRoot) {
  const src = path.join(projectRoot, 'web');
  if (!fs.existsSync(path.join(src, 'index.html'))) {
    throw new Error('[withBundledWeb] web/index.html yok — önce "npm run sync-web" çalıştırın.');
  }
  return src;
}

const withAndroidWeb = (config) =>
  withDangerousMod(config, ['android', async (cfg) => {
    const root = cfg.modRequest.projectRoot;
    copyDir(webSource(root), path.join(cfg.modRequest.platformProjectRoot, 'app', 'src', 'main', 'assets', DIR));
    return cfg;
  }]);

const withIosWebFiles = (config) =>
  withDangerousMod(config, ['ios', async (cfg) => {
    const root = cfg.modRequest.projectRoot;
    copyDir(webSource(root), path.join(cfg.modRequest.platformProjectRoot, DIR));
    return cfg;
  }]);

// Xcode projesine ios/www klasör başvurusu (folder reference) + Copy Bundle Resources
function addWwwRef(project, groupName) {
  const already = Object.values(project.pbxFileReferenceSection()).some(
    (f) => f && typeof f === 'object' && String(f.path || '').replace(/"/g, '') === DIR);
  if (already) return false;
  // kök grup (yolu yok → ios/ klasörüne göre) altına "www"
  const key = project.getFirstProject().firstProject.mainGroup;
  if (!key) throw new Error('[withBundledWeb] Xcode kök grubu bulunamadı (' + groupName + ')');
  const file = project.addFile(DIR, key, { lastKnownFileType: 'folder' });
  if (!file) throw new Error('[withBundledWeb] Xcode projesine www eklenemedi');
  file.uuid = project.generateUuid();
  project.addToPbxBuildFileSection(file);
  project.addToPbxResourcesBuildPhase(file);
  const ref = project.pbxFileReferenceSection()[file.fileRef];
  if (ref) {
    ref.lastKnownFileType = 'folder';
    for (const k of Object.keys(ref)) if (ref[k] === undefined || ref[k] === 'undefined') delete ref[k];
  }
  return true;
}

const withIosWebRef = (config) =>
  withXcodeProject(config, (cfg) => {
    addWwwRef(cfg.modResults, IOSConfig.XcodeUtils.getProjectName(cfg.modRequest.projectRoot));
    return cfg;
  });

module.exports = function withBundledWeb(config) {
  config = withAndroidWeb(config);
  config = withIosWebFiles(config);
  config = withIosWebRef(config);
  return config;
};

module.exports.addWwwRef = addWwwRef;
