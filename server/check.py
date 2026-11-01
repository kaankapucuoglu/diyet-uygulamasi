"""LifeRoutine sunucu testi: geçici DB + boş port üzerinde gerçek HTTP. Kullanım: python server/check.py
Kapsam: kayıt / giriş / yanlış şifre kilidi / rıza zorunluluğu / veri PUT-GET-409 / paylaşım + gelen kutusu /
sıralama opt-in / şifre değişince eski belirteç düşer / dışa aktarma / hesap silme / oran sınırları / CORS / gövde sınırı."""
import json, os, socket, sys, tempfile, threading, time, urllib.request, urllib.error

tmp = tempfile.mkdtemp()
os.environ['LF_DB'] = os.path.join(tmp, 't.sqlite')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import server  # noqa: E402

s = socket.socket(); s.bind(('127.0.0.1', 0)); PORT = s.getsockname()[1]; s.close()
server.init_db()
srv = server.ThreadingHTTPServer(('127.0.0.1', PORT), server.H)
threading.Thread(target=srv.serve_forever, daemon=True).start()
B = f'http://127.0.0.1:{PORT}/api'
ok = bad = 0
RIZA = {'kvkk': True, 'terms': True, 'health': True, 'ver': server.RIZA_SURUM}


def call(m, p, body=None, tok=None, headers=None, raw=None):
    h = {'Content-Type': 'application/json'}
    if tok:
        h['Authorization'] = 'Bearer ' + tok
    h.update(headers or {})
    data = raw if raw is not None else (json.dumps(body).encode() if body is not None else None)
    r = urllib.request.Request(B + p, method=m, headers=h, data=data)
    try:
        with urllib.request.urlopen(r) as x:
            out = x.read(); return x.status, (json.loads(out) if out else {}), x.headers
    except urllib.error.HTTPError as e:
        out = e.read()
        try:
            j = json.loads(out) if out else {}
        except Exception:
            j = {}
        return e.code, j, e.headers


def check(name, cond):
    global ok, bad
    if cond:
        ok += 1
    else:
        bad += 1; print('FAIL', name)


def kayit(u, pw='sifre1234', **ek):
    server.rate_reset()
    st, j, _ = call('POST', '/register', {'username': u, 'password': pw, 'lang': 'tr', 'consent': RIZA, **ek})
    return st, j


# --- sağlık, kullanıcı adı denetimi ---
st, j, h = call('GET', '/health'); check('health', st == 200 and j.get('ok') is True and 't' in j)
check('security headers', h.get('X-Content-Type-Options') == 'nosniff' and h.get('Cache-Control') == 'no-store' and h.get('Referrer-Policy') == 'no-referrer')
st, j, _ = call('GET', '/users/check?u=kaan'); check('check free', j.get('free') is True)
st, j, _ = call('GET', '/users/check?u=1abc'); check('check format', j.get('free') is False and j.get('reason') == 'bad')
st, j, _ = call('GET', '/users/check?u=orospu1'); check('check rude', j.get('free') is False and j.get('reason') == 'rude')
st, j, _ = call('GET', '/users/check?u=musiki'); check('check innocent', j.get('free') is True)
st, j, _ = call('GET', '/users/check?u=admin'); check('check reserved', j.get('free') is False)

# --- kayıt ---
st, j = kayit('kaan'); check('register', st == 200 and j.get('token') and j['user']['username'] == 'kaan' and j['user']['consent']['health'] is True); T1 = j.get('token')
st, j = kayit('KAAN'); check('taken nocase + suggestions', st == 409 and j.get('error') == 'taken' and len(j.get('suggestions', [])) >= 2)
st, j, _ = call('GET', '/users/check?u=Kaan'); check('check taken + suggest', j.get('free') is False and j.get('suggestions'))
st, j = kayit('bob_x', pw='kisa'); check('weak password', st == 400 and j.get('error') == 'weak')
st, j = kayit('1bob'); check('bad name', st == 400 and j.get('error') == 'bad')
st, j = kayit('orospu2'); check('rude name', st == 400 and j.get('error') == 'rude')
server.rate_reset()
st, j, _ = call('POST', '/register', {'username': 'rizasiz', 'password': 'sifre1234', 'lang': 'tr', 'consent': {'kvkk': True, 'terms': False, 'health': True, 'ver': server.RIZA_SURUM}})
check('consent terms required', st == 400 and j.get('error') == 'consent')
st, j, _ = call('POST', '/register', {'username': 'rizasiz', 'password': 'sifre1234', 'lang': 'tr', 'consent': {'kvkk': True, 'terms': True, 'health': True, 'ver': '2020-01-01'}})
check('consent old version', st == 400 and j.get('error') == 'consent')
st, j = kayit('mehmet', country='DE'); T2 = j.get('token'); check('register2', st == 200 and j['user']['country'] == 'DE')
# sağlık rızası olmadan hesap açılabilir (eşitleme kapalı kalır)
server.rate_reset()
st, j, _ = call('POST', '/register', {'username': 'ayse', 'password': 'sifre1234', 'lang': 'de', 'consent': {'kvkk': True, 'terms': True, 'health': False, 'ver': server.RIZA_SURUM}})
T3 = j.get('token'); check('register without health consent', st == 200 and j['user']['consent']['health'] is False)

