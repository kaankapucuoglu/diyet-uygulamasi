/* LifeRoutine — mobil uygulama köprüsü (WebView içinde, uygulama kodundan ÖNCE çalışır).
 * Yalnız yerel kabukta etkindir (window.ReactNativeWebView ya da window.__LF_NATIVE varsa); düz tarayıcıda hiçbir şey yapmaz.
 * - window.__LF_NATIVE = {platform:'android'|'ios', version, build, name}: kabuk sayfa yüklenmeden tanımlar (App.tsx NATIVE_CFG).
 *   Web tarafı yerel köprüyü şöyle kullanır: if (window.__LF_NATIVE && window.__lfNotify) __lfNotify({...})
 * - Bildirim: __lfNotify({id, title, body, hour, minute, repeat:'daily'}) → her gün saat:dakika (Android kanalı "ogun")
 *     seçenekler: repeat:'weekly' + weekday (1=Pazar…7=Cumartesi); at: <ms zaman damgası> → tek seferlik; channelName: kanal adı (Android ayarlarında görünür)
 *     aynı id ile yeniden çağrı = üzerine yazar.  __lfCancelNotify(id), __lfCancelAll(), __lfNotifyPermission() → izin iste
 *   Geri bildirimler (web tanımlarsa çağrılır): __lfOnPermission(granted:boolean), __lfOnNotifyResult({id, ok, err}),
 *     __lfOnNotificationTap({id, ...data}) → kullanıcı bildirime dokunup uygulamayı açtı (ek yönlendirme yapılmaz).
 * - İndirme: <a download href="blob:|data:|file:"> tıklaması KENDİLİĞİNDEN yakalanır (uygulamadaki indir() değişmeden çalışır) ve
 *   __lfDownload(name, content, mime) → kullanıcı klasör seçer, dosya oraya yazılır (seçici yoksa paylaş sayfası); __lfOnDownload({ok, name, cancel, shared, err}).
 * - Dış bağlantı (https/mailto/tel/sms/whatsapp): tarayıcı / ilgili uygulama. window.open(url) aynı; window.open('') → null
 *   (yazdırma penceresi açılamaz → uygulama kendi yedeğiyle HTML indirmeye düşer → paylaş sayfası).
 * - file:// üzerinden fetch() yok (Chromium/WebKit) → XHR ile Response üreten fetch sarmalı.
 * - Uzun basma menüsü, çift dokunma / kıstırma yakınlaştırması kapalı; metin seçimi yalnız input, textarea, [contenteditable], .lf-select.
 * - navigator.vibrate → yerel titreşim (iOS WebView'de vibrate yok). Android geri tuşu → window.__lfBack() (web tanımlarsa; true = sayfa işledi,
 *   false/yok = alt sayfadan geri ya da uygulamadan çık). Uygulama durumu: __lfApp('background'|'active') → document 'lf:appstate' olayı.
 * Bu dosya hem web/ içine kopyalanır (sync-web) hem de WebView'e enjekte edilir (çift çalışma korumalı). */
