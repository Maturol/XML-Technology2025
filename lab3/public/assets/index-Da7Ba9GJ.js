import{a,i as n,M as i}from"./index-Dr3PC8dq.js";class o{constructor(t,e=null){this.parent=t,this.data=e}get pageRoot(){return document.getElementById("edit-illustration-page")}getHTML(){const t=this.data||{title:"",author:"",src:"",date:"",likes:"",description:""};return`
            <div class="container mt-4 text-light">
                <h3>${this.data?"Редактировать":"Добавить"} иллюстрацию</h3>
                <form id="illustration-form" class="mb-4">
                    <input type="text" id="title" class="form-control mb-2" placeholder="Название" value="${t.title}">
                    <input type="text" id="author" class="form-control mb-2" placeholder="Автор" value="${t.author}">
                    <input type="text" id="src" class="form-control mb-2" placeholder="Ссылка на изображение" value="${t.src}">
                    <input type="text" id="date" class="form-control mb-2" placeholder="Дата" value="${t.date}">
                    <input type="number" id="likes" class="form-control mb-2" placeholder="Лайки" value="${t.likes}">
                    <textarea id="description" class="form-control mb-2" placeholder="Описание">${t.description}</textarea>
                    <button type="submit" class="btn btn-success">${this.data?"Сохранить изменения":"Добавить"}</button>
                    <button type="button" id="cancel" class="btn btn-secondary ms-2">Отмена</button>
                </form>
                <div id="edit-illustration-page"></div>
            </div>
        `}render(){this.parent.innerHTML=this.getHTML(),document.getElementById("illustration-form").addEventListener("submit",async t=>{t.preventDefault();const e={title:document.getElementById("title").value,author:document.getElementById("author").value,src:document.getElementById("src").value,date:document.getElementById("date").value,likes:parseInt(document.getElementById("likes").value),description:document.getElementById("description").value};this.data&&this.data.id?await a.patch(n.updateIllustrationById(this.data.id),e):await a.post(n.createIllustration(),e),new i(this.parent).render()}),document.getElementById("cancel").addEventListener("click",()=>{new i(this.parent).render()})}}export{o as EditIllustrationPage};
