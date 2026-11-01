# LifeRoutine yeni kullanim videosu (~57 sn, en fazla 60): SENARYO.md'deki 12 adim, ust bant aciklama + dokunus halkasi (uzun.py duzeni).
# Kullanim:  python kaynak/video/yeni.py [BASE]
#   BASE varsayilan http://127.0.0.1:8765/index.html (uygulama). Hesap adimi icin API: 127.0.0.1:8097 (python server/server.py 8097);
#   sunucu yoksa kayit formu doldurulur ama gonderilmez, siralama adimi Ayarlar > Hesap tanitimina doner.
# Tohum betigin icinde (durum.json GEREKMEZ): Ayse, kadin, 32, 166 cm, 72 -> 64 kg, haftada 3-4 gun karma, whey + kreatin, findik alerjisi,
#   2 regl kaydi (54 ve 26 gun once, 5 gun) -> "Regl yaklasiyor" cipi, hatirlatici acik, son 3 gun kayitli, Program hazirla taslagi dolu.
# Hesap: rastgele kullanici adi ile kaydolur (ayse_1234), bitiste Hesap.sil ile siler (olmazsa Python DELETE /account; o da olmazsa ekrana yazar).
#   Sunucu: /register IP basina saatte 5 -> ayni saatte 5'ten fazla deneme 429 verir.
# Cikti: site/video/kullanim.mp4 (600x1298, 30 fps, H.264 yuv420p, sessiz, crf 25, +faststart) + site/video/kullanim.jpg (kapak, ~1. sn karesi).
#   Kayit 390x844 @2x = 780x1688 ekran goruntusu dongusu (~17 kare/sn) -> kareler/liste.txt (gercek sureler) -> ffmpeg concat.
#   Toplam 59,5 sn'yi asarsa setpts ile tekduze hizlandirilir (hic kesilmez). Bitince kareler/ silinir.
# Yayin: site/index.html video etiketinde ?v= artir; maviplay-site/diyet/kullanim.mp4|jpg kopyasi (build.py MV).
import asyncio, json, os, random, secrets, shutil, subprocess, sys, time, urllib.error, urllib.request
from urllib.parse import urlparse
from playwright.async_api import async_playwright
sys.stdout.reconfigure(encoding='utf-8')

BURASI = os.path.dirname(os.path.abspath(__file__))
KOK = os.path.dirname(os.path.dirname(BURASI))
CIKTI = os.path.join(KOK, 'site', 'video')
K = os.path.join(BURASI, 'kareler')
BASE = next((a for a in sys.argv[1:] if not a.startswith('-')), 'http://127.0.0.1:8765/index.html')
HOST = urlparse(BASE).hostname or ''
API = 'http://127.0.0.1:8097/api' if HOST in ('127.0.0.1', 'localhost') else 'https://diyet.maviplay.com/api'
KULLANICI = 'ayse_' + str(random.randint(1000, 9999))
PAROLA = 'Lf-' + secrets.token_hex(4)          # 11 karakter (sunucu en az 8)
SINIR = 59.5                                    # sn; asilirsa tekduze hizlandirma

# Adim butceleri (sn) -> kumulatif hedef zamanlar; her adim sonunda hizala() erken bitince bekler, gec kalinca beklemez
BUTCE = [2.0, 2.5, 2.0, 5.0, 4.5, 5.0, 6.0, 4.0, 9.0, 6.0, 4.5, 4.5, 2.5]
HEDEF = [round(sum(BUTCE[:i + 1]), 2) for i in range(len(BUTCE))]

