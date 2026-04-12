import fs from 'fs';
import { MONSTERS } from './src/pixel-engine.js';

const findAndReplace = (id, newPalette, newData) => {
    const idx = MONSTERS.findIndex(m => m.id === id);
    if (idx !== -1) {
        MONSTERS[idx].palette = newPalette;
        MONSTERS[idx].data = newData;
    }
};

// 1. やることキング (光の王: 白と金ベース、赤マント、精悍な姿)
// 0:null, 1:白, 2:黄金, 3:濃金/茶, 4:目(黒・濃青), 5:赤(マント), 6:青(宝石)
const kingPalette = [null, '#ffffff', '#fde047', '#b45309', '#1e3a8a', '#ef4444', '#3b82f6'];
const kingData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0], // 王冠先
    [0, 0, 0, 0, 0, 2, 6, 2, 6, 2, 0, 0, 0, 0, 0, 0], // 王冠宝石
    [0, 0, 0, 0, 0, 2, 2, 1, 2, 2, 0, 0, 0, 0, 0, 0], // 王冠土台
    [0, 0, 0, 0, 5, 1, 1, 1, 1, 1, 5, 0, 0, 0, 0, 0], // 顔上部 + マント襟
    [0, 0, 0, 5, 5, 1, 4, 1, 4, 1, 5, 5, 0, 0, 0, 0], // 目(精悍に)
    [0, 0, 0, 5, 0, 1, 1, 1, 1, 1, 0, 5, 0, 0, 0, 0], // 頬〜あご
    [0, 0, 0, 5, 0, 0, 2, 6, 2, 0, 0, 5, 0, 0, 0, 0], // 首元の装飾
    [0, 0, 5, 5, 5, 1, 2, 1, 2, 1, 5, 5, 5, 0, 0, 0], // 肩鎧とマント
    [0, 0, 5, 5, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0], // 胴体
    [0, 0, 5, 5, 1, 2, 2, 2, 2, 2, 1, 5, 5, 0, 0, 0], // 腕と黄金の帯
    [0, 0, 5, 5, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0], // 胴体下部
    [0, 0, 0, 5, 5, 2, 2, 2, 2, 2, 5, 5, 0, 0, 0, 0], // 装飾
    [0, 0, 0, 0, 5, 1, 1, 0, 1, 1, 5, 0, 0, 0, 0, 0], // 足
    [0, 0, 0, 0, 5, 2, 2, 0, 2, 2, 5, 0, 0, 0, 0, 0], // 靴(金)
    [0, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0]  // マントの裾
];
findAndReplace('rare_king', kingPalette, kingData);


// 2. やることゴッド (キングの究極進化: 王冠が浮遊する光輪へ。虹色の巨大オーラ。マントは光の翼に。)
// 0:null, 1:白ボディ, 2:輝く純白(ハイライト), 3:目(エメラルド神眼), 4:純金/白金, 
// 5:虹(ピンク), 6:虹(シアン), 7:虹(紫), 8:虹(黄緑)
const godPalette = [null, '#f8fafc', '#ffffff', '#10b981', '#fef08a', '#f472b6', '#22d3ee', '#c084fc', '#a3e635'];
const godData = [
    [5, 5, 6, 6, 0, 0, 4, 4, 4, 0, 0, 7, 7, 8, 8, 5], // 特大の虹色オーラ(外周)
    [5, 0, 0, 0, 6, 4, 2, 6, 2, 4, 7, 0, 0, 0, 8, 8], // 王冠が進化して浮遊する光の環に
    [6, 0, 5, 5, 0, 4, 4, 2, 4, 4, 0, 8, 8, 0, 7, 7],
    [6, 0, 5, 0, 0, 0, 1, 1, 1, 0, 0, 0, 8, 0, 7, 5], // 神聖な少年神のような細身の顔へ
    [0, 6, 0, 0, 0, 1, 3, 1, 3, 1, 0, 0, 0, 7, 0, 5], // 神眼(エメラルド)
    [0, 0, 6, 0, 0, 1, 1, 1, 1, 1, 0, 0, 8, 0, 0, 6],
    [0, 5, 0, 6, 0, 4, 1, 2, 1, 4, 0, 8, 0, 7, 0, 6], // 首元から胸にかけてのコア
    [5, 0, 0, 0, 6, 1, 4, 2, 4, 1, 8, 0, 0, 0, 7, 7], // 翼の付け根
    [5, 5, 6, 0, 1, 1, 1, 4, 1, 1, 1, 0, 8, 7, 7, 8], // 光の腕・翼が展開
    [6, 6, 5, 6, 1, 4, 1, 1, 1, 4, 1, 8, 7, 8, 8, 5],
    [7, 6, 5, 1, 1, 2, 4, 4, 4, 2, 1, 1, 8, 7, 5, 5], // 黄金の装飾帯
    [7, 7, 6, 1, 4, 1, 1, 1, 1, 1, 4, 1, 8, 5, 5, 6],
    [8, 7, 0, 0, 1, 2, 2, 4, 2, 2, 1, 0, 0, 6, 6, 7], // 下半身が浮遊する光に霞む
    [8, 8, 7, 0, 0, 1, 4, 1, 4, 1, 0, 0, 5, 6, 7, 8],
    [5, 8, 8, 7, 0, 0, 4, 0, 4, 0, 0, 6, 5, 8, 8, 5], // 足がない、純粋な神霊体
    [5, 5, 8, 8, 7, 7, 6, 6, 5, 5, 6, 6, 5, 5, 5, 6]  // 底面にオーラが集結
];
findAndReplace('lv99_ultimate', godPalette, godData);

// JSON文字列生成 (前回と同じ安定ソート済みの状態とする)
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

console.log('King and God upgraded to divine design successfully.');
