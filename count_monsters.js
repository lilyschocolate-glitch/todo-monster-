import fs from 'fs';

const src = fs.readFileSync('src/pixel-engine-static.js', 'utf8');

// Match `id: 'lv[0-9]+_`
const matches = src.match(/id:\s*'lv[0-9]+_[^']+'/g) || [];

let counts = {};
for (const m of matches) {
    // m is like `id: 'lv6_golem'`
    const levelMatch = m.match(/lv([0-9]+)_/);
    if (levelMatch) {
        const lv = levelMatch[1];
        counts[lv] = (counts[lv] || 0) + 1;
    }
}
console.log("Monster counts by level in static file:");
console.log(counts);
