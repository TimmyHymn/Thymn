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
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
