/* Service Worker: кэширование изображений */
const CACHE_NAME = 'safeddara-images-v1';
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];

function isImageRequest(url) {
  try {
    const u = new URL(url);
    const path = u.pathname.toLowerCase();
    if (path.includes('/photo-')) return true;
    if (IMAGE_EXTENSIONS.some(ext => path.includes(ext))) return true;
    if (u.hostname.includes('unsplash.com')) return true;
    if (u.hostname.includes('safeddara.tj') && (path.includes('image') || path.includes('upload') || /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(url))) return true;
    return false;
  } catch { return false; }
}

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || !isImageRequest(e.request.url)) return;
  e.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(e.request).then(cached =>
        cached || fetch(e.request).then(res => {
          if (res.ok && res.type === 'basic') cache.put(e.request, res.clone());
          return res;
        })
      )
    )
  );
});
