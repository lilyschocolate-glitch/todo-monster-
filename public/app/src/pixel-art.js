/**
 * ピクセルアート描画 — Canvasで5段階×5系統のドット絵を描画
 *
 * 各セルは1つの色情報を持つ2D配列。
 * 0=透明, 1-9=色番号（パレットから参照）
 */

/** 系統ごとのカラーパレット（インデックス1-9に対応する色） */
const PALETTES = {
    default: [
        null,         // 0: 透明
        '#f8f8f0',    // 1: 白
        '#2d2d3d',    // 2: 黒に近い紺
        '#ff6b9d',    // 3: ピンク
        '#c44dff',    // 4: 紫
        '#ffd93d',    // 5: 黄
        '#6bcb77',    // 6: 緑
        '#4d96ff',    // 7: 青
        '#ff8c42',    // 8: オレンジ
        '#ff4d4d',    // 9: 赤
    ],
    creative: [
        null,
        '#fff5f5',    // 1: クリーム
        '#2d2040',    // 2: 暗紫
        '#ff6ec7',    // 3: ホットピンク
        '#a855f7',    // 4: 紫
        '#fbbf24',    // 5: ゴールド
        '#34d399',    // 6: エメラルド
        '#60a5fa',    // 7: スカイブルー
        '#fb923c',    // 8: オレンジ
        '#f43f5e',    // 9: ローズ
    ],
    physical: [
        null,
        '#fff1f1',    // 1: 薄赤
        '#1a1a2e',    // 2: ダークネイビー
        '#ef4444',    // 3: 赤
        '#dc2626',    // 4: 深い赤
        '#f59e0b',    // 5: 琥珀
        '#84cc16',    // 6: ライム
        '#3b82f6',    // 7: 青
        '#f97316',    // 8: オレンジ
        '#b91c1c',    // 9: 暗い赤
    ],
    social: [
        null,
        '#fef9ef',    // 1: アイボリー
        '#312e2a',    // 2: ブラウン
        '#fb7185',    // 3: ピンク
        '#f472b6',    // 4: ローズ
        '#fcd34d',    // 5: サンイエロー
        '#4ade80',    // 6: グリーン
        '#38bdf8',    // 7: ライトブルー
        '#fdba74',    // 8: ピーチ
        '#e11d48',    // 9: クリムゾン
    ],
    intellectual: [
        null,
        '#f0f4ff',    // 1: アイスブルー
        '#1e1b4b',    // 2: インディゴ
        '#818cf8',    // 3: ラベンダー
        '#6366f1',    // 4: インディゴ
        '#a78bfa',    // 5: パープル
        '#22d3ee',    // 6: シアン
        '#3b82f6',    // 7: ブルー
        '#8b5cf6',    // 8: バイオレット
        '#4338ca',    // 9: ダークインディゴ
    ],
    chaotic: [
        null,
        '#fdf4ff',    // 1: 薄ピンク
        '#18181b',    // 2: 黒
        '#e879f9',    // 3: フリーシア
        '#f97316',    // 4: オレンジ
        '#22d3ee',    // 5: ターコイズ
        '#a3e635',    // 6: ライムグリーン
        '#f43f5e',    // 7: レッド
        '#fbbf24',    // 8: イエロー
        '#8b5cf6',    // 9: パープル
    ],
};

// --- スプライトデータ（12×12ピクセル） ---

