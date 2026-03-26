/**
 * キャラクター進化ロジック — 経験値と5系統分岐、151体の名前テーブル
 */

import { getMonsterSpec } from './pixel-engine.js';

// 経験値テーブル (次のレベルに必要な累積Exp)
// 1日10タスク × 30日 = 300タスクでLv10到達
export const EXP_PER_TASK = 10;
const EXP_TABLE = [
    0,      // Lv1  (0タスク)    - タマゴ
    30,     // Lv2  (3タスク)    - ベビー
    100,    // Lv3  (10タスク)   - キッズ
    250,    // Lv4  (25タスク)   - ティーン
    500,    // Lv5  (50タスク)   - アダルト
    800,    // Lv6  (80タスク)   - ベテラン
    1200,   // Lv7  (120タスク)  - マスター
    1700,   // Lv8  (170タスク)  - チャンプ
    2300,   // Lv9  (230タスク)  - ヒーロー
    3000,   // Lv10 (300タスク)  - レジェンド
    99999   // MAX
];

/** 系統別の説明テキスト */
const BRANCH_DESC = {
    creative: '色と形を操る芸術派',
    physical: '筋肉で全てを解決する脳筋派',
    social: '話し上手の人気者',
    intellectual: '知識を貪る賢者タイプ',
    chaotic: '予測不能のトリックスター',
};

/** 現在の段階名を返す */
export function getStageName(char) {
    const spec = getMonsterSpec(char.name, char.level, char.branch);
    return spec.desc || '謎の存在';
}

/** 系統の説明テキストを返す */
export function getBranchDescription(branch) {
    return BRANCH_DESC[branch] || '';
}

/** 次のレベルまでの必要経験値を返す */
export function getExpToNext(character) {
    if (character.level >= 10) return 0;
    return EXP_TABLE[character.level] - character.exp; // EXP_TABLEは次のレベルに必要な累積経験値なので、現在の累積経験値との差を返す
}

/** 現在レベルの経験値進捗を0.0-1.0で返す */
export function getExpProgress(character) {
    if (character.level >= 10) return 1.0;
    const currentLevelExpThreshold = character.level === 1 ? 0 : EXP_TABLE[character.level - 1]; // Lv1の閾値は0
    const nextLevelExpThreshold = EXP_TABLE[character.level];
    const range = nextLevelExpThreshold - currentLevelExpThreshold;
    if (range <= 0) return 1.0;
    return Math.min(1.0, (character.exp - currentLevelExpThreshold) / range);
}

/**
 * 経験値を加算し、進化判定を行う
 * 戻り値: { character, evolved: boolean, newStageName: string|null }
 */
export function addExp(char, personality, amount = EXP_PER_TASK) {
    // ... (既存ロジックだが、進化時の名前決定を簡素化)
    const updated = { ...char };
    updated.exp = (Number(updated.exp) || 0) + amount;

    let evolved = false;
    let newStageName = null;

    // レベルアップチェック
    // EXP_TABLE[Lv] が次のレベルに必要な累積経験値
    while (updated.level < 10 && updated.exp >= EXP_TABLE[updated.level]) {
        updated.level++;
        evolved = true;

        // 分岐決定
        const dominant = getDominantTrait(personality);

        if (updated.level === 2) {
            // Lv2への進化時は性格の傾向で初期分岐
            updated.branch = dominant;
        } else if (updated.level >= 3) {
            updated.branch = dominant;
        }

        const spec = getMonsterSpec(updated.name, updated.level, updated.branch);
        updated.name = spec.name; // IDをnameとして保存
        newStageName = spec.desc;
    }

    return { character: updated, evolved, newStageName };
}

function getDominantTrait(p) {
    let maxKey = 'physical';
    let maxVal = -1;
    // personalityオブジェクトが空の場合のガード
    if (!p) return 'physical';

    for (const [k, v] of Object.entries(p)) {
        if (v > maxVal) { maxVal = v; maxKey = k; }
    }
    return maxKey;
}
