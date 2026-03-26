/**
 * ゆるふわモンスターSVG描画エンジン
 * 体型×色×顔×アクセサリーの組み合わせで151体を生成
 */

// --- 体型パス定義（7種） ---

const BODY_PATHS = {
    maru: {
        // まるっこい球体
        body: (s) => `
      <ellipse cx="${s / 2}" cy="${s * 0.55}" rx="${s * 0.38}" ry="${s * 0.35}"
        fill="url(#bodyGrad)" stroke="url(#bodyStroke)" stroke-width="2"/>`,
        label: 'まる',
    },
    shizuku: {
        // しずく型（上が細い）
        body: (s) => `
      <path d="M${s / 2} ${s * 0.18} Q${s * 0.82} ${s * 0.45} ${s * 0.78} ${s * 0.65}
        Q${s * 0.75} ${s * 0.85} ${s / 2} ${s * 0.88}
        Q${s * 0.25} ${s * 0.85} ${s * 0.22} ${s * 0.65}
        Q${s * 0.18} ${s * 0.45} ${s / 2} ${s * 0.18}Z"
        fill="url(#bodyGrad)" stroke="url(#bodyStroke)" stroke-width="2"/>`,
        label: 'しずく',
    },
    hoshi: {
        // ほし型（丸に小さい突起）
        body: (s) => {
            const cx = s / 2, cy = s * 0.55, r = s * 0.35;
            // 5つの小さな突起を持つ丸
            let path = '';
            for (let i = 0; i < 5; i++) {
                const angle = (i * 72 - 90) * Math.PI / 180;
                const bx = cx + Math.cos(angle) * r * 1.15;
                const by = cy + Math.sin(angle) * r * 1.15;
                path += `<circle cx="${bx}" cy="${by}" r="${s * 0.06}" fill="url(#bodyGrad)"
                  stroke="url(#bodyStroke)" stroke-width="1.5"/>`;
            }
            return `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.95}"
              fill="url(#bodyGrad)" stroke="url(#bodyStroke)" stroke-width="2"/>` + path;
        },
        label: 'ほし',
    },
    mochi: {
        // もちっとした角丸正方形
        body: (s) => `
      <rect x="${s * 0.15}" y="${s * 0.22}" width="${s * 0.7}" height="${s * 0.65}"
        rx="${s * 0.2}" ry="${s * 0.2}"
        fill="url(#bodyGrad)" stroke="url(#bodyStroke)" stroke-width="2"/>`,
        label: 'もち',
    },
    kumo: {
        // くも型（もこもこ）
        body: (s) => `
      <ellipse cx="${s / 2}" cy="${s * 0.6}" rx="${s * 0.36}" ry="${s * 0.3}"
        fill="url(#bodyGrad)" stroke="url(#bodyStroke)" stroke-width="2"/>
      <circle cx="${s * 0.32}" cy="${s * 0.42}" r="${s * 0.14}"
        fill="url(#bodyGrad)" stroke="url(#bodyStroke)" stroke-width="1.5"/>
      <circle cx="${s * 0.55}" cy="${s * 0.35}" r="${s * 0.16}"
        fill="url(#bodyGrad)" stroke="url(#bodyStroke)" stroke-width="1.5"/>
      <circle cx="${s * 0.7}" cy="${s * 0.45}" r="${s * 0.12}"
        fill="url(#bodyGrad)" stroke="url(#bodyStroke)" stroke-width="1.5"/>`,
        label: 'くも',
    },
    shikaku: {
        // しかく（角が少し丸い）
        body: (s) => `
      <rect x="${s * 0.18}" y="${s * 0.25}" width="${s * 0.64}" height="${s * 0.6}"
        rx="${s * 0.08}" ry="${s * 0.08}"
        fill="url(#bodyGrad)" stroke="url(#bodyStroke)" stroke-width="2"/>`,
        label: 'しかく',
    },
    mame: {
        // まめ型（楕円が少し傾いた）
        body: (s) => `
      <ellipse cx="${s / 2}" cy="${s * 0.55}" rx="${s * 0.28}" ry="${s * 0.38}"
        transform="rotate(-8 ${s / 2} ${s * 0.55})"
        fill="url(#bodyGrad)" stroke="url(#bodyStroke)" stroke-width="2"/>`,
        label: 'まめ',
    },
};

