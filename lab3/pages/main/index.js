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
                title: "Elune",
                author: "Shin Jong Hun",
                date: "2019-06-16",
                description: "A magical character painted in a fantasy setting."
            },
            {
                id: 2,
                src: "https://cdnb.artstation.com/p/assets/images/images/045/336/111/large/lorenzo-lanfranconi-painting-san-donato-3.jpg?1642491687",
                title: "Walk to San Donato",
                author: "Lorenzo Lanfranconi",
                date: "2022-01-18",
                description: "A serene landscape in traditional style."
            },
            {
                id: 3,
                src: "https://cdna.artstation.com/p/assets/images/images/034/605/970/large/shin-jong-hun-1612619763114.jpg?1612746686",
                title: "Mother Nature",
                author: "Shin Jong Hun",
                date: "2021-02-08",
                description: "Places I want to go. A combination of refreshing green, blue and white. Nature is always beautiful."
            },
            {
                id: 4,
                src: "https://cdna.artstation.com/p/assets/images/images/019/693/026/large/wangjie-li-apex-bangalore.jpg?1564605666",
                title: "Bangalore",
                author: "Wangjie Li",
                date: "2019-06-25",
                description: "Illustration and sketches of Bangalore from Apex. I'm glad I can work for this game, it's amazing!"
            },
            {
                id: 5,
                src: "https://cdnb.artstation.com/p/assets/images/images/033/511/717/large/finnian-macmanus-aroth1.jpg?1609874157",
                title: "Machines of Eroth",
                author: "Finnian MacManus",
                date: "2021-08-03",
                description: "A city of clockwork machinery that has long been frozen over."
            },
            {
                id: 6,
                src: "https://cdnb.artstation.com/p/assets/images/images/018/724/051/large/bo-chen-dark-cosmic-jhin-final-splash-1920.jpg?1560454527",
                title: "Dark Cosmic Jhin",
                author: "Bo Chen",
                date: "2019-02-12",
                description: "He is kind of between Dark Star and Cosmic. He destroys and creates at the same time. I god who is so addicted to his own works. He is walking in the Milky Way, absorbing energy for his gun and crushing a planet as his bullets."
            },
            {
                id: 7,
                src: "https://cdnb.artstation.com/p/assets/images/images/026/594/027/large/terence-cantal-queenfrozen-finale3.jpg?1660232512",
                title: "Frozen Queen",
                author: "Terence CANTAL",
                date: "2020-05-07",
                description: "This was a challenge to myself, where I tried to play with story contrasts. The cold of the environment and the warmth of the mother / child's interaction. The violence of what has happened versus the softness of the main characters expressions. And so on. I would have loved to spend more time on this illustration. (Also, toddler anatomy is it's own thing, and it's tough to figure out !! ) Thanks for stopping by."
            },
            {
                id: 8,
                src: "https://cdna.artstation.com/p/assets/images/images/055/128/704/large/sylvain-sarrailh-cypress-cliff.jpg?1666189543",
                title: "The Cypress Cliff",
                author: "Sylvain Sarrailh",
                date: "2023-04-15",
                description: "Illustration made for the exhibition Art Ex Machina at Toulouse."
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