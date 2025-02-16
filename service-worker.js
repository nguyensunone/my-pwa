// Tên cache
const CACHE_NAME = 'my-pwa-cache-v1';

// Danh sách file cần cache
const urlsToCache = [
    '/nguyensunone.github.io/index.html',  
    '/nguyensunone.github.io/manifest.json',
    '/nguyensunone.github.io/icon-192x192.png',
    '/nguyensunone.github.io/audio_test_offline.html',
    '/nguyensunone.github.io/audio_files/another-audio.mp3',
    '/nguyensunone.github.io/audio-mapping.json'
];

// Sự kiện cài đặt Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Sự kiện fetch: Kiểm tra cache trước khi tải từ mạng
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});

// Sự kiện kích hoạt (Xóa cache cũ nếu cần)
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});
