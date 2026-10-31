# Diyet Listesi uzun kullanim videosu (~56 sn, en fazla 1 dk): adim adim ust bant aciklamalari + dokunus halkasi.
# Once tohum.py (durum.json). MP4: kayit.py basindaki ffmpeg komutu (crf 25). Canlida: maviplay-site/diyet/kullanim.mp4 + site/img/kullanim.mp4 (?v= artir). Cikti: kareler/NNNNN.jpg + kareler/liste.txt (gercek sureler) -> ffmpeg ile mp4.
import asyncio, os, shutil, sys, time
from playwright.async_api import async_playwright
sys.stdout.reconfigure(encoding='utf-8')
APP = 'https://diyet.maviplay.com/app/'
KATMAN = r"""addEventListener('pointerdown', e => {
  const d = document.createElement('div');
  d.style.cssText = `position:fixed;left:${e.clientX - 24}px;top:${e.clientY - 24}px;width:48px;height:48px;border-radius:50%;
    background:rgba(37,99,235,.25);border:3px solid rgba(37,99,235,.75);pointer-events:none;z-index:2147483647;
    transform:scale(.5);opacity:1;transition:transform .35s ease-out,opacity .45s ease-in .25s`;
  document.documentElement.appendChild(d);
  requestAnimationFrame(() => requestAnimationFrame(() => { d.style.transform = 'scale(1.2)'; d.style.opacity = '0'; }));
  setTimeout(() => d.remove(), 900);
}, true);
addEventListener('DOMContentLoaded', () => { const st = document.createElement('style'); st.textContent = 'body{padding-top:58px!important}'; document.head.appendChild(st); });
window.__alt = (no, metin) => {
  let k = document.getElementById('__alt');
  if (!k) {
    k = document.createElement('div'); k.id = '__alt';
    k.style.cssText = `position:fixed;top:10px;left:10px;right:10px;z-index:2147483646;display:flex;gap:10px;align-items:center;
      padding:10px 13px;border-radius:14px;background:rgba(15,23,42,.94);color:#fff;font:600 15px/1.3 'Segoe UI',system-ui,sans-serif;
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
K = 'kareler'
shutil.rmtree(K, ignore_errors=True); os.makedirs(K)
kareler = []


async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch(channel='msedge', headless=True)
        c = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True,
                                locale='tr-TR', storage_state='durum.json')
        await c.add_init_script(KATMAN)
        p = await c.new_page()
        await p.goto(APP, wait_until='networkidle'); await asyncio.sleep(3)
        await p.evaluate('window.scrollTo(0,0)'); await asyncio.sleep(0.5)
        calis = [True]

        async def yakala():
            while calis[0]:
                try:
                    kareler.append((time.time(), await p.screenshot(type='jpeg', quality=90)))
                except Exception:
                    await asyncio.sleep(0.02)
        yk = asyncio.ensure_future(yakala())
        bas = time.time()
        w = asyncio.sleep

        async def alt(no, metin):
            await p.evaluate('([n, m]) => __alt(n, m)', [no, metin]); await w(0.35)

        async def kay(y, sure=0.9):
            await p.evaluate(f'window.scrollTo({{top:{y},behavior:"smooth"}})'); await w(sure)

        async def gor(loc, sure=0.8):   # sayfa ya da pencere icinde yumusak kaydir
            await loc.evaluate('e => e.scrollIntoView({behavior:"smooth", block:"center"})'); await w(sure)

        async def kapat():
            x = p.locator('.icon-btn:visible', has_text='✕')
            if await x.count():
                await x.last.tap(); await w(0.6)

        # 0 giris
        await alt(0, 'Diyet Listesi · kısa kullanım turu'); await w(2.2)
        # 1 su
        await alt(1, 'Su içtikçe “Su içtim”e dokun')
        su = p.locator('button.btn.solid', has_text='Su içtim').first
        await su.tap(); await w(0.6); await su.tap(); await w(1.2)
        # 2 yedim
        await alt(2, 'Yediğin öğünü “Yedim” ile işaretle')
        y = await p.evaluate("document.querySelector('.card.meal, .meal').getBoundingClientRect().top + scrollY - 80")
        await kay(y)
        await p.locator('.eat-btn').first.tap(); await w(1.4)
        # 3 kiyasla
        await alt(3, '⇄ Kıyasla: iki yemeği karşılaştır')
        await p.locator('.mini.cmp').first.tap(); await w(1.3)
        await p.locator('.sheet .frow', has_text='Poşe').first.tap(); await w(2.9)
        # 4 degistir
        await alt(4, 'Beğendiysen “Bununla değiştir”')
        await w(0.5)
        await p.locator('.sheet button', has_text='Bununla değiştir').first.tap(); await w(1.6)
        # 5 kaldir
        await alt(5, '✕ ile yemeği menüden kaldır')
        await p.evaluate("""() => { const m = document.querySelector('.card.meal, .meal');
            const ad = [...m.querySelectorAll('*')].find(e => e.children.length === 0 && (e.textContent || '').trim() === 'Zeytin');
            let a = ad; while (a && a.querySelectorAll('.mini.del').length !== 1) a = a.parentElement;
            const h = a ? a.querySelector('.mini.del') : [...m.querySelectorAll('.mini.del')].pop();
            h.setAttribute('data-kaldir', '1'); }""")
        await gor(p.locator('[data-kaldir="1"]'))
        await p.locator('[data-kaldir="1"]').tap(); await w(1.8)
        # 6 loglar
        await alt(6, 'Ayarlar › Loglar: yaptığın her değişiklik kayıtlı')
        await kay(0, 0.8)
        await p.locator('button.tool-btn', has_text='Ayarlar').tap(); await w(1.1)
        await p.locator('.sheet button', has_text='Loglar').first.tap(); await w(3.6)
        # 7 verileri tasi
        await alt(7, 'Verileri taşı: tarayıcı ↔ ana ekran uygulaması, yeni telefon')
        gb = p.locator('.geri-btn:visible')
        if await gb.count():
            await gb.first.tap(); await w(0.9)
        ts = p.locator('.sheet button', has_text='Verileri taşı').first
        await gor(ts, 1.1)
        await ts.tap(); await w(3.6)
        await kapat(); await kapat()
        # 8 destek
        await alt(8, '☕ Destek ol: istersen gönüllü bağış (IBAN)')
        await kay(0, 0.5)
        await p.locator('button.tool-btn', has_text='Destek').tap(); await w(1.2)
        await p.locator('.sheet .chip', has_text='100').first.tap(); await w(2.2)
        await kapat()
        # 9 hamileyim
        await alt(9, '🤰 Hamileyim: trimesteri seç ve onayla')
        await p.locator('button.hamile-btn').tap(); await w(1.6)
        await p.locator('.opt', has_text='2. trimester').first.tap(); await w(1.4)
        await p.locator('button.btn.green:visible', has_text='Evet').first.tap(); await w(1.6)
        await alt(9, 'Menü hamileliğe göre yeniden hazırlandı'); await w(1.8)
        # 10 hamile degilim
        await alt(10, 'Çıkmak için “Hamile değilim” → onayla')
        await p.locator('button.hamile-btn').tap(); await w(2.0)
        evet = p.locator('button.btn.green:visible, button.btn.solid:visible', has_text='Evet')
        if await evet.count():
            await evet.first.tap()
        else:
            await p.locator('.overlay button.btn:visible').last.tap()
        await w(1.8)
        # son
        await alt(0, 'diyet.maviplay.com · ücretsiz, hesap gerekmez'); await w(2.6)
        son = time.time()
        calis[0] = False; await yk
        await p.screenshot(path='son_durum.png')
        await c.close(); await b.close()
    with open(os.path.join(K, 'liste.txt'), 'w') as f:
        for i, (t, d) in enumerate(kareler):
            open(os.path.join(K, f'{i:05d}.jpg'), 'wb').write(d)
            sonraki = kareler[i + 1][0] if i + 1 < len(kareler) else son
            f.write(f"file '{i:05d}.jpg'\nduration {max(sonraki - max(t, bas), 0.001):.4f}\n")
        f.write(f"file '{len(kareler) - 1:05d}.jpg'\n")
    print('kare', len(kareler), 'sure', round(son - bas, 2), 'kare/sn', round(len(kareler) / (son - bas), 1))

asyncio.run(main())
