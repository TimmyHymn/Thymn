const CACHE_NAME = 'v3'; // 使用新版本號來強制更新緩存
const CACHE_FILES = [
    '/Thymn/H7.html',
    '/Thymn/7manifest.json',
    '/Thymn/icon-192x192.png',
    '/Thymn/icon-512x512.png'
];

// 安裝事件
self.addEventListener('install', event => {
    self.skipWaiting(); // 新版本的 Service Worker 安裝後立即接管控制
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opening cache:', CACHE_NAME);
            return cache.addAll(CACHE_FILES);
        })
    );
    console.log('Service Worker installed');
});

// 激活事件
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
            ).then(() => {
                // 檢查並刪除特定文件
                caches.open(CACHE_NAME).then(cache => {
                    cache.delete('/Thymn/hymns.js').then(deleted => {
                        if (deleted) console.log('Deleted hymns.js from cache');
                    });
                    cache.delete('/Thymn/replacedata.js').then(deleted => {
                        if (deleted) console.log('Deleted replacedata.js from cache');
                    });
                });
            });
        })
    );
    self.clients.claim(); // 新版本的 Service Worker 激活後立即控制所有客戶端
    console.log('Service Worker activated');
});

// 抓取事件
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log(`Serving from cache: ${event.request.url}`);
            } else {
                console.log(`Fetching from network: ${event.request.url}`);
            }
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
            return caches.match('/Thymn/H7.html');
        })
    );
    console.log('Fetching:', event.request.url);
});
