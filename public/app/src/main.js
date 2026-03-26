/**
 * メインエントリポイント — アプリ起動
 */

import { initUI, triggerChat } from './ui.js';
import { playground } from './playground.js';

// DOMが読み込まれたらUI初期化
document.addEventListener('DOMContentLoaded', () => {
    initUI();
});
