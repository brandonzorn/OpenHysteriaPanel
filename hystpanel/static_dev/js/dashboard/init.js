(() => {
    const D = window.Dashboard;

    function initDashboard() {
        D.cacheElements();
        D.chart.initChart();
        D.api.fetchStats();
        if (D.elements.restartButton) {
            D.elements.restartButton.addEventListener('click', () => D.api.controlServer('restart'));
        }
        setInterval(() => D.api.fetchStats(), 1500);
    }

    document.addEventListener('DOMContentLoaded', initDashboard);
})();
