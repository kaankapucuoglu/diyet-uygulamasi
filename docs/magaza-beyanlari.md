# LifeFit (com.maviplay.lifefit) — Mağaza beyanları ve uyum notları

Sürüm 2026-11-01 · Geliştirici: Maviplay / Kaan Kapucuoğlu · destek@maviplay.com
Hukuk metinleri: `legal/gizlilik.html`, `legal/aydinlatma.html`, `legal/acik-riza.html`, `legal/kosullar.html`, `legal/hesap-sil.html` (5 dil, `#tr|en|ru|de|ar`). Uygulama içi onay ekranı: `kaynak/p3e.js`.

## 0. Beyanların dayandığı varsayımlar (kodla doğrulandı)

| Konu | Durum |
|---|---|
| Hesapsız kullanım | Tüm veri cihazda (localStorage + IndexedDB). Sunucuya giden tek şey: paylaşım bağlantısı açma ve sıralama görüntüleme istekleri (IP geçici). |
| Hesaplı kullanım | Kullanıcı adı + şifre; tüm `D` nesnesi (profil, öğün/su, tartı/ölçü, plan) Almanya'daki sunucuya (Hetzner) yazılır. |
| Sağlık verisi | Yaş, cinsiyet, boy, kilo, hedef, aktivite, sağlık odakları (kan şekeri/tansiyon/kolesterol), alerjiler, hariç besinler, **hamilelik**, regl takibi, spor/takviye, öğün/su, tartı/ölçü, plan. |
| Takip / reklam / analitik / 3. taraf SDK | Yok. HealthKit ve Health Connect **kullanılmıyor**. |
| Bildirimler | Öğün hatırlatıcıları yerel; push sunucusu yok. |
| Ücret | Ücretsiz; IAP yok. Uygulama içinde **gönüllü IBAN bağış ekranı** var (`p7b.js destekAc`) — mağaza riski, bkz. §5. |
| Yaş | 16+ (hesap açarken beyan). |
| Kodda henüz olmayanlar | Hesap modülü (`p9a.js`), regl takibi, vücut ölçüleri, yerel bildirimler, spor/takviye profil alanı — docs/API.md'de planlı; hukuk metinleri bunları kapsıyor. Yayından önce özellik listesiyle metinleri eşleştir. |

---

## 1. Apple — App Privacy ("nutrition label")

**Temel kural (Apple tanımı):** "Collect" = veriyi cihaz dışına aktarıp isteği karşılamak için gerekenden uzun süre okunabilir tutmak. Hesap isteğe bağlı olsa da hesaplı kullanıcıların sağlık verisi sunucuda saklanıyor → **"Data Not Collected" seçilemez.** Apple, isteğe bağlı/opt-in toplanan veriyi de beyan ettirir ("optional disclosure" muafiyeti yalnız seyrek, ana işlev dışı, her seferinde kullanıcının elle gönderdiği veriler için; sürekli eşitleme buna girmez). Hesapsızda toplanmadığı bilgisi **Privacy Policy** ve **Privacy Choices URL** ile verilir; App Review notlarına da yazılır.

