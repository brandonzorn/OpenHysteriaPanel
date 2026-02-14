<script setup lang="ts">
import { type Color } from "@/shared/types/statusCardColors";
import BaseStatusCard from "./BaseStatusCard.vue";

const props = defineProps<{
  title: string;
  iconPath: string;
  color: Color;

  statValue: string | number;
  subText?: string;
}>();
</script>

<template>
  <BaseStatusCard :title="title" :iconPath="iconPath" :color="color" justify="between">
    <template #content>
      <dd class="mt-3">
        <div class="card-stats-value">{{ statValue }}</div>
        <div v-if="subText != null" class="card-stats-real">{{ subText }}</div>
      </dd>
    </template>
    <template #right>
      <button
        class="p-3 bg-gray-700/50 rounded-full hover:bg-gray-700 transition text-gray-300 flex self-center justify-center"
        type="button">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </template>
  </BaseStatusCard>
</template>