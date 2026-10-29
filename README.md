# Diyet Listesi

Kişisel diyet planı uygulaması. Tek sayfalık, internetsiz de çalışan bir web uygulaması (PWA).

**Canlı adres:** https://kaankapucuoglu.github.io/diyet-uygulamasi/

- İlk açılışta kurulum: dil (TR, EN, RU, DE, AR), ad, cinsiyet, ölçüler, kilo hedefi, sağlık odakları (kan şekeri, tansiyon, kolesterol), aktivite, yemedikleri.
- Hedeflere göre 4 haftalık dönen menü; öğün, su, kıyaslama, geçmiş günler ve işlem logları.
- Veriler yalnızca kullanıcının cihazında (tarayıcı depolaması) saklanır; sunucu yok.

## Klasör düzeni

| Yol | Ne işe yarar |
|---|---|
| `index.html` | Yayınlanan uygulama. **Elle düzenleme**; `kaynak/` içinden üretilir. |
| `sw.js` | Çevrimdışı çalışma (service worker). Her yayında önbellek sürümü artmalı. |
| `manifest.webmanifest`, `icons/` | Ana ekrana ekleme: ad, renk, simgeler. |
| `kaynak/p1.html … p8.js` | Uygulamanın kaynağı (stil, metinler, yemekler, hesaplama, ekranlar, sihirbaz). |
| `kaynak/derle.py` | Parçaları birleştirip `index.html` üretir. |
| `kaynak/ikon/ikon.html` | Simge üretici (tarayıcıda açınca PNG'leri üretir). |
| `kaynak/test/` | Otomatik kontroller (düzen, klavye, benzer yemekler, kategoriler, 4 hafta). |

## Güncelleme adımları

1. `kaynak/` altındaki ilgili parçayı düzenle.
2. `python kaynak/derle.py --yayin` (index.html üretilir, sw.js sürümü artar).
3. `kaynak/test/kontrol.html` dosyasını tarayıcıda açıp sonucu kontrol et (5 dil × 4 ekran genişliğinde çakışma/taşma).
4. `git add -A && git commit -m "..." && git push` — 1-2 dakika içinde canlı adreste.

Uygulamayı kullanan telefonlar, internete bağlandıklarında yeni sürümü otomatik alır; kullanıcı verileri silinmez.
