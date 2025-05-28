class Ajax {
    async get(url) {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }

    async post(url, payload) {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        return data;
    }

    async patch(url, payload) {
        const res = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        return data;
    }

    async delete(url) {
        const res = await fetch(url, { method: 'DELETE' });
        return res.ok;
    }
}

export const ajax = new Ajax();