# --- giriş / kilit ---
server.rate_reset()
st, j, _ = call('POST', '/login', {'username': 'kaan', 'password': 'yanlis123'}); check('wrong pw + left', st == 401 and j.get('error') == 'wrong' and j.get('left') == 4)
st, j, _ = call('POST', '/login', {'username': 'yokboyle', 'password': 'yanlis123'}); check('unknown user looks the same', st == 401 and j.get('error') == 'wrong')
st, j, _ = call('POST', '/login', {'username': 'Kaan', 'password': 'sifre1234'}); check('login nocase', st == 200 and j['user']['username'] == 'kaan'); T1b = j.get('token')
st, j, _ = call('GET', '/me', None, T1b); check('me', st == 200 and j['user']['id'] == 1 and j['user']['rev'] == 0)
st, j, _ = call('GET', '/me', None, 'bozuk'); check('bad token', st == 401)
server.rate_reset()
for i in range(4):
    call('POST', '/login', {'username': 'mehmet', 'password': 'yanlis000'})
st, j, _ = call('POST', '/login', {'username': 'mehmet', 'password': 'yanlis000'}); check('5th wrong → locked', st == 423 and j.get('error') == 'locked' and j.get('until', 0) > time.time())
st, j, _ = call('POST', '/login', {'username': 'mehmet', 'password': 'sifre1234'}); check('locked even with right pw', st == 423)
server._fails.clear()
st, j, _ = call('POST', '/login', {'username': 'mehmet', 'password': 'sifre1234'}); check('login after unlock', st == 200)

# --- rıza zorunluluğu ---
st, j, _ = call('PUT', '/data', {'base_rev': 0, 'updated_at': 1, 'data': {'v': 2}}, T3); check('put without health consent → 403', st == 403 and j.get('error') == 'consent')
st, j, _ = call('POST', '/consent', {'kvkk': True, 'terms': True, 'health': True, 'ver': server.RIZA_SURUM}, T3); check('consent update', st == 200 and j['consent']['health'] is True)
st, j, _ = call('PUT', '/data', {'base_rev': 0, 'updated_at': 1, 'data': {'v': 2}}, T3); check('put after consent', st == 200 and j.get('rev') == 1)
st, j, _ = call('POST', '/consent', {'kvkk': True, 'terms': True, 'health': False, 'ver': server.RIZA_SURUM}, T3); check('consent withdraw', st == 200 and j['consent']['health'] is False)
st, j, _ = call('GET', '/data', None, T3); check('withdraw deletes server data', st == 200 and j.get('data') is None and j.get('rev') == 0)
st, j, _ = call('PUT', '/data', {'base_rev': 0, 'updated_at': 1, 'data': {'v': 2}}, T3); check('put blocked again', st == 403)
n_riza = server.db().execute('SELECT COUNT(*) FROM consents WHERE user_id=3').fetchone()[0]; check('consent log rows', n_riza == 3)
ipr = server.db().execute('SELECT ip24 FROM consents WHERE user_id=3').fetchone()[0]; check('consent ip shortened', ipr == '127.0.0.0')

