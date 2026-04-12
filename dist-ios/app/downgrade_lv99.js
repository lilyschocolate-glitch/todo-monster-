import fs from 'fs';

const FILES = ['src/pixel-engine.js', 'src/pixel-engine-static.js'];

FILES.forEach(file => {
    if (fs.existsSync(file)) {
        let src = fs.readFileSync(file, 'utf8');
        // Match `level: 99` and replace to `level: 10`
        // Ensure we only replace for monster definitions (which include `level: 99, type: 'rare'`)
        let replaced = src.replace(/level:\s*99\s*,\s*type:\s*'rare'/g, "level: 10, type: 'rare'");

        // Also check for `type: 'special'` just in case
        replaced = replaced.replace(/level:\s*99\s*,\s*type:\s*'special'/g, "level: 10, type: 'special'");

        // 念のため単体の `level: 99` も拾えるようにしつつ、究極神を入れる前なので全置換して良い
        replaced = replaced.replace(/level:\s*99,/g, "level: 10,");

        fs.writeFileSync(file, replaced, 'utf8');
        console.log(`Replaced level 99 with level 10 in ${file}`);
    } else {
        console.warn(`${file} not found.`);
    }
});
