// ---------- Hesap arayüzü: Ayarlar › Hesap, giriş / kayıt, gelen kutusu, uygulama içinde gönder, sıralama, eşitleme rozeti ----------
// HTML burada JS ile üretilir (p1.html'e dokunulmaz); mevcut sınıflar (.sheet .btn .chip .field .cur .acts) kullanılır.
// Hukuk sayfaları uygulamayla birlikte paketlenir (legal/*.html, 5 dil, dil çapası #tr|en|ru|de|ar) → çevrimdışı da açılır
const HUKUK = {kvkk: 'legal/aydinlatma.html', kosullar: 'legal/kosullar.html', gizlilik: 'legal/gizlilik.html', acikRiza: 'legal/acik-riza.html', hesapSil: 'legal/hesap-sil.html'};
const KULLANICI_RE = /^[A-Za-z][A-Za-z0-9_.]{2,15}$/;
document.head.insertAdjacentHTML('beforeend', `<style>
.esit-rozet{cursor:pointer;white-space:nowrap}
.esit-rozet[hidden]{display:none}
.esit-rozet.bekliyor,.esit-rozet.gonderiliyor{color:var(--gold);background:var(--gold-soft)}
.esit-rozet.cevrimdisi{color:#40506a;background:#f1f4f9}
.esit-rozet.hata{color:var(--red);background:var(--red-soft)}
.hesap-kart b{display:block;font-size:16px}
.hs-durum{display:flex;flex-wrap:wrap;gap:2px 5px;margin-top:4px;font-size:12.5px;color:var(--muted)}
.hs-acts{margin-top:8px}
.hs-acts .btn{flex:1 1 130px}
.sifre-kutu{display:flex;gap:6px;align-items:center}
.sifre-kutu input{flex:1;min-width:0}
.sifre-kutu .mini{height:40px;flex:none}
.ad-durum{font-size:12.5px;min-height:16px;margin:-6px 0 8px;color:var(--muted)}
.ad-durum.ok{color:var(--green);font-weight:600}
.ad-durum.bad{color:var(--red);font-weight:600}
.oneri-cipler{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:-2px 0 10px}
.oneri-cipler:empty{display:none}
.riza{display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-bottom:1px solid #f0f3f8;font-size:13.5px;line-height:1.45;cursor:pointer;margin:0}
.riza input{width:20px;height:20px;flex:none;margin-top:1px;accent-color:var(--blue)}
.riza a{color:var(--blue);font-weight:600;white-space:nowrap}
.lb-satir{display:grid;grid-template-columns:30px minmax(0,1fr) auto auto;gap:8px;align-items:center;padding:8px 6px;border-bottom:1px solid #f0f3f8;font-size:14px}
.lb-satir.bas{font-size:11.5px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.04em;padding-top:2px}
.lb-satir.bas b{color:var(--muted);font-size:11.5px}
.lb-satir.ben{background:var(--blue-soft);border-radius:10px;border-bottom:0}
.lb-satir b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lb-satir b small{color:var(--muted);font-weight:600}
.lb-satir .n{font-variant-numeric:tabular-nums;color:var(--muted);font-size:13px;white-space:nowrap;text-align:end}
.lb-satir .seri{font-weight:800;color:var(--green);white-space:nowrap;font-size:13.5px}
.ib-satir{display:flex;gap:10px;align-items:center;width:100%;text-align:start;padding:10px 6px;border-bottom:1px solid #f0f3f8}
.ib-satir:active{background:#f7f9fc}
.ib-satir .ik{font-size:22px;flex:none}
.ib-satir div{flex:1;min-width:0}
.ib-satir b{display:block;font-size:15px;overflow-wrap:anywhere}
.ib-satir small{color:var(--muted);font-size:12.5px}
.ib-satir .tag{flex:none;background:var(--green-soft);color:var(--green)}
#wzGiris{margin-top:8px}
</style>`);

