import json, re
from deep_translator import GoogleTranslator

# 1. Extract all monster names from pixel-engine.js
with open('src/pixel-engine.js', 'r', encoding='utf-8') as f:
    content = f.read()

monsters = {}
descs = {}
for m in re.finditer(r"id:\s*'([\w_]+)',\s*name:\s*'([^']+)'.*?desc:\s*'([^']*)'", content):
    mid, mname, mdesc = m.group(1), m.group(2), m.group(3)
    monsters[mid] = mname
    if mdesc:
        descs[mid] = mdesc

# Load locale files
with open('locales/ja.json', 'r', encoding='utf-8') as f:
    ja = json.load(f)
with open('locales/en.json', 'r', encoding='utf-8') as f:
    en = json.load(f)

# Check which monster names are missing from en.json
existing_names = en.get('monster', {}).get('name', {})
missing = {k: v for k, v in monsters.items() if k not in existing_names}

print(f"Total monsters: {len(monsters)}, Existing in en.json: {len(existing_names)}, Missing: {len(missing)}")

# Translate missing names
translator = GoogleTranslator(source='ja', target='en')
translated_names = {}
translated_descs = {}

for mid, mname in missing.items():
    try:
        translated_names[mid] = translator.translate(mname)
    except:
        translated_names[mid] = mname

for mid, mdesc in descs.items():
    if mid not in en.get('monster', {}).get('desc', {}):
        try:
            translated_descs[mid] = translator.translate(mdesc)
        except:
            translated_descs[mid] = mdesc

# Update en.json
en['monster']['name'].update(translated_names)
if 'desc' not in en['monster']:
    en['monster']['desc'] = {}
en['monster']['desc'].update(translated_descs)

# Update ja.json monster names
if 'monster' not in ja:
    ja['monster'] = {}
if 'name' not in ja['monster']:
    ja['monster']['name'] = {}
ja['monster']['name'].update(monsters)
if 'desc' not in ja['monster']:
    ja['monster']['desc'] = {}
ja['monster']['desc'].update(descs)

# 2. Add missing message keys
en['message']['special_evolved'] = "Whoa?! With a tremendous flash of light, the monster has awakened to its legendary form!!"
ja['message']['special_evolved'] = 'おおおっ！？ 凄まじい光と共に、モンスターが伝説の姿へと覚醒しました！！'

# 3. Add graduate button translation
en['ui']['graduate'] = '🎓 Enter Hall of Fame'
# ja already has it

# 4. Search for other missing alert messages
missing_msgs = [
    ('message.evolution', 'おめでとう！モンスターが進化した！', 'Congratulations! Your monster evolved!'),
    ('message.name_prompt', '育てるモンスターの名前を決めてね！', 'Name your monster!'),
    ('ui.confirm_clear', 'LocalStorageを完全にクリアしますか？', 'Clear all LocalStorage data?'),
]
for key, ja_val, en_val in missing_msgs:
    parts = key.split('.')
    if parts[0] not in en:
        en[parts[0]] = {}
    if parts[1] not in en[parts[0]]:
        en[parts[0]][parts[1]] = en_val
    if parts[0] not in ja:
        ja[parts[0]] = {}
    if parts[1] not in ja[parts[0]]:
        ja[parts[0]][parts[1]] = ja_val

with open('locales/ja.json', 'w', encoding='utf-8') as f:
    json.dump(ja, f, ensure_ascii=False, indent=2)
with open('locales/en.json', 'w', encoding='utf-8') as f:
    json.dump(en, f, ensure_ascii=False, indent=2)

print(f"Added {len(translated_names)} monster name translations")
print(f"Added {len(translated_descs)} monster desc translations")
print("All remaining translations added!")
