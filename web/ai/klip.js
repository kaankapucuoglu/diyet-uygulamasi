/* LifeRoutine — cihaz içi sıfır-atış yemek tanıma (fotoğraf cihazdan ÇIKMAZ).
 * Model: TinyCLIP-ViT-40M-32-Text-19M-LAION400M görüntü kodlayıcısı (Microsoft, MIT lisansı; bkz. ai/LISANS-NOTICE.txt).
 *   Ağırlıklar ai/klip.bin içinde int8 (çıkış sütunu başına ölçek), düzen ai/klip.json.
 *   Metin tarafı cihazda ÇALIŞMAZ: uygulamadaki her yemeğin adından üretilen metin gömmeleri önceden hesaplanıp klip.bin'e konmuştur
 *   (istemler klip.json → metin.istem). Ayrıca "ambalajlı ürün" / "tabak yemeği" istemleri (paket) ambalaj sinyali için kullanılır.
 * Çalışma: TensorFlow.js (ai/tf-*.min.js, eski modelle ortak; webgl, yoksa cpu). Dosyalar XHR ile okunur (file:// için fetch yok).
 * Model yalnız ADAY sıralar; besin değeri uygulamanın veritabanından gelir, kullanıcı seçer ve porsiyonu onaylar.
 * Kullanım: YemekKlip.hazirla() → Promise; YemekKlip.tani(kaynak) → Promise<{ids, sim: Float32Array, paket: 0..1, ms}>
 */
