(() => {
    const D = window.Dashboard;

    function initChart() {
        const canvas = document.getElementById('trafficChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const gradientIn = ctx.createLinearGradient(0, 0, 0, 400);
        gradientIn.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
        gradientIn.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

        const gradientOut = ctx.createLinearGradient(0, 0, 0, 400);
        gradientOut.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
        gradientOut.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

        D.state.chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Incoming Traffic (Mbps)',
                        data: [],
                        borderColor: '#6366f1',
                        backgroundColor: gradientIn,
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 0,
                    },
                    {
                        label: 'Outgoing Traffic (Mbps)',
                        data: [],
                        borderColor: '#3b82f6',
                        backgroundColor: gradientOut,
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 0,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { intersect: false, mode: 'index' },
                plugins: {
                    legend: { labels: { color: '#9ca3af', font: { family: 'Inter' } } },
                    tooltip: {
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#cbd5e1',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#6b7280', maxTicksLimit: 10 }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#6b7280', beginAtZero: true }
                    }
                }
            }
        });
    }

    function updateChart(stats) {
        if (!D.state.chartInstance) return;
        if (!stats || typeof stats.net_rx_bytes !== 'number' || typeof stats.net_tx_bytes !== 'number') return;

        const now = new Date();
        const timeLabel = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const nowMs = Date.now();
        let rxMbps = 0;
        let txMbps = 0;

        if (D.state.lastNetSample) {
            const deltaMs = Math.max(1, nowMs - D.state.lastNetSample.ts);
            const deltaRx = Math.max(0, stats.net_rx_bytes - D.state.lastNetSample.rx);
            const deltaTx = Math.max(0, stats.net_tx_bytes - D.state.lastNetSample.tx);
            rxMbps = (deltaRx * 8) / (deltaMs / 1000) / 1_000_000;
            txMbps = (deltaTx * 8) / (deltaMs / 1000) / 1_000_000;
        }

        D.state.lastNetSample = { rx: stats.net_rx_bytes, tx: stats.net_tx_bytes, ts: nowMs };

        D.state.chartInstance.data.labels.push(timeLabel);
        D.state.chartInstance.data.datasets[0].data.push(Number(rxMbps.toFixed(2)));
        D.state.chartInstance.data.datasets[1].data.push(Number(txMbps.toFixed(2)));

        D.setNetText(rxMbps, txMbps);

        if (D.state.chartInstance.data.labels.length > D.state.chartDataPoints) {
            D.state.chartInstance.data.labels.shift();
            D.state.chartInstance.data.datasets[0].data.shift();
            D.state.chartInstance.data.datasets[1].data.shift();
        }
        D.state.chartInstance.update('none');
    }

    D.chart = { initChart, updateChart };
})();
