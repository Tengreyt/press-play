<script setup lang="ts">
withDefaults(defineProps<{
  to?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'dark';
}>(), {
  to: undefined,
  type: 'button',
  variant: 'primary',
});
</script>

<template>
  <NuxtLink v-if="to" :to="to" class="ui-button" :class="`ui-button--${variant}`">
    <slot />
  </NuxtLink>
  <button v-else :type="type" class="ui-button" :class="`ui-button--${variant}`">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.ui-button {
  position: relative;
  display: inline-flex;
  min-height: $control-size;
  align-items: center;
  justify-content: center;
  gap: $gap-xs;
  padding: 0.7rem $gap-lg;
  border: 1px solid transparent;
  border-radius: $radius-pill;
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 730;
  text-align: center;
  transition: background $transition-fast, border-color $transition-fast, box-shadow $transition-fast, transform $transition-fast;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: wait;
    opacity: 0.65;
    transform: none;
  }
}

.ui-button--primary {
  color: $color-on-accent;
  background: $color-accent;

  &:hover {
    background: $color-accent-hover;
    box-shadow: 0 0 1.5rem rgb(216 250 99 / 24%);
  }
}

.ui-button--secondary {
  border-color: $color-border;
  color: $color-text;
  background: $color-surface-raised;

  &:hover {
    border-color: $color-lavender;
    background: $color-border;
  }
}

.ui-button--dark {
  color: $color-accent;
  background: $color-on-accent;

  &:hover {
    background: $color-background;
    box-shadow: 0 0.4rem 1.25rem rgb(28 33 19 / 28%);
  }

  &:focus-visible {
    outline-color: $color-on-accent;
  }
}
</style>