(function () {
  'use strict';
  var TABAN = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/[^/]*$/, '') : 'ai/';
  })();
  var hazirlik = null, M = null, BUF = null, W = null, METIN = null, PAKET = null, bosZaman = null;

  function xhr(url, tip) {
    return new Promise(function (ok, hata) {
      var r = new XMLHttpRequest();
      r.open('GET', url, true);
      r.responseType = tip;
      r.onload = function () {
        if ((r.status === 200 || r.status === 0) && r.response) ok(r.response);   // file:// → durum 0
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
  function tfYukle() {
    if (window.tf && window.tf.erf) return Promise.resolve();
    if (!window.__lfTfYukleniyor) {
      window.__lfTfYukleniyor = (async function () {
        await betik('tf-core.min.js'); await betik('tf-backend-cpu.min.js');
        try { await betik('tf-backend-webgl.min.js'); } catch (e) {}
      })();
    }
    return window.__lfTfYukleniyor;
  }

  // int8 → float32 (sütun başına ölçek); küçük tensörler doğrudan float32
  function tensorYap(tf, k) {
    var d = M.tensor[k], n = d.s.reduce(function (a, b) { return a * b; }, 1);
    if (d.t === 'f32') return tf.tensor(new Float32Array(BUF, d.o, n), d.s, 'float32');
    var q = new Int8Array(BUF, d.o, n), c = d.s[1], s = new Float32Array(BUF, d.so, c), f = new Float32Array(n);
    for (var i = 0, j = 0; i < n; i++, j++) { if (j === c) j = 0; f[i] = q[i] * s[j]; }
    return tf.tensor(f, d.s, 'float32');
  }

  // sec.yalnizWebgl: WebGL yoksa yüklemeden vazgeç (CPU arka ucunda bu model telefonda fotoğraf başına ~15 sn sürer)
  function hazirla(sec) {
    if (hazirlik) return hazirlik;
    hazirlik = (async function () {
      await tfYukle();
      var tf = window.tf;
      if (!tf.getBackend() || (sec && sec.yalnizWebgl && tf.getBackend() !== 'webgl')) {
        var arka = ['webgl', 'cpu'];
        for (var i = 0; i < arka.length; i++) {
          try { if (await tf.setBackend(arka[i])) { await tf.ready(); break; } } catch (e) {}
        }
      }
      if (sec && sec.yalnizWebgl && tf.getBackend() !== 'webgl') throw new Error('webgl yok');
      if (!M || !BUF) {
        var r = await Promise.all([xhr(TABAN + 'klip.json', 'text'), xhr(TABAN + 'klip.bin', 'arraybuffer')]);
        M = JSON.parse(r[0]); BUF = r[1];
        var mt = M.metin;
        METIN = { q: new Int8Array(BUF, mt.o, mt.n * mt.d), s: new Float32Array(BUF, mt.so, mt.n), n: mt.n, d: mt.d };
        PAKET = new Float32Array(BUF, M.paket.o, (M.paket.np + M.paket.nn) * mt.d);
      }
      W = {};
      Object.keys(M.tensor).forEach(function (k) { W[k] = tensorYap(tf, k); });
      // ısınma (gölgelendirici derlemesi kullanıcı beklerken olmasın)
      var g = M.giris;
      tf.tidy(function () { return ileri(tf.zeros([g, g, 3])); }).dispose();
      return { arka: tf.getBackend(), n: METIN.n };
    })();
    hazirlik.catch(function () { hazirlik = null; W = null; });
    return hazirlik;
  }

  // Bellek: model ~160 MB float32 tensör tutar; 3 dk kullanılmazsa tensörler bırakılır (ikili dosya bellekte kalır, yeniden hazırlık hızlı)
  function bosaCikar() {
    clearTimeout(bosZaman);
    bosZaman = setTimeout(function () {
      if (!W) return;
      Object.keys(W).forEach(function (k) { try { W[k].dispose(); } catch (e) {} });
      W = null; hazirlik = null;
    }, 180000);
  }

  function ln(tf, x, k) {
    var m = tf.moments(x, -1, true);
    return tf.add(tf.mul(tf.div(tf.sub(x, m.mean), tf.sqrt(tf.add(m.variance, M.eps))), W[k + '.w']), W[k + '.b']);
  }
  function dog(tf, x, k) { return tf.add(tf.matMul(x, W[k + '.w']), W[k + '.b']); }
  // ViT-B/32 benzeri ileri geçiş (50 belirteç, 12 katman, 8 baş) — px: [224,224,3] normalize edilmiş
  function ileri(px) {
    var tf = window.tf, D = M.gen, H = M.bas, hd = D / H, P = M.yama, G = M.giris / P, N = G * G + 1;
    var pt = tf.reshape(tf.transpose(tf.reshape(px, [G, P, G, P, 3]), [0, 2, 1, 3, 4]), [G * G, P * P * 3]);
    var x = tf.add(tf.concat([tf.reshape(W.cls, [1, D]), tf.matMul(pt, W.yama)], 0), W.poz);
    x = ln(tf, x, 'ln0');
    var bol = function (a) { return tf.transpose(tf.reshape(a, [N, H, hd]), [1, 0, 2]); };
    for (var i = 0; i < M.kat; i++) {
      var h = ln(tf, x, i + '.ln1');
      var q = bol(tf.mul(dog(tf, h, i + '.q'), 1 / Math.sqrt(hd))), k = bol(dog(tf, h, i + '.k')), v = bol(dog(tf, h, i + '.v'));
      var a = tf.softmax(tf.matMul(q, k, false, true));
      var o = tf.reshape(tf.transpose(tf.matMul(a, v), [1, 0, 2]), [N, D]);
      x = tf.add(x, dog(tf, o, i + '.o'));
      h = dog(tf, ln(tf, x, i + '.ln2'), i + '.f1');
      h = tf.mul(tf.mul(h, 0.5), tf.add(tf.erf(tf.mul(h, Math.SQRT1_2)), 1));   // GELU (erf)
      x = tf.add(x, dog(tf, h, i + '.f2'));
    }
    var e = tf.matMul(ln(tf, tf.slice(x, [0, 0], [1, D]), 'lnS'), W.proj);
    return tf.div(e, tf.norm(e));
  }

  // Ortadan kare kırpım (kısa kenar) → giriş boyutu
  function kare(kaynak) {
    var g = M.giris, w = kaynak.naturalWidth || kaynak.videoWidth || kaynak.width, h = kaynak.naturalHeight || kaynak.videoHeight || kaynak.height;
    var s = Math.min(w, h), c = document.createElement('canvas');
    c.width = c.height = g;
    var x = c.getContext('2d');
    x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high';
    x.drawImage(kaynak, (w - s) / 2, (h - s) / 2, s, s, 0, 0, g, g);
    return c;
  }

  async function gom(px) {
    var tf = window.tf;
    var e = tf.tidy(function () { return ileri(px()); });
    var v = await e.data(); e.dispose();
    return v;
  }
  function puanla(v) {
    var n = METIN.n, d = METIN.d, q = METIN.q, sim = new Float32Array(n);
    for (var j = 0; j < n; j++) {
      var t = 0, o = j * d;
      for (var k = 0; k < d; k++) t += q[o + k] * v[k];
      sim[j] = t * METIN.s[j];
    }
    // ambalaj sinyali: [ambalajlı istemler, tabak/sofra istemleri] üzerinde softmax(T·cos) → ambalajlı kütlesi
    var np = M.paket.np, nt = np + M.paket.nn, ps = new Float32Array(nt), mx = -1e9;
    for (var i = 0; i < nt; i++) { var u = 0; for (var k2 = 0; k2 < d; k2++) u += PAKET[i * d + k2] * v[k2]; ps[i] = u; if (u > mx) mx = u; }
    var top = 0, pk = 0;
    for (var i2 = 0; i2 < nt; i2++) { var ex = Math.exp(M.paket.T * (ps[i2] - mx)); top += ex; if (i2 < np) pk += ex; }
    return { sim: sim, paket: pk / top };
  }

  async function tani(kaynak) {
    await hazirla();
    var tf = window.tf, t0 = performance.now(), c = kare(kaynak), mo = M.ort, sd = M.std;
    var v = await gom(function () {
      return tf.div(tf.sub(tf.div(tf.cast(tf.browser.fromPixels(c), 'float32'), 255), tf.tensor1d(mo)), tf.tensor1d(sd));
    });
    var r = puanla(v), q = { isik: 128, net: 999 };
    try { q = kalite(kaynak); } catch (e) {}
    bosaCikar();
    return { ids: M.ids, sim: r.sim, paket: r.paket, sicaklik: M.sicaklik, eskiAgirlik: M.eskiAgirlik, esik: M.paket.esik, isik: q.isik, net: q.net, ms: performance.now() - t0 };
  }
  // ışık (ortalama parlaklık) ve netlik (Laplace varyansı) — tani.js ile aynı ölçü
  function kalite(kaynak) {
    var n = 128, c = document.createElement('canvas'); c.width = c.height = n;
    var x = c.getContext('2d'), w = kaynak.naturalWidth || kaynak.width, h = kaynak.naturalHeight || kaynak.height, s = Math.min(w, h);
    x.drawImage(kaynak, (w - s) / 2, (h - s) / 2, s, s, 0, 0, n, n);
    var d = x.getImageData(0, 0, n, n).data, gri = new Float32Array(n * n), top = 0;
    for (var i = 0; i < n * n; i++) { gri[i] = 0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]; top += gri[i]; }
    var lt = 0, lk = 0, say = 0;
    for (var yy = 1; yy < n - 1; yy++) for (var xx = 1; xx < n - 1; xx++) {
      var k = yy * n + xx, L = 4 * gri[k] - gri[k - 1] - gri[k + 1] - gri[k - n] - gri[k + n];
      lt += L; lk += L * L; say++;
    }
    var m = lt / say;
    return { isik: Math.round(top / (n * n)), net: Math.round(lk / say - m * m) };
  }

  // test: hazır normalize piksellerle (Float32 [224*224*3], HWC) gömme döndür
  async function ham(px) {
    await hazirla();
    var tf = window.tf, g = M.giris;
    return Array.from(await gom(function () { return tf.tensor(px, [g, g, 3], 'float32'); }));
  }

  window.YemekKlip = { hazirla: hazirla, tani: tani, _ham: ham, arka: function () { return window.tf && window.tf.getBackend(); } };
})();
