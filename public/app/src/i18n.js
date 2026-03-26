import jaResources from '../locales/ja.json';
import enResources from '../locales/en.json';

export async function initI18n() {
    return new Promise((resolve, reject) => {
        i18next
            .use(i18nextBrowserLanguageDetector)
            .init({
                resources: {
                    ja: { translation: jaResources },
                    en: { translation: enResources }
                },
                fallbackLng: 'ja',
                load: 'languageOnly',
                debug: false,
                detection: {
                    order: ['querystring', 'localStorage', 'navigator'],
                    caches: ['localStorage'],
                }
            }, (err, t) => {
                if (err) return reject(err);
                updateContent();
                resolve(t);
            });
    });
}

/**
 * ページ内の [data-i18n] 属性を持つ要素をすべて翻訳
 */
export function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;

        // 属性への翻訳 (例: [title]ui.settings, [placeholder]ui.task)
        if (key.startsWith('[')) {
            const matches = key.match(/\[(.*?)\](.*)/g);
            if (matches) {
                matches.forEach(m => {
                    const parts = m.match(/\[(.*?)\](.*)/);
                    if (parts) {
                        const attr = parts[1];
                        const translationKey = parts[2];
                        el.setAttribute(attr, i18next.t(translationKey));
                    }
                });
            }
        } else {
            // テキスト内容の翻訳
            // 絵文字を安全に表示するため、基本はtextContentを使いつつ、i18next側の設定に合わせる
            const translated = i18next.t(key);
            if (translated !== key) {
                el.textContent = translated;
            }
        }
    });

    // htmlタグのlang属性も更新
    document.documentElement.lang = i18next.language;
}

/**
 * 言語を切り替える
 */
export async function changeLanguage(lng) {
    await i18next.changeLanguage(lng);
    updateContent();
}

/**
 * 現在の言語を取得
 */
export function getLanguage() {
    return i18next.language;
}
