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
  <BaseStatusCard :title="title" :iconPath="iconPath" :color="color">
    <template #content>
      <dd class="mt-3">
        <div class="card-stats-value">{{ statValue }}</div>
        <div v-if="subText != null" class="card-stats-real">{{ subText }}</div>
      </dd>
    </template>
  </BaseStatusCard>
</template>