| Apple veri türü | Toplanıyor? | Kullanıcıyla bağlantılı (Linked)? | Takip (Tracking)? | Amaç | Not |
|---|---|---|---|---|---|
| Health & Fitness → **Health** | Evet | Evet | Hayır | App Functionality | Boy/kilo/hedef, odaklar, alerjiler, öğün/su, tartı/ölçü, plan. Yalnız hesaplıda. |
| Health & Fitness → **Fitness** | Evet | Evet | Hayır | App Functionality | Aktivite düzeyi, spor/takviye kullanımı. |
| **Sensitive Info** | Evet | Evet | Hayır | App Functionality | Apple tanımı "pregnancy or childbirth information" içerir → **hamilelik modu** bu kutuyu gerektirir. (Regl takibi de Health + Sensitive Info olarak değerlendirilir.) |
| Contact Info → **Name** | Evet | Evet | Hayır | App Functionality | Karşılama adı profilde eşitleniyor. Öneri: `profil.ad` sunucuya gönderilmezse bu satır düşer. |
| Identifiers → **User ID** | Evet | Evet | Hayır | App Functionality | Kullanıcı adı / hesap kimliği. |
| User Content → **Other User Content** | Evet | Evet | Hayır | App Functionality | Paylaşılan program/liste ve başlıkları, gelen kutusu. |
| Usage Data → **Other Usage Data** | Evet (yalnız sıralamaya katılanlar) | Evet | Hayır | App Functionality | Seri gün sayısı, gün sayısı, su ortalaması (`PUT /stats`). |
| Location → Coarse Location | **Hayır olmalı** | – | – | – | `leaderboard` yanıtında `country` var. IP'den türetilip saklanırsa Coarse Location beyanı gerekir. Öneri: ülkeyi kullanıcıya seçtir veya dil ayarından al; IP coğrafi konumu **saklama**. |
| Contact Info → Email | Hayır | – | – | – | Destek e-postası uygulama dışı (mailto). |
| Financial Info | Hayır | – | – | – | Bağış banka üzerinden, uygulama dışı. |
| Diagnostics / Crash | Hayır | – | – | – | Çökme raporlama SDK'sı yok. Eklenirse beyan güncellenir. |
| Identifiers → Device ID, Advertising Data, Purchases, Browsing/Search History, Contacts, Photos, Audio | Hayır | – | – | – | |

- **Tracking:** "No, we do not track" → ATT izni gerekmez.
- **Privacy Policy URL:** `https://diyet.maviplay.com/legal/gizlilik.html` · **Privacy Choices URL:** `https://diyet.maviplay.com/hesap-sil`.
- IP adresi (oran sınırı, günlük ≤14 gün): Apple'a göre isteği karşılamak için işlenip tutulmayan IP beyan gerektirmez; 14 günlük güvenlik günlüğü "App Functionality / güvenlik" kapsamında kabul edilir, ayrı tür yok.
- Veri türleri "Linked to You"dur çünkü hesapla (kullanıcı adı) eşleşir; "Not Linked" seçeneği sağlık verisi için uygun değildir.

## 2. Apple — App Review Guidelines eşlemesi

| Kural | Durum / yapılacak |
|---|---|
| **1.4.1 Medical** | Tanı/tedavi yok, sensörle ölçüm iddiası yok. Hesaplamaların formülü (Mifflin-St Jeor, FAO/WHO PAL) koşullarda yazılı. "Doktora danış" uyarısı uygulamada (`disclaimer`, `wHamile`) ve onay ekranında (`cMedical`). Uygulamanın tıbbi cihaz olmadığı koşullarda belirtiliyor. |
| **2.1 App Completeness / demo hesap** | Giriş var ama **zorunlu değil**. Review notlarına: "Account optional; all features work without login. Test account: `review_lf` / `<şifre>` (sunucuda önceden açılmış)". Giriş içeren uygulamalarda Apple demo hesap ister → **mutlaka bir test hesabı ver**; "hesapsız çalışır" tek başına yeterli sayılmayabilir. Arka uç (`lifefit-api`) inceleme sırasında açık olmalı. |
| **4.8 Login Services** | Yalnız kendi kullanıcı adı/şifre sistemi; sosyal/3. taraf giriş yok → Sign in with Apple zorunluluğu **tetiklenmez**. Eklenirse zorunlu olur. |
| **5.1.1 (i) Privacy policy** | Bağlantı App Store Connect alanında **ve** uygulama içinde (Ayarlar → Hesap → Belgeler; onay ekranı `cLinks`). Politika: toplanan veri, kullanım, saklama/silme, rızayı geri alma — hepsi var. |
| **5.1.1 (ii) Permission** | Toplama öncesi onay ekranı (`p3e.js`), rızayı geri alma yolu (`cWithdraw`). |
| **5.1.1 (iii) Data minimization** | Yalnız işlev için gerekli veri; 3. taraf erişimi yok. Öneri: `profil.ad` eşitlemeden çıkarılabilir. |
| **5.1.1 (v) Account sign-in / deletion** | Hesapsız kullanım ✔. **Uygulama içi hesap silme** zorunlu → Ayarlar → Hesap → Hesabı sil (`DELETE /account`). |
| **5.1.1 (ix) Highly regulated fields** | "Healthcare" alanındaki uygulamaların **tüzel kişi** tarafından gönderilmesi beklenir. Diyet/yaşam tarzı uygulaması sağlık hizmeti sunmuyor; ancak sağlık verisi tutuyor → bireysel geliştirici hesabı için **ret riski**. Avukat/strateji: Maviplay'i şirketleştirip Organization hesabıyla göndermek en güvenlisi. |
| **5.1.2 (i) Data use and sharing** | 3. tarafla paylaşım yok; AI servisine aktarım yok. |
| **5.1.3 Health (i)** | HealthKit/Clinical Records yok. Sağlık verisi reklam/pazarlama/veri madenciliği için kullanılmaz (politikada açık). Toplanan sağlık verisi türleri politikada tek tek sayılıyor. |
| **5.1.3 (ii)** | HealthKit'e yazma yok. "Kişisel sağlık bilgisi iCloud'da saklanmaz": CloudKit/iCloud KVS kullanılmıyor. Not: iOS cihaz yedeği WKWebView verisini iCloud'a yedekleyebilir; Apple'ın hedefi geliştiricinin iCloud'a yazmasıdır, cihaz yedeği değil — yine de review notunda "no iCloud/CloudKit usage" yaz. |
| **5.1.4 Kids** | Çocuk kategorisi değil; 16+. Meta verilerde "çocuk/kids" ifadesi kullanma. |
| **3.1.1 / 3.2.2 (iv) Ödeme ve bağış** | Uygulama içinde IBAN gösterip bağış istemek (geliştiriciye "kahve ısmarla") → Apple'da **ret riski** (IAP dışı ödeme çağrısı; bağış yalnız onaylı kâr amacı gütmeyenlere ve Apple Pay ile). **iOS derlemesinde `destekAc` ekranını ve hatırlatmasını (`destekHatirlat`) kapat.** |
| **Export compliance** | Yalnız HTTPS → `ITSAppUsesNonExemptEncryption = NO`. |
| **Kategori** | Birincil: Health & Fitness · İkincil: Food & Drink. |

