const CACHE_NAME = 'hymn-book-v2';
const ASSETS_TO_CACHE = [
  'https://timmyhymn.github.io/Thymn/HYMN/',
  'https://timmyhymn.github.io/Thymn/HYMN/index.html',
  'https://timmyhymn.github.io/Thymn/HYMN/src/main.tsx',
  'https://timmyhymn.github.io/Thymn/HYMN/src/App.tsx',
  'https://timmyhymn.github.io/Thymn/HYMN/src/index.css',
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
