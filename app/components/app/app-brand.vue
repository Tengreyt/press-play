<script setup lang="ts">
import { brandName } from '~/utils/brand';

defineProps<{ compact?: boolean }>();
</script>

<template>
  <NuxtLink to="/" class="app-brand" :class="{ 'app-brand--compact': compact }" :aria-label="`${brandName}, главная`">
    <img src="/favicon.svg" width="40" height="40" alt="" class="app-brand__mark">
    <span>{{ brandName }}<span class="app-brand__dot" aria-hidden="true">.</span></span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.app-brand {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: clamp(0.5rem, 1.5vw, 0.75rem);
  color: $color-text;
  font-family: $font-brand;
  font-size: clamp(1.375rem, 4vw, 1.75rem);
  font-weight: 700;
  letter-spacing: -0.06em;
  line-height: 1;
}

.app-brand__mark {
  display: block;
  width: clamp(2rem, 4.5vw, 2.5rem);
  height: auto;
  flex: none;
}

.app-brand__dot {
  color: $color-accent;
}

.app-brand--compact {
  gap: $gap-xs;
  font-size: 1.2rem;

  .app-brand__mark {
    width: 1.5rem;
  }
}
</style>
