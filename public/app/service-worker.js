const CACHE_NAME = 'todomonster-pwa-v4';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './icon-v4.svg',
    './src/ui.js',
    './src/store.js',
    './src/todo.js',
    './src/character.js',
    './src/personality.js',
    './src/pixel-engine.js',
    './src/pixel-engine-static.js',
    './src/chat.js',
    './src/sounds.js',
    './src/daily-reset.js',
    './src/playground.js',
    './src/items.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        // ネットワークリクエストを優先し、失敗時にキャッシュを返す
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