// ---------- Yardımcılar ----------
function hesapHata(e, varsayilan){
  if (!e) return T('hsHata');
  if (e.status === 0) return T(navigator.onLine ? 'hsHata' : 'hsCevrimdisi');
  if (e.status === 423) return T('hsKilit', {t: e.until ? Math.max(1, Math.ceil((e.until * 1000 - Date.now()) / 60000)) : 15});
  if (e.status === 429) return T('hsKilit', {t: 15});
  if (e.error === 'wrong') return e.left != null ? T('hsYanlis', {n: e.left}) : T('hsSifreYanlis');
  if (e.error === 'weak') return T('hsSifreKisa');
  if (e.error === 'taken') return T('hsAdAlinmis');
  if (e.error === 'rude') return T('hsAdKaba');
  if (e.error === 'bad') return T('hsAdFormat');
  if (e.error === 'consent') return T('hsRizaGerek');
  if (e.error === 'no_user') return T('shAliciYok');
  if (e.error === 'self') return T('shKendine');
  if (e.error === 'auth') return T('hsGirisGerek');
  return varsayilan || T('hsHata');
}
const hataYaz = (id, m) => { const el = $(id); if (!el) return; el.textContent = m || ''; el.hidden = !m; };
// Şifre alanı "Göster / Gizle"
document.addEventListener('click', e => {
  const b = e.target.closest('[data-goster]'); if (!b) return;
  const i = $(b.dataset.goster); if (!i) return;
  i.type = i.type === 'password' ? 'text' : 'password';
  b.textContent = T(i.type === 'password' ? 'hsGoster' : 'hsGizle');
});
// Enter ile gönder
const enterIle = (inputId, btnId) => { const i = $(inputId); if (i) i.addEventListener('keydown', e => { if (e.key === 'Enter' && $(btnId)) $(btnId).click(); }); };
// Kullanıcı adı canlı denetim: mod 'yeni' → uygun mu (+ öneri çipleri); mod 'var' → alıcı var mı
function adKontrolBagla(inputId, durumId, oneriId, mod){
  const inp = $(inputId), durum = $(durumId), oneri = oneriId ? $(oneriId) : null;
  let z = null;
  const yaz = (cls, metin) => { durum.className = 'ad-durum ' + cls; durum.textContent = metin; };
  inp.addEventListener('input', () => {
    const u = inp.value.trim(); clearTimeout(z); inp.dataset.ok = '';
    if (oneri) oneri.innerHTML = '';
    if (!u){ yaz('', ''); return; }
    if (!KULLANICI_RE.test(u) || /\.\./.test(u) || /\.$/.test(u)){ yaz('bad', T('hsAdFormat')); return; }
    yaz('', T('hsKontrol'));
    z = setTimeout(async () => {
      try {
        const r = await Hesap.kontrol(u);
        if (!inp.isConnected || inp.value.trim() !== u) return;
        if (mod === 'var'){
          const var_ = !r.free && r.reason === 'taken';
          inp.dataset.ok = var_ ? '1' : '';
          yaz(var_ ? 'ok' : 'bad', T(var_ ? 'shAliciVar' : r.reason === 'rude' || r.reason === 'bad' ? 'hsAdFormat' : 'shAliciYok'));
          return;
        }
        if (r.free){ inp.dataset.ok = '1'; yaz('ok', T('hsAdUygun')); return; }
        yaz('bad', T(r.reason === 'rude' ? 'hsAdKaba' : r.reason === 'bad' ? 'hsAdFormat' : 'hsAdAlinmis'));
        if (oneri && r.suggestions && r.suggestions.length) oneri.innerHTML = `<span class="hint">${T('hsOneri')}</span>` + r.suggestions.map(s => `<button class="chip" type="button" data-oneri="${esc(s)}">${esc(s)}</button>`).join('');
      } catch(e){ if (inp.isConnected) yaz('bad', hesapHata(e)); }
    }, 400);
  });
  if (oneri) oneri.addEventListener('click', e => { const b = e.target.closest('[data-oneri]'); if (!b) return; inp.value = b.dataset.oneri; inp.dispatchEvent(new Event('input')); });
}

// ---------- Giriş ----------
function girisAc(){
  ac(T('hsGiris'), `<div class="hs-form">
    <label class="field"><span>${T('hsKullanici')}</span><input id="gAd" autocomplete="username" autocapitalize="off" autocorrect="off" spellcheck="false" maxlength="16" enterkeyhint="next"></label>
    <label class="field"><span>${T('hsSifreL')}</span><div class="sifre-kutu"><input id="gSifre" type="password" autocomplete="current-password" enterkeyhint="go"><button class="mini" type="button" data-goster="gSifre">${T('hsGoster')}</button></div></label>
    <div class="wmsg err" id="gHata" hidden></div>
    <div class="acts"><button class="btn solid" id="gGir">${T('hsGiris')}</button></div>
    <button class="btn ghost full" style="margin-top:8px" id="gKaydol">${T('hsKaydol')}</button></div>`);
  enterIle('gSifre', 'gGir');
  $('gKaydol').onclick = () => icinden(girisAc, kaydolAc);
  $('gGir').onclick = async () => {
    const u = $('gAd').value.trim(), p = $('gSifre').value, b = $('gGir');
    if (!KULLANICI_RE.test(u) || !p){ hataYaz('gHata', T('hsAdFormat')); return; }
    b.disabled = true; hataYaz('gHata', '');
    try { await Hesap.gir(u, p); }
    catch(e){ b.disabled = false; hataYaz('gHata', hesapHata(e)); return; }
    kapat(); toast(T('hsGirisOk', {u}), 3000);
    await Esitle.ilkCek();   // sunucudaki veri yerelle birleşir (yeni cihazda kurulum da atlanır)
  };
  setTimeout(() => { if ($('gAd')) $('gAd').focus(); }, 250);
}