// --- カラースキーム（5系統 × 各3色：メイン/サブ/アクセント） ---

const COLOR_SCHEMES = [
    // ピンク系 (0-5)
    { main: '#FFB5D8', sub: '#FF8EC4', accent: '#FF6BAF', highlight: '#FFE0EF', stroke: '#E98CB5' },
    { main: '#FFA3C8', sub: '#FF7EB3', accent: '#FF5999', highlight: '#FFD6E8', stroke: '#E07BA0' },
    { main: '#FFD1E3', sub: '#FFB0CE', accent: '#FF8AB9', highlight: '#FFEAF2', stroke: '#EEAAC5' },
    { main: '#FF9EC0', sub: '#FF79AA', accent: '#FF5494', highlight: '#FFD0E2', stroke: '#DD7999' },
    { main: '#FFCADA', sub: '#FFA5C5', accent: '#FF80B0', highlight: '#FFE5ED', stroke: '#E69BB5' },
    { main: '#FFC0D0', sub: '#FF99BB', accent: '#FF73A5', highlight: '#FFE2EB', stroke: '#E295AA' },
    // パープル系 (6-11)
    { main: '#D8B4FE', sub: '#C084FC', accent: '#A855F7', highlight: '#F0E4FF', stroke: '#B89ADA' },
    { main: '#C9A9F5', sub: '#B07CEE', accent: '#9656E6', highlight: '#E8DAFF', stroke: '#A88DD0' },
    { main: '#E2C4FF', sub: '#D09EFF', accent: '#BB78FF', highlight: '#F5ECFF', stroke: '#C5A6E2' },
    { main: '#D4AAFF', sub: '#BF85FF', accent: '#AA60FF', highlight: '#EFE0FF', stroke: '#B692DD' },
    { main: '#CCBBF5', sub: '#B598EE', accent: '#9E75E6', highlight: '#EBE2FF', stroke: '#AB9ED0' },
    { main: '#DFC0FE', sub: '#CC9AFE', accent: '#B974FD', highlight: '#F2E6FF', stroke: '#C1A3DD' },
    // ブルー系 (12-17)
    { main: '#93C5FD', sub: '#60A5FA', accent: '#3B82F6', highlight: '#DBEAFE', stroke: '#7FAED8' },
    { main: '#A5D8FF', sub: '#74C0FC', accent: '#4DABF7', highlight: '#E7F5FF', stroke: '#8CB8DD' },
    { main: '#BAE6FD', sub: '#7DD3FC', accent: '#38BDF8', highlight: '#E0F2FE', stroke: '#9CC5DB' },
    { main: '#99D4FF', sub: '#66BFFF', accent: '#33AAFF', highlight: '#D6EDFF', stroke: '#82B5DD' },
    { main: '#A8D5F2', sub: '#7BC0EB', accent: '#4EABE4', highlight: '#DBF0FF', stroke: '#8FB8D0' },
    { main: '#B0DCFE', sub: '#85CAFE', accent: '#5AB8FD', highlight: '#E2F1FF', stroke: '#96BDD9' },
    // グリーン系 (18-23)
    { main: '#86EFAC', sub: '#4ADE80', accent: '#22C55E', highlight: '#DCFCE7', stroke: '#72CC95' },
    { main: '#A7F3D0', sub: '#6EE7B7', accent: '#34D399', highlight: '#ECFDF5', stroke: '#8DD0B2' },
    { main: '#BBF7D0', sub: '#86EFAC', accent: '#4ADE80', highlight: '#F0FDF4', stroke: '#9ED4B3' },
    { main: '#99F0C0', sub: '#66E8A5', accent: '#33E08A', highlight: '#E0FCE8', stroke: '#80CDA5' },
    { main: '#B5F5CD', sub: '#88EFB3', accent: '#5BE999', highlight: '#EAFDF0', stroke: '#98D2AF' },
    { main: '#AAEEC5', sub: '#77E6AA', accent: '#44DE8F', highlight: '#E5FBEC', stroke: '#90CBAA' },
    // イエロー/オレンジ系 (24-29)
    { main: '#FDE68A', sub: '#FCD34D', accent: '#FBBF24', highlight: '#FEF9C3', stroke: '#DABA75' },
    { main: '#FED7AA', sub: '#FDBA74', accent: '#FB923C', highlight: '#FFF7ED', stroke: '#DBB490' },
    { main: '#FFE4A8', sub: '#FFD475', accent: '#FFC042', highlight: '#FFF8E1', stroke: '#DDC48C' },
    { main: '#FDD8B4', sub: '#FCC48C', accent: '#FBB064', highlight: '#FFF3E6', stroke: '#D9B895' },
    { main: '#FFE0AA', sub: '#FFD080', accent: '#FFC055', highlight: '#FFF5DC', stroke: '#DDBB8E' },
    { main: '#FFDEB0', sub: '#FFCC80', accent: '#FFBB55', highlight: '#FFF4DA', stroke: '#DDB88C' },
];

