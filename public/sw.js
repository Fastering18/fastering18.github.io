const CACHE_NAME = 'bramsco-quiz1-v1';

const STATIC_ASSETS = [
  '/quiz1',
  '/quiz1/',
  '/quiz1/index.html',
  '/quiz1/profile',
  '/quiz1/profile.html',
  '/quiz1/hometown',
  '/quiz1/hometown.html',
  '/quiz1/food',
  '/quiz1/food.html',
  '/quiz1/tourist',
  '/quiz1/tourist.html',
  '/css/main.css',
  '/js/index.js',
  '/js/projects.js',
  '/assets/favicon.png',
  '/assets/brahmana.png',
  '/assets/rostud.png',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/hometown/tugu-pahlawan.jpg',
  '/assets/food/rujak-cingur.png',
  '/assets/food/lontong-balap.jpg',
  '/assets/food/tahu-tek.jpg',
  '/assets/tourist/monumen-kapal-selam.png',
  '/assets/tourist/jalan-tunjungan.jpg',
  '/assets/tourist/museum-sampoerna.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
            return caches.match('/quiz1/index.html') || caches.match('/quiz1');
          }
        });
      })
  );
});
