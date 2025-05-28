import { IllustrationCardComponent } from "../../components/illustration-card/index.js";
import { IllustrationPage } from "../illustration/index.js";

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
                        <button id="go-home" class="btn btn-secondary">Домой</button>
                    </div>
                </div>
                <div id="main-page" class="d-flex flex-wrap gap-3"></div>
            </div>
        `;
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://cdna.artstation.com/p/assets/images/images/018/773/854/large/shin-jong-hun-asdasf.jpg?1560684630",
                title: "Элуна",
                author: "Шин Чон Хун",
                date: "2019-06-16",
                description: "Волшебный персонаж, изображенный в фэнтезийной обстановке."
            },
            {
                id: 2,
                src: "https://cdnb.artstation.com/p/assets/images/images/045/336/111/large/lorenzo-lanfranconi-painting-san-donato-3.jpg?1642491687",
                title: "Прогулка до Сан-Донато",
                author: "Лоренцо Ланфранкони",
                date: "2022-01-18",
                description: "Спокойный пейзаж в традиционном стиле."
            },
            {
                id: 3,
                src: "https://cdna.artstation.com/p/assets/images/images/034/605/970/large/shin-jong-hun-1612619763114.jpg?1612746686",
                title: "Мать природа",
                author: "Шин Чон Хун",
                date: "2021-02-08",
                description: "Места, куда я хочу поехать. Сочетание освежающего зеленого, синего и белого. Природа всегда прекрасна."
            },
            {
                id: 4,
                src: "https://cdna.artstation.com/p/assets/images/images/019/693/026/large/wangjie-li-apex-bangalore.jpg?1564605666",
                title: "Бангалор",
                author: "Вангджи Ли",
                date: "2019-06-25",
                description: "Иллюстрация и наброски Бангалора от Apex. Я рад, что могу работать над этой игрой, она потрясающая!"
            },
            {
                id: 5,
                src: "https://cdnb.artstation.com/p/assets/images/images/033/511/717/large/finnian-macmanus-aroth1.jpg?1609874157",
                title: "Машины Эрота",
                author: "Финниан Мак Манус",
                date: "2021-08-03",
                description: "Город заводных механизмов, который давно замерз."
            },
            {
                id: 6,
                src: "https://cdnb.artstation.com/p/assets/images/images/018/724/051/large/bo-chen-dark-cosmic-jhin-final-splash-1920.jpg?1560454527",
                title: "Тёмный Космический Джин",
                author: "Бо Чен",
                date: "2019-02-12",
                description: "Он что-то среднее между Темной Звездой и Космиком. Он разрушает и создает одновременно. Бог, который так увлечен своими собственными делами. Он идет по Млечному Пути, поглощая энергию для своего оружия и сокрушая планеты своими пулями."
            },
            {
                id: 7,
                src: "https://cdnb.artstation.com/p/assets/images/images/026/594/027/large/terence-cantal-queenfrozen-finale3.jpg?1660232512",
                title: "Замороженная королева",
                author: "Теренс Кантал",
                date: "2020-05-07",
                description: "Это был вызов для меня, где я пыталась играть с контрастами истории. Холод окружающей среды и теплота взаимодействия матери и ребенка. Жестокость произошедшего по сравнению с мягкостью выражений главных героев. И так далее. Мне бы хотелось уделить больше времени этой иллюстрации. (Кроме того, анатомия малышей — это нечто особенное, и в ней сложно разобраться!!) Спасибо, что зашли."
            },
            {
                id: 8,
                src: "https://cdna.artstation.com/p/assets/images/images/055/128/704/large/sylvain-sarrailh-cypress-cliff.jpg?1666189543",
                title: "Кипарисовый утёс",
                author: "Сильвен Саррайх",
                date: "2023-04-15",
                description: "Иллюстрация, выполненная для выставки Art Ex Machina в Тулузе."
            }
        ]
    }
    

    render() {
        this.parent.innerHTML = this.getHTML();

        document.getElementById("add-card").addEventListener("click", () => this.addCard());
        document.getElementById("search-input").addEventListener("input", (e) => this.filterCards(e.target.value));

        this.displayCards(this.data);
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