import json

with open('locales/ja.json', 'r', encoding='utf-8') as f:
    ja = json.load(f)
with open('locales/en.json', 'r', encoding='utf-8') as f:
    en = json.load(f)

# Fix the 2 broken chat entries
en['chat']['pat_0_p'] = "Good morning. The sky had such a nice color this morning"
en['chat']['pat_10_n'] = "Over there! A rabbit is hopping around!"

# Add guide messages
ja['guide'] = {
    "guide_100tasks": "100個タスクを達成すると、いいことがあるかも？",
    "guide_shop": "ショップで手に入るパックには、伝説素材が入ってることもあるよ。",
    "guide_bg": "背景や家具を変えると、ボクたちの気分も変わるんだ！",
    "guide_friend_code": "ともだちコードを入力すると、遠くの友達が遊びに来てくれるよ。",
    "guide_materials": "伝説素材をたくさん集めると、図鑑がもっと賑やかになるね。",
    "guide_dex_complete": "図鑑をコンプリートすると、究極の何かが起こるって噂だよ...!",
    "guide_cat": "午前10時〜12時に「知能」が高いと会える幻の猫がいるらしい...",
    "guide_glitch": "早朝5時にしか現れないバグったモンスターがいるんだって。",
    "guide_king": "長く続けると王様になれるって噂だよ！",
    "guide_tasks_power": "完了したタスクの数だけ、ボクたちは強くなれるんだ。",
    "guide_look_back": "たまには昔のタスクを振り返ってみるのもいいかもね。",
    "guide_new_friends": "新しい友達、増えたかな？(ともだち招待を試してみて！)",
    "guide_evolution": "モンスターはレベルアップで姿が変わることもあるんだ。",
    "guide_support_pack": "全力応援パックを買うと、開発者の秘密ログが読めるようになるよ！",
    "guide_god": "図鑑コンプリートの先には、神様が待っているかもしれない..."
}

en['guide'] = {
    "guide_100tasks": "Something good might happen if you complete 100 tasks!",
    "guide_shop": "Packs from the shop sometimes contain legendary materials.",
    "guide_bg": "Changing backgrounds and furniture changes our mood too!",
    "guide_friend_code": "Enter a friend code and a faraway friend will come to visit!",
    "guide_materials": "Collecting lots of legendary materials makes the Dex more lively.",
    "guide_dex_complete": "They say something ultimate happens when you complete the Dex...!",
    "guide_cat": "There's a phantom cat you can meet between 10 AM–12 PM with high Intellectual...",
    "guide_glitch": "There's a glitched monster that only appears at 5 AM.",
    "guide_king": "They say you can become a king if you keep going!",
    "guide_tasks_power": "We get stronger with every completed task.",
    "guide_look_back": "It's nice to look back at old tasks sometimes.",
    "guide_new_friends": "Have you made new friends? (Try the friend invite!)",
    "guide_evolution": "Monsters sometimes change form when they level up.",
    "guide_support_pack": "Buy the Full Support Pack to unlock the developer's secret log!",
    "guide_god": "Beyond Dex completion, a god may be waiting..."
}

# Add personality_newborn
ja['ui']['personality_newborn'] = '生まれたばかりで性格未定'
en['ui']['personality_newborn'] = 'Personality not yet determined (just born)'

with open('locales/ja.json', 'w', encoding='utf-8') as f:
    json.dump(ja, f, ensure_ascii=False, indent=2)
with open('locales/en.json', 'w', encoding='utf-8') as f:
    json.dump(en, f, ensure_ascii=False, indent=2)

print("Final translations added successfully!")