KATMAN = r"""addEventListener('pointerdown', e => {
  const d = document.createElement('div');
  d.style.cssText = `position:fixed;left:${e.clientX - 24}px;top:${e.clientY - 24}px;width:48px;height:48px;border-radius:50%;
    background:rgba(37,99,235,.25);border:3px solid rgba(37,99,235,.75);pointer-events:none;z-index:2147483647;
    transform:scale(.5);opacity:1;transition:transform .35s ease-out,opacity .45s ease-in .25s`;
  document.documentElement.appendChild(d);
  requestAnimationFrame(() => requestAnimationFrame(() => { d.style.transform = 'scale(1.2)'; d.style.opacity = '0'; }));
  setTimeout(() => d.remove(), 900);
}, true);
addEventListener('DOMContentLoaded', () => { const st = document.createElement('style');
  st.textContent = 'body{padding-top:62px!important}#kurulum,#koc{top:62px!important;height:calc(100% - 62px)!important}';
  document.head.appendChild(st); });
window.__alt = (no, metin) => {
  let k = document.getElementById('__alt');
  if (!k) {
    k = document.createElement('div'); k.id = '__alt';
    k.style.cssText = `position:fixed;top:10px;left:10px;right:10px;z-index:2147483646;display:flex;gap:10px;align-items:center;
      padding:10px 13px;border-radius:14px;background:rgba(15,23,42,.94);color:#fff;font:600 14.5px/1.3 'Segoe UI',system-ui,sans-serif;
      box-shadow:0 8px 24px rgba(0,0,0,.28);pointer-events:none;transition:opacity .22s,transform .22s;opacity:0;transform:translateY(-8px)`;
    document.documentElement.appendChild(k);
  }
  k.style.opacity = '0'; k.style.transform = 'translateY(-8px)';
  setTimeout(() => {
    k.innerHTML = (no ? `<b style="flex:none;width:26px;height:26px;border-radius:50%;background:#16a34a;display:grid;place-items:center;font-size:14px">${no}</b>` : '')
      + `<span>${metin}</span>`;
    k.style.opacity = '1'; k.style.transform = 'none';
  }, 230);
};"""

# Ornek profil: sihirbaz nesnesi (W) doldurulup wBitir() ile kurulum tamamlanir; sonra antrenman gunu, regl, kayit, hatirlatici, koc taslagi
TOHUM = r"""() => {
  const bugun = bugunK();
  D.ayar.turGoruldu = true;
  W = {...kopya(D.profil), dil:'tr', ad:'Ayşe', cins:'k', hamile:false, trimester:1, yas:32, boy:166, kilo:72, hedef:'ver', hedefKilo:64, hiz:0.5, aktivite:2,
       odaklar:[], haric:[], alerjiler:['findik'], alerjiVar:'var', alerjiAra:'', spor:{gun:4, tur:'karma'}, takviye:['whey','kreatin'], takviyeVar:'var',
       saatler:{kahvalti:'08:00', ogle:'12:30', aksam:'19:00'}, saatElle:{}, olcuElle:true, ara0:false};
  wBitir();
  // Bugun antrenman gunu olsun (varsayilan dagilim bugunu icermiyorsa son gun bugunle degisir) -> whey bugun ara ogunde
  const g = haftaGunu(bugun), s = new Set(D.profil.antrenmanGunleri || []);
  if (!s.has(g)){ const c = [...s].pop(); if (c !== undefined) s.delete(c); s.add(g); }
  D.profil.antrenmanGunleri = [...s].sort((a, b) => a - b);
  // Regl: 54 ve 26 gun once baslamis, 5 gun surmus -> ortalama dongu 28 -> tahmin 2 gun sonra -> "Regl yaklasiyor (~2 gun)" cipi
  D.regl = [{bas: gunEkle(bugun, -54), bit: gunEkle(bugun, -50)}, {bas: gunEkle(bugun, -26), bit: gunEkle(bugun, -22)}];
  // Son 3 gun kayitli (hafta seridinde nokta, siralamada seri)
  for (let i = 1; i <= 3; i++) D.kayit[gunEkle(bugun, -i)] = {yendi:{kahvalti:true, ogle:true, aksam:true}, su:7};
  D.ayar.hatirlatici = true;
  planYenile();
  // Program hazirla taslagi: bu haftanin menusu (Paylas adiminda link uretilecek)
  const KC = kocBos(); KC.a = 'Ayşe'; KC.h = 'Dyt. Elif'; KC.n = 'Haftalık örnek program';
  KC.gun = D.planlar[0].map(gun => Object.fromEntries(gun.map(o => [o.id, kopya(o.ogeler)])));
  D.koc = KC;
  kaydet();
  return {ad: D.profil.ad, kcal: D.profil.kcal, su: D.profil.su, ant: D.profil.antrenmanGunleri, bugun: g,
          ogunler: menuOku(bugun).map(o => o.id + ':' + o.ogeler.map(it => it.f).join('+')), alerjen: ALERJENLER.length, app: T('app')};
}"""