// ---------- Kayıt (rıza kutularıyla) ----------
function rizaKutulari(saglikOnce = false){
  const link = (k, u) => `<a href="${u}" target="_blank" rel="noopener">${T(k)}</a>`;
  const saglik = `<label class="riza"><input type="checkbox" id="rSaglik"><span>${T('cRiza')}</span></label>`;
  const temel = `<label class="riza"><input type="checkbox" id="rKvkk"><span>${T('cKvkk')} · ${link('cKvkkL', HUKUK.kvkk)}</span></label>
    <label class="riza"><input type="checkbox" id="rKosul"><span>${T('cKosul')} · ${link('cKosulL', HUKUK.kosullar)} · ${link('cGizL', HUKUK.gizlilik)}</span></label>`;
  return (saglikOnce ? saglik + temel : temel + saglik) + `<div class="hint" style="margin-top:8px">${esc(T('cRizaBilgi'))}</div>`;
}
function kaydolAc(){
  ac(T('hsKaydol'), `<div class="hs-form">
    <label class="field"><span>${T('hsKullanici')}</span><input id="kAd" autocomplete="username" autocapitalize="off" autocorrect="off" spellcheck="false" maxlength="16" enterkeyhint="next"></label>
    <div class="ad-durum" id="kAdDurum">${T('hsAdFormat')}</div><div class="oneri-cipler" id="kOneri"></div>
    <label class="field"><span>${T('hsSifreL')}</span><div class="sifre-kutu"><input id="kSifre" type="password" autocomplete="new-password" enterkeyhint="next"><button class="mini" type="button" data-goster="kSifre">${T('hsGoster')}</button></div></label>
    <label class="field"><span>${T('hsSifre2')}</span><input id="kSifre2" type="password" autocomplete="new-password" enterkeyhint="done"></label>
    ${rizaKutulari()}
    <label class="riza"><input type="checkbox" id="rLb"><span>${T('hsLbOptin')}</span></label>
    <div class="wmsg err" id="kHata" hidden></div>
    <div class="acts"><button class="btn green" id="kGonder">${T('hsKaydol')}</button></div>
    <button class="btn ghost full" style="margin-top:8px" id="kGiris">${T('hsGiris')}</button></div>`);
  adKontrolBagla('kAd', 'kAdDurum', 'kOneri', 'yeni');
  enterIle('kSifre2', 'kGonder');
  $('kGiris').onclick = () => icinden(kaydolAc, girisAc);
  $('kGonder').onclick = async () => {
    const u = $('kAd').value.trim(), p = $('kSifre').value, p2 = $('kSifre2').value, b = $('kGonder');
    if (!KULLANICI_RE.test(u) || /\.\./.test(u) || /\.$/.test(u)) return hataYaz('kHata', T('hsAdFormat'));
    if (p.length < 8) return hataYaz('kHata', T('hsSifreKisa'));
    if (p !== p2) return hataYaz('kHata', T('hsSifreUyusmaz'));
    if (!$('rKvkk').checked || !$('rKosul').checked) return hataYaz('kHata', T('cGerek'));
    const consent = {kvkk: true, terms: true, health: $('rSaglik').checked, ver: RIZA_SURUM, lb_optin: $('rLb').checked};
    b.disabled = true; hataYaz('kHata', '');
    try { await Hesap.kaydol(u, p, consent); }
    catch(e){
      b.disabled = false; hataYaz('kHata', hesapHata(e));
      if (e && e.suggestions && e.suggestions.length) $('kOneri').innerHTML = `<span class="hint">${T('hsOneri')}</span>` + e.suggestions.map(s => `<button class="chip" type="button" data-oneri="${esc(s)}">${esc(s)}</button>`).join('');
      return;
    }
    kapat(); toast(T(consent.health ? 'hsKayitOk' : 'cRizaYok'), 3500);
    await Esitle.ilkCek();   // sunucu boş → yerel veri gönderilir
  };
}
// Hesap gerektiren işlem, giriş yok
function girisGerekAc(){
  ac(T('hsT'), `<p class="onay-metin">${esc(T('hsGirisGerek'))}</p><div class="hint">${esc(T('hsIntro'))}</div>
    <div class="acts"><button class="btn solid" id="ggGiris">${T('hsGiris')}</button><button class="btn" id="ggKaydol">${T('hsKaydol')}</button></div>`);
  $('ggGiris').onclick = () => icinden(girisGerekAc, girisAc);
  $('ggKaydol').onclick = () => icinden(girisGerekAc, kaydolAc);
}

