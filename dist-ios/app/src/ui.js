/**
 * UI描画とイベントハンドリング
 */

import { loadData, saveData, graduateCharacter } from './store.js';
import { createTodo, categoryEmoji, categoryLabel } from './todo.js';
import { addExp, getStageName, getExpProgress, getExpToNext, getBranchDescription, EXP_PER_TASK } from './character.js';
import { applyTaskToPersonality, getDominantTrait, getPersonalitySummary, getPersonalityTotal } from './personality.js';
import { generateChat, buildPersonalitySummary, getRandomGuideMessage } from './chat.js';
import { playComplete, playLevelUp, playPop, toggleMute, getMuted, setMuted } from './sounds.js';
import { getTodayStr, getYesterdayStr, getTomorrowStr, dateLabel, processDailyReset } from './daily-reset.js';
import { playground } from './playground.js';
import { ITEMS, getBackgroundStyles } from './items.js';
import { PIXEL_ICONS, getIcon } from './icons.js';
import { MONSTERS, getMonsterSpec, drawMonster, drawNpcMonster, drawEvolutionEffect, generateMonsterSVG } from './monster-svg.js';

let data = null;
let chatExpanded = false;
let currentDateFilter = 'today';
let animFrame = 0;
let animRAF = null;
let isChatting = false; // 会話中フラグ

const CHAT_PREVIEW_COUNT = 6;
const CHAT_EXPANDED_COUNT = 30;

/** メインの初期化 */
export function initUI() {
    console.log("Todo Monster UI v18.0 (Production Mode) initialized");
    data = loadData();
    window.todoMonsterData = data; // 追加
    data = processDailyReset(data);
    saveData(data);

    const savedMute = localStorage.getItem('todo-monster-muted');
    if (savedMute === 'true') setMuted(true);

    setupEventListeners();
    updateApiStatus();
    renderTodoList();
    renderFriendList();
    renderStatus();
    checkPaymentSuccess();
    renderPersonality();

    // アニメーション開始
    startAnimation();
    updateMuteButton();

    // 箱庭初期化
    // 殿堂入りキャラとアンロック済みレアキャラもはこにわに登場！
    const allBoxMembers = [...data.friends, ...data.hallOfFame, ...(data.unlockedRareMonsters || [])];
    playground.setCharacters(data.character, allBoxMembers);
    playground.setConfig(data.customization);

    // タイトルロゴのモンスター描画などは startAnimation() 内のループで制御

    // 初回起動時: 名前が未設定または空ならモーダル表示（少し遅らせて確実に）
    if (!data.ownerName || data.ownerName.trim() === '') {
        setTimeout(() => openModal('name-modal'), 1000);
    }

    // 自動会話ループ開始 (main.js呼出は削除済)
    playground.startAutoChatLoop(handleAutoChat);

    // 決済完了のチェック
    // // checkPaymentStatus();
}

window.closeAllModals = closeAllModals;
window.handlePurchase = handlePurchase;
window.openModal = openModal;

/** 決済完了をURLパラメータからチェック */
function checkPaymentStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const plan = urlParams.get('plan');

    if (status === 'success' && plan) {
        // 既に反映済みかチェック（リロード対策）
        const lastProcessedPlan = sessionStorage.getItem('last_processed_plan');
        const lastProcessedTime = sessionStorage.getItem('last_processed_time');

        // 5秒以内の同じプランの処理はスキップ（簡易的な二重処理防止）
        if (lastProcessedPlan === plan && (Date.now() - parseInt(lastProcessedTime)) < 5000) {
            return;
        }

        // アイテム付与実行
        completePurchaseSimulation(plan);

        // 処理済みとして記録
        sessionStorage.setItem('last_processed_plan', plan);
        sessionStorage.setItem('last_processed_time', Date.now().toString());

        // URLをきれいに掃除（パラメータを消す）
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }
}

async function handleAutoChat() {
    // ページが見えていない時や既に会話中の時は何もしない
    if (document.hidden || isChatting) return;

    // 名前未設定時は会話しない
    if (!data.ownerName || data.ownerName.trim() === '') return;

    isChatting = true;

    // どのキャラが喋るか抽選（友達リスト + 自分 + 箱庭のレアキャラ（あいぼう含む））
    const candidates = [...data.friends, data.character, ...(data.unlockedRareMonsters || [])];
    // あいぼうがいるか確認
    const aibou = candidates.find(c => c.id === 'partner_aibou');

    // 30%の確率であいぼうがガイド発言（あいぼうがいる場合のみ）
    console.log('AutoChat Candidates:', candidates.map(c => c.name || c.id));
    if (aibou && Math.random() < 0.3) {
        console.log('Aibou Guide Triggered (Auto)');
        const guideMsg = getRandomGuideMessage();

        // 1. プレイヤー（自分）がフリを入れる
        const player = data.character;
        const questions = ['この世界どうなってるんだろう？', 'これ、どうやるの？', '何かいいことない？', '秘密おしえて！'];
        const question = questions[Math.floor(Math.random() * questions.length)];

        playground.showBubble(player, question, true);

        // ログ保存 (自分)
        data.chatLog.push({ speaker: 'player', message: question, timestamp: Date.now() });

        setTimeout(() => {
            // 2. あいぼうが答える
            playground.showBubble(aibou, guideMsg, false);

            // ログ保存 (あいぼう)
            data.chatLog.push({
                speaker: 'partner_aibou',
                message: guideMsg,
                speakerName: 'あいぼう',
                timestamp: Date.now()
            });
            if (data.chatLog.length > 60) data.chatLog = data.chatLog.slice(-60);
            saveData(data);

            // 終了処理
            setTimeout(() => { isChatting = false; }, 4000);
        }, 2000); // 2秒後に回答

        return;
    }

    try {
        // 通常のAI会話 (2人選出)
        if (candidates.length < 1) {
            isChatting = false;
            return;
        }

        const result = await generateChat(data.apiKey, data.character, data.personality, [], data.friends);
        if (result.messages && result.messages.length > 0) {
            // 1つ目の発言
            const m = result.messages[0];
            const isPlayer = m.speaker === 'player';
            playground.showBubble(m.speaker, m.text, isPlayer);

            // 2つ目があれば少し遅れて表示（会話成立）
            if (result.messages.length > 1) {
                setTimeout(() => {
                    const m2 = result.messages[1];
                    const isPlayer2 = m2.speaker === 'player';
                    playground.showBubble(m2.speaker, m2.text, isPlayer2);

                    // 2つ目の表示が終わったとみなす時間(例えば4秒後)にフラグ解除
                    setTimeout(() => { isChatting = false; }, 4000);
                }, 2000);
            } else {
                // 1つのみの場合
                setTimeout(() => { isChatting = false; }, 4000);
            }
        } else {
            isChatting = false;
        }
    } catch (e) {
        console.error('Auto chat error:', e);
        isChatting = false;
    }
}

// --- Canvas アニメーションループ ---

function startAnimation() {
    const charCanvas = document.getElementById('char-canvas');
    const npcCanvas = document.getElementById('npc-canvas');

    function tick() {
        if (!data || !data.character) return; // データ未ロード時はスキップ
        animFrame++;

        const charCtx = charCanvas?.getContext('2d');
        if (charCtx) {
            const spec = getMonsterSpec(data.character.name, data.character.level, data.character.branch);
            drawMonster(charCtx, spec, animFrame);
        }

        const npcCtx = npcCanvas?.getContext('2d');
        if (npcCtx) {
            if (data.friends && data.friends.length > 0) {
                const f = data.friends[0];
                const fSpec = getMonsterSpec(f.name, f.level || 2, f.branch || null);
                drawMonster(npcCtx, fSpec, animFrame);
            } else {
                drawNpcMonster(npcCtx, animFrame);
            }
        }

        // タイトルロゴのモンスター描画
        const leftCanvas = document.getElementById('title-monster-left');
        const rightCanvas = document.getElementById('title-monster-right');
        if (leftCanvas && rightCanvas) {
            drawMonster(leftCanvas.getContext('2d'), { name: 'kid_kind' }, animFrame);
            drawMonster(rightCanvas.getContext('2d'), { name: 'kid_active' }, animFrame);
        }

        animRAF = requestAnimationFrame(tick);
    }

    // 初期化直後に一回実行、以降はRAF
    tick();
}

// --- シェア機能 ---

