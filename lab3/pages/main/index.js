import { IllustrationCardComponent } from "../../components/illustration-card/index.js";
import { IllustrationPage } from "../illustration/index.js";
import {sumOfArtLikes, isEqualArtObj, isEqualArtValue, isPalindromArt, isPalindromArtDoWhile} from "../../utils/functions.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = this.getData()
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    clickCard(id) {
        const illustration = this.data.find(item => item.id === id)
        const illustrationPage = new IllustrationPage(this.parent, illustration)
        illustrationPage.render()
    }

    deleteCard(id) {
        this.data = this.data.filter(item => item.id !== id);
        this.render();
    }

    addCard() {
        if (this.data.length === 0) return;
        const newCard = { ...this.data[0] };
        newCard.id = Math.max(...this.data.map(d => d.id)) + 1;
        this.data.push(newCard);
        this.render();
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h2 class="text-light">Art Gallery</h2>
                    <div>
                        <input type="text" id="search-input" class="form-control me-2" placeholder="Поиск по названию...">
                        <button id="add-card" class="btn btn-success me-2">Добавить</button>
                        <button id="analyze-art" class="btn btn-warning me-2">Анализ</button>
                        <button id="go-home" class="btn btn-secondary">Домой</button>
                    </div>
                </div>
                <div id="main-page" class="d-flex flex-wrap gap-3 mb-4"></div>
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

    getData() {
        return [
          { id: 1, src: "https://cdna.artstation.com/p/assets/images/images/018/773/854/large/shin-jong-hun-asdasf.jpg?1560684630", title: "Elune", author: "Shin Jong Hun", date: "2019-06-16", description: "A magical character painted in a fantasy setting.", likes: 12 },
          { id: 2, src: "https://cdnb.artstation.com/p/assets/images/images/045/336/111/large/lorenzo-lanfranconi-painting-san-donato-3.jpg?1642491687", title: "Walk to San Donato", author: "Lorenzo Lanfranconi", date: "2022-01-18", description: "A serene landscape in traditional style.", likes: 5 },
          { id: 3, src: "https://cdna.artstation.com/p/assets/images/images/034/605/970/large/shin-jong-hun-1612619763114.jpg?1612746686", title: "Mother Nature", author: "Shin Jong Hun", date: "2021-02-08", description: "Places I want to go...", likes: 6 },
          { id: 4, src: "https://cdna.artstation.com/p/assets/images/images/019/693/026/large/wangjie-li-apex-bangalore.jpg?1564605666", title: "Bangalore", author: "Wangjie Li", date: "2019-06-25", description: "Illustration and sketches of Bangalore from Apex...", likes: 17 },
          { id: 5, src: "https://cdnb.artstation.com/p/assets/images/images/033/511/717/large/finnian-macmanus-aroth1.jpg?1609874157", title: "Machines of Eroth", author: "Finnian MacManus", date: "2021-08-03", description: "A city of clockwork machinery...", likes: 10 },
          { id: 6, src: "https://cdnb.artstation.com/p/assets/images/images/018/724/051/large/bo-chen-dark-cosmic-jhin-final-splash-1920.jpg?1560454527", title: "Dark Cosmic Jhin", author: "Bo Chen", date: "2019-02-12", description: "He is kind of between Dark Star and Cosmic...", likes: 30 },
          { id: 7, src: "https://cdnb.artstation.com/p/assets/images/images/026/594/027/large/terence-cantal-queenfrozen-finale3.jpg?1660232512", title: "Frozen Queen", author: "Terence CANTAL", date: "2020-05-07", description: "This was a challenge to myself...", likes: 12 },
          { id: 8, src: "https://cdna.artstation.com/p/assets/images/images/055/128/704/large/sylvain-sarrailh-cypress-cliff.jpg?1666189543", title: "The Cypress Cliff", author: "Sylvain Sarrailh", date: "2023-04-15", description: "Illustration made for the exhibition Art Ex Machina at Toulouse.", likes: 7 }
        ];
      }
    

    render() {
        this.parent.innerHTML = this.getHTML();

        document.getElementById("add-card").addEventListener("click", () => this.addCard());
        document.getElementById("search-input").addEventListener("input", (e) => this.filterCards(e.target.value));

        this.displayCards(this.data);

        const select1 = document.getElementById("illustration-1");
        const select2 = document.getElementById("illustration-2");

        this.data.forEach((item, index) => {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");
            option1.value = option2.value = item.id;
            option1.textContent = `${item.title} — ${item.author}`;
            option2.textContent = `${item.title} — ${item.author}`;
            select1.appendChild(option1);
            select2.appendChild(option2);
        });

        document.getElementById("compare-illustrations").addEventListener("click", () => {
            const id1 = parseInt(select1.value);
            const id2 = parseInt(select2.value);
            const resultBox = document.getElementById("compare-result");
        
            const art1 = this.data.find(item => item.id === id1);
            const art2 = this.data.find(item => item.id === id2);
        
            const titleEqual = isEqualArtValue(art1.title, art2.title);
            const authorEqual = isEqualArtValue(art1.author, art2.author);
            const dateEqual = isEqualArtValue(art1.date, art2.date);
            const likesEqual = isEqualArtValue(art1.likes, art2.likes);
            const fullEqual = isEqualArtObj(art1, art2);
        
            const title1Palin = isPalindromArt(art1.title);
            const title2Palin = isPalindromArtDoWhile(art2.title);
            const author1Palin = isPalindromArt(art1.author);
            const author2Palin = isPalindromArtDoWhile(art2.author);
        
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
                    "${art1.date}" — "${art2.date}"
                    <br> ${dateEqual ? "Даты совпадают" : "Даты различаются"}

                    <hr>
                    <h6>Сравнение количества лайков:</h6>
                    ${art1.likes} лайков — ${art2.likes} лайков
                    <br> ${likesEqual ? "Количество лайков совпадает" : "Количество лайков различается"}
                </div>
            `;
        });

        document.getElementById("analyze-art").addEventListener("click", () => {
            const resultDiv = document.getElementById("analysis-result");
            let output = '';
        
            const sumLikes = sumOfArtLikes(this.data);
        
            output += `<h5> Анализ иллюстраций:</h5>`;
            output += `<p> Сумма квадратов лайков: <strong>${sumLikes}</strong></p>`;
    
            resultDiv.innerHTML = output;
        });
    }

    filterCards(query) {
        const filteredData = this.data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
        this.displayCards(filteredData);
    }

    displayCards(data) {
        this.pageRoot.innerHTML = '';
    
        data.forEach((item) => {
            const card = new IllustrationCardComponent(this.pageRoot);
            card.render(
                item,
                () => this.clickCard(item.id),
                () => this.deleteCard(item.id)
            );
        });
    }
}