def sunucu_var():
    try:
        urllib.request.urlopen(urllib.request.Request(API + '/users/check?u=lf_probe', headers={'Origin': 'http://127.0.0.1:8765'}), timeout=3).read()
        return True
    except urllib.error.HTTPError:
        return True          # cevap verdi (4xx de olur)
    except Exception:
        return False


def hesap_sil_python(token):
    """Sayfa icinden silinemediyse: DELETE /account (Bearer token + sifre)."""
    try:
        r = urllib.request.Request(API + '/account', data=json.dumps({'password': PAROLA}).encode('utf-8'), method='DELETE',
                                   headers={'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, 'Origin': 'http://127.0.0.1:8765'})
        urllib.request.urlopen(r, timeout=8).read()
        return True
    except Exception as e:
        print('hesap silme (python) hata:', e)
        return False


def ffmpeg_yolu():
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        return 'ffmpeg'


async def main():
    SUNUCU = sunucu_var()
    print('uygulama:', BASE, '| API:', API, '| sunucu:', 'var' if SUNUCU else 'YOK (hesap adimi kayit olmadan)')
    shutil.rmtree(K, ignore_errors=True); os.makedirs(K); os.makedirs(CIKTI, exist_ok=True)
    kareler = []
    hesap_acildi = False
    token = None
    w = asyncio.sleep
    async with async_playwright() as pw:
        b = await pw.chromium.launch(channel='msedge', headless=True)
        c = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True,
                                locale='tr-TR', service_workers='block')
        await c.add_init_script(KATMAN)
        p = await c.new_page()
        p.set_default_timeout(8000)

        # ---- tohum (kayit disi) ----
        try:
            await p.goto(BASE, wait_until='networkidle', timeout=30000)
        except Exception:
            await p.goto(BASE, wait_until='load', timeout=30000)
        await p.wait_for_function("typeof wBitir === 'function' && typeof D === 'object' && typeof kocBos === 'function'", timeout=15000)
        await w(1.2)
        bilgi = await p.evaluate(TOHUM)
        print('tohum:', bilgi)
        APP, ALERJEN = bilgi['app'], bilgi['alerjen']
        await w(0.8)
        await p.reload(wait_until='load'); await w(2.5)
        await p.wait_for_function("typeof D === 'object' && D.ayar.kurulum && document.getElementById('kurulum').hidden", timeout=15000)
        await p.evaluate('window.scrollTo(0,0)'); await w(0.6)

        # ---- kare yakalama ----
        calis = [True]

        async def yakala():
            while calis[0]:
                try:
                    kareler.append((time.time(), await p.screenshot(type='jpeg', quality=90)))
                except Exception:
                    await asyncio.sleep(0.02)
        yk = asyncio.ensure_future(yakala())
        bas = time.time()

        # ---- yardimcilar ----
        async def alt(no, metin):
            await p.evaluate('([n, m]) => __alt(n, m)', [no, metin]); await w(0.35)

        async def kay(y, sure=0.9):
            await p.evaluate(f'window.scrollTo({{top:{y},behavior:"smooth"}})'); await w(sure)

        async def gor(loc, sure=0.8):   # sayfa ya da pencere icinde yumusak kaydir
            await loc.evaluate('e => e.scrollIntoView({behavior:"smooth", block:"center"})'); await w(sure)

        async def dokun(sel, sure=0.0):
            loc = p.locator(sel).first
            try:
                await loc.tap()
            except Exception:
                await loc.click()
            if sure: await w(sure)

        async def kapat(sure=0.6):      # acik pencere (sheet) varsa X ile kapat
            x = p.locator('#sheet [data-kapat]:visible')
            if await x.count():
                await x.first.tap()
            elif await p.evaluate("document.getElementById('overlay').classList.contains('open')"):
                await p.evaluate('kapat()')
            await w(sure)

        async def isaretle(sel):
            loc = p.locator(sel)
            try:
                await loc.tap()
            except Exception:
                pass
            if not await loc.is_checked():
                await loc.check()

        async def hizala(i):
            kalan = bas + HEDEF[i] - time.time()
            if kalan > 0: await w(kalan)
            else: print(f'  adim {i}: {-kalan:.1f} sn gecikti')

        async def adim(i, fn):
            try:
                await fn()
            except Exception as e:
                print(f'UYARI adim {i} hata: {type(e).__name__}: {str(e)[:160]}')
                try: await kapat(0.3)
                except Exception: pass
            await hizala(i)

        # ---- 0 giris ----
        async def a0():
            await alt(0, f'{APP} · kısa kullanım turu')
        await adim(0, a0)

        # ---- 1 su ----
        async def a1():
            await alt(1, 'Su içtikçe “Su içtim”e dokun')
            await gor(p.locator('#ozet .water-card'), 0.6)
            su = p.locator('#ozet .water-btns [data-su="1"]').first
            await su.tap(); await w(0.5); await su.tap(); await w(0.9)
        await adim(1, a1)

        # ---- 2 yedim ----
        async def a2():
            await alt(2, 'Yediğin öğünü “Yedim” ile işaretle')
            y = await p.evaluate("document.querySelector('#ogunler .meal').getBoundingClientRect().top + scrollY - 84")
            await kay(y, 0.8)
            await dokun('#ogunler .eat-btn', 1.0)
        await adim(2, a2)

        # ---- 3 kiyasla + degistir ----
        async def a3():
            await alt(3, '⇄ Kıyasla: iki yemeği karşılaştır, beğendiysen değiştir')
            await dokun('#ogunler [data-kiyas]', 1.1)
            await dokun('#sheet .frow', 2.2)
            await dokun('#onay', 1.3)
        await adim(3, a3)

        # ---- 4 alerjen suzgeci ----
        async def a4():
            await alt(4, f'{ALERJEN} alerjen süzgeci: fındıklı yemek hiç önerilmez')
            ekle = p.locator('#ogunler .add-food').first
            await gor(ekle, 0.5)
            await ekle.tap(); await w(0.9)
            await p.locator('#ara').press_sequentially('fındık', delay=95); await w(1.5)
            await kapat(0.4)
        await adim(4, a4)

        # ---- 5 antrenman karti + takviye ----
        async def a5():
            await alt(5, 'Antrenman kartı: antrenman ve dinlenme günü ayrı')
            await gor(p.locator('#ozet .ant-kart'), 2.1)
            i = await p.evaluate("() => { const ids = new Set(takviyeIdleri(D.profil)); return menuOku(aktif).findIndex(o => o.ogeler.some(it => ids.has(it.f))); }")
            if i >= 0:
                await alt(5, 'Takviyen (whey) ara öğünde otomatik yer alır')
                await gor(p.locator('#ogunler .meal').nth(i), 1.6)
        await adim(5, a5)

        # ---- 6 regl ----
        async def a6():
            await alt(6, 'Regl takibi: “Regl başladı” → tahmin ve döneme özel öneri')
            await kay(0, 0.6)
            await dokun('#cipler [data-reglbas]', 1.5)
            await alt(6, 'Regl günlerinde su hedefi +500 ml, demir + C vitamini önerisi')
            await gor(p.locator('#ozet .regl-bant'), 2.2)
        await adim(6, a6)

        # ---- 7 hatirlatici ----
        async def a7():
            await alt(7, 'Öğün hatırlatıcı: saatinde bildirim')
            await kay(0, 0.5)
            await dokun('#ayarBtn', 0.9)
            await gor(p.locator('#notTog'), 0.9); await w(1.2)
        await adim(7, a7)

        # ---- 8 hesap ----
        async def a8():
            nonlocal hesap_acildi, token
            await alt(8, 'Hesap isteğe bağlı: kullanıcı adı + şifre, cihazlar arasında eşitle')
            if not await p.locator('#hsKaydolBtn').count():
                await dokun('#ayarBtn', 0.9)
            await gor(p.locator('#hsKaydolBtn'), 0.6)
            await dokun('#hsKaydolBtn', 0.9)
            await p.locator('#kAd').press_sequentially(KULLANICI, delay=55); await w(0.7)   # "✓ Kullanıcı adı uygun"
            await p.locator('#kSifre').press_sequentially(PAROLA, delay=28)
            await p.locator('#kSifre2').press_sequentially(PAROLA, delay=28); await w(0.25)
            for sel in ('#rKvkk', '#rKosul', '#rSaglik'):
                await isaretle(sel); await w(0.3)
            if not SUNUCU:
                await w(1.0); await kapat(0.5); return
            hesap_acildi = True
            await dokun('#kGonder', 2.2)
            if await p.locator('#kGonder').count():   # form hala acik -> hata
                print('UYARI kayit basarisiz:', await p.locator('#kHata').inner_text())
                await kapat(0.4); return
            token = await p.evaluate("() => { try { return (JSON.parse(localStorage.getItem(HESAP_ANAHTAR) || 'null') || {}).token || null; } catch(e){ return null; } }")
            await alt(8, 'Hesap açıldı: verilerin eşitleniyor, rozet ana ekranda')
            await kay(0, 0.6); await w(0.9)
        await adim(8, a8)

        # ---- 9 programi paylas ----
        async def a9():
            await alt(9, 'Programı paylaş: bağlantı, WhatsApp ya da kullanıcı adıyla')
            await kapat(0.2)
            await dokun('#kocBtn', 1.2)
            link = p.locator('#koc [data-klink]').first
            await gor(link, 0.8)
            await link.tap(); await w(0.8)
            await gor(p.locator('#kocLink .acts'), 0.5); await w(1.5)
            try:
                await p.locator('#koc [data-kkapat]').first.tap()
            except Exception:
                await p.evaluate('kocKapat()')
            await w(0.4)
        await adim(9, a9)

        # ---- 10 siralama ----
        async def a10():
            await alt(10, 'Sıralama (isteğe bağlı): yalnız kullanıcı adı ve seri gün')
            await dokun('#ayarBtn', 1.2)
            if SUNUCU:
                await dokun('#hsSiraBtn', 1.3)
                katil = p.locator('#lbKatil')
                if await katil.count():
                    await katil.tap(); await w(1.3)
            else:
                await w(1.6)
            await kapat(0.3)
        await adim(10, a10)

        # ---- 11 hamileyim ----
        async def a11():
            await alt(11, 'Hamileyim: trimesteri seç, menü yeniden hazırlanır')
            await kay(0, 0.4)
            await dokun('#hamileBtn', 1.1)
            await dokun('#sbody [data-tri="2"]', 0.8)
            await dokun('#onayEvet', 1.2)
            await alt(11, 'Menü hamileliğe göre yeniden hazırlandı')
        await adim(11, a11)

        # ---- 12 son ----
        async def a12():
            await kay(0, 0.3)
            await alt(0, f'{APP} · diyet.maviplay.com · ücretsiz, reklamsız, hesap gerekmez')
        await adim(12, a12)

        son = time.time()
        calis[0] = False; await yk
        try:
            await p.screenshot(path=os.path.join(BURASI, 'son_durum.png'))
        except Exception:
            pass

        # ---- temizlik: gecici hesabi sil ----
        if hesap_acildi:
            await w(0.5)
            try:
                r = await p.evaluate("async pw => { try { await window.Hesap.sil(pw); return 'ok'; } catch(e){ return JSON.stringify(e); } }", PAROLA)
            except Exception as e:
                r = str(e)
            if r != 'ok' and token:
                r = 'ok' if hesap_sil_python(token) else r
            print('hesap', KULLANICI, 'silindi' if r == 'ok' else f'SILINEMEDI ({r}) -> elle sil: Ayarlar > Hesap > Hesabı sil, sifre {PAROLA}')
        await c.close(); await b.close()

    # ---- kareler -> mp4 ----
    sure = son - bas
    if not kareler:
        print('HATA: hic kare yakalanmadi'); sys.exit(1)
    with open(os.path.join(K, 'liste.txt'), 'w') as f:
        for i, (t, d) in enumerate(kareler):
            open(os.path.join(K, f'{i:05d}.jpg'), 'wb').write(d)
            sonraki = kareler[i + 1][0] if i + 1 < len(kareler) else son
            f.write(f"file '{i:05d}.jpg'\nduration {max(sonraki - max(t, bas), 0.001):.4f}\n")
        f.write(f"file '{len(kareler) - 1:05d}.jpg'\n")
    print('kare', len(kareler), 'sure', round(sure, 2), 'kare/sn', round(len(kareler) / sure, 1))
    ff = ffmpeg_yolu()
    vf = 'scale=600:1298:flags=lanczos:in_range=pc:out_range=tv,setsar=1,fps=30,format=yuv420p'
    if sure > SINIR:
        k = SINIR / sure
        vf = f'setpts={k:.5f}*PTS,' + vf
        print(f'60 sn siniri icin hizlandirma x{1 / k:.3f}')
    mp4 = os.path.join(CIKTI, 'kullanim.mp4'); jpg = os.path.join(CIKTI, 'kullanim.jpg')
    r = subprocess.run([ff, '-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', os.path.join(K, 'liste.txt'), '-vf', vf,
                        '-color_range', 'tv', '-colorspace', 'bt709', '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-profile:v', 'high',
                        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', mp4], capture_output=True, text=True)
    if r.returncode:
        print('ffmpeg hata:', r.stderr[-1500:]); sys.exit(1)
    # Kapak: ~1. sn karesi (ust bant yerlesmis ana sayfa)
    kapak = min(range(len(kareler)), key=lambda i: abs(kareler[i][0] - (bas + 1.0)))
    r2 = subprocess.run([ff, '-y', '-hide_banner', '-loglevel', 'error', '-i', os.path.join(K, f'{kapak:05d}.jpg'), '-vf', 'scale=600:1298:flags=lanczos', '-q:v', '3', jpg],
                        capture_output=True, text=True)
    if r2.returncode:
        print('kapak hata:', r2.stderr[-800:])
    bilgi = subprocess.run([ff, '-hide_banner', '-i', mp4], capture_output=True, text=True).stderr
    dur = next((s.strip() for s in bilgi.split('\n') if 'Duration' in s), '')
    print(f'{mp4} {os.path.getsize(mp4) // 1024} KB | {dur}')
    print(f'{jpg} {os.path.getsize(jpg) // 1024} KB (kare {kapak})')
    shutil.rmtree(K, ignore_errors=True)
    print('Sonraki: site/index.html video etiketinde ?v= artir; maviplay-site/diyet/ kopyasi.')

asyncio.run(main())
