// ---------- Sürüm 13: Durum raporu (günlük / haftalık / aylık) — diyetisyene, hekime, antrenöre WhatsApp ile ----------
// Veri bağlantının İÇİNDE (…/app/#r=<sıkıştırılmış>&n=<uzunluk>; # sonrası sunucuya hiç gitmez — #y= ile aynı yöntem).
// Kullanıcı kendi verisini kendi seçtiği kişiye kendisi gönderir; uygulama hiçbir yere yüklemez (KVKK: işleme yok, aktarım yok).
// Paket R (v:1): a ad · l dil · d0/d1 dönem · h hedefler [kcal,p,c,s,y,l,su] · g günler [[k, kcal,p,c,s,y,l, suMl, yenenÖğün, öğünSayısı, uyum]]
//   t tartı [[k,kg]] · o ölçü [[k,bel,kalça,boyun,yağ]] · bp [[t,s,d,n]] · sk [[t,v,z]] · ak [[k,adım,uyku]] · mk mikro ort. (MIKRO_ALAN sırası)
//   an antrenman [[k, hareket sayısı]] · il ilaç uyumu [alınan, planlanan] · y (yalnız günlük) öğün ayrıntısı (yenenPaketi(k).o ile aynı)
Object.assign(S, {
  rpDonem:["Dönem","Period","Период","Zeitraum","الفترة"],
  rpGun:["Bugün","Today","Сегодня","Heute","اليوم"],
  rpHafta:["Son 7 gün","Last 7 days","Последние 7 дней","Letzte 7 Tage","آخر 7 أيام"],
  rpAy:["Son 30 gün","Last 30 days","Последние 30 дней","Letzte 30 Tage","آخر 30 يومًا"],
  rpWhatsapp:["WhatsApp ile gönder","Send via WhatsApp","Отправить в WhatsApp","Per WhatsApp senden","إرسال عبر واتساب"],
  rpPaylas:["Paylaş…","Share…","Поделиться…","Teilen…","مشاركة…"],
  rpKopyala:["Bağlantıyı kopyala","Copy link","Копировать ссылку","Link kopieren","نسخ الرابط"],
  rpOnizle:["Önizle / PDF","Preview / PDF","Просмотр / PDF","Vorschau / PDF","معاينة / PDF"],
  rpGizlilik:["Rapor yalnız gönderdiğin kişiyle paylaşılır: veriler bağlantının içindedir, sunucumuza gelmez. Göndermeden önce önizleyebilirsin.","The report is shared only with the person you send it to: the data is inside the link and never reaches our server. You can preview it first.","Отчёт видит только тот, кому ты его отправишь: данные внутри ссылки и не попадают на наш сервер. Можно сначала посмотреть.","Der Bericht wird nur mit der Person geteilt, der du ihn schickst: Die Daten stecken im Link und erreichen unseren Server nie. Du kannst ihn vorher ansehen.","لا يُشارك التقرير إلا مع من ترسله إليه: البيانات داخل الرابط ولا تصل إلى خادمنا. يمكنك معاينته أولًا."],
  rpIcerik:["Raporda: kalori ve makrolar, su, plana uyum, kilo ve ölçüler, tansiyon ve kan şekeri, adım-uyku, antrenman, ilaç uyumu ve besin öğeleri (girdiklerin).","Includes: calories and macros, water, adherence, weight and measurements, blood pressure and glucose, steps and sleep, workouts, medicine adherence and nutrients (what you logged).","В отчёте: калории и БЖУ, вода, соблюдение плана, вес и замеры, давление и сахар, шаги и сон, тренировки, приём лекарств и нутриенты (что ты вносил).","Enthalten: Kalorien und Makros, Wasser, Planeinhaltung, Gewicht und Maße, Blutdruck und Blutzucker, Schritte und Schlaf, Training, Medikamenteneinnahme und Nährstoffe (was du eingetragen hast).","يشمل: السعرات والمغذيات الكبرى، الماء، الالتزام بالخطة، الوزن والقياسات، ضغط الدم والسكر، الخطوات والنوم، التمارين، الالتزام بالأدوية والعناصر الغذائية (ما أدخلته)."],
  rpHatirlat:["Her pazar 20:00'de rapor göndermeyi hatırlat","Remind me every Sunday at 20:00 to send the report","Напоминать каждое воскресенье в 20:00","Jeden Sonntag um 20:00 an den Bericht erinnern","ذكّرني كل أحد الساعة 20:00 بإرسال التقرير"],
  rpHatirlatBas:["📤 Haftalık raporun hazır","📤 Your weekly report is ready","📤 Недельный отчёт готов","📤 Dein Wochenbericht ist fertig","📤 تقريرك الأسبوعي جاهز"],
  rpHatirlatGovde:["Diyetisyenine veya antrenörüne göndermek için dokun.","Tap to send it to your dietitian or coach.","Нажми, чтобы отправить диетологу или тренеру.","Tippe, um ihn an Ernährungsberatung oder Coach zu senden.","اضغط لإرساله إلى أخصائي التغذية أو المدرب."],
  rpMetin:["{ad} · {d} durum raporu","{ad} · status report {d}","{ad} · отчёт {d}","{ad} · Statusbericht {d}","{ad} · تقرير الحالة {d}"],
  rpOzetSatir:["Ortalama {k} kcal (hedef {h}) · uyum %{u} · su {s} L","Avg {k} kcal (target {h}) · adherence {u}% · water {s} L","Средн. {k} ккал (цель {h}) · соблюдение {u}% · вода {s} л","Ø {k} kcal (Ziel {h}) · Einhaltung {u} % · Wasser {s} L","المتوسط {k} سعرة (الهدف {h}) · الالتزام {u}% · الماء {s} لتر"],
  rpKiloSatir:["Kilo: {a} → {b} kg","Weight: {a} → {b} kg","Вес: {a} → {b} кг","Gewicht: {a} → {b} kg","الوزن: {a} ← {b} كغ"],
  rpBaslik:["Durum raporu","Status report","Отчёт о состоянии","Statusbericht","تقرير الحالة"],
  rpGunler:["Günlük özet","Daily summary","По дням","Tagesübersicht","الملخص اليومي"],
  rpKayitGun:["Kayıtlı gün","Logged days","Дней с записями","Erfasste Tage","الأيام المسجلة"],
  rpOrt:["Ortalama","Average","Среднее","Durchschnitt","المتوسط"],
  rpOgun:["Öğün","Meals","Приёмы","Mahlzeiten","الوجبات"],
  rpYok:["Bu dönemde kayıt yok.","No entries in this period.","В этот период нет записей.","In diesem Zeitraum keine Einträge.","لا توجد سجلات في هذه الفترة."],
  rpIlacUyum:["İlaç / takviye uyumu","Medicine / supplement adherence","Приём лекарств / добавок","Einnahme Medikamente / Ergänzungen","الالتزام بالأدوية / المكملات"],
  rpAltNot:["Kullanıcının kendi girdiği kayıtlardır; besin öğeleri tahminidir. Tanı amacıyla kullanılamaz.","Self-reported data; nutrient values are estimates. Not for diagnosis.","Данные внесены пользователем; нутриенты — оценка. Не для диагностики.","Selbst erfasste Daten; Nährstoffwerte sind Schätzungen. Nicht zur Diagnose.","بيانات أدخلها المستخدم بنفسه؛ قيم العناصر الغذائية تقديرية. لا تُستخدم للتشخيص."],
  rpBozuk:["Rapor bağlantısı açılamadı (eksik ya da bozuk).","Could not open the report link (incomplete or damaged).","Не удалось открыть ссылку на отчёт (неполная или повреждена).","Der Berichtslink konnte nicht geöffnet werden (unvollständig oder beschädigt).","تعذّر فتح رابط التقرير (ناقص أو تالف)."],
  rpAntSay:["{n} antrenman","{n} workouts","{n} тренировок","{n} Trainings","{n} تمارين"]
});

