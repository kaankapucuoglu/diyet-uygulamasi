"""Kaynak parçaları birleştirip yayınlanan index.html'i üretir.

Kullanım (depo kökünden):
    python kaynak/derle.py           -> index.html'i yeniden üretir
    python kaynak/derle.py --yayin   -> ayrıca sw.js önbellek sürümünü bir artırır
                                        (telefonlardaki kayıtlı kopyanın güncellenmesi için yayından önce şart)
"""
import os, re, sys

KAYNAK = os.path.dirname(os.path.abspath(__file__))
KOK = os.path.dirname(KAYNAK)
PARCALAR = ['p1.html', 'p2.js', 'p3.js', 'p3b.js', 'p3c.js', 'p4c.js', 'p4.js', 'p4b.js', 'p5.js', 'p6.js', 'p7.js', 'p7b.js', 'p8.js']

html = ''.join(open(os.path.join(KAYNAK, p), encoding='utf-8').read() for p in PARCALAR)
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
