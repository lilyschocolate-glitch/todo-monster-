import { MONSTERS } from './pixel-engine.js';

/**
 * ギャラリー描画ロジック
 */
const renderGallery = () => {
    const galleryEl = document.getElementById('gallery');
    if (!galleryEl) return;

    MONSTERS.forEach(monster => {
        const itemEl = document.createElement('div');
        itemEl.className = 'gallery-item';

        // キャンバス生成
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        canvas.className = 'monster-canvas';
        const ctx = canvas.getContext('2d');

        // ドット絵描画
        if (monster.data) {
            monster.data.forEach((row, r) => {
                row.forEach((cell, c) => {
                    if (cell !== 0) {
                        ctx.fillStyle = monster.palette[cell] || '#000';
                        ctx.fillRect(c, r, 1, 1);
                    }
                });
            });
        }

        // 情報要素
        const infoEl = document.createElement('div');
        infoEl.innerHTML = `
            <div class="monster-name">${monster.name}</div>
            <div class="monster-level">Lv.${monster.level} <span class="monster-type">${monster.type}</span></div>
        `;

        itemEl.appendChild(canvas);
        itemEl.appendChild(infoEl);
        galleryEl.appendChild(itemEl);
    });
};

document.addEventListener('DOMContentLoaded', renderGallery);
