# LifeRoutine (com.maviplay.liferoutine) — Mağaza beyanları ve uyum notları

Sürüm 2026-11-02 · Geliştirici: maviplay (maviplay.com) · destek@maviplay.com
Hukuk metinleri: `legal/gizlilik.html`, `legal/aydinlatma.html`, `legal/acik-riza.html` (artık "açık rıza gerekmez" bilgi sayfası), `legal/kosullar.html`, `legal/hesap-sil.html` ("verilerinizi silme" bilgi sayfası) — 5 dil, `#tr|en|ru|de|ar`.
Play veri güvenliği CSV'si: `veri_csv.py` → `play_icerik/liferoutine_veri_doldurulmus.csv` (oturum scratchpad'i).

> **Veri modeli (kullanıcı kararı, 01.11.2026):** "Kullanıcı verileriyle işimiz olmasın." Hesap, sunucu, eşitleme, sıralama, gelen kutusu ve "kullanıcı adına gönder" kaldırıldı; sunucudaki hesap veritabanı 1 Kasım 2026'da silindi. Uygulamaya girilen her şey yalnız kullanıcının cihazında kalır.

## 0. Beyanların dayandığı varsayımlar

| Konu | Durum |
|---|---|
| Hesap / sunucu | **Yok.** Kayıt, giriş, eşitleme, sıralama, gelen kutusu, uygulama içi gönderim kaldırıldı. Eski hesaplar ve sunucu verileri 1 Kasım 2026'da silindi. |
| Kullanıcı verisi | Profil, sağlık bilgileri (boy, kilo, hamilelik, regl, alerjiler, kan şekeri/tansiyon odakları), öğün/su kayıtları, "Program hazırla"da başkası için girilenler (ad, iletişim, kontrol tarihi, yaş/boy/kilo/alerji, notlar) ve kayıtlı programlar **yalnız cihazda** (web: localStorage + IndexedDB; uygulama: uygulama içi depolama). maviplay'e gönderilmez. |
| Bağlantıyla paylaşım | Program `#p=`, yediklerini paylaş `#y=`, verileri taşı `#t=`. Veri URL'nin `#` sonrasında (fragment) taşınır; tarayıcı bu kısmı sunucuya göndermez. Kullanıcının başlattığı aktarım; alıcı ve mesajlaşma uygulaması içeriği görebilir. |
| Yedek | "Yedeği indir" (JSON), "Yedeği yükle" (JSON), "Verilerimle birlikte HTML indir" — yalnız cihaza. |
| Web | `diyet.maviplay.com/app` statik dosya, Hetzner Online GmbH (Almanya), HTTPS. **Erişim kaydı kapalı**; IP yalnız bağlantı sırasında teknik olarak işlenir. Reklam, çerez, analitik yok. Hizmet çalışanı önbelleğinde yalnız uygulama dosyaları. |
| Reklam | Yalnız Android/iOS: Google AdMob geçiş reklamı (ödüllü yok). AB/UK/CH'de UMP onay formu; formun gösterilmediği ülkelerde (Türkiye dâhil) yalnız kişiselleştirilmemiş reklam. iOS'ta ATT istenmez, IDFA alınmaz. Reklamsız sürümde SDK başlatılmaz. Sağlık verisi reklam isteğine eklenmez, AdMob'a gitmez. |
| Satın alma | Tek IAP `com.maviplay.liferoutine.noads` (tüketilmeyen, tek seferlik). Cihazda yalnız "reklamsız" bayrağı + mağaza işlem no. Ödeme bilgisi Play/App Store'da kalır. |
| Bildirimler | Yerel: öğün hatırlatıcısı + 4,5 saat kayıt yoksa su/ara öğün hatırlatması. Android kilit ekranında içerik gizli. Push sunucusu yok. |
| Destek | destek@maviplay.com → Cloudflare e-posta yönlendirmesi → Gmail. Adres ve mesaj yalnız yanıt için; en çok 12 ay. |
| 3. taraf SDK | Yalnız Google Mobile Ads (AdMob + UMP). HealthKit ve Health Connect **yok**. |
| Yaş | Hesap ve yaş beyanı yok. Metinlerde: çocuklara yönelik değil; 18 yaş altı yalnız veli ve sağlık uzmanı gözetiminde. |
| Veri sorumlusu adı | Metinlerde kişi adı yok: "maviplay (maviplay.com) — destek@maviplay.com" (kullanıcı isteği). |

---

## 1. Apple — App Privacy ("nutrition label")

