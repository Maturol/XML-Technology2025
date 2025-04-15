import { IllustrationComponent } from "../../components/illustration/index.js"
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class IllustrationPage {
    constructor(parent, data) {
        this.parent = parent
        this.data = data
    }

    get pageRoot() {
        return document.getElementById('illustration-page')
    }

    getHTML() {
        return (
            `
                <div class="container mt-4 text-light">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <button id="back-button" class="btn btn-primary">Назад</button>
                        <button id="go-home" class="btn btn-secondary">Домой</button>
                    </div>
                    <div id="illustration-page"></div>
                </div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = this.getHTML()

        document.getElementById("back-button").addEventListener("click", () => this.clickBack())
        document.getElementById("go-home").addEventListener("click", () => this.clickBack())

        const illustration = new IllustrationComponent(this.pageRoot)
        illustration.render(this.data)
    }
}