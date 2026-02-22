import fs from 'fs';
import { MONSTERS } from './src/pixel-engine.js';

const findAndReplace = (id, newPalette, newData) => {
    const idx = MONSTERS.findIndex(m => m.id === id);
    if (idx !== -1) {
        MONSTERS[idx].palette = newPalette;
        MONSTERS[idx].data = newData;
    }
};

// やることキング (元の黄色い「やること」の面影を残しつつ、王冠とマントを装備した姿)
// 0:null, 1:メイン黄色ベース, 2:黄金(王冠), 3:濃い金/影, 4:目(黒), 5:赤(マント・王冠のクッション), 6:白(マントのファーやハイライト)
const kingPalette = [null, '#facc15', '#fde047', '#ca8a04', '#000000', '#ef4444', '#ffffff'];
const kingData = [
    [0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0], // 王冠先
    [0, 0, 0, 0, 0, 2, 5, 2, 5, 2, 0, 0, 0, 0, 0, 0], // 王冠宝石と赤いクッション
    [0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0], // 王冠土台
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], // やること(本体)上部
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 4, 1, 1, 1, 4, 1, 0, 0, 0, 0, 0, 0], // 目(黒)
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], // ぽっちゃりした丸いボディ
    [0, 0, 1, 5, 1, 1, 1, 1, 1, 5, 1, 0, 0, 0, 0, 0], // ほっぺの赤み
    [0, 6, 6, 6, 1, 1, 1, 1, 1, 6, 6, 6, 0, 0, 0, 0], // ふかふかの白いファー付き王族マント(首周り)
    [5, 5, 5, 5, 6, 6, 6, 6, 6, 5, 5, 5, 5, 0, 0, 0], // 赤いマントが広がる
    [5, 0, 5, 5, 5, 1, 1, 1, 5, 5, 5, 0, 5, 0, 0, 0], // ぷにぷにした黄色い体下部が見える
    [5, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 5, 0, 0, 0],
    [5, 0, 0, 1, 3, 1, 0, 1, 3, 1, 0, 0, 5, 0, 0, 0], // 短い足(影色付き)
    [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
findAndReplace('rare_king', kingPalette, kingData);

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

console.log('King reverted to slime-based shape successfully.');
