import fs from 'fs';

const dynSrc = fs.readFileSync('src/pixel-engine.js', 'utf8');
const statSrc = fs.readFileSync('src/pixel-engine-static.js', 'utf8');

// Find the start of lv5_samurai in dynSrc
const startIndex = dynSrc.indexOf("    {\n        id: 'lv5_samurai'");
if (startIndex === -1) {
    console.error("Could not find lv5_samurai in pixel-engine.js");
    process.exit(1);
}

// Find the end: );
// But wait, they are added BEFORE the closing `);` of MONSTERS.push.
// Actually, I can just find the precise text block from dynSrc.
const endString = "    }\n);\n\n// --- 描画ロジック ---";
const endIndex = dynSrc.indexOf(endString, startIndex);
if (endIndex === -1) {
    console.error("Could not find the end marker in pixel-engine.js");
    process.exit(1);
}

// The block to insert: ",\n" + arrayBody (which starts with spaces)
const blockToInsert = ",\n" + dynSrc.substring(startIndex, endIndex + 5);
// endIndex + 5 includes `    }` but NOT `\n);`

// Now find where to insert in statSrc
const statTarget = "    }\n);\n\n// --- 描画ロジック ---";
const statReplace = blockToInsert + "\n);\n\n// --- 描画ロジック ---";

const newStatSrc = statSrc.replace(statTarget, statReplace);

if (newStatSrc === statSrc) {
    console.error("Replacement failed in pixel-engine-static.js");
    process.exit(1);
}

fs.writeFileSync('src/pixel-engine-static.js', newStatSrc, 'utf8');
console.log("Successfully appended new monsters to pixel-engine-static.js");
