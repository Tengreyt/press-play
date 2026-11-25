<script setup lang="ts">
import { Menu, Play } from '@lucide/vue';

defineProps<{ menuId: string; menuOpen: boolean }>();
const emit = defineEmits<{ (event: 'toggle-menu'): void }>();
</script>

<template>
  <header class="app-header">
    <UiContainer class="app-header__inner">
      <NuxtLink to="/" class="app-header__brand" aria-label="Press Play, главная">
        <span class="app-header__mark" aria-hidden="true">
          <Play viewBox="1 0 24 24" :stroke-width="1.5" />
        </span>
        <span>press<span class="app-header__dot">.</span>play</span>
      </NuxtLink>
      <UiButton
        size="icon"
        variant="secondary"
        class="app-header__menu"
        :class="{ 'app-header__menu--hidden': menuOpen }"
        aria-label="Меню"
        :aria-controls="menuId"
        :aria-expanded="menuOpen"
        aria-haspopup="dialog"
        @click="emit('toggle-menu')"
      >
        <Menu :size="23" aria-hidden="true" />
      </UiButton>
    </UiContainer>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  position: relative;
  z-index: 2;
  border-bottom: 1px solid $color-border;
  background: $color-background;
}

.app-header__inner {
  display: flex;
  min-height: 4.75rem;
  align-items: center;
  justify-content: space-between;
  gap: $gap-lg;
}

.app-header__brand {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: $gap-sm;
  font-size: 1.35rem;
  font-weight: 820;
  letter-spacing: -0.075em;
  line-height: 1;
}

.app-header__mark {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.625rem;
  color: $color-on-accent;
  background: $color-accent;
  place-items: center;

  svg {
    display: block;
    width: 1.15rem;
    height: 1.15rem;
    fill: currentcolor;
  }
}

.app-header__dot {
  color: $color-accent;
}

.app-header__menu--hidden {
  // Keep the trigger available for native focus restoration when the dialog closes.
  opacity: 0;
  pointer-events: none;
}

@media (max-width: $breakpoint-mobile) {
  .app-header__inner {
    min-height: 4rem;
    gap: $gap-xs;
  }

  .app-header__brand {
    gap: $gap-xs;
    font-size: 1.14rem;
  }

  .app-header__mark {
    width: 1.875rem;
    height: 1.875rem;
  }
}
</style>
