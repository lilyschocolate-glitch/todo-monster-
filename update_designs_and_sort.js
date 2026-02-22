import fs from 'fs';
import { MONSTERS } from './src/pixel-engine.js';

const findAndReplace = (id, newPalette, newData) => {
    const idx = MONSTERS.findIndex(m => m.id === id);
    if (idx !== -1) {
        MONSTERS[idx].palette = newPalette;
        MONSTERS[idx].data = newData;
    }
};

// 1. やることゴッドを以前の虹色・宇宙デザインに戻す
const godPalette = [null, '#facc15', '#fef08a', '#000', '#fff', '#f472b6', '#38bdf8', '#c084fc', '#0f172a'];
const godData = [
    [0, 0, 0, 0, 5, 6, 7, 5, 6, 7, 0, 0, 0, 0, 0, 0], // 大きな虹色の神々しい光輪
    [0, 0, 0, 7, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0],
    [0, 0, 6, 0, 8, 2, 8, 0, 0, 0, 6, 0, 0, 0, 0, 0], // 8=宇宙, 2=白金の王冠
    [0, 5, 0, 8, 1, 1, 1, 8, 0, 0, 0, 7, 0, 0, 0, 0], // 1=純金メインボディ
    [0, 6, 0, 8, 1, 1, 1, 1, 8, 0, 0, 5, 0, 0, 0, 0],
    [7, 0, 0, 8, 1, 3, 2, 3, 1, 8, 0, 0, 6, 0, 0, 0], // 3=瞳, 極限の威厳を放つ顔
    [5, 0, 0, 8, 1, 1, 2, 1, 1, 8, 0, 0, 7, 0, 0, 0], // 中央に輝く白金の光(2)
    [6, 0, 0, 0, 8, 1, 1, 1, 8, 0, 0, 0, 5, 0, 0, 0],
    [7, 0, 0, 8, 1, 2, 2, 2, 1, 8, 0, 0, 6, 0, 0, 0], // ネックレスなどの装飾
    [0, 5, 0, 8, 1, 1, 1, 1, 1, 8, 0, 7, 0, 0, 0, 0],
    [0, 6, 0, 8, 1, 1, 1, 1, 1, 8, 0, 5, 0, 0, 0, 0], // マントや衣(宇宙の黒＝8を取り入れる)
    [0, 0, 7, 8, 2, 8, 1, 8, 2, 8, 6, 0, 0, 0, 0, 0], // 腕と手
    [0, 0, 0, 5, 8, 8, 8, 8, 8, 7, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 6, 7, 5, 6, 5, 0, 0, 0, 0, 0, 0, 0], // 足元で光輪が結ばれる
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
findAndReplace('lv99_ultimate', godPalette, godData);

// 2. なかのひとTokuを髪の毛のある優しい博士風デザインに
const tokuPalette = [null, '#fcd34d', '#e5e7eb', '#ffffff', '#3b82f6', '#374151', '#78350f', '#000000', '#fca5a5'];
const tokuData = [
    [0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0], // hair
    [0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0], // hair
    [0, 0, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0], // face / hair sides
    [0, 0, 2, 1, 7, 1, 7, 1, 2, 0, 0, 0, 0, 0, 0, 0], // glasses / eyes
    [0, 0, 2, 8, 1, 1, 1, 8, 2, 0, 0, 0, 0, 0, 0, 0], // blush, gentle smile
    [0, 0, 0, 1, 1, 7, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], // kind smile, chin
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // neck
    [0, 0, 0, 3, 3, 4, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0], // collar & tie
    [0, 0, 3, 3, 3, 4, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0], // lab coat shoulders
    [0, 3, 3, 3, 3, 4, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0], // lab coat 
    [0, 3, 1, 3, 3, 3, 3, 3, 1, 3, 0, 0, 0, 0, 0, 0], // arms and hands
    [0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0], // bottom of coat
    [0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0], // pants
    [0, 0, 0, 5, 5, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 6, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0], // shoes
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
findAndReplace('rare_toku', tokuPalette, tokuData);

// 3. キーボードくろネコを正しい黒猫風デザインに
const nekoPalette = [null, '#111827', '#374151', '#fcd34d', '#000000', '#fca5a5', '#d1d5db', '#ffffff', '#9ca3af'];
const nekoData = [
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 5, 1, 0, 1, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 3, 4, 1, 3, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0], // tail right side
    [0, 1, 1, 1, 5, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 2, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0], // paws
    [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0], // keyboard top
    [0, 6, 7, 8, 7, 7, 8, 7, 8, 7, 8, 6, 0, 0, 0, 0], // keys
    [0, 6, 8, 7, 7, 8, 7, 7, 8, 7, 7, 6, 0, 0, 0, 0], // keys
    [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0], // keyboard base
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
findAndReplace('rare_neko', nekoPalette, nekoData);

// 4. ソート処理の変更 (normal -> rare -> ultimate の順に)
// 安定ソートのためオリジナルインデックスを保存
MONSTERS.forEach((m, i) => m._origIndex = i);

const typeScore = { 'normal': 0, 'rare': 1, 'ultimate': 2 };

MONSTERS.sort((a, b) => {
    const scoreA = typeScore[a.type] || 0;
    const scoreB = typeScore[b.type] || 0;

    // 種類(type)が違えば種類でソート (normal -> rare -> ultimate)
    if (scoreA !== scoreB) return scoreA - scoreB;

    // (eggとaibouなど、特別なものをそれぞれのtype内の先頭にしたい場合)
    const isSpecialA = (a.id === 'egg' || a.id === 'partner_aibou') ? -1 : 0;
    const isSpecialB = (b.id === 'egg' || b.id === 'partner_aibou') ? -1 : 0;
    if (isSpecialA !== isSpecialB) return isSpecialA - isSpecialB;

    // レベルが違えばレベル順でソート
    if (a.level !== b.level) return a.level - b.level;

    // 全く同じレベル・種類なら元の追加順（進化元からの派生などを維持）
    return a._origIndex - b._origIndex;
});

// JSON文字列生成
let newArrayStr = 'export const MONSTERS = [\n';
for (let i = 0; i < MONSTERS.length; i++) {
    const m = MONSTERS[i];
    let mStr = `    {\n`;
    mStr += `        id: '${m.id}', name: '${m.name}', level: ${m.level}, type: '${m.type}'`;
    if (m.baseId) mStr += `, baseId: '${m.baseId}'`;
    if (m.desc) mStr += `, desc: '${m.desc}'`;
    if (m.crown) mStr += `, crown: ${m.crown}`;
    if (m.stage) mStr += `, stage: '${m.stage}'`;
    mStr += `,\n        palette: ${JSON.stringify(m.palette).replace(/"/g, "'")},\n`;
    mStr += `        data: [\n`;
    for (let r = 0; r < m.data.length; r++) {
        mStr += `            [${m.data[r].join(', ')}]${r < m.data.length - 1 ? ',' : ''}\n`;
    }
    mStr += `        ]\n    }`;
    if (i < MONSTERS.length - 1) mStr += ',';
    newArrayStr += mStr + '\n';
}
newArrayStr += '];\n\n';

// pixel-engine.js のテキスト処理
let engineSrc = fs.readFileSync('src/pixel-engine.js', 'utf8');

const beforeMonsters = engineSrc.substring(0, engineSrc.indexOf('export const MONSTERS = ['));
const afterMonstersSearch = 'export function getMonsterSpec';
const afterMonsters = engineSrc.substring(engineSrc.indexOf(afterMonstersSearch));

const finalSrc = beforeMonsters + newArrayStr + afterMonsters;

fs.writeFileSync('src/pixel-engine.js', finalSrc, 'utf8');
fs.writeFileSync('src/pixel-engine-static.js', finalSrc, 'utf8');

console.log('Successfully updated designs and sorted MONSTERS by normal -> rare -> ultimate.');
