# LifeFit (com.maviplay.lifefit) — sunucu / istemci sözleşmesi (01.11.2026)

Uygulama **çevrimdışı önce** çalışır: tüm veri cihazda (`D` nesnesi, localStorage `diyet_uygulamasi_v1` + IndexedDB yedeği, bkz. kaynak/p5.js `kaydet()`/`depoYukle`). Hesap açılınca veri sunucuya da yazılır; bağlantı gelince eşitlenir. Hesapsız kullanım her zaman mümkündür (Apple 5.1.1 — giriş zorunlu değil).

- Sunucu: Python 3 stdlib (http.server + sqlite3), `server/server.py`, şablon: `C:\Users\kaank\apps\sliplines\server\server.py` (oturum belirteci, PBKDF2, oran sınırı, ApiError, route). Almanya maviplay sunucusunda systemd `lifefit-api` (127.0.0.1:8097), Caddy `diyet.maviplay.com` altında `handle /api/*` → reverse_proxy. DB `/var/lib/maviplay/lifefit/lf.sqlite`, gece yedeği.
- İstemci tabanı: `const API_BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://127.0.0.1:8097/api' : 'https://diyet.maviplay.com/api';` (tek yerde, `kaynak/p9a.js`). Yerli kabukta `window.__LF_NATIVE` varsa aynı https taban.
- Kimlik: `Authorization: Bearer <token>`. Token 32 bayt rastgele, sunucuda sha256 karması saklanır, 180 gün. Kullanıcı adı `^[A-Za-z][A-Za-z0-9_.]{2,15}$`, şifre ≥ 8 karakter (sunucu PBKDF2-SHA256 200k, tuzlu). 5 yanlış / 15 dk kilit (kullanıcı adı + IP).
- Tüm gövdeler JSON (UTF-8), en çok 2 MB; hatalar `{error:"kod", msg?}`; HTTP 400/401/403/404/409/413/429/500.
- Sağlık verisi (KVKK özel nitelikli / GDPR md. 9): sunucu **yalnız açık rıza verilmiş hesaplar** için veri kabul eder (`consent.health=true`, sürümlü). Rıza kaydı: zaman, sürüm, IP (kısaltılmış /24), dil. Sıralama yalnız kullanıcı adı + seri (gün sayısı) gösterir, sağlık verisi göstermez ve **isteğe bağlı** (`lb_optin`).

## Uç noktalar (önek /api)
| Yöntem | Yol | Gövde | Yanıt |
|---|---|---|---|
| GET | /health | – | `{ok:true, t}` |
| POST | /register | `{username,password,lang,consent:{kvkk:true,terms:true,health:true,ver:"2026-11-01"}}` | `{token,user}` (409 taken / 400 rude|bad|weak|consent) |
| POST | /login | `{username,password}` | `{token,user}` (401 wrong + `left`, 423 locked `until`) |
| POST | /logout | – | `{ok}` |
| GET | /me | – | `user = {id,username,created,lang,consent,lb_optin,rev,updated_at}` |
| GET | /data | – | `{rev,updated_at,data}` (data = tam D JSON; yoksa `data:null`) |
| PUT | /data | `{base_rev, updated_at, data}` | `{rev}`; `base_rev` sunucudakinden eskiyse **409** `{rev,updated_at,data}` (istemci `verileriBirlestir` ile birleştirip yeniden gönderir) |
| POST | /password | `{old,new}` | `{ok}` (tüm eski belirteçler iptal) |
| POST | /consent | `{kvkk,terms,health,ver,lb_optin?}` | `{ok,consent}` |
| GET | /export | – | hesabın tüm verisi (taşınabilirlik; JSON indirme) |
| DELETE | /account | `{password}` | `{ok}` — hesap, veri, paylaşımlar, rıza kayıtları silinir (silme günlüğüne yalnız zaman + hash) |
| POST | /share | `{kind:"program"|"yenen", to:username|null, payload, title}` | `{code}` (8 karakter, 30 gün; `to` verilirse alıcının gelen kutusuna düşer; saatte 20) |
| GET | /share/{code} | – | `{kind,from,title,payload,created}` |
| GET | /inbox | – | `[{code,kind,from,title,created,seen}]` |
| POST | /share/{code}/seen | – | `{ok}` |
| PUT | /stats | `{streak,days,water_avg}` | `{rank?}` (yalnız lb_optin) |
| GET | /leaderboard?scope=world|country&me=1 | – | `{rows:[{username,streak,days,country}], me:{rank,...}}` |
| GET | /users/check?u= | – | `{free:bool, suggestions:[]}` |

