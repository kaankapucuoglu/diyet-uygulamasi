"""Klip metin gömmelerini yemek veritabanından YENİDEN üretir (yeni yemek eklenince çalıştırın). Pakete girmez (sync-web '_' ile başlayanı atlar).

Gerekenler (bir kez): pip install onnxruntime tokenizers numpy
  - TinyCLIP birleşik ONNX + tokenizer (MIT):
    https://huggingface.co/onnx-community/TinyCLIP-ViT-40M-32-Text-19M-LAION400M-ONNX  → onnx/model.onnx, tokenizer.json
  - db.json: uygulama tarayıcıda açıkken konsolda:
      copy(JSON.stringify({foods: YEMEKLER.map(f => ({id: f.id, n: f.n}))}))   → panodakini db.json olarak kaydedin
Kullanım (depo kökünden):
  python ai/_klip_metin.py model.onnx tokenizer.json db.json   → yemek gömmeleri + "yiyecek mi?" kapısı yeniden üretilir
  python ai/_klip_metin.py model.onnx tokenizer.json --kapi    → yalnız kapı istemleri (KAPI_YIYECEK / KAPI_DEGIL) yeniden üretilir
Görüntü ağırlıkları ve ambalaj istemleri değişmez; klip.bin'in sonundaki metin / paket / kapı bölümleri ile klip.json güncellenir.
İstemler (ortalaması alınır): klip.json → metin.istem. Sıralama ölçümleri bu istemlerle yapıldı; değiştirirseniz yeniden ölçün.
Kapı (26.11): fotoğrafta yiyecek yoksa aday gösterilmez. softmax(T·cos) üzerinde [KAPI_YIYECEK + ambalaj istemleri] ↔ [KAPI_DEGIL grupları];
yiyecek-dışı kütle ≥ esik ise ret, neden = en güçlü grup (arayüz metni: p9e.js ftNeden_<grup>). Grup adı eklerseniz p9e.js'e metnini de ekleyin.
T ve esik 278 yiyecek + 16 sınır durumu + 191 yiyecek-dışı fotoğrafla seçildi (26.11: ret 181/191, yiyecekte yanlış ret 3/294);
istemleri değiştirirseniz yeniden ölçün (ölçüm betikleri depoda değil: ~/.maviplay/lr-foto-test/py2).
"""
import json, os, re, sys
import numpy as np, onnxruntime as ort
from tokenizers import Tokenizer

