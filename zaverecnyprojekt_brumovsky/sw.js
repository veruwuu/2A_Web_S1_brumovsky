const CACHE_NAME = "offline-cache-v1";
const OFFLINE_URL = "offline.html";

// 1. Fáze INSTALACE: Uložíme offline stránku do mezipaměti (Cache)
self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // {cache: 'reload'} vynutí stažení aktuální verze ze sítě
    await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
  })());
  self.skipWaiting(); // Okamžitá aktivace nového SW
});

// 2. Fáze FETCH: Kontrola připojení při každém kliknutí
self.addEventListener("fetch", (event) => {
  // Zajímají nás jen požadavky na zobrazení stránek (navigace)
  if (event.request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        // Zkusíme se připojit k internetu a stáhnout stránku
        return await fetch(event.request);
      } catch (error) {
        // Pokud internet nejde (fetch selže), vrátíme offline.html z cache
        const cache = await caches.open(CACHE_NAME);
        return await cache.match(OFFLINE_URL);
      }
    })());
  }
});