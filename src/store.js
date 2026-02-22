/**
 * ストア — localStorageによるデータ永続化
 */

import { MONSTERS } from './pixel-engine.js';

const STORAGE_KEY = 'todo-monster-data';

/** プロトタイプフレンド5体（各系統1体ずつ） */
const PROTOTYPE_FRIENDS = [
    {
        id: 'proto_phy',
        name: 'あついツノ',
        level: 3,
        branch: 'physical',
        ownerName: 'ゲームせかい',
        personalitySummary: '体を動かすのが好きで元気いっぱい',
        personality: { creative: 2, physical: 18, social: 5, intellectual: 1, chaotic: 4 },
    },
    {
        id: 'proto_int',
        name: 'ふわふわけだま',
        level: 2,
        branch: 'intellectual',
        ownerName: 'ゲームせかい',
        personalitySummary: '知識欲が強くて好奇心旺盛',
        personality: { creative: 3, physical: 1, social: 2, intellectual: 16, chaotic: 3 },
    },
    {
        id: 'proto_soc',
        name: 'やさしいハナ',
        level: 3,
        branch: 'social',
        ownerName: 'ゲームせかい',
        personalitySummary: '人懐っこくてみんなの人気者',
        personality: { creative: 4, physical: 2, social: 20, intellectual: 3, chaotic: 1 },
    },
    {
        id: 'proto_cre',
        name: 'はしゃぐイヌコ',
        level: 3,
        branch: 'creative',
        ownerName: 'ゲームせかい',
        personalitySummary: 'クリエイティブで発想力豊か',
        personality: { creative: 17, physical: 3, social: 4, intellectual: 2, chaotic: 4 },
    },
    {
        id: 'proto_cha',
        name: 'ふしぎなカゲ',
        level: 3,
        branch: 'chaotic',
        ownerName: 'ゲームせかい',
        personalitySummary: '自由奔放で予測不能',
        personality: { creative: 3, physical: 2, social: 3, intellectual: 2, chaotic: 15 },
    },
];

/** 現在のデータ形式バージョン */
const CURRENT_DATA_VERSION = 1;

/** デフォルトのデータ構造 */
function createDefaultData() {
    return {
        version: CURRENT_DATA_VERSION,
        todos: [],
        character: {
            name: 'ねむいタマゴ',
            level: 1,
            exp: 0,
            branch: null, // 進化系統（creative, physical, social, intellectual, chaotic）
        },
        personality: {
            creative: 0,
            physical: 0,
            social: 0,
            intellectual: 0,
            chaotic: 0,
        },
        chatLog: [],
        apiKey: '',
        friends: [],
        lastAccessDate: '',
        ownerName: '', // プレイヤー名（初回起動時に設定）
        generation: 1, // 何代目のキャラか
        hallOfFame: [], // 殿堂入りキャラ配列
        discoveredMonsters: ['egg', 'partner_aibou'], // 発見したモンスターID一覧
        unlockedRareMonsters: [{
            ...MONSTERS.find(m => m.id === 'partner_aibou'),
            branch: null,
            personalitySummary: 'いつもそばにいるよ',
        }], // 箱庭に登場させる解放済みレアキャラ
        totalCompleted: 0, // 累計完了タスク数（全世代通算）
        items: {}, // 所持アイテム { item_id: count }
        isVip: false, // 特別パック購入済み（広告なしなど）
        isSupporter: false, // 全力応援パック購入済み（全アイテム解放済み）
        purchasedPlans: [], // 購入済みプランID一覧
        customization: {
            background: 'bg_default',
            furniture: []
        }
    };
}


/**
 * キャラを殿堂入りさせて新タマゴで再スタートする
 * todosはそのまま引き継ぐ
 */
export function graduateCharacter(data) {
    // 殿堂入り保存
    data.hallOfFame.push({
        name: data.character.name,
        level: data.character.level,
        branch: data.character.branch,
        exp: data.character.exp,
        personality: { ...data.personality },
        generation: data.generation,
        graduatedAt: Date.now(),
    });

    // キャラクターをリセット（タスクは残す）
    data.character = {
        name: 'ねむいタマゴ',
        level: 1,
        exp: 0,
        branch: null,
    };
    data.personality = {
        creative: 0,
        physical: 0,
        social: 0,
        intellectual: 0,
        chaotic: 0,
    };
    data.generation++;
    data.chatLog = [];

    return data;
}

