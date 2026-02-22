import fs from 'fs';
const FILES = ['./src/pixel-engine.js', './src/pixel-engine-static.js'];
FILES.forEach(file => {
  if (fs.existsSync(file)) {
    let src = fs.readFileSync(file, 'utf8');
    // Remove the incorrectly injected array elements inside drawMonster
    src = src.replace(/MONSTERS\[0\s*\{[\s\S]+?\];\n\s*const \{\s*data/, 'MONSTERS[0];\n    const { data');
    fs.writeFileSync(file, src, 'utf8');
    console.log(`Cleaned ${file}`);
  }
});
