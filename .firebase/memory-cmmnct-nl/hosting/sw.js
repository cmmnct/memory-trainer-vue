if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,r)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let a={};const t=s=>i(s,l),o={module:{uri:l},exports:a,require:t};e[l]=Promise.all(n.map((s=>o[s]||t(s)))).then((s=>(r(...s),a)))}}define(["./workbox-c5b0ab18"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/index-D_xb5ADe.css",revision:null},{url:"assets/index-Dx_PGdSy.js",revision:null},{url:"assets/index-legacy-CQh2Gb-c.js",revision:null},{url:"assets/index9-CaDFb4Kv.js",revision:null},{url:"assets/index9-legacy-e8tGqVuc.js",revision:null},{url:"assets/input-shims-legacy-DoXtrhe3.js",revision:null},{url:"assets/input-shims-Rd4AU_5y.js",revision:null},{url:"assets/ios.transition-DuVTimNM.js",revision:null},{url:"assets/ios.transition-legacy-CaqODN5I.js",revision:null},{url:"assets/md.transition-ctwfKOZ6.js",revision:null},{url:"assets/md.transition-legacy-BqVL0w9c.js",revision:null},{url:"assets/polyfills-legacy-D4ICGESe.js",revision:null},{url:"assets/status-tap-B-ZlUDPe.js",revision:null},{url:"assets/status-tap-legacy-CipP6_6v.js",revision:null},{url:"assets/swipe-back-CkziNZgU.js",revision:null},{url:"assets/swipe-back-legacy-CK4iUWeu.js",revision:null},{url:"firebase-messaging-sw.js",revision:"88a99f14dde2195eeebfc087f2cb43aa"},{url:"firebase/firebase-app-compat.js",revision:"d6226a6c938bac5c4560ea4021dda566"},{url:"firebase/firebase-app.js",revision:"c99c874f74e637d140a84766df57cd10"},{url:"firebase/firebase-messaging-compat.js",revision:"3c2c8f29466a3f0f7b9cc44a7bd44097"},{url:"firebase/firebase-messaging.js",revision:"014b9c2c350dfc5e0d31e93c6b60f565"},{url:"index.html",revision:"f47642a4b5c9f3a6860a57482cad0607"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"e53e09f5ae1de9110b47f87823e7eda0"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/^https:\/\/my-json-server.typicode.com\//,new s.NetworkFirst({networkTimeoutSeconds:10,cacheName:"api-cache",plugins:[new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/firebasestorage.googleapis.com\//,new s.NetworkFirst({networkTimeoutSeconds:10,cacheName:"firebase-cache",plugins:[new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
