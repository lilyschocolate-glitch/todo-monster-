import fs from 'fs';

const NEW_MONSTER_DATA = {
    'partner_aibou': {
        palette: "[null, '#facc15', '#f59e0b', '#000', '#fff', '#ef4444', '#3b82f6', '#93c5fd', '#ca8a04']",
        data: `[
            [0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0], // 6=青い帽子
            [0, 0, 0, 0, 6, 6, 7, 7, 7, 7, 6, 6, 0, 0, 0, 0], // 7=水色ハイライト
            [0, 0, 0, 0, 6, 7, 7, 7, 7, 7, 7, 6, 0, 0, 0, 0],
            [0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0],
            [0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0],
            [0, 0, 0, 8, 1, 1, 1, 1, 1, 1, 1, 1, 8, 0, 0, 0], // 1=黄色の顔
            [0, 0, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 0, 0],
            [0, 0, 8, 1, 3, 4, 1, 1, 1, 1, 3, 4, 1, 8, 0, 0], // 3=眼(黒), 4=瞳(白)
            [0, 0, 8, 1, 3, 3, 1, 1, 1, 1, 3, 3, 1, 8, 0, 0],
            [0, 0, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 0, 0],
            [0, 0, 8, 1, 5, 5, 1, 3, 3, 1, 5, 5, 1, 8, 0, 0], // 5=赤いほっぺ
            [0, 0, 8, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 8, 0, 0], // 口
            [0, 0, 0, 8, 8, 1, 1, 1, 1, 1, 1, 8, 8, 0, 0, 0],
            [0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 8, 3, 3, 3, 3, 8, 0, 0, 0, 0, 0], // 足
            [0, 0, 0, 0, 0, 8, 8, 0, 0, 8, 8, 0, 0, 0, 0, 0]
        ]`
    },
    'egg': {
        palette: "[null, '#fff', '#f1f5f9', '#000', '#fff', '#fecdd3', '#fbcfe8', '#cbd5e1', '#94a3b8']",
        data: `[
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0], // 8=グレー線
            [0, 0, 0, 0, 0, 8, 1, 1, 1, 1, 8, 0, 0, 0, 0, 0], // 1=白
            [0, 0, 0, 0, 8, 1, 4, 1, 1, 1, 1, 8, 0, 0, 0, 0], // 4=ハイライト
            [0, 0, 0, 8, 1, 4, 1, 1, 1, 1, 1, 1, 8, 0, 0, 0],
            [0, 0, 8, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 8, 0, 0], // 2=薄い影の模様
            [0, 0, 8, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 8, 0, 0],
            [0, 8, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 8, 0], // 3=閉じた目(黒)
            [0, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 0],
            [0, 8, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 8, 0], // 5=かすかな赤み
            [0, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 0],
            [0, 8, 1, 7, 7, 1, 1, 1, 1, 1, 7, 7, 1, 1, 8, 0], // 7=下部の影
            [0, 0, 8, 2, 2, 7, 7, 7, 7, 7, 2, 2, 1, 8, 0, 0],
            [0, 0, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 0, 0],
            [0, 0, 0, 8, 7, 7, 7, 7, 7, 7, 7, 7, 8, 0, 0, 0],
            [0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0]
        ]`
    }
};

const FILES = ['./src/pixel-engine.js', './src/pixel-engine-static.js'];

function replaceMonsterData(source) {
  let result = source;
  for (const [id, newData] of Object.entries(NEW_MONSTER_DATA)) {
    const blockRegex = new RegExp(`(id:\\s*'${id}'.*?palette:\\s*\\[)(.*?)(\\],.*?data:\\s*\\[)(.*?)(\\]\\s*\\n*\\s*\\})`, 's');
    
    result = result.replace(blockRegex, (match, p1, p2, p3, p4, p5) => {
      // Extract the new palette contents from the string (remove outer brackets)
      let replacementPalette = newData.palette.trim();
      if (replacementPalette.startsWith('[')) replacementPalette = replacementPalette.substring(1);
      if (replacementPalette.endsWith(']')) replacementPalette = replacementPalette.substring(0, replacementPalette.length - 1);
      
      // Extract the new data contents from the string
      let replacementData = newData.data.trim();
      if (replacementData.startsWith('[')) replacementData = replacementData.substring(1);
      if (replacementData.endsWith(']')) replacementData = replacementData.substring(0, replacementData.length - 1);
      
      return p1 + replacementPalette + p3 + replacementData + p5;
    });
  }
  return result;
}

FILES.forEach(file => {
  if (fs.existsSync(file)) {
    let src = fs.readFileSync(file, 'utf8');
    let updated = replaceMonsterData(src);
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`Updated ${file}`);
  }
});
