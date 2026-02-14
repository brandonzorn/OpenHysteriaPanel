<script setup lang="ts">
import ButtonStatusCard from "../includes/card/ButtonStatusCard.vue";
import PercentStatusCard from "../includes/card/PercentStatusCard.vue";
import ValueStatusCard from "../includes/card/ValueStatusCard.vue";
import type { DashboardStats } from "../../shared/types/dashboardStats";
defineProps<{ stats: DashboardStats }>();
</script>

<template>
  <!-- CPU -->
  <PercentStatusCard
    title="CPU Usage"
    iconPath="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    color="indigo"
    :statValue="stats.cpuPercent"
    :subText="`${stats.cpuCores} Cores / ${stats.cpuThreads} Threads`"
  />

  <!-- RAM -->
  <PercentStatusCard
    title="RAM Usage"
    iconPath="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    color="blue"
    :statValue="stats.ramPercent"
    :subText="stats.ramText"
  />

  <!-- Disk -->
  <PercentStatusCard
    title="Disk Usage"
    iconPath="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm4 4h10M7 15h6"
    color="emerald"
    :statValue="stats.diskPercent"
    :subText="stats.diskText"
  />

  <!-- Swap -->
  <PercentStatusCard
    title="Swap Usage"
    iconPath="M12 8c-2.761 0-5 1.79-5 4s2.239 4 5 4 5-1.79 5-4-2.239-4-5-4zM5 12H3m18 0h-2m-7-9v2m0 14v2"
    color="cyan"
    :statValue="stats.swapPercent"
    :subText="stats.swapText"
  />

  <!-- Active Clients -->
  <ButtonStatusCard
    title="Active Clients"
    iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    color="green"
    :statValue="stats.activeClients"
  />

  <!-- Uptime -->
  <ValueStatusCard
    title="Server Uptime"
    iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    color="yellow"
    :statValue="stats.uptimeText"
  />
</template>