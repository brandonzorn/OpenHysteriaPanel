(() => {
    const state = {
        clientsById: new Map(),
        editingId: null,
        deleteId: null,
    };

    const elements = {};
    const $ = (sel, root = document) => root.querySelector(sel);

    function cacheElements() {
        elements.body = document.getElementById('clientsBody');
        elements.emptyRow = document.getElementById('clientsEmptyRow');
        elements.rowTpl = document.getElementById('clientRowTpl');
        elements.refreshButton = document.getElementById('refreshClients');
        elements.newClientButton = document.getElementById('newClientButton');
        elements.i18n = document.getElementById('clientI18n');
        elements.modalTitle = document.getElementById('clientModalTitle');
        elements.modal = document.getElementById('clientModal');
        elements.modalPanel = document.getElementById('clientModalPanel');
        elements.modalClose = document.getElementById('clientModalClose');
        elements.deleteModal = document.getElementById('deleteModal');
        elements.deleteModalPanel = document.getElementById('deleteModalPanel');
        elements.deleteModalClose = document.getElementById('deleteModalClose');
        elements.deleteModalCancel = document.getElementById('deleteModalCancel');
        elements.deleteModalConfirm = document.getElementById('deleteModalConfirm');
        elements.form = document.getElementById('clientForm');
        elements.formError = document.getElementById('clientFormError');
        elements.cancelButton = document.getElementById('clientCancel');
        elements.submitButton = document.getElementById('clientSubmit');
        elements.inputUsername = document.getElementById('clientUsername');
        elements.inputPassword = document.getElementById('clientPassword');
        elements.generatePasswordButton = document.getElementById('generatePasswordButton');
        elements.inputUpload = document.getElementById('clientUpload');
        elements.inputDownload = document.getElementById('clientDownload');
        elements.inputTraffic = document.getElementById('clientTraffic');
        elements.inputExpires = document.getElementById('clientExpires');
        elements.inputActive = document.getElementById('clientActive');
        elements.configModal = document.getElementById('configModal');
        elements.configModalPanel = document.getElementById('configModalPanel');
        elements.configModalClose = document.getElementById('configModalClose');
        elements.configModalOk = document.getElementById('configModalOk');
        elements.configText = document.getElementById('configText');
        elements.configCopyArea = document.getElementById('configCopyArea');
        elements.configCopyBtn = document.getElementById('configCopyBtn');
        elements.configCopyHint = document.getElementById('configCopyHint');
        elements.configImportLink = document.getElementById('configImportLink');
    }

    function getLabel(key) {
        const fallback = '_';
        if (!elements.i18n) return fallback;
        return elements.i18n.dataset[key] || fallback;
    }

    function setLoading(isLoading) {
        if (!elements.refreshButton) return;
        elements.refreshButton.classList.toggle('animate-spin', isLoading);
        elements.refreshButton.disabled = isLoading;
    }

    function setFormError(message) {
        if (!elements.formError) return;
        elements.formError.textContent = message || '';
        elements.formError.classList.toggle('hidden', !message);
    }

    function setModalLabels(isEditing) {
        if (elements.modalTitle) {
            elements.modalTitle.textContent = isEditing ? getLabel('editTitle') : getLabel('createTitle');
        }
        if (elements.submitButton) {
            elements.submitButton.textContent = isEditing ? getLabel('editLabel') : getLabel('createLabel');
        }
    }

    function applyStatusStyles(statusBadge, statusDot, statusText, isActive) {
        statusBadge.classList.toggle('is-active', isActive);
        statusText.textContent = isActive ? getLabel('activeLabel') : getLabel('disabledLabel');
    }

    function applyToggleStyles(track, knob, isActive) {
        track.className = `client-toggle-track w-10 h-5 rounded-full relative transition ${isActive ? 'bg-green-500/30' : 'bg-gray-700'}`;
        knob.className = `client-toggle-knob w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform ${isActive ? 'translate-x-5' : ''}`;
    }

    function formatInputDate(value) {
        if (!value) return '';
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return '';
        const pad = (n) => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    }

    function toIsoDateFromInput(dateStr) {
        if (!dateStr) return null;
        const d = new Date(`${dateStr}T00:00:00`);
        if (Number.isNaN(d.getTime())) return null;
        return d.toISOString();
    }

    const modalOpenClass = ['opacity-100'];
    const modalCloseClass = ['pointer-events-none', 'opacity-0'];
    const panelOpenClass = ['translate-y-0', 'scale-100'];
    const panelCloseClass = ['translate-y-4', 'scale-95'];

    function openModal(modalEl, panelEl) {
        if (!modalEl) return;
        modalEl.classList.remove(...modalCloseClass);
        modalEl.classList.add(...modalOpenClass);
        if (panelEl) {
            panelEl.classList.remove(...panelCloseClass);
            panelEl.classList.add(...panelOpenClass);
        }
    }

    function closeModal(modalEl, panelEl) {
        if (!modalEl) return;
        modalEl.classList.add(...modalCloseClass);
        modalEl.classList.remove(...modalOpenClass);
        if (panelEl) {
            panelEl.classList.add(...panelCloseClass);
            panelEl.classList.remove(...panelOpenClass);
        }
    }

    async function copyToClipboard(value) {
        const text = String(value ?? '');
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            return ok;
        }
    }

    function setCopyHint(message) {
        if (!elements.configCopyHint) return;
        elements.configCopyHint.textContent = message || '';
    }

    function openConfigModal(hysteriaUrl) {
        if (!elements.configModal || !elements.configModalPanel) return;
        if (elements.configText) elements.configText.textContent = hysteriaUrl || '';
        importLink = `v2raytun://import/${encodeURIComponent(hysteriaUrl || '')}`
        if (elements.configImportLink) elements.configImportLink.href = importLink || '';


        setCopyHint('');
        openModal(elements.configModal, elements.configModalPanel);
    }

    function closeConfigModal() {
        if (!elements.configModal || !elements.configModalPanel) return;
        closeModal(elements.configModal, elements.configModalPanel);
        setCopyHint('');
    }

    async function copyConfigFromModal() {
        const url = elements.configText?.textContent?.trim() || '';
        if (!url) return;
        const ok = await copyToClipboard(url);
        setCopyHint(ok ? '✓ Copied' : 'Copy failed');
    }

    function generatePassword(length = 12) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const max = charset.length;
        let result = "";

        if (window.crypto && window.crypto.getRandomValues) {
            const values = new Uint32Array(length);
            window.crypto.getRandomValues(values);
            for (let i = 0; i < values.length; i += 1) result += charset[values[i] % max];
            return result;
        }

        for (let i = 0; i < length; i += 1) result += charset[Math.floor(Math.random() * max)];
        return result;
    }

    window.Clients = {
        state,
        elements,
        $,
        cacheElements,
        getLabel,
        setLoading,
        setFormError,
        setModalLabels,
        applyStatusStyles,
        applyToggleStyles,
        formatInputDate,
        toIsoDateFromInput,
        openModal,
        closeModal,
        copyToClipboard,
        openConfigModal,
        closeConfigModal,
        copyConfigFromModal,
        generatePassword,
    };
})();
