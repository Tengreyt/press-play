<script setup lang="ts">
import { Menu } from '@lucide/vue';

defineProps<{ menuId: string; menuOpen: boolean }>();
const emit = defineEmits<{ (event: 'toggle-menu'): void }>();
</script>

<template>
  <header class="app-header">
    <UiContainer class="app-header__inner">
      <AppBrand />
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
}
</style>