// ---------- Şifre değiştir / rıza / hesap sil ----------
function sifreAc(){
  ac(T('hsSifre'), `<div class="hs-form">
    <label class="field"><span>${T('hsSifreEski')}</span><div class="sifre-kutu"><input id="sEski" type="password" autocomplete="current-password"><button class="mini" type="button" data-goster="sEski">${T('hsGoster')}</button></div></label>
    <label class="field"><span>${T('hsSifreYeni')}</span><div class="sifre-kutu"><input id="sYeni" type="password" autocomplete="new-password"><button class="mini" type="button" data-goster="sYeni">${T('hsGoster')}</button></div></label>
    <label class="field"><span>${T('hsSifre2')}</span><input id="sYeni2" type="password" autocomplete="new-password" enterkeyhint="done"></label>
    <div class="wmsg err" id="sHata" hidden></div>
    <div class="acts"><button class="btn solid" id="sKaydet">${T('save')}</button></div></div>`);
  enterIle('sYeni2', 'sKaydet');
  $('sKaydet').onclick = async () => {
    const e0 = $('sEski').value, y = $('sYeni').value, y2 = $('sYeni2').value, b = $('sKaydet');
    if (y.length < 8) return hataYaz('sHata', T('hsSifreKisa'));
    if (y !== y2) return hataYaz('sHata', T('hsSifreUyusmaz'));
    b.disabled = true; hataYaz('sHata', '');
    try { await Hesap.sifre(e0, y); } catch(e){ b.disabled = false; hataYaz('sHata', e && e.error === 'wrong' ? T('hsSifreYanlis') : hesapHata(e)); return; }
    kapat(); toast(T('hsSifreOk'));
  };
}
// Sağlık verisi rızası sonradan verilir (eşitleme açılır)
function rizaVerAc(){
  ac(T('cRizaVer'), `${rizaKutulari(true)}<div class="wmsg err" id="rHata" hidden></div><div class="acts"><button class="btn green" id="rKaydet">${T('save')}</button></div>`);
  const u = Hesap.durum().kullanici || {};
  if (u.consent && u.consent.kvkk) $('rKvkk').checked = true;
  if (u.consent && u.consent.terms) $('rKosul').checked = true;
  $('rKaydet').onclick = async () => {
    if (!$('rKvkk').checked || !$('rKosul').checked) return hataYaz('rHata', T('cGerek'));
    if (!$('rSaglik').checked) return hataYaz('rHata', T('cRizaYok'));
    try { await Hesap.riza({kvkk: true, terms: true, health: true, ver: RIZA_SURUM, lb_optin: !!u.lb_optin}); } catch(e){ hataYaz('rHata', hesapHata(e)); return; }
    kapat(); toast(T('tSaved'));
    Esitle.kirli(); Esitle.gonder();
  };
}
async function rizaCek(){
  const u = Hesap.durum().kullanici || {};
  try { await Hesap.riza({kvkk: true, terms: true, health: false, ver: RIZA_SURUM, lb_optin: !!u.lb_optin}); }
  catch(e){ toast(hesapHata(e)); return; }
  Esitle.durum = 'hata'; Esitle.hata = 'consent'; document.dispatchEvent(new CustomEvent('esitle'));
  toast(T('cRizaYok'), 3500);
}
function silSifreAc(){
  ac(T('hsSil'), `<p class="onay-metin">${esc(T('hsSilSor2'))}</p>
    <label class="field"><div class="sifre-kutu"><input id="dSifre" type="password" autocomplete="current-password" enterkeyhint="done"><button class="mini" type="button" data-goster="dSifre">${T('hsGoster')}</button></div></label>
    <div class="wmsg err" id="dHata" hidden></div>
    <div class="acts"><button class="btn ghost" id="dVazgec">${T('cancel2')}</button><button class="btn danger" id="dSil">${T('hsSilBtn')}</button></div>`);
  $('dVazgec').onclick = () => { if (geriFn) geriFn(); else kapat(); };
  $('dSil').onclick = async () => {
    const p = $('dSifre').value, b = $('dSil'); if (!p) return;
    b.disabled = true; hataYaz('dHata', '');
    try { await Hesap.sil(p); } catch(e){ b.disabled = false; hataYaz('dHata', e && e.error === 'wrong' ? T('hsSifreYanlis') : hesapHata(e)); return; }
    kapat(); toast(T('hsSilOk'), 3500);
  };
}

