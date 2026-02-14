<script setup lang="ts">
import type { Client } from "../../shared/types/client";
import ClientRow from "./ClientRow.vue";

defineProps<{
  actions: any;
  clients: Client[];
  loading: boolean;
  error: string | null;
}>();
</script>

<template>
  <div class="p-5 border-b border-white/10 flex justify-between items-center">
    <h3 class="text-lg font-semibold text-white">Registered Users</h3>

    <button class="btn-ghost p-2" type="button" @click="actions.refresh" :disabled="loading">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </button>
  </div>

  <div class="w-full overflow-x-auto">
    <table class="w-full text-left text-sm min-w-max">
      <thead class="bg-gray-900/50">
        <tr>
          <th class="table-th"><span class="table-th-content">User</span></th>
          <th class="table-th"><span class="table-th-content">Traffic</span></th>
          <th class="table-th"><span class="table-th-content">Speed Limits</span></th>
          <th class="table-th"><span class="table-th-content">Status</span></th>
          <th class="table-th"><span class="table-th-content">Actions</span></th>
        </tr>
      </thead>

      <tbody class="divide-y divide-white/5 text-gray-400">
        <tr v-if="error" class="client-row hover:bg-white/5 transition-colors">
          <td colspan="5" class="px-6 py-8 text-center text-red-400">
            {{ error }}
          </td>
        </tr>

        <tr v-else-if="loading" class="client-row hover:bg-white/5 transition-colors">
          <td colspan="5" class="px-6 py-8 text-center text-gray-400">
            Loading…
          </td>
        </tr>

        <tr v-else-if="!clients.length" class="client-row hover:bg-white/5 transition-colors">
          <td colspan="5" class="px-6 py-8 text-center text-gray-400">
            No clients found. Create one to get started.
          </td>
        </tr>

        <ClientRow
          v-for="c in clients"
          :key="c.username"
          :client="c"
          @toggle="(next) => actions.toggleClient(c, next)"
          @config="() => actions.openConfig(c)"
          @edit="() => actions.openEdit(c)"
          @delete="() => actions.openDelete(c)"
        />
      </tbody>
    </table>
  </div>
</template>
