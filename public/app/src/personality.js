/**
 * 性格パラメータ — タスクカテゴリに応じてパラメータが上昇
 */

/** タスク完了時に対応する性格パラメータを上昇させる */
export function applyTaskToPersonality(personality, category) {
    const updated = { ...personality };

    if (category === 'general') {
        // キーワード未マッチ（スタータスク）はランダムなカテゴリとして扱う
        const cats = ['creative', 'physical', 'social', 'intellectual', 'chaotic'];
        const randomCat = cats[Math.floor(Math.random() * cats.length)];
        return applyTaskToPersonality(personality, randomCat);
    }

    // メインカテゴリ +3、ランダムで隣接 +1
    updated[category] = (updated[category] || 0) + 3;

    // ランダムでもう1つ微増させると個性が出る
    const cats = Object.keys(updated);
    const others = cats.filter(c => c !== category && c !== 'general');
    const bonus = others[Math.floor(Math.random() * others.length)];
    updated[bonus] = (updated[bonus] || 0) + 1;

    return updated;
}

/** 性格の最大カテゴリを取得（進化系統決定用） */
export function getDominantTrait(personality) {
    let max = -1;
    let dominant = 'creative';

    for (const [trait, value] of Object.entries(personality)) {
        if (value > max) {
            max = value;
            dominant = trait;
        }
    }
    return dominant;
}

/** 性格パラメータ合計を取得 */
export function getPersonalityTotal(personality) {
    return Object.values(personality).reduce((sum, v) => sum + v, 0);
}

/** 性格のサマリーテキストを生成（キャラの口調で） */
export function getPersonalitySummary(personality) {
    const total = getPersonalityTotal(personality);
    if (total === 0) return i18next.t('ui.personality_empty', { defaultValue: 'まだ何もしてないから、よくわかんない…' });

    // 上位2つの特性を取得
    const sorted = Object.entries(personality)
        .sort(([, a], [, b]) => b - a)
        .filter(([, v]) => v > 0);

    const traitDescriptions = {
        creative: i18next.t('ui.trait_creative', { defaultValue: 'ものづくりが好き' }),
        physical: i18next.t('ui.trait_physical', { defaultValue: '体を動かすのが好き' }),
        social: i18next.t('ui.trait_social', { defaultValue: 'みんなと一緒がうれしい' }),
        intellectual: i18next.t('ui.trait_intellectual', { defaultValue: '考えごとが楽しい' }),
        chaotic: i18next.t('ui.trait_chaotic', { defaultValue: '何でもアリ' }),
    };

    const first = sorted[0];
    const second = sorted.length > 1 ? sorted[1] : null;

    if (sorted.length === 1 || (first[1] - second[1] > 10)) {
        return i18next.t(`ui.trait_${first[0]}_ext`, { defaultValue: traitDescriptions[first[0]] });
    }

    const desc1 = traitDescriptions[first[0]];
    const desc2 = traitDescriptions[second[0]];

    // 差が小さいとバランス型
    if (first[1] - second[1] <= 2) {
        return i18next.t('ui.personality_balance', {
            desc1, desc2,
            defaultValue: `${desc1}で、${desc2}タイプ`
        });
    }
    return i18next.t('ui.personality_primary', {
        desc1, desc2,
        defaultValue: `${desc1}。ちょっとだけ${desc2}`
    });
}