const RP = {donem: 'hafta'};
const rpGunleri = donem => donem === 'gun' ? [bugunK()] : Array.from({length: donem === 'ay' ? 30 : 7}, (_, i) => gunEkle(bugunK(), i - (donem === 'ay' ? 29 : 6)));
function raporPaketi(donem){
  const gunler = rpGunleri(donem), d0 = gunler[0], d1 = gunler[gunler.length - 1], icinde = k => k >= d0 && k <= d1, P = D.profil, v = Math.round;
  const gy = k => { const t = tarihDen(k); t.setHours(0, 0, 0, 0); return t.getTime(); }, ts0 = gy(d0), ts1 = gy(gunEkle(d1, 1));
  const g = gunler.filter(kayitVar).map(k => {
    const r = kayitOku(k), y = yenenToplam(k), menu = menuOku(k).filter(o => !ogunKapali(o.id));
    return [k, v(y.k), v(y.p), v(y.c), v(y.s), v(y.y), v(y.l), v(r.su * P.bardak), menu.filter(o => r.yendi[o.id]).length, menu.length, uyumGun(k)];
  });
  const R = {v: 1, a: P.ad || '', l: dil, d0, d1, h: [P.kcal, P.protein, P.karb, P.seker, P.yag, P.lif, v(suHedefi(d1))], g,
    t: tartimlar().filter(([k]) => icinde(k)),
    o: olcumler().filter(([k]) => icinde(k)).map(([k, o]) => [k, o.bel || 0, o.kalca || 0, o.boyun || 0, o.yag || 0]),
    bp: (D.tansiyon || []).filter(x => x.t >= ts0 && x.t < ts1).map(x => [x.t, x.s, x.d, x.n || 0]),
    sk: (D.seker || []).filter(x => x.t >= ts0 && x.t < ts1).map(x => [x.t, x.v, x.z]),
    ak: gunler.filter(k => (D.aktivite || {})[k]).map(k => [k, (D.aktivite[k].adim) || 0, (D.aktivite[k].uyku) || 0]),
    an: gunler.filter(k => (D.antLog || {})[k]).map(k => [k, Object.keys(D.antLog[k]).length])};
  // tartı dönem öncesi son değer: değişimi göstermek için başlangıç noktası
  const once = tartimlar().filter(([k]) => k < d0); if (once.length && R.t.length) R.t0 = once[once.length - 1];
  const ilac = (D.ilac || []).filter(i => i.aktif !== false);
  if (ilac.length){ let al = 0; gunler.forEach(k => { const L = (D.ilacLog || {})[k] || {}; ilac.forEach(i => { if (L[i.id]) al++; }); }); R.il = [al, ilac.length * gunler.length]; }
  const M = mikroTopla(gunler); if (M.gunSay) R.mk = MIKRO_ALAN.map(a => Math.round(M.top[a] * 10) / 10);
  if (donem === 'gun') R.y = yenenPaketi(bugunK()).o;
  return R;
}
function raporOzetMetni(R){
  const n = R.g.length, ort = i => n ? Math.round(R.g.reduce((t, x) => t + (x[i] || 0), 0) / n) : 0;
  const uy = R.g.filter(x => x[10] != null), u = uy.length ? Math.round(uy.reduce((t, x) => t + x[10], 0) / uy.length) : 0;
  const satir = [T('rpOzetSatir', {k: ort(1), h: R.h[0], u, s: litre(ort(7))})];
  const t = R.t || []; if (t.length) satir.push(T('rpKiloSatir', {a: sayi((R.t0 || t[0])[1]), b: sayi(t[t.length - 1][1])}));
  return satir.join('\n');
}
const rpDonemYaz = R => R.d0 === R.d1 ? etiket(R.d0) : `${kisaTarih(R.d0)} – ${kisaTarih(R.d1)}`;
async function raporLinki(R){ const kod = await paketKodla(R); return PAYLASIM_TABAN + '#r=' + kod + '&n=' + kod.length; }