# --- veri: put / get / 409 birleştirme ---
st, j, _ = call('GET', '/data', None, T1); check('data empty', st == 200 and j['data'] is None and j['rev'] == 0)
V1 = {'v': 2, 'guncel': 1000, 'profil': {'ad': 'Kaan'}, 'kayit': {'2026-11-01': {'yendi': {'kahvalti': True}, 'su': 3}}}
st, j, _ = call('PUT', '/data', {'base_rev': 0, 'updated_at': 1000, 'data': V1}, T1); check('data put', st == 200 and j['rev'] == 1)
st, j, _ = call('GET', '/data', None, T1b); check('data get other session', st == 200 and j['rev'] == 1 and j['updated_at'] == 1000 and j['data']['profil']['ad'] == 'Kaan')
V2 = dict(V1, guncel=2000, kayit={'2026-11-01': {'yendi': {'kahvalti': True, 'ogle': True}, 'su': 4}})
st, j, _ = call('PUT', '/data', {'base_rev': 1, 'updated_at': 2000, 'data': V2}, T1b); check('data put rev2', st == 200 and j['rev'] == 2)
# ilk cihaz eski rev ile gönderir → 409 + sunucudaki güncel veri
st, j, _ = call('PUT', '/data', {'base_rev': 1, 'updated_at': 3000, 'data': dict(V1, guncel=3000)}, T1)
check('stale base_rev → 409 with data', st == 409 and j.get('error') == 'conflict' and j['rev'] == 2 and j['data']['kayit']['2026-11-01']['su'] == 4)
st, j, _ = call('PUT', '/data', {'base_rev': 2, 'updated_at': 3000, 'data': dict(V2, guncel=3000)}, T1); check('merged resend', st == 200 and j['rev'] == 3)
st, j, _ = call('GET', '/me', None, T1); check('me rev', j['user']['rev'] == 3 and j['user']['updated_at'] == 3000)
st, j, _ = call('PUT', '/data', {'base_rev': 3, 'data': 'metin'}, T1); check('data must be object', st == 400)
st, j, _ = call('PUT', '/data', {'base_rev': 3, 'data': {}}); check('data needs auth', st == 401)
st, j, _ = call('PUT', '/data', None, T1, raw=b'{bozuk'); check('bad json', st == 400 and j.get('error') == 'json')
st, j, _ = call('PUT', '/data', None, T1, raw=b'{"a":"' + b'x' * 2_100_000 + b'"}'); check('body > 2 MB → 413', st == 413)

# --- paylaşım + gelen kutusu ---
PROG = {'v': 1, 'a': 'Mehmet', 'h': 'Dyt. Kaan', 'o': [['kahvalti', '08:00']], 'g': [[[['yumurta', 2]]]]}
st, j, _ = call('POST', '/share', {'kind': 'program', 'to': 'mehmet', 'payload': PROG, 'title': 'Haftalık program'}, T1); check('share to user', st == 200 and len(j.get('code', '')) == 8); KOD = j.get('code', '')
st, j, _ = call('GET', '/share/' + KOD, None, T2); check('share get by recipient', st == 200 and j['kind'] == 'program' and j['from'] == 'kaan' and j['payload']['a'] == 'Mehmet' and j['title'] == 'Haftalık program')
st, j, _ = call('GET', '/share/' + KOD.lower(), None, T1); check('share get by sender (lowercase code)', st == 200)
st, j, _ = call('GET', '/share/' + KOD, None, T3); check('addressed share hidden from others', st == 403)
st, j, _ = call('GET', '/share/' + KOD); check('addressed share needs auth', st == 401)
st, j, _ = call('GET', '/inbox', None, T2); check('inbox has 1 unseen', st == 200 and len(j) == 1 and j[0]['code'] == KOD and j[0]['seen'] is False and j[0]['from'] == 'kaan')
st, j, _ = call('GET', '/inbox', None, T1); check('sender inbox empty', st == 200 and j == [])
st, j, _ = call('POST', '/share/' + KOD + '/seen', None, T1); check('seen only by recipient', st == 403)
st, j, _ = call('POST', '/share/' + KOD + '/seen', None, T2); check('seen', st == 200)
st, j, _ = call('GET', '/inbox', None, T2); check('inbox seen flag', j[0]['seen'] is True)
st, j, _ = call('POST', '/share', {'kind': 'yenen', 'to': None, 'payload': {'v': 1, 'd': '2026-11-01', 'o': []}, 'title': ''}, T1); check('share by code only', st == 200); KOD2 = j.get('code', '')
st, j, _ = call('GET', '/share/' + KOD2); check('open code share without auth', st == 200 and j['kind'] == 'yenen')
st, j, _ = call('GET', '/share/ZZZZZZZZ'); check('unknown code', st == 404)
st, j, _ = call('POST', '/share', {'kind': 'program', 'to': 'yokboyle', 'payload': PROG, 'title': ''}, T1); check('share to unknown user', st == 404 and j.get('error') == 'no_user')
st, j, _ = call('POST', '/share', {'kind': 'program', 'to': 'kaan', 'payload': PROG, 'title': ''}, T1); check('share to self', st == 400)
st, j, _ = call('POST', '/share', {'kind': 'baska', 'to': None, 'payload': PROG, 'title': ''}, T1); check('share bad kind', st == 400)
st, j, _ = call('POST', '/share', {'kind': 'program', 'payload': PROG}); check('share needs auth', st == 401)
for i in range(18):
    call('POST', '/share', {'kind': 'yenen', 'to': None, 'payload': {'i': i}, 'title': ''}, T1)
