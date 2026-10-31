# Diyet Listesi kullanim videosu (~14 sn), es zamanli ekran goruntusu dongusuyle tam cozunurluk (390x844 @2x = 780x1688).
# Cikti: kareler/NNNNN.jpg + kareler/liste.txt (ffmpeg concat, gercek sureler). Once tohum.py (durum.json).
# Not: Playwright record_video ve CDP screencast 2x'te CSS piksel (390x844) verir; page.screenshot dongusu ~17 kare/sn 780x1688 verir.
# MP4 (ffmpeg = imageio_ffmpeg ikilisi):
#   ffmpeg -f concat -safe 0 -i kareler/liste.txt -vf "scale=600:1298:flags=lanczos:in_range=pc:out_range=tv,setsar=1,fps=30,format=yuv420p"
#          -color_range tv -colorspace bt709 -c:v libx264 -preset slow -crf 23 -profile:v high -movflags +faststart -an kullanim.mp4
#   ffmpeg -i kareler/00000.jpg -vf scale=600:-2 -q:v 3 kullanim.jpg
# Kopyala: site/img/ (diyet.maviplay.com) ve maviplay-site/diyet/ (maviplay.com/diyet, build.py MV ile surumlenir)
import asyncio, base64, os, shutil, sys, time
from playwright.async_api import async_playwright
sys.stdout.reconfigure(encoding='utf-8')
APP = 'https://diyet.maviplay.com/app/'
HALKA = """addEventListener('pointerdown', e => {
  const d = document.createElement('div');
  d.style.cssText = `position:fixed;left:${e.clientX - 24}px;top:${e.clientY - 24}px;width:48px;height:48px;border-radius:50%;
    background:rgba(37,99,235,.25);border:3px solid rgba(37,99,235,.75);pointer-events:none;z-index:2147483647;
    transform:scale(.5);opacity:1;transition:transform .35s ease-out,opacity .45s ease-in .25s`;
  document.documentElement.appendChild(d);
  requestAnimationFrame(() => requestAnimationFrame(() => { d.style.transform = 'scale(1.2)'; d.style.opacity = '0'; }));
  setTimeout(() => d.remove(), 900);
}, true);"""
K = 'kareler'
shutil.rmtree(K, ignore_errors=True); os.makedirs(K)
kareler = []


async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch(channel='msedge', headless=True)
        c = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True,
                                locale='tr-TR', storage_state='durum.json')
        await c.add_init_script(HALKA)
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

        async def kay(y, sure=0.9):
            await p.evaluate(f'window.scrollTo({{top:{y},behavior:"smooth"}})'); await w(sure)

        await w(1.0)
        su = p.locator('button.btn.solid', has_text='Su içtim').first
        await su.tap(); await w(0.6); await su.tap(); await w(0.9)
        y = await p.evaluate("document.querySelector('.card.meal, .meal').getBoundingClientRect().top + scrollY - 12")
        await kay(y)
        await p.locator('.eat-btn').first.tap(); await w(1.1)
        await p.locator('.mini.cmp').first.tap(); await w(1.2)
        await p.locator('.sheet .frow', has_text='Poşe').first.tap(); await w(1.9)
        await p.locator('.sheet button', has_text='Bununla değiştir').first.tap(); await w(1.1)
        await kay(0); await w(1.5)
        await p.locator('button.day', has_text='Paz').first.tap(); await w(1.4)
        son = time.time()
        calis[0] = False; await yk
        await c.close(); await b.close()
    with open(os.path.join(K, 'liste.txt'), 'w') as f:
        for i, (t, d) in enumerate(kareler):
            open(os.path.join(K, f'{i:05d}.jpg'), 'wb').write(d)
            sonraki = kareler[i + 1][0] if i + 1 < len(kareler) else son
            f.write(f"file '{i:05d}.jpg'\nduration {max(sonraki - max(t, bas), 0.001):.4f}\n")
        f.write(f"file '{len(kareler) - 1:05d}.jpg'\n")
    print('kare', len(kareler), 'sure', round(son - bas, 2), 'ilk kare gecikme', round(kareler[0][0] - bas, 2))

asyncio.run(main())