KAPI_YIYECEK = [
 'a photo of food.', 'a photo of a meal.', 'a photo of a dish of food on a plate.', 'a photo of a home-cooked meal.',
 'a photo of a snack.', 'a photo of fresh fruit.', 'a photo of vegetables.', 'a photo of a salad.', 'a photo of a dessert.',
 'a photo of a cake or pastry.', 'a photo of a drink in a glass.', 'a photo of a cup of tea or coffee.', 'a photo of nuts and seeds.',
 'a photo of bread.', 'a photo of a bowl of soup.', 'a photo of a breakfast table with food.', 'a photo of grilled meat.',
 'a photo of a cooked fish on a plate.', 'a photo of raw meat or fish at a market.', 'a photo of a packaged food product.',
 'a photo of a bottle or can of a drink.', 'a photo of a person eating food.', 'a photo of a hand holding food.',
 'a photo of food on a supermarket shelf.', 'a photo of fruits and vegetables at a market stall.', 'a photo of fast food.',
 'a photo of a sandwich.', 'a photo of ice cream.', 'a photo of sweets and candy.', 'a photo of cheese and olives.',
 'a photo of a mug of coffee.', 'a photo of a slice of fruit.', 'a photo of a child eating food.', 'a photo of cookies and biscuits.',
]
KAPI_DEGIL = {
 'insan': [
   'a photo of a person.', 'a portrait photo of a man.', 'a portrait photo of a woman.', 'a selfie of a person.',
   "a close-up photo of a person's face.", 'a photo of a baby.', 'a photo of a child.', 'a group photo of people.',
   'a photo of friends posing for a picture.', 'a photo of an elderly person.', 'a photo of a smiling person.',
 ],
 'el': [
   'a photo of a human hand.', 'a photo of fingers.', 'a photo of bare feet.', 'a photo of legs.', 'a photo of an arm.',
   'a photo of hair.',
 ],
 'hayvan': [
   'a photo of a dog.', 'a photo of a puppy.', 'a photo of a cat.', 'a photo of a kitten.', 'a photo of a bird.', 'a photo of a parrot.',
   'a photo of a horse.', 'a photo of a cow in a field.', 'a photo of sheep.', 'a photo of a goat.',
   'a photo of a live chicken in a farmyard.', 'a photo of a fish swimming in an aquarium.', 'a photo of a rabbit.',
   'a photo of a hamster.', 'a photo of a wild animal.', 'a photo of an insect.', 'a photo of a butterfly.', 'a photo of a turtle.',
   'a photo of a pet.',
 ],
 'bos': [
   'a photo of an empty plate.', 'a photo of an empty bowl.', 'a photo of an empty table.', 'a photo of dirty dishes in a sink.',
   'a photo of kitchen utensils.', 'a photo of cutlery.', 'a photo of an empty glass.', 'a photo of an empty kitchen.',
   'a photo of a clean white plate on a table.', 'a photo of pots and pans.', 'a photo of an empty dining table.',
 ],
 'esya': [
   'a photo of a mobile phone.', 'a photo of a car.', 'a photo of a sofa.', 'a photo of a chair.', 'a photo of furniture.',
   'a photo of shoes.', 'a photo of clothes.', 'a photo of a t-shirt.', 'a photo of a toy.', 'a photo of a teddy bear.',
   'a photo of a laptop.', 'a photo of a computer keyboard.', 'a photo of a television.', 'a photo of a handbag.', 'a photo of a watch.',
   'a photo of a bicycle.', 'a photo of tools.',
 ],
 'mekan': [
   'a photo of a building.', 'a photo of a house.', 'a photo of a landscape.', 'a photo of mountains.', 'a photo of the sea.',
   'a photo of a beach.', 'a photo of the sky.', 'a photo of clouds.', 'a photo of a city street.', 'a photo of a room interior.',
   'a photo of a bedroom.', 'a photo of an office.', 'a photo of a road.', 'a photo of a city at night.', 'a photo of a tiled floor.',
 ],
 'belge': [
   'a photo of a document with text.', 'a screenshot of a phone screen.', 'a screenshot of a website.', 'a photo of a receipt.',
   'a photo of a book page.', 'a photo of a handwritten note.', 'a photo of a chart.', 'a photo of a sign with text.',
   'a cartoon drawing.', 'a photo of a computer screen.',
 ],
 'bitki': [
   'a photo of a flower.', 'a photo of a bouquet of flowers.', 'a photo of a houseplant.', 'a photo of a tree.', 'a photo of grass.',
   'a photo of a garden.', 'a photo of green leaves.', 'a photo of a cactus.',
 ],
}
KAPI_AYAR = {'T': 100, 'esik': 0.80, 'paketDahil': True, 'yemekDahil': False}
# Kaba sınıf (hiyerarşik ipucu): grup başına istem ortalaması; uygulama yemeğin kat alanını gruba eşler (p9e.js KABA_KAT) ve
# aday puanını (G·p_grup)^us ile çarpar. T=50, us=0,25 ölçümle seçildi (top-1/3/5 iki ayrı sette de +1…3 puan, gerileme yok).
KABA = {
 'kuruyemis': ['a photo of nuts.', 'a photo of a bowl of nuts and seeds.', 'a photo of olives.'],
 'meyve': ['a photo of fresh fruit.', 'a photo of a piece of fruit.', 'a photo of dried fruit.'],
 'sebze': ['a photo of vegetables.', 'a photo of a salad.', 'a photo of a cooked vegetable dish.'],
 'tatli': ['a photo of a dessert.', 'a photo of a cake.', 'a photo of sweets.'],
 'icecek': ['a photo of a drink.', 'a photo of a glass of a beverage.', 'a photo of a cup of tea or coffee.'],
 'corba': ['a photo of a bowl of soup.'],
 'et': ['a photo of grilled meat.', 'a photo of a meat dish.', 'a photo of a fish dish.'],
 'hamur': ['a photo of pastry or bread.', 'a photo of a sandwich.', 'a photo of pizza or flatbread.'],
 'pilav': ['a photo of rice or pasta.', 'a photo of a plate of rice.', 'a photo of a plate of pasta.'],
 'kahvalti': ['a photo of a breakfast plate.', 'a photo of eggs.', 'a photo of cheese and dairy.'],
 'paket': ['a photo of a packaged food product.', 'a photo of a snack in its wrapper.', 'a photo of chips and crackers.'],
}
KABA_AYAR = {'T': 50, 'us': 0.25}