// --- 顔パーツ（5種） ---

const FACE_PARTS = {
    nikoniko: {
        // にこにこ（デフォルト、くりくりお目々）
        draw: (s) => `
      <circle cx="${s * 0.40}" cy="${s * 0.50}" r="${s * 0.045}" fill="#2d2040"/>
      <circle cx="${s * 0.60}" cy="${s * 0.50}" r="${s * 0.045}" fill="#2d2040"/>
      <circle cx="${s * 0.41}" cy="${s * 0.49}" r="${s * 0.018}" fill="white"/>
      <circle cx="${s * 0.61}" cy="${s * 0.49}" r="${s * 0.018}" fill="white"/>
      <path d="M${s * 0.43} ${s * 0.59} Q${s * 0.5} ${s * 0.64} ${s * 0.57} ${s * 0.59}"
        fill="none" stroke="#2d2040" stroke-width="1.8" stroke-linecap="round"/>`,
        label: 'にこにこ',
    },
    kirakira: {
        // きらきら（星目）
        draw: (s) => {
            const star = (cx, cy, r) => {
                let d = '';
                for (let i = 0; i < 5; i++) {
                    const a1 = (i * 72 - 90) * Math.PI / 180;
                    const a2 = ((i * 72 + 36) - 90) * Math.PI / 180;
                    const x1 = cx + Math.cos(a1) * r;
                    const y1 = cy + Math.sin(a1) * r;
                    const x2 = cx + Math.cos(a2) * r * 0.4;
                    const y2 = cy + Math.sin(a2) * r * 0.4;
                    d += `${i === 0 ? 'M' : 'L'}${x1} ${y1} L${x2} ${y2} `;
                }
                return d + 'Z';
            };
            return `
        <path d="${star(s * 0.40, s * 0.50, s * 0.05)}" fill="#2d2040"/>
        <path d="${star(s * 0.60, s * 0.50, s * 0.05)}" fill="#2d2040"/>
        <path d="M${s * 0.44} ${s * 0.60} Q${s * 0.5} ${s * 0.65} ${s * 0.56} ${s * 0.60}"
          fill="none" stroke="#2d2040" stroke-width="1.5" stroke-linecap="round"/>`;
        },
        label: 'きらきら',
    },
    suyasuya: {
        // すやすや（閉じた目）
        draw: (s) => `
      <path d="M${s * 0.36} ${s * 0.50} Q${s * 0.40} ${s * 0.47} ${s * 0.44} ${s * 0.50}"
        fill="none" stroke="#2d2040" stroke-width="2" stroke-linecap="round"/>
      <path d="M${s * 0.56} ${s * 0.50} Q${s * 0.60} ${s * 0.47} ${s * 0.64} ${s * 0.50}"
        fill="none" stroke="#2d2040" stroke-width="2" stroke-linecap="round"/>
      <text x="${s * 0.68}" y="${s * 0.42}" font-size="${s * 0.08}" fill="#2d204066">z</text>
      <text x="${s * 0.74}" y="${s * 0.36}" font-size="${s * 0.06}" fill="#2d204044">z</text>`,
        label: 'すやすや',
    },
    bikkuri: {
        // びっくり（まんまるお目々）
        draw: (s) => `
      <circle cx="${s * 0.40}" cy="${s * 0.49}" r="${s * 0.055}" fill="white" stroke="#2d2040" stroke-width="1.5"/>
      <circle cx="${s * 0.60}" cy="${s * 0.49}" r="${s * 0.055}" fill="white" stroke="#2d2040" stroke-width="1.5"/>
      <circle cx="${s * 0.41}" cy="${s * 0.48}" r="${s * 0.025}" fill="#2d2040"/>
      <circle cx="${s * 0.61}" cy="${s * 0.48}" r="${s * 0.025}" fill="#2d2040"/>
      <ellipse cx="${s * 0.5}" cy="${s * 0.61}" rx="${s * 0.03}" ry="${s * 0.035}" fill="#2d2040"/>`,
        label: 'びっくり',
    },
    mogumogu: {
        // もぐもぐ（食べてる顔）
        draw: (s) => `
      <circle cx="${s * 0.40}" cy="${s * 0.50}" r="${s * 0.04}" fill="#2d2040"/>
      <circle cx="${s * 0.60}" cy="${s * 0.50}" r="${s * 0.04}" fill="#2d2040"/>
      <circle cx="${s * 0.41}" cy="${s * 0.49}" r="${s * 0.015}" fill="white"/>
      <circle cx="${s * 0.61}" cy="${s * 0.49}" r="${s * 0.015}" fill="white"/>
      <ellipse cx="${s * 0.5}" cy="${s * 0.61}" rx="${s * 0.04}" ry="${s * 0.03}" fill="#F9A8B8"/>
      <path d="M${s * 0.46} ${s * 0.61} L${s * 0.54} ${s * 0.61}"
        fill="none" stroke="#2d204055" stroke-width="0.8"/>`,
        label: 'もぐもぐ',
    },
};

