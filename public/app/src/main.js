/**
 * メインエントリポイント — アプリ起動
 */

import { initI18n } from './i18n.js';
import { initUI, triggerChat } from './ui.js';
import { playground } from './playground.js';
import { initDebug } from './debug.js';
import { ICONS } from './icons.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await initI18n();
    } catch (e) {
        console.error("i18n init failed:", e);
    }
    initUI();
    initDebug();
});


