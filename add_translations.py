import json

with open('locales/ja.json', 'r', encoding='utf-8') as f:
    ja = json.load(f)
with open('locales/en.json', 'r', encoding='utf-8') as f:
    en = json.load(f)

# --- secret_log ---
ja['secret_log'] = {
    "title": "幻のモンスター調査記録",
    "subtitle": "全力で応援してくれた貴方だけに贈る、秘密の手引き",
    "how_to": "出し方",
    "golden_egg_title": "【幻】きんぴかタマゴ",
    "golden_egg_how": "タスクを累計<b>100個</b>クリアする。",
    "golden_egg_desc": "地道にタスクを達成し続ければOK。全世代の通算でカウントされるので、殿堂入りしてもリセットされません。コツコツ続けた者だけが手にする黄金の証です。",
    "toku_title": "【幻】なかのひとToku",
    "toku_how": "モンスターをLv10まで育てて<b>殿堂入り</b>させ、<b>2代目</b>を迎える。",
    "toku_desc": "最初のモンスターを十分に成長させてから世代交代すると、伝説の開発者が姿を見せます。殿堂入りボタンはLv10で出現するので、まずはそこを目指しましょう。",
    "bulb_title": "【幻】ひらめきデンキュウ",
    "bulb_how": "せいかくの<b>「クリエイティブ」が最も高い</b>状態で、累計<b>50タスク</b>以上を達成する。",
    "bulb_desc": "「絵を描く」「デザインを考える」「アイデアを出す」など、創作系のタスクを多めにこなすと自然にクリエイティブが伸びます。発想力の結晶が灯りを点します。",
    "cat_title": "【幻】キーボードくろネコ",
    "cat_how": "<b>午前10時〜12時</b>の間にタスクを完了する。さらに、せいかくの<b>「知能」が最も高い</b>状態であること。",
    "cat_desc": "午前中の集中タイムに現れる黒猫。勉学や分析、プログラミングなどの「知能」を高めるタスクをこなし、午前中の特定時間に集中して取り組むと姿を見せるでしょう。",
    "caffeine_title": "【幻】しんやのカフェイン",
    "caffeine_how": "<b>深夜0時〜4時</b>の間にタスクを完了する。さらに、せいかくの<b>「カオス」が最も高い</b>状態であること。",
    "caffeine_desc": "深夜のカオスな精神状態で作業を続けるストイックな者のお供。「変なことをする」「実験する」など、カオス系のタスクを夜にこなすと芳醇な香りが漂ってきます。",
    "glitch_title": "【幻】バグったナニカ",
    "glitch_how": "<b>朝5時台</b>（AM 5:00〜5:59）にアプリを開いている。",
    "glitch_desc": "朝一番に世界がバグる瞬間にのみ出現するレアモンスター。早朝5時にアプリを開いてタスクを完了すると、朝靄の中からノイズ混じりの姿を現します。",
    "king_title": "【幻】やることキング",
    "king_how": "モンスターを<b>10回以上殿堂入り</b>させて、<b>10代目以降</b>に到達する。",
    "king_desc": "長い旅路の果てに現れる王。10匹のモンスターをそれぞれLv10まで育て上げ、【王】の資質を証明した証です。焦らず日々のタスクに取り組み、世代を重ねましょう。",
    "epilogue": "そして、すべての幻と出会い、図鑑を完成させた時…<br>この世界の「究極の存在」が、あなたの前に降臨するかもしれません。",
    "close_btn": "調査記録を閉じる"
}

en['secret_log'] = {
    "title": "Phantom Monster Research Log",
    "subtitle": "A secret guide, just for you — our devoted supporter",
    "how_to": "How to find",
    "golden_egg_title": "[Phantom] Golden Egg",
    "golden_egg_how": "Complete a total of <b>100 tasks</b>.",
    "golden_egg_desc": "Just keep completing tasks steadily. The count carries across all generations and doesn't reset with Hall of Fame entries. A golden proof earned only by the persistent.",
    "toku_title": "[Phantom] Insider Toku",
    "toku_how": "Raise a monster to Lv10, enter the <b>Hall of Fame</b>, and welcome your <b>2nd generation</b>.",
    "toku_desc": "When you grow your first monster fully and pass the torch, the legendary developer appears. The Hall of Fame button appears at Lv10, so aim for that first.",
    "bulb_title": "[Phantom] Spark Bulb",
    "bulb_how": "Have <b>Creative as your highest</b> personality trait and complete <b>50+ tasks</b> total.",
    "bulb_desc": "Do creative tasks like drawing, designing, or brainstorming to boost your Creative stat naturally. The crystallization of imagination lights the spark.",
    "cat_title": "[Phantom] Keyboard Black Cat",
    "cat_how": "Complete a task between <b>10 AM and 12 PM</b>. Also, have <b>Intellectual as your highest</b> personality trait.",
    "cat_desc": "A black cat that appears during focused morning hours. Complete study, analysis, or programming tasks to boost Intellectual, then work during those specific morning hours.",
    "caffeine_title": "[Phantom] Midnight Caffeine",
    "caffeine_how": "Complete a task between <b>12 AM and 4 AM</b>. Also, have <b>Chaotic as your highest</b> personality trait.",
    "caffeine_desc": "A companion for the dedicated who work through chaotic late nights. Do experimental or wild tasks at night and a rich aroma will drift your way.",
    "glitch_title": "[Phantom] Glitched Something",
    "glitch_how": "Have the app open at <b>5 AM</b> (5:00–5:59 AM).",
    "glitch_desc": "A rare monster that only appears in the moment the world glitches at dawn. Open the app and complete a task at 5 AM to see its noisy figure emerge from the morning mist.",
    "king_title": "[Phantom] Todo King",
    "king_how": "Enter the <b>Hall of Fame 10+ times</b> and reach your <b>10th generation or beyond</b>.",
    "king_desc": "A king that appears at the end of a long journey. Raise 10 monsters to Lv10 each, proving the qualities of a true king. Take your time with daily tasks and build through generations.",
    "epilogue": "And when you've met every phantom and completed your Dex…<br>The \"ultimate being\" of this world may descend before you.",
    "close_btn": "Close Research Log"
}

