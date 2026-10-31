#!/usr/bin/env python3
"""LifeFit sunucusu — hesap (kullanıcı adı + şifre), çevrimdışı-önce veri eşitleme (rev / 409), paylaşım + gelen kutusu,
isteğe bağlı sıralama (yalnız kullanıcı adı + seri). Yalnız Python standart kütüphanesi + SQLite.
Üretim: maviplay (Almanya), systemd 'lifefit-api', Caddy diyet.maviplay.com /api/* → 127.0.0.1:8097.
Sözleşme: docs/API.md

Çalıştırma:  python server.py [port] [--static KLASÖR]   (--static: geliştirmede uygulamayı da aynı kökenden sunar)
Ortam: LF_DB (SQLite yolu, varsayılan ./lf.sqlite), LF_HOST (varsayılan 127.0.0.1), LF_LOG=1 (istek günlüğü)
"""
import gzip, hashlib, hmac, json, mimetypes, os, re, secrets, sqlite3, sys, threading, time, zlib
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

DB_PATH = os.environ.get('LF_DB') or os.path.join(os.path.dirname(os.path.abspath(__file__)), 'lf.sqlite')
PBKDF2_IT = 200_000
TOKEN_SURE = 180 * 86400          # belirteç ömrü
PAYLASIM_SURE = 30 * 86400        # paylaşım ömrü
RIZA_SURUM = '2026-11-01'         # güncel rıza metni sürümü (istemci p9a.js RIZA_SURUM ile aynı)
MAX_GOVDE = 2_000_000             # istek gövdesi (bayt)
MAX_PAYLASIM = 300_000            # paylaşım yükü (bayt)
KILIT_N, KILIT_SURE = 5, 900      # 5 yanlış şifre / 15 dk (kullanıcı adı + IP)
UNAME_RE = re.compile(r'^[A-Za-z][A-Za-z0-9_.]{2,15}$')
KOD_ABC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'   # paylaşım kodu: karışmayan 32 karakter, 8 hane
ORIGINS = {'https://diyet.maviplay.com'}
DEV_ORIGIN = re.compile(r'^https?://(localhost|127\.0\.0\.1)(:\d+)?$')   # geliştirme: başka porttan açılan test sayfası
RESERVED = {'admin', 'administrator', 'root', 'system', 'support', 'destek', 'moderator', 'mod', 'lifefit', 'maviplay', 'diyet',
            'apple', 'google', 'null', 'undefined', 'official', 'staff', 'sys'}
# küfür/uygunsuz süzgeci: kısa olanlar yalnız tam parça (token) eşleşir, uzunlar alt dize + leet
BAD_SHORT = {'am', 'got', 'sik', 'oc', 'mk', 'amk', 'aq', 'fuck', 'shit', 'cunt', 'dick', 'cock', 'puta', 'nazi', 'fag'}
BAD_LONG = ['orospu', 'yarrak', 'amcik', 'amina', 'sikis', 'siktir', 'pezevenk', 'kahpe', 'gavat', 'ibne', 'fuck', 'shit', 'bitch', 'whore',
            'cunt', 'nigg', 'faggot', 'hitler', 'rapist', 'porn', 'pussy', 'penis', 'vagina', 'motherf', 'asshole', 'bastard', 'retard',
            'hure', 'fotze', 'schlampe', 'puta', 'mierda', 'pendejo', 'merde', 'salope', 'caralho', 'porra']
LEET = str.maketrans({'0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', '@': 'a', '$': 's'})

_lock = threading.RLock()
_local = threading.local()
_buckets = {}    # (kova, anahtar) → [zamanlar]   oran sınırları
_fails = {}      # (kullanıcı adı, ip) → [zamanlar] şifre hataları


def db():
    c = getattr(_local, 'c', None)
    if c is None:
        c = sqlite3.connect(DB_PATH, timeout=10, isolation_level=None)
        c.row_factory = sqlite3.Row
        c.execute('PRAGMA journal_mode=WAL')
        c.execute('PRAGMA foreign_keys=ON')
        _local.c = c
    return c


