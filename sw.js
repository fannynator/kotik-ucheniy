const CACHE_NAME = 'kot-ucheniy-v1';
const urlsToCache = [
    '.',
    'index.html',
    'css/styles.css',
    'js/config.js',
    'js/utils.js',
    'js/state.js',
    'js/sounds.js',
    'js/app.js',
    'js/generators/math.js',
    'js/generators/russian.js',
    'js/components/taskRenderer.js',
    'js/components/skillTree.js',
    'js/components/lesson.js',
    'js/components/story.js',
    'js/components/trap.js',
    'js/components/profile.js',
    'js/components/tutorial.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
