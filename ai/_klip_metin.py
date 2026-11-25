"""Klip metin gömmelerini yemek veritabanından YENİDEN üretir (yeni yemek eklenince çalıştırın). Pakete girmez (sync-web '_' ile başlayanı atlar).

Gerekenler (bir kez): pip install onnxruntime tokenizers numpy
  - TinyCLIP birleşik ONNX + tokenizer (MIT):
    https://huggingface.co/onnx-community/TinyCLIP-ViT-40M-32-Text-19M-LAION400M-ONNX  → onnx/model.onnx, tokenizer.json
  - db.json: uygulama tarayıcıda açıkken konsolda:
      copy(JSON.stringify({foods: YEMEKLER.map(f => ({id: f.id, n: f.n}))}))   → panodakini db.json olarak kaydedin
Kullanım (depo kökünden): python ai/_klip_metin.py model.onnx tokenizer.json db.json
Görüntü ağırlıkları ve ambalaj istemleri değişmez; yalnız klip.bin'deki metin bölümü ile klip.json'daki ids/metin güncellenir.
İstemler (ortalaması alınır): klip.json → metin.istem. Sıralama ölçümleri bu istemlerle yapıldı; değiştirirseniz yeniden ölçün.
"""
import json, os, re, sys
import numpy as np, onnxruntime as ort
from tokenizers import Tokenizer

AI = os.path.dirname(os.path.abspath(__file__))
mdl, tokf, dbf = sys.argv[1:4]
tok = Tokenizer.from_file(tokf)
sess = ort.InferenceSession(mdl, providers=['CPUExecutionProvider'])
meta = json.load(open(os.path.join(AI, 'klip.json'), encoding='utf-8'))
buf = bytearray(open(os.path.join(AI, 'klip.bin'), 'rb').read())
foods = json.load(open(dbf, encoding='utf-8'))['foods']

def enc(texts, bs=64):
    out = []
    for i in range(0, len(texts), bs):
        ids = [tok.encode(t).ids[:77] for t in texts[i:i + bs]]
        for x in ids:
            if len(x) == 77: x[-1] = 49407
        L = max(map(len, ids))
        a = np.full((len(ids), L), 49407, np.int64); m = np.zeros_like(a)
        for k, x in enumerate(ids): a[k, :len(x)] = x; m[k, :len(x)] = 1
        r = sess.run(['text_embeds'], {'input_ids': a, 'attention_mask': m, 'pixel_values': np.zeros((1, 3, 224, 224), np.float32)})[0]
        out.append(r / np.linalg.norm(r, axis=1, keepdims=True))
    return np.concatenate(out)

sade = lambda s: re.sub(r'\s+', ' ', s).strip()
tr = [sade(f['n'][0]) for f in foods]; en = [sade(f['n'][1]) for f in foods]
t = sum(enc([p.format(tr=a, en=b) for a, b in zip(tr, en)]) for p in meta['metin']['istem'])
t /= np.linalg.norm(t, axis=1, keepdims=True)
ts = (np.abs(t).max(1) / 127).astype(np.float32); tq = np.round(t / ts[:, None]).astype(np.int8)
paket = np.frombuffer(bytes(buf[meta['paket']['o']:meta['paket']['o'] + (meta['paket']['np'] + meta['paket']['nn']) * 512 * 4]), np.float32).copy()
# metin + paket bölümleri dosyanın sonundadır: kes, yeniden ekle
del buf[meta['metin']['o']:]
def koy(arr):
    while len(buf) % 4: buf.extend(b'\0')
    o = len(buf); buf.extend(arr.tobytes()); return o
meta['metin'].update(n=len(foods), o=koy(tq), so=koy(ts))
meta['paket']['o'] = koy(paket)
meta['ids'] = [f['id'] for f in foods]
open(os.path.join(AI, 'klip.bin'), 'wb').write(bytes(buf))
json.dump(meta, open(os.path.join(AI, 'klip.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print('metin gömmeleri:', len(foods), 'yemek; klip.bin', len(buf), 'bayt. Sonra: python kaynak/derle.py && npm run sync-web')
