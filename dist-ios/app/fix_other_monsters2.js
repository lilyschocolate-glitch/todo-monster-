import fs from 'fs';

const FILES = ['./src/pixel-engine.js', './src/pixel-engine-static.js'];

FILES.forEach(file => {
  if (fs.existsSync(file)) {
    let src = fs.readFileSync(file, 'utf8');
    
    // 行単位で不完全な配列を検出して修正する
    // lv8_colossus と spec_thunder_lord について具体的に置換
    
    // lv8_colossus
    src = src.replace(/id:\s*'lv8_colossus'.*?data:\s*\[([\s\S]*?)\]\s*\n\s*\}/g, (match) => {
        let lines = match.split('\n');
        lines = lines.map(line => {
            if (line.includes('[') && line.includes(']')) {
                 let arrStr = line.substring(line.indexOf('[') + 1, line.lastIndexOf(']'));
                 let parts = arrStr.split(',').map(s=>s.trim()).filter(s=>s!=='');
                 if (parts.length === 15) {
                     parts.push('0');
                     return line.substring(0, line.indexOf('[')) + '[' + parts.join(', ') + ']' + line.substring(line.lastIndexOf(']')+1);
                 }
            }
            return line;
        });
        return lines.join('\n');
    });

    // spec_thunder_lord
    src = src.replace(/id:\s*'spec_thunder_lord'.*?data:\s*\[([\s\S]*?)\]\s*\n\s*\}/g, (match) => {
        let lines = match.split('\n');
        lines = lines.map(line => {
            if (line.includes('[') && line.includes(']')) {
                 let arrStr = line.substring(line.indexOf('[') + 1, line.lastIndexOf(']'));
                 let parts = arrStr.split(',').map(s=>s.trim()).filter(s=>s!=='');
                 if (parts.length === 15) {
                     parts.push('0');
                     return line.substring(0, line.indexOf('[')) + '[' + parts.join(', ') + ']' + line.substring(line.lastIndexOf(']')+1);
                 }
            }
            return line;
        });
        return lines.join('\n');
    });

    fs.writeFileSync(file, src, 'utf8');
    console.log(`Fixed arrays in ${file}`);
  }
});
