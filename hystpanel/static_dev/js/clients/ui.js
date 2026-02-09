(() => {
    const C = window.Clients;
    const api = C.api;
    const INFINITE_LABEL = '\u221e';
    let trafficOverflowRaf = null;

    function isOverflowing(el) {
        return el.scrollWidth - el.clientWidth > 1;
    }

    function updateTrafficOverflow(row) {
        const line = row.querySelector('[data-traffic-line]');
        const infoBtn = row.querySelector('[data-traffic-info-button]');
        if (!line || !infoBtn) return;

        const wasHidden = line.classList.contains('hidden');
        if (wasHidden) line.classList.remove('hidden');

        const overflow = isOverflowing(line);
        line.classList.toggle('hidden', overflow);
        infoBtn.classList.toggle('hidden', !overflow);
    }

    function syncTrafficOverflow() {
        if (!C.elements.body) return;
        const rows = C.elements.body.querySelectorAll('tr');
        rows.forEach(updateTrafficOverflow);
    }

    function queueTrafficOverflowSync() {
        if (trafficOverflowRaf) return;
        trafficOverflowRaf = requestAnimationFrame(() => {
            trafficOverflowRaf = null;
            syncTrafficOverflow();
        });
    }

    function renderClients(clients) {
        const body = C.elements.body;
        const emptyRow = C.elements.emptyRow;
        const tpl = C.elements.rowTpl;

        if (!body || !emptyRow || !tpl) return;

        body.textContent = '';
        C.state.clientsById.clear();

        if (!clients || !clients.length) {
            emptyRow.classList.remove('hidden');
            return;
        }
        emptyRow.classList.add('hidden');

        const frag = document.createDocumentFragment();

        for (const client of clients) {
            const id = String(client.id);
            C.state.clientsById.set(id, client);

            const row = tpl.content.firstElementChild.cloneNode(true);
            row.dataset.clientId = id;

            row.querySelector('[data-avatar-letter]').textContent = (client.username?.[0] || '?').toUpperCase();
            row.querySelector('[data-username]').textContent = client.username || '';

            const used = Number(client.traffic_used_gb ?? 0);
            const limit = Number(client.traffic_limit_gb ?? 0);
            const limitDisplay = limit > 0 ? `${limit} GB` : INFINITE_LABEL;
            const trafficText = `${used} / ${limitDisplay}`;

            row.querySelector('[data-traffic-used]').textContent = String(used);
            row.querySelector('[data-traffic-limit]').textContent = limitDisplay;

            const trafficInfoButton = row.querySelector('[data-traffic-info-button]');
            const trafficInfoText = row.querySelector('[data-traffic-info-text]');
            if (trafficInfoButton) {
                trafficInfoButton.title = trafficText;
                trafficInfoButton.setAttribute('aria-label', trafficText);
            }
            if (trafficInfoText) trafficInfoText.textContent = trafficText;

            const barWrap = row.querySelector('[data-traffic-bar-wrap]');
            const bar = row.querySelector('[data-traffic-bar]');
            if (limit > 0) {
                barWrap.classList.remove('hidden');
                const pct = Math.min(100, Math.round((used / limit) * 100));
                bar.style.width = `${pct}%`;
            } else {
                barWrap.classList.add('hidden');
                bar.style.width = '0%';
            }

            const up = client.upload_limit_mbps ? String(client.upload_limit_mbps) : INFINITE_LABEL;
            const down = client.download_limit_mbps ? String(client.download_limit_mbps) : INFINITE_LABEL;
            row.querySelector('[data-upload]').textContent = up;
            row.querySelector('[data-download]').textContent = down;

            const isActive = !!client.is_active;
            const statusBadge = row.querySelector('.client-status-badge');
            const statusDot = row.querySelector('.client-status-dot');
            const statusText = row.querySelector('.client-status-text');
            C.applyStatusStyles(statusBadge, statusDot, statusText, isActive);

            const toggle = row.querySelector('input[data-action="toggle"]');
            const track = row.querySelector('.client-toggle-track');
            const knob = row.querySelector('.client-toggle-knob');

            toggle.checked = isActive;
            C.applyToggleStyles(track, knob, isActive);

            const editBtn = row.querySelector('[data-icon="edit"]');
            const delBtn = row.querySelector('[data-icon="delete"]');

            frag.appendChild(row);
        }
        body.appendChild(frag);
    }

    async function refreshClients() {
        try {
            const clients = await api.listClients();
            renderClients(clients);
        } catch (e) {
            console.error('Clients error', e);
        }
    }

    function openCreateModal() {
        C.state.editingId = null;
        C.setModalLabels(false);
        C.setFormError('');

        if (C.elements.form) C.elements.form.reset();
        if (C.elements.inputActive) C.elements.inputActive.checked = true;

        C.openModal(C.elements.modal, C.elements.modalPanel);
        C.elements.inputUsername?.focus?.();
    }

  function openEditModal(client) {
    if (!client) return;

    C.state.editingId = String(client.id);
    C.setModalLabels(true);
    C.setFormError('');

    if (C.elements.inputUsername) C.elements.inputUsername.value = client.username || '';
    if (C.elements.inputPassword) C.elements.inputPassword.value = client.password || '';
    if (C.elements.inputUpload) C.elements.inputUpload.value = client.upload_limit_mbps || 0;
    if (C.elements.inputDownload) C.elements.inputDownload.value = client.download_limit_mbps || 0;
    if (C.elements.inputTraffic) C.elements.inputTraffic.value = client.traffic_limit_gb || 0;
    if (C.elements.inputExpires) C.elements.inputExpires.value = C.formatInputDate(client.expires_at);
    if (C.elements.inputActive) C.elements.inputActive.checked = !!client.is_active;

    C.openModal(C.elements.modal, C.elements.modalPanel);
    C.elements.inputUsername?.focus?.();
  }

  function closeCreateEditModal() {
    C.closeModal(C.elements.modal, C.elements.modalPanel);
    C.state.editingId = null;
    C.setModalLabels(false);
    C.setFormError('');

    if (C.elements.form) C.elements.form.reset();
    if (C.elements.inputActive) C.elements.inputActive.checked = true;
  }

  function openDeleteModal(clientId) {
    C.state.deleteId = String(clientId);
    C.openModal(C.elements.deleteModal, C.elements.deleteModalPanel);
  }

  function closeDeleteModal() {
    C.closeModal(C.elements.deleteModal, C.elements.deleteModalPanel);
    C.state.deleteId = null;
  }

  // ---------- Actions ----------
  async function handleCreateOrUpdate(payload) {
    try {
      if (C.state.editingId) {
        await api.updateClient(C.state.editingId, payload);
      } else {
        await api.createClient(payload);
      }
      closeCreateEditModal();
      await refreshClients();
    } catch (e) {
      C.setFormError(e.message);
    }
  }

  async function handleDeleteClient(id) {
    try {
      await api.deleteClient(id);
      await refreshClients();
    } catch (e) {
      alert('Error deleting client');
    }
  }

  function updateRowActiveUi(row, isActive) {
    if (!row) return;

    const statusBadge = row.querySelector('.client-status-badge');
    const statusDot = row.querySelector('.client-status-dot');
    const statusText = row.querySelector('.client-status-text');
    const track = row.querySelector('.client-toggle-track');
    const knob = row.querySelector('.client-toggle-knob');

    if (statusBadge && statusDot && statusText) {
      C.applyStatusStyles(statusBadge, statusDot, statusText, isActive);
    }
    if (track && knob) {
      C.applyToggleStyles(track, knob, isActive);
    }
  }

  async function handleToggleActive(clientId, isActive, row, inputEl) {
    try {
      await api.updateClientActive(clientId, isActive);
      updateRowActiveUi(row, isActive);
    } catch (e) {
      inputEl.checked = !isActive;
      updateRowActiveUi(row, !isActive);
      alert('Error updating client');
    }
  }

  function buildHysteriaUrl(client) {
    const ds = document.body?.dataset || {};

    const host = ds.hysteriaHost || location.hostname;
    const port = ds.hysteriaPort || '7443';
    const sni = ds.hysteriaSni || host;

    const username = encodeURIComponent(client.username || '');
    const password = encodeURIComponent(client.password || '');

    const params = new URLSearchParams();
    if (sni) params.set('sni', sni);
    params.set('alpn', 'h3');

    return `hysteria2://${username}:${password}@${host}:${port}/?${params.toString()}`;
  }

  function initClients() {
    C.cacheElements();
    if (!C.elements.body) return;

    // labels based on i18n dataset
    C.setModalLabels(false);

    // Header actions
    C.elements.newClientButton?.addEventListener('click', openCreateModal);
    C.elements.refreshButton?.addEventListener('click', refreshClients);

    // Modal close/cancel
    C.elements.modalClose?.addEventListener('click', closeCreateEditModal);
    C.elements.cancelButton?.addEventListener('click', closeCreateEditModal);

    // Password generator
    C.elements.generatePasswordButton?.addEventListener('click', () => {
      if (!C.elements.inputPassword) return;
      C.elements.inputPassword.value = C.generatePassword();
      C.elements.inputPassword.focus();
      C.elements.inputPassword.select();
    });

    // Delete modal buttons
    C.elements.deleteModalClose?.addEventListener('click', closeDeleteModal);
    C.elements.deleteModalCancel?.addEventListener('click', closeDeleteModal);
    C.elements.deleteModalConfirm?.addEventListener('click', () => {
      if (!C.state.deleteId) return;
      const id = C.state.deleteId;
      closeDeleteModal();
      handleDeleteClient(id);
    });

    // Click outside modals
    C.elements.modal?.addEventListener('click', (e) => {
      if (e.target === C.elements.modal) closeCreateEditModal();
    });
    C.elements.deleteModal?.addEventListener('click', (e) => {
      if (e.target === C.elements.deleteModal) closeDeleteModal();
    });

    // Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCreateEditModal();
        closeDeleteModal();
      }
    });

    // Form submit
    C.elements.form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = C.elements.inputUsername?.value?.trim() || '';
      const password = C.elements.inputPassword?.value?.trim() || '';

      if (!username || !password) {
        C.setFormError('Username and password are required.');
        return;
      }

      const payload = {
        username,
        password,
        upload_limit_mbps: Number(C.elements.inputUpload?.value || 0),
        download_limit_mbps: Number(C.elements.inputDownload?.value || 0),
        traffic_limit_gb: Number(C.elements.inputTraffic?.value || 0),
        expires_at: C.toIsoDateFromInput(C.elements.inputExpires?.value || ''),
        is_active: !!C.elements.inputActive?.checked,
      };

      C.setFormError('');
      handleCreateOrUpdate(payload);
    });

    // TABLE: delegation
    C.elements.body.addEventListener('click', async (e) => {
      const actionEl = e.target.closest('[data-action]');
      if (!actionEl) return;

      const row = actionEl.closest('tr');
      const clientId = row?.dataset?.clientId;
      if (!clientId) return;

      const action = actionEl.dataset.action;

      if (action === 'config') {
        const cached = C.state.clientsById.get(String(clientId));
        if (!cached) return;
        if (cached.password === undefined) {
          try {
            const full = await api.getClient(clientId);
            if (!full) return;
            C.openConfigModal(buildHysteriaUrl(full));
          } catch {
            alert('Error loading client');
          }
          return;
        }

        C.openConfigModal(buildHysteriaUrl(cached));
        return;
      }

      if (action === 'delete') {
        openDeleteModal(clientId);
        return;
      }

      if (action === 'edit') {
        const cached = C.state.clientsById.get(String(clientId));
        // Если password не пришёл в list — дотянем по getClient
        if (cached && cached.password !== undefined) {
          openEditModal(cached);
          return;
        }
        try {
          const full = await api.getClient(clientId);
          if (full) openEditModal(full);
        } catch {
          alert('Error loading client');
        }
      }
    });

    C.elements.body.addEventListener('change', (e) => {
      const input = e.target;
      if (!(input instanceof HTMLInputElement)) return;
      if (input.dataset.action !== 'toggle') return;

      const row = input.closest('tr');
      const clientId = row?.dataset?.clientId;
      if (!clientId) return;

      // optimistic UI
      updateRowActiveUi(row, input.checked);
      handleToggleActive(clientId, input.checked, row, input);
    });

    C.elements.configModalClose?.addEventListener('click', C.closeConfigModal);
    C.elements.configModalOk?.addEventListener('click', C.closeConfigModal);

    C.elements.configCopyArea?.addEventListener('click', C.copyConfigFromModal);
    C.elements.configCopyBtn?.addEventListener('click', C.copyConfigFromModal);

    C.elements.configModal?.addEventListener('click', (e) => {
      if (e.target === C.elements.configModal) C.closeConfigModal();
    });

    refreshClients();
  }

  C.init = initClients;
})();
