/**
 * タスクリスト — 追加・完了・削除とカテゴリ判定
 */

import { getTodayStr } from './daily-reset.js';
import { ICONS } from './icons.js';

/** カテゴリ判定用キーワード辞書（各30語以上） */
const CATEGORY_KEYWORDS = {
    creative: [
        '描', '絵', 'イラスト', '曲', '音楽', '作曲', '歌', '写真', '動画',
        'デザイン', '撮影', 'ピアノ', 'ギター', '小説', '詩', '創作', 'アート',
        '編集', 'DIY', '手芸', '料理', 'レシピ', 'カメラ', '映画',
        'ベース', 'ドラム', 'バイオリン', '演奏', '弾', '書道', 'カリグラフィ',
        '水彩', '油絵', 'スケッチ', 'クラフト', 'ハンドメイド', '陶芸',
        '裁縫', '編み物', 'アクセサリー', 'ネイル', '盛り付け', 'お菓子',
        'ケーキ', 'パン', '作品', 'ポートフォリオ', 'コラージュ', 'フォト',
    ],
    physical: [
        '走', '筋トレ', 'ジム', '泳', '登山', 'ヨガ', 'ストレッチ', '散歩',
        'ランニング', 'ジョギング', 'サッカー', '野球', 'テニス', 'バスケ',
        '腕立て', '腹筋', 'ダンス', '自転車', 'ハイキング', 'マラソン',
        'キャンプ', '掃除', '片付け', 'ウォーキング', '縄跳び', '水泳',
        'スクワット', 'プランク', '懸垂', 'バレー', '卓球', 'バドミントン',
        'ゴルフ', 'スキー', 'スノボ', 'サーフィン', 'ボルダリング', '釣り',
        '体操', '武道', '柔道', '空手', 'ボクシング', '剣道', 'トレーニング',
        '洗濯', '引っ越し', '草むしり', '庭', '歩', '階段',
    ],
    social: [
        '友達', '遊ぶ', 'パーティ', '飲み', 'ご飯', '会う', '電話', '手紙',
        'プレゼント', 'デート', '誕生日', 'イベント', '旅行', '家族', '連絡',
        '相談', 'ボランティア', 'お祝い', 'LINE', 'SNS',
        'ランチ', 'ディナー', 'カフェ', '飲み会', '食事', 'バーベキュー',
        '同窓会', '結婚式', 'お見舞い', '挨拶', 'メール', '返信',
        'おしゃべり', '集まり', 'お出かけ', '観光', 'ドライブ', '映画館',
        'ライブ', 'フェス', 'コンサート', '買い物', 'ショッピング', '贈り物',
        'ホームパーティ', 'お花見', '忘年会', '新年会', '歓迎会', '送別会',
    ],
    intellectual: [
        '読', '勉強', '本', '資格', '試験', '英語', '数学', 'プログラミング',
        '論文', '研究', '学習', '講座', 'セミナー', 'ニュース', '歴史',
        '科学', '哲学', 'レポート', 'パズル', '将棋', 'チェス',
        'コーディング', 'プログラム', '開発', 'アプリ', 'ウェブ', '解析',
        '分析', '統計', '実験', '観察', 'ドキュメント', '翻訳', '暗記',
        '単語', '文法', '数式', '計算', 'アルゴリズム', 'データ',
        '教科書', '参考書', 'ノート', '予習', '復習', '宿題', '課題',
        'TOEIC', 'TOEFL', '検定', '受験', '模試', '授業', '講義',
    ],
    chaotic: [
        '変な', 'おかしい', 'やばい', '叫', '全力', '無茶', 'チャレンジ',
        'ネタ', '爆笑', '適当', 'なんでもいい', 'ランダム', '冒険',
        '踊り狂', 'コスプレ', 'どっきり', 'おふざけ', '限界', 'ぶっ飛',
        '即興', '突撃', '賭け', '実験的', 'ゲリラ', 'サプライズ',
        '思いつき', '衝動', 'ノリ', '大冒険', 'ぶっつけ', '暴走',
    ],
};

/** タスクテキストからカテゴリを自動判定 */
export function detectCategory(text) {
    const scores = { creative: 0, physical: 0, social: 0, intellectual: 0, chaotic: 0 };

    for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        for (const kw of keywords) {
            if (text.includes(kw)) scores[cat]++;
        }
    }

    const max = Math.max(...Object.values(scores));
    if (max === 0) {
        // どのキーワードにもマッチしない場合はgeneral（全パラメータ均等）
        return 'general';
    }

    const winners = Object.entries(scores).filter(([, v]) => v === max).map(([k]) => k);
    return winners[Math.floor(Math.random() * winners.length)];
}

/** 新しいタスクオブジェクトを生成 */
export function createTodo(text, scheduledDate = null, isRecurring = false) {
    return {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        text,
        category: detectCategory(text),
        completed: false,
        completedAt: null,
        scheduledDate: scheduledDate || getTodayStr(),
        isRecurring,
    };
}

/** カテゴリの絵文字を返す */
export function categoryEmoji(cat) {
    const map = {
        creative: ICONS.cat_creative,
        physical: ICONS.cat_physical,
        social: ICONS.cat_social,
        intellectual: ICONS.cat_intellectual,
        chaotic: ICONS.cat_chaotic,
        general: ICONS.cat_general,
    };
    return map[cat] || '\u{2753}';
}

/** カテゴリのラベル名を返す */
export function categoryLabel(cat) {
    const map = {
        creative: i18next.t('ui.cat_creative', { defaultValue: 'クリエイティブ' }),
        physical: i18next.t('ui.cat_physical', { defaultValue: 'フィジカル' }),
        social: i18next.t('ui.cat_social', { defaultValue: 'ソーシャル' }),
        intellectual: i18next.t('ui.cat_intellectual', { defaultValue: 'インテレクチュアル' }),
        chaotic: i18next.t('ui.cat_chaotic', { defaultValue: 'カオス' }),
        general: i18next.t('ui.cat_general', { defaultValue: 'いろいろ' }),
    };
    return map[cat] || i18next.t('ui.cat_unknown', { defaultValue: '不明' });
}
