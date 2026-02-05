(() => {
    const C = window.Clients;
    const api = C.api;

    function renderClients(clients) {
        if (!C.elements.body || !C.elements.emptyRow) return;
        C.elements.body.innerHTML = '';
        C.state.clientsById.clear();

        if (!clients.length) {
            C.elements.emptyRow.classList.remove('hidden');
            return;
        }

        C.elements.emptyRow.classList.add('hidden');
        clients.forEach((client) => {
            C.state.clientsById.set(String(client.id), client);
            const trafficLimit = client.traffic_limit_gb > 0 ? `${client.traffic_limit_gb} GB` : '∞';
            const uploadLimit = client.upload_limit_mbps || '∞';
            const downloadLimit = client.download_limit_mbps || '∞';
            const trafficPercent = client.traffic_limit_gb > 0
                ? Math.min(100, Math.round((client.traffic_used_gb / client.traffic_limit_gb) * 100))
                : 0;

            const row = C.createElement('tr', 'hover:bg-white/5 transition-colors');

            const usernameCell = C.createElement('td', 'px-6 py-4 font-medium text-white flex items-center');
            const avatar = C.createElement('div', 'w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3 text-xs font-bold');
            const avatarText = C.createElement('span', '', client.username.charAt(0).toUpperCase());
            const usernameText = C.createElement('span', '', client.username);
            avatar.appendChild(avatarText);
            usernameCell.appendChild(avatar);
            usernameCell.appendChild(usernameText);

            const trafficCell = C.createElement('td', 'px-6 py-4');
            const trafficRow = C.createElement('div', 'flex items-center');
            trafficRow.appendChild(C.createElement('span', 'font-medium text-white', String(client.traffic_used_gb)));
            trafficRow.appendChild(C.createElement('span', 'mx-1 text-gray-500', '/'));
            trafficRow.appendChild(C.createElement('span', '', trafficLimit));
            trafficCell.appendChild(trafficRow);

            const trafficBarWrap = C.createElement('div', `w-24 h-1 bg-gray-700 rounded-full mt-2 ${client.traffic_limit_gb > 0 ? '' : 'hidden'}`);
            const trafficBar = C.createElement('div', 'bg-indigo-500 h-1 rounded-full');
            trafficBar.style.width = `${trafficPercent}%`;
            trafficBarWrap.appendChild(trafficBar);
            trafficCell.appendChild(trafficBarWrap);

            const speedCell = C.createElement('td', 'px-6 py-4 font-mono text-xs');
            const upRow = C.createElement('div');
            upRow.appendChild(C.createElement('span', '', '↑ '));
            upRow.appendChild(C.createElement('span', 'text-indigo-300', String(uploadLimit)));
            upRow.appendChild(C.createElement('span', '', ' Mbps'));
            const downRow = C.createElement('div');
            downRow.appendChild(C.createElement('span', '', '↓ '));
            downRow.appendChild(C.createElement('span', 'text-blue-300', String(downloadLimit)));
            downRow.appendChild(C.createElement('span', '', ' Mbps'));
            speedCell.appendChild(upRow);
            speedCell.appendChild(downRow);

            const statusCell = C.createElement('td', 'px-6 py-4');
            const statusWrap = C.createElement('div', 'flex items-center');
            const statusBadge = C.createElement('span');
            const statusDot = C.createElement('span');
            const statusText = C.createElement('span');
            C.applyStatusStyles(statusBadge, statusDot, statusText, client.is_active);
            statusBadge.appendChild(statusDot);
            statusBadge.appendChild(statusText);
            statusWrap.appendChild(statusBadge);
            statusCell.appendChild(statusWrap);

            const actionsCell = C.createElement('td', 'px-6 py-4 text-right space-x-2');
            const toggleLabel = C.createElement('label', 'inline-flex items-center cursor-pointer');
            const toggleInput = C.createElement('input', 'sr-only');
            toggleInput.type = 'checkbox';
            toggleInput.checked = client.is_active;
            toggleInput.dataset.clientId = client.id;
            toggleInput.dataset.action = 'toggle';
            toggleInput.setAttribute('aria-label', C.getLabel('toggleLabel', 'Toggle status'));
            const toggleTrack = C.createElement('div');
            const toggleKnob = C.createElement('div');
            C.applyToggleStyles(toggleTrack, toggleKnob, client.is_active);
            toggleTrack.appendChild(toggleKnob);
            toggleLabel.appendChild(toggleInput);
            toggleLabel.appendChild(toggleTrack);

            const editButton = C.createElement('button', 'p-1.5 text-gray-400 hover:text-indigo-400 hover:bg-white/5 rounded-lg transition');
            editButton.type = 'button';
            editButton.dataset.clientId = client.id;
            editButton.dataset.action = 'edit';
            editButton.setAttribute('title', C.getLabel('editLabel', 'Edit'));
            editButton.setAttribute('aria-label', C.getLabel('editLabel', 'Edit'));
            editButton.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3zM4 20h16"/></svg>';

            const deleteButton = C.createElement('button', 'p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition');
            deleteButton.type = 'button';
            deleteButton.dataset.clientId = client.id;
            deleteButton.dataset.action = 'delete';
            deleteButton.setAttribute('title', C.getLabel('deleteLabel', 'Delete'));
            deleteButton.setAttribute('aria-label', C.getLabel('deleteLabel', 'Delete'));
            deleteButton.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-3h4m-4 0a1 1 0 00-1 1v1h6V5a1 1 0 00-1-1m-4 0h4"/></svg>';

            actionsCell.appendChild(toggleLabel);
            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);

            row.appendChild(usernameCell);
            row.appendChild(trafficCell);
            row.appendChild(speedCell);
            row.appendChild(statusCell);
            row.appendChild(actionsCell);

            C.elements.body.appendChild(row);
        });
    }

    function openModal() {
        if (!C.elements.modal) return;
        C.elements.modal.classList.remove('pointer-events-none', 'opacity-0');
        C.elements.modal.classList.add('opacity-100');
        if (C.elements.modalPanel) {
            C.elements.modalPanel.classList.remove('translate-y-4', 'scale-95');
            C.elements.modalPanel.classList.add('translate-y-0', 'scale-100');
        }
        if (C.elements.formError) {
            C.elements.formError.textContent = '';
            C.elements.formError.classList.add('hidden');
        }
        if (C.elements.inputUsername) C.elements.inputUsername.focus();
    }

    function closeModal() {
        if (!C.elements.modal) return;
        C.elements.modal.classList.add('opacity-0', 'pointer-events-none');
        C.elements.modal.classList.remove('opacity-100');
        if (C.elements.modalPanel) {
            C.elements.modalPanel.classList.add('translate-y-4', 'scale-95');
            C.elements.modalPanel.classList.remove('translate-y-0', 'scale-100');
        }
        if (C.elements.form) C.elements.form.reset();
        if (C.elements.inputActive) C.elements.inputActive.checked = true;
        C.state.editingId = null;
        C.setModalLabels(false);
    }

    function openDeleteModal(clientId) {
        if (!C.elements.deleteModal) return;
        C.state.deleteId = clientId;
        C.elements.deleteModal.classList.remove('pointer-events-none', 'opacity-0');
        C.elements.deleteModal.classList.add('opacity-100');
        if (C.elements.deleteModalPanel) {
            C.elements.deleteModalPanel.classList.remove('translate-y-4', 'scale-95');
            C.elements.deleteModalPanel.classList.add('translate-y-0', 'scale-100');
        }
    }

    function closeDeleteModal() {
        if (!C.elements.deleteModal) return;
        C.elements.deleteModal.classList.add('opacity-0', 'pointer-events-none');
        C.elements.deleteModal.classList.remove('opacity-100');
        if (C.elements.deleteModalPanel) {
            C.elements.deleteModalPanel.classList.add('translate-y-4', 'scale-95');
            C.elements.deleteModalPanel.classList.remove('translate-y-0', 'scale-100');
        }
        C.state.deleteId = null;
    }

    function generatePassword(length = 12) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const max = charset.length;
        let result = "";
        if (window.crypto && window.crypto.getRandomValues) {
            const values = new Uint32Array(length);
            window.crypto.getRandomValues(values);
            for (let i = 0; i < values.length; i += 1) {
                result += charset[values[i] % max];
            }
            return result;
        }
        for (let i = 0; i < length; i += 1) {
            result += charset[Math.floor(Math.random() * max)];
        }
        return result;
    }

    async function refreshClients() {
        try {
            const clients = await api.listClients();
            renderClients(clients);
        } catch (e) {
            console.error("Clients error", e);
        }
    }

    async function handleDeleteClient(id) {
        try {
            await api.deleteClient(id);
            refreshClients();
        } catch (e) {
            alert('Error deleting client');
        }
    }

    async function handleUpdateActive(id, isActive, toggleInput) {
        try {
            await api.updateClientActive(id, isActive);
            const row = toggleInput.closest('tr');
            if (row) {
                const statusBadge = row.querySelector('.client-status-badge');
                const statusDot = row.querySelector('.client-status-dot');
                const statusText = row.querySelector('.client-status-text');
                const toggleTrack = row.querySelector('.client-toggle-track');
                const toggleKnob = row.querySelector('.client-toggle-knob');
                if (statusBadge && statusDot && statusText) {
                    C.applyStatusStyles(statusBadge, statusDot, statusText, isActive);
                }
                if (toggleTrack && toggleKnob) {
                    C.applyToggleStyles(toggleTrack, toggleKnob, isActive);
                }
            }
        } catch (e) {
            toggleInput.checked = !isActive;
            const row = toggleInput.closest('tr');
            if (row) {
                const toggleTrack = row.querySelector('.client-toggle-track');
                const toggleKnob = row.querySelector('.client-toggle-knob');
                if (toggleTrack && toggleKnob) {
                    C.applyToggleStyles(toggleTrack, toggleKnob, toggleInput.checked);
                }
            }
            alert('Error updating client');
        }
    }

    async function handleCreateOrUpdate(payload) {
        try {
            if (C.state.editingId) {
                await api.updateClient(C.state.editingId, payload);
            } else {
                await api.createClient(payload);
            }
            closeModal();
            refreshClients();
        } catch (e) {
            C.setFormError(e.message);
        }
    }

    function openEditModal(client) {
        if (!client) return;
        C.state.editingId = String(client.id);
        C.setModalLabels(true);
        if (C.elements.inputUsername) C.elements.inputUsername.value = client.username || '';
        if (C.elements.inputPassword) C.elements.inputPassword.value = client.password || '';
        if (C.elements.inputUpload) C.elements.inputUpload.value = client.upload_limit_mbps || 0;
        if (C.elements.inputDownload) C.elements.inputDownload.value = client.download_limit_mbps || 0;
        if (C.elements.inputTraffic) C.elements.inputTraffic.value = client.traffic_limit_gb || 0;
        if (C.elements.inputExpires) C.elements.inputExpires.value = C.formatInputDate(client.expires_at);
        if (C.elements.inputActive) C.elements.inputActive.checked = Boolean(client.is_active);
        openModal();
    }

    function initClients() {
        C.cacheElements();
        if (!C.elements.body) return;
        C.setModalLabels(false);

        if (C.elements.newClientButton) {
            C.elements.newClientButton.addEventListener('click', () => {
                C.state.editingId = null;
                C.setModalLabels(false);
                if (C.elements.form) C.elements.form.reset();
                if (C.elements.inputActive) C.elements.inputActive.checked = true;
                openModal();
            });
        }

        if (C.elements.modalClose) {
            C.elements.modalClose.addEventListener('click', closeModal);
        }
        if (C.elements.cancelButton) {
            C.elements.cancelButton.addEventListener('click', closeModal);
        }
        if (C.elements.generatePasswordButton) {
            C.elements.generatePasswordButton.addEventListener('click', () => {
                if (!C.elements.inputPassword) return;
                C.elements.inputPassword.value = generatePassword();
                C.elements.inputPassword.focus();
                C.elements.inputPassword.select();
            });
        }
        if (C.elements.deleteModalClose) {
            C.elements.deleteModalClose.addEventListener('click', closeDeleteModal);
        }
        if (C.elements.deleteModalCancel) {
            C.elements.deleteModalCancel.addEventListener('click', closeDeleteModal);
        }
        if (C.elements.deleteModalConfirm) {
            C.elements.deleteModalConfirm.addEventListener('click', () => {
                if (!C.state.deleteId) return;
                handleDeleteClient(C.state.deleteId);
                closeDeleteModal();
            });
        }
        if (C.elements.deleteModal) {
            C.elements.deleteModal.addEventListener('click', (event) => {
                if (event.target === C.elements.deleteModal) closeDeleteModal();
            });
        }
        if (C.elements.modal) {
            C.elements.modal.addEventListener('click', (event) => {
                if (event.target === C.elements.modal) closeModal();
            });
        }
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal();
                closeDeleteModal();
            }
        });

        if (C.elements.form) {
            C.elements.form.addEventListener('submit', (event) => {
                event.preventDefault();
                if (!C.elements.inputUsername || !C.elements.inputPassword) return;

                const payload = {
                    username: C.elements.inputUsername.value.trim(),
                    password: C.elements.inputPassword.value.trim(),
                    upload_limit_mbps: Number(C.elements.inputUpload?.value || 0),
                    download_limit_mbps: Number(C.elements.inputDownload?.value || 0),
                    traffic_limit_gb: Number(C.elements.inputTraffic?.value || 0),
                    expires_at: C.elements.inputExpires?.value
                        ? new Date(`${C.elements.inputExpires.value}T00:00:00`).toISOString()
                        : null,
                    is_active: Boolean(C.elements.inputActive?.checked),
                };

                if (!payload.username || !payload.password) {
                    C.setFormError('Username and password are required.');
                    return;
                }

                C.setFormError('');
                handleCreateOrUpdate(payload);
            });
        }

        if (C.elements.refreshButton) {
            C.elements.refreshButton.addEventListener('click', refreshClients);
        }

        C.elements.body.addEventListener('click', (event) => {
            const target = event.target;
            if (!(target instanceof Element)) return;
            const actionButton = target.closest('[data-action]');
            if (!actionButton) return;
            const clientId = actionButton.getAttribute('data-client-id');
            const action = actionButton.getAttribute('data-action');
            if (!clientId || !action) return;
            if (action === 'delete') {
                openDeleteModal(clientId);
                return;
            }
            if (action === 'edit') {
                const client = C.state.clientsById.get(String(clientId));
                if (client && client.password !== undefined) {
                    openEditModal(client);
                    return;
                }
                api.getClient(clientId)
                    .then((data) => data && openEditModal(data))
                    .catch(() => alert('Error loading client'));
            }
        });

        C.elements.body.addEventListener('change', (event) => {
            const target = event.target;
            if (!(target instanceof HTMLInputElement)) return;
            if (target.dataset.action !== 'toggle') return;
            const clientId = target.getAttribute('data-client-id');
            if (!clientId) return;
            const row = target.closest('tr');
            if (row) {
                const toggleTrack = row.querySelector('.client-toggle-track');
                const toggleKnob = row.querySelector('.client-toggle-knob');
                if (toggleTrack && toggleKnob) {
                    C.applyToggleStyles(toggleTrack, toggleKnob, target.checked);
                }
            }
            handleUpdateActive(clientId, target.checked, target);
        });

        refreshClients();
    }

    C.renderClients = renderClients;
    C.init = initClients;
})();
