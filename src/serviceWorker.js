self.addEventListener("install", (event) => {
	let basePath = self.location.origin;

	event.waitUntil(
		caches.open("v1").then((cache) => {
			return cache.addAll([
				basePath + "/",
				basePath + "/index.html",
				basePath + "/style.css",
				basePath + "/script.js",
				basePath + "/manifest.json",
			]);
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return (
				response ||
				fetch(event.request).catch(() => {
					console.error("Downloading error:", event.request.url);
				})
			);
		})
	);
});
