const CACHE_NAME = 'hymn-book-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './config.js',
  'https://timmyhymn.github.io/Thymn/Bpm.ttf',
  'https://timmyhymn.github.io/Thymn/icon-192x192.png',
  'https://timmyhymn.github.io/Thymn/icon-512x512.png',
  'https://timmyhymn.github.io/Thymn/hymns.js'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching Assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - Network first, then cache
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests unless they are for our specific assets
  const url = new URL(event.request.url);
  const isExternalAsset = ASSETS_TO_CACHE.some(asset => asset.startsWith('http') && event.request.url.includes(asset));
  const isLocalAsset = event.request.url.includes(self.location.origin);

  if (!isLocalAsset && !isExternalAsset) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response to store in cache
        const resClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, resClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request).then((res) => res))
  );
});