def init_db():
    c = db()
    c.executescript('''
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE COLLATE NOCASE,
      pw_hash TEXT NOT NULL,
      created INTEGER NOT NULL,
      lang TEXT NOT NULL DEFAULT 'tr',
      country TEXT NOT NULL DEFAULT '',
      lb_optin INTEGER NOT NULL DEFAULT 0,
      c_kvkk INTEGER NOT NULL DEFAULT 0,
      c_terms INTEGER NOT NULL DEFAULT 0,
      c_health INTEGER NOT NULL DEFAULT 0,
      c_ver TEXT NOT NULL DEFAULT '',
      c_t INTEGER NOT NULL DEFAULT 0,
      last_seen INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, created INTEGER, last INTEGER);
    CREATE INDEX IF NOT EXISTS ix_sessions_user ON sessions(user_id);
    CREATE TABLE IF NOT EXISTS data(user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, blob BLOB, rev INTEGER NOT NULL DEFAULT 0,
      updated_at INTEGER NOT NULL DEFAULT 0, server_t INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS consents(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      ver TEXT, kvkk INTEGER, terms INTEGER, health INTEGER, lb_optin INTEGER, ip24 TEXT, lang TEXT, t INTEGER);
    CREATE INDEX IF NOT EXISTS ix_consents_user ON consents(user_id);
    CREATE TABLE IF NOT EXISTS shares(code TEXT PRIMARY KEY, from_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      to_id INTEGER REFERENCES users(id) ON DELETE CASCADE, kind TEXT NOT NULL, title TEXT NOT NULL DEFAULT '', payload BLOB,
      created INTEGER NOT NULL, expires INTEGER NOT NULL, seen INTEGER NOT NULL DEFAULT 0);
    CREATE INDEX IF NOT EXISTS ix_shares_to ON shares(to_id, created DESC);
    CREATE INDEX IF NOT EXISTS ix_shares_from ON shares(from_id);
    CREATE TABLE IF NOT EXISTS stats(user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, streak INTEGER NOT NULL DEFAULT 0,
      days INTEGER NOT NULL DEFAULT 0, water_avg INTEGER NOT NULL DEFAULT 0, t INTEGER NOT NULL DEFAULT 0);
    CREATE INDEX IF NOT EXISTS ix_stats ON stats(streak DESC, days DESC, t ASC);
    CREATE TABLE IF NOT EXISTS deletions(t INTEGER NOT NULL, hash TEXT NOT NULL);
    ''')


# ---------- yardımcılar ----------
def now():
    return int(time.time())


def pin_hash(pw, salt=None):
    salt = salt or secrets.token_hex(12)
    h = hashlib.pbkdf2_hmac('sha256', pw.encode(), salt.encode(), PBKDF2_IT).hex()
    return f'pbkdf2_sha256${PBKDF2_IT}${salt}${h}'


def pin_ok(pw, stored):
    try:
        _, it, salt, h = stored.split('$')
        return hmac.compare_digest(hashlib.pbkdf2_hmac('sha256', pw.encode(), salt.encode(), int(it)).hex(), h)
    except Exception:
        return False


_DUMMY = pin_hash('zaman-esitleme')   # olmayan kullanıcıda da aynı süre harcansın


def norm(u):
    return u.lower().translate(LEET)


def rude(u):
    n = norm(u)
    parts = [p for p in re.split(r'[._0-9]+', n) if p]
    if any(p in BAD_SHORT for p in parts):
        return True
    flat = re.sub(r'[._]', '', n)
    return any(b in flat for b in BAD_LONG)


def name_problem(u):
    if not isinstance(u, str) or not UNAME_RE.match(u) or '..' in u or u.endswith('.'):
        return 'bad'
    if u.lower() in RESERVED:
        return 'taken'
    if rude(u):
        return 'rude'
    return None


def taken(u):
    return db().execute('SELECT 1 FROM users WHERE username=?', (u,)).fetchone() is not None


def user_by_name(u):
    return db().execute('SELECT * FROM users WHERE username=?', (u,)).fetchone()


def suggest_free(u, n=4):
    base = re.sub(r'[^A-Za-z0-9_.]', '', u or '')[:12] or 'lifefit'
    if not base[0].isalpha():
        base = 'u' + base
    out, seen = [], set()
    cands = [base + str(secrets.randbelow(90) + 10), base + '_' + str(secrets.randbelow(900) + 100), base + str(time.gmtime().tm_year),
             base + '.' + secrets.choice(['fit', 'life', 'go', 'x', 'top', 'one']), base[:10] + '_' + secrets.choice(['fit', 'zen', 'yes', 'ok'])]
    for c in cands + [base + str(secrets.randbelow(9000) + 1000) for _ in range(6)]:
        c = c[:16]
        if c.lower() in seen or name_problem(c) or taken(c):
            continue
        seen.add(c.lower()); out.append(c)
        if len(out) >= n:
            break
    return out


def rate(kova, key, limit, window):
    """True → izin var (henüz sınırın altında)."""
    t = time.time()
    arr = [x for x in _buckets.get((kova, key), []) if t - x < window]
    _buckets[(kova, key)] = arr
    return len(arr) < limit


