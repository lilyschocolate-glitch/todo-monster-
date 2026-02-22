import fs from 'fs';

const NEW_LV99 = [
    {
        id: 'lv99_ultimate', name: 'アルティメット・デウ', level: 99, type: 'ultimate', baseId: 'kid_brave', crown: true,
        // パレット: 虹色と純金、深淵の宇宙を表現する超絶豪華な色
        // 0:transparent, 1:メイン純金, 2:輝く白金, 3:黒瞳, 4:純白, 5:虹/ピンク, 6:虹/水色, 7:虹/紫, 8:宇宙の黒
        palette: "[null, '#facc15', '#fef08a', '#000', '#fff', '#f472b6', '#38bdf8', '#c084fc', '#0f172a']",
        data: `[
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
        ]`
    }
];

let addedString = '';
for (const monster of NEW_LV99) {
    addedString += `    {
        id: '${monster.id}', name: '${monster.name}', level: ${monster.level}, type: '${monster.type}', baseId: '${monster.baseId}', crown: ${monster.crown},
        palette: ${monster.palette},
        data: ${monster.data}
    },\n`;
}

function processDynamic(src) {
    const targetStr = "    }\n);\n\n// --- 描画ロジック ---";
    const replacement = "    },\n" + addedString + ");\n\n// --- 描画ロジック ---";
    return src.replace(targetStr, replacement);
}

const dynPath = 'src/pixel-engine.js';
const statPath = 'src/pixel-engine-static.js';

let dynSrc = fs.readFileSync(dynPath, 'utf8');
dynSrc = processDynamic(dynSrc);
fs.writeFileSync(dynPath, dynSrc, 'utf8');

let statSrc = fs.readFileSync(statPath, 'utf8');
statSrc = processDynamic(statSrc); // どちらも構文が同じになったため同じ置換関数でOK
fs.writeFileSync(statPath, statSrc, 'utf8');

console.log("Ultimate LV99 God added successfully.");
