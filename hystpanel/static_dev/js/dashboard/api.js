(() => {
    const D = window.Dashboard;

    async function fetchStats() {
        try {
            const res = await fetch('/api/dashboard/');
            if (res.ok) {
                const stats = await res.json();
                D.updateStats(stats);
                D.chart.updateChart(stats);
            }
        } catch (e) {
            console.error("Stats error", e);
        }
    }

    async function controlServer(action) {
        if (!confirm(`Are you sure you want to ${action} the server?`)) return;
        try {
            const res = await fetch(`/api/server/${action}/`, {
                method: 'POST',
                headers: { 'X-CSRFToken': getCsrfToken(), 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (data.success) {
                alert(`Command ${action} sent!`);
                fetchStats();
            }
        } catch (e) {
            alert('Error sending command');
        }
    }

    D.api = { fetchStats, controlServer };
})();