// --- アクセサリー ---

const HEAD_ACCESSORIES = [
    // リボン
    (s, color) => `
    <path d="M${s * 0.42} ${s * 0.22} Q${s * 0.35} ${s * 0.15} ${s * 0.30} ${s * 0.20}
      Q${s * 0.35} ${s * 0.22} ${s * 0.42} ${s * 0.22}Z" fill="${color}"/>
    <path d="M${s * 0.42} ${s * 0.22} Q${s * 0.49} ${s * 0.15} ${s * 0.54} ${s * 0.20}
      Q${s * 0.49} ${s * 0.22} ${s * 0.42} ${s * 0.22}Z" fill="${color}"/>
    <circle cx="${s * 0.42}" cy="${s * 0.22}" r="${s * 0.02}" fill="${color}"/>`,
    // 花
    (s, color) => {
        const cx = s * 0.58, cy = s * 0.20, r = s * 0.035;
        let petals = '';
        for (let i = 0; i < 5; i++) {
            const a = (i * 72) * Math.PI / 180;
            petals += `<circle cx="${cx + Math.cos(a) * r}" cy="${cy + Math.sin(a) * r}" r="${r * 0.7}" fill="${color}" opacity="0.9"/>`;
        }
        return petals + `<circle cx="${cx}" cy="${cy}" r="${r * 0.4}" fill="#FDE68A"/>`;
    },
    // 王冠
    (s, color) => `
    <path d="M${s * 0.35} ${s * 0.24} L${s * 0.38} ${s * 0.16} L${s * 0.44} ${s * 0.22}
      L${s * 0.50} ${s * 0.14} L${s * 0.56} ${s * 0.22} L${s * 0.62} ${s * 0.16}
      L${s * 0.65} ${s * 0.24}Z" fill="${color}" stroke="#D4A017" stroke-width="0.8"/>
    <circle cx="${s * 0.50}" cy="${s * 0.20}" r="${s * 0.015}" fill="#FF6EC7"/>`,
    // 帽子
    (s, color) => `
    <ellipse cx="${s * 0.5}" cy="${s * 0.27}" rx="${s * 0.22}" ry="${s * 0.04}" fill="${color}"/>
    <path d="M${s * 0.36} ${s * 0.27} Q${s * 0.36} ${s * 0.14} ${s * 0.50} ${s * 0.12}
      Q${s * 0.64} ${s * 0.14} ${s * 0.64} ${s * 0.27}Z" fill="${color}"/>`,
    // ツノ
    (s, color) => `
    <path d="M${s * 0.38} ${s * 0.26} L${s * 0.35} ${s * 0.12} L${s * 0.42} ${s * 0.24}Z" fill="${color}"/>
    <path d="M${s * 0.58} ${s * 0.24} L${s * 0.65} ${s * 0.12} L${s * 0.62} ${s * 0.26}Z" fill="${color}"/>`,
];