/** Lv1: タマゴ（全系統共通） */
const SPRITE_EGG = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 1, 1, 5, 0, 0, 0, 0],
    [0, 0, 0, 5, 1, 1, 1, 1, 5, 0, 0, 0],
    [0, 0, 0, 5, 1, 1, 1, 1, 5, 0, 0, 0],
    [0, 0, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
    [0, 0, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
    [0, 0, 5, 1, 3, 1, 1, 3, 1, 5, 0, 0],
    [0, 0, 5, 1, 1, 1, 1, 1, 1, 5, 0, 0],
    [0, 0, 0, 5, 1, 1, 1, 1, 5, 0, 0, 0],
    [0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/** Lv2: もちまる（全系統共通）— 丸っこいスライム */
const SPRITE_MOCHI = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 1, 1, 3, 3, 0, 0, 0],
    [0, 0, 3, 3, 1, 1, 1, 1, 3, 3, 0, 0],
    [0, 0, 3, 1, 2, 1, 1, 2, 1, 3, 0, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 0, 3, 1, 1, 5, 5, 1, 1, 3, 0, 0],
    [0, 0, 3, 3, 1, 1, 1, 1, 3, 3, 0, 0],
    [0, 0, 0, 3, 3, 1, 1, 3, 3, 0, 0, 0],
    [0, 0, 0, 3, 1, 3, 3, 1, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// --- 系統別Lv3-5 スプライト ---

/** クリエイティブ系 Lv3: パレットン — パレットっぽい頭飾り付き */
const SPRITE_CREATIVE_3 = [
    [0, 0, 5, 0, 0, 0, 0, 0, 0, 8, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0, 6, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 3, 0, 0, 0],
    [0, 0, 3, 1, 2, 1, 1, 2, 1, 3, 0, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 0, 3, 1, 1, 5, 5, 1, 1, 3, 0, 0],
    [0, 3, 1, 3, 1, 1, 1, 1, 3, 1, 3, 0],
    [0, 0, 0, 3, 3, 1, 1, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 1, 1, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/** クリエイティブ系 Lv4: アートラゴン — 翼が筆みたいに */
const SPRITE_CREATIVE_4 = [
    [0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 4, 8, 4, 3, 3, 4, 8, 4, 0, 0],
    [0, 0, 0, 0, 3, 1, 1, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 3, 0, 0, 0],
    [0, 6, 3, 1, 2, 1, 1, 2, 1, 3, 5, 0],
    [6, 6, 3, 1, 1, 1, 1, 1, 1, 3, 5, 5],
    [0, 6, 3, 1, 1, 4, 4, 1, 1, 3, 5, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 0, 0, 3, 3, 1, 1, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 1, 1, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0],
];

/** クリエイティブ系 Lv5: 虹筆マスター */
const SPRITE_CREATIVE_5 = [
    [8, 0, 5, 0, 4, 0, 0, 6, 0, 7, 0, 3],
    [0, 4, 0, 3, 3, 3, 3, 3, 3, 0, 8, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 0, 3, 1, 4, 1, 1, 6, 1, 3, 0, 0],
    [6, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 5],
    [6, 6, 3, 1, 1, 1, 1, 1, 1, 3, 5, 5],
    [6, 3, 1, 1, 1, 5, 5, 1, 1, 1, 3, 5],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 0, 3, 3, 1, 1, 1, 1, 3, 3, 0, 0],
    [0, 0, 0, 3, 3, 1, 1, 3, 3, 0, 0, 0],
    [0, 0, 3, 0, 0, 3, 3, 0, 0, 3, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
];

/** フィジカル系 Lv3: マッスン */
const SPRITE_PHYSICAL_3 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 3, 0, 0, 0],
    [0, 0, 3, 1, 2, 1, 1, 2, 1, 3, 0, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 3, 3, 1, 1, 9, 9, 1, 1, 3, 3, 0],
    [3, 1, 3, 3, 1, 1, 1, 1, 3, 3, 1, 3],
    [0, 3, 0, 3, 1, 1, 1, 1, 3, 0, 3, 0],
    [0, 0, 0, 3, 3, 1, 1, 3, 3, 0, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 3, 0, 0, 0],
    [0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/** フィジカル系 Lv4: ゴリドン */
const SPRITE_PHYSICAL_4 = [
    [0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0],
    [0, 0, 3, 9, 3, 1, 1, 3, 9, 3, 0, 0],
    [0, 0, 3, 1, 2, 1, 1, 2, 1, 3, 0, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [3, 3, 3, 1, 1, 9, 9, 1, 1, 3, 3, 3],
    [3, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 3],
    [3, 1, 3, 3, 1, 1, 1, 1, 3, 3, 1, 3],
    [0, 3, 0, 3, 3, 1, 1, 3, 3, 0, 3, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 3, 0, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 3, 0, 0, 0],
    [0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0],
    [0, 3, 3, 0, 0, 0, 0, 0, 0, 3, 3, 0],
];

/** フィジカル系 Lv5: 鋼鉄チャンプ */
const SPRITE_PHYSICAL_5 = [
    [0, 3, 3, 0, 3, 3, 3, 3, 0, 3, 3, 0],
    [3, 9, 3, 3, 9, 1, 1, 9, 3, 3, 9, 3],
    [0, 3, 3, 1, 2, 1, 1, 2, 1, 3, 3, 0],
    [0, 0, 3, 1, 9, 1, 1, 9, 1, 3, 0, 0],
    [3, 3, 3, 1, 1, 9, 9, 1, 1, 3, 3, 3],
    [3, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 3],
    [3, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 3],
    [0, 3, 3, 3, 3, 1, 1, 3, 3, 3, 3, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0],
    [0, 3, 3, 0, 0, 0, 0, 0, 0, 3, 3, 0],
];

/** ソーシャル系 Lv3: おしゃべりん */
const SPRITE_SOCIAL_3 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 3, 3, 3, 3, 5, 0, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 3, 0, 0, 0],
    [0, 0, 3, 1, 2, 1, 1, 2, 1, 3, 0, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 0, 3, 1, 5, 5, 5, 5, 1, 3, 0, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 3, 0, 0, 0],
    [0, 0, 0, 3, 3, 1, 1, 3, 3, 5, 5, 0],
    [0, 0, 0, 0, 3, 1, 1, 3, 5, 1, 5, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 3, 5, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/** ソーシャル系 Lv4: パーティラ */
const SPRITE_SOCIAL_4 = [
    [0, 5, 0, 0, 0, 5, 5, 0, 0, 0, 5, 0],
    [0, 0, 5, 0, 3, 3, 3, 3, 0, 5, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 3, 0, 0, 0],
    [0, 0, 3, 1, 2, 1, 1, 2, 1, 3, 0, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 5, 3, 1, 5, 5, 5, 5, 1, 3, 8, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [5, 0, 0, 3, 1, 1, 1, 1, 3, 0, 0, 5],
    [0, 0, 0, 3, 3, 1, 1, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 1, 1, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0],
];

/** ソーシャル系 Lv5: 祭りの王 */
const SPRITE_SOCIAL_5 = [
    [5, 8, 5, 8, 5, 5, 5, 5, 8, 5, 8, 5],
    [0, 0, 0, 5, 3, 3, 3, 3, 5, 0, 0, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 0, 3, 1, 5, 1, 1, 5, 1, 3, 0, 0],
    [0, 8, 3, 1, 1, 1, 1, 1, 1, 3, 8, 0],
    [8, 8, 3, 1, 5, 5, 5, 5, 1, 3, 8, 8],
    [0, 8, 3, 1, 1, 1, 1, 1, 1, 3, 8, 0],
    [0, 0, 3, 3, 1, 1, 1, 1, 3, 3, 0, 0],
    [0, 5, 0, 3, 3, 1, 1, 3, 3, 0, 5, 0],
    [0, 0, 0, 0, 3, 1, 1, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0],
];

/** インテレクチュアル系 Lv3: メガネモン */
const SPRITE_INTEL_3 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 3, 0, 0, 0],
    [0, 0, 7, 7, 7, 1, 1, 7, 7, 7, 0, 0],
    [0, 0, 7, 2, 7, 1, 1, 7, 2, 7, 0, 0],
    [0, 0, 3, 7, 1, 1, 1, 1, 7, 3, 0, 0],
    [0, 0, 3, 1, 1, 3, 3, 1, 1, 3, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 3, 0, 0, 0],
    [0, 0, 0, 3, 3, 1, 1, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 1, 1, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/** インテレクチュアル系 Lv4: ブックドラゴ */
const SPRITE_INTEL_4 = [
    [0, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 0],
    [0, 0, 7, 3, 3, 1, 1, 3, 3, 7, 0, 0],
    [0, 0, 0, 3, 1, 1, 1, 1, 3, 0, 0, 0],
    [0, 0, 7, 7, 7, 1, 1, 7, 7, 7, 0, 0],
    [0, 0, 7, 2, 7, 1, 1, 7, 2, 7, 0, 0],
    [0, 7, 3, 7, 1, 1, 1, 1, 7, 3, 7, 0],
    [7, 7, 3, 1, 1, 3, 3, 1, 1, 3, 7, 7],
    [0, 7, 0, 3, 1, 1, 1, 1, 3, 0, 7, 0],
    [0, 0, 0, 3, 3, 1, 1, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 1, 1, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0],
];

/** インテレクチュアル系 Lv5: 全知の賢者 */
const SPRITE_INTEL_5 = [
    [0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0],
    [0, 7, 3, 3, 1, 1, 1, 1, 3, 3, 7, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 7, 7, 7, 7, 1, 1, 7, 7, 7, 7, 0],
    [0, 7, 3, 2, 7, 1, 1, 7, 2, 3, 7, 0],
    [7, 7, 3, 1, 7, 1, 1, 7, 1, 3, 7, 7],
    [7, 3, 3, 1, 1, 3, 3, 1, 1, 3, 3, 7],
    [0, 3, 0, 3, 1, 1, 1, 1, 3, 0, 3, 0],
    [0, 0, 0, 3, 3, 1, 1, 3, 3, 0, 0, 0],
    [0, 0, 3, 0, 3, 1, 1, 3, 0, 3, 0, 0],
    [0, 0, 3, 0, 0, 3, 3, 0, 0, 3, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
];

/** カオス系 Lv3: ぐるぐるん */
const SPRITE_CHAOTIC_3 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 3, 3, 3, 3, 0, 5, 0, 0],
    [0, 0, 0, 3, 7, 1, 1, 7, 3, 0, 0, 0],
    [0, 0, 3, 1, 2, 1, 1, 2, 1, 3, 0, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 0, 3, 1, 4, 1, 1, 5, 1, 3, 0, 0],
    [0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [0, 6, 0, 3, 1, 1, 1, 1, 3, 0, 8, 0],
    [0, 0, 0, 3, 3, 1, 1, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 1, 1, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/** カオス系 Lv4: カオスもん */
const SPRITE_CHAOTIC_4 = [
    [5, 0, 4, 0, 0, 0, 0, 0, 0, 7, 0, 3],
    [0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0],
    [0, 0, 3, 7, 1, 1, 1, 1, 4, 3, 0, 0],
    [0, 0, 3, 1, 5, 1, 1, 7, 1, 3, 0, 0],
    [6, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 8],
    [6, 6, 3, 1, 4, 3, 3, 5, 1, 3, 8, 8],
    [6, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 8],
    [0, 0, 3, 3, 1, 1, 1, 1, 3, 3, 0, 0],
    [0, 0, 0, 3, 3, 1, 1, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 1, 1, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0],
];

/** カオス系 Lv5: 混沌の化身 */
const SPRITE_CHAOTIC_5 = [
    [5, 4, 7, 3, 0, 0, 0, 0, 8, 6, 3, 4],
    [3, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 5],
    [0, 0, 3, 4, 1, 1, 1, 1, 7, 3, 0, 0],
    [0, 3, 1, 1, 5, 1, 1, 6, 1, 1, 3, 0],
    [8, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4],
    [7, 3, 1, 4, 1, 3, 3, 1, 5, 1, 3, 6],
    [4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 8],
    [0, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 0],
    [0, 5, 0, 3, 3, 1, 1, 3, 3, 0, 7, 0],
    [0, 0, 3, 0, 3, 1, 1, 3, 0, 3, 0, 0],
    [0, 3, 0, 0, 0, 3, 3, 0, 0, 0, 3, 0],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
];

/** スプライトを系統とレベルから取得 */
function getSprite(level, branch) {
    if (level <= 1) return SPRITE_EGG;
    if (level === 2) return SPRITE_MOCHI;

    const branchSprites = {
        creative: { 3: SPRITE_CREATIVE_3, 4: SPRITE_CREATIVE_4, 5: SPRITE_CREATIVE_5 },
        physical: { 3: SPRITE_PHYSICAL_3, 4: SPRITE_PHYSICAL_4, 5: SPRITE_PHYSICAL_5 },
        social: { 3: SPRITE_SOCIAL_3, 4: SPRITE_SOCIAL_4, 5: SPRITE_SOCIAL_5 },
        intellectual: { 3: SPRITE_INTEL_3, 4: SPRITE_INTEL_4, 5: SPRITE_INTEL_5 },
        chaotic: { 3: SPRITE_CHAOTIC_3, 4: SPRITE_CHAOTIC_4, 5: SPRITE_CHAOTIC_5 },
    };

    return branchSprites[branch]?.[level] || SPRITE_MOCHI;
}

/** パレットを系統から取得 */
function getPalette(branch) {
    if (!branch) return PALETTES.default;
    return PALETTES[branch] || PALETTES.default;
}

/**
 * キャラをCanvasに描画する
 * @param {CanvasRenderingContext2D} ctx - 描画コンテキスト
 * @param {number} level - 現在レベル
 * @param {string|null} branch - 進化系統
 * @param {number} frame - アニメーションフレーム（0-59）
 */
export function drawCharacter(ctx, level, branch, frame = 0) {
    const canvas = ctx.canvas;
    const sprite = getSprite(level, branch);
    const palette = getPalette(branch);

    const gridSize = sprite.length; // 12
    const cellSize = Math.floor(Math.min(canvas.width, canvas.height) / gridSize);

    // キャンバス中央にオフセット
    const offsetX = Math.floor((canvas.width - cellSize * gridSize) / 2);

    // アイドルアニメーション: ぴょんぴょん上下する
    const bounceSpeed = 0.1;
    const bounceHeight = cellSize * 0.4;
    const bounceY = Math.sin(frame * bounceSpeed) * bounceHeight;
    const offsetY = Math.floor((canvas.height - cellSize * gridSize) / 2 + bounceY);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ドット影（下方にぼんやり）
    const shadowAlpha = 0.15 + Math.sin(frame * bounceSpeed) * 0.05;
    ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
    ctx.beginPath();
    const shadowW = cellSize * gridSize * 0.6;
    const shadowH = cellSize * 1.2;
    const shadowX = canvas.width / 2;
    const shadowY = canvas.height / 2 + cellSize * gridSize * 0.45;
    ctx.ellipse(shadowX, shadowY, shadowW / 2, shadowH / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // ピクセル描画
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const colorIdx = sprite[row][col];
            if (colorIdx === 0) continue;

            const color = palette[colorIdx];
            if (!color) continue;

            ctx.fillStyle = color;
            ctx.fillRect(
                offsetX + col * cellSize,
                offsetY + row * cellSize,
                cellSize,
                cellSize
            );
        }
    }

    // 瞬きアニメーション（60フレームごとに4フレームだけ）
    const blinkCycle = frame % 120;
    if (blinkCycle >= 0 && blinkCycle < 4) {
        // 目の位置を探して塗りつぶす
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (sprite[row][col] === 2) { // 目の色
                    ctx.fillStyle = palette[1] || '#f8f8f0'; // 白で上書き = 閉じた目
                    ctx.fillRect(
                        offsetX + col * cellSize,
                        offsetY + row * cellSize,
                        cellSize,
                        cellSize
                    );
                }
            }
        }
    }
}

/**
 * 進化エフェクトを描画する（別Canvasに重ねて使う）
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} progress - 0.0 ~ 1.0
 */
export function drawEvolutionEffect(ctx, progress) {
    const { width, height } = ctx.canvas;
    const cx = width / 2;
    const cy = height / 2;

    // 放射状の光線
    const numRays = 12;
    const maxRadius = Math.max(width, height);

    ctx.save();
    ctx.globalAlpha = 1.0 - progress;

    for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2 + progress * Math.PI;
        const rayW = 0.05 + progress * 0.15;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
            cx + Math.cos(angle - rayW) * maxRadius * progress,
            cy + Math.sin(angle - rayW) * maxRadius * progress
        );
        ctx.lineTo(
            cx + Math.cos(angle + rayW) * maxRadius * progress,
            cy + Math.sin(angle + rayW) * maxRadius * progress
        );
        ctx.closePath();

        ctx.fillStyle = `hsl(${(i * 360 / numRays + progress * 360) % 360}, 80%, 70%)`;
        ctx.fill();
    }

    // 中央の白い光
    const glowRadius = maxRadius * 0.3 * (1 - Math.abs(progress - 0.5) * 2);
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${0.8 * (1 - progress)})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
}

/**
 * NPCキャラ（相手方）を描画。もちまるをベースにグレーっぽい色で。
 */
export function drawNpcCharacter(ctx, frame = 0) {
    const canvas = ctx.canvas;
    const sprite = SPRITE_MOCHI;
    const palette = [
        null,
        '#e8e8e0', // 1: 明るいグレー
        '#3d3d4d', // 2: ダークグレー
        '#8899aa', // 3: ブルーグレー
        '#7788aa', // 4
        '#aabb99', // 5: セージ
        '#6b8b77', // 6
        '#6d86af', // 7
        '#aa8b62', // 8
        '#8866aa', // 9
    ];

    const gridSize = 12;
    const cellSize = Math.floor(Math.min(canvas.width, canvas.height) / gridSize);
    const offsetX = Math.floor((canvas.width - cellSize * gridSize) / 2);
    const bounceY = Math.sin(frame * 0.08 + 1) * cellSize * 0.3;
    const offsetY = Math.floor((canvas.height - cellSize * gridSize) / 2 + bounceY);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const colorIdx = sprite[row][col];
            if (colorIdx === 0) continue;
            ctx.fillStyle = palette[colorIdx] || '#888';
            ctx.fillRect(
                offsetX + col * cellSize,
                offsetY + row * cellSize,
                cellSize,
                cellSize
            );
        }
    }
}