**Kural (Apple tanımı):** "Collect" = veriyi cihaz dışına aktarıp gerçek zamanlı isteği karşılamak için gerekenden uzun süre erişilebilir tutmak. Yalnız cihazda işlenen veri **toplanmış sayılmaz**. Uygulamaya eklenen üçüncü taraf SDK'nın topladığı veri ise beyan edilir. Bu yüzden sağlık verisi "toplanmaz"; beyan edilecekler yalnız AdMob SDK'sından gelenler ve satın alma.

| Apple veri türü | Toplanıyor? | Kullanıcıyla bağlantılı? | Takip? | Amaç | Not |
|---|---|---|---|---|---|
| Identifiers → **Device ID** | Evet (AdMob SDK) | Hayır | Hayır | Third-Party Advertising, Analytics | Uygulamaya/geliştiriciye özgü kimlik (IDFV vb.). IDFA alınmaz (ATT yok). |
| Usage Data → **Product Interaction** | Evet (AdMob SDK) | Hayır | Hayır | Third-Party Advertising, Analytics | Uygulama açılışı, dokunma, video görüntüleme. |
| Usage Data → **Advertising Data** | Evet (AdMob SDK) | Hayır | Hayır | Third-Party Advertising, Analytics | Görülen reklamlar. |
| Diagnostics → **Crash Data**, **Performance Data** | Evet (AdMob SDK) | Hayır | Hayır | Third-Party Advertising, Analytics | AdMob iOS belgesi: kilitlenme kaydı (kullanıcıyla ilişkisiz), açılış süresi/takılma/enerji. Kendi çökme SDK'mız yok. |
| Location → **Coarse Location** | Evet (AdMob SDK, IP'den) | Hayır | Hayır | Third-Party Advertising, Analytics | AdMob belgesi: IP adresi genel konumu tahmin için kullanılabilir. |
| Purchases → **Purchase History** | Evet (temkinli beyan) | Hayır | Hayır | App Functionality | "Reklamları kaldır" (StoreKit). İşlem no yalnız cihazda; Apple tanımıyla "toplanmaz" da savunulabilir, temkinli seçim beyan etmek. |
| Health & Fitness (Health, Fitness), **Sensitive Info** (hamilelik), Contact Info (Name, Email, Phone), Identifiers → User ID, User Content, Other Usage Data, Browsing/Search History, Contacts, Photos, Audio, Financial Info | **Hayır** | – | – | – | Cihazda kalır, geliştiriciye iletilmez. Destek e-postası uygulama dışında (mailto) → beyan gerekmez. |

- **Tracking:** "No, we do not track" — ATT istenmiyor, IDFA alınmıyor; `NSUserTrackingUsageDescription` Info.plist'te **olmamalı**. Satırları Xcode "Privacy Report" (GoogleMobileAds `PrivacyInfo.xcprivacy`) ile karşılaştır; SDK sürümü değişirse güncelle.
- **Privacy Policy URL:** `https://diyet.maviplay.com/app/legal/gizlilik.html` · **Privacy Choices URL (isteğe bağlı):** `https://diyet.maviplay.com/hesap-sil`.

## 2. Apple — App Review Guidelines eşlemesi

| Kural | Durum / yapılacak |
|---|---|
| **1.4.1 Medical** | Tanı/tedavi yok, sensörle ölçüm iddiası yok. Formüller (Mifflin-St Jeor) koşullarda yazılı; "doktora danış" uyarıları uygulamada ve koşullarda. Tıbbi cihaz değildir. |
| **2.1 App Completeness / demo hesap** | Giriş **yok** → demo hesap gerekmez. Review notu: "No account or login; all data stays on the device; no backend. Ads: AdMob interstitial; one-time IAP removes ads." |
| **4.8 Login Services** | Giriş yok → tetiklenmez. |
| **5.1.1 (i) Privacy policy** | App Store Connect alanında + uygulama içinde (Ayarlar → Belgeler). |
| **5.1.1 (ii) Permission** | Sağlık verisi toplanmadığı için toplama rızası gerekmez. AB/UK/CH'de reklam için UMP onay formu. |
| **5.1.1 (iii) Data minimization** | Geliştiriciye veri gelmiyor. |
| **5.1.1 (v) Account deletion** | Hesap yok → uygulama içi hesap silme şartı uygulanmaz. |
| **5.1.1 (ix) Highly regulated fields** | Sağlık verisi geliştiriciye iletilmediği için risk azaldı; diyet/yaşam tarzı uygulaması sağlık hizmeti sunmuyor. |
| **5.1.2 Data use and sharing** | Kişisel veri paylaşımı yok; AdMob SDK cihaz verisini doğrudan Google'a iletir (sağlık verisi değil). |
| **5.1.3 Health** | HealthKit/Clinical Records yok. Sağlık verisi reklam/pazarlama için kullanılmaz; geliştirici iCloud/CloudKit'e yazmaz (cihaz yedeği kullanıcının ayarı). Review notuna "no iCloud/CloudKit usage" yaz. |
| **5.1.4 Kids** | Çocuk kategorisi değil; meta verilerde "çocuk/kids" ifadesi kullanma. |
| **3.1.1 / 3.1.2 IAP** | "Reklamları kaldır" tüketilmeyen ürün ✔; "Satın alımları geri yükle" düğmesi ✔. |
| **3.1.1 / 3.2.2 (iv) Bağış** | Uygulama içi IBAN bağış ekranı (`p7b.js destekAc`) → ret riski; mağaza derlemelerinde kapat. |
| **Export compliance** | Yalnız HTTPS → `ITSAppUsesNonExemptEncryption = NO`. |
| **Kategori** | Birincil: Health & Fitness · İkincil: Food & Drink. |

## 3. Apple — Yaş derecelendirme

| Soru | Cevap | Etki |
|---|---|---|
| Health or Wellness Topics | **Evet** | 9+ |
| Medical or Treatment Information | **Infrequent** (kan şekeri/tansiyon odaklı beslenme, hamilelik uyarıları) | 13+ |
| User-Generated Content | **Hayır** (uygulama içi kullanıcılar arası alan yok; bağlantılar dış uygulamalarla gönderilir) — gri alan, review notunda açıkla | – |
| Messaging and Chat / Social Media | Hayır | – |
| Advertising | **Evet** (AdMob geçiş reklamı) | – |
| Unrestricted Web Access, Contests, Gambling, Violence, Sexual, Profanity, Alcohol-tobacco-drugs | Hayır | – |

Sonuç: hesaplanan 13+. 16+ politikası ve hesap beyanı kalktı; diyet içeriği ve "18 yaş altı gözetim" uyarısı nedeniyle **16+'ya yükseltmek önerilir** (Play hedef kitlesiyle tutarlı; zorunlu değil).

---

## 4. Google Play

### 4.1 Data safety formu

Genel: Veri topluyor/paylaşıyor mu? **Evet** — yalnız AdMob SDK'sı (Google'a paylaşılır) ve satın alma. Aktarımda şifreli mi? **Evet** (TLS). Hesap oluşturma: **Hayır** (`PSL_ACM_NONE`) → hesap silme URL'si gerekmez. Kullanıcı silme talep edebilir mi? **Hayır** (`DATA_DELETION_NO`): maviplay'de silinecek kullanıcı verisi yok; AdMob verisini Google tutar, reklam kimliği Android ayarlarından sıfırlanır/silinir. Bağımsız güvenlik incelemesi: Hayır.

