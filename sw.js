/* The Group: service worker só para avisos no celular. Não guarda páginas em cache. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(x){d={body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'The Group',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:d.tag||'themap',renotify:true,data:{url:d.url||'./'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const url=new URL(e.notification.data&&e.notification.data.url||'./',self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if(new URL(c.url).origin===self.location.origin){c.navigate&&c.navigate(url);return c.focus()}}return self.clients.openWindow(url)}))});