(function () {
  if (window.__LF_SHIM__) return;
  if (!window.ReactNativeWebView && !window.__LF_NATIVE) return;   // düz tarayıcı: köprü yok
  window.__LF_SHIM__ = true;
  if (!window.__LF_NATIVE) window.__LF_NATIVE = { platform: /android/i.test(navigator.userAgent) ? 'android' : 'ios', version: '', build: '', name: '', fallback: true };
  function post(o) { try { if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(o)); } catch (e) {} }
  window.__lfPost = post;
  // ---- satın alma / reklam: kabuk → web mesajları, web (kaynak/p9c.js) tanımlayana dek kuyruklanır ----
  if (!window.__lfIap) { window.__lfIapQ = []; window.__lfIap = function (m) { window.__lfIapQ.push(m); }; }
  if (!window.__lfAd) { window.__lfAdQ = []; window.__lfAd = function (m) { window.__lfAdQ.push(m); }; }

  // ---- fetch() → XHR (yalnız file: adresleri için) ----
  var origFetch = window.fetch ? window.fetch.bind(window) : null;
  function isFileUrl(u) {
    try { return new URL(u, location.href).protocol === 'file:'; } catch (e) { return false; }
  }
  function mime(u) {
    var m = /\.([a-z0-9]+)(?:[?#]|$)/i.exec(u); var x = m ? m[1].toLowerCase() : '';
    return ({ js: 'text/javascript', json: 'application/json', webmanifest: 'application/manifest+json', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
      webp: 'image/webp', svg: 'image/svg+xml', html: 'text/html', css: 'text/css', txt: 'text/plain', woff2: 'font/woff2', woff: 'font/woff' })[x] || 'application/octet-stream';
  }
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || String(input);
    if (!isFileUrl(url) || !window.Response) return origFetch ? origFetch(input, init) : Promise.reject(new TypeError('fetch yok'));
    var abs = new URL(url, location.href).href.replace(/[?#].*$/, '');
    return new Promise(function (resolve, reject) {
      var tries = 0;
      (function go() {
        var x = new XMLHttpRequest();
        x.open('GET', abs, true);
        x.responseType = 'arraybuffer';
        x.onload = function () {
          var ok = (x.status === 200 || x.status === 0) && x.response && x.response.byteLength >= 0;
          if (!ok) { if (++tries < 3) return setTimeout(go, 150 * tries); return resolve(new Response(null, { status: 404, statusText: 'Not Found' })); }
          var r = new Response(x.response, { status: 200, statusText: 'OK', headers: { 'Content-Type': mime(abs), 'Content-Length': String(x.response.byteLength) } });
          try { Object.defineProperty(r, 'url', { value: abs }); } catch (e) {}
          resolve(r);
        };
        x.onerror = function () { if (++tries < 3) return setTimeout(go, 150 * tries); reject(new TypeError('Dosya okunamadı: ' + abs)); };
        if (init && init.signal) init.signal.addEventListener('abort', function () { try { x.abort(); } catch (e) {} reject(new DOMException('Aborted', 'AbortError')); });
        x.send();
      })();
    });
  };

  // ---- dokunma davranışı: uzun basma menüsü, çift dokunma / kıstırma yakınlaştırması yok; seçim yalnız form alanlarında ----
  function css() {
    if (document.getElementById('lf-app-css')) return;
    var s = document.createElement('style'); s.id = 'lf-app-css';
    s.textContent = 'html,body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;' +
      'overscroll-behavior:none;-webkit-text-size-adjust:100%;text-size-adjust:100%}' +
      'input,textarea,[contenteditable],.lf-select,.lf-select *{-webkit-user-select:text;user-select:text;-webkit-touch-callout:default}img{-webkit-user-drag:none}';
    (document.head || document.documentElement).appendChild(s);
  }
  if (document.head) css(); else document.addEventListener('DOMContentLoaded', css);
  document.addEventListener('contextmenu', function (e) { var t = e.target; if (!(t && /INPUT|TEXTAREA/.test(t.tagName))) e.preventDefault(); }, { capture: true });
  function stopEv(e) { try { e.preventDefault(); } catch (x) {} }
  document.addEventListener('dblclick', stopEv, { capture: true, passive: false });
  document.addEventListener('gesturestart', stopEv, { passive: false });
  document.addEventListener('gesturechange', stopEv, { passive: false });
  document.addEventListener('gestureend', stopEv, { passive: false });

  // ---- yerel bildirimler (web → kabuk) ----
  function num(v) { var n = Number(v); return isFinite(n) ? n : undefined; }
  window.__lfNotify = function (o) {
    o = o || {};
    post({ t: 'notify', id: o.id != null ? String(o.id) : undefined, title: o.title, body: o.body, hour: num(o.hour), minute: num(o.minute),
      repeat: o.repeat || 'daily', weekday: num(o.weekday), at: num(o.at), channelName: o.channelName });
  };
  window.__lfCancelNotify = function (id) { post({ t: 'notify:cancel', id: String(id) }); };
  window.__lfCancelAll = function () { post({ t: 'notify:cancelAll' }); };
  window.__lfNotifyPermission = function () { post({ t: 'notify:permission' }); };

  // ---- dosya indirme → yerel dosya + paylaş sayfası ----
  window.__lfDownload = function (name, content, mimeType) {
    post({ t: 'download', name: String(name || 'liferoutine.txt'), data: content == null ? '' : String(content), mime: mimeType || '' });
  };
  function readUrlAsBase64(url, name) {
    var x = new XMLHttpRequest();
    x.open('GET', url, true); x.responseType = 'blob';
    x.onload = function () {
      var b = x.response; if (!b) return post({ t: 'err', m: 'indirme: boş yanıt ' + url });
      var r = new FileReader();
      r.onload = function () { var s = String(r.result || ''); post({ t: 'download', name: name, b64: s.slice(s.indexOf(',') + 1), mime: b.type || '' }); };
      r.onerror = function () { post({ t: 'err', m: 'indirme: blob okunamadı ' + url }); };
      r.readAsDataURL(b);
    };
    x.onerror = function () { post({ t: 'err', m: 'indirme: istek başarısız ' + url }); };
    x.send();
  }
  var EXT = /^(https?|mailto|tel|sms|whatsapp):/i;
  function isExternal(href) {
    if (!EXT.test(href)) return false;
    // geliştirme sunucusu (http): aynı köken içeride kalır; paket (file:) için her http(s) adres dıştır
    if (/^https?:/i.test(href) && /^https?:$/.test(location.protocol)) { try { if (new URL(href).origin === location.origin) return false; } catch (e) {} }
    return true;
  }
  document.addEventListener('click', function (e) {
    var t = e.target, a = t && t.closest ? t.closest('a[href]') : null;
    if (!a) return;
    var href = a.href || '';
    if (a.hasAttribute('download') || /^(blob|data):/i.test(href)) {
      e.preventDefault(); e.stopImmediatePropagation();
      var name = a.getAttribute('download') || 'liferoutine.txt';
      if (/^(blob|file):/i.test(href)) readUrlAsBase64(href, name);
      else if (/^data:/i.test(href)) {
        var m = /^data:([^;,]*)((?:;[^,]*)*),([\s\S]*)$/i.exec(href);
        if (!m) return;
        if (/;base64/i.test(m[2])) post({ t: 'download', name: name, b64: m[3], mime: m[1] });
        else { var d; try { d = decodeURIComponent(m[3]); } catch (x) { d = m[3]; } post({ t: 'download', name: name, data: d, mime: m[1] }); }
      } else if (isExternal(href)) post({ t: 'openUrl', url: href });
      return;
    }
    if (isExternal(href)) { e.preventDefault(); e.stopImmediatePropagation(); post({ t: 'openUrl', url: href }); }
  }, true);

  // ---- window.open: dış adres → tarayıcı; paket içi sayfa → aynı görünüm; boş → null (yazdırma yedeği) ----
  window.open = function (u) {
    if (!u) return null;
    var abs; try { abs = new URL(u, location.href).href; } catch (e) { return null; }
    if (isExternal(abs)) post({ t: 'openUrl', url: abs });
    else if (/^(file|https?):/i.test(abs)) location.href = abs;
    return null;
  };
  // paket içi alt sayfalar (legal/…): geri düğmesi
  if (!/(^|\/)(index\.html)?$/.test(location.pathname)) {
    document.addEventListener('DOMContentLoaded', function () {
      var b = document.createElement('button');
      b.textContent = '←';
      b.setAttribute('aria-label', 'Geri');
      b.style.cssText = 'position:fixed;z-index:99999;left:calc(env(safe-area-inset-left,0px) + 12px);top:calc(env(safe-area-inset-top,0px) + 12px);width:44px;height:44px;border-radius:22px;border:0;background:rgba(23,35,56,.78);color:#fff;font-size:22px;line-height:44px;padding:0';
      b.onclick = function () { if (history.length > 1) history.back(); else location.href = (/\/legal\//.test(location.pathname) ? '../' : '') + 'index.html'; };
      document.body.appendChild(b);
    });
  }

  // ---- titreşim ----
  if (window.ReactNativeWebView) {
    try { navigator.vibrate = function (p) { var ms = Array.isArray(p) ? p[0] : p; post({ t: 'vib', ms: +ms || 20 }); return true; }; } catch (e) {}
  }

  // ---- uygulama arka plan / ön plan (kabuk AppState) ----
  window.__lfApp = function (state) { try { document.dispatchEvent(new CustomEvent('lf:appstate', { detail: state })); } catch (e) {} };

  // Android geri tuşu: web window.__lfBack tanımlayabilir (pencere/panel kapat → true; ana ekranda false → uygulamadan çık)

  // ---- hata ve hazır bildirimi (kabuk açılış ekranını kapatır, zaman aşımında yedek ekran gösterir) ----
  window.addEventListener('error', function (e) { post({ t: 'err', m: String(e.message || e), s: e.filename || '', l: e.lineno || 0 }); });
  window.addEventListener('unhandledrejection', function (e) { post({ t: 'err', m: 'promise: ' + String(e.reason && (e.reason.message || e.reason)) }); });
  var readySent = false;
  window.__lfReady = function () { if (readySent) return; readySent = true; post({ t: 'ready', href: location.href }); };
  if (document.readyState === 'complete') window.__lfReady(); else window.addEventListener('load', window.__lfReady);
  post({ t: 'boot', href: location.href });
})();