st, j, _ = call('POST', '/share', {'kind': 'yenen', 'to': None, 'payload': {'i': 99}, 'title': ''}, T1); check('share 21st/hour → 429', st == 429 and j.get('error') == 'rate')
server._buckets.pop(('share', 1), None)
server.db().execute('UPDATE shares SET expires=? WHERE code=?', (int(time.time()) - 5, KOD2)); server.temizlik()
st, j, _ = call('GET', '/share/' + KOD2); check('expired share cleaned', st == 404)

# --- sıralama (opt-in) ---
st, j, _ = call('PUT', '/stats', {'streak': 5, 'days': 12, 'water_avg': 1800}, T1); check('stats without optin ignored', st == 200 and j == {})
st, j, _ = call('GET', '/leaderboard?scope=world'); check('lb empty', st == 200 and j['rows'] == [] and j['me'] is None)
st, j, _ = call('POST', '/consent', {'kvkk': True, 'terms': True, 'health': True, 'ver': server.RIZA_SURUM, 'lb_optin': True}, T1); check('optin', st == 200 and j['lb_optin'] is True)
st, j, _ = call('PUT', '/stats', {'streak': 5, 'days': 12, 'water_avg': 1800, 'country': 'TR'}, T1); check('stats → rank 1', st == 200 and j['rank'] == 1)
st, j, _ = call('POST', '/consent', {'kvkk': True, 'terms': True, 'health': True, 'ver': server.RIZA_SURUM, 'lb_optin': True}, T2)
st, j, _ = call('PUT', '/stats', {'streak': 7, 'days': 7}, T2); check('stats user2 rank 1', j['rank'] == 1)
st, j, _ = call('PUT', '/stats', {'streak': 99, 'days': 3}, T3)
st, j, _ = call('GET', '/leaderboard?scope=world&me=1', None, T1)
check('lb world order + me', st == 200 and [r['username'] for r in j['rows']] == ['mehmet', 'kaan'] and j['me']['rank'] == 2 and j['rows'][0]['streak'] == 7)
check('lb no health data', set(j['rows'][0].keys()) == {'rank', 'username', 'country', 'streak', 'days'})
st, j, _ = call('GET', '/leaderboard?scope=country&me=1', None, T1); check('lb country TR', [r['username'] for r in j['rows']] == ['kaan'] and j['me']['rank'] == 1)
st, j, _ = call('GET', '/leaderboard?scope=country&country=DE'); check('lb country anon', [r['username'] for r in j['rows']] == ['mehmet'] and j['me'] is None)
st, j, _ = call('POST', '/consent', {'kvkk': True, 'terms': True, 'health': True, 'ver': server.RIZA_SURUM, 'lb_optin': False}, T2); check('optout', j['lb_optin'] is False)
st, j, _ = call('GET', '/leaderboard?scope=world'); check('optout removed from lb', [r['username'] for r in j['rows']] == ['kaan'])
st, j, _ = call('PUT', '/stats', {'streak': 50, 'days': 10}, T1); check('streak clamped to days', st == 200)
st, j, _ = call('GET', '/leaderboard?scope=world'); check('clamp applied', j['rows'][0]['streak'] == 10)

# --- şifre değişikliği: eski belirteçler düşer ---
server.rate_reset()
st, j, _ = call('POST', '/password', {'old': 'yanlis123', 'new': 'yeniSifre99'}, T1); check('password wrong old', st == 401 and j.get('error') == 'wrong')
st, j, _ = call('POST', '/password', {'old': 'sifre1234', 'new': 'kisa'}, T1); check('password weak new', st == 400)
st, j, _ = call('POST', '/password', {'old': 'sifre1234', 'new': 'yeniSifre99'}, T1); check('password change', st == 200 and j.get('token')); T1n = j.get('token')
st, j, _ = call('GET', '/me', None, T1); check('old token dropped', st == 401)
st, j, _ = call('GET', '/me', None, T1b); check('other session dropped', st == 401)
st, j, _ = call('GET', '/me', None, T1n); check('new token works', st == 200)
server.rate_reset()
st, j, _ = call('POST', '/login', {'username': 'kaan', 'password': 'yeniSifre99'}); check('login new pw', st == 200); T1 = j.get('token')
st, j, _ = call('POST', '/logout', None, T1n); check('logout', st == 200)
st, j, _ = call('GET', '/me', None, T1n); check('logout drops token', st == 401)