// ---------- Ayarlar › Hesap bölümü (ayarlar penceresi açılınca eklenir) ----------
const ayarlarAc0 = ayarlarAc;
ayarlarAc = function(dilAcik){ ayarlarAc0(dilAcik); hesapBolumuEkle(); };
function hesapBolumuEkle(){
  const sb = $('sbody'); if (!sb || $('hesapBolum')) return;
  const kutu = document.createElement('div'); kutu.id = 'hesapBolum';
  const ilk = sb.querySelector('.sec');   // profil başlığından önce
  if (ilk) sb.insertBefore(kutu, ilk); else sb.appendChild(kutu);
  hesapBolumuCiz();
}
function esitDurumYazi(){
  const ad = {kapali:'esKapali', bekliyor:'esBekliyor', gonderiliyor:'esGonder', esit:'esEsit', cevrimdisi:'esCevrimdisi', hata:'esHata'}[Esitle.durum] || 'esBekliyor';
  const son = Esitle.son ? T('hsSon', {t: new Date(Esitle.son).toLocaleTimeString(LOC(), {hour:'2-digit', minute:'2-digit'})}) : T('hsHicEsit');
  const h = Hesap._oturum();
  return `<span>${T('hsDurum')}: <b>${T(ad)}</b></span><span>· ${esc(son)}</span>${h && h.rev > 0 ? `<span>· ${T('hsRev', {n: h.rev})}</span>` : ''}`;
}
// Hukuk bağlantıları (herkese, hesapsız da): gizlilik · aydınlatma · açık rıza · koşullar · hesap silme — yerel sayfalar, dil çapasıyla
function hukukEkle(el){
  const dil = (D && D.profil && D.profil.dil) || 'tr';
  const a = (k, u) => `<a href="${u}#${dil}" target="_blank" rel="noopener">${esc(T(k))}</a>`;
  el.insertAdjacentHTML('beforeend', `<div class="hint hukuk-satir">${a('cLinkPriv', HUKUK.gizlilik)} · ${a('cLinkKvkk', HUKUK.kvkk)} · ${a('cLinkConsent', HUKUK.acikRiza)} · ${a('cLinkTerms', HUKUK.kosullar)} · ${a('cLinkDelete', HUKUK.hesapSil)}</div>`);
}
function hesapBolumuCiz(){
  const el = $('hesapBolum'); if (!el) return;
  const h = Hesap.durum(), u = h.kullanici;
  if (!h.giris){
    el.innerHTML = `<div class="sec">☁️ ${T('hsT')}</div><div class="hint">${esc(T('hsIntro'))}</div>
      <div class="acts hs-acts"><button class="btn solid" id="hsGirisBtn">${T('hsGiris')}</button><button class="btn" id="hsKaydolBtn">${T('hsKaydol')}</button><button class="btn ghost" id="hsSiraBtn">🏆 ${T('hsSira')}</button></div>`;
    $('hsGirisBtn').onclick = () => icinden(ayarlarAc, girisAc);
    $('hsKaydolBtn').onclick = () => icinden(ayarlarAc, kaydolAc);
    $('hsSiraBtn').onclick = () => icinden(ayarlarAc, siralamaAc);
    hukukEkle(el);
    return;
  }
  const rizaVar = !!(u.consent && u.consent.health && u.consent.ver === RIZA_SURUM);
  el.innerHTML = `<div class="sec">☁️ ${T('hsT')}</div>
    <div class="cur hesap-kart"><b>👤 ${esc(u.username)}</b><div class="hs-durum">${esitDurumYazi()}</div>${rizaVar ? '' : `<div class="wmsg warn" style="margin-top:8px">${esc(T('cRizaYok'))}</div>`}</div>
    <div class="acts hs-acts" style="margin-top:0"><button class="btn solid" id="hsEsitleBtn" ${rizaVar ? '' : 'disabled'}>${T('hsEsitle')}</button><button class="btn" id="hsGelenBtn">📥 ${T('hsGelen')}${Esitle.gelen ? ` <span class="tag">${Esitle.gelen}</span>` : ''}</button><button class="btn" id="hsSiraBtn">🏆 ${T('hsSira')}</button></div>
    <label class="riza" style="margin-top:6px"><input type="checkbox" id="hsLb" ${u.lb_optin ? 'checked' : ''}><span>${T('hsLbOptin')}</span></label>
    <div class="acts hs-acts"><button class="btn ghost" id="hsRizaBtn">${T(rizaVar ? 'cRizaCek' : 'cRizaVer')}</button><button class="btn ghost" id="hsSifreBtn">${T('hsSifre')}</button><button class="btn ghost" id="hsIndirBtn">${T('hsIndir')}</button></div>
    <div class="acts hs-acts"><button class="btn ghost" id="hsCikisBtn">${T('hsCikis')}</button><button class="btn danger" id="hsSilBtn">${T('hsSil')}</button></div>`;
  $('hsEsitleBtn').onclick = async () => { $('hsEsitleBtn').disabled = true; await Esitle.simdi(); if ($('hsEsitleBtn')) $('hsEsitleBtn').disabled = false; toast(Esitle.durum === 'esit' ? T('esEsit') : Esitle.hata === 'consent' ? T('hsRizaGerek') : T(Esitle.durum === 'cevrimdisi' ? 'hsCevrimdisi' : 'hsHata')); };
  $('hsGelenBtn').onclick = () => icinden(ayarlarAc, gelenKutusuAc);
  $('hsSiraBtn').onclick = () => icinden(ayarlarAc, siralamaAc);
  $('hsLb').onchange = e => lbDegistir(e.target.checked).catch(() => { e.target.checked = !e.target.checked; });
  $('hsRizaBtn').onclick = () => icinden(ayarlarAc, () => rizaVar ? onayAc(T('cRizaCekSor'), () => rizaCek().then(ayarlarAc)) : rizaVerAc());
  $('hsSifreBtn').onclick = () => icinden(ayarlarAc, sifreAc);
  $('hsIndirBtn').onclick = async () => {
    try { const r = await Hesap.disaAktar(); indir(JSON.stringify(r, null, 1), `lifefit_${u.username}_${bugunK()}.json`, 'application/json'); }
    catch(e){ toast(hesapHata(e)); }
  };
  $('hsCikisBtn').onclick = () => icinden(ayarlarAc, () => onayAc(T('hsCikisSor'), async () => { await Hesap.cik(); toast(T('hsCikisOk'), 3500); ayarlarAc(); }));
  $('hsSilBtn').onclick = () => icinden(ayarlarAc, () => onayAc(T('hsSilSor1'), () => icinden(ayarlarAc, silSifreAc)));
  hukukEkle(el);
}
// Sıralama katılımı (yalnız kullanıcı adı + gün sayıları gönderilir)
async function lbDegistir(acik){
  const u = Hesap.durum().kullanici; if (!u) throw {status: 401, error: 'auth'};
  try {
    await Hesap.riza({kvkk: true, terms: true, health: !!(u.consent && u.consent.health), ver: (u.consent && u.consent.ver) || RIZA_SURUM, lb_optin: acik});
    if (acik) await Esitle.istatistikGonder(true);
    toast(T('tSaved'));
  } catch(e){ toast(hesapHata(e)); throw e; }
}

