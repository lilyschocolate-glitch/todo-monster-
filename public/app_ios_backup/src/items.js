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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <circle cx="16" cy="16" r="12" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
            <path d="M16 4 q 12 12 0 24 q -4 -12 0 -24" fill="#64748b" opacity="0.8"/>
            <circle cx="12" cy="10" r="3" fill="#FFFFFF" opacity="0.4"/>
            <circle cx="20" cy="18" r="1.5" fill="#f1f5f9" opacity="0.3"/>
        </svg>`
    },
    sun_stone: {
        id: 'sun_stone',
        name: '太陽の石',
        desc: '太陽の熱量を閉じ込めた情熱の石。特定の進化を促す。',
        type: 'material',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <defs>
                <radialGradient id="sunGrad">
                    <stop offset="0%" stop-color="#fbbf24"/>
                    <stop offset="100%" stop-color="#ea580c"/>
                </radialGradient>
            </defs>
            <circle cx="16" cy="16" r="12" fill="url(#sunGrad)" stroke="#7c2d12" stroke-width="1.5"/>
            <path d="M16 2 v28 M2 16 h28 M6 6 l20 20 M6 26 l20 -20" stroke="#fef3c7" stroke-width="1" opacity="0.4"/>
            <circle cx="16" cy="16" r="5" fill="#FFFFFF" opacity="0.3"/>
        </svg>`
    },
    rainbow_drop: {
        id: 'rainbow_drop',
        name: '虹のしずく',
        desc: '全ての可能性を秘めた七色のしずく。超絶進化の鍵。',
        type: 'material',
        rarity: 'super_rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <defs>
                <linearGradient id="rainbowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#f472b6"/>
                    <stop offset="50%" stop-color="#818cf8"/>
                    <stop offset="100%" stop-color="#34d399"/>
                </linearGradient>
            </defs>
            <path d="M16 4 q -10 12 0 24 q 10 -12 0 -24" fill="url(#rainbowGrad)" stroke="#9d174d" stroke-width="1.5"/>
            <ellipse cx="14" cy="10" rx="3" ry="5" fill="#FFFFFF" opacity="0.3" transform="rotate(-15 14 10)"/>
        </svg>`
    },
    thunder_gem: {
        id: 'thunder_gem',
        name: '雷の宝石',
        desc: 'パチパチとはぜる電撃の宝石。雷神の如き進化へ。',
        type: 'material',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <path d="M18 4 L8 16 H14 L10 28 L22 14 H16 Z" fill="#fbbf24" stroke="#b45309" stroke-width="1.5"/>
            <path d="M19 6 L11 15 H15 L12 24 L20 14 H17 Z" fill="#FFFFFF" opacity="0.4"/>
            <circle cx="16" cy="14" r="8" fill="#facc15" opacity="0.1"/>
        </svg>`
    },
    glacial_ice: {
        id: 'glacial_ice',
        name: '永久凍土の氷',
        desc: '決して溶けない絶対零度の氷。氷龍の力を呼び覚ます。',
        type: 'material',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="6" y="6" width="20" height="20" rx="4" fill="#bae6fd" stroke="#0369a1" stroke-width="1.5" transform="rotate(45 16 16)"/>
            <rect x="10" y="10" width="12" height="12" rx="2" fill="#e0f2fe" opacity="0.7" transform="rotate(45 16 16)"/>
            <path d="M12 12 L20 20 M20 12 L12 20" stroke="#FFFFFF" stroke-width="1.5" opacity="0.5"/>
        </svg>`
    },
    eternal_flame: {
        id: 'eternal_flame',
        name: '消えない種火',
        desc: '永遠に燃え続ける意志の火。鳳凰の如き転生を。',
        type: 'material',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <path d="M16 4 q -10 14 0 24 q 10 -14 0 -24" fill="#ef4444" stroke="#7f1d1d" stroke-width="1.5"/>
            <path d="M16 10 q -5 8 0 16 q 5 -8 0 -16" fill="#f59e0b"/>
            <circle cx="16" cy="18" r="4" fill="#fcd34d" opacity="0.8"/>
            <path d="M14 10 q 2 -4 4 0" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.4"/>
        </svg>`
    },
    holy_grail: {
        id: 'holy_grail',
        name: '聖なる杯',
        desc: '清らかな光を湛えた杯。究極の聖なる姿へ。',
        type: 'material',
        rarity: 'super_rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <path d="M8 6 h16 v10 q 0 8 -8 8 q -8 0 -8 -8 Z" fill="#facc15" stroke="#b45309" stroke-width="1.5"/>
            <rect x="14" y="24" width="4" height="4" fill="#ca8a04"/>
            <rect x="10" y="28" width="12" height="2" rx="1" fill="#ca8a04"/>
            <path d="M10 8 q 6 2 12 0" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.6"/>
            <circle cx="16" cy="14" r="3" fill="#60a5fa" opacity="0.4"/>
        </svg>`
    },
    void_stone: {
        id: 'void_stone',
        name: '無の石',
        desc: '全てを吸い込む漆黒の石。深淵の覇者となる。',
        type: 'material',
        rarity: 'super_rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <circle cx="16" cy="16" r="12" fill="#1e1b4b" stroke="#000" stroke-width="2"/>
            <circle cx="16" cy="16" r="6" fill="#000"/>
            <path d="M16 4 q 12 12 0 24 q -12 -12 0 -24" fill="none" stroke="#c026d3" stroke-width="1" opacity="0.4"/>
            <circle cx="12" cy="10" r="2" fill="#FFFFFF" opacity="0.1"/>
        </svg>`
    },
    nature_seed: {
        id: 'nature_seed',
        name: '大樹の種',
        desc: '生命の鼓動を感じる巨大な種。守護者への進化。',
        type: 'material',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <path d="M16 6 q -8 10 0 20 q 8 -10 0 -20" fill="#15803d" stroke="#064e3b" stroke-width="1.5"/>
            <path d="M16 8 v14 M12 14 q 4 4 8 0 M10 18 q 6 6 12 0" fill="none" stroke="#bbf7d0" stroke-width="1.5" opacity="0.4"/>
            <circle cx="13" cy="12" r="2" fill="#FFFFFF" opacity="0.3"/>
        </svg>`
    },
    gear_of_destiny: {
        id: 'gear_of_destiny',
        name: '運命の歯車',
        desc: '時を刻み続ける黄金の歯車。機械仕掛けの神へ。',
        type: 'material',
        rarity: 'super_rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <circle cx="16" cy="16" r="10" fill="#facc15" stroke="#b45309" stroke-width="2"/>
            <path d="M16 4 v24 M4 16 h24 M7 7 l18 18 M7 25 l18 -18" stroke="#ca8a04" stroke-width="3" opacity="0.5"/>
            <circle cx="16" cy="16" r="4" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
            <rect x="15" y="15" width="2" height="2" fill="#FFFFFF"/>
        </svg>`
    },
    stardust_powder: {
        id: 'stardust_powder',
        name: '流星の粉',
        desc: '星が流れた跡に残る銀色の粉。宇宙の意志と繋がる。',
        type: 'material',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <circle cx="16" cy="16" r="12" fill="#1e1b4b" opacity="0.1"/>
            <path d="M16 4 L18 14 L28 16 L18 18 L16 28 L14 18 L4 16 L14 14 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
            <circle cx="8" cy="8" r="1.5" fill="#FFFFFF" opacity="0.8"/>
            <circle cx="22" cy="24" r="1" fill="#FFFFFF" opacity="0.6"/>
            <circle cx="24" cy="10" r="1.2" fill="#60a5fa" opacity="0.7"/>
        </svg>`
    },
    demon_wing: {
        id: 'demon_wing',
        name: '悪魔の羽',
        desc: '禍々しい魔力を放つ羽。魔王としての覚醒。',
        type: 'material',
        rarity: 'super_rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <path d="M4 12 q 12 -4 24 0 q -12 12 -24 0" fill="#4c1d95" stroke="#2e1065" stroke-width="2"/>
            <path d="M8 12 v8 M16 11 v10 M24 12 v8" stroke="#1e1b4b" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
            <path d="M8 13 q 8 -4 16 0" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.2"/>
        </svg>`
    },
    ancient_scroll: {
        id: 'ancient_scroll',
        name: '古の巻物',
        desc: '失われた知恵が記された巻物。知的な進化を助ける。',
        type: 'material',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="4" y="8" width="24" height="16" rx="2" fill="#fde68a" stroke="#b45309" stroke-width="1.5"/>
            <rect x="2" y="6" width="4" height="20" rx="2" fill="#78350f"/>
            <rect x="26" y="6" width="4" height="20" rx="2" fill="#78350f"/>
            <path d="M8 12 h16 M8 16 h12 M8 20 h14" stroke="#b45309" stroke-width="1" opacity="0.3"/>
            <path d="M6 10 q 10 2 20 0" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.4"/>
        </svg>`
    },
    dragon_scale: {
        id: 'dragon_scale',
        name: '竜の鱗',
        desc: '強靭な竜の力が宿る鱗。物理的な進化を促す。',
        type: 'material',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <path d="M16 4 L26 12 L16 28 L6 12 Z" fill="#064e3b" stroke="#022c22" stroke-width="2"/>
            <path d="M16 8 L22 13 L16 24 L10 13 Z" fill="#10b981" opacity="0.6"/>
            <path d="M11 12 q 5 -4 10 0" stroke="#FFFFFF" stroke-width="2" opacity="0.3"/>
            <circle cx="16" cy="16" r="2" fill="#FFFFFF" opacity="0.2"/>
        </svg>`
    },

    // --- 背景テーマ (Backgrounds) ---
    bg_default: {
        id: 'bg_default',
        name: 'いつもの広場',
        desc: '心地よい風が吹く、いつもの広場。',
        type: 'background',
        rarity: 'common',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#bae6fd" stroke="#0ea5e9" stroke-width="1.5"/>
            <path d="M2 20 q 14 -4 28 0 v 8 q -14 4 -28 0 Z" fill="#4ade80"/>
            <circle cx="22" cy="8" r="4" fill="#fde047"/>
            <path d="M6 24 q 2 -4 4 0" fill="none" stroke="#15803d" stroke-width="1.5" opacity="0.6"/>
        </svg>`,
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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
            <circle cx="24" cy="10" r="4" fill="#f1f5f9" opacity="0.9"/>
            <circle cx="8" cy="22" r="3" fill="#6366f1"/>
            <circle cx="12" cy="6" r="0.8" fill="#FFF"/>
            <circle cx="4" cy="14" r="0.8" fill="#FFF"/>
            <circle cx="20" cy="26" r="0.8" fill="#FFF"/>
            <path d="M6 6 l4 4" stroke="#FFFFFF" stroke-width="0.5" opacity="0.3"/>
        </svg>`,
        styles: {
            backgroundColor: '#0f172a',
            groundColor: '#1e293b',
            decorations: 'stars'
        }
    },
    bg_washitsu: {
        id: 'bg_washitsu',
        name: '月夜の竹林',
        desc: '静かな月明かりに照らされた、幻想的な竹林。',
        type: 'background',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#064e3b" stroke="#022c22" stroke-width="1.5"/>
            <rect x="6" y="6" width="3" height="20" fill="#059669" opacity="0.6"/>
            <rect x="23" y="6" width="3" height="20" fill="#059669" opacity="0.6"/>
            <circle cx="24" cy="8" r="4" fill="#fde047" opacity="0.8"/>
            <path d="M10 10 q 6 -2 12 0" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.2"/>
        </svg>`,
        styles: {
            backgroundColor: '#064e3b',
            groundColor: '#065f46',
            decorations: 'bamboo'
        }
    },
    bg_cyber: {
        id: 'bg_cyber',
        name: 'サイバーパンク',
        desc: 'ネオン輝く未来都市。デジタルな雰囲気。',
        type: 'background',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#2e1065" stroke="#1e1b4b" stroke-width="1.5"/>
            <rect x="6" y="10" width="4" height="20" fill="#4c1d95"/>
            <rect x="20" y="6" width="4" height="24" fill="#4c1d95"/>
            <path d="M2 16 h28" stroke="#d946ef" stroke-width="2" opacity="0.8"/>
            <circle cx="8" cy="12" r="1.5" fill="#06b6d4"/>
        </svg>`,
        styles: {
            backgroundColor: '#2e1065',
            groundColor: '#4c1d95',
            decorations: 'neon_v2'
        }
    },
    bg_forest: {
        id: 'bg_forest',
        name: '深い森',
        desc: '木漏れ日が美しい、静かな深い森。',
        type: 'background',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#064e3b" stroke="#022c22" stroke-width="1.5"/>
            <path d="M8 24 L16 8 L24 24 Z" fill="#15803d" stroke="#052c11" stroke-width="1"/>
            <path d="M4 22 L10 10 L16 22 Z" fill="#166534" opacity="0.8"/>
            <circle cx="16" cy="12" r="1.5" fill="#fde047" opacity="0.4"/>
        </svg>`,
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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#fef08a" stroke="#eab308" stroke-width="1.5"/>
            <rect x="6" y="18" width="8" height="8" rx="2" fill="#f43f5e"/>
            <rect x="18" y="6" width="8" height="8" rx="2" fill="#3b82f6"/>
            <circle cx="22" cy="22" r="4" fill="#f472b6"/>
            <circle cx="10" cy="10" r="2" fill="#FFFFFF" opacity="0.5"/>
        </svg>`,
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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
            <path d="M2 24 q 14 -10 28 0 v 4 q -14 -10 -28 0 Z" fill="#f59e0b"/>
            <circle cx="22" cy="8" r="5" fill="#ea580c"/>
            <circle cx="18" cy="6" r="2" fill="#FFFFFF" opacity="0.3"/>
        </svg>`,
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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#7dd3fc" stroke="#0ea5e9" stroke-width="1.5"/>
            <path d="M4 22 q 12 -6 24 0 v 6 q -12 -6 -24 0 Z" fill="#f1f5f9"/>
            <rect x="10" y="10" width="12" height="12" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>
            <circle cx="16" cy="14" r="2" fill="#60a5fa" opacity="0.5"/>
        </svg>`,
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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#f97316" stroke="#c2410c" stroke-width="1.5"/>
            <rect x="2" y="16" width="28" height="14" fill="#1e4ed8"/>
            <circle cx="16" cy="16" r="6" fill="#fde047"/>
            <path d="M4 18 h24" stroke="#FFFFFF" stroke-width="0.5" opacity="0.3"/>
        </svg>`,
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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#14532d" stroke="#064e3b" stroke-width="1.5"/>
            <rect x="10" y="10" width="12" height="18" fill="#475569" stroke="#1e293b" stroke-width="1"/>
            <path d="M4 20 q 6 -10 12 0 M16 18 q 6 -10 12 0" fill="#10b981" opacity="0.6"/>
        </svg>`,
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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#450a0a" stroke="#2e0505" stroke-width="1.5"/>
            <path d="M6 26 L16 8 L26 26 Z" fill="#991b1b" stroke="#450a0a" stroke-width="1"/>
            <path d="M14 8 q 2 -4 4 0 v 6 h -4 Z" fill="#facc15" opacity="0.8"/>
            <circle cx="16" cy="20" r="3" fill="#ea580c"/>
        </svg>`,
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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#020617" stroke="#1e293b" stroke-width="1.5"/>
            <path d="M2 12 q 14 -10 28 0" fill="none" stroke="#10b981" stroke-width="3" opacity="0.4"/>
            <circle cx="8" cy="8" r="1" fill="#FFF"/>
            <circle cx="24" cy="20" r="1.2" fill="#60a5fa" opacity="0.6"/>
            <path d="M4 22 q 12 -4 24 0 v 6 q -12 -4 -24 0 Z" fill="#f8fafc" opacity="0.2"/>
        </svg>`,
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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#fdf2f8" stroke="#fbcfe8" stroke-width="1.5"/>
            <circle cx="16" cy="12" r="8" fill="#f472b6" stroke="#9d174d" stroke-width="1"/>
            <rect x="14" y="20" width="4" height="8" rx="1" fill="#78350f"/>
            <circle cx="12" cy="8" r="2" fill="#FFFFFF" opacity="0.4"/>
        </svg>`,
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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#0ea5e9" stroke="#0284c7" stroke-width="1.5"/>
            <rect x="6" y="16" width="20" height="8" rx="4" fill="#f8fafc"/>
            <circle cx="12" cy="14" r="4" fill="#FFFFFF"/>
            <circle cx="20" cy="14" r="3" fill="#FFFFFF"/>
            <circle cx="22" cy="10" r="1" fill="#FFFFFF" opacity="0.5"/>
        </svg>`,
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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.5"/>
            <rect x="2" y="18" width="28" height="12" fill="#ccfbf1"/>
            <circle cx="10" cy="14" r="4" fill="#f43f5e" stroke="#be123c" stroke-width="1"/>
            <circle cx="22" cy="10" r="3" fill="#facc15" stroke="#ca8a04" stroke-width="1"/>
            <circle cx="8" cy="12" r="1.5" fill="#FFFFFF" opacity="0.4"/>
        </svg>`,
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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#1e1b4b" stroke="#312e81" stroke-width="1.5"/>
            <path d="M16 8 L22 22 L16 18 L10 22 Z" fill="#818cf8" stroke="#4f46e5" stroke-width="1.5"/>
            <circle cx="16" cy="12" r="2" fill="#FFFFFF" opacity="0.4"/>
            <circle cx="22" cy="22" r="1" fill="#c026d3" opacity="0.6"/>
            <circle cx="10" cy="22" r="1" fill="#c026d3" opacity="0.6"/>
        </svg>`,
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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#bae6fd" stroke="#0ea5e9" stroke-width="1.5"/>
            <path d="M16 6 L16 26 M6 16 L26 16 M10 10 L22 22 M10 22 L22 10" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
            <circle cx="16" cy="16" r="4" fill="#60a5fa" opacity="0.4"/>
        </svg>`,
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
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="4" y="6" width="24" height="16" rx="2" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
            <rect x="6" y="8" width="20" height="12" rx="1" fill="#1e1b4b"/>
            <rect x="8" y="10" width="4" height="2" fill="#ec4899" opacity="0.6"/>
            <rect x="20" y="10" width="4" height="2" fill="#06b6d4" opacity="0.6"/>
            <path d="M12 22 l2 4 h4 l2 -4 Z" fill="#334155"/>
        </svg>`
    },
    f_bonsai: {
        id: 'f_bonsai',
        name: '盆栽',
        desc: '長い年月をかけて育てられた芸術作品。',
        type: 'furniture',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="6" y="22" width="20" height="6" rx="3" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
            <path d="M10 22 Q 16 4 22 22" fill="none" stroke="#166534" stroke-width="8" stroke-linecap="round"/>
            <circle cx="16" cy="10" r="6" fill="#15803d" opacity="0.8"/>
            <circle cx="13" cy="8" r="2" fill="#FFFFFF" opacity="0.2"/>
        </svg>`
    },
    f_tent: {
        id: 'f_tent',
        name: 'キャンプテント',
        desc: 'お泊まりセット。冒険の準備は万端！',
        type: 'furniture',
        rarity: 'common',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <path d="M4 26 L16 6 L28 26 Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="2"/>
            <path d="M14 26 v-6 q 2 -2 4 0 v 6 Z" fill="#FFFFFF"/>
            <path d="M8 26 L16 10 L24 26" fill="none" stroke="#60a5fa" stroke-width="1.5" opacity="0.4"/>
        </svg>`
    },
    f_fountain: {
        id: 'f_fountain',
        name: '噴水',
        desc: '涼やかな水音が響く、優雅な噴水。',
        type: 'furniture',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <path d="M6 24 h20 v4 h-20 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
            <path d="M16 6 q -8 8 0 18 q 8 -8 0 -18 Z" fill="#60a5fa" stroke="#2563eb" stroke-width="1"/>
            <path d="M14 8 q 2 -4 4 0 v 10 h-4 Z" fill="#FFFFFF" opacity="0.4"/>
        </svg>`
    },
    f_treasure_box: {
        id: 'f_treasure_box',
        name: '宝箱',
        desc: '中身は何かな？ワクワクが詰まった箱。',
        type: 'furniture',
        rarity: 'super_rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="4" y="14" width="24" height="12" rx="2" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
            <path d="M4 14 v-4 q 0 -6 12 -6 q 12 0 12 6 v 4 Z" fill="#b45309" stroke="#451a03" stroke-width="1.5"/>
            <rect x="13" y="12" width="6" height="4" rx="1" fill="#facc15" stroke="#ca8a04" stroke-width="1"/>
            <circle cx="8" cy="8" r="2" fill="#FFFFFF" opacity="0.3"/>
        </svg>`
    },
    f_bed: {
        id: 'f_bed',
        name: 'ふかふかベッド',
        desc: '最高級の寝心地を提供するベッド。',
        type: 'furniture',
        rarity: 'common',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="4" y="20" width="24" height="6" rx="3" fill="#1e3a8a" stroke="#1e1b4b" stroke-width="1.5"/>
            <rect x="4" y="16" width="24" height="4" rx="2" fill="#6366f1"/>
            <rect x="6" y="14" width="8" height="4" rx="2" fill="#FFFFFF"/>
            <path d="M18 17 h6" stroke="#FFFFFF" stroke-width="2" opacity="0.6"/>
        </svg>`
    },
    f_tv: {
        id: 'f_tv',
        name: 'レトロテレビ',
        desc: '懐かしい映像が流れる、ブラウン管のテレビ。',
        type: 'furniture',
        rarity: 'common',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="4" y="6" width="24" height="18" rx="4" fill="#374151" stroke="#111827" stroke-width="1.5"/>
            <rect x="6" y="8" width="16" height="14" rx="2" fill="#1f2937"/>
            <rect x="8" y="10" width="12" height="10" rx="1" fill="#06b6d4" opacity="0.4"/>
            <circle cx="25" cy="10" r="1.5" fill="#facc15"/>
            <circle cx="25" cy="14" r="1.5" fill="#f87171"/>
            <path d="M12 6 l-4 -4 M20 6 l4 -4" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`
    },
    f_bookshelf: {
        id: 'f_bookshelf',
        name: '本棚',
        desc: '知識の宝庫。整然と並んだ本たち。',
        type: 'furniture',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="4" y="4" width="24" height="24" rx="2" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
            <rect x="6" y="8" width="6" height="6" fill="#ef4444"/>
            <rect x="14" y="8" width="4" height="6" fill="#3b82f6"/>
            <rect x="20" y="8" width="6" height="6" fill="#10b981"/>
            <rect x="6" y="18" width="10" height="6" fill="#facc15"/>
            <rect x="18" y="18" width="8" height="6" fill="#6366f1"/>
            <path d="M4 16 h24" stroke="#451a03" stroke-width="1.5"/>
        </svg>`
    },
    f_globe: {
        id: 'f_globe',
        name: '地球儀',
        desc: '世界中を旅した気分になれる道具。',
        type: 'furniture',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <circle cx="16" cy="14" r="10" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="1.5"/>
            <path d="M16 4 q 10 10 0 20 q -10 -10 0 -20" fill="#22c55e" opacity="0.6"/>
            <rect x="14" y="24" width="4" height="4" fill="#64748b"/>
            <rect x="10" y="28" width="12" height="2" rx="1" fill="#475569"/>
            <circle cx="12" cy="10" r="2" fill="#FFFFFF" opacity="0.3"/>
        </svg>`
    },
    f_cactus: {
        id: 'f_cactus',
        name: 'サボテン',
        desc: '砂漠の小さな友人。過酷な環境にも強い。',
        type: 'furniture',
        rarity: 'common',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <path d="M16 6 v20" stroke="#15803d" stroke-width="6" stroke-linecap="round"/>
            <path d="M12 16 q -4 -2 -4 -6 M20 12 q 4 -2 4 6" fill="none" stroke="#15803d" stroke-width="4" stroke-linecap="round"/>
            <circle cx="16" cy="6" r="3" fill="#f472b6" opacity="0.8"/>
            <circle cx="15" cy="12" r="1" fill="#FFFFFF" opacity="0.3"/>
        </svg>`
    },
    f_balloon: {
        id: 'f_balloon',
        name: 'お祝い風船',
        desc: 'プカプカ浮かぶ、カラフルな風船。',
        type: 'furniture',
        rarity: 'common',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <circle cx="16" cy="10" r="8" fill="#ef4444" stroke="#b91c1c" stroke-width="1.5"/>
            <path d="M16 18 v10" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2 2"/>
            <ellipse cx="12" cy="6" rx="3" ry="5" fill="#FFFFFF" opacity="0.4" transform="rotate(-20 12 6)"/>
        </svg>`
    },
    f_robot: {
        id: 'f_robot',
        name: 'おもちゃのロボ',
        desc: '未来からやってきた？精巧なおもちゃ。',
        type: 'furniture',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="8" y="6" width="16" height="12" rx="2" fill="#64748b" stroke="#1e293b" stroke-width="1.5"/>
            <circle cx="12" cy="10" r="2" fill="#FFFFFF"/>
            <circle cx="20" cy="10" r="2" fill="#FFFFFF"/>
            <rect x="10" y="18" width="12" height="8" rx="1" fill="#475569"/>
            <path d="M12 26 v4 M20 26 v4" stroke="#1e293b" stroke-width="2"/>
            <circle cx="12" cy="10" r="0.8" fill="#06b6d4"/>
        </svg>`
    },
    f_piano: {
        id: 'f_piano',
        name: 'グランドピアノ',
        desc: '美しい旋律を奏でる、黒塗りのピアノ。',
        type: 'furniture',
        rarity: 'super_rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <path d="M4 6 h24 v16 q 0 4 -4 4 h-16 q -4 0 -4 -4 Z" fill="#0f172a" stroke="#000" stroke-width="2"/>
            <rect x="6" y="16" width="20" height="4" fill="#FFFFFF" rx="1"/>
            <path d="M8 8 h16" stroke="#FFFFFF" stroke-width="1.5" opacity="0.2"/>
            <path d="M6 22 v6 M26 22 v6" stroke="#000" stroke-width="2"/>
        </svg>`
    },
    f_ufo: {
        id: 'f_ufo',
        name: 'おもちゃのUFO',
        desc: '謎の浮遊物体。時々光る。',
        type: 'furniture',
        rarity: 'super_rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <ellipse cx="16" cy="18" rx="12" ry="4" fill="#64748b" stroke="#1e293b" stroke-width="1.5"/>
            <path d="M8 18 q 8 -10 16 0" fill="#22d55e" opacity="0.4"/>
            <circle cx="16" cy="14" r="2" fill="#FFFFFF" opacity="0.5"/>
            <path d="M14 22 l-2 6 M18 22 l2 6" stroke="#fde047" stroke-width="2" opacity="0.6"/>
        </svg>`
    },
    f_shrine: {
        id: 'f_shrine',
        name: '鳥居の置物',
        desc: 'ご利益がありそうな、小さな鳥居。',
        type: 'furniture',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="4" y="6" width="24" height="3" fill="#b91c1c"/>
            <rect x="6" y="4" width="20" height="2" fill="#b91c1c"/>
            <rect x="8" y="6" width="3" height="22" fill="#ef4444"/>
            <rect x="21" y="6" width="3" height="22" fill="#ef4444"/>
            <path d="M11 12 h10" stroke="#b91c1c" stroke-width="2"/>
            <circle cx="10" cy="8" r="1" fill="#FFFFFF" opacity="0.4"/>
        </svg>`
    },
    f_statue: {
        id: 'f_statue',
        name: '考える人像',
        desc: '哲学的な雰囲気を醸し出す彫像。',
        type: 'furniture',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <path d="M12 6 q 4 -4 8 0 v 20 h-10 Z" fill="#64748b" stroke="#1e293b" stroke-width="1.5"/>
            <path d="M14 10 q 4 0 4 4" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
            <circle cx="16" cy="8" r="2" fill="#FFFFFF" opacity="0.2"/>
        </svg>`
    },
    f_gramophone: {
        id: 'f_gramophone',
        name: '蓄音機',
        desc: 'ノスタルジックな音楽を聴こう。',
        type: 'furniture',
        rarity: 'rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect x="6" y="18" width="20" height="10" rx="2" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
            <path d="M16 18 q 12 -12 12 -4 v 8 q 0 8 -12 8" fill="none" stroke="#facc15" stroke-width="8" stroke-linecap="round" opacity="0.6" transform="rotate(-30 16 18)"/>
            <circle cx="16" cy="16" r="4" fill="#000" opacity="0.3"/>
        </svg>`
    },
    f_gem: {
        id: 'f_gem',
        name: '巨大な宝石',
        desc: '眩い光を放つ、カットの美しい宝石。',
        type: 'furniture',
        rarity: 'super_rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <path d="M16 4 L28 12 L16 28 L4 12 Z" fill="#059669" stroke="#064e3b" stroke-width="2"/>
            <path d="M16 8 L24 14 L16 24 L8 14 Z" fill="#10b981" opacity="0.8"/>
            <path d="M12 10 q 4 -4 8 0" stroke="#FFFFFF" stroke-width="2" opacity="0.4"/>
            <circle cx="16" cy="16" r="3" fill="#FFFFFF" opacity="0.2"/>
        </svg>`
    },
    f_gold_trophy: {
        id: 'f_gold_trophy',
        name: '黄金のトロフィー',
        desc: 'ショップで購入した証。まばゆい金色に輝くトロフィー。',
        type: 'furniture',
        rarity: 'super_rare',
        icon: `<svg viewBox="0 0 32 32" width="32" height="32">
            <path d="M8 8 h16 v10 q 0 10 -8 10 q -8 0 -8 -10 Z" fill="#facc15" stroke="#b45309" stroke-width="2"/>
            <path d="M14 26 h4 v4 h-4 Z" fill="#ca8a04"/>
            <rect x="10" y="28" width="12" height="2" rx="1" fill="#ca8a04"/>
            <circle cx="16" cy="14" r="2" fill="#ef4444" opacity="0.6"/>
            <ellipse cx="12" cy="12" rx="4" ry="2" fill="#FFFFFF" opacity="0.5" transform="rotate(-30 12 12)"/>
        </svg>`
    },
};

/** 背景スタイルを取得 */
export function getBackgroundStyles(bgId) {
    return ITEMS[bgId]?.styles || { backgroundColor: '#f0fdf4', groundColor: '#dcfce7' };
}
