# Kullanim videosu 1/2: ornek profil (Ayse, kilo vermek) kurup durum.json'a yazar; ana ekrandaki dugmeleri listeler.
# Calistir: kaynak/video klasorunde  python tohum.py   (sonra python kayit.py)
import json, sys, time
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding='utf-8')
APP = 'https://diyet.maviplay.com/app/'
TOHUM = """D.ayar.turGoruldu=true;
W={...kopya(D.profil),dil:'tr',ad:'Ayşe',cins:'k',hamile:false,yas:32,boy:166,kilo:72,hedef:'ver',hedefKilo:64,hiz:0.5,aktivite:2,odaklar:[],haric:[],alerjiler:[],alerjiVar:'yok',alerjiAra:'',saatler:{kahvalti:'08:00',ogle:'12:30',aksam:'19:00'}};wBitir();
D.ayar.turGoruldu=true;kaydet();"""
with sync_playwright() as pw:
    b = pw.chromium.launch(channel='msedge', headless=True)
    c = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True, locale='tr-TR')
    p = c.new_page()
    p.goto(APP, wait_until='networkidle'); time.sleep(2)
    p.evaluate(TOHUM); time.sleep(2)
    c.storage_state(path='durum.json')
    p.reload(wait_until='networkidle'); time.sleep(3)
    p.screenshot(path='k_ana.png')
    el = p.evaluate('''() => [...document.querySelectorAll('button,[role=button],.chip,[onclick],[data-a],[data-act]')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; })
      .map(e => [e.tagName, (e.className || '').toString().slice(0, 40), (e.innerText || e.getAttribute('aria-label') || e.title || '').trim().replace(/\\n/g, ' ').slice(0, 30),
                 e.getAttribute('data-a') || e.getAttribute('data-act') || (e.getAttribute('onclick') || '').slice(0, 40), Math.round(e.getBoundingClientRect().x), Math.round(e.getBoundingClientRect().y + scrollY)])''')
    for x in el: print(x)
    print('yukseklik', p.evaluate('document.documentElement.scrollHeight'))
    p.screenshot(path='k_ana_tam.png', full_page=True)
    b.close()