const BACK_ACCESSORIES = [
    // 天使の羽
    (s, color) => `
    <path d="M${s * 0.18} ${s * 0.50} Q${s * 0.05} ${s * 0.35} ${s * 0.12} ${s * 0.45}
      Q${s * 0.08} ${s * 0.40} ${s * 0.15} ${s * 0.48}Z" fill="${color}" opacity="0.6"/>
    <path d="M${s * 0.82} ${s * 0.50} Q${s * 0.95} ${s * 0.35} ${s * 0.88} ${s * 0.45}
      Q${s * 0.92} ${s * 0.40} ${s * 0.85} ${s * 0.48}Z" fill="${color}" opacity="0.6"/>`,
    // マント
    (s, color) => `
    <path d="M${s * 0.28} ${s * 0.50} Q${s * 0.20} ${s * 0.70} ${s * 0.25} ${s * 0.85}
      L${s * 0.75} ${s * 0.85} Q${s * 0.80} ${s * 0.70} ${s * 0.72} ${s * 0.50}Z"
      fill="${color}" opacity="0.35"/>`,
    // しっぽ
    (s, color) => `
    <path d="M${s * 0.72} ${s * 0.72} Q${s * 0.88} ${s * 0.68} ${s * 0.85} ${s * 0.55}
      Q${s * 0.90} ${s * 0.50} ${s * 0.88} ${s * 0.58}" fill="none"
      stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>`,
    // リュック
    (s, color) => `
    <rect x="${s * 0.60}" y="${s * 0.48}" width="${s * 0.16}" height="${s * 0.18}"
      rx="${s * 0.04}" fill="${color}" opacity="0.7"/>
    <rect x="${s * 0.63}" y="${s * 0.52}" width="${s * 0.10}" height="${s * 0.06}"
      rx="${s * 0.02}" fill="white" opacity="0.4"/>`,
];

