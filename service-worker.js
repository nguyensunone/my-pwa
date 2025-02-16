self.addEventListener('install', function(event) {  
    event.waitUntil(  
        caches.open('my-pwa-cache').then(function(cache) {  
            return cache.addAll([  
                '/',  
                '/index.html',  
                '/audio_test_offline.html',  
                '/audio_files/another-audio.mp3',  
                '/audio-mapping.json',  
                // Có thể thêm các tài nguyên khác mà bạn cần cache ở đây  
            ]);  
        })  
    );  
});  

self.addEventListener('activate', function(event) {  
    event.waitUntil(  
        caches.keys().then(function(cacheNames) {  
            return Promise.all(  
                cacheNames.map(function(cacheName) {  
                    // Xoá cache cũ không cần thiết  
                    if (cacheName !== 'my-pwa-cache') {  
                        return caches.delete(cacheName);  
                    }  
                })  
            );  
        })  
    );  
});  

self.addEventListener('fetch', function(event) {  
    event.respondWith(  
        caches.match(event.request).then(function(response) {  
            // Nếu tài nguyên đã được cache, trả về từ cache  
            if (response) {  
                return response;  
            }  
            // Nếu không có trong cache, fetch từ mạng  
            return fetch(event.request);  
        })  
    );  
});