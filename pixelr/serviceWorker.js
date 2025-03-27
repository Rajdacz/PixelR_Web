const CACHE_NAME = "v1";
const FILES_TO_CACHE = [
	"index.html",
	"style.css",
	"script.js",
	"manifest.json",
];

self.addEventListener("install", (event) => {
	console.log("Service Worker installing...");

	const basePath = self.location.pathname.replace(/serviceWorker.js$/, "");

	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(FILES_TO_CACHE.map((file) => basePath + file));
		})
	);
});

self.addEventListener("activate", (event) => {
	console.log("Service Worker activating...");

	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		fetch(event.request)
			.then((networkResponse) => {
				const responseClone = networkResponse.clone();

				if (networkResponse && networkResponse.status === 200) {
					caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, responseClone);
					});
				}
				return networkResponse;
			})
			.catch(() => {
				return caches.match(event.request).then((cachedResponse) => {
					if (cachedResponse) {
						return cachedResponse;
					} else {
						return new Response("Offline and no cache files", {
							status: 404,
						});
					}
				});
			})
	);
});
