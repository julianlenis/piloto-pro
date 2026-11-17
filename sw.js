const C='pp-v1',F=['./','index.html','css/app.css','js/data-general.js','js/data-a320.js','js/data-b787.js','js/data-b737.js','js/data-intro.js','js/tools.js','js/panel.js','js/app.js','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET'||new URL(q.url).origin!==location.origin)return;
 e.respondWith(fetch(q,{cache:'no-store'}).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(q,c));}return r;}).catch(()=>caches.match(q,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))));});
