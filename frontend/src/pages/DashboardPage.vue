<script setup lang="ts">
import AppLayout from "../components/layouts/AppLayout.vue"
import DashboardHeader from "../components/dashboard/DashboardHeader.vue";
import StatusCards from "../components/dashboard/StatusCards.vue";
import NetworkChart from "../components/dashboard/NetworkChart.vue";

import { useDashboard } from "../composables/useDashboard";

const { stats, loading, error, refresh } = useDashboard(2000);
</script>

<template>
  <AppLayout>
    <div class="space-y-6">
      <DashboardHeader />
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
        <StatusCards :stats="stats" />
      </div>
      <NetworkChart :netStats="stats.netStats" />
    </div>
  </AppLayout>
</template>