/** 保存されたデータを読み込む。なければデフォルト値 */
export function loadData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return createDefaultData();

        const saved = JSON.parse(raw);
        // バージョン互換: 欠けてるフィールドはデフォルトで埋める
        const defaults = createDefaultData();

        // メインマージ
        const data = {
            ...defaults,
            ...saved,
            character: { ...defaults.character, ...saved.character },
            personality: { ...defaults.personality, ...saved.personality },
            customization: { ...defaults.customization, ...saved.customization }
        };

        // バージョン管理が導入される前の古いデータを現在のバージョンに設定
        if (!data.version) {
            data.version = CURRENT_DATA_VERSION;
        }

        // --- 強制初期化・欠損補完 ---
        // マイグレーション処理の前に行うことで、メソッド呼び出し（includes/filter等）の安全を確保
        if (!data.lastAccessDate) data.lastAccessDate = '';
        if (!data.ownerName) data.ownerName = '';
        if (!data.generation) data.generation = 1;
        if (!Array.isArray(data.todos)) data.todos = [];
        if (!Array.isArray(data.hallOfFame)) data.hallOfFame = [];
        if (!Array.isArray(data.friends)) data.friends = [];
        if (!Array.isArray(data.discoveredMonsters)) data.discoveredMonsters = ['egg'];
        if (!Array.isArray(data.unlockedRareMonsters)) data.unlockedRareMonsters = [];
        if (!Array.isArray(data.chatLog)) data.chatLog = []; // 追加
        if (!data.totalCompleted) data.totalCompleted = 0;
        if (!data.items) data.items = {};
        if (data.isVip === undefined) data.isVip = false;
        if (data.isSupporter === undefined) data.isSupporter = false;
        if (!Array.isArray(data.purchasedPlans)) data.purchasedPlans = [];
        if (!data.customization) data.customization = { background: 'bg_default', furniture: [] };

        // マイグレーション: あいぼうを追加 (既存データにない場合)
        if (!data.discoveredMonsters.includes('partner_aibou')) {
            data.discoveredMonsters.push('partner_aibou');
        }

        // データ復旧: friendsに自分(egg)やあいぼうが混入していたら削除
        data.friends = data.friends.filter(f => f.id !== 'egg' && f.id !== 'partner_aibou');

        // あいぼうデータの強制修復
        const aibouIndex = data.unlockedRareMonsters.findIndex(m => m.id === 'partner_aibou');
        const aibouSpec = MONSTERS.find(m => m.id === 'partner_aibou');

        if (aibouIndex >= 0) {
            data.unlockedRareMonsters[aibouIndex] = {
                ...data.unlockedRareMonsters[aibouIndex],
                ...aibouSpec,
                branch: null,
                personalitySummary: 'いつもそばにいるよ',
            };
        } else {
            data.unlockedRareMonsters.unshift({
                ...aibouSpec,
                branch: null,
                personalitySummary: 'いつもそばにいるよ',
            });
        }

        // v2マイグレーション: friend(単体) → friends(配列)
        if (saved.friend && !saved.friends) {
            data.friends = [saved.friend];
        }

        // 配列の重複排除（IDベース）
        const uniqueIds = new Set();
        data.unlockedRareMonsters = data.unlockedRareMonsters.filter(m => {
            if (uniqueIds.has(m.id)) return false;
            uniqueIds.add(m.id);
            return true;
        });

        if (!data.totalCompleted) data.totalCompleted = 0;
        if (!data.items) data.items = {};
        if (data.isVip === undefined) data.isVip = false;
        if (data.isSupporter === undefined) data.isSupporter = false;
        if (!Array.isArray(data.purchasedPlans)) data.purchasedPlans = [];
        if (!data.customization) data.customization = { background: 'bg_default', furniture: [] };

        // マイグレーション: background が 'default' になっている既存ユーザーを 'bg_default' に修正
        if (data.customization.background === 'default') {
            data.customization.background = 'bg_default';
        }

        // --- 安全装置: データの異常肥大化（無限増殖）を防ぐ ---
        const MAX_TODOS = 2000;
        const MAX_LIST = 100;
        if (data.todos.length > MAX_TODOS) data.todos = data.todos.slice(0, MAX_TODOS);
        if (data.hallOfFame.length > MAX_LIST) data.hallOfFame = data.hallOfFame.slice(0, MAX_LIST);
        if (data.friends.length > MAX_LIST) data.friends = data.friends.slice(0, MAX_LIST);
        if (data.unlockedRareMonsters.length > MAX_LIST) data.unlockedRareMonsters = data.unlockedRareMonsters.slice(0, MAX_LIST);
        if (data.chatLog && data.chatLog.length > 100) data.chatLog = data.chatLog.slice(-100);

        // 重複排除 (hallOfFame)
        if (data.hallOfFame.length > 0) {
            const seenFame = new Set();
            data.hallOfFame = data.hallOfFame.filter(h => {
                const key = `${h.id}-${h.generation}`;
                if (seenFame.has(key)) return false;
                seenFame.add(key);
                return true;
            });
        }

        // todosにscheduledDateがない古いデータの救済
        for (const todo of data.todos) {
            if (!todo.scheduledDate) {
                if (todo.completedAt) {
                    const d = new Date(todo.completedAt);
                    todo.scheduledDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                } else {
                    const d = new Date();
                    todo.scheduledDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                }
            }
            if (todo.isRecurring === undefined) {
                todo.isRecurring = false;
            }
        }

        return data;
    } catch (e) {
        console.error('Data Load Error:', e);
        return createDefaultData();
    }
}

/** データを保存 */
export function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** 全データ消去 */
export function clearData() {
    localStorage.removeItem(STORAGE_KEY);
}
