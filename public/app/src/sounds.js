/**
 * 効果音 — Web Audio APIで動的にサウンドを生成
 * 外部ファイル不要、コードだけで完結
 */

let audioCtx = null;
let isMuted = false;

/** AudioContextを遅延初期化 */
function getCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

/** ミュート状態を取得 */
export function getMuted() {
    return isMuted;
}

/** ミュート状態をトグル */
export function toggleMute() {
    isMuted = !isMuted;
    return isMuted;
}

/** ミュート状態をセット */
export function setMuted(val) {
    isMuted = val;
}

/**
 * 指定周波数のビープ音を鳴らす（内部用）
 */
function beep(freq, duration, delay = 0, volume = 0.15, type = 'sine') {
    if (isMuted) return;
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
}

/** タスク完了時のチャイム */
export function playComplete() {
    if (isMuted) return;
    try {
        beep(523.25, 0.12, 0, 0.18, 'sine');
        beep(659.25, 0.12, 0.08, 0.18, 'sine');
        beep(783.99, 0.2, 0.16, 0.15, 'sine');
    } catch { /* ブラウザ非対応時は無視 */ }
}

/** レベルアップ時のファンファーレ */
export function playLevelUp() {
    if (isMuted) return;
    try {
        beep(523.25, 0.1, 0, 0.12, 'square');
        beep(659.25, 0.1, 0.1, 0.12, 'square');
        beep(783.99, 0.1, 0.2, 0.12, 'square');
        beep(1046.5, 0.3, 0.3, 0.15, 'sine');
        beep(783.99, 0.1, 0.5, 0.08, 'sine');
        beep(1046.5, 0.4, 0.6, 0.12, 'sine');
    } catch { /* ブラウザ非対応時は無視 */ }
}

/** チャットバブル出現時のポップ音 */
export function playPop() {
    if (isMuted) return;
    try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch { /* ブラウザ非対応時は無視 */ }
}