## 3. Apple — Yaş derecelendirme (2025 yeni sistem: 4+, 9+, 13+, 16+, 18+)

| Soru | Cevap | Etki |
|---|---|---|
| Health or Wellness Topics (kalori takibi, diyet önerisi, egzersiz) | **Evet** | 9+ |
| Medical or Treatment Information | **Infrequent** (kan şekeri/tansiyon/kolesterol odaklı beslenme ve hamilelik beslenme uyarıları "hastalık yönetimi rehberliği" sayılabilir; tanı/ilaç yok) | 13+ |
| Unrestricted Web Access | Hayır | – |
| User-Generated Content | **Evet** (program/liste paylaşımı) | 4+ |
| Messaging and Chat | Hayır (serbest metin sohbet yok; yalnız program iletimi) — gri alan, review'a açıkla | – |
| Social Media | Hayır | – |
| Advertising | Hayır | – |
| Parental Controls / Age Assurance | Hayır (yalnız 16+ beyanı; doğrulama yok) | – |
| Contests / Gambling / Loot box / Violence / Sexual / Profanity / Alcohol-tobacco-drugs | Hayır | – |

Sonuç: hesaplanan 13+. Politikamız 16+ olduğu için App Store Connect'te derecelendirmeyi **16+'ya yükselt** (daha yüksek seçmek serbest); "Frequent medical information" seçerek değil, override ile.

---

## 4. Google Play

### 4.1 Data safety formu (satır satır)

Genel sorular: Veri topluyor/paylaşıyor mu? **Evet, topluyor; paylaşmıyor.** Tüm veri aktarımda şifreli mi? **Evet (TLS).** Kullanıcı silme talebinde bulunabilir mi? **Evet** (uygulama içi + web). Hesap oluşturma var mı? **Evet** → silme bağlantısı: `https://diyet.maviplay.com/hesap-sil`. Bağımsız güvenlik incelemesi: **Hayır.**

