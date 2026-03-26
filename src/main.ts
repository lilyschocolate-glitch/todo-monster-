import './style.css'
import { MONSTERS } from './monster-data'
import { renderMonster } from './renderer'

// --- Hero Monster ---
const heroMonsterEl = document.getElementById('hero-monster');
if (heroMonsterEl) {
    const heroMonster = MONSTERS.find(m => m.id === 'kid_brave') || MONSTERS[0];
    heroMonsterEl.innerHTML = renderMonster(heroMonster, 400);
}

const typeLabels: Record<string, string> = {
    physical: 'つよさ',
    intellectual: 'かしこさ',
    social: 'やさしさ',
    special: 'とくべつ',
    normal: 'ふつう',
    chaotic: 'いたずら'
};

// --- Monster Gallery ---
const monsterListEl = document.getElementById('monster-list');
if (monsterListEl) {
    MONSTERS.forEach(monster => {
        const card = document.createElement('div');
        card.className = 'monster-card';
        card.innerHTML = `
            ${renderMonster(monster, 128)}
            <h3>${monster.name}</h3>
            <span class="type">${typeLabels[monster.type] || monster.type}</span>
        `;
        monsterListEl.appendChild(card);
    });

    // Add "And More" card
    const andMore = document.createElement('div');
    andMore.className = 'monster-card and-more';
    andMore.innerHTML = `
        <div class="and-more-text">and<br>more...</div>
    `;
    monsterListEl.appendChild(andMore);
}

// --- Chat Demo ---
const demoCharEl = document.getElementById('demo-character');
const chatTextEl = document.getElementById('chat-text');

if (demoCharEl && chatTextEl) {
    const heroMonster = MONSTERS.find(m => m.id === 'kid_brave') || MONSTERS[0];
    demoCharEl.innerHTML = renderMonster(heroMonster, 100);
    
    // 一行に収まる短めのセリフ
    const lines = [
        "おはよ。今日もいい天気だね",
        "今日は世界が鮮やかだね",
        "キミの笑顔、いい感じ！",
        "伝説素材、見つけたよ！",
        "今日もお疲れ様！また明日ね",
        "ぼくの似顔絵、描いてみて",
        "一緒に歌おう！ららら〜♪",
        "キミが笑うと、ぼくも嬉しい"
    ];
    
    let index = 0;
    setInterval(() => {
        index = (index + 1) % lines.length;
        chatTextEl.style.opacity = '0';
        setTimeout(() => {
            chatTextEl.textContent = lines[index];
            chatTextEl.style.opacity = '1';
        }, 300);
    }, 4000);
}

// --- Evolution Demo ---
const demoStageEl = document.getElementById('demo-stage');
const evolveBtn = document.getElementById('evolve-btn') as HTMLButtonElement;
const resetBtn = document.getElementById('reset-demo-btn');
const monsterNameEl = document.getElementById('demo-monster-name');
const monsterDescEl = document.getElementById('demo-monster-desc');
const lvlEl = document.getElementById('demo-lvl');
const pathBtns = document.querySelectorAll('.path-btn');
const evoEffectEl = document.getElementById('evo-effect');

import { EVOLUTION_PATHS } from './monster-data'

let currentPath = 'physical';
let currentStep = 0;

function updateDemo() {
    const path = (EVOLUTION_PATHS as any)[currentPath];
    const monsterId = path[currentStep];
    const monster = MONSTERS.find(m => m.id === monsterId);
    
    if (monster && demoStageEl && monsterNameEl && monsterDescEl && lvlEl) {
        demoStageEl.innerHTML = renderMonster(monster, 320);
        monsterNameEl.textContent = monster.name;
        monsterDescEl.textContent = monster.desc;
        lvlEl.textContent = monster.level.toString();
        
        if (currentStep >= path.length - 1) {
            evolveBtn.disabled = true;
            evolveBtn.textContent = '体験はここまで';
        } else {
            evolveBtn.disabled = false;
            evolveBtn.textContent = 'タスクを完了して進化！';
        }
    }
}

pathBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        pathBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPath = (btn as HTMLElement).dataset.path || 'physical';
        currentStep = 0;
        updateDemo();
    });
});

evolveBtn?.addEventListener('click', () => {
    const path = (EVOLUTION_PATHS as any)[currentPath];
    if (currentStep < path.length - 1) {
        // Evolution effect
        if (evoEffectEl) {
            evoEffectEl.classList.add('active');
            setTimeout(() => {
                currentStep++;
                updateDemo();
                setTimeout(() => {
                    evoEffectEl.classList.remove('active');
                }, 100);
            }, 500);
        } else {
            currentStep++;
            updateDemo();
        }
    }
});

resetBtn?.addEventListener('click', () => {
    currentStep = 0;
    updateDemo();
});

// Initial load
updateDemo();

// --- Fade-in for gallery cards ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.monster-card, .feature-item-alt').forEach(el => {
    (el as HTMLElement).style.opacity = '0';
    (el as HTMLElement).style.transform = 'translateY(30px)';
    (el as HTMLElement).style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});