def hit(kova, key):
    _buckets.setdefault((kova, key), []).append(time.time())


def rate_reset():
    """Testler için: tüm oran sayaçlarını ve şifre kilitlerini sıfırla."""
    _buckets.clear(); _fails.clear()


def ip24(ip):
    """Rıza kaydı için kısaltılmış IP: IPv4 son sekizli, IPv6 son 5 hextet atılır."""
    if ':' in ip:
        return ':'.join(ip.split(':')[:3]) + '::'
    p = ip.split('.')
    return '.'.join(p[:3]) + '.0' if len(p) == 4 else ''


def clean_country(cc):
    cc = (cc or '').upper()
    return cc if re.fullmatch(r'[A-Z]{2}', cc) else ''


def clean_lang(l):
    return l if l in ('tr', 'en', 'ru', 'de', 'ar') else 'tr'


def new_session(uid):
    tok = secrets.token_urlsafe(32)
    th = hashlib.sha256(tok.encode()).hexdigest()
    c = db()
    c.execute('INSERT INTO sessions VALUES(?,?,?,?)', (th, uid, now(), now()))
    # kullanıcı başına en çok 10 oturum
    c.execute('DELETE FROM sessions WHERE user_id=? AND token_hash NOT IN (SELECT token_hash FROM sessions WHERE user_id=? ORDER BY last DESC LIMIT 10)', (uid, uid))
    return tok


def user_by_token(tok):
    if not tok:
        return None
    th = hashlib.sha256(tok.encode()).hexdigest()
    c = db()
    r = c.execute('SELECT u.*, s.created AS s_created FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=?', (th,)).fetchone()
    if not r:
        return None
    if r['s_created'] < now() - TOKEN_SURE:
        c.execute('DELETE FROM sessions WHERE token_hash=?', (th,))
        return None
    c.execute('UPDATE sessions SET last=? WHERE token_hash=?', (now(), th))
    c.execute('UPDATE users SET last_seen=? WHERE id=?', (now(), r['id']))
    return r


def data_row(uid):
    return db().execute('SELECT rev, updated_at, blob FROM data WHERE user_id=?', (uid,)).fetchone()


def blob_oku(b):
    return json.loads(zlib.decompress(b)) if b else None


def pub_user(u):
    d = data_row(u['id'])
    return {'id': u['id'], 'username': u['username'], 'created': u['created'], 'lang': u['lang'], 'country': u['country'],
            'consent': {'kvkk': bool(u['c_kvkk']), 'terms': bool(u['c_terms']), 'health': bool(u['c_health']), 'ver': u['c_ver'], 't': u['c_t']},
            'lb_optin': bool(u['lb_optin']), 'rev': d['rev'] if d else 0, 'updated_at': d['updated_at'] if d else 0}


def consent_oku(body):
    c = body.get('consent') if isinstance(body.get('consent'), dict) else body
    return {'kvkk': c.get('kvkk') is True, 'terms': c.get('terms') is True, 'health': c.get('health') is True,
            'ver': str(c.get('ver') or '')[:20], 'lb_optin': c.get('lb_optin') if isinstance(c.get('lb_optin'), bool) else None}


def consent_yaz(uid, cs, ip, lang, lb_optin):
    """Rıza kaydı: kullanıcı satırı güncellenir + geçmiş tablosuna satır eklenir."""
    c = db()
    c.execute('UPDATE users SET c_kvkk=?, c_terms=?, c_health=?, c_ver=?, c_t=? WHERE id=?', (int(cs['kvkk']), int(cs['terms']), int(cs['health']), cs['ver'], now(), uid))
    c.execute('INSERT INTO consents(user_id,ver,kvkk,terms,health,lb_optin,ip24,lang,t) VALUES(?,?,?,?,?,?,?,?,?)',
              (uid, cs['ver'], int(cs['kvkk']), int(cs['terms']), int(cs['health']), int(bool(lb_optin)), ip24(ip), lang, now()))


def saglik_rizasi(u):
    return bool(u['c_health']) and u['c_ver'] == RIZA_SURUM


def tam_sayi(v, lo, hi, varsayilan=0):
    try:
        n = int(v)
    except (TypeError, ValueError):
        return varsayilan
    return max(lo, min(hi, n))


def kod_uret():
    c = db()
    for _ in range(20):
        kod = ''.join(secrets.choice(KOD_ABC) for _ in range(8))
        if not c.execute('SELECT 1 FROM shares WHERE code=?', (kod,)).fetchone():
            return kod
    raise ApiError(500, 'server')


