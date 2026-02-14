<script setup lang="ts">
import CardHeader from "../includes/card/CardHeader.vue";

</script>

<template>
  <dl class="stats-card">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      <CardHeader 
        title="Network Traffic History"
        iconPath="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
        textColor="text-indigo-400"
        blurColor="bg-indigo-500"
      />

      <dd>
        <div class="text-xs text-gray-400 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span><span class="text-indigo-300">In</span>: {{  }}</span>
          <span><span class="text-blue-300">Out</span>: {{  }}</span>
        </div>
      </dd>
    </div>

    <div class="h-80 w-full">
      <canvas id="trafficChart"></canvas>
    </div>
  </dl>
</template>
