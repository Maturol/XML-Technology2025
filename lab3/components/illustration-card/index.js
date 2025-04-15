export class IllustrationCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card mb-3" style="max-width: 720px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.src}" class="img-fluid rounded-start" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${data.title}</h5>
                                <p class="card-text"><strong>Автор:</strong> ${data.author}</p>
                                <button id="click-card-${data.id}" class="btn btn-info">Подробнее</button>
                                <button id="delete-card-${data.id}" class="btn btn-danger">Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    addListeners(data, clickListener, deleteListener) {
        document.getElementById(`click-card-${data.id}`).addEventListener("click", clickListener);
        document.getElementById(`delete-card-${data.id}`).addEventListener("click", deleteListener);
    }

    render(data, clickListener, deleteListener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, clickListener, deleteListener)
    }
}