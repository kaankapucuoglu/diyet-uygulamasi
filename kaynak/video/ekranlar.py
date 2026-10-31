# python ekranlar.py <hedef_klasor>  (once tohum.py) -> maviplay.com/diyet adim kartlari icin temiz ekran goruntuleri (s2..s8, 600x1300 JPEG). s1 (kurulum) eskisi kalir.
import io, sys, time
from PIL import Image
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding='utf-8')
APP = 'https://diyet.maviplay.com/app/'
HEDEF = sys.argv[1]


def kaydet(p, ad):
    im = Image.open(io.BytesIO(p.screenshot(type='png'))).convert('RGB').resize((600, 1300), Image.LANCZOS)
    im.save(f'{HEDEF}/{ad}.jpg', quality=86, optimize=True, progressive=True)
    print(ad)


def kapat(p):
    x = p.locator('.icon-btn:visible', has_text='✕')
    if x.count():
        x.last.tap(); time.sleep(0.6)


with sync_playwright() as pw:
    b = pw.chromium.launch(channel='msedge', headless=True)
    c = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True, locale='tr-TR', storage_state='durum.json')
    p = c.new_page()
    p.goto(APP, wait_until='networkidle'); time.sleep(2.5)
    su = p.locator('button.btn.solid', has_text='Su içtim').first
    su.tap(); time.sleep(0.4); su.tap(); time.sleep(0.4)
    p.locator('.eat-btn').first.tap(); time.sleep(3.5)          # bildirimler kaybolsun
    p.evaluate('scrollTo(0,0)'); time.sleep(0.6)
    kaydet(p, 's2')                                               # ana ekran: yenen + su
    y = p.evaluate("document.querySelector('.card.meal, .meal').getBoundingClientRect().top + scrollY - 10")
    p.evaluate(f'scrollTo(0,{y})'); time.sleep(0.6)
    p.locator('.mini.cmp').first.tap(); time.sleep(1.2)
    p.locator('.sheet .frow', has_text='Poşe').first.tap(); time.sleep(1.2)
    kaydet(p, 's3')                                               # kiyasla
    p.locator('.sheet button', has_text='Bununla değiştir').first.tap(); time.sleep(3.5)
    p.evaluate(f'scrollTo(0,{y})'); time.sleep(0.6)
    kaydet(p, 's4')                                               # ogun: degistir / kaldir dugmeleri
    p.evaluate("""() => { const m = document.querySelector('.card.meal, .meal');
        const ad = [...m.querySelectorAll('*')].find(e => e.children.length === 0 && (e.textContent || '').trim() === 'Zeytin');
        let a = ad; while (a && a.querySelectorAll('.mini.del').length !== 1) a = a.parentElement;
        (a ? a.querySelector('.mini.del') : [...m.querySelectorAll('.mini.del')].pop()).click(); }"""); time.sleep(3.5)
    p.evaluate('scrollTo(0,0)'); time.sleep(0.5)
    p.locator('button.tool-btn', has_text='Ayarlar').tap(); time.sleep(1.0)
    p.locator('.sheet button', has_text='Loglar').first.tap(); time.sleep(1.4)
    kaydet(p, 's5')                                               # loglar
    p.locator('.geri-btn:visible').first.tap(); time.sleep(0.9)
    t = p.locator('.sheet button', has_text='Verileri taşı').first
    t.scroll_into_view_if_needed(); t.tap(); time.sleep(1.4)
    kaydet(p, 's6')                                               # verileri tasi
    kapat(p); kapat(p)
    p.evaluate('scrollTo(0,0)'); time.sleep(0.4)
    p.locator('button.hamile-btn').tap(); time.sleep(1.0)
    p.locator('.opt', has_text='2. trimester').first.tap(); time.sleep(0.8)
    kaydet(p, 's7')                                               # hamilelik onayi + trimester
    p.locator('button.btn:visible', has_text='Vazgeç').first.tap(); time.sleep(0.8)
    p.locator('button.tool-btn', has_text='Destek').tap(); time.sleep(1.2)
    kaydet(p, 's8')                                               # destek ol
    b.close()
