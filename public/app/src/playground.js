import { getMonsterSpec, MONSTERS } from './pixel-engine.js';
import { ITEMS, getBackgroundStyles } from './items.js';

class Playground {
    constructor(canvasId, overlayId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.overlay = document.getElementById(overlayId);
        this.characters = [];
        this.lastTime = 0;
        this.config = {
            background: 'default',
            themeObjects: [] // 固定配置用のキャッシュ
        };

        // Canvasサイズ調整 (Retina対応)
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.width = rect.width;
        this.height = rect.height;

        // 草エリアは下半分
        this.groundY = this.height * 0.35;

        this.startLoop();
    }

    setConfig(config) {
        const oldBg = this.config.background;
        this.config = { ...this.config, ...config };

        // 背景が変わったらテーマオブジェクトを再生成
        if (this.config.background !== oldBg) {
            this.generateThemeObjects();
        }
    }

    generateThemeObjects() {
        // オブジェクトベースの装飾は廃止
    }

    setCharacters(playerData, friends) {
        this.characters = [];
        this.addCharacter('player', playerData);
        if (friends) {
            friends.forEach((f, i) => {
                this.addCharacter(`friend-${i}`, f);
            });
        }
    }

    addCharacter(id, data) {
        // レアキャラ等の場合、data.nameは表示名（日本語）になっている可能性があるため、
        // data.idがあればそれを優先してSpec取得に使う
        const spec = getMonsterSpec(data.id || data.name, data.level, data.branch);
        // 草エリア内にランダム配置（SPRITE_SIZE分の余白確保）
        const margin = 40;
        const x = margin + Math.random() * (this.width - margin * 2);
        const y = this.groundY + 10 + Math.random() * (this.height - this.groundY - margin - 10);

        this.characters.push({
            id,
            data,
            spec,
            x,
            y,
            targetX: x,
            targetY: y,
            velX: 0,
            velY: 0,
            // ゆるふわパラメータ: さらに低速化
            floatPhase: Math.random() * Math.PI * 2,
            floatSpeed: 0.0005 + Math.random() * 0.0003,
            swayPhase: Math.random() * Math.PI * 2,
            swaySpeed: 0.0003 + Math.random() * 0.0002,
            state: 'idle',
            stateTimer: 2000 + Math.random() * 4000,
            dir: Math.random() > 0.5 ? 1 : -1,
            animFrame: Math.random() * 1000,
            bubbleEl: null,
        });
    }

    update(dt) {
        // dtが異常に大きい場合はキャップ（初回フレーム対策）
        if (dt > 200) dt = 16;

        this.characters.forEach(char => {
            char.stateTimer -= dt;
            char.animFrame += dt;

            // 状態切り替え
            if (char.stateTimer <= 0) {
                if (char.state === 'idle') {
                    char.state = 'walk';
                    char.stateTimer = 4000 + Math.random() * 6000;
                    const margin = 50;
                    char.targetX = margin + Math.random() * (this.width - margin * 2);
                    char.targetY = this.groundY + 10 + Math.random() * (this.height - this.groundY - margin - 10);
                } else {
                    char.state = 'idle';
                    char.stateTimer = 3000 + Math.random() * 5000;
                }
            }

            // 慣性つきの滑らかな移動
            if (char.state === 'walk') {
                const dx = char.targetX - char.x;
                const dy = char.targetY - char.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 5) {
                    char.state = 'idle';
                    char.stateTimer = 2000 + Math.random() * 4000;
                } else {
                    // 加速度ベースのゆるやかな移動
                    const accel = 0.0001 * dt;
                    const friction = 0.95;
                    char.velX = (char.velX + (dx / dist) * accel) * friction;
                    char.velY = (char.velY + (dy / dist) * accel) * friction;

                    char.x += char.velX * dt;
                    char.y += char.velY * dt;

                    // 向きの更新（閾値を大きくしてビクつき防止）
                    if (Math.abs(char.velX) > 0.02) {
                        char.dir = char.velX > 0 ? -1 : 1;
                    }
                }
            } else {
                // 停止時もなめらかに減速
                char.velX *= 0.9;
                char.velY *= 0.9;
                char.x += char.velX * dt;
                char.y += char.velY * dt;
            }
        });

