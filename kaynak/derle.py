"""Kaynak parçaları birleştirip yayınlanan index.html'i üretir.

Kullanım (depo kökünden):
    python kaynak/derle.py           -> index.html'i yeniden üretir
    python kaynak/derle.py --yayin   -> ayrıca sw.js önbellek sürümünü bir artırır
                                        (telefonlardaki kayıtlı kopyanın güncellenmesi için yayından önce şart)
"""
import os, re, sys

KAYNAK = os.path.dirname(os.path.abspath(__file__))
KOK = os.path.dirname(KAYNAK)
PARCALAR = ['p1.html', 'p2.js', 'p3.js', 'p3b.js', 'p3c.js', 'p3d.js', 'p3e.js', 'p4c.js', 'p4d.js', 'p4e.js', 'p4f.js', 'p4g.js', 'p4h.js', 'p4.js', 'p4b.js', 'p5.js', 'p6.js', 'p7.js', 'p7b.js', 'p8.js', 'p9a.js', 'p9b.js', 'p9c.js']
KAPANIS = '</script>\n</body>\n</html>\n'   # p8.js belgeyi kapatır; sonrasındaki parçalar (p9a, p9b: hesap/eşitleme; p9c: reklam/satın alma) kapanışın önüne alınır

html = ''.join(open(os.path.join(KAYNAK, p), encoding='utf-8').read() for p in PARCALAR)
if KAPANIS in html and not html.endswith(KAPANIS):
    html = html.replace(KAPANIS, '', 1).rstrip('\n') + '\n' + KAPANIS
# Yayınlanan dosyada kişisel veri olmamalı
assert '<script type="application/json" id="gomuluVeri">null</script>' in html, 'gömülü veri boş değil!'
with open(os.path.join(KOK, 'index.html'), 'w', encoding='utf-8', newline='\n') as f:
    f.write(html)
print('index.html yazildi (%d bayt)' % len(html.encode('utf-8')))

if '--yayin' in sys.argv:
    yol = os.path.join(KOK, 'sw.js')
    sw = open(yol, encoding='utf-8').read()
    m = re.search(r"const SURUM = 'diyet-v(\d+)';", sw)
    yeni = int(m.group(1)) + 1
    sw = sw.replace(m.group(0), "const SURUM = 'diyet-v%d';" % yeni)
    with open(yol, 'w', encoding='utf-8', newline='\n') as f:
        f.write(sw)
    print('sw.js surumu -> diyet-v%d' % yeni)
