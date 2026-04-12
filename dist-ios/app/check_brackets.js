const fs = require('fs');
const src = fs.readFileSync('src/pixel-engine.js', 'utf8');
let round = 0, curly = 0, square = 0;
let lines = src.split('\n');
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    // Very simple counting, ignoring strings/comments
    line = line.replace(/\/\/.*/, '');
    for (let c of line) {
        if (c === '(') round++;
        if (c === ')') round--;
        if (c === '{') curly++;
        if (c === '}') curly--;
        if (c === '[') square++;
        if (c === ']') square--;
    }
    if (round < 0 || curly < 0 || square < 0) {
        console.log(`Mismatch at line ${i+1}: round=${round}, curly=${curly}, square=${square}`);
        break;
    }
    if(i > 2270 && i < 2295) {
      console.log(`Line ${i+1} : round=${round}, curly=${curly}, square=${square}`);
    }
}
console.log(`Final count: round=${round}, curly=${curly}, square=${square}`);
