<script setup lang="ts">
defineProps<{
  title: string
  iconPath: string
  iconColor?: string
  blurColor?: string
}>()
</script>

<template>
  <div v-if="blurColor" class="card-blur" :class="blurColor"></div>
  <dt class="card-stats-header">
    <div v-if="blurColor" class="card-blur" :class="blurColor"></div>
    <svg
      v-if="iconColor"
      xmlns="http://www.w3.org/2000/svg"
      class="card-stats-header-icon"
      :class="iconColor"
      fill="none"
      stroke-width="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" :d="iconPath"/>
    </svg>
    {{ title }}
  </dt>
</template>