import { onBeforeUnmount, onMounted, ref } from "vue";
import { fetchDashboardStats } from "../shared/api/dashboard";
import { DashboardStats } from "../shared/types/dashboardStats";


export function useDashboard(pollMs = 2000) {
    const stats = ref(new DashboardStats({}));
    const loading = ref(true);
    const error = ref<string | null>(null);

    let timer: number | null = null;
    let controller: AbortController | null = null;

    async function refresh() {
        controller?.abort();
        controller = new AbortController();

        try {
            error.value = null;
            stats.value = await fetchDashboardStats(controller.signal);
        } catch (e: any) {
            if (e?.name !== "AbortError") {
                error.value = e?.message ?? "Unknown error";
                console.error("Stats error", e);
            }
        } finally {
            loading.value = false;
        }
    }

    function start() {
        stop();
        refresh();
        timer = window.setInterval(refresh, pollMs);
    }

    function stop() {
        if (timer) window.clearInterval(timer);
        controller?.abort();
    }

    onMounted(start);
    onBeforeUnmount(stop);

    return { stats, loading, error, refresh };
}