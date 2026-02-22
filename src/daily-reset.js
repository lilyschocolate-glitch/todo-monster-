/**
 * 日付管理 — 日またぎ時の繰り返しタスク複製
 */

/** 今日の日付文字列を返す (YYYY-MM-DD) */
export function getTodayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** 昨日の日付文字列 */
export function getYesterdayStr() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** 明日の日付文字列 */
export function getTomorrowStr() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** 日付文字列を表示用ラベルに変換 */
export function dateLabel(dateStr) {
    const today = getTodayStr();
    const yesterday = getYesterdayStr();
    const tomorrow = getTomorrowStr();

    if (dateStr === today) return 'きょう';
    if (dateStr === yesterday) return 'きのう';
    if (dateStr === tomorrow) return 'あした';

    // それ以外は月/日
    const parts = dateStr.split('-');
    return `${parseInt(parts[1])}/${parseInt(parts[2])}`;
}

/**
 * 日またぎチェック: 繰り返しタスクを今日分として複製
 * @param {object} data - アプリデータ
 * @returns {object} 更新後のデータ（変更がなければそのまま返す）
 */
export function processDailyReset(data) {
    const today = getTodayStr();

    // 最終アクセス日が今日と同じなら何もしない
    if (data.lastAccessDate === today) return data;

    const updated = { ...data, lastAccessDate: today };

    // 繰り返しタスクを見つけて今日分を複製
    const recurringTasks = data.todos.filter(t => t.isRecurring && t.scheduledDate !== today);

    for (const task of recurringTasks) {
        // 今日の同じテキストのタスクがなければ複製
        const alreadyExists = data.todos.some(
            t => t.text === task.text && t.scheduledDate === today && !t.completed
        );
        if (!alreadyExists) {
            updated.todos.unshift({
                id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
                text: task.text,
                category: task.category,
                completed: false,
                completedAt: null,
                scheduledDate: today,
                isRecurring: true,
            });
        }
    }

    return updated;
}