## İstemci modülü (kaynak/p9a.js → `Hesap`, `Esitle`)
- `Hesap.durum()` → `{giris:bool, kullanici, token}`; `Hesap.kaydol(u,p,consent)`, `Hesap.gir(u,p)`, `Hesap.cik()`, `Hesap.sil(p)`, `Hesap.sifre(e,y)`.
- `Esitle.kirli()`: `kaydet()` her çağrıldığında çağrılır (p5.js'te tek satır kanca: `if (window.Esitle) Esitle.kirli();`). 3 sn gecikmeli, çevrimiçi ve girişliyse `PUT /data`. 409 → `verileriBirlestir(gelen.data)` (p7b.js, mevcut) → tekrar gönder. Açılışta ve `online`/`visibilitychange` olaylarında `GET /data` → yerel daha eskiyse birleştir. Durum göstergesi: ana sayfada küçük rozet (eşitlendi / bekliyor / çevrimdışı), ayrıntı Ayarlar → Hesap.
- Hesapsızken hiçbir ağ isteği yapılmaz (sıralama görüntüleme hariç).

## Uygulama notları (sunucu/istemci, 01.11.2026)
- Yerel geliştirme portu **8097** (8095/8096 sunucuda dolu). `python server/server.py 8097 --static .` → uygulama http://127.0.0.1:8097/ , testler `python server/check.py`.
- CORS: `https://diyet.maviplay.com`, `Origin: null` (yerli WebView) ve yalnız geliştirme için `http://localhost:*` / `http://127.0.0.1:*`. Başka köken → ACAO başlığı yok (preflight 403).
- `POST /password` → `{ok, token}`: tüm eski belirteçler silinir, yanıt yeni belirteç taşır (istemci yerine koyar, oturum düşmez).
- `POST /consent` ile `health:false` → sunucudaki veri satırı silinir, rev 0'a döner (rıza geri çekme); `lb_optin:false` → stats satırı silinir. Her çağrı rıza geçmişine (consents) satır ekler.
- `PUT /data`: `base_rev` sunucudaki rev'den **farklıysa** 409 (`{error:"conflict", rev, updated_at, data}`); 403 `{error:"consent", ver}` rıza yok/eski sürüm.
- `GET /share/{code}`: `to` verilmiş (adresli) paylaşım yalnız alıcı veya gönderen belirteciyle açılır; `to:null` paylaşım kodu bilen herkese açıktır. Kod 8 karakter, alfabe `A–Z 2–9` (0/O/1/I yok), 30 gün.
- `GET /users/check` yanıtına `reason` eklendi (`bad` | `rude` | `taken`); `POST /register` ve `PUT /stats` isteğe bağlı `country` (2 harf) alır; sıralama satırları `rank` içerir; `me` yalnız `lb_optin` açık ve belirteç geçerliyse döner.
- Hata kodları: 401 `wrong` (+`left`), 423 `locked` (+`until`, epoch sn), 429 `rate`, 413 `too_big`, 400 `json|bad|weak|rude|consent|self`, 404 `no_user|not_found`.
- İstemci: `Esitle.durum` yalnız girişliyken anlamlı ('kapali' = hesap yok). Sunucudan gelen veri `verileriBirlestir` ile **sessiz** birleştirilir (bildirim/log/pencere kapatma yok, bakılan gün korunur); birleşim sunucudakiyle aynıysa yeniden gönderilmez (ping-pong yok).
