# assets/ — uygulama simgeleri ve açılış görseli (YER TUTUCU: PNG dosyaları henüz YOK)

Kaynak çizim: `kaynak/ikon/ikon.html` (SVG: zümrüt gradyan zemin `#34e3a0 → #0fa06c → #065c45`, sarı-turuncu kalori halkası,
beyaz kase + yaprak/domates/avokado/portakal). Aşağıdaki dosyaların hepsi bu SVG'den üretilir. `app.json` bu adları bekler;
dosyalar eksikse `npx expo prebuild` hata verir (`.dev/build1.sh` başlamadan önce varlıklarını denetler).

| Dosya | Boyut | Not |
|---|---|---|
| `icon.png` | 1024×1024 | iOS + genel simge. **Köşe yuvarlatma YOK, saydamlık YOK** (Apple reddeder) → `ikon.html`'deki `mask` türü (tam kare zemin, içerik %80). |
| `android-icon-foreground.png` | 1024×1024 | Adaptive icon **ön** katman: **saydam** zemin, yalnız içerik (halka + kase). İçerik ortadaki ~%66'lık daireye sığsın (kenarlar maskeyle kesilir). |
| `android-icon-background.png` | 1024×1024 | Adaptive icon **arka** katman: yalnız zümrüt gradyan + ışık (içerik yok). `app.json` yedek rengi `#0fa06c`. |
| `splash-icon.png` | 1024×1024 | Açılış görseli: **saydam** zeminde halka + kase. Plugin `imageWidth: 200` ile ortalar, zemin `#f3f6fb` (açık). |
| `splash-icon-android.png` | 1024×1024 | Android 12+ açılış simgesi (`imageWidth: 288`). Sliplines'ta `splash-icon.png` ile birebir aynı dosya; içerik dairenin içinde kalacak kadar pay bırak. |
| `notification-icon.png` | 96×96 | Android bildirim küçük simgesi: **yalnız beyaz siluet + saydam zemin** (renk `app.json` `expo-notifications.color` `#16a36b`). Renkli olursa sistem beyaz kare gösterir. Siluet: kase + halka dış çizgisi. |

Üretim ipucu: `ikon.html` içindeki `svg(tur)` ile `mask` (icon, background için `ICERIK`'i kaldır) ve `ICERIK` tek başına (foreground, splash)
→ `<canvas>` → PNG. Bildirim simgesi için `ICERIK`'i tek renk beyaz (`fill="#fff"`, dolgular kaldırılıp yalnız biçimler) olarak çiz.
