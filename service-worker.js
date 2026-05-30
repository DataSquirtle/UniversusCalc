const CACHE = "uvs-calc-v3";
const FILES = [
  "/UniversusCalc/",
  "/UniversusCalc/index.html",
  "/UniversusCalc/style.css",
  "/UniversusCalc/app.js",
  "/UniversusCalc/manifest.json",
  "/UniversusCalc/icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
