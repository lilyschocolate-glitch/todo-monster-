import json
import re
from deep_translator import GoogleTranslator

with open('src/items.js', 'r', encoding='utf-8') as f:
    items_content = f.read()

items_desc = {}
for match in re.finditer(r"id:\s*'([\w_]+)'.*?desc:\s*'([^']+)'", items_content, re.DOTALL):
    items_desc[match.group(1)] = match.group(2)

branches = {
    'creative': '色と形を操る芸術派',
    'physical': '筋肉で全てを解決する脳筋派',
    'social': '話し上手の人気者',
    'intellectual': '知識を貪る賢者タイプ',
    'chaotic': '予測不能のトリックスター',
}

def translate_dict(d):
    res = {}
    translator = GoogleTranslator(source='ja', target='en')
    for k, v in d.items():
        res[k] = translator.translate(v)
    return res

items_desc_en = translate_dict(items_desc)
branches_en = translate_dict(branches)

# Load existing ja.json and en.json
with open('locales/ja.json', 'r', encoding='utf-8') as f:
    ja = json.load(f)

with open('locales/en.json', 'r', encoding='utf-8') as f:
    en = json.load(f)

# Update ja.json
if 'item' not in ja: ja['item'] = {}
ja['item']['desc'] = items_desc
if 'character' not in ja: ja['character'] = {}
if 'branch' not in ja['character']: ja['character']['branch'] = {}
ja['character']['branch'] = branches
ja['ui']['personality_balance'] = '{{desc1}}で、{{desc2}}タイプ'
ja['message']['all_unlocked'] = '全アイテムを解放し、サポーター特典（金色オーラ）を有効にしました！'

# Update en.json
if 'item' not in en: en['item'] = {}
en['item']['desc'] = items_desc_en
if 'character' not in en: en['character'] = {}
if 'branch' not in en['character']: en['character']['branch'] = {}
en['character']['branch'] = branches_en
en['ui']['personality_balance'] = 'Likes {{desc1}} and {{desc2}}'
en['message']['all_unlocked'] = 'Unlocked all items and activated the supporter bonus (golden aura)!'

with open('locales/ja.json', 'w', encoding='utf-8') as f:
    json.dump(ja, f, ensure_ascii=False, indent=2)

with open('locales/en.json', 'w', encoding='utf-8') as f:
    json.dump(en, f, ensure_ascii=False, indent=2)

print("Locales updated successfully.")
