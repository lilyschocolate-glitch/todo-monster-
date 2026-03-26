/**
 * 開発者専用デバッグ機能 (localhost 限定)
 */
import { saveData } from './store.js';
import { playground } from './playground.js';
import { ITEMS } from './items.js';

export function initDebug() {
    // localhost以外では何もしない
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        console.log("Production environment: Debug menu disabled.");
        return;
    }

    console.log("Development environment: Initializing Debug Menu...");

    // デバッグボタンを表示
    const debugBtn = document.getElementById('debug-trigger-btn');
    if (debugBtn) {
        debugBtn.style.display = 'flex';
        debugBtn.onclick = () => window.openModal('debug-modal');
    }

    // イベント紐付け
    setupDebugEvents();
}

function setupDebugEvents() {
    const actions = {
        'debug-populate-data': populateTestData,
        'debug-lv-up': quickLevelUp,
        'debug-unlock-items': unlockAllItems,
        'debug-clear-storage': () => {
            if (confirm('LocalStorageを完全にクリアしますか？')) {
                localStorage.clear();
                location.reload();
            }
        }
    };

    for (const [id, func] of Object.entries(actions)) {
        const el = document.getElementById(id);
        if (el) el.onclick = func;
    }
}

/** テスト用データの流し込み */
function populateTestData() {
    const data = window.todoMonsterData;
    if (!data) return;

    // 名前設定
    data.ownerName = "テストマスター";

    // 背景をサイバーパンクに
    data.customization.background = 'bg_cyber';

    // モンスターのレベル上げ
    data.character.level = 5;
    data.character.id = 'lv5_samurai'; // 内部IDをセット
    data.character.name = 'けんごうサムライ'; // 表示名をセット
    data.character.branch = 'physical';

    // フレンド追加 (有効なIDを指定)
    data.friends = [
        { id: 'kid_brave', name: 'あついツノ', level: 3, branch: 'physical' },
        { id: 'baby_fuzz', name: 'ふわふわけだま', level: 2, branch: 'intellectual' }
    ];

    // 殿堂入りにも追加
    if (data.hallOfFame.length === 0) {
        data.hallOfFame.push({
            name: 'きらメクスター',
            level: 4,
            branch: 'social',
            generation: 0
        });
    }

    // アイテム（伝説素材など）をいくつか付与
    data.items['moon_stone'] = 3;
    data.items['gear_of_destiny'] = 1;
    data.items['bg_cyber'] = 1;

    saveData(data);
    alert(i18next.t('debug.test_data_applied', { defaultValue: 'テストデータを適用しました。リロードします！' }));
    location.reload();
}

/** クイックレベルアップ */
function quickLevelUp() {
    const data = window.todoMonsterData;
    if (!data) return;

    data.character.level = Math.min(10, (data.character.level || 1) + 1);
    saveData(data);
    alert(i18next.t('debug.level_up', { level: data.character.level, defaultValue: `レベルを ${data.character.level} に上げました。有効にするにはリロードしてください。` }));
    location.reload();
}

/** 全アイテム解放 & サポーター化 */
function unlockAllItems() {
    const data = window.todoMonsterData;
    if (!data) return;

    data.isSupporter = true;
    Object.keys(ITEMS).forEach(id => {
        data.items[id] = 10;
    });

    saveData(data);
    alert(i18next.t('message.all_unlocked', { defaultValue: '全アイテムを解放し、サポーター特典（金色オーラ）を有効にしました！' }));
    location.reload();
}