| Google veri türü | Toplanıyor | Paylaşılıyor | Zorunlu / İsteğe bağlı | Amaç | Not |
|---|---|---|---|---|---|
| Personal info → **Name** | Evet | Hayır | İsteğe bağlı | App functionality, Account management | Karşılama adı. `ad` eşitlenmezse satır düşer. |
| Personal info → **User IDs** | Evet | Hayır | İsteğe bağlı | App functionality, Account management | Kullanıcı adı / hesap kimliği. |
| Health and fitness → **Health info** | Evet | Hayır | İsteğe bağlı | App functionality | Profil ölçüleri, odaklar, alerjiler, hamilelik, regl, öğün/su, tartı/ölçü, plan. |
| Health and fitness → **Fitness info** | Evet | Hayır | İsteğe bağlı | App functionality | Aktivite düzeyi, spor/takviye. |
| App activity → **Other user-generated content** | Evet | Hayır | İsteğe bağlı | App functionality | Paylaşılan program/liste, başlık. |
| App activity → **Other actions** | Evet (yalnız sıralama) | Hayır | İsteğe bağlı | App functionality | Seri/gün sayısı, su ortalaması. |
| Messages → Other in-app messages | Hayır | – | – | – | Serbest metin mesajlaşma yok; gelen kutusu yalnız paylaşım nesnesi taşır. Mesaj alanı eklenirse **Evet**. |
| Location → Approximate location | **Hayır olmalı** | – | – | – | IP'den ülke türetip saklama (bkz. §1 Coarse Location). |
| Personal info → Email, Phone, Address; Financial info; Photos/Videos; Audio; Files; Calendar; Contacts; Device or other IDs; App info and performance (crash/diagnostics) | Hayır | – | – | – | Crash SDK eklenirse "App info and performance" güncellenir. |

