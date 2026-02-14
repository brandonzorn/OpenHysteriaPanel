<script setup lang="ts">
const emit = defineEmits<{ (e: "clients:newClient"): void }>();
</script>

<template>
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h2 class="text-3xl font-bold text-white">VPN Clients</h2>
      <p class="text-gray-400 mt-1">Manage user access and bandwidth limits.</p>
    </div>

    <button class="btn-primary inline-flex items-center px-4 py-2 rounded-xl" type="button"
      @click="emit('clients:newClient')">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      New Client
    </button>
  </div>
</template>