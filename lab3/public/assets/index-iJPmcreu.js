import{M as s}from"./index-CiiU99y3.js";class r{constructor(t){this.parent=t}getHTML(t){return`
            <div class="card mb-3">
                <img src="${t.src}" class="img-fluid w-100" alt="картинка">
                <div class="card-body">
                    <h2 class="card-title">${t.title}</h2>
                    <p class="card-text"><strong>Автор:</strong> ${t.author}</p>
                    <p class="card-text"><strong>Дата публикации:</strong> ${t.date}</p>
                    <p class="card-text"><strong>Лайки:</strong> ${t.likes}</p>
                    <p class="card-text">${t.description}</p>
                </div>
            </div>
            `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class i{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
                <button id="back-button" class="btn btn-primary" type="button">Назад</button>
            `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class c{constructor(t,e){this.parent=t,this.data=e}get pageRoot(){return document.getElementById("illustration-page")}getHTML(){return`
                <div class="container mt-4 text-light">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <button id="go-home" class="btn btn-secondary">Домой</button>
                    </div>
                    <div id="illustration-page"></div>
                </div>
            `}clickBack(){new s(this.parent).render()}render(){this.parent.innerHTML=this.getHTML(),new i(this.pageRoot).render(this.clickBack.bind(this)),document.getElementById("go-home").addEventListener("click",()=>this.clickBack()),new r(this.pageRoot).render(this.data)}}export{c as IllustrationPage};
