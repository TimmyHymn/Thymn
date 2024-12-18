// service-worker.js
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/Thymn/H1.html',
                '/Thymn/manifest.json',
                '/Thymn/style.css',
                '/Thymn/script.js',
                '/Thymn/icon-192x192.png',
                '/Thymn/icon-512x512.png'
            ]).catch(error => {
                console.error('Caching failed:', error);
            });
        })
    );
    console.log('Service Worker installed');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(error => {
                console.error('Fetching failed:', error);
            });
        }).catch(error => {
            console.error('Matching cache failed:', error);
        })
    );
    console.log('Fetching:', event.request.url);
});
