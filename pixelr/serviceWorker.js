const CACHE_NAME = "v1"; // Wersja cache, możesz zmieniać, aby odświeżać cache
const FILES_TO_CACHE = [
  "index.html",
  "style.css",
  "script.js",
  "manifest.json",
];

// Instalacja Service Workera i cachowanie plików
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  
  const basePath = self.location.pathname.replace(/serviceWorker.js$/, "");
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(
        FILES_TO_CACHE.map((file) => basePath + file)
      );
    })
  );
});

// Aktywacja Service Workera i usuwanie starych wersji cache
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  
  // Usuwamy stare wersje cache
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Usuwamy stare cache
          }
        })
      );
    })
  );
});

// Obsługa pobierania plików - Network First
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
    .then((networkResponse) => {
      // Jeśli odpowiedź z sieci jest poprawna, zapisz ją w cache
      if (networkResponse && networkResponse.status === 200) {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone()); // Nadpisz plik w cache
        });
      }
      return networkResponse; // Zwróć odpowiedź z sieci
    })
    .catch(() => {
      // Jeśli offline, użyj pliku z cache
      return caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Zwróć plik z cache, jeśli dostępny
        } else {
          // Jeśli pliku nie ma w cache, zwróć pustą odpowiedź (można dodać stronę błędu)
          return new Response("Offline i brak pliku w cache", {
            status: 404,
          });
        }
      });
    })
  );
});