# sıralama: seri ↓, toplam gün ↓, o değere önce ulaşan ↑ (liste ve rank aynı kuralı kullanır)
LB_ORDER = 's.streak DESC, s.days DESC, s.t ASC, s.user_id ASC'
LB_BETTER = '(s.streak>? OR (s.streak=? AND s.days>?) OR (s.streak=? AND s.days=? AND s.t<?) OR (s.streak=? AND s.days=? AND s.t=? AND s.user_id<?))'


def rank_of(uid, country=None):
    c = db()
    s = c.execute('SELECT * FROM stats WHERE user_id=?', (uid,)).fetchone()
    if not s:
        return None
    args = (s['streak'], s['streak'], s['days'], s['streak'], s['days'], s['t'], s['streak'], s['days'], s['t'], s['user_id'])
    where = f'u.lb_optin=1 AND {LB_BETTER}'
    extra = ()
    if country:
        where += ' AND u.country=?'
        extra = (country,)
    pos = c.execute(f'SELECT COUNT(*) FROM stats s JOIN users u ON u.id=s.user_id WHERE {where}', args + extra).fetchone()[0] + 1
    total = c.execute('SELECT COUNT(*) FROM stats s JOIN users u ON u.id=s.user_id WHERE u.lb_optin=1' + (' AND u.country=?' if country else ''), extra).fetchone()[0]
    return {'rank': pos, 'total': total, 'streak': s['streak'], 'days': s['days']}


def temizlik():
    """Günlük temizlik: süresi dolan paylaşımlar ve belirteçler, eski oran kayıtları."""
    c = db()
    with _lock:
        c.execute('DELETE FROM shares WHERE expires<?', (now(),))
        c.execute('DELETE FROM sessions WHERE created<?', (now() - TOKEN_SURE,))
        t = time.time()
        for k in [k for k, v in _buckets.items() if not v or t - v[-1] > 3600]:
            _buckets.pop(k, None)
        for k in [k for k, v in _fails.items() if not v or t - v[-1] > KILIT_SURE]:
            _fails.pop(k, None)


def temizlik_dongusu():
    while True:
        time.sleep(3600)
        try:
            temizlik()
        except Exception as e:
            sys.stderr.write('temizlik hatasi %r\n' % e)


class ApiError(Exception):
    def __init__(self, status, code, **extra):
        self.status, self.code, self.extra = status, code, extra


def sifre_kontrol(u, pw, ip):
    """Şifre doğrulama + kilit (5 yanlış / 15 dk, kullanıcı adı + IP). Doğruysa kullanıcı satırı; yanlışsa ApiError."""
    key = (u.lower(), ip)
    t = time.time()
    arr = [x for x in _fails.get(key, []) if t - x < KILIT_SURE]
    _fails[key] = arr
    if len(arr) >= KILIT_N:
        raise ApiError(423, 'locked', until=int(arr[0] + KILIT_SURE))
    user = user_by_name(u)
    ok = pin_ok(pw, user['pw_hash']) if user else pin_ok(pw, _DUMMY) and False
    if not ok:
        arr.append(t)
        left = KILIT_N - len(arr)
        if left <= 0:
            raise ApiError(423, 'locked', until=int(arr[0] + KILIT_SURE))
        raise ApiError(401, 'wrong', left=left)
    _fails.pop(key, None)
    return user


