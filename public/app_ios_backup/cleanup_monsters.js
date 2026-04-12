import fs from 'fs';
const FILES = ['src/pixel-engine.js', 'src/pixel-engine-static.js'];

FILES.forEach(file => {
    if (fs.existsSync(file)) {
        let src = fs.readFileSync(file, 'utf8');

        // Delete lv8_minotaur
        src = src.replace(/\{\s*id:\s*'lv8_minotaur'[\s\S]+?\]\n    \},?\n?/g, '');

        // Delete lv10_chaos_king name: すべてをのむトクイテン
        src = src.replace(/\{\s*id:\s*'lv10_chaos_king',\s*name:\s*'すべてをのむトクイテン'[\s\S]+?\]\n    \},?\n?/g, '');

        fs.writeFileSync(file, src, 'utf8');
        console.log(`Cleaned ${file}`);
    }
});
