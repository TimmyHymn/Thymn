const CACHE_NAME = 'v2'; // 使用新版本號來強制更新緩存
const CACHE_FILES = [
    '/Thymn/H1.html',
    '/Thymn/manifest.json',
    '/Thymn/icon-192x192.png',
    '/Thymn/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opening cache:', CACHE_NAME);
            return cache.addAll(CACHE_FILES);
        })
    );
    console.log('Service Worker installed');
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME]; // 只保留當前版本的快取
    event.waitUntil(
        caches.keys().then(cacheNames => {
            console.log('All cache names:', cacheNames);
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log(`Deleting outdated cache: ${cacheName}`);
                        return caches.delete(cacheName); // 刪除舊版本的快取
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
                    console.log(`Caching new resource: ${event.request.url}`);
                    // 儲存新的快取
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }).catch(() => {
            // 如果網絡失敗，返回預設的緩存頁面
            return caches.match('/Thymn/H1.html');
        })
    );
    console.log('Fetching:', event.request.url);
});
