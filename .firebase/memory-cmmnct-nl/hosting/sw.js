if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,l)=>{const t=s||("document"in self?document.currentScript.src:"")||location.href;if(e[t])return;let r={};const o=s=>i(s,t),u={module:{uri:t},exports:r,require:o};e[t]=Promise.all(n.map((s=>u[s]||o(s)))).then((s=>(l(...s),r)))}}define(["./workbox-c5b0ab18"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/index-C01h4BPq.js",revision:null},{url:"assets/index-CavWU7DW.css",revision:null},{url:"assets/index-legacy-CEwaWMK6.js",revision:null},{url:"assets/index9-BuEFzioW.js",revision:null},{url:"assets/index9-legacy-ClHPp8Ll.js",revision:null},{url:"assets/input-shims-legacy-CyoI0swY.js",revision:null},{url:"assets/input-shims-uo0WOJYa.js",revision:null},{url:"assets/ios.transition-legacy-BKpXEFuO.js",revision:null},{url:"assets/ios.transition-w6ULXpCf.js",revision:null},{url:"assets/md.transition-DoZ4pjRi.js",revision:null},{url:"assets/md.transition-legacy-qNLlNdyd.js",revision:null},{url:"assets/polyfills-legacy-D4ICGESe.js",revision:null},{url:"assets/status-tap-C98_UjSD.js",revision:null},{url:"assets/status-tap-legacy-BPJD4KDg.js",revision:null},{url:"assets/swipe-back-CD-NaJAK.js",revision:null},{url:"assets/swipe-back-legacy-CTK0vy_-.js",revision:null},{url:"index.html",revision:"e1ef90c96a44bfbefbda87731f8c6481"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"e53e09f5ae1de9110b47f87823e7eda0"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/^https:\/\/my-json-server.typicode.com\//,new s.NetworkFirst({networkTimeoutSeconds:10,cacheName:"api-cache",plugins:[new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/firebasestorage.googleapis.com\//,new s.NetworkFirst({networkTimeoutSeconds:10,cacheName:"firebase-cache",plugins:[new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