async function openShareModal() {
    // 1. 画像生成
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 315;
    const ctx = canvas.getContext('2d');

    // 背景
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(0, 0, 600, 315);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(20, 20, 560, 275);

    // キャラクター描画 (ベクター描画)
    const spec = getMonsterSpec(data.character.name, data.character.level, data.character.branch);
    const svgStr = generateMonsterSVG(spec, 200);
    const img = new Image();
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    await new Promise(resolve => {
        img.onload = () => {
            ctx.drawImage(img, 50, 50);
            URL.revokeObjectURL(url);
            resolve();
        };
        img.src = url;
    });

    // テキスト描画
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('やることモンスター', 240, 60);
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(`${spec.displayName || spec.name}`, 240, 110);
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#4b5563';
    ctx.fillText(`Lv.${data.character.level} ${getStageName(data.character)}`, 240, 150);
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(`Owner: ${data.ownerName || '名無し'}`, 240, 190);
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText('やってみたいことを育てよう 🐣', 240, 260);

    const dataUrl = canvas.toDataURL('image/png');
    document.getElementById('share-image-preview').src = dataUrl;

    // 画像コピーボタンの設定
    document.getElementById('copy-share-img-btn').onclick = async () => {
        try {
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            const item = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([item]);
            alert('画像をコピーしました！Xに直接貼り付け(Ctrl+V)できます');
        } catch (err) {
            console.error(err);
            alert('右クリックで保存してください');
        }
    };

    // 2. テキスト生成 (短縮コード)
    const code = generateShortCode();
    const gameLink = 'https://github.com/StartYourTodoMonster'; // TODO: 本番URL

    const text = `私のモンスター「${spec.displayName}」(Lv.${data.character.level})！\n一緒にタスクをこなして育てよう！\n${gameLink}\n\nマイコード（ともだち追加コード）:\n${code}\n\n#やることモンスター #TodoMonster`;
    const textArea = document.getElementById('share-text-input');
    textArea.value = text;

    // 3. Twitterリンク (マイコードを含める)
    const tweetText = `私のモンスター「${spec.displayName}」(Lv.${data.character.level})！\n一緒にタスクをこなして育てよう！\n${gameLink}\n\nマイコード（ともだち追加コード）:\n${code}\n\n#やることモンスター #TodoMonster`;
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    document.getElementById('share-twitter-link').href = intentUrl;

    document.getElementById('copy-share-text-btn').onclick = () => {
        navigator.clipboard.writeText(textArea.value).then(() => alert('コピーしました！Xに貼り付けてね'));
    };

    openModal('share-modal');
}

// --- バックパック & アイテム機能 ---

function openBackpackModal() {
    renderItemGrid('material');
    openModal('backpack-modal');
}

