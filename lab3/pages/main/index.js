import { IllustrationCardComponent } from "../../components/illustration-card/index.js";
import {sumOfSquares, isEqualObj, isEqual, isPalindrom, isPalindromDoWhile} from "../../utils/functions.js";
import { ajax } from "../../modules/ajax.js";
import { illustrationUrls } from "../../modules/illustrationUrls.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [];
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    async clickCard(id) {
        const data = await ajax.get(illustrationUrls.getIllustrationById(id));
        const module = await import("../illustration/index.js");
        const IllustrationPage = module.IllustrationPage;
        const illustrationPage = new IllustrationPage(this.parent, data);
        illustrationPage.render();
    }


    editCard(item) {
        import("../add-edit-illustration/index.js").then((module) => {
            const EditPage = module.EditIllustrationPage;
            const page = new EditPage(this.parent, item);
            page.render();
        });
    }

    async deleteCard(id) {
        await ajax.delete(illustrationUrls.removeIllustrationById(id));
        this.data = this.data.filter(item => item.id !== id);
        this.renderData(this.data);    
    }

    addCard() {
        import("../add-edit-illustration/index.js").then((module) => {
            const EditPage = module.EditIllustrationPage;
            const page = new EditPage(this.parent);
            page.render();
        });
    }

    getHTML() {
        return `
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
        `;
    }

    fillSelectOptions(data) {
        const select1 = document.getElementById("illustration-1");
        const select2 = document.getElementById("illustration-2");
        select1.innerHTML = '';
        select2.innerHTML = '';

        data.forEach((item) => {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");
            option1.value = option2.value = item.id;
            option1.textContent = `${item.title} — ${item.author}`;
            option2.textContent = `${item.title} — ${item.author}`;
            select1.appendChild(option1);
            select2.appendChild(option2);
        });
    }

    async getData() {
        const data = await ajax.get(illustrationUrls.getIllustrations());
        const normalizedData = data.map(item => ({
            id: item.id,
            src: item.src,
            title: item.title,
            author: item.author,
            date: item.date,
            description: item.description,
            likes: item.likes
        }));
        this.data = normalizedData;
        this.renderData(normalizedData);
    }
    
    renderData(items) {
        this.pageRoot.innerHTML = '';

        items.forEach((item) => {
            const card = new IllustrationCardComponent(this.pageRoot);
            card.render(
                item,
                () => this.clickCard(item.id),
                () => this.deleteCard(item.id),
                () => this.editCard(item)
            );
        });

        this.fillSelectOptions(items);
    }

    async render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        document.getElementById("add-card").addEventListener("click", () => this.addCard());
        document.getElementById("search-input").addEventListener("input", (e) => this.filterCards(e.target.value));

        document.getElementById("compare-illustrations").addEventListener("click", () => {
            const select1 = document.getElementById("illustration-1");
            const select2 = document.getElementById("illustration-2");
            const id1 = parseInt(select1.value);
            const id2 = parseInt(select2.value);
            const resultBox = document.getElementById("compare-result");
        
            const art1 = this.data.find(item => item.id === id1);
            const art2 = this.data.find(item => item.id === id2);
        
            const titleEqual = isEqual(art1.title, art2.title);
            const authorEqual = isEqual(art1.author, art2.author);
            const dateEqual = isEqual(art1.date, art2.date);
            const likesEqual = isEqual(art1.likes, art2.likes);
            const fullEqual = isEqualObj(art1, art2);
        
            const title1Palin = isPalindrom(art1.title);
            const title2Palin = isPalindromDoWhile(art2.title);
            const author1Palin = isPalindrom(art1.author);
            const author2Palin = isPalindromDoWhile(art2.author);
            const date1Palin = isPalindrom(art1.date);
            const date2Palin = isPalindromDoWhile(art2.date);
            const likes1Palin = isPalindrom(art1.likes);
            const likes2Palin = isPalindromDoWhile(art2.likes);
        
            resultBox.innerHTML = `
                <div class="alert alert-info">
                    <h6>Полное сравнение объектов:</h6>
                    ${fullEqual ? " Иллюстрации полностью совпадают" : " Иллюстрации различаются"}
        
                    <hr>
                    <h6>Сравнение названий:</h6>
                    ${titleEqual ? "Названия совпадают" : "Названия различаются"}
                    <br> "${art1.title}" — ${title1Palin ? "палиндром" : "не палиндром"}
                    <br> "${art2.title}" — ${title2Palin ? "палиндром" : "не палиндром"}
        
                    <hr>
                    <h6>Сравнение авторов:</h6>
                    ${authorEqual ? "Авторы совпадают" : "Авторы различаются"}
                    <br> "${art1.author}" — ${author1Palin ? "палиндром" : "не палиндром"}
                    <br> "${art2.author}" — ${author2Palin ? "палиндром" : "не палиндром"}
                    
                    <hr>
                    <h6>Сравнение дат публикаций:</h6>
                    ${dateEqual ? "Даты совпадают" : "Даты различаются"}
                    <br> "${art1.date}" — ${date1Palin ? "палиндром" : "не палиндром"}
                    <br> "${art2.date}" — ${date2Palin ? "палиндром" : "не палиндром"}

                    <hr>
                    <h6>Сравнение количества лайков:</h6>
                    ${likesEqual ? "Количество лайков совпадает" : "Количество лайков различается"}
                    <br> "${art1.likes}" — ${likes1Palin ? "палиндром" : "не палиндром"}
                    <br> "${art2.likes}" — ${likes2Palin ? "палиндром" : "не палиндром"}
                </div>
            `;
        });

        document.getElementById("analyze-art").addEventListener("click", () => {
            const resultDiv = document.getElementById("analysis-result");
            let output = '';
        
            const sumLikes = sumOfSquares(this.data);
        
            output += `<h5> Анализ иллюстраций:</h5>`;
            output += `<p> Сумма квадратов лайков: <strong>${sumLikes}</strong></p>`;
    
            resultDiv.innerHTML = output;
        });

        await this.getData();
    }

    filterCards(query) {
        const filtered = this.data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
        this.renderData(filtered);
    }

    displayCards(data) {
        this.pageRoot.innerHTML = '';
    
        data.forEach((item) => {
            const card = new IllustrationCardComponent(this.pageRoot);
            card.render(
                item,
                () => this.clickCard(item.id),
                () => this.deleteCard(item.id),
                () => this.editCard(item)
            );
        });
    }
}