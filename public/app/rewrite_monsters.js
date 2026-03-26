import fs from 'fs';
import { MONSTERS } from './src/pixel-engine.js'; // これで完全なデータを含んだ配列が得られる

// やることゴッドの更新
const godIndex = MONSTERS.findIndex(m => m.id === 'lv99_ultimate');
if (godIndex !== -1) {
    MONSTERS[godIndex].name = 'やることゴッド';
    MONSTERS[godIndex].palette = [null, '#facc15', '#fef08a', '#ca8a04', '#ffffff', '#fdf4ff', '#fef9c3', '#eab308', '#713f12'];
    MONSTERS[godIndex].data = [
        [0, 0, 4, 0, 0, 4, 0, 4, 0, 4, 0, 0, 4, 0, 0, 0],
        [0, 4, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 4, 0, 0],
        [4, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 4, 0],
        [0, 1, 2, 0, 0, 2, 0, 2, 0, 0, 2, 1, 0, 0, 0, 0],
        [0, 1, 2, 0, 2, 1, 1, 1, 2, 0, 2, 1, 0, 0, 0, 0],
        [4, 1, 2, 1, 4, 3, 4, 3, 4, 1, 2, 1, 0, 0, 4, 0],
        [0, 1, 2, 1, 1, 4, 1, 4, 1, 1, 2, 1, 0, 0, 0, 0],
        [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0],
        [4, 0, 1, 2, 2, 4, 4, 4, 2, 2, 1, 0, 0, 0, 4, 0],
        [0, 0, 0, 1, 4, 4, 4, 4, 4, 1, 0, 0, 0, 0, 0, 0],
        [0, 2, 1, 1, 7, 4, 4, 4, 7, 1, 1, 2, 0, 0, 0, 0],
        [2, 1, 4, 1, 7, 7, 4, 7, 7, 1, 4, 1, 2, 0, 0, 0],
        [2, 4, 0, 1, 7, 7, 7, 7, 7, 1, 0, 4, 2, 0, 0, 0],
        [1, 0, 0, 0, 1, 7, 7, 7, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0]
    ];
}

// 安定ソートのためオリジナルインデックスを保存
MONSTERS.forEach((m, i) => m._origIndex = i);

const orderScore = (id) => {
    if (id === 'egg') return -2;
    if (id === 'partner_aibou') return -1;
    return 0;
};

// ソート: egg, aibou 優先 -> レベル昇順 -> 元の追加順
MONSTERS.sort((a, b) => {
    const scoreA = orderScore(a.id);
    const scoreB = orderScore(b.id);
    if (scoreA !== scoreB) return scoreA - scoreB;
    if (a.level !== b.level) return a.level - b.level;
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
    mStr += `,\n        palette: ${JSON.stringify(m.palette)},\n`;
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

// ファイル先頭から "export const MONSTERS = [" の直前まで
const beforeMonsters = engineSrc.substring(0, engineSrc.indexOf('export const MONSTERS = ['));

// "export function getMonsterSpec" 以降（最後まで）
const afterMonstersSearch = 'export function getMonsterSpec';
const afterMonsters = engineSrc.substring(engineSrc.indexOf(afterMonstersSearch));

const finalSrc = beforeMonsters + newArrayStr + afterMonsters;

fs.writeFileSync('src/pixel-engine.js', finalSrc, 'utf8');
fs.writeFileSync('src/pixel-engine-static.js', finalSrc, 'utf8'); // staticも同じ内容にする

console.log('Successfully sorted MONSTERS, updated God, and removed dirty push codes.');
