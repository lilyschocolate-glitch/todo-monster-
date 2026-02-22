import fs from 'fs';

const FILES = ['./src/pixel-engine.js', './src/pixel-engine-static.js'];

FILES.forEach(file => {
  if (fs.existsSync(file)) {
    let src = fs.readFileSync(file, 'utf8');
    
    // lv8_colossus
    src = src.replace(/id:\s*'lv8_colossus'(.*?)data:\s*\[([\s\S]*?)\]\s*\n\s*\}/, (match, p1, oldData) => {
        const newData = oldData.split('\n').map(line => {
             // 要素が15個だったら最後に0を追加
             if (line.match(/\[(.*?)\]/)) {
                 const arrMatch = line.match(/\[(.*?)\]/)[1];
                 const parts = arrMatch.split(',').map(s=>s.trim());
                 if (parts.length === 15) {
                     return line.replace(/\[(.*?)\]/, `[$1, 0]`);
                 }
             }
             return line;
        }).join('\n');
        return `id: 'lv8_colossus'${p1}data: [${newData}]\n    }`;
    });

    // spec_thunder_lord 
    src = src.replace(/id:\s*'spec_thunder_lord'(.*?)data:\s*\[([\s\S]*?)\]\s*\n\s*\}/, (match, p1, oldData) => {
        const newData = oldData.split('\n').map(line => {
             // 要素が15個だったら最後に0を追加
             if (line.match(/\[(.*?)\]/)) {
                 const arrMatch = line.match(/\[(.*?)\]/)[1];
                 const parts = arrMatch.split(',').map(s=>s.trim());
                 if (parts.length === 15) {
                     return line.replace(/\[(.*?)\]/, `[$1, 0]`);
                 }
             }
             return line;
        }).join('\n');
        return `id: 'spec_thunder_lord'${p1}data: [${newData}]\n    }`;
    });

    fs.writeFileSync(file, src, 'utf8');
    console.log(`Fixed arrays in ${file}`);
  }
});
