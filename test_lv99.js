// 究極神出現テスト用スクリプト
import { MONSTERS } from './src/pixel-engine.js';
import fs from 'fs';

let data;
try {
    const raw = fs.readFileSync('TODO_MONSTER_DATA.json', 'utf8'); // ブラウザ上でlocalStorageとして扱うデータを模擬する想定がないのでこれはスキップ。ブラウザでlocalStorageを直接叩くのが早い。
} catch (e) { }
