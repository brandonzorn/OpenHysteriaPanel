<script setup lang="ts">
import AppLayout from "../components/layouts/AppLayout.vue"
import ClientsListHeader from "../components/clients/ClientsListHeader.vue";
import ClientsTable from "../components/clients/ClientsTable.vue";

import { useClientActions } from "../composables/useClientsList";

const actions = useClientActions();
</script>

<template>
  <AppLayout>
    <div class="space-y-6">
      <ClientsListHeader/>
      <div class="glass-card rounded-2xl overflow-hidden">
        <ClientsTable :actions="actions" :clients="actions.clients" :loading="actions.loading" :error="actions.error"/>
      </div>
    </div>
  </AppLayout>
</template>