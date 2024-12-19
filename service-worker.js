const CACHE_NAME = 'v2'; // 使用新版本號來強制更新緩存
const CACHE_FILES = [
    '/Thymn/H1.html',
    '/Thymn/manifest.json',
    '/Thymn/style.css',
    '/Thymn/script.js',
    '/Thymn/icon-192x192.png',
    '/Thymn/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(CACHE_FILES);
        })
    );
    console.log('Service Worker installed');
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    console.log('Service Worker activated');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(fetchResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }).catch(() => {
            return caches.match('/Thymn/H1.html');
        })
    );
    console.log('Fetching:', event.request.url);
});