        // Y座標ソート（奥→手前）
        this.characters.sort((a, b) => a.y - b.y);
    }

    draw() {
        // 背景テーマの取得
        const styles = getBackgroundStyles(this.config.background);

        // --- 背景描画 (空・遠景) ---
        this.drawThematicBackground(styles);

        // --- 地面描画 ---
        this.ctx.fillStyle = styles.groundColor;
        this.ctx.fillRect(0, this.groundY, this.width, this.height - this.groundY);
        this.drawThematicGround(styles);

        // 背景エフェクト (パーティクル等)
        const deco = styles.decorations;
        if (deco === 'stars') this.drawStars();
        if (deco === 'aurora') this.drawAurora();
        if (deco === 'fires') this.drawFire();
        if (deco === 'petals') this.drawPetals();
        if (deco === 'sweets') this.drawSweets();
        if (deco === 'bubbles') this.drawRipples();
        if (deco === 'glimmers') this.drawGlimmers();

        // 影（ゆらゆら連動）
        this.characters.forEach(char => {
            // 浮遊量から影の大きさを計算
            const floatY = Math.sin(char.animFrame * char.floatSpeed + char.floatPhase) * 3;
            const shadowScale = 1 - Math.abs(floatY) * 0.05;
            this.ctx.fillStyle = `rgba(0,0,0,${0.08 + shadowScale * 0.02})`;
            this.ctx.beginPath();
            this.ctx.ellipse(
                char.x + SPRITE_SIZE / 2,
                char.y + SPRITE_SIZE + 2,
                8 * shadowScale,
                2.5 * shadowScale,
                0, 0, Math.PI * 2
            );
            this.ctx.fill();
        });

        // 家具描画
        if (this.config.furniture) {
            this.config.furniture.forEach(f => {
                const item = ITEMS[f.id];
                if (item) {
                    this.ctx.save();
                    // 影の描画
                    this.ctx.shadowColor = 'rgba(0,0,0,0.2)';
                    this.ctx.shadowBlur = 4;
                    this.ctx.shadowOffsetY = 2;

                    // 縁取り
                    this.ctx.font = '28px serif';
                    this.ctx.textAlign = 'center';
                    this.ctx.strokeStyle = 'rgba(255,255,255,0.8)';
                    this.ctx.lineWidth = 3;
                    this.ctx.strokeText(item.icon, f.x, f.y);

                    // 本体
                    this.ctx.fillText(item.icon, f.x, f.y);
                    this.ctx.restore();
                }
            });
        }

        // キャラ描画
        this.characters.forEach(char => {
            // ゆるふわ浮遊（振幅を少し大きく、周期を長く）
            const floatY = Math.sin(char.animFrame * char.floatSpeed + char.floatPhase) * 6;
            // 左右の微揺れ
            const swayX = Math.sin(char.animFrame * char.swaySpeed + char.swayPhase) * 2;

            this.ctx.save();
            this.ctx.translate(char.x + swayX, char.y + floatY);

            // 金色オーラ演出 (寿プラン特典)
            // char.data がプレイヤーのグローバルデータへの参照か、その一部であることを期待
            // (ui.js で data.isSupporter = true になる)
            if (char.id === 'player' && window.todoMonsterData?.isSupporter) {
                this.drawGoldenAura(this.ctx, char.animFrame);
            }

            drawCharacterOnCtx(this.ctx, char.spec, char.data.level, char.animFrame, char.dir);
            this.ctx.restore();

            // 名前ラベル描画（キャラの下に小さく）
            this.ctx.save();
            this.ctx.font = '8px "M PLUS Rounded 1c", sans-serif';
            this.ctx.fillStyle = 'rgba(51, 65, 85, 0.7)';
            this.ctx.textAlign = 'center';
            const displayName = char.spec.displayName || char.spec.desc || '?';
            // 名前が長いときは5文字に切る（表示領域への配慮）
            const shortName = displayName.length > 5 ? displayName.slice(0, 4) + '…' : displayName;
            this.ctx.fillText(shortName, char.x + SPRITE_SIZE / 2, char.y + SPRITE_SIZE + 12);
            this.ctx.restore();

            // 吹き出し位置更新
            this.updateBubblePos(char, floatY);
        });
    }

    drawGoldenAura(ctx, animFrame) {
        ctx.save();
        const time = animFrame * 0.002;
        ctx.globalCompositeOperation = 'lighter';

        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2 + time;
            const dist = 12 + Math.sin(time * 2 + i) * 4;
            const x = Math.cos(angle) * dist + 8; // 8 = SPRITE_SIZE / 2
            const y = Math.sin(angle) * dist + 8;

            const size = 3 + Math.sin(time * 3 + i) * 2;
            const hue = 40 + Math.sin(time + i) * 10; // 黄金色 (40-50)
            ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${0.4 + Math.sin(time + i) * 0.3})`;

            // キラキラ（星型またはひし形）
            ctx.beginPath();
            ctx.moveTo(x, y - size);
            ctx.lineTo(x + size / 2, y);
            ctx.lineTo(x, y + size);
            ctx.lineTo(x - size / 2, y);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    }

    startLoop() {
        const loop = (time) => {
            const dt = time - this.lastTime;
            this.lastTime = time;

            this.update(dt || 16);
            this.draw();
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    // 吹き出し表示（発言者の名前付き）
    showBubble(speakerId, text, isPlayer) {
        let char = null;
        if (isPlayer) {
            char = this.characters.find(c => c.id === 'player');
        } else {
            char = this.characters.find(c => c.id.startsWith('friend'));
            if (!char && this.characters.length > 0) char = this.characters[0];
            if (!char) return;
        }
        if (!char) return;

        // 発言者名を取得
        const speakerName = (char.spec && char.spec.displayName) || char.data.name || '???';

        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = `<span class="bubble-name">${speakerName}</span>${text}`;
        this.overlay.appendChild(bubble);

        char.bubbleEl = bubble;

        requestAnimationFrame(() => bubble.classList.add('visible'));

        setTimeout(() => {
            bubble.classList.remove('visible');
            setTimeout(() => bubble.remove(), 300);
            char.bubbleEl = null;
        }, 4000);
    }

    updateBubblePos(char, floatY = 0) {
        if (char.bubbleEl) {
            char.bubbleEl.style.left = (char.x - 10) + 'px';
            char.bubbleEl.style.top = (char.y + floatY - 45) + 'px';
        }
    }

    drawStars() {
        for (let i = 0; i < 20; i++) {
            const x = (Math.sin(i * 123.45) * 0.5 + 0.5) * this.width;
            const y = (Math.cos(i * 678.90) * 0.5 + 0.5) * this.groundY;
            // 明滅（キラキラ）
            const opacity = 0.3 + Math.sin(this.lastTime * 0.002 + i) * 0.3;
            this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 1, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawNeon() {
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
            const y = this.groundY + i * 20;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
    }

    drawAurora() {
        const ctx = this.ctx;
        const time = this.lastTime * 0.001;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 0; i < 3; i++) {
            const h = 60 + i * 20;
            const y = 20 + i * 30;
            const grad = ctx.createLinearGradient(0, y, 0, y + h);
            const opacity = 0.2 + Math.sin(time + i) * 0.1;
            grad.addColorStop(0, 'transparent');
            grad.addColorStop(0.5, i === 0 ? `rgba(34, 211, 238, ${opacity})` : `rgba(74, 222, 128, ${opacity})`);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;

            ctx.beginPath();
            ctx.moveTo(0, y);
            for (let x = 0; x <= this.width; x += 20) {
                const off = Math.sin(x * 0.01 + time + i) * 20;
                ctx.lineTo(x, y + off);
            }
            ctx.lineTo(this.width, y + h);
            ctx.lineTo(0, y + h);
            ctx.fill();
        }
        ctx.restore();
    }

    drawFire() {
        for (let i = 0; i < 15; i++) {
            const x = (i * (this.width / 15)) + Math.sin(this.lastTime * 0.002 + i) * 10;
            const y = this.groundY + Math.cos(this.lastTime * 0.003 + i) * 5;
            const size = 10 + Math.sin(this.lastTime * 0.005 + i) * 5;
            this.ctx.fillStyle = `rgba(239, 68, 68, ${0.2 + Math.random() * 0.1})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawPetals() {
        this.ctx.fillStyle = 'rgba(251, 207, 232, 0.6)';
        for (let i = 0; i < 20; i++) {
            const x = (this.lastTime * 0.03 + i * 50) % this.width;
            const y = (Math.sin(this.lastTime * 0.001 + i) * 50) + (i * 20);
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate(this.lastTime * 0.002 + i);
            this.ctx.fillRect(-3, -1, 6, 2);
            this.ctx.restore();
        }
    }

    drawSweets() {
        const icons = ['🍭', '🍬', '🍩', '🍪'];
        this.ctx.font = '14px serif';
        for (let i = 0; i < 10; i++) {
            const x = (Math.sin(this.lastTime * 0.0007 + i) * 0.4 + 0.5) * this.width;
            const y = (Math.cos(this.lastTime * 0.0005 + i * 2) * 0.4 + 0.5) * this.groundY;
            this.ctx.globalAlpha = 0.3;
            this.ctx.fillText(icons[i % icons.length], x, y);
            this.ctx.globalAlpha = 1.0;
        }
    }

    drawRipples() {
        this.ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            const radius = (this.lastTime * 0.02 + i * 100) % 200;
            this.ctx.beginPath();
            this.ctx.ellipse(this.width / 2, this.groundY + 20, radius, radius * 0.3, 0, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }

    drawGlimmers() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        for (let i = 0; i < 15; i++) {
            const x = (Math.sin(i * 999) * 0.5 + 0.5) * this.width;
            const y = (Math.cos(i * 777) * 0.5 + 0.5) * this.height;
            const size = (Math.sin(this.lastTime * 0.005 + i) * 0.5 + 0.5) * 3;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y - size * 2);
            this.ctx.lineTo(x + size, y);
            this.ctx.lineTo(x, y + size * 2);
            this.ctx.lineTo(x - size, y);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }

    // --- 新しい景観描画メソッド ---

    drawThematicBackground(styles) {
        const bgId = this.config.background;
        const ctx = this.ctx;

        // 基本の空（グラデーション）
        const skyGrad = ctx.createLinearGradient(0, 0, 0, this.groundY);
        skyGrad.addColorStop(0, styles.backgroundColor);
        // 少し色を変化させて深みを出す
        skyGrad.addColorStop(1, this.adjustColor(styles.backgroundColor, -20));
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, this.width, this.height);

        // 各テーマ専用の遠景
        ctx.save();
        if (bgId === 'bg_space') {
            this.drawNebula();
        } else if (bgId === 'bg_cyber') {
            this.drawCityscape();
        } else if (bgId === 'bg_forest') {
            this.drawDistantTrees();
        } else if (bgId === 'bg_volcano') {
            this.drawVolcanoMountains();
        } else if (bgId === 'bg_desert') {
            this.drawDunes();
        } else if (bgId === 'bg_snow') {
            this.drawAurora();
            this.drawSnowMountains();
        } else if (bgId === 'bg_flower') {
            this.drawFieldOfFlowers();
        } else if (bgId === 'bg_default') {
            // いつもの広場：ふわふわ雲を追加
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            for (let i = 0; i < 3; i++) {
                const cx = (i * 200 + this.lastTime * 0.0005 * 40) % (this.width + 100) - 50;
                const cy = 40 + i * 20;
                this.drawCloud(cx, cy, 30);
            }
        } else if (bgId === 'bg_school') {
            this.drawCoastPath();
        } else if (bgId === 'bg_undersea') {
            this.drawToys();
        } else if (bgId === 'bg_zen') {
            this.drawCloudsKingdom();
        } else if (bgId === 'bg_crystal') {
            this.drawMagicKingdom();
        } else if (bgId === 'bg_washitsu') {
            this.drawBambooGrove();
        } else if (bgId === 'bg_cafe') {
            this.drawSecretRuins();
        } else if (bgId === 'bg_castle') {
            this.drawSkyGarden();
        } else if (bgId === 'bg_ice') {
            this.drawIceCrystals();
        }
        ctx.restore();
    }

    drawThematicIcons() {
        // 廃止
    }

    drawThematicObject(ctx, type, size, color, isStroke) {
        // 廃止
    }

    drawShapeStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        // 廃止
    }

    drawThematicGround(styles) {
        const bgId = this.config.background;
        const ctx = this.ctx;

        ctx.save();
        ctx.globalAlpha = 0.3;
        if (bgId === 'bg_cyber') {
            // グリッド
            ctx.strokeStyle = '#0ea5e9';
            for (let x = 0; x < this.width; x += 40) {
                ctx.beginPath(); ctx.moveTo(x, this.groundY); ctx.lineTo(x, this.height); ctx.stroke();
            }
            for (let y = this.groundY; y < this.height; y += 20) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(this.width, y); ctx.stroke();
            }
        } else if (bgId === 'bg_washitsu') {
            // 竹林の地面（少し深い緑）
            ctx.fillStyle = 'rgba(6, 78, 59, 0.1)';
            ctx.fillRect(0, this.groundY, this.width, this.height - this.groundY);
        } else if (bgId === 'bg_cafe' || bgId === 'bg_castle') {
            // テラス/石畳
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            for (let x = 0; x < this.width; x += 40) {
                for (let y = this.groundY; y < this.height; y += 20) {
                    ctx.strokeRect(x, y, 40, 20);
                }
            }
        } else if (bgId === 'bg_candy') {
            // ランダムな木目の節
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            for (let i = 0; i < 10; i++) {
                ctx.beginPath(); ctx.ellipse(Math.random() * this.width, this.groundY + Math.random() * 100, 10, 3, 0, 0, Math.PI * 2); ctx.fill();
            }
        } else if (bgId === 'bg_candy') {
            // チョコタイルの床
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            for (let x = 0; x < this.width; x += 40) {
                for (let y = this.groundY; y < this.height; y += 30) {
                    ctx.strokeRect(x, y, 40, 30);
                    // 小さなアラザン（飾り）
                    ctx.fillStyle = ['#fde047', '#f472b6', '#a5f3fc'][Math.floor(Math.random() * 3)];
                    if (Math.random() > 0.8) ctx.beginPath(); ctx.arc(x + 20, y + 15, 2, 0, Math.PI * 2); ctx.fill();
                }
            }
        }
        ctx.restore();
    }

    drawNebula() {
        const ctx = this.ctx;
        const time = this.lastTime * 0.0005;
        ctx.save();
        ctx.translate(this.width / 2, this.groundY / 2);
        ctx.rotate(time * 0.2); // ぐるぐる回る演出

        for (let i = 0; i < 4; i++) {
            const angle = i * Math.PI * 0.5 + time * 0.5;
            const dist = 50 + Math.sin(time + i) * 30;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;
            const radius = 80 + Math.sin(time * 0.8 + i) * 20;

            const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
            const color = i % 3 === 0 ? 'rgba(76, 29, 149, 0.2)' : (i % 3 === 1 ? 'rgba(236, 72, 153, 0.15)' : 'rgba(30, 58, 138, 0.2)');
            grad.addColorStop(0, color);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    drawCloudsKingdom() {
        const ctx = this.ctx;
        const time = this.lastTime * 0.0005;

        // 虹の描画
        this.drawRainbow();

        // 浮遊島
        ctx.fillStyle = '#f1f5f9';
        for (let i = 0; i < 4; i++) {
            const x = 50 + i * 140 + Math.sin(time * 0.6 + i) * 20;
            const y = 60 + Math.cos(time * 0.4 + i) * 30;
            ctx.beginPath();
            ctx.ellipse(x, y + 20, 50, 20, 0, 0, Math.PI * 2);
            ctx.fill();
            // 島の下側（少し暗く）
            ctx.fillStyle = '#e2e8f0';
            ctx.beginPath(); ctx.ellipse(x, y + 28, 40, 15, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#f1f5f9';
        }
        // もくもく雲（多層化してふわふわ感アップ）
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        for (let j = 0; j < 2; j++) {
            const speed = 0.0005 + j * 0.0002;
            const offset = j * 40;
            for (let i = 0; i < 8; i++) {
                const cx = (i * 120 + Math.sin(this.lastTime * speed + i) * 20) % (this.width + 100) - 50;
                const cy = this.groundY - 10 + offset + Math.sin(time + i) * 5;
                this.drawCloud(cx, cy, 40 + j * 10);
            }
        }
    }

    drawMagicKingdom() {
        const ctx = this.ctx;
        // 宙を舞う不思議な光の粒子とクリスタル
        const time = this.lastTime * 0.001;
        ctx.fillStyle = '#6366f1';
        for (let i = 0; i < 6; i++) {
            ctx.save();
            const bx = 40 + i * 100 + Math.sin(time + i) * 30;
            const by = 40 + Math.cos(time * 0.7 + i) * 20;
            ctx.translate(bx, by);
            ctx.rotate(time * 0.5 + i);

            // クリスタル的なひし形
            ctx.beginPath();
            ctx.moveTo(0, -15);
            ctx.lineTo(10, 0);
            ctx.lineTo(0, 15);
            ctx.lineTo(-10, 0);
            ctx.closePath();
            ctx.fill();

            // 輝き（パーティクル）
            const glowSize = 2 + Math.sin(time * 2 + i) * 1;
            ctx.fillStyle = 'rgba(165, 180, 252, 0.6)';
            ctx.beginPath();
            ctx.arc(15, -15, glowSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    drawCityscape() {
        const ctx = this.ctx;
        // 遠景の薄いビル（紫・ピンクを基調に）
        for (let i = 0; i < 15; i++) {
            const off = Math.sin(this.lastTime * 0.0003 + i) * 8;
            const w = 25;
            const h = 30 + (Math.sin(i * 3) * 0.5 + 0.5) * 40;
            const x = i * 35 + off;
            ctx.fillStyle = i % 2 === 0 ? '#4c1d95' : '#701a75'; // 紫と深いピンク
            ctx.fillRect(x, this.groundY - h, w, h);
        }
        // 光の流線 (Traffic) - ゆるふわな動き
        for (let i = 0; i < 3; i++) {
            const tx = (this.lastTime * 0.05 + i * 200) % (this.width + 100) - 50;
            const ty = 40 + i * 25;
            ctx.fillStyle = i % 2 === 0 ? 'rgba(244, 114, 182, 0.4)' : 'rgba(168, 85, 247, 0.4)';
            ctx.fillRect(tx, ty, 60, 1);
        }
        // 近景のビル
        for (let i = 0; i < 10; i++) {
            const w = 45;
            const h = 60 + (Math.cos(i) * 0.5 + 0.5) * 80;
            const x = i * 60;
            ctx.fillStyle = '#1e1b4b';
            ctx.fillRect(x, this.groundY - h, w, h);

            // 窓の明かり（ゆったり、ピンクや水色でPOPに）
            for (let wy = 15; wy < h - 15; wy += 15) {
                for (let wx = 10; wx < w - 10; wx += 15) {
                    const seed = i * 100 + wy + wx;
                    const opacity = 0.3 + Math.sin(this.lastTime * 0.001 + seed) * 0.5;
                    if (opacity > 0.4) {
                        ctx.fillStyle = seed % 3 === 0 ? `rgba(244, 114, 182, ${opacity})` : `rgba(168, 85, 247, ${opacity})`;
                        ctx.fillRect(x + wx, this.groundY - h + wy, 5, 5);
                    }
                }
            }
        }
    }

    drawDistantTrees() {
        const ctx = this.ctx;
        for (let i = 0; i < 25; i++) {
            const x = i * (this.width / 20);
            // ゆったり揺れる
            const sway = Math.sin(this.lastTime * 0.0008 + i) * 5;
            const h = 40 + (Math.cos(i) * 0.5 + 0.5) * 30;
            const grad = ctx.createLinearGradient(x, this.groundY - h, x, this.groundY);
            grad.addColorStop(0, '#065f46');
            grad.addColorStop(1, '#064e3b');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(x - 10 + sway, this.groundY);
            ctx.lineTo(x + 10 + sway, this.groundY - h);
            ctx.lineTo(x + 30 + sway, this.groundY);
            ctx.fill();
        }
    }

    drawVolcanoMountains() {
        const ctx = this.ctx;
        for (let i = 0; i < 6; i++) {
            const x = i * 90 - 20;
            const h = 60 + (Math.sin(i) * 0.5 + 0.5) * 40;
            ctx.fillStyle = '#450a0a';
            ctx.beginPath();
            ctx.moveTo(x, this.groundY);
            ctx.lineTo(x + 50, this.groundY - h);
            ctx.lineTo(x + 100, this.groundY);
            ctx.fill();
            // 火口の脈動
            const glow = 0.5 + Math.sin(this.lastTime * 0.002 + i) * 0.3;
            ctx.fillStyle = `rgba(239, 68, 68, ${glow})`;
            ctx.beginPath(); ctx.ellipse(x + 50, this.groundY - h, 15, 5, 0, 0, Math.PI * 2); ctx.fill();
        }
    }

    drawSnowMountains() {
        const ctx = this.ctx;
        for (let i = 0; i < 5; i++) {
            const sway = Math.sin(this.lastTime * 0.0003 + i) * 10;
            const x = i * 110 - 30 + sway;
            const h = 80 + (Math.sin(i * 2) * 0.5 + 0.5) * 40;
            ctx.fillStyle = '#cbd5e1';
            ctx.beginPath();
            ctx.moveTo(x, this.groundY);
            ctx.lineTo(x + 70, this.groundY - h);
            ctx.lineTo(x + 140, this.groundY);
            ctx.fill();
            // 雪のキャップ
            ctx.fillStyle = '#f8fafc';
            ctx.beginPath();
            ctx.moveTo(x + 45, this.groundY - h * 0.65);
            ctx.lineTo(x + 70, this.groundY - h);
            ctx.lineTo(x + 95, this.groundY - h * 0.65);
            ctx.closePath();
            ctx.fill();
        }
    }

    drawDunes() {
        const ctx = this.ctx;
        const time = this.lastTime * 0.001;

        // 輝く太陽
        ctx.save();
        const sunX = this.width - 80;
        const sunY = 60;
        const sunRadius = 30 + Math.sin(time) * 2;

        // 外光
        const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * 2);
        sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.4)');
        sunGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
        ctx.fillStyle = sunGrad;
        ctx.beginPath(); ctx.arc(sunX, sunY, sunRadius * 2, 0, Math.PI * 2); ctx.fill();

        // 本体
        ctx.fillStyle = '#fef08a';
        ctx.beginPath(); ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        // 砂丘
        ctx.fillStyle = '#fdba74';
        for (let i = 0; i < 4; i++) {
            const x = i * 150 - 50 + Math.sin(time * 0.2 + i) * 5;
            ctx.beginPath();
            ctx.moveTo(x, this.groundY);
            ctx.quadraticCurveTo(x + 75, this.groundY - 60, x + 200, this.groundY);
            ctx.fill();
        }
    }

    drawRollingHills(color) {
        const ctx = this.ctx;
        ctx.fillStyle = color;
        for (let i = 0; i < 5; i++) {
            const sway = Math.sin(this.lastTime * 0.0004 + i) * 15;
            const x = i * 120 - 40 + sway;
            ctx.beginPath();
            ctx.moveTo(x, this.groundY);
            ctx.bezierCurveTo(x + 40, this.groundY - 50, x + 80, this.groundY - 50, x + 120, this.groundY);
            ctx.fill();
        }
    }

    drawBambooGrove() {
        const ctx = this.ctx;
        const time = this.lastTime * 0.0006;
        ctx.fillStyle = '#064e3b';
        for (let i = 0; i < 12; i++) {
            const x = i * 60 + Math.sin(time + i) * 10;
            const h = 100 + (Math.cos(i) * 0.5 + 0.5) * 50;
            // 竹の幹
            ctx.fillRect(x, this.groundY - h, 6, h);
            // 節
            ctx.fillStyle = '#065f46';
            for (let by = 20; by < h; by += 25) {
                ctx.fillRect(x - 2, this.groundY - h + by, 10, 1);
            }
            ctx.fillStyle = '#064e3b';
        }
    }

    drawSkyGarden() {
        const ctx = this.ctx;
        const time = this.lastTime * 0.0005;
        // 遠景の白いアーチ
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 4;
        for (let i = 0; i < 3; i++) {
            const x = 100 + i * 200 + Math.sin(time + i) * 20;
            ctx.beginPath();
            ctx.arc(x, this.groundY, 60, Math.PI, Math.PI * 2);
            ctx.stroke();
        }
        // 噴水的な何か（ゆるふわパーティクル）
        ctx.fillStyle = 'rgba(186, 230, 253, 0.6)';
        for (let i = 0; i < 15; i++) {
            const x = this.width / 2 + Math.sin(time * 2 + i) * 20;
            const y = (this.groundY - 20) - ((time * 40 + i * 15) % 60);
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawCoastPath() {
        const ctx = this.ctx;
        const time = this.lastTime * 0.0004;
        // 海の波打ち（水平線の少し上）
        ctx.fillStyle = 'rgba(251, 146, 60, 0.2)'; // 夕日に染まる海面
        ctx.fillRect(0, this.groundY - 30, this.width, 30);

        for (let i = 0; i < 5; i++) {
            const y = this.groundY - 15 + Math.sin(time + i) * 10;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.ellipse(this.width / 2, y, this.width * 0.6, 5, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawSecretRuins() {
        const ctx = this.ctx;
        const time = this.lastTime * 0.0005;
        // 古びた石柱
        ctx.fillStyle = '#94a3b8';
        for (let i = 0; i < 4; i++) {
            const x = 80 + i * 160 + Math.sin(time + i) * 5;
            const w = 30;
            const h = 120 + Math.cos(i) * 30;
            ctx.fillRect(x, this.groundY - h, w, h);
            // 柱の模様（魔法の光）
            ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
            ctx.fillRect(x + 5, this.groundY - h + 20, w - 10, 2);
            ctx.fillRect(x + 5, this.groundY - h + 40, w - 10, 2);
            ctx.fillStyle = '#94a3b8';
        }
        // 漂う魔法の粒子
        for (let i = 0; i < 12; i++) {
            const px = (i * 70 + Math.sin(time * 0.8 + i) * 50) % this.width;
            const py = (i * 30 + Math.cos(time + i) * 20) % this.groundY;
            ctx.fillStyle = 'rgba(125, 211, 252, 0.5)';
            ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill();
        }
    }

    drawToys() {
        const ctx = this.ctx;
        const time = this.lastTime * 0.001;
        // 弾むボールや積み木
        const colors = ['#f472b6', '#60a5fa', '#34d399', '#fbbf24'];
        for (let i = 0; i < 8; i++) {
            const bx = (i * 100 + time * 20) % (this.width + 40) - 20;
            const by = this.groundY - 20 - Math.abs(Math.sin(time * 2 + i)) * 60;
            ctx.fillStyle = colors[i % colors.length];
            if (i % 2 === 0) {
                // ボール
                ctx.beginPath(); ctx.arc(bx, by, 15, 0, Math.PI * 2); ctx.fill();
            } else {
                // 積み木（四角）
                ctx.save();
                ctx.translate(bx, by);
                ctx.rotate(time + i);
                ctx.fillRect(-15, -15, 30, 30);
                ctx.restore();
            }
        }
    }


    drawRainbow() {
        const ctx = this.ctx;
        const centerX = this.width / 2;
        const centerY = this.groundY + 120;
        const radius = this.width * 0.7;
        // 色彩を少し濃く、鮮やかに調整
        const colors = [
            'rgba(255, 50, 50, 0.15)', 'rgba(255, 180, 50, 0.15)', 'rgba(255, 255, 50, 0.15)',
            'rgba(50, 255, 50, 0.15)', 'rgba(50, 100, 255, 0.15)', 'rgba(150, 50, 255, 0.15)', 'rgba(238, 130, 238, 0.15)'
        ];
        ctx.save();
        ctx.lineWidth = 14;
        for (let i = 0; i < colors.length; i++) {
            ctx.strokeStyle = colors[i];
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius + i * 14, Math.PI * 1.1, Math.PI * 1.9);
            ctx.stroke();
        }
        ctx.restore();
    }

    drawFieldOfFlowers() {
        const ctx = this.ctx;
        const time = this.lastTime * 0.0005;
        // 背景の丘
        this.drawRollingHills('#dcfce7');

        // 花の描画密度を向上させ、ランダムに配置
        const colors = ['#f472b6', '#fb7185', '#fbbf24', '#c084fc', '#60a5fa'];
        for (let i = 0; i < 70; i++) {
            // 擬似ランダムな配置（iをシードにした固定的なばらつき）
            const seedX = Math.abs(Math.sin(i * 123.456));
            const seedY = Math.abs(Math.cos(i * 654.321));

            const x = (seedX * this.width + Math.sin(time * 0.2 + i) * 10) % this.width;
            const y = this.groundY - 5 - seedY * 40;
            const size = 3 + Math.sin(time + i) * 1.5;

            ctx.fillStyle = colors[i % colors.length];
            // 花びら
            for (let j = 0; j < 4; j++) {
                const angle = (j * Math.PI) / 2 + time;
                ctx.beginPath();
                ctx.arc(x + Math.cos(angle) * size, y + Math.sin(angle) * size, size, 0, Math.PI * 2);
                ctx.fill();
            }
            // 中心
            ctx.fillStyle = '#fef08a';
            ctx.beginPath(); ctx.arc(x, y, size * 0.6, 0, Math.PI * 2); ctx.fill();
        }
    }

    drawAurora() {
        const ctx = this.ctx;
        const time = this.lastTime * 0.0004;
        // 美しく、なびくオーロラ
        const grads = [
            { c1: 'rgba(52, 211, 153, 0)', c2: 'rgba(52, 211, 153, 0.3)', c3: 'rgba(167, 139, 250, 0)' }, // Green to Purple
            { c1: 'rgba(34, 211, 238, 0)', c2: 'rgba(34, 211, 238, 0.2)', c3: 'rgba(52, 211, 153, 0)' }  // Cyan to Green
        ];

        for (let j = 0; j < grads.length; j++) {
            ctx.save();
            const g = grads[j];
            const xOffset = Math.sin(time * 0.5 + j) * 50;

            for (let i = 0; i < 3; i++) {
                const x = i * 200 - 100 + xOffset;
                const grad = ctx.createLinearGradient(x, 0, x + 300, 200);
                grad.addColorStop(0, g.c1);
                grad.addColorStop(0.5, g.c2);
                grad.addColorStop(1, g.c3);

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                // カーテンのようなゆらぎの曲線
                for (let step = 0; step <= 10; step++) {
                    const sx = x + step * 30 + Math.sin(time + step + j) * 20;
                    const sy = 40 + Math.cos(time * 0.8 + step) * 60;
                    ctx.lineTo(sx, sy);
                }
                ctx.lineTo(x + 300, 0);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        }
    }

    drawIceCrystals() {
        const ctx = this.ctx;
        const time = this.lastTime * 0.0006;
        // キラキラ輝く氷の結晶
        for (let i = 0; i < 10; i++) {
            ctx.save();
            const bx = (i * 80 + Math.sin(time + i) * 30) % (this.width + 40) - 20;
            const by = 40 + Math.cos(time * 0.7 + i) * 150 % (this.groundY - 20);
            ctx.translate(bx, by);
            ctx.rotate(time * 0.3 + i);

            // 六角形の結晶
            ctx.strokeStyle = 'rgba(186, 230, 253, 0.6)';
            ctx.lineWidth = 1.5;
            for (let j = 0; j < 6; j++) {
                ctx.rotate(Math.PI / 3);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, 20);
                // 小さな枝
                ctx.moveTo(0, 10);
                ctx.lineTo(5, 15);
                ctx.moveTo(0, 10);
                ctx.lineTo(-5, 15);
                ctx.stroke();
            }
            // 輝き（キラキラ）
            const glow = 2 + Math.sin(time * 3 + i) * 2;
            ctx.fillStyle = 'white';
            ctx.beginPath(); ctx.arc(0, 0, glow, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        }
    }

    adjustColor(hex, amount) {
        let usePound = false;
        if (hex[0] === "#") { hex = hex.slice(1); usePound = true; }
        const num = parseInt(hex, 16);
        let r = (num >> 16) + amount;
        if (r > 255) r = 255; else if (r < 0) r = 0;
        let b = ((num >> 8) & 0x00FF) + amount;
        if (b > 255) b = 255; else if (b < 0) b = 0;
        let g = (num & 0x0000FF) + amount;
        if (g > 255) g = 255; else if (g < 0) g = 0;
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
    }

    startAutoChatLoop(callback) {
        const scheduleNext = () => {
            // 20秒〜40秒のランダム間隔（会話セット間は最低10秒以上あくように）
            const delay = 20000 + Math.random() * 20000;
            setTimeout(() => {
                // タブがアクティブな時だけ会話
                if (document.visibilityState === 'visible') {
                    callback();
                }
                scheduleNext();
            }, delay);
        };
        scheduleNext();
    }

    drawCloud(x, y, size) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.arc(x + size * 0.6, y - size * 0.2, size * 0.8, 0, Math.PI * 2);
        ctx.arc(x + size * 1.2, y, size * 0.7, 0, Math.PI * 2);
        ctx.fill();
    }

    drawWaterSunrays() {
        const ctx = this.ctx;
        const time = this.lastTime * 0.0005;
        for (let i = 0; i < 5; i++) {
            ctx.save();
            const x = i * 120 + Math.sin(time + i) * 30;
            const grad = ctx.createLinearGradient(x, 0, x + 40, 0);
            grad.addColorStop(0, 'rgba(255,255,255,0)');
            grad.addColorStop(0.5, 'rgba(255,255,255,0.15)');
            grad.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = grad;
            ctx.translate(x, 0);
            ctx.rotate(0.1 + Math.sin(time * 0.8 + i) * 0.05);
            ctx.fillRect(0, 0, 50, this.height);
            ctx.restore();
        }
    }
}

// MONSTERSデータから直接描画するヘルパー（drawMonster不使用）

const SPRITE_PX = 2;  // 1ドットあたりの描画サイズ(論理px)
const GRID = 16;
const SPRITE_SIZE = GRID * SPRITE_PX; // 32px

function drawCharacterOnCtx(targetCtx, spec, level, time, dir) {
    const monster = MONSTERS.find(m => m.id === spec.name) || MONSTERS[0];
    const { data, palette } = monster;

    targetCtx.save();

    if (dir === -1) {
        // 水平反転
        targetCtx.scale(-1, 1);
        targetCtx.translate(-SPRITE_SIZE, 0);
    }

    for (let r = 0; r < GRID; r++) {
        for (let c = 0; c < GRID; c++) {
            const val = data[r]?.[c];
            if (!val) continue;
            targetCtx.fillStyle = palette[val] || '#000';
            targetCtx.fillRect(c * SPRITE_PX, r * SPRITE_PX, SPRITE_PX, SPRITE_PX);
        }
    }

    targetCtx.restore();
}

export const playground = new Playground('playground-canvas', 'chat-overlay');
