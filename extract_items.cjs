const fs = require('fs');

const itemsCode = fs.readFileSync('src/items.js', 'utf8');
const lines = itemsCode.split('\n');

const descJa = {};
const descEn = {};

let currentId = null;

for (const line of lines) {
    const idMatch = line.match(/id:\s*'([^']+)'/);
    if (idMatch) {
        currentId = idMatch[1];
    }
    const descMatch = line.match(/desc:\s*'([^']+)'/);
    if (descMatch && currentId) {
        descJa[currentId] = descMatch[1];
        currentId = null;
    }
}

console.log(JSON.stringify(descJa, null, 2));
