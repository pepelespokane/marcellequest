// Marcelle's Animal Word Adventure service worker — network-first strategy.
// Ensures each app launch tries to fetch the latest version from the server.
// Falls back to cache only if offline.

const CACHE_NAME = 'animal-words-v6';
const APP_SHELL = [
  './',
  './index.html',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      clients.claim(),
      // Clear out any old caches
      caches.keys().then(names =>
        Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
      ),
    ])
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle same-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Use cache:'reload' to bypass the browser's HTTP cache entirely.
  // Without this, GitHub Pages' Cache-Control: max-age=600 makes the SW
  // serve stale HTML for up to 10 minutes after a deploy (and 304-revalidate
  // responses re-cache the same stale body, so the staleness persists).
  event.respondWith(
    fetch(event.request, { cache: 'reload' })
      .then(response => {
        // Only cache successful 200s (skip 304/opaque/error)
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Network failed, serve from cache
        return caches.match(event.request).then(cached =>
          cached || caches.match('./index.html')
        );
      })
  );
});

// Allow the page to request a manual update check
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
