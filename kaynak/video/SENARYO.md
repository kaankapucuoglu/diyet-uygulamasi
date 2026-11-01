# Yeni kullanım videosu — senaryo (LifeRoutine, 01.11.2026)

Hedef dosya: `site/video/kullanim.mp4` + poster `site/video/kullanim.jpg` (tanıtım sayfası `/video/kullanim.mp4?v=3`; yeni kayıtta `?v=` artır).
Kopya: `maviplay-site/diyet/kullanim.mp4|jpg` (ana sayfa Uygulamalar kartı; build.py MV ile sürümler).
Biçim: 600×1298, 30 fps, H.264 yuv420p, sessiz, **en fazla 60 sn** (kayit.py başındaki ffmpeg komutu, crf 25). Kayıt: 390×844 @2x, Edge headless, `uzun.py` düzeni (üst bant açıklama + dokunuş halkası).

## Mevcut video ile fark
- Eski `uzun.py` 8. adımda **“Destek ol / IBAN”** gösteriyor → bu adım tamamen kalkar (uygulamada da yok).
- Eski video adı “Diyet Listesi” diyor; yeni kayıtta üst bant uygulama adını `S.app` sabitinden alsın (`p.evaluate('T("app")')`), sabit yazma.
- Yeni özellikler (regl, spor/takviye, antrenman kartı, hatırlatıcı, hesap/eşitleme, paylaşım, sıralama) hiç yok → aşağıdaki akış.

## Hazırlık (tohum.py yenilenecek)
Profil: Ayşe, kadın, 32, 166 cm, 72 kg → hedef 64, haftada 3–4 gün karma antrenman, takviye: whey + kreatin, alerji: fındık (alerjen süzgeci görünsün), hamile değil.
Ek tohum: bir önceki regl kaydı 26 gün önce başlamış, 5 gün sürmüş (böylece “Regl yaklaşıyor” çipi çıkar); hatırlatıcı açık; hesap açılmamış (akışta açılacak — test sunucusu ya da canlı `review_lf` benzeri geçici hesap; kayıt sonrası sil).

## Akış (≈58 sn; süreler yaklaşık)
| # | Üst bant metni | Ekran / eylem | sn |
|---|---|---|---|
| 0 | `{app} · kısa kullanım turu` | Ana sayfa; günün planı, antrenman çipi görünür | 2 |
| 1 | Su içtikçe “Su içtim”e dokun | 2× `button.btn.solid` “Su içtim” | 2 |
| 2 | Yediğin öğünü “Yedim” ile işaretle | ilk `.eat-btn` | 2 |
| 3 | ⇄ Kıyasla: iki yemeği karşılaştır, beğendiysen değiştir | `.mini.cmp` → benzer yemek → “Bununla değiştir” | 5 |
| 4 | 78 alerjen süzgeci: fındıklı yemek hiç önerilmez | Yemek ara/ekle kutusunda “fındık” yaz → sonuçta süzgeç uyarısı | 4 |
| 5 | Antrenman kartı: antrenman ve dinlenme günü ayrı | Kaydır → antrenman kartı; takviye (whey) ara öğünde | 5 |
| 6 | Regl takibi: “Regl başladı” → tahmin ve döneme özel öneri | `Regl başladı` düğmesi → bant/ipucu + su hedefi +500 ml | 6 |
| 7 | Öğün hatırlatıcı: saatinde bildirim | Ayarlar › Bildirimler açık; örnek bildirim metni (`notHint`) | 4 |
| 8 | Hesap isteğe bağlı: kullanıcı adı + şifre, cihazlar arasında eşitle | Ayarlar › Hesap → Kaydol → onay ekranı (rıza kutuları) → “eşitlendi” rozeti | 9 |
| 9 | Programı paylaş: bağlantı, WhatsApp ya da kullanıcı adıyla | Program hazırla → Paylaş sayfası: üç seçenek görünür | 6 |
| 10 | Sıralama (isteğe bağlı): yalnız kullanıcı adı ve seri gün | Sıralama ekranı (`lbT`), “Sıralamaya katıl” | 4 |
| 11 | Hamileyim: trimesteri seç, menü yeniden hazırlanır | `button.hamile-btn` → 2. trimester → Evet | 5 |
| 12 | `diyet.maviplay.com · ücretsiz, reklamsız, hesap gerekmez` | Ana sayfa | 3 |

Kısa sürüm gerekirse (≤40 sn): 0, 1–3, 5, 6, 8, 9, 12.

## Ekran görüntüleri (ekranlar.py yenilenecek → site/img/app-*.png, 780×1688 PNG)
| Dosya | Ekran |
|---|---|
| app-ana.png | Günün planı: öğünler, su, regl/antrenman çipleri (adım 0/5 sonrası) |
| app-kurulum.png | Sihirbaz: “Düzenli spor yapıyor musun?” + takviye seçimi |
| app-regl.png | Regl takibi ekranı (`reglT`): kayıtlar + sonraki tahmin |
| app-hesap.png | Ayarlar › Hesap: giriş yapılmış, eşitleme durumu |
| app-paylas.png | Program paylaşımı: bağlantı / WhatsApp / kullanıcı adı |
| app-kiyas.png | Kıyaslama penceresi |
| app-web.png | Masaüstü web sürümü, 1440×900 (günün planı) |
| og.png | 1200×630 sosyal paylaşım görseli (uygulama adı sabitten) |
| video/kullanim.jpg | Yeni videonun ilk karesi, 600×1298 |
Eski `tel-*.png` ve `pc.png` dosyaları eski arayüzü (Diyet Listesi, Destek ol) gösteriyor; yeniler üretilince silinebilir.

## Notlar
- Seçiciler eski betiklerden (`uzun.py`, `ekranlar.py`): `.eat-btn`, `.mini.cmp`, `.sheet .frow`, `button.tool-btn`, `button.hamile-btn`, `.geri-btn`, `.icon-btn ✕`. Regl/hesap/paylaşım/sıralama seçicileri kayıt öncesi `tohum.py` çıktısından (düğme listesi) doğrulanacak.
- Hesap adımı canlı sunucuya yazıyor: kayıt bitince hesabı uygulamadan sil (Ayarlar › Hesap › Hesabı sil) ya da yerel `python server/server.py 8097 --static .` ile kaydet.
- Bildirim izni headless'ta istenemez; adım 7'de yalnız ayar anahtarı ve örnek metin gösterilir.
