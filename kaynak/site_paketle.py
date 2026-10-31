"""diyet.maviplay.com yayın paketi: tanıtım sayfası kökte, uygulama /app/ altında.

Kullanım (depo kökünden):
    python kaynak/site_paketle.py <hedef_klasör>      -> klasörü doldurur
    python kaynak/site_paketle.py <hedef_klasör> --tar -> ayrıca <hedef_klasör>.tar.gz üretir (sunucuya gönderilecek)
Sunucuda: /var/www/maviplay/diyet  (Caddy: diyet.maviplay.com; /hesap-sil → legal/hesap-sil.html)
Site kökünde yönlendirme taslakları: /gizlilik, /legal/*.html, /hesap-sil → /app/legal/*.html (uygulamayla gelen 5 dilli metinler)
"""
import json, os, re, shutil, sys, tarfile

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
hedef = os.path.abspath(sys.argv[1])
shutil.rmtree(hedef, ignore_errors=True)
shutil.copytree(os.path.join(KOK, 'site'), hedef)
app = os.path.join(hedef, 'app')
os.makedirs(app)
for ad in ['index.html', 'sw.js', 'manifest.webmanifest']:
    shutil.copy2(os.path.join(KOK, ad), app)
shutil.copytree(os.path.join(KOK, 'icons'), os.path.join(app, 'icons'))
shutil.copytree(os.path.join(KOK, 'legal'), os.path.join(app, 'legal'))   # hukuk sayfaları (5 dil) uygulamayla birlikte
html = open(os.path.join(app, 'index.html'), encoding='utf-8').read()
assert '<script type="application/json" id="gomuluVeri">null</script>' in html, 'gömülü veri boş değil!'
# Uygulama adı tek kaynaktan: site/index.html <html data-app-name="…"> → iki manifest'in name/short_name alanı
AD = re.search(r'data-app-name="([^"]+)"', open(os.path.join(hedef, 'index.html'), encoding='utf-8').read()).group(1)
for yol in (os.path.join(hedef, 'manifest.webmanifest'), os.path.join(app, 'manifest.webmanifest')):
    j = json.load(open(yol, encoding='utf-8'))
    j['name'] = j['short_name'] = AD
    with open(yol, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(j, f, ensure_ascii=False, indent=2); f.write('\n')
print('uygulama adı:', AD)
if '--tar' in sys.argv:
    with tarfile.open(hedef + '.tar.gz', 'w:gz') as t:
        for kok, _, dosyalar in os.walk(hedef):
            for d in dosyalar:
                tam = os.path.join(kok, d)
                t.add(tam, arcname=os.path.relpath(tam, hedef).replace(os.sep, '/'))
    print('paket:', hedef + '.tar.gz', os.path.getsize(hedef + '.tar.gz'), 'bayt')
print('hazır:', hedef)