# --- dışa aktarma ---
st, j, _ = call('GET', '/export', None, T1)
check('export', st == 200 and j['user']['username'] == 'kaan' and j['data']['kayit']['2026-11-01']['su'] == 4 and len(j['consents']) >= 2 and j['stats']['streak'] == 10 and any(x['code'] == KOD for x in j['shares_sent']))
st, j, _ = call('GET', '/export', None, T2); check('export received shares', any(x['code'] == KOD and x['from'] == 'kaan' for x in j['shares_received']))

# --- hesap silme ---
server.rate_reset()
st, j, _ = call('DELETE', '/account', {'password': 'yanlis123'}, T1); check('delete wrong pw', st == 401)
st, j, _ = call('DELETE', '/account', {'password': 'yeniSifre99'}, T1); check('delete account', st == 200)
st, j, _ = call('GET', '/me', None, T1); check('deleted token gone', st == 401)
st, j, _ = call('GET', '/users/check?u=kaan'); check('name free again', j.get('free') is True)
st, j, _ = call('GET', '/inbox', None, T2); check('shares of deleted user gone', st == 200 and j == [])
st, j, _ = call('GET', '/leaderboard?scope=world'); check('deleted user off lb', all(r['username'] != 'kaan' for r in j['rows']))
c = server.db()
check('all rows deleted', all(c.execute(f'SELECT COUNT(*) FROM {t} WHERE {k}=1').fetchone()[0] == 0 for t, k in (('users', 'id'), ('sessions', 'user_id'), ('data', 'user_id'), ('consents', 'user_id'), ('stats', 'user_id'), ('shares', 'from_id'))))
check('deletion log = time + hash only', c.execute('SELECT COUNT(*) FROM deletions').fetchone()[0] == 1 and len(c.execute('SELECT hash FROM deletions').fetchone()[0]) == 64)

# --- CORS ---
st, j, h = call('OPTIONS', '/data', headers={'Origin': 'https://diyet.maviplay.com'}); check('cors preflight prod', st == 204 and h.get('Access-Control-Allow-Origin') == 'https://diyet.maviplay.com')
st, j, h = call('OPTIONS', '/data', headers={'Origin': 'null'}); check('cors null origin (yerli kabuk)', st == 204 and h.get('Access-Control-Allow-Origin') == 'null')
st, j, h = call('OPTIONS', '/data', headers={'Origin': 'http://localhost:8099'}); check('cors dev origin', st == 204 and h.get('Access-Control-Allow-Origin') == 'http://localhost:8099')
st, j, h = call('OPTIONS', '/data', headers={'Origin': 'https://kotu.example'}); check('cors foreign origin refused', st == 403 and not h.get('Access-Control-Allow-Origin'))
st, j, h = call('GET', '/health', headers={'Origin': 'https://kotu.example'}); check('cors foreign origin no header', st == 200 and not h.get('Access-Control-Allow-Origin'))
st, j, _ = call('GET', '/yok'); check('404', st == 404)

# --- oran sınırları ---
server.rate_reset()
for i in range(5):
    call('POST', '/register', {'username': f'hizli{i}', 'password': 'sifre1234', 'lang': 'tr', 'consent': RIZA})
st, j, _ = call('POST', '/register', {'username': 'hizli9', 'password': 'sifre1234', 'lang': 'tr', 'consent': RIZA}); check('register 6th/hour → 429', st == 429)
server.rate_reset()
for i in range(10):
    call('POST', '/login', {'username': f'hizli{i % 5}', 'password': 'yanlis000'})
st, j, _ = call('POST', '/login', {'username': 'hizli0', 'password': 'sifre1234'}); check('login 11th/15min per IP → 429', st == 429)
server.rate_reset()
for i in range(120):
    call('GET', '/health')
st, j, _ = call('GET', '/health'); check('general 121st/min → 429', st == 429 and j.get('error') == 'rate')
server.rate_reset()
st, j, _ = call('GET', '/health'); check('after reset ok', st == 200)

print(f'{ok} ok / {bad} fail')
srv.shutdown()
sys.exit(1 if bad else 0)