function tkRapor(){
  const R = raporPaketi(RP.donem), n = R.g.length;
  const el = tkIc(`<div class="card">
    <div class="kart-bas"><h3>📤 ${T('tkS_rapor')}</h3></div>
    <div class="sec">${T('rpDonem')}</div>
    <div class="seg seg-genis">${['gun', 'hafta', 'ay'].map(d => `<button class="${RP.donem === d ? 'on' : ''}" data-rpd="${d}">${T({gun: 'rpGun', hafta: 'rpHafta', ay: 'rpAy'}[d])}</button>`).join('')}</div>
    <div class="cur" style="margin-top:10px"><b>${esc(rpDonemYaz(R))}</b> · ${T('rpKayitGun')}: ${n}<br><small>${esc(raporOzetMetni(R)).replace(/\n/g, '<br>')}</small></div>
    <p class="hint" style="margin:8px 0">${esc(T('rpIcerik'))}</p>
    <div class="rp-dugmeler"><button class="btn green" id="rpWa">💬 ${T('rpWhatsapp')}</button><button class="btn solid" id="rpPay">${T('rpPaylas')}</button><button class="btn" id="rpKop">🔗 ${T('rpKopyala')}</button><button class="btn ghost" id="rpOn">📄 ${T('rpOnizle')}</button></div>
    <p class="tk-not">🔒 ${esc(T('rpGizlilik'))}</p>
    ${window.__LF_NATIVE ? `<div class="saat-liste" style="margin-top:10px"><button class="saat-ek${D.ayar.raporHat ? ' on' : ''}" id="rpHat" aria-pressed="${!!D.ayar.raporHat}"><span class="kutu">${D.ayar.raporHat ? '✓' : ''}</span>${T('rpHatirlat')}</button></div>` : ''}
  </div>${tkNotHtml()}`);
  el.querySelectorAll('[data-rpd]').forEach(b => b.onclick = () => { RP.donem = b.dataset.rpd; tkRapor(); });
  const metin = () => T('rpMetin', {ad: R.a || T('app'), d: rpDonemYaz(R)}) + '\n' + raporOzetMetni(R);
  const say = () => { sayacArtir('rapor'); kaydet(); rozetKontrol(true); };
  // iPhone panoya yalnız dokunuş anında yazmaya izin verir → bağlantı önceden hazırlanır
  let url = ''; raporLinki(R).then(u => url = u);
  $('rpWa').onclick = async () => { const u = url || await raporLinki(R); say(); window.open('https://wa.me/?text=' + encodeURIComponent(metin() + '\n' + u), '_blank'); };
  $('rpPay').onclick = async () => { const u = url || await raporLinki(R); say(); if (navigator.share) navigator.share({title: T('rpBaslik'), text: metin(), url: u}).catch(() => {}); else kopyala(metin() + '\n' + u); };
  $('rpKop').onclick = () => { if (!url){ raporLinki(R).then(u => { url = u; kopyala(u); }); return; } say(); kopyala(metin() + '\n' + url); };
  $('rpOn').onclick = () => raporGoster(R, false);
  if ($('rpHat')) $('rpHat').onclick = () => { D.ayar.raporHat = !D.ayar.raporHat; kaydet(); raporHatirlaticiKur(); tkRapor(); };
}
// Haftalık hatırlatıcı: pazar 20:00 (expo-notifications haftanın günü: 1 = pazar)
function raporHatirlaticiKur(){
  if (!(window.__LF_NATIVE && window.__lfNotify)) return;
  if (D.ayar.raporHat) window.__lfNotify({id: 'rapor-hafta', title: T('rpHatirlatBas'), body: T('rpHatirlatGovde'), hour: 20, minute: 0, repeat: 'weekly', weekday: 1});
  else if (window.__lfCancelNotify) window.__lfCancelNotify('rapor-hafta');
}
// Bildirime dokununca Takip → Rapor açılır
(function(){
  const t0 = window.__lfOnNotificationTap;
  window.__lfOnNotificationTap = function(d){ if (d && d.id === 'rapor-hafta'){ RP.donem = 'hafta'; setTimeout(() => takipAc('rapor'), 300); return; } if (t0) return t0.apply(this, arguments); };
})();

