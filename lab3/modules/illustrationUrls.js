class IllustrationUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }
    getIllustrations() {
        return `${this.baseUrl}/illustrations`;
    }
    getIllustrationById(id) {
        return `${this.baseUrl}/illustrations/${id}`;
    }
    searchByTitle(query) {
    return `${this.baseUrl}/illustrations?title=${encodeURIComponent(query)}`;
}
    createIllustration() {
        return `${this.baseUrl}/illustrations`;
    }
    removeIllustrationById(id) {
        return `${this.baseUrl}/illustrations/${id}`;
    }
    updateIllustrationById(id) {
        return `${this.baseUrl}/illustrations/${id}`;
    }
}
export const illustrationUrls = new IllustrationUrls();