// ---------- Gelen kutusu ----------
async function gelenKutusuAc(){
  if (!Hesap.durum().giris){ girisGerekAc(); return; }
  ac('📥 ' + T('ibT'), `<div class="hint" id="ibListe">${T('hsKontrol')}</div>`);
  let liste;
  try { liste = await Hesap.gelenKutusu(); } catch(e){ if ($('ibListe')) $('ibListe').innerHTML = `<div class="wmsg err">${esc(hesapHata(e))}</div>`; return; }
  const el = $('ibListe'); if (!el) return;   // pencere değişmiş
  const n = liste.filter(x => !x.seen).length;
  if (Esitle.gelen !== n){ Esitle.gelen = n; document.dispatchEvent(new CustomEvent('esitle')); }
  const tarih = t => new Date(t * 1000).toLocaleDateString(LOC(), {day: 'numeric', month: 'short'});
  el.className = '';
  el.innerHTML = liste.length ? liste.map(x => `<button class="ib-satir" data-kod="${esc(x.code)}"><span class="ik">${x.kind === 'program' ? '📋' : '🍽️'}</span>
      <div><b>${esc(x.title || T(x.kind === 'program' ? 'ibProgram' : 'ibYenen'))}</b><small>${esc(T('ibKimden', {u: x.from}))} · ${tarih(x.created)}</small></div>${x.seen ? '' : `<span class="tag">${T('ibYeni')}</span>`}</button>`).join('')
    : `<div class="hint">${esc(T('ibBos'))}</div>`;
  el.querySelectorAll('[data-kod]').forEach(b => b.onclick = () => gelenAc(b.dataset.kod));
}
// Gelen program → mevcut programSor (Evet → programUygula); yenen öğünler → belge görünümü
async function gelenAc(kod){
  let r;
  try { r = await Hesap.paylasimAl(kod); } catch(e){ toast(e && e.status === 404 ? T('ibAcilmadi') : hesapHata(e)); return; }
  Hesap.goruldu(kod).then(() => Esitle.gelenKutusuSay(true), () => {});
  if (r.kind === 'program'){
    const P = programDogrula(r.payload);
    if (!P){ toast(T('impBad'), 4000); return; }
    icinden(gelenKutusuAc, () => programSor(P));
    return;
  }
  const Y = r.payload;
  if (!Y || Y.v !== 1 || !Array.isArray(Y.o) || !/^\d{4}-\d\d-\d\d$/.test(String(Y.d))){ toast(T('rpBad'), 4000); return; }
  yenenRaporAc(Y);
}

