import { illustrationUrls } from "../../modules/illustrationUrls.js";
import { ajax } from "../../modules/ajax.js";
import { MainPage } from "../main/index.js";

export class EditIllustrationPage {
    constructor(parent, data = null) {
        this.parent = parent;
        this.data = data;
    }

    get pageRoot() {
        return document.getElementById("edit-illustration-page");
    }

    getHTML() {
        const d = this.data || { title: "", author: "", src: "", date: "", likes: "", description: "" };
        return `
            <div class="container mt-4 text-light">
                <h3>${this.data ? "Редактировать" : "Добавить"} иллюстрацию</h3>
                <form id="illustration-form" class="mb-4">
                    <input type="text" id="title" class="form-control mb-2" placeholder="Название" value="${d.title}">
                    <input type="text" id="author" class="form-control mb-2" placeholder="Автор" value="${d.author}">
                    <input type="text" id="src" class="form-control mb-2" placeholder="Ссылка на изображение" value="${d.src}">
                    <input type="text" id="date" class="form-control mb-2" placeholder="Дата" value="${d.date}">
                    <input type="number" id="likes" class="form-control mb-2" placeholder="Лайки" value="${d.likes}">
                    <textarea id="description" class="form-control mb-2" placeholder="Описание">${d.description}</textarea>
                    <button type="submit" class="btn btn-success">${this.data ? "Сохранить изменения" : "Добавить"}</button>
                    <button type="button" id="cancel" class="btn btn-secondary ms-2">Отмена</button>
                </form>
                <div id="edit-illustration-page"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = this.getHTML();

        document.getElementById("illustration-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const payload = {
                title: document.getElementById("title").value,
                author: document.getElementById("author").value,
                src: document.getElementById("src").value,
                date: document.getElementById("date").value,
                likes: parseInt(document.getElementById("likes").value),
                description: document.getElementById("description").value
            };

            if (this.data && this.data.id) {
                await ajax.patch(illustrationUrls.updateIllustrationById(this.data.id), payload);
            } else {
                await ajax.post(illustrationUrls.createIllustration(), payload);
            }

            const main = new MainPage(this.parent);
            main.render();
        });

        document.getElementById("cancel").addEventListener("click", () => {
            const main = new MainPage(this.parent);
            main.render();
        });
    }
}
