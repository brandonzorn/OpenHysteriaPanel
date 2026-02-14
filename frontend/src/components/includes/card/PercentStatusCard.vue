<script setup lang="ts">
import { computed } from "vue";
import { COLOR_CLASSES, type Color } from "@/shared/types/statusCardColors";
import BaseStatusCard from "./BaseStatusCard.vue";

const props = defineProps<{
  title: string;
  iconPath: string;
  color: Color;

  statValue: string | number;
  subText: string;
}>();

const colorClasses = computed(() => COLOR_CLASSES[props.color]);

const widthStyle = computed(() => ({
  width: `${Math.max(0, Math.min(100, Number(props.statValue)))}%`,
}));
</script>

<template>
  <BaseStatusCard :title="title" :iconPath="iconPath" :color="color">
    <template #content>
      <dd class="mt-3">
        <div class="card-stats-value">{{ statValue }}%</div>
        <div class="card-stats-real">{{ subText }}</div>
      </dd>
      <div class="card-stats-bar-back">
        <div class="card-stats-bar" :class="[colorClasses.blurStyle, colorClasses.shadowStyle]" :style="widthStyle"></div>
      </div>
    </template>
  </BaseStatusCard>
</template>