// ---------- Uygulama içinde gönder (program linki kartı + "Yediklerimi gönder" penceresi) ----------
function appGonderAc(kind, payload, baslik){
  if (!Hesap.durum().giris){ girisGerekAc(); return; }
  ac(T('shAppT'), `<div class="hint">${esc(T('shAppInfo'))}</div>
    <label class="field" style="margin-top:10px"><span>${T('shAlici')}</span><input id="pAlici" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" maxlength="16" enterkeyhint="next"></label>
    <div class="ad-durum" id="pAliciDurum"></div>
    <label class="field"><span>${T('shBaslik')}</span><input id="pBaslik" maxlength="80" autocomplete="off" value="${esc(baslik || '')}" enterkeyhint="send"></label>
    <div class="wmsg err" id="pHata" hidden></div>
    <div class="acts"><button class="btn green" id="pGonder">${T('shGonderBtn')}</button></div>`);
  adKontrolBagla('pAlici', 'pAliciDurum', null, 'var');
  enterIle('pBaslik', 'pGonder');
  $('pGonder').onclick = async () => {
    const to = $('pAlici').value.trim(), b = $('pGonder');
    if (!KULLANICI_RE.test(to)) return hataYaz('pHata', T('hsAdFormat'));
    b.disabled = true; hataYaz('pHata', '');
    try { await Hesap.paylas(kind, to, payload, $('pBaslik').value.trim()); }
    catch(e){ b.disabled = false; hataYaz('pHata', e && e.status === 429 ? T('shLimit') : hesapHata(e)); return; }
    kapat(); toast(T('shGonderildi', {u: to}), 3500);
  };
  setTimeout(() => { if ($('pAlici')) $('pAlici').focus(); }, 250);
}
const kocLinkOlustur0 = kocLinkOlustur;
kocLinkOlustur = async function(){
  await kocLinkOlustur0();
  const acts = $('kocLink') && $('kocLink').querySelector('.acts');
  if (!acts || $('kocAppGonder')) return;
  acts.insertAdjacentHTML('beforeend', `<button class="btn" id="kocAppGonder">${T('shApp')}</button>`);
  $('kocAppGonder').onclick = () => { const P = kocPaket(); if (P) appGonderAc('program', P, P.a ? T('kocFor', {a: P.a}) : T('ibProgram')); };
};
const yenenPaylasAc0 = yenenPaylasAc;
yenenPaylasAc = async function(k){
  await yenenPaylasAc0(k);
  const acts = $('shKopya') && $('shKopya').closest('.acts');
  if (!acts || $('shApp')) return;
  acts.insertAdjacentHTML('beforeend', `<button class="btn" id="shApp">${T('shApp')}</button>`);
  $('shApp').onclick = () => icinden(() => yenenPaylasAc(k), () => appGonderAc('yenen', yenenPaketi(k), T('shText', {d: etiket(k)})));
};

