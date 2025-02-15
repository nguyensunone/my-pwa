self.addEventListener('install', function(event) {  
    event.waitUntil(  
        caches.open('my-pwa-cache').then(function(cache) {  
            return cache.addAll([  
                '/',  
                '/index.html',  
                '/audio_test_offline.html',  
                // Gỡ bỏ sample-audio.mp3 nếu không cần  
                '/audio_files/another-audio.mp3',  
                '/audio-mapping.json',  
            ]);  
        })  
    );  
});