- "İsteğe bağlı" seçimi doğru: her kullanıcı hesapsız kullanabilir (opt-in). Hesap açılınca sağlık verisi eşitleme işlevi için gerekir; yine de **kullanıcı tüm toplamadan vazgeçebildiği** için Google tanımına göre "optional" uygundur.
- IP adresi: Data safety'de ayrı tür değil; oran sınırı için geçici (ephemeral) işlem ve ≤14 gün güvenlik günlüğü gizlilik politikasında açıklanıyor.
- Service provider (Hetzner) = paylaşım sayılmaz (işleyen). Kullanıcının kendi başlattığı paylaşım (programı başka kullanıcıya gönderme) = "user-initiated transfer", paylaşım sayılmaz.
- **Silme:** Hesap silme + tüm veri silme uygulama içinde (anında) ve web üzerinden (30 gün). "Hesabı silmeden bazı verileri silme" seçeneği şu an yok → ilgili soruya "Hayır" (ya da Ayarlar'a "sunucu verisini sil, hesabı tut" eklenebilir).

### 4.2 Health apps declaration (Play Console → App content)

- Sağlık özelliği var: **Evet** → Health and fitness → **"Nutrition and Weight Management"**; regl takibi yayına girerse ek olarak **"Period Tracking"**.
- Medical kategorisi (hastalık yönetimi, tedavi, üreme sağlığı): **seçilmez** (tanı/tedavi yok). Hamilelik modu = beslenme uyarlaması; "Reproductive and Sexual Health" seçmeyi gerektirmez — yine de politika ekibi sorarsa gerekçe hazır.
- Medical Device Apps: **Hayır** (EU MDR kapsamı yok).
- Health subjects research: **Hayır**.
- **Health Connect**: kullanılmıyor → Health Connect izni/beyanı yok; manifest'te `android.permission.health.*` olmasın.
- Mağaza açıklamasına zorunlu cümle (Health Content and Services politikası): *"LifeFit tıbbi cihaz değildir; herhangi bir hastalığı teşhis etmez, tedavi etmez, iyileştirmez veya önlemez. Tıbbi tavsiye, tanı veya tedavi için bir sağlık profesyoneline danışın."* (EN: "LifeFit is not a medical device and does not diagnose, treat, cure, or prevent any medical condition. Consult a healthcare professional for medical advice, diagnosis or treatment.")
- Yanıltıcı sağlık iddiası yok; "X kiloda garanti" gibi vaatler mağaza metninde **olmamalı**.

### 4.3 User Data politikası — "Belirgin açıklama ve rıza" (prominent disclosure)

Sağlık verisi Google'da "kişisel ve hassas veri"dir. Onay ekranı (`p3e.js`) şartları karşılar:
- Uygulama **içinde**, normal akışta (hesap açma adımında), yalnız gizlilik politikasında değil ✔
- Hangi veri, ne için, nereye: `cIntro` ("…sağlık verisi… Almanya'daki sunucuya… eşitleme için") ✔ — Google'ın önerdiği kalıp: "*LifeFit, planını cihazların arasında eşitlemek için sağlık verilerini Almanya'daki sunucusuna aktarır.*"
- Onay: işaret kutuları + "Kabul et ve hesap aç" düğmesi = olumlu eylem; geri/kapatma rıza sayılmaz; otomatik kapanan mesaj yok ✔
- Toplama **rızadan sonra** başlar (`POST /register` consent olmadan 400) ✔
- İlgisiz açıklamalarla birleştirilmemiş (ayrı ekran) ✔

Gizlilik politikası gereksinimleri: Play Console'daki URL + uygulama içi bağlantı; herkese açık, geofence'siz, PDF değil (`legal/gizlilik.html` ✔); geliştirici adı politikada **mağaza listesindeki geliştirici adıyla aynı** olmalı ("Maviplay" / "Kaan Kapucuoğlu" — Play geliştirici hesabı adı neyse politikaya o yazılmalı); iletişim: destek@maviplay.com ✔; saklama/silme politikası ✔.

### 4.4 Hedef kitle ve içerik / IARC

- **Target audience:** 16–17 ve 18+ (çocuklara hitap: Hayır). 13 altı seçilmediği için Families politikası devreye girmez.
- **IARC anketi:** Kategori "Utility, Productivity, Communication, or Other". Şiddet/cinsellik/küfür/uyuşturucu/kumar: Hayır. Kontrollü madde: Hayır (takviye listesi besin bilgisidir). Kullanıcı etkileşimi: **Evet** (program paylaşımı, kullanıcı adı sıralamada görünür) → "Users Interact" etiketi. Konum paylaşımı: Hayır. Dijital satın alma: Hayır. Beklenen: PEGI 3 / ESRB Everyone / USK 0 + "Users Interact".
- Reklam içeriyor: Hayır. Haber uygulaması: Hayır. Devlet uygulaması: Hayır. Finansal özellik: Hayır.
- **Hesap silme web adresi:** `https://diyet.maviplay.com/hesap-sil` → Caddy: `handle /hesap-sil { rewrite * /legal/hesap-sil.html ; file_server }` (veya `site_paketle.py` ile `hesap-sil/index.html` kopyası). Sayfa dil seçicili, PDF değil, giriş gerektirmez ✔.

### 4.5 Google Play — ödeme/bağış notu

Play Ödemeler politikası: uygulama içi dijital içerik için Play faturalandırması zorunlu. Geliştiriciye gönüllü IBAN bağışı "dijital içerik" değil, ama Play dışı ödeme çağrısı olarak yorumlanma riski var. Öneri: mağaza derlemelerinde IBAN ekranını kapat; web (PWA) sürümünde kalabilir.

---

## 5. Yayın öncesi teknik kontrol listesi (hukuk metinleriyle tutarlılık)

1. `POST /register` yalnız `consent.kvkk && terms && health && age16` ile kabul; `consent.ver = RIZA_SURUM` (`p3e.js`).
2. Rıza kaydı: zaman, sürüm, dil, **/24'e kısaltılmış IP**; hesapla birlikte silinir (politikada böyle yazıyor).
3. `DELETE /account` → hesap, veri, paylaşımlar, stats, rıza kayıtları anında; silme günlüğü yalnız zaman + hash.
4. Yedekler **14 gün** rotasyon; sunucu erişim günlükleri (Caddy/systemd) **14 gün**; oturum belirteci 180 gün; paylaşım 30 gün; `logrotate` ile doğrula.
5. `GET /export` → tüm hesap verisi JSON ("Verimi indir").
6. Sıralama: yalnız `lb_optin=true` hesaplar; sağlık alanı dönmez; `country` IP'den türetilip **saklanmasın**.
7. `profil.ad` sunucuya gitmezse Name beyanı iki mağazada da düşer (isteğe bağlı sadeleştirme).
8. iOS/Android mağaza derlemelerinde IBAN bağış ekranı kapalı (`DESTEK` / `destekHatirlat`).
9. Uygulama içi bağlantılar: Ayarlar → Hesap → Belgeler (gizlilik, aydınlatma, açık rıza, koşullar, hesap silme) — Apple ve Google ikisi de uygulama içi gizlilik politikası bağlantısı ister.
10. Mağaza metinlerine tıbbi cihaz değildir + sağlık profesyoneline danışın cümlesi (5 dilde).
11. Hetzner ile AVV/DPA (GDPR md. 28) imzalı olsun; Hetzner veri merkezi bölgesi Almanya (FSN/NBG) olarak sabitlensin.

---

## 6. Avukat kontrolü önerilen noktalar

1. **KVKK md. 9 (7499 sayılı Kanun, 1 Haziran 2024 sonrası):** Açık rıza artık yalnız **arızi (süreklilik taşımayan)** aktarımlar için istisnai dayanak. Sürekli eşitleme için asıl yol: yeterlilik kararı (Almanya için henüz yok) veya **uygun güvence** — Kurulca ilan edilen **standart sözleşme**nin veri sorumlusu (Kaan Kapucuoğlu) ile veri işleyen (Hetzner) arasında imzalanıp **5 iş günü içinde** Kuruma bildirilmesi. Hetzner'in Türk standart sözleşmesini imzalaması pratikte zor olabilir → alternatif: veriyi Türkiye'de barındırmak (md. 9 hiç devreye girmez) ya da AB'de kurulu bir tüzel kişiyi veri sorumlusu yapmak. Metinler "açık rıza + veri işleme sözleşmesi" diyor; avukatın doğru dayanağı seçip 7. maddeleri buna göre revize etmesi gerekir.
2. **GDPR md. 27 — AB temsilcisi:** Veri sorumlusu AB dışında, AB'de yerleşik kişilere hizmet var (DE dili), özel nitelikli veri **düzenli** işleniyor → md. 27(2) muafiyeti ("arızi", geniş ölçekli olmayan) büyük olasılıkla **uygulanmaz**; AB'de yazılı temsilci atanmalı ve politikaya eklenmeli.
3. **GDPR md. 35 DPIA ve KVKK VERBİS:** Ana faaliyeti özel nitelikli veri işlemek olan veri sorumlusu için VERBİS kaydı muafiyeti yok → **VERBİS kaydı** gerekir. GDPR tarafında sağlık verisinin geniş ölçekli işlenmesi için **DPIA** değerlendirilmeli.
4. **Reşit olmayanların rızası:** 16 sınırı GDPR md. 8 (varsayılan 16; üye devletler 13'e indirebilir) ile uyumlu. Türk hukukunda 18 yaş altının açık rızasının geçerliliği tartışmalı (ayırt etme gücü); yalnız beyana dayalı yaş kontrolü yeterli mi, 18+ mı olmalı — karar avukatın.
5. **Apple 5.1.1 (ix):** Sağlık verisi tutan uygulamanın bireysel geliştirici hesabından gönderilmesi ret riski taşır; şirketleşme (şahıs şirketi + D-U-N-S + Organization hesabı) değerlendirilsin. Ayrıca mağaza geliştirici adı ile hukuk metinlerindeki veri sorumlusu adı birebir aynı olmalı.
6. **Hamilelik ve regl verisi:** Apple "Sensitive Info" kategorisinde; bazı ülkelerde (ABD eyaletleri) üreme sağlığı verisi için ek yasalar var. Yalnız hesaplıda ve açık rızayla toplanıyor; politika bu veriyi açık sayıyor — avukat özel düzenleme gerektiren pazar var mı baksın.
7. **Kullanım koşulları md. 11 yetki/hukuk:** TR hukuku + tüketicinin kendi ülkesi saklı tutuldu; AB tüketicileri için Rome I/Brüksel I-bis uyumu ve Almanya için AGB denetimi (BGB §305 vd.) kontrol edilsin. Sorumluluk sınırının Alman hukukunda geçerliliği (kasıt/ağır kusur istisnası yazıldı) teyit edilsin.
8. **Hesap silme e-posta yolu — kimlik doğrulama:** Sadece kullanıcı adıyla gelen silme talebi kötüye kullanılabilir (başkasının hesabını sildirme). Teknik önlem (uygulama içinden tek seferlik doğrulama kodu) veya e-posta adresi toplamadan doğrulama usulü belirlenmeli; politika "ek bilgi isteyebiliriz" diyor.
9. **Veri ihlali bildirimi:** KVKK (Kurul kararı: 72 saat) ve GDPR md. 33 (72 saat) için iç prosedür; politika yalnız "yasal süreler" diyor.
10. **Gönüllü bağış (IBAN):** Vergi/bağış niteliği (gelir beyanı) ve mağaza kurallarıyla çatışma; mağaza sürümlerinde kapatma önerisi.
11. **Saklama süreleri taahhüdü:** 14 gün yedek, 14 gün günlük, 12 ay destek yazışması, 180 gün oturum — teknik olarak uygulanmalı; uygulanamayan süre politikaya yazılmamalı.
12. **Çerez beyanı:** Web sürümünde localStorage/IndexedDB "çerez yok" ifadesiyle birlikte açıklandı; AB ePrivacy açısından uygulamanın çalışması için zorunlu depolama muafiyeti geçerli — avukat teyit etsin.

---

## 7. Kaynaklar (erişim: 2026-11-01)

**Apple**
- App Store Review Guidelines (1.4.1, 2.1, 3.2.1/3.2.2, 4.8, 5.1.1, 5.1.2, 5.1.3, 5.1.4): https://developer.apple.com/app-store/review/guidelines/
- App privacy details on the App Store (veri türleri, "collect" tanımı, optional disclosure, tracking): https://developer.apple.com/app-store/app-privacy-details/
- Age ratings values and definitions (4+/9+/13+/16+/18+, Medical or Treatment Information, Health or Wellness Topics): https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions/
- Updated age ratings in App Store Connect (Temmuz 2025 duyurusu): https://developer.apple.com/news/?id=ks775ehf
- HealthKit / health and fitness apps (reklam ve veri madenciliği yasağı): https://developer.apple.com/HealthKit/
- Instructions for Minimum Terms of Developer's End-User License Agreement (koşullar md. 12 Apple maddeleri bu 10 şarta göre yazıldı): https://www.apple.com/legal/internet-services/itunes/appstore/dev/minterms/

**Google Play**
- User Data policy (kişisel ve hassas veri, belirgin açıklama ve rıza, gizlilik politikası, hesap silme): https://support.google.com/googleplay/android-developer/answer/10144311
- Data safety form — data types and purposes: https://support.google.com/googleplay/android-developer/answer/10787469
- Understanding Google Play's app account deletion requirements: https://support.google.com/googleplay/android-developer/answer/13327111
- Health Content and Services policy: https://support.google.com/googleplay/android-developer/answer/16555673
- Provide information for the Health apps declaration form: https://support.google.com/googleplay/android-developer/answer/14738291
- Health apps declaration duyurusu ve son tarihler (31 Mayıs / 31 Ağustos 2024): https://support.google.com/googleplay/android-developer/announcements/13412212
- Publish your health app on Google Play (Health Connect): https://developer.android.com/health-and-fitness/health-connect/publish
- Policy deadlines: https://support.google.com/googleplay/android-developer/answer/9876714

**Mevzuat**
- 6698 sayılı KVKK (md. 3, 5, 6, 7, 9, 10, 11, 13, 14) — güncel metin: https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6698&MevzuatTur=1&MevzuatTertip=5
- 7499 sayılı Kanun ile KVKK değişiklikleri (md. 6, 9, 18; yürürlük 1.6.2024; açık rıza geçişi 1.9.2024) — özet: https://www.erdem-erdem.av.tr/bilgi-bankasi/kisisel-verilerin-korunmasi-kanununda-neler-degisti
- KVKK Kurulu — Standart Sözleşmeler ve Bağlayıcı Şirket Kuralları duyurusu: https://www.kvkk.gov.tr/Icerik/7938/Standart-Sozlesmeler-ve-Baglayici-Sirket-Kurallarina-Iliskin-Dokumanlar-Hakkinda-Kamuoyu-Duyurusu
- KVKK Kurulu — Standart Sözleşme Bildirim Modülü: https://www.kvkk.gov.tr/Icerik/8043/Standart-Sozlesme-Bildirim-Modulu-Hakkinda-Kamuoyu-Duyurusu
- GDPR (md. 4, 6, 7, 8, 9, 12–22, 27, 28, 33, 35, 77): https://eur-lex.europa.eu/eli/reg/2016/679/oj
