<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue';
</script>

<template>
  <UiButton to="/" variant="secondary" class="app-home-link">
    <ArrowLeft :size="16" aria-hidden="true" />
    Назад
  </UiButton>
</template>

<style scoped lang="scss">
.app-home-link.ui-button {
  min-height: $touch-target;
  gap: 0.375rem;
  padding: $gap-xs $gap-sm;
}
</style>
