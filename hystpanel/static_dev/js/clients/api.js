(() => {
    const C = window.Clients;

    async function listClients() {
        C.setLoading(true);
        try {
            const res = await fetch('/api/clients/');
            if (!res.ok) throw new Error('Unable to load clients.');
            return await res.json();
        } finally {
            C.setLoading(false);
        }
    }

    async function getClient(id) {
        const res = await fetch(`/api/clients/${id}/`);
        if (!res.ok) return null;
        return await res.json();
    }

    async function createClient(payload) {
        const res = await fetch('/api/clients/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken()
            },
            body: JSON.stringify(payload)
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            const errorText = errorData ? JSON.stringify(errorData) : 'Unable to create client.';
            throw new Error(errorText);
        }
        return await res.json().catch(() => ({}));
    }

    async function updateClient(id, payload) {
        const res = await fetch(`/api/clients/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken()
            },
            body: JSON.stringify(payload)
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            const errorText = errorData ? JSON.stringify(errorData) : 'Unable to update client.';
            throw new Error(errorText);
        }
        return await res.json().catch(() => ({}));
    }

    async function deleteClient(id) {
        const res = await fetch(`/api/clients/${id}/`, {
            method: 'DELETE',
            headers: { 'X-CSRFToken': getCsrfToken() }
        });
        if (!res.ok) throw new Error('Unable to delete client.');
    }

    async function updateClientActive(id, isActive) {
        const res = await fetch(`/api/clients/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken()
            },
            body: JSON.stringify({ is_active: isActive })
        });
        if (!res.ok) throw new Error('Unable to update client.');
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
