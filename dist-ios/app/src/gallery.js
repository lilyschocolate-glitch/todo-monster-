import { getMonsterSpec, generateMonsterSVG } from './monster-svg.js';

/**
 * ギャラリー描画ロジック (Rich & Pop ベクター版)
 */
const renderGallery = () => {
    const galleryEl = document.getElementById('gallery');
    if (!galleryEl) return;

    // 仮の図鑑データ（実際はストレージから取得するが、ここでは全種表示のデモ用）
    // 本来はMONSTERSの代わりに、主要な分岐をいくつか生成して表示する
    const demoMonsters = [
        { name: 'あいうえお', level: 1 },
        { name: 'かきくけこ', level: 2 },
        { name: 'さしすせそ', level: 3, branch: 'physical' },
        { name: 'たちつてと', level: 4, branch: 'creative' },
        { name: 'なにぬねの', level: 5, branch: 'intellectual' },
        { name: 'partner_aibou', level: 3 }
    ];

    demoMonsters.forEach(m => {
        const itemEl = document.createElement('div');
        itemEl.className = 'gallery-item';

        const spec = getMonsterSpec(m.name, m.level, m.branch);
        const svgStr = generateMonsterSVG(spec, 80);

        const imgContainer = document.createElement('div');
        imgContainer.className = 'monster-svg-container';
        imgContainer.innerHTML = svgStr;

        // 情報要素
        const infoEl = document.createElement('div');
        infoEl.innerHTML = `
            <div class="monster-name">${spec.displayName}</div>
            <div class="monster-level">Lv.${spec.level} <span class="monster-type">${spec.desc}</span></div>
        `;

        itemEl.appendChild(imgContainer);
        itemEl.appendChild(infoEl);
        galleryEl.appendChild(itemEl);
    });
};

document.addEventListener('DOMContentLoaded', renderGallery);
