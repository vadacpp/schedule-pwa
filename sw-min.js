function precache(){return caches.open(CACHE).then(function(cache){return cache.addAll(["./index.html","./dist/main-min.js","./dist/style-min.css","./dist/buses.json"])})}function fromCache(request){return caches.open(CACHE).then(function(cache){return cache.match(request).then(function(matching){return matching||Promise.reject("no-match")})})}function update(request){return caches.open(CACHE).then(function(cache){return fetch(request).then(function(response){return cache.put(request,response)})})}var CACHE="v1";self.addEventListener("install",function(event){event.waitUntil(precache())}),self.addEventListener("activate",function(event){event.waitUntil(caches.keys().then(function(cacheNames){return Promise.all(cacheNames.map(function(cacheName){if(CACHE!==cacheName)return console.log("Deleting out of date cache:",cacheName),caches.delete(cacheName)}))}))}),self.addEventListener("fetch",function(event){event.respondWith(fromCache(event.request)),event.waitUntil(update(event.request))});