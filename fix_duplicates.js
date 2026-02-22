import fs from 'fs';

const FIX_FILES = ['./src/pixel-engine.js', './src/pixel-engine-static.js'];

// 現在、'lv7_chimera'が3回登場してしまっている。
// 意図していたのは、はしゃぐイヌコ等からの進化系としての「にじいろペンキ」(creative)と、
// 何らかの重複ミスで上書きされてしまった「なないろのツバサ」や、物理系の別モンスターなど。
//
// 本来、Lv7は以下の5属性分あるはず:
// 1. lv7_dragon (いかついタイケン/physical)
// 2. lv7_cosmos (いにしえのグリモア/intellectual)
// 3. lv7_goddess (かなでるオンンプ/social)
// 4. lv7_chimera (にじいろペンキ/creative)
// 5. lv7_void (ゆがむセカイなど/chaotic)

// すでに fix_lv6_7 実行時に
// 1. lv7_dragon (いかついタイケン) -> OK
// 2. lv7_cosmos (いにしえのグリモア) -> OK
// 3. lv7_goddess (かなでるオンンプ) -> OK
// 4. lv7_chimera (にじいろペンキ) -> これが複数回(なないろのツバサ含め)かぶってしまった。
// 5. lv7_void (ゆがんだセカイ) -> OK

// スクリプトで、「なないろのツバサ」を消し、「にじいろペンキ」も1つだけのブロックに絞り込む。

function fixDuplicates(source) {
  let result = source;
  
  // なないろのツバサ (id: 'lv7_chimera', name: 'なないろのツバサ' のブロック全体) を消す
  // ただし、以前元のコードで lv7_chimera = なないろのツバサ だったのかも。
  // それを上書きする時、// Lv6: 不死鳥 (Lesser Phoenix) 付近にあるやつ。
  const blockRegexRainbowWings = /id:\s*'lv7_chimera',\s*name:\s*'なないろのツバサ'[\s\S]*?data:\s*\[[\s\S]*?\]\s*\n\s*\},\s*\n/g;
  result = result.replace(blockRegexRainbowWings, '');

  // にじいろペンキ が2つ連続してしまっているところを1つにする。
  // "id: 'lv7_chimera', name: 'にじいろペンキ'" から "] }" のブロックが2連続している部分を探す
  const duplicateBlocks = /(id:\s*'lv7_chimera',\s*name:\s*'にじいろペンキ'[\s\S]*?data:\s*\[[\s\S]*?\]\s*\n\s*\},\s*\n)(\s*\{\s*id:\s*'lv7_chimera',\s*name:\s*'にじいろペンキ'[\s\S]*?data:\s*\[[\s\S]*?\]\s*\n\s*\},\s*\n)/g;
  result = result.replace(duplicateBlocks, '$1'); // 1つ目だけ残す

  return result;
}

FIX_FILES.forEach(file => {
  if (fs.existsSync(file)) {
    let src = fs.readFileSync(file, 'utf8');
    let updated = fixDuplicates(src);
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`Updated ${file} to remove duplicates.`);
  }
});
