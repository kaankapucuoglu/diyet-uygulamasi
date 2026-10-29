"""diyet.maviplay.com yayın paketi: tanıtım sayfası kökte, uygulama /app/ altında.

Kullanım (depo kökünden):
    python kaynak/site_paketle.py <hedef_klasör>      -> klasörü doldurur
    python kaynak/site_paketle.py <hedef_klasör> --tar -> ayrıca <hedef_klasör>.tar.gz üretir (sunucuya gönderilecek)
Sunucuda: /var/www/maviplay/diyet  (Caddy: diyet.maviplay.com)
"""
import os, shutil, sys, tarfile

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
hedef = os.path.abspath(sys.argv[1])
shutil.rmtree(hedef, ignore_errors=True)
shutil.copytree(os.path.join(KOK, 'site'), hedef)
app = os.path.join(hedef, 'app')
os.makedirs(app)
for ad in ['index.html', 'sw.js', 'manifest.webmanifest']:
    shutil.copy2(os.path.join(KOK, ad), app)
shutil.copytree(os.path.join(KOK, 'icons'), os.path.join(app, 'icons'))
html = open(os.path.join(app, 'index.html'), encoding='utf-8').read()
assert '<script type="application/json" id="gomuluVeri">null</script>' in html, 'gömülü veri boş değil!'
if '--tar' in sys.argv:
    with tarfile.open(hedef + '.tar.gz', 'w:gz') as t:
        for kok, _, dosyalar in os.walk(hedef):
            for d in dosyalar:
                tam = os.path.join(kok, d)
                t.add(tam, arcname=os.path.relpath(tam, hedef).replace(os.sep, '/'))
    print('paket:', hedef + '.tar.gz', os.path.getsize(hedef + '.tar.gz'), 'bayt')
print('hazır:', hedef)
