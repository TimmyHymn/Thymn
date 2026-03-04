const CACHE_NAME = 'hymn-book-v1';
const ASSETS_TO_CACHE = [
  '../HYMN',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  'https://timmyhymn.github.io/Thymn/Bpm.ttf',
  'https://timmyhymn.github.io/Thymn/icon-192x192.png',
  'https://timmyhymn.github.io/Thymn/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
