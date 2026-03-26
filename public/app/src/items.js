/**
 * アイテム・カスタマイズ要素の定義データ
 */

export const ITEMS = {
    // --- 進化素材 (Materials) ---
    moon_stone: {
        id: 'moon_stone',
        name: '月の石',
        desc: '夜の力を秘めた不思議な輝きの石。特定の進化を促す。',
        type: 'material',
        rarity: 'rare',
        icon: '🌙'
    },
    sun_stone: {
        id: 'sun_stone',
        name: '太陽の石',
        desc: '太陽の熱量を閉じ込めた情熱の石。特定の進化を促す。',
        type: 'material',
        rarity: 'rare',
        icon: '☀️'
    },
    rainbow_drop: {
        id: 'rainbow_drop',
        name: '虹のしずく',
        desc: '全ての可能性を秘めた七色のしずく。超絶進化の鍵。',
        type: 'material',
        rarity: 'super_rare',
        icon: '💧'
    },
    thunder_gem: {
        id: 'thunder_gem',
        name: '雷の宝石',
        desc: 'パチパチとはぜる電撃の宝石。雷神の如き進化へ。',
        type: 'material',
        rarity: 'rare',
        icon: '⚡'
    },
    glacial_ice: {
        id: 'glacial_ice',
        name: '永久凍土の氷',
        desc: '決して溶けない絶対零度の氷。氷龍の力を呼び覚ます。',
        type: 'material',
        rarity: 'rare',
        icon: '❄️'
    },
    eternal_flame: {
        id: 'eternal_flame',
        name: '消えない種火',
        desc: '永遠に燃え続ける意志の火。鳳凰の如き転生を。',
        type: 'material',
        rarity: 'rare',
        icon: '🔥'
    },
    holy_grail: {
        id: 'holy_grail',
        name: '聖なる杯',
        desc: '清らかな光を湛えた杯。究極の聖なる姿へ。',
        type: 'material',
        rarity: 'super_rare',
        icon: '🏆'
    },
    void_stone: {
        id: 'void_stone',
        name: '無の石',
        desc: '全てを吸い込む漆黒の石。深淵の覇者となる。',
        type: 'material',
        rarity: 'super_rare',
        icon: '🕳️'
    },
    nature_seed: {
        id: 'nature_seed',
        name: '大樹の種',
        desc: '生命の鼓動を感じる巨大な種。森の守護者への進化。',
        type: 'material',
        rarity: 'rare',
        icon: '🥜'
    },
    gear_of_destiny: {
        id: 'gear_of_destiny',
        name: '運命の歯車',
        desc: '時を刻み続ける黄金の歯車。機械仕掛けの神へ。',
        type: 'material',
        rarity: 'super_rare',
        icon: '⚙️'
    },
    stardust_powder: {
        id: 'stardust_powder',
        name: '流星の粉',
        desc: '星が流れた跡に残る銀色の粉。宇宙の意志と繋がる。',
        type: 'material',
        rarity: 'rare',
        icon: '✨'
    },
    demon_wing: {
        id: 'demon_wing',
        name: '悪魔の羽',
        desc: '禍々しい魔力を放つ羽。魔王としての覚醒。',
        type: 'material',
        rarity: 'super_rare',
        icon: '🦇'
    },
    ancient_scroll: {
        id: 'ancient_scroll',
        name: '古の巻物',
        desc: '失われた知恵が記された巻物。知的な進化を助ける。',
        type: 'material',
        rarity: 'rare',
        icon: '📜'
    },
    dragon_scale: {
        id: 'dragon_scale',
        name: '竜の鱗',
        desc: '強靭な竜の力が宿る鱗。物理的な進化を促す。',
        type: 'material',
        rarity: 'rare',
        icon: '🛡️'
    },

    // --- 背景テーマ (Backgrounds) ---
    bg_default: {
        id: 'bg_default',
        name: 'いつもの広場',
        desc: '心地よい風が吹く、いつもの広場。',
        type: 'background',
        rarity: 'common',
        icon: '🌱',
        styles: {
            backgroundColor: '#bae6fd',
            groundColor: '#bbf7d0',
            decorations: 'grass'
        }
    },
    bg_space: {
        id: 'bg_space',
        name: '宇宙空間',
        desc: 'はこにわ全体が神秘的な宇宙に。星が流れる。',
        type: 'background',
        rarity: 'rare',
        icon: '🚀',
        styles: {
            backgroundColor: '#0f172a',
            groundColor: '#1e293b',
            decorations: 'stars'
        }
    },
    bg_cyber: {
        id: 'bg_cyber',
        name: 'サイバーパンク',
        desc: 'ネオン輝く未来都市。デジタルな雰囲気。',
        type: 'background',
        rarity: 'rare',
        icon: '🌃',
        styles: {
            backgroundColor: '#2e1065',
            groundColor: '#4c1d95',
            decorations: 'neon_v2'
        }
    },
    bg_washitsu: {
        id: 'bg_washitsu',
        name: '月夜の竹林',
        desc: '静かな月明かりに照らされた、幻想的な竹林。',
        type: 'background',
        rarity: 'rare',
        icon: '🎋',
        styles: {
            backgroundColor: '#064e3b',
            groundColor: '#065f46',
            decorations: 'bamboo'
        }
    },
    bg_forest: {
        id: 'bg_forest',
        name: '深い森',
        desc: '木漏れ日が美しい、静かな深い森。',
        type: 'background',
        rarity: 'rare',
        icon: '🌳',
        styles: {
            backgroundColor: '#064e3b',
            groundColor: '#065f46',
            decorations: 'leaves'
        }
    },
    bg_undersea: {
        id: 'bg_undersea',
        name: 'おもちゃの国',
        desc: 'POPでカラフルな、ワクワクするおもちゃの世界。',
        type: 'background',
        rarity: 'super_rare',
        icon: '🎁',
        styles: {
            backgroundColor: '#fef08a',
            groundColor: '#fbcfe8',
            decorations: 'toys'
        }
    },
    bg_desert: {
        id: 'bg_desert',
        name: '黄金の砂漠',
        desc: '果てしなく続く砂の海と、沈まぬ太陽。',
        type: 'background',
        rarity: 'rare',
        icon: '🏜️',
        styles: {
            backgroundColor: '#fbbf24',
            groundColor: '#f59e0b',
            decorations: 'sand_v2'
        }
    },
    bg_castle: {
        id: 'bg_castle',
        name: '天空の庭園',
        desc: '雲を眼下に見下ろす、白亜の美しい空中庭園。',
        type: 'background',
        rarity: 'super_rare',
        icon: '⛲',
        styles: {
            backgroundColor: '#f1f5f9',
            groundColor: '#cbd5e1',
            decorations: 'sky_garden'
        }
    },
    bg_school: {
        id: 'bg_school',
        name: '黄昏の海岸道',
        desc: '海風を感じながら歩く、夕焼け空の下の海岸道。',
        type: 'background',
        rarity: 'common',
        icon: '🌅',
        styles: {
            backgroundColor: '#f97316',
            groundColor: '#fb923c',
            decorations: 'coast'
        }
    },
    bg_cafe: {
        id: 'bg_cafe',
        name: '秘密の遺跡',
        desc: '草木に覆われた、神秘的な古代の石造りの遺跡。',
        type: 'background',
        rarity: 'rare',
        icon: '🏛️',
        styles: {
            backgroundColor: '#94a3b8',
            groundColor: '#64748b',
            decorations: 'ruins'
        }
    },
    bg_volcano: {
        id: 'bg_volcano',
        name: '灼熱の火山',
        desc: 'マグマが流れる過酷な環境。常に熱い。',
        type: 'background',
        rarity: 'rare',
        icon: '🌋',
        styles: {
            backgroundColor: '#450a0a',
            groundColor: '#7f1d1d',
            decorations: 'fires'
        }
    },
    bg_snow: {
        id: 'bg_snow',
        name: '北極のオーロラ',
        desc: '極寒の夜空に揺らめく光のカーテン。神秘的な冬。',
        type: 'background',
        rarity: 'rare',
        icon: '🌌',
        styles: {
            backgroundColor: '#020617',
            groundColor: '#0f172a',
            decorations: 'aurora'
        }
    },
    bg_candy: {
        id: 'bg_candy',
        name: 'お菓子の国',
        desc: '地面も空も甘いお菓子でできた夢の国。',
        type: 'background',
        rarity: 'super_rare',
        icon: '🍭',
        styles: {
            backgroundColor: '#fdf2f8',
            groundColor: '#fbcfe8',
            decorations: 'sweets'
        }
    },
    bg_zen: {
        id: 'bg_zen',
        name: '雲の上の王国',
        desc: 'どこまでも続く雲海と、空に浮かぶ不思議な島。',
        type: 'background',
        rarity: 'rare',
        icon: '☁️',
        styles: {
            backgroundColor: '#bae6fd',
            groundColor: '#f8fafc',
            decorations: 'clouds_kingdom'
        }
    },
    bg_flower: {
        id: 'bg_flower',
        name: '一面の花畑',
        desc: '色とりどりの花が咲き誇り、風に合わせて舞う。',
        type: 'background',
        rarity: 'rare',
        icon: '🌷',
        styles: {
            backgroundColor: '#f0fdfa',
            groundColor: '#ccfbf1',
            decorations: 'petals'
        }
    },
    bg_crystal: {
        id: 'bg_crystal',
        name: '魔法の国',
        desc: '昼も夜も不思議な光に満ちた、幻想的な魔法の国。',
        type: 'background',
        rarity: 'super_rare',
        icon: '🧙',
        styles: {
            backgroundColor: '#1e1b4b',
            groundColor: '#312e81',
            decorations: 'magic_kingdom'
        }
    },
    bg_ice: {
        id: 'bg_ice',
        name: '氷の結晶',
        desc: '透明感あふれる氷の結晶が輝く、美しい世界。',
        type: 'background',
        rarity: 'rare',
        icon: '❄️',
        styles: {
            backgroundColor: '#e0f2fe',
            groundColor: '#bae6fd',
            decorations: 'ice_crystals'
        }
    },

    // --- 家具 (Furniture) ---
    f_gaming_pc: {
        id: 'f_gaming_pc',
        name: 'ゲーミングPC',
        desc: '七色に光るハイスペックPC。キャラの知性が上がるかも。',
        type: 'furniture',
        rarity: 'rare',
        icon: '💻'
    },
    f_bonsai: {
        id: 'f_bonsai',
        name: '盆栽',
        desc: '長い年月をかけて育てられた芸術作品。',
        type: 'furniture',
        rarity: 'rare',
        icon: '🪴'
    },
    f_tent: {
        id: 'f_tent',
        name: 'キャンプテント',
        desc: 'お泊まりセット。冒険の準備は万端！',
        type: 'furniture',
        rarity: 'common',
        icon: '⛺'
    },
    f_fountain: {
        id: 'f_fountain',
        name: '噴水',
        desc: '涼やかな水音が響く、優雅な噴水。',
        type: 'furniture',
        rarity: 'rare',
        icon: '⛲'
    },
    f_treasure_box: {
        id: 'f_treasure_box',
        name: '宝箱',
        desc: '中身は何かな？ワクワクが詰まった箱。',
        type: 'furniture',
        rarity: 'super_rare',
        icon: '🎁'
    },
    f_bed: {
        id: 'f_bed',
        name: 'ふかふかベッド',
        desc: '最高級の寝心地を提供するベッド。',
        type: 'furniture',
        rarity: 'common',
        icon: '🛏️'
    },
    f_tv: {
        id: 'f_tv',
        name: 'レトロテレビ',
        desc: '懐かしい映像が流れる、ブラウン管のテレビ。',
        type: 'furniture',
        rarity: 'common',
        icon: '📺'
    },
    f_bookshelf: {
        id: 'f_bookshelf',
        name: '本棚',
        desc: '知識の宝庫。整然と並んだ本たち。',
        type: 'furniture',
        rarity: 'rare',
        icon: '📚'
    },
    f_globe: {
        id: 'f_globe',
        name: '地球儀',
        desc: '世界中を旅した気分になれる道具。',
        type: 'furniture',
        rarity: 'rare',
        icon: '🌍'
    },
    f_cactus: {
        id: 'f_cactus',
        name: 'サボテン',
        desc: '砂漠の小さな友人。過酷な環境にも強い。',
        type: 'furniture',
        rarity: 'common',
        icon: '🌵'
    },
    f_balloon: {
        id: 'f_balloon',
        name: 'お祝い風船',
        desc: 'プカプカ浮かぶ、カラフルな風船。',
        type: 'furniture',
        rarity: 'common',
        icon: '🎈'
    },
    f_robot: {
        id: 'f_robot',
        name: 'おもちゃのロボ',
        desc: '未来からやってきた？精巧なおもちゃ。',
        type: 'furniture',
        rarity: 'rare',
        icon: '🤖'
    },
    f_piano: {
        id: 'f_piano',
        name: 'グランドピアノ',
        desc: '美しい旋律を奏でる、黒塗りのピアノ。',
        type: 'furniture',
        rarity: 'super_rare',
        icon: '🎹'
    },
    f_ufo: {
        id: 'f_ufo',
        name: 'おもちゃのUFO',
        desc: '謎の浮遊物体。時々光る。',
        type: 'furniture',
        rarity: 'super_rare',
        icon: '🛸'
    },
    f_shrine: {
        id: 'f_shrine',
        name: '鳥居の置物',
        desc: 'ご利益がありそうな、小さな鳥居。',
        type: 'furniture',
        rarity: 'rare',
        icon: '⛩️'
    },
    f_statue: {
        id: 'f_statue',
        name: '考える人像',
        desc: '哲学的な雰囲気を醸し出す彫像。',
        type: 'furniture',
        rarity: 'rare',
        icon: '🗿'
    },
    f_gramophone: {
        id: 'f_gramophone',
        name: '蓄音機',
        desc: 'ノスタルジックな音楽を聴こう。',
        type: 'furniture',
        rarity: 'rare',
        icon: '📻'
    },
    f_gem: {
        id: 'f_gem',
        name: '巨大な宝石',
        desc: '眩い光を放つ、カットの美しい宝石。',
        type: 'furniture',
        rarity: 'super_rare',
        icon: '💎'
    },
    f_gold_trophy: {
        id: 'f_gold_trophy',
        name: '黄金のトロフィー',
        desc: 'ショップで購入した証。まばゆい金色に輝くトロフィー。',
        type: 'furniture',
        rarity: 'super_rare',
        icon: '🏆'
    },
};

/** 背景スタイルを取得 */
export function getBackgroundStyles(bgId) {
    return ITEMS[bgId]?.styles || { backgroundColor: '#f0fdf4', groundColor: '#dcfce7' };
}
