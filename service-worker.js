self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-pwa-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/audio_test_offline.html',
                '/audio_files/sample-audio.mp3',  // Thêm tất cả các tệp âm thanh cần thiết
                '/audio_files/another-audio.mp3',
                '/audio-mapping.json',  // Thêm tệp audio-mapping.json                
                // Thêm các tệp khác nếu cần thiết
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
