// UMSA Cloud - Service Worker para PWA
const CACHE_NAME = 'umsa-cloud-v1';
const OFFLINE_URL = '/offline.html';

// Archivos a cachear (los más importantes)
const urlsToCache = [
  '/',
  '/login.html',
  '/index.html',
  '/admin.html',
  '/style.css',
  '/script.js',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Escudo_UMSA.svg/1200px-Escudo_UMSA.svg.png'
];

// Instalación - cachear archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('❌ Error cache:', err))
  );
  self.skipWaiting();
});

// Activación - limpiar caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('🗑️ Cache viejo eliminado:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - responder con cache o red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - devolver desde cache
        if (response) {
          return response;
        }
        
        // Clonar request porque se usa dos veces
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Verificar respuesta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clonar respuesta para cache y devolver
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(() => {
          // Si falla la red y es una navegación, mostrar página offline
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
          return new Response('Sin conexión', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      })
  );
});
