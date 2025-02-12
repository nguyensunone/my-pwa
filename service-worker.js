self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-pwa-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/service-worker.js',
                '/audio_test_offline.html'  // Thêm tệp HTML của bạn vào danh sách cache
            ]);
        })
    );
});

self
