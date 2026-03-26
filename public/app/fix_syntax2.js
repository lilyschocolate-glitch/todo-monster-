import fs from 'fs';
const FILES = ['./src/pixel-engine.js', './src/pixel-engine-static.js'];
FILES.forEach(file => {
  if (fs.existsSync(file)) {
    let src = fs.readFileSync(file, 'utf8');
    // Replace "}    {" with "},\n    {"
    src = src.replace(/\}\s*\{\s*id:\s*'lv5_samurai'/g, '},\n    {\n        id: \'lv5_samurai\'');
    fs.writeFileSync(file, src, 'utf8');
    console.log(`Cleaned ${file}`);
  }
});
