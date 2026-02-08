(() => {
    const C = window.Clients;
    const clientsApiUrl = '/api/clients/';

    async function requestJson(url, options = {}) {
        const method = (options.method || 'GET').toUpperCase();
        const headers = new Headers(options.headers || {});
        if (!headers.has('Accept')) headers.set('Accept', 'application/json');
        if (!headers.has('X-CSRFToken')) {
            const token = getCsrfToken();
            if (token) headers.set('X-CSRFToken', token);
        }

        const res = await fetch(url, { ...options, method, headers });
        if (res.status === 204) return null;
        const contentType = res.headers.get('content-type') || '';
        const isJson = contentType.includes('application/json');
        const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => '');
        if (!res.ok) {
            const msg = (data && typeof data === 'object' ? JSON.stringify(data) : String(data || 'Request failed'));
            throw new Error(msg);
        }
        return data;
    }

    async function listClients() {
        C.setLoading(true);
        try {
            return await requestJson(clientsApiUrl);
        } finally {
            C.setLoading(false);
        }
    }

    async function getClient(id) {
        return await requestJson(`${clientsApiUrl}${id}/`);
    }

    async function createClient(payload) {
        return await requestJson(clientsApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    }

    async function updateClient(id, payload) {
        return await requestJson(`${clientsApiUrl}${id}/`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    }

    async function deleteClient(id) {
        await requestJson(`${clientsApiUrl}${id}/`, { method: 'DELETE' });
    }

    async function updateClientActive(id, isActive) {
        return await updateClient(id, { is_active: isActive });
    }

    C.api = {
        listClients,
        getClient,
        createClient,
        updateClient,
        deleteClient,
        updateClientActive,
    };
})();
