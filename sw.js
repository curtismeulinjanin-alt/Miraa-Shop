// sw.js — Service Worker pour intercepter et protéger les requêtes
self.addEventListener('install', function(e){
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(clients.claim());
});

// Intercepte les requêtes vers Discord et autres pour brouiller les pistes
self.addEventListener('fetch', function(e){
  const url = e.request.url;
  // Ne pas logger les requêtes vers Discord
  if(url.includes('discord.com/api/webhooks')){
    e.respondWith(new Response('ok', {status: 200, headers: {'Content-Type': 'text/plain'}}));
    return;
  }
  // Pour tout le reste, comportement normal
  e.respondWith(fetch(e.request).catch(()=>new Response('', {status: 503})));
});