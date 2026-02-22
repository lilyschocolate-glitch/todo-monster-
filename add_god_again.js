import fs from 'fs';

let dynSrc = fs.readFileSync('src/pixel-engine.js', 'utf8');

const endMatch = dynSrc.indexOf('];\n\nexport function getMonsterSpec');

if (endMatch !== -1) {
    const insertStr = `,
    {
        id: 'lv99_ultimate', name: 'やることゴッド', level: 99, type: 'ultimate', baseId: 'kid_brave', crown: true,
        palette: [null, '#facc15', '#fef08a', '#ca8a04', '#ffffff', '#fdf4ff', '#fef9c3', '#eab308', '#713f12'],
        data: [
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
        ]
    }
`;
    // '];\n\n'の前にカンマと新要素をねじ込む
    const newSrc = dynSrc.substring(0, endMatch) + insertStr + dynSrc.substring(endMatch);
    fs.writeFileSync('src/pixel-engine.js', newSrc, 'utf8');
    fs.writeFileSync('src/pixel-engine-static.js', newSrc, 'utf8');
    console.log("God re-inserted successfully.");
} else {
    console.error("End match not found.");
}
