<script setup lang="ts">
import { computed } from "vue";
import { COLOR_CLASSES, type Color } from "@/shared/types/statusCardColors";
import CardHeader from "./CardHeader.vue";

const props = defineProps<{
  title: string;
  iconPath: string;
  color: Color;

  justify?: "start" | "between";
}>();

const colorClasses = computed(() => COLOR_CLASSES[props.color]);
</script>

<template>
  <dl class="stats-card" :class="{'flex justify-between': justify === 'between'}">
    <div>
      <CardHeader :title="title" :iconPath="iconPath" :blurColor="colorClasses.blurStyle" :textColor="colorClasses.textStyle"/>
      <slot name="content"/>
    </div>
    <slot name="right"/>
  </dl>
</template>