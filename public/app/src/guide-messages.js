/**
 * あいぼうのガイドメッセージ定義
 * カテゴリ別に定義し、ランダムに選択される
 */
export const GUIDE_MESSAGES = {
    TUTORIAL: [
        '画面右上の音符マークで、BGMのオン・オフができるよ。',
        '履歴ボタンを押すと、今までの頑張りを振り返れるよ。',
        'ともだちリストから、気に入らないともだちは「さよなら」できるよ。',
        '箱庭の住人は、クリックすると反応してくれるかも？',
    ],
    TIPS: [
        'タスクのカテゴリ（仕事、運動など）によって、性格が変わっていくよ。',
        'タスクをたくさん完了すると、次の姿に進化するかも…？',
        '性格によって、進化する姿が変わるみたいだよ。',
        '図鑑を埋めると、新しい発見があるかもね。',
    ],
    TRIVIA: [
        '特別なモンスターもいるらしいよ。',
        '夜更かししてると、モンスターも眠くなっちゃうかも。',
        'たまにはゆっくり休むのも大切だよね。',
        '君の頑張り、いつも見てるよ！',
    ]
};

/**
 * ランダムにガイドメッセージを1つ取得する
 * @returns {string} ガイドメッセージ
 */
export function getRandomGuideMessage() {
    const categories = Object.keys(GUIDE_MESSAGES);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const messages = GUIDE_MESSAGES[category];
    return messages[Math.floor(Math.random() * messages.length)];
}
