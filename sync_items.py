import json
import re
from deep_translator import GoogleTranslator

# 1. src/items.js からアイテムデータを抽出
with open('src/items.js', 'r', encoding='utf-8') as f:
    content = f.read()

# ID, Name, Desc を抽出する正規表現 (非常に単純なもの)
# 例: id: 'moon_stone', name: '月の石', desc: '...'
items_data = {}
item_blocks = re.findall(r"(\w+):\s*\{([\s\S]+?)\},", content)
for item_id, block in item_blocks:
    name_match = re.search(r"name:\s*'([^']+)'", block)
    desc_match = re.search(r"desc:\s*'([^']+)'", block)
    if name_match:
        items_data[item_id] = {
            'name': name_match.group(1),
            'desc': desc_match.group(1) if desc_match else ''
        }

# 2. locales/en.json と locales/ja.json を読み込む
with open('locales/ja.json', 'r', encoding='utf-8') as f:
    ja = json.load(f)
with open('locales/en.json', 'r', encoding='utf-8') as f:
    en = json.load(f)

if 'item' not in ja: ja['item'] = {}
if 'name' not in ja['item']: ja['item']['name'] = {}
if 'desc' not in ja['item']: ja['item']['desc'] = {}

if 'item' not in en: en['item'] = {}
if 'name' not in en['item']: en['item']['name'] = {}
if 'desc' not in en['item']: en['item']['desc'] = {}

# 3. 日本語辞書を同期
for item_id, info in items_data.items():
    ja['item']['name'][item_id] = info['name']
    ja['item']['desc'][item_id] = info['desc']

# 4. 英語辞書の不足分を翻訳して追加
translator = GoogleTranslator(source='ja', target='en')
missing_names = [item_id for item_id in items_data if item_id not in en['item']['name']]
missing_descs = [item_id for item_id in items_data if item_id not in en['item']['desc']]

print(f"Missing names: {len(missing_names)}, Missing descs: {len(missing_descs)}")

for item_id in missing_names:
    ja_name = items_data[item_id]['name']
    try:
        en_name = translator.translate(ja_name)
        en['item']['name'][item_id] = en_name
        print(f"Translated Name: {ja_name} -> {en_name}")
    except Exception as e:
        print(f"Error translating name {ja_name}: {e}")
        en['item']['name'][item_id] = ja_name

for item_id in missing_descs:
    ja_desc = items_data[item_id]['desc']
    if not ja_desc: continue
    try:
        en_desc = translator.translate(ja_desc)
        en['item']['desc'][item_id] = en_desc
        print(f"Translated Desc for {item_id}")
    except Exception as e:
        print(f"Error translating desc for {item_id}: {e}")
        en['item']['desc'][item_id] = ja_desc

# 5. 書き出し
with open('locales/ja.json', 'w', encoding='utf-8') as f:
    json.dump(ja, f, ensure_ascii=False, indent=2)
with open('locales/en.json', 'w', encoding='utf-8') as f:
    json.dump(en, f, ensure_ascii=False, indent=2)

print("Sync completed.")