| Google veri türü | Toplanıyor | Paylaşılıyor | Zorunlu / İsteğe bağlı | Amaç | Not |
|---|---|---|---|---|---|
| Device or other IDs | Evet (AdMob: reklam kimliği, app set ID) | **Evet (Google)** | Zorunlu | Advertising, Analytics, Fraud prevention | Android 13+: `com.google.android.gms.permission.AD_ID` → Play Console "Advertising ID" beyanı: Evet. |
| Location → **Approximate location** | Evet (AdMob, IP'den) | **Evet (Google)** | Zorunlu | Advertising, Analytics, Fraud prevention | |
| App activity → **App interactions** | Evet (AdMob: açılış, dokunma, video görüntüleme) | **Evet (Google)** | Zorunlu | Advertising, Analytics, Fraud prevention | |
| App info and performance → **Diagnostics** | Evet (AdMob: açılış süresi, takılma, enerji) | **Evet (Google)** | Zorunlu | Advertising, Analytics, Fraud prevention | AdMob Android beyanında crash logs yok → **Crash logs: Hayır**. |
| Financial info → **Purchase history** | Evet (temkinli beyan) | Hayır | İsteğe bağlı | App functionality | "Reklamları kaldır" Play faturalandırması; cihazda yalnız bayrak + işlem no. |
| Personal info (Name, Email, User IDs…), Health and fitness, Messages, Photos/Videos, Files, Calendar, Contacts, App activity → User-generated content | **Hayır** | – | – | – | Cihazda kalan veri "toplama" sayılmaz; bağlantı paylaşımı kullanıcının başlattığı aktarımdır ve fragment sunucuya gitmez. |

- Kaynak: Google Mobile Ads SDK Play veri beyanı (IP adresi, kullanıcı etkileşimleri, teşhis bilgisi, cihaz/hesap kimlikleri; amaç reklam, analiz, sahtecilik önleme; TLS).
- **App access:** "Tüm işlevler özel erişim gerekmeden kullanılabilir" seç; `play_metin.json` içindeki test hesabı alanları artık kullanılmamalı (giriş yok).

### 4.2 Health apps declaration (Play Console → App content)

- Sağlık özelliği: **Evet** → Health and fitness → **"Nutrition and Weight Management"**; regl takibi varsa ek olarak **"Period Tracking"**.
- Medical kategorisi, Medical Device Apps, Health research: **Hayır**. Health Connect kullanılmıyor; manifest'te `android.permission.health.*` olmasın.
- Mağaza açıklamasında zorunlu cümle: *"LifeRoutine tıbbi cihaz değildir; herhangi bir hastalığı teşhis etmez, tedavi etmez, iyileştirmez veya önlemez. Tıbbi tavsiye, tanı veya tedavi için bir sağlık profesyoneline danışın."* ✔ (`play_metin.json` TR/EN).

### 4.3 User Data politikası

- Sağlık verisi cihazdan çıkmadığı için "belirgin açıklama ve rıza" (prominent disclosure) şartı sağlık verisi için **tetiklenmez**; eski hesap onay ekranı kaldırılmalı/yeni modele göre sadeleştirilmeli.
- Gizlilik politikası: herkese açık, PDF değil, uygulama içinde bağlantılı ✔. Politikada geliştirici "maviplay" olarak yazılı; **Play Console geliştirici adıyla aynı olmalı** — farklıysa birini eşitle.

### 4.4 Hedef kitle ve içerik / IARC

- **Target audience:** 16–17 ve 18+ (13 altı seçilmez → Families politikası devreye girmez).
- **IARC:** Kullanıcı etkileşimi **Hayır** (uygulama içi kullanıcılar arası iletişim/paylaşım alanı yok). Dijital satın alma **Evet**. Reklam **Evet**. Konum paylaşımı Hayır. Beklenen: PEGI 3 / ESRB Everyone / USK 0.
- Hesap silme web adresi gerekmez; `https://diyet.maviplay.com/hesap-sil` "Verilerinizi silme" bilgi sayfası olarak kalır.

### 4.5 Ödeme/bağış notu

Play'de uygulama içi dijital içerik için Play faturalandırması zorunlu; IBAN bağış ekranı Play dışı ödeme çağrısı sayılabilir → mağaza derlemelerinde kapat, web'de kalabilir.

---

## 5. Yayın öncesi teknik kontrol listesi (metinlerle tutarlılık)

1. Uygulamada sunucuya veri gönderen kod kalmasın (hesap modülü `p9a.js`, `/register`, `/sync`, `/stats`, `/leaderboard`, gelen kutusu, paylaşım API'si). Ağ sekmesinde yalnız statik dosyalar ve (mobilde) AdMob trafiği görünmeli.
2. Web sunucusunda (Caddy) erişim kaydı kapalı; hata kayıtlarına IP yazılmıyor. Hizmet çalışanı önbelleğinde yalnız uygulama dosyaları.
3. Sunucudaki eski hesap veritabanının **yedek/snapshot kopyaları** da silindi mi (politika "tamamen silindi" diyor).
4. **Ayarlar › Sıfırla** profil dâhil tüm verileri silebiliyor mu (politika ve "Verileri silme" sayfası bunu söylüyor).
5. Eski onay ekranı (`p3e.js`, sağlık verisi açık rızası, 16 yaş beyanı) kaldırıldı/sadeleşti; uygulama içi "Belgeler" bağlantıları: gizlilik, aydınlatma, açık rıza hakkında, koşullar, verileri silme.
6. Bildirim kanalı: Android kilit ekranı görünürlüğü PRIVATE/SECRET.
7. AdMob: reklam isteğine anahtar kelime/içerik URL'si eklenmez; onay formu yoksa `npa=1`; UMP AB/UK/CH; ATT yok; reklamsızda `MobileAds.initialize` çağrılmaz; `tagForChildDirectedTreatment`/`underAge` false; hassas reklam kategorileri engelli; `app-ads.txt` maviplay.com kökünde.
8. IAP: Android'de satın alma 3 gün içinde onaylanmalı (`iap:ack` teslimden sonra); iOS'ta "Satın alımları geri yükle".
9. Mağaza derlemelerinde IBAN bağış ekranı kapalı.
10. Ekran görüntüleri: `site/img/app-hesap.png` (hesap/eşitleme/sıralama ekranı) tanıtım sayfasından çıkarıldı; `site/img/app-paylas.png` hâlâ "Uygulama içinde gönder" düğmesini gösteriyor → yeni arayüzle yeniden çek. Mağaza ekran görüntülerinde hesap/sıralama/gelen kutusu olmasın.
11. Mağaza metinlerinde (5 dil) "tıbbi cihaz değildir" + "sağlık profesyoneline danışın" cümlesi.

---

## 6. Avukat kontrolü önerilen noktalar

1. **KVKK md. 9 (7499 s.K. sonrası):** Sürekli sağlık verisi aktarımı kalktı. Kalan yurt dışı akışlar: destek e-postaları (Cloudflare/Gmail, ABD) ve AdMob verileri (Google, cihazdan doğrudan). Metinler bu akışları açıklıyor ama md. 9 dayanağı (standart sözleşme + bildirim ya da arızi istisna) belirtmiyor — teyit edilsin.
2. **Reklam kimliği / Türkiye:** Kişiselleştirilmemiş reklam için meşru menfaat (md. 5/2-f) dayanağı ve Kurul'un çerez/benzeri teknolojiler rehberi açısından rıza gerekip gerekmediği değerlendirilsin.
3. **VERBİS:** Özel nitelikli veri artık işlenmiyor → çalışan/ciro eşikleri altında VERBİS muafiyeti mümkün; teyit.
4. **GDPR md. 27 AB temsilcisi:** İşleme arızi ve özel nitelikli veri yok → md. 27(2)(a) muafiyeti büyük olasılıkla uygulanır; teyit.
5. **Veri sorumlusu kimliği:** Metinlerde kişi adı yerine "maviplay" yazıyor (kullanıcı kararı). KVKK md. 10 veri sorumlusunun kimliğini ister; marka adının yeterliliği, mağaza geliştirici adıyla tutarlılık ve AB'de DSA "trader" bilgileri değerlendirilsin.
6. **"Program hazırla":** Kullanıcının (diyetisyen/doktor) veri sorumlusu sıfatı ve bilgilendirme/açık rıza yükümlülüğü koşullar md. 6'da yazılı; mesleki kullanım için yeterliliği teyit edilsin.
7. **Koşullar md. 11 yetki/hukuk ve sorumluluk sınırı:** AB tüketicileri (Rome I/Brüksel I-bis) ve Alman AGB denetimi açısından kontrol.
8. **Gönüllü bağış (IBAN):** Vergi niteliği ve mağaza kurallarıyla çatışma.

---

## 7. Kaynaklar (erişim: 2026-11-01)

**Google Mobile Ads SDK veri beyanları**
- Android — Play veri güvenliği beyanı: https://developers.google.com/admob/android/privacy/play-data-disclosure
- iOS — App Store veri beyanı: https://developers.google.com/admob/ios/privacy/data-disclosure

**Apple**
- App Store Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- App privacy details on the App Store ("collect" tanımı, üçüncü taraf SDK verisi, tracking): https://developer.apple.com/app-store/app-privacy-details/
- Age ratings values and definitions: https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions/
- Minimum Terms of Developer's EULA (koşullar md. 12): https://www.apple.com/legal/internet-services/itunes/appstore/dev/minterms/

**Google Play**
- User Data policy: https://support.google.com/googleplay/android-developer/answer/10144311
- Data safety form — data types and purposes: https://support.google.com/googleplay/android-developer/answer/10787469
- Account deletion requirements: https://support.google.com/googleplay/android-developer/answer/13327111
- Health Content and Services policy: https://support.google.com/googleplay/android-developer/answer/16555673
- Health apps declaration: https://support.google.com/googleplay/android-developer/answer/14738291

**Mevzuat**
- 6698 sayılı KVKK: https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6698&MevzuatTur=1&MevzuatTertip=5
- KVKK Kurulu — Standart Sözleşmeler duyurusu: https://www.kvkk.gov.tr/Icerik/7938/Standart-Sozlesmeler-ve-Baglayici-Sirket-Kurallarina-Iliskin-Dokumanlar-Hakkinda-Kamuoyu-Duyurusu
- GDPR: https://eur-lex.europa.eu/eli/reg/2016/679/oj