# ---------- uçlar ----------
def handle(method, path, q, body, headers, ip):
    p = path[len('/api'):] if path.startswith('/api') else path
    p = p.rstrip('/') or '/'
    auth = headers.get('Authorization') or ''
    tok = auth[7:] if auth.startswith('Bearer ') else ''
    me = None

    def need():
        nonlocal me
        me = user_by_token(tok)
        if not me:
            raise ApiError(401, 'auth')
        return me

    def s(v, n):
        return str(v if v is not None else '')[:n]

    if p == '/health':
        return {'ok': True, 't': now()}

    if p == '/users/check' and method == 'GET':
        u = (q.get('u') or [''])[0].strip()
        prob = name_problem(u)
        if prob in ('bad', 'rude'):
            return {'free': False, 'reason': prob, 'suggestions': []}
        if prob == 'taken' or taken(u):
            return {'free': False, 'reason': 'taken', 'suggestions': suggest_free(u)}
        return {'free': True, 'suggestions': []}

    if p == '/register' and method == 'POST':
        if not rate('register', ip, 5, 3600):
            raise ApiError(429, 'rate')
        u = s(body.get('username'), 40).strip()
        pw = body.get('password')
        prob = name_problem(u)
        if prob == 'rude':
            raise ApiError(400, 'rude')
        if prob == 'bad':
            raise ApiError(400, 'bad')
        if not isinstance(pw, str) or len(pw) < 8 or len(pw) > 200:
            raise ApiError(400, 'weak')
        cs = consent_oku(body)
        if not (cs['kvkk'] and cs['terms'] and cs['ver'] == RIZA_SURUM):
            raise ApiError(400, 'consent')
        lang = clean_lang(body.get('lang'))
        lb = cs['lb_optin'] is True
        with _lock:
            if prob == 'taken' or taken(u):
                raise ApiError(409, 'taken', suggestions=suggest_free(u))
            c = db()
            cur = c.execute('INSERT INTO users(username,pw_hash,created,lang,country,lb_optin,last_seen) VALUES(?,?,?,?,?,?,?)',
                            (u, pin_hash(pw), now(), lang, clean_country(body.get('country')), int(lb), now()))
            uid = cur.lastrowid
            consent_yaz(uid, cs, ip, lang, lb)
            tok = new_session(uid)
        hit('register', ip)
        return {'token': tok, 'user': pub_user(db().execute('SELECT * FROM users WHERE id=?', (uid,)).fetchone())}

    if p == '/login' and method == 'POST':
        if not rate('login', ip, 10, KILIT_SURE):
            raise ApiError(429, 'rate')
        hit('login', ip)
        u = s(body.get('username'), 40).strip()
        pw = body.get('password')
        if not isinstance(pw, str) or not UNAME_RE.match(u):
            raise ApiError(401, 'wrong', left=KILIT_N)
        user = sifre_kontrol(u, pw, ip)
        with _lock:
            tok = new_session(user['id'])
        return {'token': tok, 'user': pub_user(user)}

    if p == '/logout' and method == 'POST':
        if tok:
            db().execute('DELETE FROM sessions WHERE token_hash=?', (hashlib.sha256(tok.encode()).hexdigest(),))
        return {'ok': True}

    if p == '/me' and method == 'GET':
        need()
        return {'user': pub_user(me)}

    if p == '/password' and method == 'POST':
        need()
        old, yeni = body.get('old'), body.get('new')
        if not isinstance(yeni, str) or len(yeni) < 8 or len(yeni) > 200:
            raise ApiError(400, 'weak')
        sifre_kontrol(me['username'], old if isinstance(old, str) else '', ip)
        with _lock:
            c = db()
            c.execute('UPDATE users SET pw_hash=? WHERE id=?', (pin_hash(yeni), me['id']))
            c.execute('DELETE FROM sessions WHERE user_id=?', (me['id'],))   # tüm eski belirteçler düşer
            yeni_tok = new_session(me['id'])
        return {'ok': True, 'token': yeni_tok}

    if p == '/consent' and method == 'POST':
        need()
        cs = consent_oku(body)
        if not (cs['kvkk'] and cs['terms']):
            raise ApiError(400, 'consent')
        if not cs['ver']:
            cs['ver'] = RIZA_SURUM
        lb = cs['lb_optin'] if cs['lb_optin'] is not None else bool(me['lb_optin'])
        with _lock:
            c = db()
            consent_yaz(me['id'], cs, ip, me['lang'], lb)
            c.execute('UPDATE users SET lb_optin=? WHERE id=?', (int(lb), me['id']))
            if not cs['health']:
                # açık rıza geri çekildi: sunucudaki sağlık verisi silinir (cihazdaki kalır), sıralama katılımı da düşer
                c.execute('DELETE FROM data WHERE user_id=?', (me['id'],))
            if not lb:
                c.execute('DELETE FROM stats WHERE user_id=?', (me['id'],))
        u2 = db().execute('SELECT * FROM users WHERE id=?', (me['id'],)).fetchone()
        return {'ok': True, 'consent': pub_user(u2)['consent'], 'lb_optin': bool(u2['lb_optin'])}

    if p == '/data':
        need()
        if method == 'GET':
            d = data_row(me['id'])
            return {'rev': d['rev'] if d else 0, 'updated_at': d['updated_at'] if d else 0, 'data': blob_oku(d['blob']) if d else None}
        if method == 'PUT':
            if not saglik_rizasi(me):
                raise ApiError(403, 'consent', ver=RIZA_SURUM)
            veri = body.get('data')
            if not isinstance(veri, dict):
                raise ApiError(400, 'bad')
            base = tam_sayi(body.get('base_rev'), 0, 10**12, -1)
            if base < 0:
                raise ApiError(400, 'bad')
            upd = tam_sayi(body.get('updated_at'), 0, 10**14)
            raw = json.dumps(veri, separators=(',', ':'), ensure_ascii=False).encode()
            if len(raw) > MAX_GOVDE:
                raise ApiError(413, 'too_big')
            with _lock:
                c = db()
                d = data_row(me['id'])
                rev = d['rev'] if d else 0
                if base != rev:
                    return ApiError(409, 'conflict', rev=rev, updated_at=d['updated_at'] if d else 0, data=blob_oku(d['blob']) if d else None)
                rev += 1
                c.execute('INSERT INTO data(user_id,blob,rev,updated_at,server_t) VALUES(?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET blob=excluded.blob, rev=excluded.rev, updated_at=excluded.updated_at, server_t=excluded.server_t',
                          (me['id'], zlib.compress(raw, 6), rev, upd, now()))
            return {'rev': rev}

    if p == '/export' and method == 'GET':
        need()
        c = db()
        d = data_row(me['id'])
        rizalar = [dict(r) for r in c.execute('SELECT ver,kvkk,terms,health,lb_optin,ip24,lang,t FROM consents WHERE user_id=? ORDER BY t', (me['id'],))]
        st = c.execute('SELECT streak,days,water_avg,t FROM stats WHERE user_id=?', (me['id'],)).fetchone()
        gonderilen = [{'code': r['code'], 'kind': r['kind'], 'title': r['title'], 'to': r['to'], 'created': r['created'], 'expires': r['expires']}
                      for r in c.execute('SELECT s.code,s.kind,s.title,s.created,s.expires,u.username AS "to" FROM shares s LEFT JOIN users u ON u.id=s.to_id WHERE s.from_id=? ORDER BY s.created', (me['id'],))]
        gelen = [{'code': r['code'], 'kind': r['kind'], 'title': r['title'], 'from': r['from'], 'created': r['created'], 'seen': bool(r['seen'])}
                 for r in c.execute('SELECT s.code,s.kind,s.title,s.created,s.seen,u.username AS "from" FROM shares s JOIN users u ON u.id=s.from_id WHERE s.to_id=? ORDER BY s.created', (me['id'],))]
        return {'exported_at': now(), 'user': pub_user(me), 'consents': rizalar, 'data': blob_oku(d['blob']) if d else None,
                'stats': dict(st) if st else None, 'shares_sent': gonderilen, 'shares_received': gelen}

    if p == '/account' and method == 'DELETE':
        need()
        pw = body.get('password')
        sifre_kontrol(me['username'], pw if isinstance(pw, str) else '', ip)
        with _lock:
            c = db()
            for tbl, col in (('sessions', 'user_id'), ('data', 'user_id'), ('consents', 'user_id'), ('stats', 'user_id'), ('shares', 'from_id'), ('shares', 'to_id')):
                c.execute(f'DELETE FROM {tbl} WHERE {col}=?', (me['id'],))
            c.execute('DELETE FROM users WHERE id=?', (me['id'],))
            c.execute('INSERT INTO deletions(t,hash) VALUES(?,?)', (now(), hashlib.sha256(me['username'].lower().encode()).hexdigest()))
        return {'ok': True}

    if p == '/share' and method == 'POST':
        need()
        if not rate('share', me['id'], 20, 3600):
            raise ApiError(429, 'rate')
        kind = body.get('kind')
        if kind not in ('program', 'yenen'):
            raise ApiError(400, 'bad')
        payload = body.get('payload')
        if not isinstance(payload, (dict, list)):
            raise ApiError(400, 'bad')
        raw = json.dumps(payload, separators=(',', ':'), ensure_ascii=False).encode()
        if len(raw) > MAX_PAYLASIM:
            raise ApiError(413, 'too_big')
        title = s(body.get('title'), 80).strip()
        to = body.get('to')
        to_id = None
        if to is not None:
            to = s(to, 40).strip()
            alici = user_by_name(to) if UNAME_RE.match(to) else None
            if not alici:
                raise ApiError(404, 'no_user')
            if alici['id'] == me['id']:
                raise ApiError(400, 'self')
            to_id = alici['id']
        with _lock:
            kod = kod_uret()
            db().execute('INSERT INTO shares(code,from_id,to_id,kind,title,payload,created,expires) VALUES(?,?,?,?,?,?,?,?)',
                         (kod, me['id'], to_id, kind, title, zlib.compress(raw, 6), now(), now() + PAYLASIM_SURE))
        hit('share', me['id'])
        return {'code': kod, 'expires': now() + PAYLASIM_SURE}

    m = re.fullmatch(r'/share/([A-Za-z0-9]{8})(/seen)?', p)
    if m:
        kod = m.group(1).upper()
        c = db()
        r = c.execute('SELECT s.*, u.username AS from_name FROM shares s JOIN users u ON u.id=s.from_id WHERE s.code=? AND s.expires>?', (kod, now())).fetchone()
        if not r:
            raise ApiError(404, 'not_found')
        if m.group(2) and method == 'POST':
            need()
            if r['to_id'] != me['id']:
                raise ApiError(403, 'forbidden')
            c.execute('UPDATE shares SET seen=1 WHERE code=?', (kod,))
            return {'ok': True}
        if not m.group(2) and method == 'GET':
            # alıcıya adreslenmiş paylaşım yalnız alıcıya; `to` boşsa kodu bilen açar
            if r['to_id'] is not None:
                need()
                if me['id'] not in (r['to_id'], r['from_id']):
                    raise ApiError(403, 'forbidden')
            return {'kind': r['kind'], 'from': r['from_name'], 'title': r['title'], 'payload': blob_oku(r['payload']), 'created': r['created'], 'expires': r['expires']}

    if p == '/inbox' and method == 'GET':
        need()
        rows = db().execute('SELECT s.code,s.kind,s.title,s.created,s.seen,u.username AS from_name FROM shares s JOIN users u ON u.id=s.from_id WHERE s.to_id=? AND s.expires>? ORDER BY s.created DESC LIMIT 50',
                            (me['id'], now())).fetchall()
        return [{'code': r['code'], 'kind': r['kind'], 'from': r['from_name'], 'title': r['title'], 'created': r['created'], 'seen': bool(r['seen'])} for r in rows]

    if p == '/stats' and method == 'PUT':
        need()
        if not me['lb_optin']:
            return {}
        days = tam_sayi(body.get('days'), 0, 36500)
        streak = min(tam_sayi(body.get('streak'), 0, 3650), days)
        water = tam_sayi(body.get('water_avg'), 0, 20000)
        with _lock:
            c = db()
            eski = c.execute('SELECT streak,days,t FROM stats WHERE user_id=?', (me['id'],)).fetchone()
            t = eski['t'] if eski and eski['streak'] == streak and eski['days'] == days else time.time()
            c.execute('INSERT INTO stats(user_id,streak,days,water_avg,t) VALUES(?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET streak=excluded.streak, days=excluded.days, water_avg=excluded.water_avg, t=excluded.t',
                      (me['id'], streak, days, water, t))
            if body.get('country') is not None:
                c.execute('UPDATE users SET country=? WHERE id=?', (clean_country(body.get('country')), me['id']))
        rk = rank_of(me['id'])
        return {'rank': rk['rank'] if rk else None, 'total': rk['total'] if rk else 0}

    if p == '/leaderboard' and method == 'GET':
        if tok:
            me = user_by_token(tok)
        scope = (q.get('scope') or ['world'])[0]
        limit = max(1, min(100, tam_sayi((q.get('limit') or ['100'])[0], 1, 100, 100)))
        c = db()
        cc = ''
        if scope == 'country':
            cc = clean_country((q.get('country') or [''])[0]) or (me['country'] if me else '')
            rows = c.execute(f'SELECT u.username,u.country,s.streak,s.days FROM stats s JOIN users u ON u.id=s.user_id WHERE u.lb_optin=1 AND u.country=? ORDER BY {LB_ORDER} LIMIT ?', (cc, limit)).fetchall() if cc else []
        else:
            rows = c.execute(f'SELECT u.username,u.country,s.streak,s.days FROM stats s JOIN users u ON u.id=s.user_id WHERE u.lb_optin=1 ORDER BY {LB_ORDER} LIMIT ?', (limit,)).fetchall()
        out = [{'rank': i + 1, 'username': r['username'], 'country': r['country'], 'streak': r['streak'], 'days': r['days']} for i, r in enumerate(rows)]
        mine = None
        if me and me['lb_optin'] and (q.get('me') or [''])[0] == '1':
            mine = rank_of(me['id'], cc if scope == 'country' else None)
        return {'rows': out, 'me': mine, 'scope': scope, 'country': cc}

    raise ApiError(404, 'not_found')


