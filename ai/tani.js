/* LifeRoutine — cihaz içi yemek tanıma (fotoğraf cihazdan ÇIKMAZ).
 * Model: Google AIY food_V1 (MobileNet V1, 2023 yemek + arka plan; Apache 2.0) — ağırlıklar float16 (ai/food.bin), katman tanımı ai/food.json.
 * Model yalnız "hangi yemek olabilir" adayı verir; besin değeri uygulamanın yemek veritabanından gelir, kullanıcı seçer ve porsiyonu onaylar
 * (model kartı: "besin/alerjen tahmini için kullanmayın").
 * Çalışma: TensorFlow.js (tf-core + webgl, yoksa cpu). Dosyalar XHR ile okunur — Android WebView'de file:// için fetch çalışmaz.
 * Kullanım: YemekTani.hazirla() → Promise; YemekTani.tani(kaynak[, n]) → Promise<[{i, ad, p}]> (kaynak: img / canvas / ImageBitmap).
 */
(function () {
  'use strict';
  var TABAN = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/[^/]*$/, '') : 'ai/';
  })();
  var hazirlik = null, M = null, W = null;

  function xhr(url, tip) {
    return new Promise(function (ok, hata) {
      var r = new XMLHttpRequest();
      r.open('GET', url, true);
      r.responseType = tip;
      r.onload = function () {
        // file:// isteklerinde durum 0 gelir
        if ((r.status === 200 || r.status === 0) && r.response) ok(r.response);
        else hata(new Error('yüklenemedi: ' + url + ' (' + r.status + ')'));
      };
      r.onerror = function () { hata(new Error('yüklenemedi: ' + url)); };
      r.send();
    });
  }
  function betik(ad) {
    return new Promise(function (ok, hata) {
      var s = document.createElement('script');
      s.src = TABAN + ad; s.async = false;
      s.onload = ok; s.onerror = function () { hata(new Error('betik yüklenemedi: ' + ad)); };
      document.head.appendChild(s);
    });
  }
  // float16 → float32 (Float16Array her yerde yok)
  function f16(u16) {
    var o = new Float32Array(u16.length);
    for (var i = 0; i < u16.length; i++) {
      var h = u16[i], s = h & 0x8000 ? -1 : 1, e = (h >> 10) & 0x1f, m = h & 0x3ff;
      o[i] = e === 0 ? s * m * 5.960464477539063e-8 : e === 31 ? (m ? NaN : s * Infinity) : s * (1 + m / 1024) * Math.pow(2, e - 15);
    }
    return o;
  }

  function hazirla() {
    if (hazirlik) return hazirlik;
    hazirlik = (async function () {
      if (!window.tf) { await betik('tf-core.min.js'); await betik('tf-backend-cpu.min.js'); try { await betik('tf-backend-webgl.min.js'); } catch (e) {} }
      var tf = window.tf;
      var arka = ['webgl', 'cpu'];
      for (var i = 0; i < arka.length; i++) {
        try { if (await tf.setBackend(arka[i])) { await tf.ready(); break; } } catch (e) {}
      }
      var sonuc = await Promise.all([xhr(TABAN + 'food.json', 'text'), xhr(TABAN + 'food.bin', 'arraybuffer')]);
      M = JSON.parse(sonuc[0]);
      var u16 = new Uint16Array(sonuc[1]);
      W = M.katman.map(function (k) {
        if (k.t === 'p') return null;
        var t = function (s) { var n = s[1].reduce(function (a, b) { return a * b; }, 1); return tf.tensor(f16(u16.subarray(s[0], s[0] + n)), s[1], 'float32'); };
        return { w: t(k.w), b: t(k.b) };
      });
      // ısınma (ilk çalıştırmadaki gölgelendirici derlemesi kullanıcı beklerken olmasın)
      var g = M.giris;
      tf.tidy(function () { return ileri(tf.zeros([1, g, g, 3])); }).dispose();
      return { arka: tf.getBackend() };
    })();
    hazirlik.catch(function () { hazirlik = null; });
    return hazirlik;
  }

  function ileri(x) {
    var tf = window.tf;
    for (var i = 0; i < M.katman.length; i++) {
      var k = M.katman[i], w = W[i];
      if (k.t === 'c') {
        if (w.w.shape[0] === 1 && x.shape[1] === 1) x = tf.reshape(tf.add(tf.matMul(tf.reshape(x, [1, -1]), tf.reshape(w.w, [w.w.shape[2], w.w.shape[3]])), w.b), [1, 1, 1, -1]);
        else x = tf.add(tf.conv2d(x, w.w, k.s, 'same'), w.b);
      } else if (k.t === 'd') x = tf.add(tf.depthwiseConv2d(x, w.w, k.s, 'same'), w.b);
      else if (k.t === 'p') x = tf.mean(x, [1, 2], true);
      if (k.r6) x = tf.clipByValue(x, 0, 6);
    }
    return tf.softmax(tf.reshape(x, [1, -1]));
  }

  // Ortadan kare kırp + giriş boyutuna ölçekle (referans uygulamayla aynı)
  function kare(kaynak) {
    var g = M.giris, w = kaynak.naturalWidth || kaynak.videoWidth || kaynak.width, h = kaynak.naturalHeight || kaynak.videoHeight || kaynak.height;
    var s = Math.min(w, h), c = document.createElement('canvas');
    c.width = c.height = g;
    var x = c.getContext('2d');
    x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high';
    x.drawImage(kaynak, (w - s) / 2, (h - s) / 2, s, s, 0, 0, g, g);
    return c;
  }

  async function tani(kaynak, n) {
    await hazirla();
    var tf = window.tf, c = kare(kaynak);
    var p = tf.tidy(function () {
      var x = tf.expandDims(tf.div(tf.sub(tf.cast(tf.browser.fromPixels(c), 'float32'), M.olcek[0]), M.olcek[1]), 0);
      return ileri(x);
    });
    var v = await p.data(); p.dispose();
    var idx = [];
    for (var i = 1; i < v.length; i++) idx.push(i);   // 0 = arka plan
    idx.sort(function (a, b) { return v[b] - v[a]; });
    return idx.slice(0, n || 10).map(function (i) { return { i: i, ad: M.etiket[i], p: v[i] }; });
  }

  // test: hazır piksellerle (Uint8 RGB, giriş×giriş×3) çalıştır
  async function ham(px) {
    await hazirla();
    var tf = window.tf, g = M.giris;
    var p = tf.tidy(function () { return ileri(tf.expandDims(tf.div(tf.sub(tf.tensor(px, [g, g, 3], 'float32'), M.olcek[0]), M.olcek[1]), 0)); });
    var v = await p.data(); p.dispose(); return Array.from(v);
  }

  window.YemekTani = { hazirla: hazirla, tani: tani, _ham: ham, arka: function () { return window.tf && window.tf.getBackend(); } };
})();
