var h=(e,t={})=>{let a=typeof t=="number"?{status:t}:t,n=new Headers(a.headers);return n.has("Content-Type")||n.set("Content-Type","application/json; charset=utf-8"),new Response(JSON.stringify(e),{...a,headers:n})};function i(...e){}async function E(e){i("Service worker installed")}async function C(e){i("Service worker activated")}var p="asset-cache",g="data-cache",y="document-cache",q=["/build/","/icons/"];async function k(e){console.debug("sync manifest");let t=new Map,[a,n,c]=await Promise.all([caches.open(g),caches.open(y),caches.open(p)]),d=e.data.manifest,w=Object.values(d.routes);for(let s of w){if(s.id.includes("$")){console.debug("parametrized route",s.id);continue}b(s)}await Promise.all(t.values());function b(s){let o=l(s);if(s.hasLoader&&R(s),s.module&&t.set(s.module,m(s.module)),s.imports)for(let r of s.imports)i(s.index,s.parentId,s.imports,s.module),!t.has(r)&&t.set(r,m(r));t.set(o,n.add(o).catch(r=>{console.debug(`Failed to cache document ${o}:`,r)}))}function R(s){let o=l(s),S=`?${new URLSearchParams({_data:s.id}).toString()}`,u=o+S;t.has(u)||(console.debug("Caching data for",u),t.set(u,a.add(u).catch(x=>{console.debug(`Failed to cache data for ${u}:`,x)})))}async function m(s){if(!await c.match(s))return console.debug("Caching asset",s),c.add(s).catch(o=>{console.debug(`Failed to cache asset ${s}:`,o)})}function l(s){let o="";if(s.path&&s.path.length>0&&(o="/"+s.path),s.parentId){let r=l(d.routes[s.parentId]);r&&(o=r+o)}return o}}async function A(e){let t=new URL(e.request.url);if(M(e.request)){let a=await caches.match(e.request,{cacheName:p,ignoreVary:!0,ignoreSearch:!0});if(a)return i("Serving asset from cache",t.pathname),a;i("Serving asset from network",t.pathname);let n=await fetch(e.request);return n.status===200&&await(await caches.open(p)).put(e.request,n.clone()),n}if(P(e.request))try{i("Serving data from network",t.pathname+t.search);let a=await fetch(e.request.clone());return await(await caches.open(g)).put(e.request,a.clone()),a}catch{i("Serving data from network failed, falling back to cache",t.pathname+t.search);let n=await caches.match(e.request);return n?(n.headers.set("X-Remix-Worker","yes"),n):h({message:"Network Error"},{status:500,headers:{"X-Remix-Catch":"yes","X-Remix-Worker":"yes"}})}if(F(e.request)){let a=new URL(e.request.url);return console.debug("Serving document from network",a.pathname),caches.open(y).then(n=>fetch(e.request.clone()).then(c=>(n.put(e.request,c.clone()),c)).catch(async c=>{console.debug("Serving document from network failed, falling back to cache",a.pathname);let d=await caches.match(e.request);if(!d)throw c;return d}))}return fetch(e.request.clone())}var L=e=>{let t=JSON.parse(e==null?void 0:e.data.text()),a=t.title?t.title:"Remix PWA",n={body:t.body?t.body:"Notification Body Text",icon:t.icon?t.icon:"/icons/android-icon-192x192.png",badge:t.badge?t.badge:"/icons/android-icon-48x48.png",dir:t.dir?t.dir:"auto",image:t.image?t.image:void 0,silent:t.silent?t.silent:!1};self.registration.showNotification(a,{...n})};function f(e,t){return t.includes(e.method.toLowerCase())}function M(e){return f(e,["get"])&&q.some(t=>e.url.startsWith(t))}function P(e){let t=new URL(e.url);return f(e,["get"])&&t.searchParams.get("_data")}function F(e){return f(e,["get"])&&e.mode==="navigate"}self.addEventListener("install",e=>{e.waitUntil(E(e).then(()=>self.skipWaiting()))});self.addEventListener("activate",e=>{e.waitUntil(C(e).then(()=>self.clients.claim()))});self.addEventListener("message",e=>{e.waitUntil(k(e))});self.addEventListener("push",e=>{e.waitUntil(L(e))});self.addEventListener("fetch",e=>{e.respondWith((async()=>{let t={};try{t.response=await A(e)}catch(a){t.error=a}return H(e,t)})())});async function H(e,{error:t,response:a}){return a}
/*! Bundled license information:

@remix-run/server-runtime/dist/esm/responses.js:
  (**
   * @remix-run/server-runtime v1.9.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/index.js:
  (**
   * @remix-run/server-runtime v1.9.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
