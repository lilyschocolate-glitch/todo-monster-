import { MONSTERS } from './pixel-engine-static.js';

/**
 * ギャラリー描画ロジック
 */
const renderGallery = (monsters) => {
    const galleryEl = document.getElementById('gallery');
    if (!galleryEl) return;

    galleryEl.innerHTML = '';

    if (monsters.length === 0) {
        galleryEl.innerHTML = '<div class="empty-state">モンスターが見つかりませんでした</div>';
        return;
    }

    monsters.forEach(monster => {
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
            <div class="monster-meta">
                <span class="monster-level">Lv.${monster.level}</span>
                <span class="monster-type-badge">${monster.type}</span>
            </div>
        `;

        itemEl.appendChild(canvas);
        itemEl.appendChild(infoEl);
        galleryEl.appendChild(itemEl);
    });
};

/**
 * フィルターと検索の初期化
 */
const initControls = () => {
    const searchInput = document.getElementById('monster-search');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentFilters = {
        keyword: '',
        level: 'all',
        type: 'all'
    };

    const applyFilters = () => {
        const filtered = MONSTERS.filter(m => {
            const matchKeyword = m.name.toLowerCase().includes(currentFilters.keyword.toLowerCase());
            const matchLevel = currentFilters.level === 'all' || m.level.toString() === currentFilters.level;
            const matchType = currentFilters.type === 'all' || m.type === currentFilters.type;
            return matchKeyword && matchLevel && matchType;
        });
        renderGallery(filtered);
    };

    // 検索入力
    searchInput?.addEventListener('input', (e) => {
        currentFilters.keyword = e.target.value;
        applyFilters();
    });

    // フィルターボタン
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.filter;
            const value = btn.dataset.value;

            // 同じグループのボタンの active クラスをリセット
            document.querySelectorAll(`.filter-btn[data-filter="${type}"]`).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFilters[type] = value;
            applyFilters();
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    renderGallery(MONSTERS);
    initControls();
});