// ---------- Sıralama (dünya / ülkem; seri = üst üste öğün kaydı yapılan gün) ----------
let lbKapsam = 'world';
async function siralamaAc(){
  const h = Hesap.durum(), u = h.kullanici;
  ac('🏆 ' + T('lbT'), `<div class="chips" style="margin-top:0">${[['world', 'lbDunya'], ['country', 'lbUlke']].map(([k, a]) => `<button class="chip${lbKapsam === k ? ' on' : ''}" data-lbs="${k}">${T(a)}</button>`).join('')}</div>
    <div class="hint">${esc(T('lbSeriInfo'))}</div><div id="lbListe" class="hint" style="margin-top:10px">${T('hsKontrol')}</div><div id="lbAlt"></div>`);
  $('sbody').querySelectorAll('[data-lbs]').forEach(b => b.onclick = () => { lbKapsam = b.dataset.lbs; siralamaAc(); });
  let r;
  try { r = await Hesap.siralama(lbKapsam, (u && u.country) || ulke()); }
  catch(e){ if ($('lbListe')) $('lbListe').innerHTML = `<div class="wmsg err">${esc(hesapHata(e))}</div>`; return; }
  const el = $('lbListe'); if (!el) return;
  const ben = u ? u.username.toLowerCase() : '';
  el.className = '';
  el.innerHTML = (lbKapsam === 'country' && !r.country ? `<div class="hint">${T('lbUlkeYok')}</div>` : '')
    + (r.rows.length ? `<div class="lb-satir bas"><span>#</span><b>${T('hsKullanici')}</b><span class="n">${T('lbSeri')}</span><span class="n">${T('lbGun')}</span></div>`
      + r.rows.map(x => `<div class="lb-satir${x.username.toLowerCase() === ben ? ' ben' : ''}"><span class="n">${x.rank}</span><b>${esc(x.username)}${x.username.toLowerCase() === ben ? ` <small>(${T('lbBen')})</small>` : ''}</b><span class="seri">🔥 ${T('lbGunN', {n: x.streak})}</span><span class="n">${T('lbGunN', {n: x.days})}</span></div>`).join('')
      : `<div class="hint">${T('lbBos')}</div>`);
  const alt = $('lbAlt');
  if (r.me) alt.innerHTML = `<div class="cur" style="margin-top:12px"><b>${T('lbSira', {n: r.me.rank, t: r.me.total})}</b> · 🔥 ${T('lbGunN', {n: r.me.streak})} · ${T('lbGunN', {n: r.me.days})}</div><button class="btn ghost full" id="lbCik">${T('lbCik')}</button>`;
  else alt.innerHTML = `<div class="hint" style="margin-top:12px">${esc(T('lbKatilInfo'))}</div><button class="btn solid full" style="margin-top:8px" id="lbKatil">${T('lbKatil')}</button>`;
  if ($('lbKatil')) $('lbKatil').onclick = () => h.giris ? lbDegistir(true).then(siralamaAc, () => {}) : icinden(siralamaAc, girisAc);
  if ($('lbCik')) $('lbCik').onclick = () => lbDegistir(false).then(siralamaAc, () => {});
}

// ---------- Ana ekran eşitleme rozeti (kayıt çipinin yanında; dokununca Ayarlar) ----------
function rozetKur(){
  if ($('esitRozet') || !$('kayitDurum')) return;
  const el = document.createElement('button'); el.id = 'esitRozet'; el.className = 'save-chip esit-rozet'; el.hidden = true;
  $('kayitDurum').insertAdjacentElement('afterend', el);
  el.onclick = () => ayarlarAc();
  rozetCiz();
}
function rozetCiz(){
  const el = $('esitRozet'); if (!el) return;
  const giris = Hesap.durum().giris;
  el.hidden = !giris;
  if (!giris) return;
  const d = Esitle.durum, k = {esit:'rzEsit', bekliyor:'rzBekliyor', gonderiliyor:'rzGonder', cevrimdisi:'rzCevrimdisi', hata:'rzHata'}[d] || 'rzBekliyor';
  el.className = 'save-chip esit-rozet ' + d;
  el.textContent = T(k) + (Esitle.gelen ? ` · ✉ ${Esitle.gelen}` : '');
  el.title = Esitle.hata === 'consent' ? T('hsRizaGerek') : '';
}
const kayitDurumYaz0 = kayitDurumYaz;
kayitDurumYaz = function(){ kayitDurumYaz0(); rozetCiz(); };   // dil değişince rozet de yenilenir
document.addEventListener('esitle', () => { rozetCiz(); hesapBolumuCiz(); });
rozetKur();

// ---------- Kurulum ekranı: hesabı olan kullanıcı ilk adımdan giriş yapar (sunucudaki veri gelir, kurulum atlanır) ----------
function wzGirisEkle(){
  const tasi = $('kurulum').querySelector('[data-wtasi]');
  if (!tasi || $('wzGiris') || Hesap.durum().giris) return;
  tasi.insertAdjacentHTML('afterend', `<button class="btn ghost full" id="wzGiris">${T('wzGiris')}</button>`);
  $('wzGiris').onclick = girisAc;
}
new MutationObserver(wzGirisEkle).observe($('kurulum'), {childList: true, subtree: true});
wzGirisEkle();   // sihirbaz bu parçadan önce çizilmiş olabilir (taze açılış) → bir kez hemen dene
