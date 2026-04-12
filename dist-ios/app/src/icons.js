/**
 * todo-monster Icon Registry - "Rich & Pop" Vector Version
 * Contains vibrant, smooth, multi-layered vector SVGs with glossy highlights and gradients.
 * No pixel art, all modern, sticker-like aesthetics for children and professionals.
 */

export const PIXEL_ICONS = {
    // --- UI Actions & Status ---
    // Mute On: Deep Indigo speaker with soft gradients and a glowing sound wave
    mute_on: `<svg viewBox="0 0 24 24" width="28" height="28">
        <defs>
            <linearGradient id="muteOnGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#818cf8"/>
                <stop offset="100%" stop-color="#4f46e5"/>
            </linearGradient>
        </defs>
        <path d="M5 9 v6 q 0 2 2 2 h3 l5 5 v-18 l-5 5 h-3 q-2 0 -2 2 Z" fill="url(#muteOnGrad)" stroke="#312E81" stroke-width="1.5"/>
        <path d="M18 8 q 3 4 0 8" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M19 10 q 1.5 2 0 4" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.6" stroke-linecap="round"/>
        <circle cx="8" cy="11" r="1.5" fill="#FFFFFF" opacity="0.4"/>
    </svg>`,
    // Mute Off: Soft Gray speaker with a bold, smooth RED strike-through
    mute_off: `<svg viewBox="0 0 24 24" width="28" height="28">
        <path d="M5 9 v6 q 0 2 2 2 h3 l5 5 v-18 l-5 5 h-3 q-2 0 -2 2 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
        <path d="M22 6 L4 20" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22 6 L4 20" stroke="#FFFFFF" stroke-width="1" opacity="0.4" stroke-linecap="round"/>
    </svg>`,
    // Plus: Bouncing vibrant Indigo circle with a thick white cross and gloss
    plus: `<svg viewBox="0 0 24 24" width="28" height="28">
        <defs>
            <radialGradient id="plusGrad" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#818cf8"/>
                <stop offset="100%" stop-color="#4338ca"/>
            </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#plusGrad)" stroke="#1e1b4b" stroke-width="1.5"/>
        <rect x="11" y="6" width="2" height="12" rx="1" fill="#FFFFFF"/>
        <rect x="6" y="11" width="12" height="2" rx="1" fill="#FFFFFF"/>
        <ellipse cx="8" cy="7" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.3" transform="rotate(-30 8 7)"/>
    </svg>`,
    // Egg: Cute, smooth white egg with soft shadows and colorful spots
    egg: `<svg viewBox="0 0 24 24" width="28" height="28">
        <defs>
            <linearGradient id="eggGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="100%" stop-color="#f1f5f9"/>
            </linearGradient>
        </defs>
        <path d="M12 2 q -7 10 0 20 q 7 -10 0 -20 Z" fill="url(#eggGrad)" stroke="#cbd5e1" stroke-width="1.5"/>
        <circle cx="9" cy="10" r="2" fill="#f472b6" opacity="0.4"/>
        <circle cx="15" cy="16" r="2.5" fill="#60a5fa" opacity="0.4"/>
        <ellipse cx="10" cy="6" rx="2" ry="1" fill="#FFFFFF" opacity="0.8" transform="rotate(-20 10 6)"/>
    </svg>`,

    // --- Personality Stats (Categories) ---
    // Creative: Smooth Palette with juicy paint colors and a glossy finish
    creative: `<svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M4 14 q 0 -10 8 -10 q 8 0 8 8 q 0 8 -8 8 q -2 0 -4 -2 q -4 0 -4 -4 Z" fill="#fdf2f8" stroke="#db2777" stroke-width="2"/>
        <circle cx="9" cy="8" r="2.5" fill="#ef4444"/>
        <circle cx="15" cy="8" r="2.5" fill="#3b82f6"/>
        <circle cx="9" cy="16" r="2.5" fill="#10b981"/>
        <circle cx="15" cy="16" r="2.5" fill="#facc15"/>
        <ellipse cx="7" cy="6" rx="2" ry="1" fill="#FFFFFF" opacity="0.5" transform="rotate(-45 7 6)"/>
    </svg>`,
    // Physical: Energetic Biceps with dynamic lines and a glossy sheen
    physical: `<svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M6 18 q -3 -10 6 -10 q 9 0 6 10 Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="2"/>
        <path d="M9 8 q 3 -6 6 0" fill="none" stroke="#fca5a5" stroke-width="3" stroke-linecap="round"/>
        <path d="M4 12 q 1 4 4 4 M16 16 q 3 0 4 -4" fill="none" stroke="#b91c1c" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
        <ellipse cx="12" cy="11" rx="4" ry="2" fill="#FFFFFF" opacity="0.2"/>
    </svg>`,
    // Social: Bouncy overlap Chat bubbles with rounded corners and highlights
    social: `<svg viewBox="0 0 24 24" width="22" height="22">
        <rect x="2" y="6" width="12" height="9" rx="4" fill="#3b82f6" stroke="#1e3a8a" stroke-width="1.5"/>
        <rect x="10" y="10" width="12" height="9" rx="4" fill="#10b981" stroke="#064e3b" stroke-width="1.5"/>
        <path d="M5 8 h4 M13 12 h4" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
        <circle cx="6" cy="10" r="1" fill="#FFFFFF" opacity="0.6"/>
        <circle cx="14" cy="14" r="1" fill="#FFFFFF" opacity="0.6"/>
    </svg>`,
    // Intellectual: Open book with soft gradients and glowing particles
    intellectual: `<svg viewBox="0 0 24 24" width="22" height="22">
        <rect x="4" y="4" width="16" height="16" rx="2" fill="#6366f1" stroke="#312e81" stroke-width="2"/>
        <rect x="6" y="8" width="12" height="2" rx="1" fill="#FFFFFF" opacity="0.3"/>
        <rect x="6" y="12" width="12" height="2" rx="1" fill="#FFFFFF" opacity="0.3"/>
        <rect x="6" y="16" width="12" height="2" rx="1" fill="#FFFFFF" opacity="0.3"/>
        <path d="M12 4 v16" stroke="#4338ca" stroke-width="1.5"/>
        <circle cx="16" cy="6" r="2" fill="#facc15" opacity="0.8"/>
    </svg>`,
    // Chaotic: Vibrant colorful starburst with energy effects
    chaotic: `<svg viewBox="0 0 24 24" width="22" height="22">
        <defs>
            <radialGradient id="chaoticGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="100%" stop-color="#facc15"/>
            </radialGradient>
        </defs>
        <path d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z" fill="#facc15" stroke="#b45309" stroke-width="2"/>
        <circle cx="12" cy="12" r="4" fill="url(#chaoticGrad)" opacity="0.8"/>
        <path d="M5 5 L7 7 M17 17 L19 19 M5 19 L7 17 M17 5 L19 7" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    // --- Shop Packs (Rich Illustrations) ---
    // Starter: Glossy Pink Gift box with a fluffy Yellow bow
    shop_starter: `<svg viewBox="0 0 32 32" width="32" height="32">
        <defs>
            <linearGradient id="starterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#f472b6"/>
                <stop offset="100%" stop-color="#db2777"/>
            </linearGradient>
        </defs>
        <rect x="4" y="10" width="24" height="18" rx="4" fill="url(#starterGrad)" stroke="#9d174d" stroke-width="2"/>
        <rect x="14" y="10" width="4" height="18" fill="#fde047"/>
        <path d="M14 10 q -5 -8 2 -8 q 7 0 2 8 Z M18 10 q 5 -8 -2 -8 q -7 0 -2 8 Z" fill="#fde047" stroke="#ca8a04" stroke-width="1.5"/>
        <ellipse cx="10" cy="14" rx="4" ry="2" fill="#FFFFFF" opacity="0.3" transform="rotate(-20 10 14)"/>
    </svg>`,
    // Standard: Silver Treasure Chest with glossy highlights
    shop_standard: `<svg viewBox="0 0 32 32" width="32" height="32">
        <rect x="4" y="14" width="24" height="14" rx="4" fill="#64748b" stroke="#1e293b" stroke-width="2"/>
        <path d="M4 14 v-4 q 0 -6 12 -6 q 12 0 12 6 v 4 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="2"/>
        <rect x="13" y="12" width="6" height="6" rx="2" fill="#3b82f6" stroke="#1e3a8a" stroke-width="1.5"/>
        <ellipse cx="10" cy="8" rx="5" ry="2.5" fill="#FFFFFF" opacity="0.3" transform="rotate(-10 10 8)"/>
    </svg>`,
    // Premium: Shiny Gold Treasure Chest with Glowing jewels
    shop_premium: `<svg viewBox="0 0 32 32" width="32" height="32">
        <defs>
            <linearGradient id="premiumGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#fbbf24"/>
                <stop offset="100%" stop-color="#d97706"/>
            </linearGradient>
        </defs>
        <rect x="4" y="14" width="24" height="14" rx="4" fill="url(#premiumGrad)" stroke="#78350f" stroke-width="2"/>
        <path d="M4 14 v-4 q 0 -6 12 -6 q 12 0 12 6 v 4 Z" fill="#facc15" stroke="#78350f" stroke-width="2"/>
        <rect x="13" y="12" width="6" height="6" rx="2" fill="#c026d3" stroke="#701a75" stroke-width="1.5"/>
        <circle cx="8" cy="20" r="1.5" fill="#FFFFFF" opacity="0.8"/>
        <circle cx="24" cy="22" r="1" fill="#FFFFFF" opacity="0.6"/>
    </svg>`,
    // Special: Magical orb with swirling purple energy
    shop_special: `<svg viewBox="0 0 32 32" width="32" height="32">
        <defs>
            <radialGradient id="specialGrad" cx="50%" cy="33%" r="70%">
                <stop offset="0%" stop-color="#c026d3"/>
                <stop offset="100%" stop-color="#1e1b4b"/>
            </radialGradient>
        </defs>
        <circle cx="16" cy="16" r="12" fill="url(#specialGrad)" stroke="#4f46e5" stroke-width="2"/>
        <ellipse cx="16" cy="16" rx="9" ry="3" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.3" transform="rotate(20 16 16)"/>
        <ellipse cx="16" cy="16" rx="3" ry="9" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.3" transform="rotate(20 16 16)"/>
        <circle cx="12" cy="10" r="3" fill="#FFFFFF" opacity="0.4"/>
    </svg>`,
    // Trophy: Heavy Gold Trophy with a polished sheen
    trophy: `<svg viewBox="0 0 32 32" width="32" height="32">
        <path d="M8 8 h16 v6 q 0 8 -8 8 q -8 0 -8 -8 Z" fill="#facc15" stroke="#b45309" stroke-width="2"/>
        <path d="M12 22 l-2 6 h12 l-2 -6 Z" fill="#ca8a04" stroke="#78350f" stroke-width="2"/>
        <path d="M8 10 q -4 0 -4 4 q 0 4 4 4 M24 10 q 4 0 4 4 q 0 4 -4 4" fill="none" stroke="#b45309" stroke-width="2"/>
        <ellipse cx="12" cy="12" rx="4" ry="2" fill="#FFFFFF" opacity="0.5" transform="rotate(-30 12 12)"/>
    </svg>`,

    // --- Materials (Polished Gemstones) ---
    moon_stone: `<svg viewBox="0 0 32 32" width="32" height="32">
        <circle cx="16" cy="16" r="12" fill="#334155" stroke="#0f172a" stroke-width="2"/>
        <path d="M16 4 q 12 0 0 24 q -3 -12 0 -24" fill="#64748b" opacity="0.6"/>
        <circle cx="12" cy="10" r="3" fill="#FFFFFF" opacity="0.4"/>
    </svg>`,
    sun_stone: `<svg viewBox="0 0 32 32" width="32" height="32">
        <defs>
            <radialGradient id="sunGrad">
                <stop offset="0%" stop-color="#fb923c"/>
                <stop offset="100%" stop-color="#b91c1c"/>
            </radialGradient>
        </defs>
        <circle cx="16" cy="16" r="12" fill="url(#sunGrad)" stroke="#450a0a" stroke-width="2"/>
        <path d="M16 2 v28 M2 16 h28 M6 6 l20 20 M6 26 l20 -20" stroke="#fde047" stroke-width="1.5" opacity="0.4"/>
        <circle cx="16" cy="16" r="6" fill="#facc15" opacity="0.3"/>
    </svg>`,
    rainbow_drop: `<svg viewBox="0 0 32 32" width="32" height="32">
        <defs>
            <linearGradient id="rainbowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#f472b6"/>
                <stop offset="50%" stop-color="#818cf8"/>
                <stop offset="100%" stop-color="#34d399"/>
            </linearGradient>
        </defs>
        <path d="M16 4 q -10 12 0 24 q 10 -12 0 -24" fill="url(#rainbowGrad)" stroke="#9d174d" stroke-width="1.5"/>
        <ellipse cx="14" cy="10" rx="3" ry="6" fill="#FFFFFF" opacity="0.3" transform="rotate(-15 14 10)"/>
    </svg>`,

    // --- System & Status ---
    general: `<svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M12 2 L15 8 L22 9 L17 14 L18.5 21 L12 17 L5.5 21 L7 14 L2 9 L9 8 Z" fill="#facc15" stroke="#ca8a04" stroke-width="2" stroke-linejoin="round"/>
        <ellipse cx="10" cy="7" rx="2" ry="1" fill="#FFFFFF" opacity="0.4" transform="rotate(-30 10 7)"/>
    </svg>`,
    status_connected: `<svg viewBox="0 0 24 24" width="18" height="18">
        <defs>
            <radialGradient id="connGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stop-color="#4ade80"/>
                <stop offset="100%" stop-color="#16a34a"/>
            </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="8" fill="url(#connGrad)" stroke="#064e3b" stroke-width="1.5"/>
        <circle cx="10" cy="10" r="2.5" fill="#FFFFFF" opacity="0.5"/>
    </svg>`,
    status_disconnected: `<svg viewBox="0 0 24 24" width="18" height="18">
        <circle cx="12" cy="12" r="8" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
        <circle cx="11" cy="11" r="2" fill="#FFFFFF" opacity="0.3"/>
    </svg>`,

    // --- Special & Rare (Investigation Log) ---
    scroll: `<svg viewBox="0 0 24 24" width="24" height="24">
        <rect x="4" y="6" width="16" height="12" rx="1" fill="#fde68a" stroke="#92400e" stroke-width="1.5"/>
        <path d="M4 6 v12 M20 6 v12" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
        <path d="M7 10 h10 M7 14 h6" stroke="#92400e" opacity="0.3" stroke-width="1.5"/>
    </svg>`,
    gold_egg: `<svg viewBox="0 0 24 24" width="24" height="24">
        <defs>
            <linearGradient id="goldEggGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fef9c3"/>
                <stop offset="100%" stop-color="#facc15"/>
            </linearGradient>
        </defs>
        <path d="M12 4 q -6 8 0 16 q 6 -8 0 -16 Z" fill="url(#goldEggGrad)" stroke="#a16207" stroke-width="1.5"/>
        <circle cx="9" cy="10" r="2" fill="#FFFFFF" opacity="0.5"/>
    </svg>`,
    developer: `<svg viewBox="0 0 24 24" width="24" height="24">
        <rect x="3" y="5" width="18" height="14" rx="2" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
        <path d="M7 10 L10 12 L7 14 M12 15 h5" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="6" cy="7" rx="1" ry="0.5" fill="#f87171"/>
    </svg>`,
    bulb: `<svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M12 4 a 5 5 0 0 1 5 5 c 0 3 -2 4 -2 6 h -6 s -2 -3 -2 -6 a 5 5 0 0 1 5 -5" fill="#fbef23" stroke="#854d0e" stroke-width="1.5"/>
        <path d="M10 18 h4 M11 21 h2" stroke="#854d0e" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="10" cy="8" r="1.5" fill="#FFFFFF" opacity="0.5"/>
    </svg>`,
    cat: `<svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M6 18 q 0 -10 6 -10 q 6 0 6 10 M5 8 L8 10 M19 8 L16 10" fill="#111" stroke="#333" stroke-width="1.5"/>
        <circle cx="9" cy="13" r="1" fill="#4ade80"/>
        <circle cx="15" cy="13" r="1" fill="#4ade80"/>
        <path d="M11 15 q 1 1 2 0" fill="none" stroke="#f472b6" stroke-width="1"/>
    </svg>`,
    coffee: `<svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M6 8 h10 v10 q 0 2 -2 2 h-6 q -2 0 -2 -2 Z" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
        <path d="M16 10 h2 q 2 0 2 2 v 2 q 0 2 -2 2 h -2" fill="none" stroke="#451a03" stroke-width="1.5"/>
        <path d="M8 5 q 1 -2 2 0 M12 5 q 1 -2 2 0" stroke="#94a3b8" fill="none" stroke-width="1"/>
    </svg>`,
    bug: `<svg viewBox="0 0 24 24" width="24" height="24">
        <circle cx="12" cy="14" r="6" fill="#1e293b" stroke="#000" stroke-width="1.5"/>
        <rect x="8" y="10" width="8" height="2" fill="#ef4444" opacity="0.8"/>
        <path d="M6 10 L4 8 M18 10 L20 8 M6 18 L4 20 M18 18 L20 20" stroke="#000" stroke-width="1.5"/>
    </svg>`,
    king: `<svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M5 16 L3 8 L8 11 L12 6 L16 11 L21 8 L19 16 Z" fill="#facc15" stroke="#854d0e" stroke-width="1.5"/>
        <circle cx="12" cy="6" r="1" fill="#ef4444"/>
        <circle cx="3" cy="8" r="1" fill="#3b82f6"/>
        <circle cx="21" cy="8" r="1" fill="#3b82f6"/>
    </svg>`,
    sparkle: `<svg viewBox="0 0 24 24" width="20" height="20">
        <path d="M12 2 L13 10 L21 11 L13 12 L12 20 L11 12 L3 11 L11 10 Z" fill="#fde047" opacity="0.8"/>
    </svg>`,

    // --- Functional UI Headers ---
    tree: `<svg viewBox="0 0 24 24" width="20" height="20">
        <rect x="10" y="14" width="4" height="6" fill="#78350f"/>
        <circle cx="12" cy="10" r="8" fill="#22c55e" stroke="#064e3b" stroke-width="1.5"/>
        <circle cx="10" cy="8" r="2" fill="#FFFFFF" opacity="0.4"/>
    </svg>`,
    brain: `<svg viewBox="0 0 24 24" width="20" height="20">
        <path d="M12 4 c -4 0 -7 3 -7 7 c 0 4 7 9 7 9 s 7 -5 7 -9 c 0 -4 -3 -7 -7 -7 Z" fill="#c084fc" stroke="#581c87" stroke-width="1.5"/>
        <path d="M12 6 v12 M8 10 h8" stroke="#581c87" stroke-width="1" opacity="0.3"/>
        <circle cx="10" cy="9" r="1" fill="#FFFFFF" opacity="0.6"/>
    </svg>`,
    backpack: `<svg viewBox="0 0 32 32" width="24" height="24">
        <rect x="6" y="10" width="20" height="18" rx="4" fill="#9d4517" stroke="#451a03" stroke-width="2"/>
        <path d="M6 14 q 10 -4 20 0 v 2 q -10 -4 -20 0 Z" fill="#b45309"/>
        <rect x="14" y="12" width="4" height="4" rx="1" fill="#facc15"/>
    </svg>`,
};

/** Helper to get SVG string */
export function getIcon(id) {
    if (PIXEL_ICONS[id]) return PIXEL_ICONS[id];
    
    // Fallback: Rich & Pop Style Question Mark
    return `<svg viewBox="0 0 24 24" width="28" height="28" style="vertical-align:middle;">
        <defs>
            <radialGradient id="fallbackGrad" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#fcd34d"/>
                <stop offset="100%" stop-color="#d97706"/>
            </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#fallbackGrad)" stroke="#78350f" stroke-width="1.5"/>
        <path d="M10 9 q 0 -3 2 -3 t 2 3 q 0 2 -2 4 v 1" fill="none" stroke="#78350f" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="12" cy="17" r="1.2" fill="#78350f"/>
        <ellipse cx="8" cy="7" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.3" transform="rotate(-30 8 7)"/>
    </svg>`;
}