AI = os.path.dirname(os.path.abspath(__file__))
mdl, tokf = sys.argv[1:3]
yalniz_kapi = len(sys.argv) > 3 and sys.argv[3] == '--kapi'
tok = Tokenizer.from_file(tokf)
sess = ort.InferenceSession(mdl, providers=['CPUExecutionProvider'])
meta = json.load(open(os.path.join(AI, 'klip.json'), encoding='utf-8'))
buf = bytearray(open(os.path.join(AI, 'klip.bin'), 'rb').read())
D = meta['metin']['d']

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

mo = meta['metin']
if yalniz_kapi:   # mevcut yemek gömmelerini aynen koru
    tq = np.frombuffer(bytes(buf[mo['o']:mo['o'] + mo['n'] * D]), np.int8).copy()
    ts = np.frombuffer(bytes(buf[mo['so']:mo['so'] + mo['n'] * 4]), np.float32).copy()
    ids = meta['ids']
else:
    foods = json.load(open(sys.argv[3], encoding='utf-8'))['foods']
    sade = lambda s: re.sub(r'\s+', ' ', s).strip()
    tr = [sade(f['n'][0]) for f in foods]; en = [sade(f['n'][1]) for f in foods]
    t = sum(enc([p.format(tr=a, en=b) for a, b in zip(tr, en)]) for p in mo['istem'])
    t /= np.linalg.norm(t, axis=1, keepdims=True)
    ts = (np.abs(t).max(1) / 127).astype(np.float32); tq = np.round(t / ts[:, None]).astype(np.int8)
    ids = [f['id'] for f in foods]
paket = np.frombuffer(bytes(buf[meta['paket']['o']:meta['paket']['o'] + (meta['paket']['np'] + meta['paket']['nn']) * D * 4]), np.float32).copy()
kapi = np.concatenate([enc(KAPI_YIYECEK)] + [enc(v) for v in KAPI_DEGIL.values()]).astype(np.float32)
kaba = np.stack([enc(v).mean(0) for v in KABA.values()]); kaba = (kaba / np.linalg.norm(kaba, axis=1, keepdims=True)).astype(np.float32)
# metin + paket + kapı bölümleri dosyanın sonundadır: kes, yeniden ekle
del buf[mo['o']:]
def koy(arr):
    while len(buf) % 4: buf.extend(b'\0')
    o = len(buf); buf.extend(arr.tobytes()); return o
meta['metin'].update(n=len(ids), o=koy(tq), so=koy(ts))
meta['paket']['o'] = koy(paket)
meta['kapi'] = dict(KAPI_AYAR, o=koy(kapi), yiyecek=KAPI_YIYECEK, degil=KAPI_DEGIL)
meta['kaba'] = dict(KABA_AYAR, o=koy(kaba), istem=KABA)
meta['ids'] = ids
open(os.path.join(AI, 'klip.bin'), 'wb').write(bytes(buf))
json.dump(meta, open(os.path.join(AI, 'klip.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print('metin gömmeleri:', len(ids), 'yemek; kapı:', len(kapi), 'istem; klip.bin', len(buf), 'bayt. Sonra: python kaynak/derle.py && npm run sync-web')
