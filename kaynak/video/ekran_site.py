# Tanitim sitesi (site/img/app-*.png) ekran goruntuleri: guncel uygulamadan (kokteki index.html) 390x844 @2x.
# Kullanim: repo kokunde `python -m http.server 8765`, sonra `python kaynak/video/ekran_site.py [cikti_klasoru]`
# Tohum ve secimler yeni.py ile ayni (Ayse profili). Saglik sekmesi (yalniz web'de acik) goruntuye girmez.
import asyncio, os, re, sys
from playwright.async_api import async_playwright
sys.stdout.reconfigure(encoding='utf-8')

BURASI = os.path.dirname(os.path.abspath(__file__))
KOK = os.path.dirname(os.path.dirname(BURASI))
CIKTI = sys.argv[1] if len(sys.argv) > 1 else os.path.join(KOK, 'site', 'img')
BASE = 'http://127.0.0.1:8765/index.html'
FOTO = os.path.join(BURASI, 'pilav.jpg')
TOHUM = re.search(r'TOHUM = r"""(.*?)"""', open(os.path.join(BURASI, 'yeni.py'), encoding='utf-8').read(), re.S).group(1)
w = asyncio.sleep


async def main():
    os.makedirs(CIKTI, exist_ok=True)
    async with async_playwright() as pw:
        b = await pw.chromium.launch(channel='msedge', headless=True)

        async def ac(gen, yuk, olcek, mobil):
            c = await b.new_context(viewport={'width': gen, 'height': yuk}, device_scale_factor=olcek, is_mobile=mobil, has_touch=mobil,
                                    locale='tr-TR', service_workers='block')
            p = await c.new_page(); p.set_default_timeout(10000)
            await p.goto(BASE, wait_until='load', timeout=30000)
            await p.wait_for_function("typeof wBitir === 'function' && typeof D === 'object' && typeof kocBos === 'function'", timeout=15000)
            await w(1.2)
            print('tohum:', await p.evaluate(TOHUM))
            await w(0.8); await p.reload(wait_until='load'); await w(2.5)
            await p.wait_for_function("typeof D === 'object' && D.ayar.kurulum && document.getElementById('kurulum').hidden", timeout=15000)
            await p.evaluate('window.scrollTo(0,0)'); await w(0.6)
            return c, p

        c, p = await ac(390, 844, 2, True)

        async def cek(ad):
            await w(0.5)
            await p.screenshot(path=os.path.join(CIKTI, ad + '.png')); print('  ->', ad)

        async def dokun(sel, sure=0.8):
            loc = p.locator(sel).first
            try: await loc.tap()
            except Exception: await loc.click()
            await w(sure)

        async def kapat():
            x = p.locator('#sheet [data-kapat]:visible')
            if await x.count(): await x.first.tap()
            else: await p.evaluate("typeof kapat === 'function' && kapat()")
            await w(0.6)

        async def kay(sel, pay):
            y = await p.evaluate("([s, d]) => document.querySelector(s).getBoundingClientRect().top + scrollY - d", [sel, pay])
            await p.evaluate(f'window.scrollTo(0,{max(0, int(y))})'); await w(0.6)

        # su + yedim: ana ekran dolu gorunsun
        su = p.locator('#ozet .water-btns [data-su="1"]').first
        for _ in range(4): await su.tap(); await w(0.2)
        await dokun('#ogunler .eat-btn', 0.6)
        await p.evaluate('window.scrollTo(0,0)'); await w(2.8)   # bildirim balonu kaybolsun
        await cek('app-ana')

        # ogun karti: Yemek ekle + kamera + barkod dugmeleri
        await kay('#ogunler .add-row', 640)
        await cek('tel-ogun')

        # kiyas
        await kay('#ogunler .meal', 84)
        await dokun('#ogunler .meal:nth-of-type(2) [data-kiyas]', 1.1)
        await dokun('#sheet .frow', 1.6)
        await cek('app-kiyas')
        await kapat()

        # barkod
        await kay('#ogunler .add-row', 300)
        await dokun('#ogunler [data-bkekle]', 0.9)
        await p.locator('#bkKod').press_sequentially('8692886310711', delay=30)
        await dokun('#bkAra', 0.3)
        await p.locator('#sheet #onay').wait_for(state='visible', timeout=15000); await w(1.0)
        await cek('app-barkod')
        await kapat()

        # foto
        try: await p.evaluate('aiYukle().then(() => haritaYukle())')
        except Exception as e: print('model:', str(e)[:100])
        async with p.expect_file_chooser() as fc:
            await dokun('#ogunler [data-ftekle]', 0)
        await (await fc.value).set_files(FOTO)
        await p.locator('#sheet .frow', has_text='Tavuklu pilav').first.wait_for(state='visible', timeout=30000); await w(1.5)
        await cek('app-foto')
        await kapat()

        # regl
        await p.evaluate('window.scrollTo(0,0)'); await w(0.4)
        await dokun('#cipler [data-reglbas]', 1.2)
        await p.locator('#ozet .regl-bant').evaluate('e => e.scrollIntoView({block:"center"})'); await w(2.8)
        await cek('app-regl')

        # takip (saglik sekmesi mobil uygulamada yok -> goruntuden cikar)
        await p.evaluate('window.scrollTo(0,0)')
        await p.evaluate("takipAc('ozet')"); await w(0.8)
        await p.evaluate("document.querySelectorAll('[data-tks=\"saglik\"]').forEach(e => e.remove())")
        await cek('app-takip')
        await p.evaluate('takipKapat()'); await w(0.5)

        # program paylasimi
        await dokun('#kocBtn', 1.2)
        link = p.locator('#koc [data-klink]').first
        await link.evaluate('e => e.scrollIntoView({block:"center"})'); await w(0.4)
        await link.tap(); await w(0.9)
        await p.locator('#kocLink .acts').evaluate('e => e.scrollIntoView({block:"center"})')
        await cek('app-paylas')
        await p.evaluate('kocKapat()'); await w(0.4)

        # kurulum sihirbazi (hedef / spor / takviye)
        await p.evaluate("sihirbazAc('takviye')"); await w(0.8)
        await cek('app-kurulum')
        await c.close()

        # web (bilgisayar)
        c, p = await ac(1440, 900, 1, False)
        su = p.locator('#ozet .water-btns [data-su="1"]').first
        for _ in range(4): await su.click(); await w(0.2)
        await p.locator('#ogunler .eat-btn').first.click(); await w(0.5)
        await p.evaluate('window.scrollTo(0,0)'); await w(2.8)
        await cek('app-web')
        await c.close(); await b.close()

asyncio.run(main())