# --- message keys ---
ja['message']['image_copied'] = '画像をコピーしました！Xに直接貼り付け(Ctrl+V)できます'
ja['message']['save_right_click'] = '右クリックで保存してください'
ja['message']['vip_reward'] = '👑 VIP特典！進化おめでとう！「{{name}}」({{type}})を手に入れたよ！'
ja['message']['reward'] = 'おめでとう！報酬として「{{name}}」({{type}})を手に入れたよ！ 🎁'
ja['message']['secret_log_locked'] = '「全力応援パック」を購入すると、図鑑コンプリートの秘伝が書かれた開発者ログをいつでも読み返せるようになります！✨'
ja['message']['code_unreadable'] = 'コードが読み取れなかった…'
ja['message']['special_purchase_success'] = '全力応援パックを購入しました！全アイテムを解放しました。図鑑コンプに役立つ"なかのひとログ"をいつでも読み返せるようになりました！'
ja['message']['premium_purchase_success'] = 'とくべつパックを購入しました！今後、モンスターが進化するたびにランダム報酬を自動獲得できます！'
ja['message']['starter_purchase_success'] = 'お試しパックを購入しました！\n伝説素材1+背景1+家具1（ランダム）を付与しました。'
ja['message']['standard_purchase_success'] = 'まんぞくパックを購入しました！\n伝説素材5+背景5+家具5（ランダム）を付与しました。'

en['message']['image_copied'] = 'Image copied! Paste directly on X (Ctrl+V)'
en['message']['save_right_click'] = 'Please right-click to save'
en['message']['vip_reward'] = '👑 VIP Bonus! Congrats on evolving! Got "{{name}}" ({{type}})!'
en['message']['reward'] = 'Congrats! Got "{{name}}" ({{type}}) as a reward! 🎁'
en['message']['secret_log_locked'] = 'Purchase the "Full Support Pack" to unlock the developer log with secrets for completing the Dex! ✨'
en['message']['code_unreadable'] = "Couldn't read the code..."
en['message']['special_purchase_success'] = 'Full Support Pack purchased! All items unlocked. You can now read the dev log anytime for Dex completion tips!'
en['message']['premium_purchase_success'] = 'Special Pack purchased! From now on, you auto-earn random rewards every time your monster evolves!'
en['message']['starter_purchase_success'] = 'Starter Pack purchased!\n1 Material + 1 BG + 1 Furniture (random) granted.'
en['message']['standard_purchase_success'] = 'Standard Pack purchased!\n5 Materials + 5 BGs + 5 Furniture (random) granted.'

# --- shop keys ---
ja['shop']['confirm_purchase'] = '購入ページ（Stripe）へ移動しますか？'
en['shop']['confirm_purchase'] = 'Go to the purchase page (Stripe)?'

# --- ui type labels ---
ja['ui']['type_material'] = '🧪伝説素材'
ja['ui']['type_background'] = '🖼️背景'
ja['ui']['type_furniture'] = '🪑家具'
ja['ui']['unknown_entity'] = '謎の存在'
en['ui']['type_material'] = '��Material'
en['ui']['type_background'] = '🖼️Background'
en['ui']['type_furniture'] = '🪑Furniture'
en['ui']['unknown_entity'] = 'Unknown Entity'

# --- debug keys ---
ja['debug'] = {
    "test_data_applied": "テストデータを適用しました。リロードします！",
    "level_up": "レベルを {{level}} に上げました。有効にするにはリロードしてください。"
}
en['debug'] = {
    "test_data_applied": "Test data applied. Reloading!",
    "level_up": "Level raised to {{level}}. Please reload to apply."
}

with open('locales/ja.json', 'w', encoding='utf-8') as f:
    json.dump(ja, f, ensure_ascii=False, indent=2)
with open('locales/en.json', 'w', encoding='utf-8') as f:
    json.dump(en, f, ensure_ascii=False, indent=2)

print("All translation keys added successfully!")
