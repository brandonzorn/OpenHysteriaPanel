(() => {
    const state = {
        clientsById: new Map(),
        editingId: null,
        deleteId: null,
    };

    const elements = {};

    function cacheElements() {
        elements.body = document.getElementById('clientsBody');
        elements.emptyRow = document.getElementById('clientsEmptyRow');
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
        elements.inputUpload = document.getElementById('clientUpload');
        elements.inputDownload = document.getElementById('clientDownload');
        elements.inputTraffic = document.getElementById('clientTraffic');
        elements.inputExpires = document.getElementById('clientExpires');
        elements.inputActive = document.getElementById('clientActive');
    }

    function getLabel(key, fallback) {
        if (!elements.i18n) return fallback;
        return elements.i18n.dataset[key] || fallback;
    }

    function createElement(tag, className, text) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text !== undefined) el.textContent = text;
        return el;
    }

    function applyStatusStyles(statusBadge, statusDot, statusText, isActive) {
        const statusClassBase = 'client-status-badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize';
        const statusClassActive = 'bg-green-500/10 text-green-400 border border-green-500/20';
        const statusClassInactive = 'bg-red-500/10 text-red-400 border border-red-500/20';
        statusBadge.className = `${statusClassBase} ${isActive ? statusClassActive : statusClassInactive}`;
        statusDot.className = `client-status-dot w-1.5 h-1.5 rounded-full mr-1.5 ${isActive ? 'bg-green-400' : 'bg-red-400'}`;
        statusText.textContent = isActive
            ? getLabel('activeLabel', 'Active')
            : getLabel('disabledLabel', 'Disabled');
        statusText.className = 'client-status-text';
    }

    function applyToggleStyles(track, knob, isActive) {
        track.className = `client-toggle-track w-10 h-5 rounded-full relative transition ${isActive ? 'bg-green-500/30' : 'bg-gray-700'}`;
        knob.className = `client-toggle-knob w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform ${isActive ? 'translate-x-5' : ''}`;
    }

    function formatInputDate(value) {
        if (!value) return '';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        const pad = (num) => String(num).padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    }

    function setLoading(isLoading) {
        if (!elements.refreshButton) return;
        elements.refreshButton.classList.toggle('animate-spin', isLoading);
        elements.refreshButton.disabled = isLoading;
    }

    function setModalLabels(isEditing) {
        const title = isEditing
            ? getLabel('editTitle', 'Edit client')
            : getLabel('createTitle', 'Create client');
        const submitLabel = isEditing
            ? getLabel('updateSubmit', 'Update')
            : getLabel('createSubmit', 'Create');
        if (elements.modalTitle) elements.modalTitle.textContent = title;
        if (elements.submitButton) elements.submitButton.textContent = submitLabel;
    }

    function setFormError(message) {
        if (!elements.formError) return;
        elements.formError.textContent = message;
        elements.formError.classList.toggle('hidden', !message);
    }

    window.Clients = {
        state,
        elements,
        cacheElements,
        getLabel,
        createElement,
        applyStatusStyles,
        applyToggleStyles,
        formatInputDate,
        setLoading,
        setModalLabels,
        setFormError,
    };
})();
