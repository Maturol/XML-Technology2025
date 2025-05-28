(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();const _="modulepreload",S=function(o){return"/"+o},I={},b=function(t,e,n){let r=Promise.resolve();if(e&&e.length>0){let s=function(l){return Promise.all(l.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),f=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=s(e.map(l=>{if(l=S(l),l in I)return;I[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":_,c||(d.as="script"),d.crossOrigin="",d.href=l,f&&d.setAttribute("nonce",f),document.head.appendChild(d),c)return new Promise((p,y)=>{d.addEventListener("load",p),d.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return r.then(s=>{for(const a of s||[])a.status==="rejected"&&i(a.reason);return t().catch(i)})};class L{constructor(t){this.parent=t}getHTML(t){return`
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
            `}addListeners(t,e,n,r){document.getElementById(`click-card-${t.id}`).addEventListener("click",e),document.getElementById(`edit-card-${t.id}`).addEventListener("click",r),document.getElementById(`delete-card-${t.id}`).addEventListener("click",n)}render(t,e,n,r){const i=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",i),this.addListeners(t,e,n,r)}}function j(o){let t=0;for(let e=0;e<o.length;e++){const n=o[e].likes;t+=n*n}return t}function P(o,t){const e=Object.keys(o),n=Object.keys(t);if(e.length!==n.length)return!1;for(let r of e)if(o[r]!==t[r])return!1;return!0}function h(o,t){if(Array.isArray(o)&&Array.isArray(t)){if(o.length!==t.length)return!1;for(let e=0;e<o.length;e++)if(!h(o[e],t[e]))return!1;return!0}return typeof o=="object"&&typeof t=="object"?P(o,t):o===t}function g(o){const t=o.toString().toLowerCase().replace(/[^a-zа-я0-9]/gi,"");for(let e=0;e<t.length/2;e++)if(t[e]!==t[t.length-1-e])return!1;return!0}function m(o){const t=o.toString().toLowerCase().replace(/[^a-zа-я0-9]/gi,"");if(new Set(t).size>t.length/2+1)return!1;let n=0,r=t.length-1,i=!1;do t[n]!==t[r]&&(i=!0),n++,r--;while(n<r&&!i);return!i}class A{async get(t){return await(await fetch(t)).json()}async post(t,e){return await(await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async patch(t,e){return await(await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async delete(t){return(await fetch(t,{method:"DELETE"})).ok}}const E=new A;class H{constructor(){this.baseUrl="http://localhost:3000"}getIllustrations(){return`${this.baseUrl}/illustrations`}getIllustrationById(t){return`${this.baseUrl}/illustrations/${t}`}createIllustration(){return`${this.baseUrl}/illustrations`}removeIllustrationById(t){return`${this.baseUrl}/illustrations/${t}`}updateIllustrationById(t){return`${this.baseUrl}/illustrations/${t}`}}const $=new H;class q{constructor(t){this.parent=t,this.data=[]}get pageRoot(){return document.getElementById("main-page")}clickCard(t){E.get($.getIllustrationById(t),async e=>{const r=(await b(()=>import("./index-BwF7j6sP.js"),[])).IllustrationPage;new r(this.parent,e).render()})}editCard(t){b(()=>import("./index-DbiLcLsR.js"),[]).then(e=>{const n=e.EditIllustrationPage;new n(this.parent,t).render()})}deleteCard(t){E.delete($.removeIllustrationById(t),()=>{this.data=this.data.filter(e=>e.id!==t),this.renderData(this.data)})}addCard(){b(()=>import("./index-DbiLcLsR.js"),[]).then(t=>{const e=t.EditIllustrationPage;new e(this.parent).render()})}getHTML(){return`
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
        `}fillSelectOptions(t){const e=document.getElementById("illustration-1"),n=document.getElementById("illustration-2");e.innerHTML="",n.innerHTML="",t.forEach(r=>{const i=document.createElement("option"),s=document.createElement("option");i.value=s.value=r.id,i.textContent=`${r.title} — ${r.author}`,s.textContent=`${r.title} — ${r.author}`,e.appendChild(i),n.appendChild(s)})}getData(){E.get($.getIllustrations(),t=>{const e=t.map(n=>({id:n.id,src:n.src,title:n.title,author:n.author,date:n.date,description:n.description,likes:n.likes}));this.data=e,this.renderData(t)})}renderData(t){this.pageRoot.innerHTML="",t.forEach(e=>{new L(this.pageRoot).render(e,()=>this.clickCard(e.id),()=>this.deleteCard(e.id),()=>this.editCard(e))}),this.fillSelectOptions(t)}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),document.getElementById("add-card").addEventListener("click",()=>this.addCard()),document.getElementById("search-input").addEventListener("input",t=>this.filterCards(t.target.value)),document.getElementById("compare-illustrations").addEventListener("click",()=>{const t=document.getElementById("illustration-1"),e=document.getElementById("illustration-2"),n=parseInt(t.value),r=parseInt(e.value),i=document.getElementById("compare-result"),s=this.data.find(v=>v.id===n),a=this.data.find(v=>v.id===r),f=h(s.title,a.title),l=h(s.author,a.author),c=h(s.date,a.date),u=h(s.likes,a.likes),d=P(s,a),p=g(s.title),y=m(a.title),w=g(s.author),C=m(a.author),k=g(s.date),B=m(a.date),T=g(s.likes),O=m(a.likes);i.innerHTML=`
                <div class="alert alert-info">
                    <h6>Полное сравнение объектов:</h6>
                    ${d?" Иллюстрации полностью совпадают":" Иллюстрации различаются"}
        
                    <hr>
                    <h6>Сравнение названий:</h6>
                    ${f?"Названия совпадают":"Названия различаются"}
                    <br> "${s.title}" — ${p?"палиндром":"не палиндром"}
                    <br> "${a.title}" — ${y?"палиндром":"не палиндром"}
        
                    <hr>
                    <h6>Сравнение авторов:</h6>
                    ${l?"Авторы совпадают":"Авторы различаются"}
                    <br> "${s.author}" — ${w?"палиндром":"не палиндром"}
                    <br> "${a.author}" — ${C?"палиндром":"не палиндром"}
                    
                    <hr>
                    <h6>Сравнение дат публикаций:</h6>
                    ${c?"Даты совпадают":"Даты различаются"}
                    <br> "${s.date}" — ${k?"палиндром":"не палиндром"}
                    <br> "${a.date}" — ${B?"палиндром":"не палиндром"}

                    <hr>
                    <h6>Сравнение количества лайков:</h6>
                    ${u?"Количество лайков совпадает":"Количество лайков различается"}
                    <br> "${s.likes}" — ${T?"палиндром":"не палиндром"}
                    <br> "${a.likes}" — ${O?"палиндром":"не палиндром"}
                </div>
            `}),document.getElementById("analyze-art").addEventListener("click",()=>{const t=document.getElementById("analysis-result");let e="";const n=j(this.data);e+="<h5> Анализ иллюстраций:</h5>",e+=`<p> Сумма квадратов лайков: <strong>${n}</strong></p>`,t.innerHTML=e}),this.getData()}filterCards(t){const e=this.data.filter(n=>n.title.toLowerCase().includes(t.toLowerCase()));this.renderData(e)}displayCards(t){this.pageRoot.innerHTML="",t.forEach(e=>{new L(this.pageRoot).render(e,()=>this.clickCard(e.id),()=>this.deleteCard(e.id),()=>this.editCard(e))})}}const x=document.getElementById("root"),D=new q(x);D.render();export{q as M,E as a,$ as i};
