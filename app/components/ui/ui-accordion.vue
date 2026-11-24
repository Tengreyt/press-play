<script setup lang="ts">
import IconChevron from '~/assets/icons/chevron.svg';

withDefaults(defineProps<{ title: string; initiallyOpen?: boolean }>(), { initiallyOpen: false });
</script>

<template>
  <details class="ui-accordion" :open="initiallyOpen || undefined">
    <summary class="ui-accordion__summary">
      <span>{{ title }}</span>
      <IconChevron aria-hidden="true" />
    </summary>
    <div class="ui-accordion__body">
      <slot />
    </div>
  </details>
</template>

<style scoped lang="scss">
.ui-accordion {
  border: 1px solid $color-border;
  border-radius: $radius-md;
  background: $color-surface;
  transition: border-color $transition-fast;

  &:hover, &[open] {
    border-color: $color-lavender;
  }

  &[open] .ui-accordion__summary svg {
    transform: rotate(180deg);
  }
}

.ui-accordion__summary {
  display: flex;
  min-height: 3.75rem;
  align-items: center;
  justify-content: space-between;
  gap: $gap-md;
  padding: $gap-md $gap-lg;
  border-radius: $radius-md;
  cursor: pointer;
  font-size: 1.0625rem;
  font-weight: 680;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
    flex: none;
    color: $color-lavender;
    transition: transform $transition-fast;
  }
}

.ui-accordion__body {
  padding: 0 $gap-lg $gap-lg;
  color: $color-muted;
}
</style>
