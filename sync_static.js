import fs from 'fs';

const dynSrc = fs.readFileSync('./src/pixel-engine.js', 'utf8');
const statSrc = fs.readFileSync('./src/pixel-engine-static.js', 'utf8');

// Extract the array contents from pixel-engine.js
// It starts with `export const MONSTERS = [\n`
// It ends with `\n];\n\n// --- 描画ロジック ---`
const startMarker = 'export const MONSTERS = [';
const endMarker = '];\n\n// --- 描画ロジック ---';

const startIndex = dynSrc.indexOf(startMarker);
const endIndex = dynSrc.indexOf(endMarker, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    // Array body text, starting with `\n    {\n` and ending with `\n    }`
    const arrayBody = dynSrc.substring(startIndex + startMarker.length, endIndex);
    
    // Now replace the array body in pixel-engine-static.js
    // It starts with `const MONSTERS = Object.freeze([`
    // It ends with `\n]);\n\n// --- 描画ロジック ---`
    const statStartMarker = 'const MONSTERS = Object.freeze([';
    const statEndMarker = ']);\n\n// --- 描画ロジック ---';
    
    const statStartIndex = statSrc.indexOf(statStartMarker);
    const statEndIndex = statSrc.indexOf(statEndMarker, statStartIndex);
    
    if (statStartIndex !== -1 && statEndIndex !== -1) {
        const updatedStatSrc = statSrc.substring(0, statStartIndex + statStartMarker.length) 
                             + arrayBody 
                             + statSrc.substring(statEndIndex);
        fs.writeFileSync('./src/pixel-engine-static.js', updatedStatSrc, 'utf8');
        console.log('Successfully synchronized MONSTERS array to pixel-engine-static.js');
    } else {
        console.error('Could not find markers in pixel-engine-static.js');
    }
} else {
    console.error('Could not find markers in pixel-engine.js');
}