// ---- Belge görünümü (A4; yazdır → PDF). Alıcıda (diyetisyen) profesyonel moddaysa "Danışanlarıma kaydet" (p9f.js) ----
function raporGoster(R, gelen){
  kapat();
  if ($('rapor')) $('rapor').remove();
  const dil0 = dil; if (gelen && !D.ayar.kurulum && DILLER.some(d => d.k === R.l)) dil = R.l;
  const n = x => Math.round(+x || 0), g = R.g || [], h = R.h || [];
  const ort = i => g.length ? Math.round(g.reduce((t, x) => t + (+x[i] || 0), 0) / g.length) : 0;
  const uy = g.filter(x => x[10] != null), uyOrt = uy.length ? Math.round(uy.reduce((t, x) => t + x[10], 0) / uy.length) : null;
  const kutu = (b, d, hd, bi) => `<div class="rp-kutu"><small>${b}</small><b>${d}</b> <span>${bi}${hd ? ' / ' + hd : ''}</span></div>`;
  const tablo = (bas, satirlar) => satirlar.length ? `<table class="rp-tablo"><thead><tr>${bas.map(b => `<th>${b}</th>`).join('')}</tr></thead><tbody>${satirlar.map(s => `<tr>${s.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>` : '';
  const zaman = t => new Date(t).toLocaleString(LOC(), {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'});
  const t = R.t || [], kiloBas = t.length ? (R.t0 || t[0]) : null, kiloSon = t.length ? t[t.length - 1] : null;
  const bolum = (bas, ic) => ic ? `<section class="rp-bolum"><h2>${bas}</h2>${ic}</section>` : '';
  const ref = mikroReferans();
  const html = `<div class="rapor" id="rapor" translate="no" dir="${RTL() ? 'rtl' : 'ltr'}">
    <div class="rapor-arac">${gelen && typeof proAcik === 'function' && proAcik() ? `<button class="btn green" id="rpDanisan">👥 ${T('prKaydet')}</button>` : ''}<button class="btn solid" id="rpPdf">${T('rpPdf')}</button><button class="btn ghost" id="rpKapat">✕ ${T('rpClose')}</button></div>
    <article class="rapor-sayfa">
      <header class="rp-bas"><div><small>📊 ${T('rpBaslik')}</small><h1>${esc(String(R.a || '').slice(0, 40)) || '—'}</h1><p>${esc(rpDonemYaz(R))} · ${T('rpKayitGun')}: ${g.length}</p></div></header>
      ${g.length ? `<section class="rp-ozet">
        ${kutu(T('calories'), ort(1), n(h[0]), T('kcal'))}${kutu(T('protein'), ort(2), n(h[1]), T('g'))}${kutu(T('carb'), ort(3), n(h[2]), T('g'))}${kutu(T('fat'), ort(5), n(h[4]), T('g'))}
        ${kutu('💧 ' + T('water'), litre(ort(7)), litre(n(h[6])), T('L'))}${kutu('🎯 ' + T('tkUyum'), uyOrt != null ? uyOrt + '%' : '—', '', '')}
        ${kiloSon ? kutu('⚖️ ' + T('tkKilo'), sayi(kiloSon[1]), '', 'kg' + (kiloBas && kiloBas !== kiloSon ? ' (' + farkKg(kiloSon[1], kiloBas[1]) + ')' : '')) : ''}
        ${R.il ? kutu('💊 ' + T('rpIlacUyum'), R.il[1] ? Math.round(R.il[0] / R.il[1] * 100) + '%' : '—', '', '') : ''}
      </section>` : `<p class="rp-yenmeyen">${T('rpYok')}</p>`}
      ${R.y ? (R.y.filter(o => o[2] && o[3]).map(o => `<section class="rp-ogun"><h2><span class="rp-saat">${esc(String(o[1] || ''))}</span>${esc(String(o[0] || ''))}<em>${o[3].reduce((s, it) => s + n(it[2]), 0)} ${T('kcal')}</em></h2>
          ${tablo([T('rpFood'), T('kcal'), T('protein'), T('carbS'), T('fat')], o[3].map(it => [`<b>${esc(String(it[0] || ''))}</b><small>${esc(String(it[1] || ''))}</small>`, n(it[2]), n(it[3]), n(it[4]), n(it[6])]))}</section>`).join('')) : ''}
      ${!R.y && g.length ? bolum(T('rpGunler'), tablo([T('tkTarih'), T('kcal'), T('protein'), T('carbS'), T('fat'), T('water'), T('rpOgun'), T('tkUyum')],
          g.map(x => [esc(kisaTarih(x[0])), n(x[1]), n(x[2]), n(x[3]), n(x[5]), litre(n(x[7])), `${n(x[8])}/${n(x[9])}`, x[10] != null ? x[10] + '%' : '—']))) : ''}
      ${t.length ? bolum('⚖️ ' + T('tkKilo'), (t.length > 1 ? cizgiGrafik([{n: t}], {enAz: 2, xYaz: kisaTarih, h: 140}) : '') + tablo([T('tkTarih'), 'kg'], t.map(x => [esc(kisaTarih(x[0])), sayi(x[1])]))) : ''}
      ${(R.o || []).length ? bolum('📏 ' + T('tkOlcuT'), tablo([T('tkTarih'), T('o_bel'), T('o_kalca'), T('o_boyun'), T('o_yag')], R.o.map(x => [esc(kisaTarih(x[0])), ...x.slice(1).map(v => v ? sayi(v) : '—')]))) : ''}
      ${(R.bp || []).length ? bolum('❤️ ' + T('tkTansiyon') + ' (mmHg)', tablo([T('tkSaat'), T('tkBuyuk'), T('tkKucuk'), T('tkNabiz'), ''], R.bp.map(x => { const c = tansiyonSinif(x[1], x[2]); return [esc(zaman(x[0])), x[1], x[2], x[3] || '—', `<span class="tk-etiket ${c.c}">${T(c.k)}</span>`]; }))) : ''}
      ${(R.sk || []).length ? bolum('🩸 ' + T('tkSeker') + ' (mg/dL)', tablo([T('tkSaat'), T('tkSeker'), '', ''], R.sk.map(x => { const c = sekerSinif(x[1], x[2]); return [esc(zaman(x[0])), x[1], T('tkSekerZ_' + x[2]), `<span class="tk-etiket ${c.c}">${T(c.k)}</span>`]; }))) : ''}
      ${(R.ak || []).length ? bolum('👟 ' + T('tkS_aktivite'), tablo([T('tkTarih'), T('tkAdim'), T('tkUyku')], R.ak.map(x => [esc(kisaTarih(x[0])), x[1] ? sayi(x[1]) : '—', x[2] ? sayi(x[2]) : '—']))) : ''}
      ${(R.an || []).length ? bolum('🏋️ ' + T('tkAnt'), `<p>${T('rpAntSay', {n: R.an.length})} · ${R.an.map(x => esc(kisaTarih(x[0]))).join(', ')}</p>`) : ''}
      ${R.mk ? bolum('🥦 ' + T('tkS_besin') + ` <small>(${T('rpOrt')})</small>`, tablo([T('tkS_besin'), '', T('tkBesinRef')], MIKRO_ALAN.map((a, i) => { const r = ref[a]; return [T('mk_' + a), sayi(R.mk[i]) + ' ' + MIKRO_BIRIM[a], (r.ust ? '≤ ' : '') + sayi(r.ref || r.ust) + ' ' + MIKRO_BIRIM[a]]; }))) : ''}
      <footer class="rp-alt">${T('rpAltNot')} · LifeRoutine · diyet.maviplay.com</footer>
    </article></div>`;
  dil = dil0;
  document.body.insertAdjacentHTML('beforeend', html);
  document.body.classList.add('rapor-acik');
  const baslik0 = document.title; document.title = `${String(R.a || '').slice(0, 40)} ${R.d0}_${R.d1}`.trim();
  $('rapor').scrollTop = 0;
  $('rpPdf').onclick = () => window.print();
  if ($('rpDanisan')) $('rpDanisan').onclick = () => danisanaKaydetSor(R);
  $('rpKapat').onclick = () => { $('rapor').remove(); document.body.classList.remove('rapor-acik'); document.title = baslik0; if (/^#r=/.test(location.hash)) raporLinkTemizle(); };
}
// Gelen paket güvenilmez: her alan sayıya/tarihe/izinli değere zorlanır (XSS ve NaN önlemi)
function raporNormal(R){
  const num = v => { const n = +v; return isFinite(n) ? n : 0; }, numN = v => v == null ? null : num(v);
  const tarih = v => /^\d{4}-\d\d-\d\d$/.test(String(v)) ? String(v) : null;
  const dizi = v => Array.isArray(v) ? v.filter(Array.isArray) : [];
  const str = (v, n) => String(v == null ? '' : v).slice(0, n);
  const o = {v: 1, a: str(R.a, 60), l: DILLER.some(d => d.k === R.l) ? R.l : 'tr', d0: R.d0, d1: tarih(R.d1) || R.d0,
    h: (Array.isArray(R.h) ? R.h : []).slice(0, 7).map(num),
    g: dizi(R.g).filter(x => tarih(x[0])).map(x => [x[0], ...x.slice(1, 10).map(num), numN(x[10])]),
    t: dizi(R.t).filter(x => tarih(x[0])).map(x => [x[0], num(x[1])]),
    o: dizi(R.o).filter(x => tarih(x[0])).map(x => [x[0], num(x[1]), num(x[2]), num(x[3]), num(x[4])]),
    bp: dizi(R.bp).map(x => [num(x[0]), num(x[1]), num(x[2]), num(x[3])]),
    sk: dizi(R.sk).map(x => [num(x[0]), num(x[1]), ['ac', 'tok', 'rast'].includes(x[2]) ? x[2] : 'rast']),
    ak: dizi(R.ak).filter(x => tarih(x[0])).map(x => [x[0], num(x[1]), num(x[2])]),
    an: dizi(R.an).filter(x => tarih(x[0])).map(x => [x[0], num(x[1])])};
  if (Array.isArray(R.t0) && tarih(R.t0[0])) o.t0 = [R.t0[0], num(R.t0[1])];
  if (Array.isArray(R.il)) o.il = [num(R.il[0]), num(R.il[1])];
  if (Array.isArray(R.mk)) o.mk = R.mk.map(num);
  if (Array.isArray(R.y)) o.y = dizi(R.y).map(m => [str(m[0], 60), str(m[1], 10), m[2] ? 1 : 0, dizi(m[3]).map(it => [str(it[0], 80), str(it[1], 40), ...it.slice(2, 8).map(num)])]);
  return o;
}
// Gelen #r= bağlantısı (adres çubuğunda ya da yapıştırılan metinde)
async function raporLinkiAc(metin){
  const m = String(metin || '').match(/#r=([A-Za-z0-9_-]+)(?:&n=(\d+))?/);
  if (!m) return false;
  let R = null;
  if (!m[2] || +m[2] === m[1].length){ try { R = await paketCoz(m[1]); } catch(e){} }
  if (!R || R.v !== 1 || !Array.isArray(R.g) || !/^\d{4}-\d\d-\d\d$/.test(R.d0 || '')) R = null;
  if (R) R = raporNormal(R);
  if (!R){ if (/^#r=/.test(location.hash)) raporLinkTemizle(); toast(T('rpBozuk')); return true; }
  raporGoster(R, true);
  return true;
}
// Yapıştırılan bağlantı (Program hazırla / Ayarlar "Bağlantı yapıştır"): #r= rapor, #a= antrenman (p9f.js)
(function(){
  const p0 = programLinkiAc;
  programLinkiAc = async function(m){
    const s = String(m || '');
    if (/#r=/.test(s)) return raporLinkiAc(s);
    if (/#a=/.test(s) && typeof antLinkiAc === 'function') return antLinkiAc(s);
    return p0.apply(this, arguments);
  };
})();
(function(){
  const k = () => { if (/^#r=/.test(location.hash)) setTimeout(() => raporLinkiAc(location.hash), 400); };
  window.addEventListener('hashchange', k);
  if (document.readyState === 'complete') k(); else window.addEventListener('load', k);
  setTimeout(raporHatirlaticiKur, 4500);
})();
