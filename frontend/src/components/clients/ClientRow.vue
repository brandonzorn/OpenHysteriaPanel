<script setup lang="ts">
import type { Client } from '../../shared/types/client';

const props = defineProps<{
  client: Client;
}>();

const emit = defineEmits<{
  toggle: [next: boolean];
  config: [];
  edit: [];
  delete: [];
}>();

function statusClass(type: "ok" | "warn" | "off") {
  if (type === "ok") return "bg-emerald-500/15 text-emerald-300";
  if (type === "warn") return "bg-yellow-500/15 text-yellow-300";
  return "bg-gray-500/15 text-gray-300";
}
</script>

<template>
  <tr class="client-row hover:bg-white/5 transition-colors">
    <td class="client-td client-td-user">
      <span>{{ client.username }}</span>
    </td>

    <td class="client-td">
      {{ client.trafficText }}
    </td>

    <td class="client-td">
      ↑ {{ client.uploadText }}
      ↓ {{ client.downloadText }}
    </td>

    <td class="client-td">
      <div class="client-status-center">
        <span class="client-status-badge" :class="{'is-active': client.isActive}">
          <span class="client-status-dot"></span>
          <span class="client-status-text">{{ client.statusText }}</span>
        </span>
      </div>
    </td>

    <td class="client-td">
      <div class="client-actions">
        <label class="relative inline-flex items-center cursor-pointer">
          <input class="sr-only" type="checkbox" :checked="client.isActive"
            @change="emit('toggle', ($event.target as HTMLInputElement).checked)" />
          <span class="client-toggle-track w-10 h-5 rounded-full relative transition"
            :class="{ 'bg-green-500/30': client.isActive, 'bg-gray-700': !client.isActive }">
            <span
              class="client-toggle-knob w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"
              :class="{ 'translate-x-5': client.isActive }">
            </span>
          </span>
        </label>

        <button type="button" class="row-action-button hover:text-indigo-400" @click="emit('config')"
          aria-label="Config" title="Config">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </button>

        <button type="button" class="row-action-button hover:text-indigo-400" @click="emit('edit')" aria-label="Edit"
          title="Edit">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3zM4 20h16" />
          </svg>
        </button>

        <button type="button" class="row-action-button hover:text-red-400" @click="emit('delete')" aria-label="Delete"
          title="Delete">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-3h4m-4 0a1 1 0 00-1 1v1h6V5a1 1 0 00-1-1m-4 0h4" />
          </svg>
        </button>
      </div>
    </td>
  </tr>
</template>