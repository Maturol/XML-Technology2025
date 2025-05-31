(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();const D="modulepreload",S=function(o){return"/"+o},I={},$=function(t,e,n){let r=Promise.resolve();if(e&&e.length>0){let i=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),f=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=i(e.map(l=>{if(l=S(l),l in I)return;I[l]=!0;const d=l.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const c=document.createElement("link");if(c.rel=d?"stylesheet":D,d||(c.as="script"),c.crossOrigin="",c.href=l,f&&c.setAttribute("nonce",f),document.head.appendChild(c),d)return new Promise((v,E)=>{c.addEventListener("load",v),c.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(i){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i}return r.then(i=>{for(const a of i||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})};class w{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card mb-3" style="max-width: 720px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${t.src}" class="img-fluid rounded-start" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${t.title}</h5>
                                <p class="card-text"><strong>Автор:</strong> ${t.author}</p>
                                <button id="click-card-${t.id}" class="btn btn-info">Подробнее</button>
                                <button id="edit-card-${t.id}" class="btn btn-warning">Редактировать</button>
                                <button id="delete-card-${t.id}" class="btn btn-danger">Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            `}addListeners(t,e,n,r){document.getElementById(`click-card-${t.id}`).addEventListener("click",e),document.getElementById(`edit-card-${t.id}`).addEventListener("click",r),document.getElementById(`delete-card-${t.id}`).addEventListener("click",n)}render(t,e,n,r){const s=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",s),this.addListeners(t,e,n,r)}}function _(o){let t=0;for(let e=0;e<o.length;e++){const n=o[e].likes;t+=n*n}return t}function L(o,t){const e=Object.keys(o),n=Object.keys(t);if(e.length!==n.length)return!1;for(let r of e)if(o[r]!==t[r])return!1;return!0}function h(o,t){if(Array.isArray(o)&&Array.isArray(t)){if(o.length!==t.length)return!1;for(let e=0;e<o.length;e++)if(!h(o[e],t[e]))return!1;return!0}return typeof o=="object"&&typeof t=="object"?L(o,t):o===t}function p(o){const t=o.toString().toLowerCase().replace(/[^a-zа-я0-9]/gi,"");for(let e=0;e<t.length/2;e++)if(t[e]!==t[t.length-1-e])return!1;return!0}function g(o){const t=o.toString().toLowerCase().replace(/[^a-zа-я0-9]/gi,"");if(new Set(t).size>t.length/2+1)return!1;let n=0,r=t.length-1,s=!1;do t[n]!==t[r]&&(s=!0),n++,r--;while(n<r&&!s);return!s}class j{async get(t,e=null){try{const n=await fetch(t),r=await n.json();return e!==null&&e(r,n.status),r}catch(n){console.error("Ошибка GET запроса:",n)}}async post(t,e,n=null){try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});let s=null;try{s=await r.json()}catch{s=null}return n&&n(s,r.status),s}catch(r){console.error("Ошибка POST запроса:",r)}}async patch(t,e,n=null){try{const r=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});let s=null;try{s=await r.json()}catch{s=null}return n!==null&&n(s,r.status),e}catch(r){console.error("Ошибка PATCH запроса:",r)}}async delete(t,e=null){try{const n=await fetch(t,{method:"DELETE"});let r=null;try{r=await n.json()}catch{r=null}return e!==null&&e(r,n.status),r}catch(n){console.error("Ошибка DELETE запроса:",n)}}}const m=new j;class A{constructor(){this.baseUrl="http://localhost:3000"}getIllustrations(){return`${this.baseUrl}/illustrations`}getIllustrationById(t){return`${this.baseUrl}/illustrations/${t}`}searchByTitle(t){return`${this.baseUrl}/illustrations?title=${encodeURIComponent(t)}`}createIllustration(){return`${this.baseUrl}/illustrations`}removeIllustrationById(t){return`${this.baseUrl}/illustrations/${t}`}updateIllustrationById(t){return`${this.baseUrl}/illustrations/${t}`}}const y=new A;class H{constructor(t){this.parent=t,this.data=[]}get pageRoot(){return document.getElementById("main-page")}async clickCard(t){const e=await m.get(y.getIllustrationById(t)),r=(await $(()=>import("./index-iJPmcreu.js"),[])).IllustrationPage;new r(this.parent,e).render()}editCard(t){$(()=>import("./index-Kv4mItBi.js"),[]).then(e=>{const n=e.EditIllustrationPage;new n(this.parent,t).render()})}async deleteCard(t){await m.delete(y.removeIllustrationById(t)),this.data=this.data.filter(e=>e.id!==t),this.renderData(this.data)}addCard(){$(()=>import("./index-Kv4mItBi.js"),[]).then(t=>{const e=t.EditIllustrationPage;new e(this.parent).render()})}getHTML(){return`
            <div class="container mt-4">
                <div class="mb-3">
                    <h2 class="text-light">Art Gallery</h2>
                    <div>
                        <input type="text" id="search-input" class="form-control me-2" placeholder="Поиск по названию...">
                        <button id="add-card" class="btn btn-success me-2">Добавить</button>
                        <button id="analyze-art" class="btn btn-warning me-2">Анализ</button>
                        <button id="go-home" class="btn btn-secondary">Домой</button>
                    </div>
                </div>
                <div id="main-page" class="mb-4"></div>
                <div id="analysis-result" class="bg-dark text-light p-3 rounded"></div>
                <div id="interaction-tools" class="bg-secondary text-light p-3 mt-4 rounded">
                    <h5> Сравнение иллюстраций</h5>
                    <div class="row g-2">
                        <div class="col-md-5">
                        <select id="illustration-1" class="form-select"></select>
                        </div>
                        <div class="col-md-5">
                        <select id="illustration-2" class="form-select"></select>
                        </div>
                        <div class="col-md-2">
                        <button id="compare-illustrations" class="btn btn-light w-100">Проверить</button>
                        </div>
                    </div>
                    <div id="compare-result" class="mt-3"></div>
                    </div>
        `}fillSelectOptions(t){const e=document.getElementById("illustration-1"),n=document.getElementById("illustration-2");e.innerHTML="",n.innerHTML="",t.forEach(r=>{const s=document.createElement("option"),i=document.createElement("option");s.value=i.value=r.id,s.textContent=`${r.title} — ${r.author}`,i.textContent=`${r.title} — ${r.author}`,e.appendChild(s),n.appendChild(i)})}async getData(){const e=(await m.get(y.getIllustrations())).map(n=>({id:n.id,src:n.src,title:n.title,author:n.author,date:n.date,description:n.description,likes:n.likes}));this.data=e,this.renderData(e)}renderData(t){this.pageRoot.innerHTML="",t.forEach(e=>{new w(this.pageRoot).render(e,()=>this.clickCard(e.id),()=>this.deleteCard(e.id),()=>this.editCard(e))}),this.fillSelectOptions(t)}async render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),document.getElementById("add-card").addEventListener("click",()=>this.addCard()),document.getElementById("search-input").addEventListener("input",t=>this.filterCards(t.target.value)),document.getElementById("compare-illustrations").addEventListener("click",()=>{const t=document.getElementById("illustration-1"),e=document.getElementById("illustration-2"),n=parseInt(t.value),r=parseInt(e.value),s=document.getElementById("compare-result"),i=this.data.find(b=>b.id===n),a=this.data.find(b=>b.id===r),f=h(i.title,a.title),l=h(i.author,a.author),d=h(i.date,a.date),u=h(i.likes,a.likes),c=L(i,a),v=p(i.title),E=g(a.title),P=p(i.author),C=g(a.author),T=p(i.date),k=g(a.date),B=p(i.likes),O=g(a.likes);s.innerHTML=`
                <div class="alert alert-info">
                    <h6>Полное сравнение объектов:</h6>
                    ${c?" Иллюстрации полностью совпадают":" Иллюстрации различаются"}
        
                    <hr>
                    <h6>Сравнение названий:</h6>
                    ${f?"Названия совпадают":"Названия различаются"}
                    <br> "${i.title}" — ${v?"палиндром":"не палиндром"}
                    <br> "${a.title}" — ${E?"палиндром":"не палиндром"}
        
                    <hr>
                    <h6>Сравнение авторов:</h6>
                    ${l?"Авторы совпадают":"Авторы различаются"}
                    <br> "${i.author}" — ${P?"палиндром":"не палиндром"}
                    <br> "${a.author}" — ${C?"палиндром":"не палиндром"}
                    
                    <hr>
                    <h6>Сравнение дат публикаций:</h6>
                    ${d?"Даты совпадают":"Даты различаются"}
                    <br> "${i.date}" — ${T?"палиндром":"не палиндром"}
                    <br> "${a.date}" — ${k?"палиндром":"не палиндром"}

                    <hr>
                    <h6>Сравнение количества лайков:</h6>
                    ${u?"Количество лайков совпадает":"Количество лайков различается"}
                    <br> "${i.likes}" — ${B?"палиндром":"не палиндром"}
                    <br> "${a.likes}" — ${O?"палиндром":"не палиндром"}
                </div>
            `}),document.getElementById("analyze-art").addEventListener("click",()=>{const t=document.getElementById("analysis-result");let e="";const n=_(this.data);e+="<h5> Анализ иллюстраций:</h5>",e+=`<p> Сумма квадратов лайков: <strong>${n}</strong></p>`,t.innerHTML=e}),await this.getData()}filterCards(t){if(!t.trim()){this.renderData(this.data);return}m.get(y.searchByTitle(t)).then(e=>{this.renderData(e)}).catch(e=>{console.error("Ошибка при поиске:",e),this.renderData([])})}displayCards(t){this.pageRoot.innerHTML="",t.forEach(e=>{new w(this.pageRoot).render(e,()=>this.clickCard(e.id),()=>this.deleteCard(e.id),()=>this.editCard(e))})}}const x=document.getElementById("root"),M=new H(x);M.render();export{H as M,m as a,y as i};