class H(BaseHTTPRequestHandler):
    server_version = 'LifeFit/1'
    static = None

    def log_message(self, fmt, *a):
        if os.environ.get('LF_LOG'):
            sys.stderr.write('%s %s\n' % (self.address_string(), fmt % a))

    def ip(self):
        return (self.headers.get('X-Forwarded-For') or self.client_address[0]).split(',')[0].strip()

    def origin_ok(self):
        o = self.headers.get('Origin')
        return o if o and (o == 'null' or o in ORIGINS or DEV_ORIGIN.match(o)) else None

    def guvenlik(self, cache='no-store'):
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('Cache-Control', cache)
        o = self.origin_ok()
        if o:
            self.send_header('Access-Control-Allow-Origin', o)
            self.send_header('Vary', 'Origin')

    def send_json(self, status, obj):
        raw = json.dumps(obj, ensure_ascii=False, separators=(',', ':')).encode()
        gz = 'gzip' in (self.headers.get('Accept-Encoding') or '') and len(raw) > 1400
        if gz:
            raw = gzip.compress(raw, 5)
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.guvenlik()
        if gz:
            self.send_header('Content-Encoding', 'gzip')
        self.send_header('Content-Length', str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_OPTIONS(self):
        self.send_response(204 if self.origin_ok() or not self.headers.get('Origin') else 403)
        self.guvenlik()
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Access-Control-Max-Age', '86400')
        self.send_header('Content-Length', '0')
        self.end_headers()

    def route(self, method):
        u = urlparse(self.path)
        if u.path.startswith('/api/') or (not self.static and u.path != '/'):
            ip = self.ip()
            if not rate('genel', ip, 120, 60):
                return self.send_json(429, {'error': 'rate'})
            hit('genel', ip)
            body = {}
            n = int(self.headers.get('Content-Length') or 0)
            if n > MAX_GOVDE:
                return self.send_json(413, {'error': 'too_big'})
            if method in ('POST', 'PUT', 'DELETE') and n:
                try:
                    body = json.loads(self.rfile.read(n) or b'{}')
                    if not isinstance(body, dict):
                        body = {}
                except Exception:
                    return self.send_json(400, {'error': 'json'})
            try:
                out = handle(method, u.path, parse_qs(u.query), body, self.headers, ip)
                if isinstance(out, ApiError):   # 409 gibi gövdeli "hata"
                    return self.send_json(out.status, {'error': out.code, **out.extra})
                return self.send_json(200, out)
            except ApiError as e:
                return self.send_json(e.status, {'error': e.code, **e.extra})
            except Exception as e:  # beklenmeyen hata: ayrıntıyı istemciye verme
                sys.stderr.write('ERR %s %s %r\n' % (method, u.path, e))
                return self.send_json(500, {'error': 'server'})
        if self.static and method == 'POST' and u.path.startswith('/SONUC_'):
            # geliştirme: tarayıcı testleri sonuçlarını buraya gönderir, ekrana basılır
            n = int(self.headers.get('Content-Length') or 0)
            raw = self.rfile.read(min(n, MAX_GOVDE)) if n else b''
            print('--- %s ---\n%s\n--- bitti ---' % (u.path[1:], raw.decode('utf-8', 'replace')), flush=True)
            self.send_response(200); self.send_header('Content-Length', '0'); self.guvenlik(); self.end_headers()
            return
        if method != 'GET':
            self.send_response(405); self.send_header('Content-Length', '0'); self.end_headers(); return
        return self.serve_static(u.path)

    def serve_static(self, path):
        root = os.path.realpath(self.static or '.')
        rel = path.lstrip('/') or 'index.html'
        fp = os.path.realpath(os.path.join(root, rel))
        if os.path.isdir(fp):
            fp = os.path.join(fp, 'index.html')
        if not fp.startswith(root) or not os.path.isfile(fp):
            self.send_response(404); self.send_header('Content-Length', '0'); self.end_headers(); return
        ctype = mimetypes.guess_type(fp)[0] or 'application/octet-stream'
        if fp.endswith('.js') or fp.endswith('.mjs'):
            ctype = 'text/javascript'
        if fp.endswith('.webmanifest'):
            ctype = 'application/manifest+json'
        with open(fp, 'rb') as f:
            raw = f.read()
        self.send_response(200)
        self.send_header('Content-Type', ctype + ('; charset=utf-8' if ctype.startswith('text') or 'json' in ctype else ''))
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Content-Length', str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self): self.route('GET')
    def do_POST(self): self.route('POST')
    def do_PUT(self): self.route('PUT')
    def do_DELETE(self): self.route('DELETE')


def main():
    args = sys.argv[1:]
    port = 8097
    if '--static' in args:
        i = args.index('--static'); H.static = args[i + 1]; del args[i:i + 2]
    if args:
        port = int(args[0])
    init_db()
    temizlik()
    threading.Thread(target=temizlik_dongusu, daemon=True).start()
    srv = ThreadingHTTPServer((os.environ.get('LF_HOST', '127.0.0.1'), port), H)
    srv.daemon_threads = True
    print(f'LifeFit API :{port} db={DB_PATH} static={H.static}', flush=True)
    srv.serve_forever()


if __name__ == '__main__':
    main()
