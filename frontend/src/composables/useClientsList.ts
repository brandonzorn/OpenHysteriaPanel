import { onBeforeUnmount, onMounted, proxyRefs, ref } from "vue";
import type { Ref } from "vue";
import { Client } from "../shared/types/client";
import { updateClientActiveById, getClients, deleteClientById } from "../shared/api/clients";

export type ClientActionModals = {
    createOpen: Ref<boolean>;
    configOpen: Ref<boolean>;
    editOpen: Ref<boolean>;
    deleteOpen: Ref<boolean>;
    selected: Ref<Client | null>;
};

export function useClientActions() {
    const clients = ref<Client[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    const createOpen = ref(false);
    const configOpen = ref(false);
    const editOpen = ref(false);
    const deleteOpen = ref(false);
    const selected = ref<Client | null>(null);

    let controller: AbortController | null = null;

    async function refresh() {
        controller?.abort();
        controller = new AbortController();

        try {
            error.value = null;
            clients.value = await getClients(controller.signal);
        } catch (e: any) {
            if (e?.name !== "AbortError") {
                error.value = e?.message ?? "Unknown error";
                console.error("Clients error", e);
            }
        } finally {
            loading.value = false;
        }
    }

    function openCreate() {
    }

    function openConfig(c: Client) {
    }

    function openEdit(c: Client) {
    }

    function openDelete(c: Client) {
    }

    async function toggleClient(c: Client, next: boolean) {
        await updateClientActiveById(c.id, next)
        refresh();
    }

    async function deleteClient(c: Client) {
        await deleteClientById(c.id)
        refresh();
    }

    onMounted(refresh);
    onBeforeUnmount(() => controller?.abort());

    return proxyRefs({
        clients,
        loading,
        error,
        createOpen,
        configOpen,
        editOpen,
        deleteOpen,
        selected,

        openCreate,
        openConfig,
        openEdit,
        openDelete,

        toggleClient,
        deleteClient,

    });
}
