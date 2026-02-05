(() => {
    if (!window.Clients || !window.Clients.init) return;
    document.addEventListener('DOMContentLoaded', window.Clients.init);
})();
