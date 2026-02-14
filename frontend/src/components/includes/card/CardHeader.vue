<script setup lang="ts">
defineProps<{
  title: string
  iconPath: string
  blurColor: string
  textColor: string
}>()
</script>

<template>
  <div class="card-blur" :class="blurColor"></div>
  <dt class="card-stats-header">
    <div class="card-blur" :class="blurColor"></div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="card-stats-header-icon"
      :class="textColor"
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