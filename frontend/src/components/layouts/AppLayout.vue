<script setup lang="ts">
  import Sidebar from "../includes/Sidebar.vue";
  import MobileHeader from "../includes/MobileHeader.vue";
</script>

<template>
  <div class="flex h-screen">
    <Sidebar />
    <main class="flex-1 overflow-y-auto relative">
      <MobileHeader />
      <div class="p-6 lg:p-10 max-w-7xl mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>