const AURA_EFFECTS = [
    // キラキラ
    (s, color) => {
        let sparkles = '';
        const positions = [[0.2, 0.3], [0.78, 0.25], [0.15, 0.7], [0.85, 0.65], [0.5, 0.15], [0.35, 0.85], [0.7, 0.8]];
        for (const [px, py] of positions) {
            sparkles += `<circle cx="${s * px}" cy="${s * py}" r="${s * 0.012}" fill="${color}" opacity="0.7">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="${1.5 + px}s" repeatCount="indefinite"/>
              <animate attributeName="r" values="${s * 0.008};${s * 0.016};${s * 0.008}" dur="${1.5 + py}s" repeatCount="indefinite"/>
            </circle>`;
        }
        return sparkles;
    },
    // ほんわかオーラ
    (s, color) => `
    <ellipse cx="${s / 2}" cy="${s * 0.55}" rx="${s * 0.45}" ry="${s * 0.42}" fill="none"
      stroke="${color}" stroke-width="3" opacity="0.15">
      <animate attributeName="rx" values="${s * 0.43};${s * 0.48};${s * 0.43}" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite"/>
    </ellipse>`,
    // ハートエフェクト
    (s, color) => {
        let hearts = '';
        const hPositions = [[0.22, 0.3], [0.78, 0.35], [0.50, 0.12]];
        for (const [px, py] of hPositions) {
            const hx = s * px, hy = s * py, hs = s * 0.03;
            hearts += `<path d="M${hx} ${hy + hs * 0.4} Q${hx} ${hy - hs * 0.3} ${hx + hs} ${hy - hs * 0.3}
              Q${hx + hs * 1.5} ${hy - hs * 0.3} ${hx + hs * 1.5} ${hy + hs * 0.2}
              Q${hx + hs * 1.5} ${hy + hs * 0.8} ${hx} ${hy + hs * 1.5}
              Q${hx - hs * 1.5} ${hy + hs * 0.8} ${hx - hs * 1.5} ${hy + hs * 0.2}
              Q${hx - hs * 1.5} ${hy - hs * 0.3} ${hx - hs} ${hy - hs * 0.3}
              Q${hx} ${hy - hs * 0.3} ${hx} ${hy + hs * 0.4}Z" fill="${color}" opacity="0.5">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="${2 + px}s" repeatCount="indefinite"/>
            </path>`;
        }
        return hearts;
    },
];

// --- ほっぺ（Lv2+で追加） ---

function drawCheeks(s, color) {
    return `
    <circle cx="${s * 0.33}" cy="${s * 0.57}" r="${s * 0.04}" fill="${color}" opacity="0.4"/>
    <circle cx="${s * 0.67}" cy="${s * 0.57}" r="${s * 0.04}" fill="${color}" opacity="0.4"/>`;
}

// --- タマゴ描画（Lv1専用） ---

function drawEgg(s, colors) {
    return `
    <defs>
      <linearGradient id="eggGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${colors.highlight}"/>
        <stop offset="100%" stop-color="${colors.main}"/>
      </linearGradient>
    </defs>
    <ellipse cx="${s / 2}" cy="${s * 0.55}" rx="${s * 0.25}" ry="${s * 0.32}" fill="url(#eggGrad)"
      stroke="${colors.stroke}" stroke-width="2"/>
    <ellipse cx="${s / 2}" cy="${s * 0.55}" rx="${s * 0.25}" ry="${s * 0.32}" fill="white" opacity="0.15"/>
    <ellipse cx="${s * 0.44}" cy="${s * 0.46}" rx="${s * 0.06}" ry="${s * 0.04}"
      fill="white" opacity="0.25" transform="rotate(-15 ${s * 0.44} ${s * 0.46})"/>
    <path d="M${s * 0.38} ${s * 0.40} Q${s * 0.50} ${s * 0.36} ${s * 0.62} ${s * 0.40}"
      fill="none" stroke="${colors.accent}" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.4"/>`;
}

// --- 文字列ハッシュ ---

function hashString(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}

// --- メインの生成関数 ---

/**
 * モンスターの外見スペックを名前から決定論的に生成
 * @param {string} name - キャラクター名
 * @param {number} level - 進化レベル(1-5)
 * @param {string|null} branch - 系統
 * @returns {object} bodyType, colorIdx, faceType を含むspec
 */
export function getMonsterSpec(name, level, branch) {
    const h = hashString(name);

    const bodyKeys = Object.keys(BODY_PATHS);
    const faceKeys = Object.keys(FACE_PARTS);

    const bodyType = bodyKeys[h % bodyKeys.length];
    const colorIdx = (h >> 3) % COLOR_SCHEMES.length;
    const faceType = faceKeys[(h >> 6) % faceKeys.length];
    const headAccIdx = (h >> 9) % HEAD_ACCESSORIES.length;
    const backAccIdx = (h >> 12) % BACK_ACCESSORIES.length;
    const auraIdx = (h >> 15) % AURA_EFFECTS.length;

    // 図鑑番号（1-151）
    const dexNumber = (h % 151) + 1;

    return { bodyType, colorIdx, faceType, headAccIdx, backAccIdx, auraIdx, dexNumber, level, branch };
}

