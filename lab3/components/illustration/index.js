export class IllustrationComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
            <div class="card mb-3">
                <img src="${data.src}" class="img-fluid w-100" alt="картинка">
                <div class="card-body">
                    <h2 class="card-title">${data.title}</h2>
                    <p class="card-text"><strong>Автор:</strong> ${data.author}</p>
                    <p class="card-text"><strong>Дата публикации:</strong> ${data.date}</p>
                    <p class="card-text">${data.description}</p>
                </div>
            </div>
            `
        );
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}