function renderItemGrid(type) {
    const grid = document.getElementById('item-grid');
    const clearBtn = document.getElementById('clear-furniture-btn');
    grid.innerHTML = '';

    // 家具タブのときは「片付ける」ボタンを表示
    if (clearBtn) {
        clearBtn.style.display = type === 'furniture' ? 'block' : 'none';
        clearBtn.onclick = () => {
            if (confirm('はこにわの家具をすべて片付けますか？')) {
                data.customization.furniture = [];
                playground.setConfig(data.customization);
                saveData(data);
                renderItemGrid(type);
            }
        };
    }

    // アイテムリスト取得。背景の場合はデフォルトも含める
    let items = Object.values(ITEMS).filter(item => item.type === type);

    // 背景リセット用: bg_defaultを常に持っていることにする（あるいは初期配布アイテムとする）
    if (type === 'background') {
        const defaultBg = ITEMS['bg_default'];
        if (defaultBg && !items.find(i => i.id === 'bg_default')) {
            items.unshift(defaultBg);
        }
        // 背景は1つあれば無限に使える仕様（あるいは所持チェック）
        // ユーザーが「戻したい」と言っているので、bg_defaultは常に1つ以上ある状態にする
        if ((data.items['bg_default'] || 0) === 0) data.items['bg_default'] = 1;
    }

    if (items.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 20px; color:#94a3b8;">アイテムがありません</div>';
        return;
    }

    items.forEach(item => {
        const ownedCount = data.items[item.id] || 0;
        // 家具の場合は配置済み数もカウント
        let placedCount = 0;
        if (type === 'furniture') {
            placedCount = data.customization.furniture.filter(f => f.id === item.id).length;
        }

        const cell = document.createElement('div');
        cell.className = 'item-cell';
        if (type === 'background' && data.customization.background === item.id) {
            cell.classList.add('active');
        }
        if (ownedCount === 0 && item.id !== 'bg_default') {
            cell.classList.add('locked');
        }

        const displayCount = type === 'furniture' ? `${placedCount}/${ownedCount}` : ownedCount;

        cell.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <div class="item-name">${item.name}</div>
            <div class="item-count">${displayCount}</div>
        `;

        cell.title = `${item.name}: ${item.desc}`;

        cell.onclick = () => {
            if (type === 'background' && ownedCount > 0) {
                data.customization.background = item.id;
                playground.setConfig(data.customization);
                saveData(data);
                renderItemGrid(type);
                alert(`はこにわを${item.name}に着せ替えました！`);
            } else if (type === 'furniture') {
                if (placedCount < ownedCount) {
                    const newFurniture = {
                        id: item.id,
                        x: 50 + Math.random() * (playground.width - 100),
                        y: playground.groundY + Math.random() * (playground.height - playground.groundY - 30)
                    };
                    data.customization.furniture.push(newFurniture);
                    playground.setConfig(data.customization);
                    saveData(data);
                    renderItemGrid(type);
                    alert(`${item.name}をはこにわに置きました！ (${placedCount + 1}/${ownedCount})`);
                } else if (ownedCount === 0) {
                    alert('まだ持っていないよ。ショップでGETしよう！');
                } else {
                    alert('持っている分はすべて置きました！もっと置くには個数が必要です。');
                }
            } else if (type === 'material' && ownedCount > 0) {
                const evolMap = {
                    moon_stone: 'spec_moon_beast',
                    sun_stone: 'spec_sun_god',
                    thunder_gem: 'spec_thunder_lord',
                    glacial_ice: 'spec_ice_dragon',
                    eternal_flame: 'spec_phoenix',
                    holy_grail: 'spec_holy_knight',
                    void_stone: 'spec_void_reaper',
                    nature_seed: 'spec_nature_avatar',
                    gear_of_destiny: 'spec_clockwork_god',
                    rainbow_drop: 'spec_galaxy_spirit',
                    demon_wing: 'spec_demon_king',
                    stardust_powder: 'spec_stardust_valkyrie',
                    ancient_scroll: 'spec_ancient_sage',
                    dragon_scale: 'spec_dragon_emperor'
                };
                if (evolMap[item.id]) {
                    if (confirm(`${item.name}を使用して、現在の姿を伝説へと昇華させますか？`)) {
                        useMaterialForEvolution(item.id, evolMap[item.id]);
                        closeAllModals();
                    }
                } else {
                    alert(`${item.name}はまだ使い道がありません。図鑑のコンプリートに役立つかも？`);
                }
            } else if (ownedCount === 0) {
                alert('まだ持っていないよ。ショップでGETしよう！');
            }
        };

        grid.appendChild(cell);
    });
}


function giveReward(isVip = false) {
    // カテゴリ別の抽選 (家具:60%, 背景:30%, 素材:10%)
    const rand = Math.random();
    let type = 'furniture';
    if (rand < 0.3) type = 'material';
    else if (rand < 0.6) type = 'background';

    const itemsOfCategory = Object.values(ITEMS).filter(i => i.type === type);
    const reward = itemsOfCategory[Math.floor(Math.random() * itemsOfCategory.length)];

    data.items[reward.id] = (data.items[reward.id] || 0) + 1;
    saveData(data);

    const typeLabels = { material: '🧪伝説素材', background: '🖼️背景', furniture: '🪑家具' };
    const msg = isVip ? `👑 VIP特典！進化おめでとう！「${reward.name}」(${typeLabels[type]})を手に入れたよ！` : `おめでとう！報酬として「${reward.name}」(${typeLabels[type]})を手に入れたよ！ 🎁`;
    alert(msg);
    renderItemGrid(document.querySelector('.item-tab.active')?.dataset.type || 'material');
}

/** 購入処理（シミュレーション） */
// --- Stripe Payment Links 設定 (ユーザー様で書き換えてください) ---
const STRIPE_URLS = {
    starter: 'https://buy.stripe.com/14A3cxakd4lW0Xhfrt77O01',
    standard: 'https://buy.stripe.com/6oU5kFboh3hScFZcfh77O02',
    premium: 'https://buy.stripe.com/eVqdRb4ZTdWwfSbcfh77O03',
    special: 'https://buy.stripe.com/7sY3cx2RLg4E6hB6UX77O04'
};
/** 購入処理 */
async function handlePurchase(planId) {
    if (confirm('購入ページ（Stripe）へ移動しますか？')) {
        // Stripe URLへリダイレクト
        const url = STRIPE_URLS[planId];
        if (url && (url.startsWith('https://buy.stripe.com') || url.startsWith('https://test.buy.stripe.com'))) {
            window.location.href = url;
        } else {
            // テストURLまたは未設定の場合はシミュレーション（開発用）
            completePurchaseSimulation(planId);
        }
    }
}

function completePurchaseSimulation(planId) {
    if (planId === 'special') {
        // 全アイテム解放
        Object.keys(ITEMS).forEach(id => {
            if (!data.items[id]) data.items[id] = 1;
        });
        data.isSupporter = true;
        // SpecialプランにはVIP特典を含まない設定に変更
        showSecretLog();
        alert('全力応援パックを購入しました！全アイテムを解放しました。図鑑コンプに役立つ”なかのひとログ”をいつでも読み返せるようになりました！');
    } else if (planId === 'premium') {
        data.isVip = true;
        alert('とくべつパックを購入しました！今後、モンスターが進化するたびにランダム報酬を自動獲得できます！');
    } else if (planId === 'starter') {
        grantRandomRewards(1, 1, 1);
        alert('お試しパックを購入しました！\n伝説素材1+背景1+家具1（ランダム）を付与しました。');
    } else if (planId === 'standard') {
        grantRandomRewards(5, 5, 5);
        alert('まんぞくパックを購入しました！\n伝説素材5+背景5+家具5（ランダム）を付与しました。');
    }

    // 永続プラン（VIP/Supporter）のみ購入済みリストに追加
    const permanentPlans = ['premium', 'special'];
    if (permanentPlans.includes(planId)) {
        if (!data.purchasedPlans) data.purchasedPlans = [];
        if (!data.purchasedPlans.includes(planId)) {
            data.purchasedPlans.push(planId);
        }
    }

    saveData(data);
    renderShop(); // ショップ表示を更新
    renderItemGrid(document.querySelector('.item-tab.active')?.dataset.type || 'material'); // アイテムグリッドを更新
    // location.reload(); // 必要に応じてリロード
}

function grantRandomRewards(mCount, bCount, fCount) {
    const categories = [
        { type: 'material', count: mCount },
        { type: 'background', count: bCount },
        { type: 'furniture', count: fCount }
    ];

    categories.forEach(cat => {
        let itemsOfCategory = Object.values(ITEMS).filter(i => {
            // 初期背景 (bg_default) は報酬から除外
            if (i.id === 'bg_default') return false;
            return i.type === cat.type;
        });
        // 重複なしで選ぶため、配列をシャッフルして必要な数だけ取る
        const shuffled = [...itemsOfCategory].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, cat.count);

        selected.forEach(item => {
            data.items[item.id] = (data.items[item.id] || 0) + 1;
        });
    });
}

function showSecretLog() {
    const logOverlay = document.createElement('div');
    logOverlay.id = 'secret-log-overlay';
    logOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:20000;display:flex;align-items:center;justify-content:center;color:#334155;padding:20px;backdrop-filter:blur(8px);';

    const scrollContainer = document.createElement('div');
    scrollContainer.style.cssText = 'width:100%;max-width:550px;background:#fef3c7;padding:40px;border-radius:4px;position:relative;box-shadow:0 20px 50px rgba(0,0,0,0.5);border-left:15px solid #d97706;border-right:15px solid #d97706;max-height:85vh;overflow-y:auto;transform: rotate(-0.5deg);';

    // 幻のモンスター調査記録
    scrollContainer.innerHTML = `
        <div style="font-family:'Hiragino Mincho ProN', 'MS Mincho', serif;">
            <h2 style="color:#92400e;margin-top:0;text-align:center;border-bottom:2px double #92400e;padding-bottom:10px;font-size:24px;">${getIcon('scroll')} 幻のモンスター調査記録</h2>
            <p style="font-style:italic;color:#b45309;text-align:center;margin-bottom:20px;">— 全力で応援してくれた貴方だけに贈る、秘密の手引き —</p>
            
            <div style="background:rgba(255,255,255,0.3);padding:20px;border-radius:8px;margin-bottom:16px;">
                <h3 style="color:#d97706;font-size:18px;margin-bottom:8px;">${getIcon('gold_egg')} 【幻】きんぴかタマゴ</h3>
                <p style="font-size:14px;margin-bottom:6px;"><b>出し方:</b> タスクを累計<b>100個</b>クリアする。</p>
                <p style="font-size:13px;color:#78350f;">地道にタスクを達成し続ければOK。全世代の通算でカウントされるので、殿堂入りしてもリセットされません。コツコツ続けた者だけが手にする黄金の証です。</p>
            </div>

            <div style="background:rgba(255,255,255,0.3);padding:20px;border-radius:8px;margin-bottom:16px;">
                <h3 style="color:#d97706;font-size:18px;margin-bottom:8px;">${getIcon('developer')} 【幻】なかのひとToku</h3>
                <p style="font-size:14px;margin-bottom:6px;"><b>出し方:</b> モンスターをLv10まで育てて<b>殿堂入り</b>させ、<b>2代目</b>を迎える。</p>
                <p style="font-size:13px;color:#78350f;">最初のモンスターを十分に成長させてから世代交代すると、伝説の開発者が姿を見せます。殿堂入りボタンはLv10で出現するので、まずはそこを目指しましょう。</p>
            </div>

            <div style="background:rgba(255,255,255,0.3);padding:20px;border-radius:8px;margin-bottom:16px;">
                <h3 style="color:#d97706;font-size:18px;margin-bottom:8px;">${getIcon('bulb')} 【幻】ひらめきデンキュウ</h3>
                <p style="font-size:14px;margin-bottom:6px;"><b>出し方:</b> せいかくの<b>「クリエイティブ」が最も高い</b>状態で、累計<b>50タスク</b>以上を達成する。</p>
                <p style="font-size:13px;color:#78350f;">「絵を描く」「デザインを考える」「アイデアを出す」など、創作系のタスクを多めにこなすと自然にクリエイティブが伸びます。発想力の結晶が灯りを点します。</p>
            </div>

            <div style="background:rgba(255,255,255,0.3);padding:20px;border-radius:8px;margin-bottom:16px;">
                <h3 style="color:#d97706;font-size:18px;margin-bottom:8px;">${getIcon('cat')} 【幻】キーボードくろネコ</h3>
                <p style="font-size:14px;margin-bottom:6px;"><b>出し方:</b> <b>午前10時〜12時</b>の間にタスクを完了する。さらに、せいかくの<b>「知能」が最も高い</b>状態であること。</p>
                <p style="font-size:13px;color:#78350f;">午前中の集中タイムに現れる黒猫. 勉学や分析、プログラミングなどの「知能」を高めるタスクをこなし、午前中の特定時間に集中して取り組むと姿を見せるでしょう。</p>
            </div>

            <div style="background:rgba(255,255,255,0.3);padding:20px;border-radius:8px;margin-bottom:16px;">
                <h3 style="color:#d97706;font-size:18px;margin-bottom:8px;">${getIcon('coffee')} 【幻】しんやのカフェイン</h3>
                <p style="font-size:14px;margin-bottom:6px;"><b>出し方:</b> <b>深夜0時〜4時</b>の間にタスクを完了する。さらに、せいかくの<b>「カオス」が最も高い</b>状態であること。</p>
                <p style="font-size:13px;color:#78350f;">深夜のカオスな精神状態で作業を続けるストイックな者のお供。「変なことをする」「実験する」など、カオス系のタスクを夜にこなすと芳醇な香りが漂ってきます。</p>
            </div>

            <div style="background:rgba(255,255,255,0.3);padding:20px;border-radius:8px;margin-bottom:16px;">
                <h3 style="color:#d97706;font-size:18px;margin-bottom:8px;">${getIcon('bug')} 【幻】バグったナニカ</h3>
                <p style="font-size:14px;margin-bottom:6px;"><b>出し方:</b> <b>朝5時台</b>（AM 5:00〜5:59）にアプリを開いている。</p>
                <p style="font-size:13px;color:#78350f;">朝一番に世界がバグる瞬間にのみ出現するレアモンスター。早朝5時にアプリを開いてタスクを完了すると、朝靄の中からノイズ混じりの姿を現します。</p>
            </div>

            <div style="background:rgba(255,255,255,0.3);padding:20px;border-radius:8px;margin-bottom:16px;">
                <h3 style="color:#d97706;font-size:18px;margin-bottom:8px;">${getIcon('king')} 【幻】やることキング</h3>
                <p style="font-size:14px;margin-bottom:6px;"><b>出し方:</b> モンスターを<b>10回以上殿堂入り</b>させて、<b>10代目以降</b>に到達する。</p>
                <p style="font-size:13px;color:#78350f;">長い旅路の果てに現れる王。10匹のモンスターをそれぞれLv10まで育て上げ、【王】の資質を証明した証です。焦らず日々のタスクに取り組み、世代を重ねましょう。</p>
            </div>

            <div style="background:rgba(217,119,6,0.15);padding:20px;border-radius:8px;margin-top:24px;border:1px dashed #d97706;">
                <p style="text-align:center;font-size:15px;color:#92400e;font-weight:bold;margin:0;">${getIcon('sparkle')} そして、すべての幻と出会い、図鑑を完成させた時…<br>この世界の「究極の存在」が、あなたの前に降臨するかもしれません。</p>
            </div>
            
            <button id="close-log-btn" style="width:100%;margin-top:30px;padding:15px;background:#92400e;color:#fef3c7;border:none;border-radius:4px;font-weight:bold;cursor:pointer;font-size:16px;box-shadow:0 4px 0 #78350f;">調査記録を閉じる</button>
        </div>
    `;

    logOverlay.appendChild(scrollContainer);
    document.body.appendChild(logOverlay);

    document.getElementById('close-log-btn').onclick = () => document.body.removeChild(logOverlay);
}

// シェア閉じるボタン
// (インライン onclick="closeAllModals()" で制御)

// --- イベント設定 ---

function setupEventListeners() {
    document.getElementById('todo-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('todo-input');
        const text = input.value.trim();
        if (!text) return;
        const isRecurring = text.includes('🔁') || text.startsWith('毎日');
        const cleanText = text.replace('🔁', '').replace(/^毎日\s*/, '').trim();
        const dateMap = { yesterday: getYesterdayStr(), today: getTodayStr(), tomorrow: getTomorrowStr() };
        const scheduledDate = dateMap[currentDateFilter] || getTodayStr();
        const todo = createTodo(cleanText || text, scheduledDate, isRecurring);
        data.todos.unshift(todo);
        saveData(data);
        input.value = '';
        renderTodoList();
    });

    document.querySelectorAll('.date-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            currentDateFilter = tab.dataset.date;
            document.querySelectorAll('.date-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderTodoList();
        });
    });

    // オーバーレイクリックで全モーダルを閉じる
    document.getElementById('overlay').addEventListener('click', () => closeAllModals());

    // 設定ボタン
    document.getElementById('settings-btn').addEventListener('click', () => openModal('settings-modal'));

    document.getElementById('api-key-btn').addEventListener('click', () => {
        document.getElementById('api-key-input').value = data.apiKey || '';
        openModal('api-modal');
    });
    document.getElementById('api-save-btn').addEventListener('click', () => {
        data.apiKey = document.getElementById('api-key-input').value.trim();
        saveData(data);
        closeAllModals();
        updateApiStatus();
    });
    // キャンセルボタンはインライン onclick で制御

    document.getElementById('reset-btn').addEventListener('click', () => {
        if (confirm('【※警告※】\n全データを完全に消去しますか？\n購入したアイテム、図鑑、ショップの権利もすべて失われ、最初からのスタートになります。\nこの操作は取り消せません。')) {
            localStorage.removeItem('todo-monster-data');
            location.reload(); // 完全リセットなのでリロードして初期状態へ
        }
    });

    document.getElementById('re-egg-btn').addEventListener('click', () => {
        if (confirm('今のモンスターとお別れして、タマゴから育て直しますか？\n（レベルと性格はリセットされますが、アイテムや図鑑、タスク履歴はそのまま残ります）')) {
            // キャラクターと性格のみをリセット
            data.character = {
                name: 'ねむいタマゴ',
                level: 1,
                exp: 0,
                branch: null,
            };
            data.personality = {
                creative: 0,
                physical: 0,
                social: 0,
                intellectual: 0,
                chaotic: 0,
            };
            saveData(data);

            // UIを更新
            renderStatus();
            renderPersonality();
            renderFriendList();

            // 箱庭を更新
            playground.setCharacters(data.character, [...data.friends, ...data.hallOfFame, ...(data.unlockedRareMonsters || [])]);

            alert('タマゴに戻りました。次はどんなモンスターになるかな？');
        }
    });

    document.getElementById('chat-trigger-btn').addEventListener('click', () => triggerChat());

    // フレンド関連ボタン
    document.getElementById('export-btn').addEventListener('click', exportCharacter); // 書き出し
    document.getElementById('add-friend-btn').addEventListener('click', () => openModal('friend-modal')); // 追加
    document.getElementById('params-share-btn').addEventListener('click', openShareModal); // Xシェア

    // バックパック・ショップ
    document.getElementById('backpack-btn').addEventListener('click', openBackpackModal);
    document.getElementById('shop-btn').addEventListener('click', () => openModal('shop-modal'));

    // 購入ボタン（データ属性を使う）
    document.querySelectorAll('.buy-btn[data-plan]').forEach(btn => {
        btn.addEventListener('click', () => handlePurchase(btn.dataset.plan));
    });

    const viewSecretBtn = document.getElementById('view-secret-log-btn');
    if (viewSecretBtn) {
        viewSecretBtn.addEventListener('click', () => {
            if (data.isSupporter) {
                showSecretLog();
            } else {
                alert('「全力応援パック」を購入すると、図鑑コンプリートの秘伝が書かれた開発者ログをいつでも読み返せるようになります！✨');
            }
        });
    }

    // バックパックのタブ切り替え
    document.querySelectorAll('.item-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.item-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            renderItemGrid(e.target.dataset.type);
        });
    });
    const friendImportBtn = document.getElementById('friend-import-btn');
    if (friendImportBtn) friendImportBtn.addEventListener('click', importFriend);

    // キャンセルボタンはインライン onclick で制御

    document.getElementById('mute-btn').addEventListener('click', () => {
        const muted = toggleMute();
        localStorage.setItem('todo-monster-muted', muted);
        updateMuteButton();
    });

    document.getElementById('history-btn').addEventListener('click', () => {
        renderHistoryModal();
        openModal('history-modal');
    });
    // 閉じるボタンはインライン onclick で制御

    // 図鑑
    document.getElementById('dex-btn').addEventListener('click', () => {
        renderDex();
        openModal('dex-modal');
    });
    // 閉じるボタンはインライン onclick で制御

    // 名前保存
    document.getElementById('name-save-btn').addEventListener('click', () => {
        const nameInput = document.getElementById('owner-name-input');
        const name = nameInput.value.trim();
        if (name) {
            data.ownerName = name;
            saveData(data);
            closeAllModals();
            renderStatus();
        }
    });

    // 殿堂入り
    document.getElementById('graduate-btn').addEventListener('click', () => {
        if (!confirm(`${data.character.name}を殿堂入りさせて、新しいタマゴから始めますか？`)) return;
        data = graduateCharacter(data);
        saveData(data);
        renderTodoList(); renderStatus(); renderPersonality();
        // 殿堂入りキャラもはこにわに登場！
        const allBoxMembers = [...data.friends, ...data.hallOfFame, ...(data.unlockedRareMonsters || [])];
        playground.setCharacters(data.character, allBoxMembers);
        // アニメーションリスタート
        if (animRAF) cancelAnimationFrame(animRAF);
        startAnimation();
    });

    // 殿堂入り一覧表示ボタン（設定モーダル内とかヘッダーから）
    // 閉じるボタンはインライン onclick で制御

    updateApiStatus();
}

function updateApiStatus() {
    const indicator = document.getElementById('api-status');
    if (data.apiKey) {
        indicator.innerHTML = `${getIcon('status_connected')} Gemini接続済み`;
        indicator.className = 'api-status connected';
    } else {
        indicator.innerHTML = `${getIcon('status_disconnected')} モック会話モード`;
        indicator.className = 'api-status disconnected';
    }
}

function updateMuteButton() {
    const btn = document.getElementById('mute-btn');
    const isMuted = getMuted();
    btn.innerHTML = isMuted ? PIXEL_ICONS.mute_off : PIXEL_ICONS.mute_on;
    btn.title = isMuted ? '音をオンにする' : '音をオフにする';
}

// --- フレンド ---

/** 短縮コード生成: 配列をBase64化 [name, level, branch, owner, personalityStr] */
function generateShortCode() {
    const p = data.personality;
    const pStr = `${p.physical},${p.intellectual},${p.social},${p.creative},${p.chaotic}`;
    const arr = [
        data.character.name,
        data.character.level,
        data.character.branch || '',
        data.ownerName || '',
        pStr
    ];
    return btoa(unescape(encodeURIComponent(JSON.stringify(arr))));
}

// --- フレンド ---

function exportCharacter() {
    const code = generateShortCode();
    navigator.clipboard.writeText(code).then(() => {
        alert('マイコードをコピーしました！');
    }).catch(() => prompt('マイコードです:', code));
}

function importFriend() {
    const input = document.getElementById('friend-code-input');
    const code = input.value.trim();
    if (!code) return;
    try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(code))));
        let friendObj = null;

        if (Array.isArray(decoded)) {
            // 短縮フォーマット [name, level, branch, owner, pStr]
            const [name, level, branch, owner, pStr] = decoded;
            const pArr = (pStr || '0,0,0,0,0').split(',').map(Number);
            const personality = {
                physical: pArr[0] || 0,
                intellectual: pArr[1] || 0,
                social: pArr[2] || 0,
                creative: pArr[3] || 0,
                chaotic: pArr[4] || 0
            };
            friendObj = {
                id: name + '_' + Date.now().toString(36),
                name, level, branch: branch || null,
                ownerName: owner || null,
                personalitySummary: getPersonalitySummary(personality),
                personality
            };
        } else {
            // 互換用: 旧JSONフォーマット
            if (!decoded.name || decoded.level === undefined) { throw new Error(); }
            friendObj = {
                id: decoded.id || decoded.name + '_' + Date.now().toString(36),
                name: decoded.name, level: decoded.level, branch: decoded.branch || null,
                ownerName: decoded.ownerName || null,
                personalitySummary: decoded.personalitySummary || 'ふしぎなやつ',
                personality: decoded.personality || null,
            };
        }

        const existing = data.friends.findIndex(f => f.name === friendObj.name);
        if (existing >= 0) data.friends[existing] = friendObj;
        else data.friends.push(friendObj);

        saveData(data);
        closeAllModals();
        input.value = '';
        renderFriendList();

        // 箱庭（プレイグラウンド）への即時反映を追加
        const allBoxMembers = [...data.friends, ...data.hallOfFame, ...(data.unlockedRareMonsters || [])];
        playground.setCharacters(data.character, allBoxMembers);
    } catch (e) {
        console.error(e);
        alert('コードが読み取れなかった…');
    }
}

function removeFriend(index) {
    data.friends.splice(index, 1);
    saveData(data);
    renderFriendList();

    // 箱庭同期
    const allBoxMembers = [...data.friends, ...data.hallOfFame, ...(data.unlockedRareMonsters || [])];
    playground.setCharacters(data.character, allBoxMembers);
}

function renderFriendList() {
    const container = document.getElementById('friend-list');
    container.innerHTML = '';
    if (data.friends.length === 0) {
        container.innerHTML = '<div class="friend-empty">フレンドを追加するとここに表示されるよ</div>';
        return;
    }
    for (let i = 0; i < data.friends.length; i++) {
        const f = data.friends[i];
        // ナビゲーター（あいぼう）はリストに表示しない
        if (f.id === 'partner_aibou') continue;

        const spec = getMonsterSpec(f.name, f.level || 1, f.branch || null);
        const displayName = spec.displayName || f.name;

        const div = document.createElement('div');
        div.className = 'friend-item';

        let ownerDom = '';
        if (f.ownerName) {
            ownerDom = `<div class="friend-owner">${escapeHtml(f.ownerName)}</div>`;
        }

        div.innerHTML = `
      <div class="friend-info-col">
          <div class="friend-main-row">
            <span class="friend-name">${escapeHtml(displayName)}</span>
            <span class="friend-level">Lv.${f.level}</span>
          </div>
          ${ownerDom}
      </div>
      <button class="friend-remove-btn" title="解除">✕</button>`;
        div.querySelector('.friend-remove-btn').addEventListener('click', () => removeFriend(i));
        container.appendChild(div);
    }
}

// --- タスクリスト ---

function getFilterDate() {
    return { yesterday: getYesterdayStr(), today: getTodayStr(), tomorrow: getTomorrowStr() }[currentDateFilter] || getTodayStr();
}

function renderTodoList() {
    const list = document.getElementById('todo-list');
    const filterDate = getFilterDate();
    const dateTodos = data.todos.filter(t => t.scheduledDate === filterDate);
    const incompleteTodos = dateTodos.filter(t => !t.completed);
    const completedTodos = dateTodos.filter(t => t.completed);
    list.innerHTML = '';

    if (incompleteTodos.length === 0 && completedTodos.length === 0) {
        const msgs = { yesterday: 'きのうのタスクはないよ', tomorrow: 'あしたの予定を書き込もう！', today: 'やることを追加しよう！' };
        list.innerHTML = `<div class="todo-empty">${msgs[currentDateFilter] || msgs.today}</div>`;
        updateTodoCount(0);
        return;
    }

    for (const todo of incompleteTodos) list.appendChild(createTodoItem(todo, false));

    if (completedTodos.length > 0) {
        const sep = document.createElement('div');
        sep.className = 'todo-separator collapsed';
        sep.innerHTML = `<span class="sep-toggle">▶</span> 完了済み（${completedTodos.length}件）`;
        sep.addEventListener('click', () => {
            const cl = document.getElementById('completed-list');
            cl.classList.toggle('collapsed');
            sep.classList.toggle('collapsed');
            sep.querySelector('.sep-toggle').textContent = cl.classList.contains('collapsed') ? '▶' : '▼';
        });
        list.appendChild(sep);

        const sub = document.createElement('div');
        sub.id = 'completed-list';
        sub.className = 'completed-list collapsed';
        for (const todo of completedTodos) sub.appendChild(createTodoItem(todo, true));
        list.appendChild(sub);
    }
    updateTodoCount(incompleteTodos.length);
}

function updateTodoCount(count) {
    document.getElementById('todo-count').textContent = `${count}件のやること`;
}

function createTodoItem(todo, completed) {
    const div = document.createElement('div');
    div.className = `todo-item${completed ? ' completed' : ''}`;
    div.id = `todo-${todo.id}`;
    const emoji = categoryEmoji(todo.category);
    const label = categoryLabel(todo.category);
    const recurringMark = todo.isRecurring ? '<span class="recurring-mark" title="毎日タスク">🔁</span>' : '';
    div.innerHTML = `
    <div class="todo-content">
      <span class="todo-category" title="${label}">${emoji}</span>
      <span class="todo-text">${escapeHtml(todo.text)}</span>${recurringMark}
    </div>
    <div class="todo-actions">
      ${completed ? '' : '<button class="todo-complete-btn" title="完了！">✓</button>'}
      <button class="todo-delete-btn" title="削除">×</button>
    </div>`;
    if (!completed) div.querySelector('.todo-complete-btn').addEventListener('click', () => completeTodo(todo.id));
    div.querySelector('.todo-delete-btn').addEventListener('click', () => deleteTodo(todo.id));
    return div;
}

function completeTodo(id) {
    const todo = data.todos.find(t => t.id === id);
    if (!todo || todo.completed) return;
    const el = document.getElementById(`todo-${id}`);
    if (el) {
        el.classList.add('completing');
        spawnParticles(el);
    }
    playComplete();

    // アニメーション完了(500ms)を待ってから状態更新と再描画を行う (空白時間の短縮)
    setTimeout(() => {
        todo.completed = true;
        todo.completedAt = Date.now();
        data.personality = applyTaskToPersonality(data.personality, todo.category);
        const result = addExp(data.character, data.personality, EXP_PER_TASK);
        data.character = result.character;

        // 累計タスク加算
        data.totalCompleted = (data.totalCompleted || 0) + 1;

        // 現在のモンスターを図鑑登録
        const currentSpec = getMonsterSpec(data.character.name, data.character.level, data.character.branch);
        discoverMonster(currentSpec.name);

        // レア判定
        checkRareDiscovery();

        saveData(data);
        renderTodoList(); renderStatus(); renderPersonality();
        // 箱庭キャラの同期（進化後の姿を反映）
        const allBoxMembers = [...data.friends, ...data.hallOfFame, ...(data.unlockedRareMonsters || [])];
        playground.setCharacters(data.character, allBoxMembers);
        playground.setConfig(data.customization);
        if (result.evolved && result.newStageName) {
            playLevelUp();
            // 進化後のスペックを渡してキャラ描画付きエフェクト
            const newSpec = getMonsterSpec(data.character.name, data.character.level, data.character.branch);
            playEvolutionEffectUI(newSpec.displayName, newSpec);

            // VIP特典: 進化時に報酬付与
            if (data.isVip) {
                setTimeout(() => giveReward(true), 1500);
            }
        }
    }, 500);
}

function spawnParticles(el) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    const colors = ['#f472b6', '#c084fc', '#fcd34d', '#22d3ee', '#4ade80', '#fb7185'];
    for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = cx + 'px';
        p.style.top = cy + 'px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.5;
        const dist = 40 + Math.random() * 60;
        p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
        p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 600);
    }
}

function deleteTodo(id) {
    data.todos = data.todos.filter(t => t.id !== id);
    saveData(data);
    renderTodoList();
}

// --- ステータス ---

function renderStatus() {
    const spec = getMonsterSpec(data.character.name, data.character.level, data.character.branch);
    document.getElementById('char-name').textContent = spec.displayName || spec.name;
    document.getElementById('char-level').textContent = `Lv.${data.character.level}`;
    // document.getElementById('char-stage').textContent = getStageName(data.character); // 削除要望
    const stageEl = document.getElementById('char-stage');
    if (stageEl) stageEl.style.display = 'none';
    const branchEl = document.getElementById('char-branch');
    if (data.character.branch) { branchEl.textContent = getBranchDescription(data.character.branch); branchEl.style.display = 'block'; }
    else branchEl.style.display = 'none';
    const progress = getExpProgress(data.character);
    document.getElementById('exp-bar-fill').style.width = `${progress * 100}%`;
    const remainingTasks = Math.ceil(getExpToNext(data.character) / EXP_PER_TASK);
    document.getElementById('exp-text').textContent = data.character.level >= 10 ? 'MAX!' : `あと${remainingTasks}タスクで進化`;

    // 図鑑番号表示（非表示に変更）
    const dexEl = document.getElementById('char-dex');
    if (dexEl) dexEl.style.display = 'none';

    // 所有者名表示
    const ownerEl = document.getElementById('char-owner');
    if (ownerEl) {
        if (data.ownerName) {
            ownerEl.textContent = `${data.ownerName}のモンスター（${data.generation}代目）`;
            ownerEl.style.display = 'block';
        } else {
            ownerEl.style.display = 'none';
        }
    }

    // 殿堂入りボタン表示（Lv10のときのみ）
    const graduateBtn = document.getElementById('graduate-btn');
    if (graduateBtn) {
        graduateBtn.style.display = data.character.level >= 10 ? 'block' : 'none';
    }
}

// --- 性格 ---

function renderPersonality() {
    const summaryContainer = document.getElementById('personality-summary');
    summaryContainer.innerHTML = '';

    // 性格診断サマリー + ミニキャラ表示
    const wrapper = document.createElement('div');
    wrapper.className = 'personality-summary-content';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '16px';

    // ミニキャラCanvas
    const canvas = document.createElement('canvas');
    canvas.className = 'personality-mini-char';
    canvas.width = 64;
    canvas.height = 64;
    wrapper.appendChild(canvas);

    // テキスト
    const textDiv = document.createElement('div');
    textDiv.className = 'personality-text';
    textDiv.textContent = getPersonalitySummary(data.personality);
    wrapper.appendChild(textDiv);

    summaryContainer.appendChild(wrapper);

    // ミニキャラ描画
    const ctx = canvas.getContext('2d');
    const spec = getMonsterSpec(data.character.name, data.character.level, data.character.branch);
    drawMonster(ctx, spec, 0); // 内部で非同期処理されるが、ここではawait不要

    const bars = document.getElementById('personality-bars');
    const traits = [
        { key: 'creative', label: 'クリエイティブ', icon: PIXEL_ICONS.creative, color: '#ff6ec7' },
        { key: 'physical', label: 'フィジカル', icon: PIXEL_ICONS.physical, color: '#ef4444' },
        { key: 'social', label: 'ソーシャル', icon: PIXEL_ICONS.social, color: '#fbbf24' },
        { key: 'intellectual', label: 'インテリジェンス', icon: PIXEL_ICONS.intellectual, color: '#818cf8' },
        { key: 'chaotic', label: 'カオス', icon: PIXEL_ICONS.chaotic, color: '#e879f9' },
    ];
    bars.innerHTML = '';
    const maxVal = Math.max(1, ...Object.values(data.personality));
    for (const t of traits) {
        const val = data.personality[t.key] || 0;
        const pct = (val / maxVal) * 100;
        const div = document.createElement('div');
        div.className = 'trait-bar';
        // getIconを使用することで、必ずSVG形式のアイコンが出力されるようにする (iOS文字化け対策)
        const iconSvg = getIcon(t.key);
        div.innerHTML = `<span class="trait-label">${iconSvg} ${t.label}</span><div class="trait-meter"><div class="trait-fill" style="width:${pct}%;background:${t.color}"></div></div><span class="trait-value">${val}</span>`;
        bars.appendChild(div);
    }
}

// --- チャット ---

// --- チャット (Playground連携) ---

export async function triggerChat() {
    const btn = document.getElementById('chat-trigger-btn');
    if (btn.disabled) return;
    btn.disabled = true;
    btn.textContent = '...考え中...';

    // 手動チャットでもあいぼうガイドを優先発動 (30%)
    const rareMonsters = data.unlockedRareMonsters || [];
    const aibou = rareMonsters.find(c => c.id === 'partner_aibou');

    if (aibou && Math.random() < 0.3) {
        console.log('Aibou Guide Triggered (Manual)');
        const guideMsg = getRandomGuideMessage();

        // 1. プレイヤー（自分）がフリを入れる
        // 1. プレイヤー（自分）がフリを入れる
        const questions = ['この世界どうなってるんだろう？', 'これ、どうやるの？', '何かいいことない？', '秘密おしえて！'];
        const question = questions[Math.floor(Math.random() * questions.length)];

        // 即座に表示
        try {
            playground.showBubble(data.character, question, true);
            data.chatLog.push({ speaker: 'player', message: question, timestamp: Date.now() });
        } catch (e) { console.error('Error showing question bubble:', e); }

        setTimeout(() => {
            try {
                // 2. あいぼうが答える
                playground.showBubble(aibou, guideMsg, false);
                data.chatLog.push({
                    speaker: 'partner_aibou',
                    message: guideMsg,
                    speakerName: 'あいぼう',
                    timestamp: Date.now()
                });
                if (data.chatLog.length > 60) data.chatLog = data.chatLog.slice(-60);
                saveData(data);
            } catch (e) {
                console.error('Error in guide response:', e);
            } finally {
                // ボタン復帰 (必ず実行)
                setTimeout(() => {
                    btn.disabled = false;
                    const iconSvg = getIcon('social');
                    btn.innerHTML = `${iconSvg} はなす`; // getIconを使用
                }, 2000);
            }
        }, 1800);

        return; // AI生成はスキップ
    }

    try {
        const recentTasks = data.todos.filter(t => t.completed).sort((a, b) => b.completedAt - a.completedAt).slice(0, 5).map(t => t.text);
        const result = await generateChat(data.apiKey, data.character, data.personality, recentTasks, data.friends);
        const messages = result.messages;

        if (messages && messages.length >= 2) {
            // 自分の発言
            const m1 = messages[0];
            playground.showBubble(m1.speaker, m1.text, true);

            // ログ保存 (自分)
            data.chatLog.push({ speaker: 'player', message: m1.text, timestamp: Date.now() });

            // 相手の返答
            setTimeout(() => {
                let m2Speaker = messages[1].speaker;
                let m2Text = messages[1].text;

                // あいぼう専用会話の分岐
                if (m2Speaker.id === 'partner_aibou') {
                    const hour = new Date().getHours();
                    if (hour < 6) m2Text = "……zzz。あ、起きてたの？";
                    else if (hour < 12) m2Text = "おはよう！今日も一歩ずつ進もう。";
                    else if (hour < 18) m2Text = "調子はどう？無理しすぎないでね。";
                    else m2Text = "今日も一日おつかれさま！ゆっくり休んでね。";

                    // たまにヒント
                    if (Math.random() < 0.3) {
                        const hints = [
                            "100個タスクを達成すると、いいことがあるかも？",
                            "深夜3時にだけ現れるナニカがいるらしいよ...",
                            "長く続けると王様になれるって噂だよ！",
                            "完了したタスクの数だけ、ボクたちは強くなれるんだ。",
                            "たまには昔のタスクを振り返ってみるのもいいかもね。"
                        ];
                        m2Text = hints[Math.floor(Math.random() * hints.length)];
                    }
                }

                playground.showBubble(m2Speaker, m2Text, false);
                data.chatLog.push({
                    speaker: m2Speaker,
                    message: m2Text,
                    speakerName: m2Speaker.name || null, // Assuming speaker object has a name property
                    timestamp: Date.now()
                });
                if (data.chatLog.length > 60) data.chatLog = data.chatLog.slice(-60);
                saveData(data);
            }, 1800); // 1.8秒後に返答
        }

    } catch (err) {
        console.error('チャット生成エラー:', err);
        // エラー時はモックチャットにフォールバック
        try {
            console.log('Falling back to mock chat...');
            const result = await generateChat(null, data.character, data.personality, recentTasks, data.friends); // API Key nullでモック強制
            const messages = result.messages;
            if (messages && messages.length >= 2) {
                const m1 = messages[0];
                playground.showBubble(m1.speaker, m1.text, true);
                data.chatLog.push({ speaker: 'player', message: m1.text, timestamp: Date.now() });

                setTimeout(() => {
                    const m2 = messages[1];
                    let m2Speaker = m2.speaker;
                    // モックの場合、m2Speakerは 'npc' 文字列
                    playground.showBubble(m2Speaker, m2.text, false);

                    data.chatLog.push({
                        speaker: 'npc',
                        message: m2.text,
                        speakerName: '誰か', // TODO: 名前解決
                        timestamp: Date.now()
                    });
                    if (data.chatLog.length > 60) data.chatLog = data.chatLog.slice(-60);
                    saveData(data);

                    setTimeout(() => { isChatting = false; }, 4000);
                }, 2000);
            }
        } catch (e) {
            console.error('モックチャット生成も失敗:', e);
            playground.showBubble(data.character, '...', true);
        }
    } finally {
        // 少し余韻を持たせてからボタン復帰
        setTimeout(() => {
            btn.disabled = false;
            const iconSvg = getIcon('social');
            btn.innerHTML = `${iconSvg} はなす`;
        }, 2000);
    }
}

// --- ふりかえり ---

function renderHistoryModal() {
    const body = document.getElementById('history-body');
    body.innerHTML = '';

    // 完了タスクを抽出してソート（新しい順）
    const tasks = data.todos.filter(t => t.completed).sort((a, b) => b.completedAt - a.completedAt);

    if (tasks.length === 0) {
        body.innerHTML = '<div class="history-empty">まだ完了したタスクはないよ</div>';
        return;
    }

    // 日付ごとにグルーピング
    let currentDayLabel = '';
    let section = null;

    for (const t of tasks) {
        const d = new Date(t.completedAt);
        if (isNaN(d.getTime())) continue; // 不正な日付はスキップ

        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const dayStr = `${yyyy}-${mm}-${dd}`;
        const label = dateLabel(dayStr) || `${d.getMonth() + 1}/${d.getDate()}`; // dateLabelがnullなら月/日

        if (label !== currentDayLabel) {
            currentDayLabel = label;
            section = document.createElement('div');
            section.className = 'history-group';
            section.innerHTML = `<div class="history-date">${label}</div>`;
            body.appendChild(section);
        }

        const timeStr = d.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <span class="history-time">${timeStr}</span>
            <span class="history-cat">${categoryEmoji(t.category)}</span>
            <span class="history-text">${escapeHtml(t.text)}</span>
        `;
        section.appendChild(div);
    }
}






/** 素材を使った特殊進化の実行 */
function useMaterialForEvolution(itemId, monsterId) {
    // アイテム消費
    if (data.items[itemId] > 0) {
        data.items[itemId]--;
    }

    // キャラクター情報の上書き（伝説級へ）
    data.character.name = monsterId;
    data.character.level = 99; // 伝説の証
    data.character.branch = 'rare';

    // セーブ
    saveData(data);

    // UI更新
    renderStatus();
    renderPersonality();

    // 箱庭も更新
    const allBoxMembers = [...data.friends, ...data.hallOfFame, ...(data.unlockedRareMonsters || [])];
    playground.setCharacters(data.character, allBoxMembers);

    // 進化演出の実行
    const newSpec = getMonsterSpec(data.character.name, data.character.level, data.character.branch);
    playEvolutionEffectUI(newSpec.displayName, newSpec);

    // 図鑑に登録
    discoverMonster(monsterId);

    alert('おおおっ！？ 凄まじい光と共に、モンスターが伝説の姿へと覚醒しました！！');
}

// --- 進化エフェクト ---

function playEvolutionEffectUI(newName, newSpec) {
    const overlay = document.getElementById('evolution-overlay');
    const nameEl = document.getElementById('evolution-name');
    if (!overlay) return;

    overlay.classList.add('show');
    if (nameEl) nameEl.textContent = '';
    // 進化エフェクトCanvas
    const effectCanvas = document.getElementById('evolution-canvas');
    if (effectCanvas) {
        const ectx = effectCanvas.getContext('2d');
        let progress = 0;
        const effectLoop = () => {
            try {
                progress += 0.015;
                if (progress > 1) progress = 1;
                drawEvolutionEffect(ectx, progress);
                // 後半で進化後キャラをフェードイン描画
                if (progress > 0.5 && newSpec) {
                    const alpha = (progress - 0.5) * 2; // 0→ 1
                    ectx.save();
                    ectx.globalAlpha = alpha;
                    drawMonster(ectx, newSpec, 0);
                    ectx.restore();
                }
                if (progress < 1) requestAnimationFrame(effectLoop);
            } catch (err) {
                console.error('Evolution animation error:', err);
                progress = 1;
            }
        };
        effectLoop();
    }
    if (nameEl) {
        setTimeout(() => {
            nameEl.textContent = `\u{2728} ${newName}に進化した！ \u{2728}`;
            nameEl.classList.add('show');
        }, 800);
    }

    setTimeout(() => {
        if (overlay) overlay.classList.remove('show');
        if (nameEl) {
            nameEl.classList.remove('show');
            nameEl.textContent = '';
        }
        // メインCanvasを再描画（進化後のキャラが出るように）
        if (animRAF) cancelAnimationFrame(animRAF);
        startAnimation();
    }, 3500);
}

// --- 図鑑 ---

function discoverMonster(monsterId) {
    if (!data.discoveredMonsters) data.discoveredMonsters = ['egg'];
    if (!data.discoveredMonsters.includes(monsterId)) {
        data.discoveredMonsters.push(monsterId);
    }
}

// レアキャラをアンロックして箱庭に追加
function unlockRareMonster(id) {
    if (!data.discoveredMonsters.includes(id)) {
        data.discoveredMonsters.push(id);
    }
    // 箱庭用データに追加（重複チェック）
    if (!data.unlockedRareMonsters) data.unlockedRareMonsters = [];
    if (!data.unlockedRareMonsters.find(m => m.id === id)) {
        const spec = MONSTERS.find(m => m.id === id);
        if (spec) {
            data.unlockedRareMonsters.push({
                id: spec.id,
                name: spec.name,
                level: spec.level,
                branch: null,
                palette: spec.palette, // 個別パレット保持
                data: spec.data,       // 個別ドット絵保持
                personalitySummary: spec.desc,
            });
        }
    }
}

function checkRareDiscovery() {
    const hour = new Date().getHours();
    const dominant = getDominantTrait(data.personality);
    let discovered = null;

    // きんぴかタマゴ: 累計100タスク
    if (data.totalCompleted >= 100 && !data.discoveredMonsters.includes('rare_golden')) {
        unlockRareMonster('rare_golden');
        discovered = { name: '【幻】きんぴかタマゴ', reason: 'タスクを100個達成した！' };
    }
    // なかのひとToku: 2代目以降
    if (data.generation >= 2 && !data.discoveredMonsters.includes('rare_toku')) {
        unlockRareMonster('rare_toku');
        discovered = { name: '【幻】なかのひとToku', reason: '2代目以降に突入した！' };
    }
    // ひらめきデンキュウ: クリエイティブが最も高い状態で累計50タスク以上
    if (dominant === 'creative' && data.totalCompleted >= 50 && !data.discoveredMonsters.includes('rare_idea')) {
        unlockRareMonster('rare_idea');
        discovered = { name: '【幻】ひらめきデンキュウ', reason: 'クリエイティブな魂が50タスクを灯した！' };
    }
    // キーボードくろネコ: 午前10-12時 + 知能(intellectual)が最も高い
    if (hour >= 10 && hour < 12 && dominant === 'intellectual' && !data.discoveredMonsters.includes('rare_neko')) {
        unlockRareMonster('rare_neko');
        discovered = { name: '【幻】キーボードくろネコ', reason: '午前中の知的な作業中に忍び寄ってきた...' };
    }
    // しんやのカフェイン: 深夜0-4時 + カオスが最も高い
    if (hour >= 0 && hour < 4 && dominant === 'chaotic' && !data.discoveredMonsters.includes('rare_coffee')) {
        unlockRareMonster('rare_coffee');
        discovered = { name: '【幻】しんやのカフェイン', reason: '深夜のカオスな精神状態で作業を続けた結果...' };
    }
    // バグったナニカ: 朝5時台
    if (hour === 5 && !data.discoveredMonsters.includes('rare_glitch')) {
        unlockRareMonster('rare_glitch');
        discovered = { name: '【幻】バグったナニカ', reason: '早朝5時に起きていた...' };
    }
    // やることキング: 10代目以降
    if (data.generation >= 10 && !data.discoveredMonsters.includes('rare_king')) {
        unlockRareMonster('rare_king');
        discovered = { name: '【幻】やることキング', reason: '10代以上継承した！' };
    }

    // 【神】やることゴッド: 図鑑を(ゴッド以外)コンプリートした時
    // MONSTERS.length から1(ゴッド自身)を引いた数が、現在発見済みのモンスター種類数(ゴッドを含まない)と一致するかチェック
    const discoveredKinds = new Set(data.discoveredMonsters).size;
    const requiredKinds = MONSTERS.length - 1;
    if (discoveredKinds >= requiredKinds && !data.discoveredMonsters.includes('lv99_ultimate')) {
        unlockRareMonster('lv99_ultimate');

        // 通常のレア発見アラートではなく、特別な演出やテキストにする
        discovered = {
            name: '【神】やることゴッド',
            reason: 'すべてのモンスターと出会い、図鑑を完成させた！\n...宇宙の意志が、あなたを認めた！'
        };

        // 究極神降臨時は強制的に手持ちも究極神に進化させる（オマケの演出）
        setTimeout(() => {
            data.character.name = 'lv99_ultimate';
            data.character.level = 99;
            data.character.branch = 'ultimate';
            saveData(data);
            if (typeof renderStatus === 'function') renderStatus();
            if (typeof renderPersonality === 'function') renderPersonality();
            const spec = getMonsterSpec('lv99_ultimate', 99, 'ultimate');
            if (typeof playEvolutionEffectUI === 'function') playEvolutionEffectUI(spec.displayName, spec);
        }, 1500);
    }


    if (discovered) {
        saveData(data);
        setTimeout(() => {
            // 絵文字(\u{1F31F})を削除し、テキストのみまたはSVGでの通知を検討（iOSアラート制限）
            alert(`【発見】レアモンスター「${discovered.name}」を見つけたよ！\n理由: ${discovered.reason}\nはこにわに遊びに来たよ！`);
        }, 1000);

        // 即座に箱庭更新
        const allBoxMembers = [...data.friends, ...data.hallOfFame, ...(data.unlockedRareMonsters || [])];
        playground.setCharacters(data.character, allBoxMembers);
    }
}

function renderDex() {
    const grid = document.getElementById('dex-grid');
    const countEl = document.getElementById('dex-count');
    grid.innerHTML = '';

    const discovered = data.discoveredMonsters || ['egg'];
    const total = MONSTERS.length;
    const found = discovered.length;

    countEl.textContent = `${found} / ${total} 発見済み`;

    MONSTERS.forEach((m, idx) => {
        const isDiscovered = discovered.includes(m.id);
        const isRare = m.type === 'rare';

        const card = document.createElement('div');
        card.className = `dex-card${isDiscovered ? '' : ' undiscovered'}${isRare && isDiscovered ? ' rare-card' : ''}`;

        // ミニキャンバスで描画
        const miniCanvas = document.createElement('canvas');
        miniCanvas.width = 32;
        miniCanvas.height = 32;
        const mctx = miniCanvas.getContext('2d');

        if (isDiscovered) {
            // ドット㊵描画
            const cellSize = 2;
            for (let r = 0; r < 16; r++) {
                for (let c = 0; c < 16; c++) {
                    const val = (m.data[r] && m.data[r][c]) || 0;
                    if (!val) continue;
                    mctx.fillStyle = m.palette[val] || '#000';
                    mctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
                }
            }
        } else {
            // シルエット
            const cellSize = 2;
            for (let r = 0; r < 16; r++) {
                for (let c = 0; c < 16; c++) {
                    const val = (m.data[r] && m.data[r][c]) || 0;
                    if (!val) continue;
                    mctx.fillStyle = '#94a3b8';
                    mctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
                }
            }
        }

        card.innerHTML = `<div class="dex-card-num">No.${String(idx + 1).padStart(3, '0')}</div>`;
        card.insertBefore(miniCanvas, card.firstChild);

        const nameDiv = document.createElement('div');
        nameDiv.className = 'dex-card-name';
        nameDiv.textContent = isDiscovered ? m.name : '???';
        card.appendChild(nameDiv);

        grid.appendChild(card);
    });
}

/** ショップ画面の状態を更新 */
function renderShop() {
    const buyBtns = document.querySelectorAll('.buy-btn[data-plan]');
    buyBtns.forEach(btn => {
        const plan = btn.dataset.plan;

        // 繰り返し購入可能なプラン（消耗品）は除外
        const isConsumable = ['starter', 'standard'].includes(plan);

        if (!isConsumable) {
            let isPurchased = false;
            if (plan === 'premium' && data.isVip) isPurchased = true;
            else if (plan === 'special' && data.isSupporter) isPurchased = true;
            else if (data.purchasedPlans && data.purchasedPlans.includes(plan)) isPurchased = true;

            if (isPurchased) {
                btn.textContent = '購入済み';
                btn.disabled = true;
                btn.style.opacity = '0.5';
            }
        }
    });

    // なかのひとログボタンは常時表示（クリック時にチェック）
}

// --- モーダル制御 ---

function openModal(modalId) {
    document.getElementById('overlay').classList.add('show');
    document.getElementById(modalId).classList.add('show');

    if (modalId === 'shop-modal') {
        const iconContainer = document.getElementById('shop-title-icon');
        if (iconContainer) iconContainer.innerHTML = getIcon('social');
        renderShop();
    }
}

export function closeAllModals() {
    window.closeAllModals = closeAllModals;
    document.getElementById('overlay').classList.remove('show');
    document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show'));
}

// --- ユーティリティ ---

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/** 決済リダイレクト成功の検知 */
function checkPaymentSuccess() {
    const params = new URLSearchParams(window.location.search);
    console.log("Checking payment status:", window.location.search);
    if (params.get('payment') === 'success') {
        const planId = params.get('plan');
        if (planId) {
            completePurchaseSimulation(planId);
            // パラメータを削除してクリーンアップ
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    }
}
