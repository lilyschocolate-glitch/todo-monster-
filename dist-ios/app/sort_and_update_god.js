import fs from 'fs';

let uiSrc = fs.readFileSync('src/ui.js', 'utf8');
uiSrc = uiSrc.replace(/アルティメット・デウス/g, 'やることゴッド');
fs.writeFileSync('src/ui.js', uiSrc, 'utf8');

let engineSrc = fs.readFileSync('src/pixel-engine.js', 'utf8');

const startMatch = engineSrc.indexOf('export const MONSTERS = [');
const endMatch = engineSrc.indexOf('];\n\n// --- 描画ロジック ---');

if (startMatch !== -1 && endMatch !== -1) {
    const arrayStr = engineSrc.substring(startMatch + 'export const MONSTERS = '.length, endMatch + 1);

    let monstersArray;
    try {
        monstersArray = eval('(' + arrayStr + ')');
    } catch (e) {
        console.error("Parse Error:", e);
        process.exit(1);
    }

    // やることゴッドの更新
    const godIndex = monstersArray.findIndex(m => m.id === 'lv99_ultimate');
    if (godIndex !== -1) {
        monstersArray[godIndex].name = 'やることゴッド';
        // 金色で神々しくどのモンスターより豪華、光属性
        monstersArray[godIndex].palette = [null, '#facc15', '#fef08a', '#ca8a04', '#ffffff', '#fdf4ff', '#fef9c3', '#eab308', '#713f12'];
        monstersArray[godIndex].data = [
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

    monstersArray.forEach((m, i) => m._origIndex = i);

    const orderScore = (id) => {
        if (id === 'egg') return -2;
        if (id === 'partner_aibou') return -1;
        return 0;
    };

    monstersArray.sort((a, b) => {
        const scoreA = orderScore(a.id);
        const scoreB = orderScore(b.id);
        if (scoreA !== scoreB) return scoreA - scoreB;
        if (a.level !== b.level) return a.level - b.level;
        return a._origIndex - b._origIndex;
    });

    let newArrayStr = '[\n';
    for (let i = 0; i < monstersArray.length; i++) {
        const m = monstersArray[i];
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
        if (i < monstersArray.length - 1) mStr += ',';
        newArrayStr += mStr + '\n';
    }
    newArrayStr += ']';

    try {
        eval('(' + newArrayStr + ')');
    } catch (e) {
        console.error("Syntax Error in matched output:", e);
        process.exit(1);
    }

    const firstHalf = engineSrc.substring(0, startMatch + 'export const MONSTERS = '.length);
    const secondHalf = engineSrc.substring(endMatch + 1);

    fs.writeFileSync('src/pixel-engine.js', firstHalf + newArrayStr + secondHalf, 'utf8');
    fs.writeFileSync('src/pixel-engine-static.js', firstHalf + newArrayStr + secondHalf, 'utf8');

    console.log("Success! Sorted monsters by level and updated God character.");
} else {
    console.error("MONSTERS array bounds not found.");
}