/**
 * SVG文字列を生成
 * @param {object} spec - getMonsterSpecの戻り値
 * @param {number} size - SVGサイズ（px）
 * @returns {string} SVG文字列
 */
export function generateMonsterSVG(spec, size = 160) {
    const s = size;
    const colors = COLOR_SCHEMES[spec.colorIdx % COLOR_SCHEMES.length];
    const bodyDef = BODY_PATHS[spec.bodyType] || BODY_PATHS.maru;
    const faceDef = FACE_PARTS[spec.faceType] || FACE_PARTS.nikoniko;

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">`;

    // グラデーション定義
    svg += `<defs>
      <linearGradient id="bodyGrad" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stop-color="${colors.highlight}"/>
        <stop offset="40%" stop-color="${colors.main}"/>
        <stop offset="100%" stop-color="${colors.sub}"/>
      </linearGradient>
      <linearGradient id="bodyStroke" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${colors.stroke}"/>
        <stop offset="100%" stop-color="${colors.accent}"/>
      </linearGradient>
    </defs>`;

    // Lv1はタマゴ
    if (spec.level <= 1) {
        svg += drawEgg(s, colors);
        svg += `</svg>`;
        return svg;
    }

    // Lv5: 全身オーラ（背面）
    if (spec.level >= 5) {
        svg += AURA_EFFECTS[spec.auraIdx](s, colors.accent);
    }

    // Lv4+: 背中アクセサリー（体の後ろ）
    if (spec.level >= 4) {
        svg += BACK_ACCESSORIES[spec.backAccIdx](s, colors.sub);
    }

    // 体
    svg += (typeof bodyDef.body === 'function') ? bodyDef.body(s) : '';

    // ハイライト（ツヤ感）
    svg += `<ellipse cx="${s * 0.43}" cy="${s * 0.42}" rx="${s * 0.08}" ry="${s * 0.05}"
      fill="white" opacity="0.25" transform="rotate(-20 ${s * 0.43} ${s * 0.42})"/>`;

    // ほっぺ（Lv2+）
    if (spec.level >= 2) {
        svg += drawCheeks(s, colors.accent);
    }

    // 顔
    svg += (typeof faceDef.draw === 'function') ? faceDef.draw(s) : '';

    // Lv3+: 頭アクセサリー
    if (spec.level >= 3) {
        svg += HEAD_ACCESSORIES[spec.headAccIdx](s, colors.accent);
    }

    // 小さい足（Lv2+ でかわいい足をつける）
    if (spec.level >= 2) {
        svg += `
      <ellipse cx="${s * 0.40}" cy="${s * 0.84}" rx="${s * 0.05}" ry="${s * 0.025}" fill="${colors.sub}"/>
      <ellipse cx="${s * 0.60}" cy="${s * 0.84}" rx="${s * 0.05}" ry="${s * 0.025}" fill="${colors.sub}"/>`;
    }

    svg += `</svg>`;
    return svg;
}

/**
 * NPC（グレモチ）用のSVG
 */
export function generateNpcSVG(size = 80) {
    const spec = getMonsterSpec('グレモチ', 2, null);
    // グレーっぽい色に上書き
    const npcSpec = { ...spec, colorIdx: 12 }; // ブルー系の落ち着いた色
    return generateMonsterSVG(npcSpec, size);
}

/**
 * 図鑑番号→名前テーブル取得用（UIで表示用）
 */
export function getBodyLabel(bodyType) {
    return BODY_PATHS[bodyType]?.label || '???';
}

export function getFaceLabel(faceType) {
    return FACE_PARTS[faceType]?.label || '???';
}
