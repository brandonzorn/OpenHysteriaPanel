(() => {
    const state = {
        stats: { cpu: 0, ram: 0, disk: 0, swap: 0, uptime: 0, hysteria_status: 'loading...', active_clients_count: 0 },
        chartInstance: null,
        chartDataPoints: 20,
        lastNetSample: null,
    };

    const elements = {};

    function cacheElements() {
        elements.cpu = document.getElementById('statCpu');
        elements.cpuCoresValue = document.getElementById('statCpuCoresValue');
        elements.cpuThreadsValue = document.getElementById('statCpuThreadsValue');
        elements.ram = document.getElementById('statRam');
        elements.ramValue = document.getElementById('statRamValue');
        elements.disk = document.getElementById('statDisk');
        elements.diskValue = document.getElementById('statDiskValue');
        elements.swap = document.getElementById('statSwap');
        elements.swapValue = document.getElementById('statSwapValue');
        elements.uptime = document.getElementById('statUptime');
        elements.activeClients = document.getElementById('statActiveClients');
        elements.cpuBar = document.getElementById('cpuBar');
        elements.ramBar = document.getElementById('ramBar');
        elements.diskBar = document.getElementById('diskBar');
        elements.swapBar = document.getElementById('swapBar');
        elements.netInText = document.getElementById('netInText');
        elements.netOutText = document.getElementById('netOutText');
        elements.hysteriaDot = document.getElementById('hysteriaStatusDot');
        elements.hysteriaText = document.getElementById('hysteriaStatusText');
        elements.restartButton = document.getElementById('restartServerButton');
    }

    function formatBytesToGb(bytes) {
        if (typeof bytes !== 'number') return '';
        const gb = bytes / (1024 ** 3);
        return `${gb.toFixed(1)} GB`;
    }

    function formatUsageValue(used, total) {
        if (typeof used !== 'number' || typeof total !== 'number') {
            return '';
        }
        return `${formatBytesToGb(used)} / ${formatBytesToGb(total)}`;
    }

    function formatUptime(seconds) {
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        let result = "";
        if (d > 0) result += `${d}d `;
        result += `${h}h ${m}m`;
        return result;
    }

    function updateStatusIndicator(status) {
        if (!elements.hysteriaDot || !elements.hysteriaText) return;
        const isRunning = status === 'running';
        elements.hysteriaText.textContent = status;
        elements.hysteriaDot.classList.toggle('bg-green-500', isRunning);
        elements.hysteriaDot.classList.toggle('bg-red-500', !isRunning);
        elements.hysteriaDot.classList.toggle('shadow-[0_0_10px_rgba(34,197,94,0.5)]', isRunning);
        elements.hysteriaDot.classList.toggle('shadow-[0_0_10px_rgba(239,68,68,0.5)]', !isRunning);
    }

    function updateStats(stats) {
        state.stats = stats;
        if (elements.cpu) elements.cpu.textContent = `${stats.cpu}%`;
        if (elements.cpuCoresValue) {
            const coresText = typeof stats.cpu_cores === 'number' ? `${stats.cpu_cores}` : '0';
            elements.cpuCoresValue.textContent = coresText;
        }
        if (elements.cpuThreadsValue) {
            const threadsText = typeof stats.cpu_threads === 'number' ? `${stats.cpu_threads}` : '0';
            elements.cpuThreadsValue.textContent = threadsText;
        }
        if (elements.ram) elements.ram.textContent = `${stats.ram}%`;
        if (elements.ramValue) elements.ramValue.textContent = formatUsageValue(stats.ram_used, stats.ram_total);
        if (elements.disk) elements.disk.textContent = `${stats.disk}%`;
        if (elements.diskValue) elements.diskValue.textContent = formatUsageValue(stats.disk_used, stats.disk_total);
        if (elements.swap) elements.swap.textContent = `${stats.swap}%`;
        if (elements.swapValue) elements.swapValue.textContent = formatUsageValue(stats.swap_used, stats.swap_total);
        if (elements.uptime) elements.uptime.textContent = formatUptime(stats.uptime);
        if (elements.activeClients) elements.activeClients.textContent = String(stats.active_clients_count);
        if (elements.cpuBar) elements.cpuBar.style.width = `${stats.cpu}%`;
        if (elements.ramBar) elements.ramBar.style.width = `${stats.ram}%`;
        if (elements.diskBar) elements.diskBar.style.width = `${stats.disk}%`;
        if (elements.swapBar) elements.swapBar.style.width = `${stats.swap}%`;
        updateStatusIndicator(stats.hysteria_status);
    }

    function setNetText(rxMbps, txMbps) {
        if (elements.netInText) elements.netInText.textContent = `${rxMbps.toFixed(2)} Mbps`;
        if (elements.netOutText) elements.netOutText.textContent = `${txMbps.toFixed(2)} Mbps`;
    }

    window.Dashboard = {
        state,
        elements,
        cacheElements,
        updateStats,
        setNetText,
    };
})();
