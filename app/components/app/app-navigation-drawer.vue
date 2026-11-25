<script setup lang="ts">
import { Snowflake, X } from '@lucide/vue';

const props = defineProps<{ id: string; open: boolean; snowEnabled: boolean; reducedMotion: boolean }>();
const emit = defineEmits<{
  (event: 'close'): void;
  (event: 'update:snowEnabled', enabled: boolean): void;
}>();
const drawer = useTemplateRef<HTMLDialogElement>('drawer');

watchPostEffect(() => {
  const panel = drawer.value;
  const isOpen = props.open;
  if (!panel || panel.open === isOpen) return;

  if (isOpen) panel.showModal();
  else panel.close();
});

function closeFromBackdrop(event: MouseEvent) {
  const panel = drawer.value;
  if (panel && event.clientX < panel.getBoundingClientRect().left) {
    emit('close');
  }
}

function closeAfterSelection(event: MouseEvent) {
  if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
    emit('close');
  }
}
</script>

<template>
  <dialog
    :id="id"
    ref="drawer"
    class="app-navigation-drawer"
    :aria-labelledby="`${id}-title`"
    @cancel.prevent="emit('close')"
    @click.self="closeFromBackdrop"
  >
    <header class="app-navigation-drawer__header">
      <h2 :id="`${id}-title`">Меню</h2>
      <UiButton size="icon" variant="secondary" aria-label="Закрыть меню" autofocus @click="emit('close')">
        <X :size="22" aria-hidden="true" />
      </UiButton>
    </header>
    <nav class="app-navigation-drawer__links" aria-label="Основная навигация">
      <NuxtLink to="/rent" class="app-navigation-drawer__link" @click="closeAfterSelection">Аренда</NuxtLink>
      <NuxtLink to="/guide" class="app-navigation-drawer__link" @click="closeAfterSelection">Инструкции</NuxtLink>
      <NuxtLink to="/prices" class="app-navigation-drawer__link" @click="closeAfterSelection">Цены</NuxtLink>
    </nav>
    <div class="app-navigation-drawer__footer">
      <p v-if="reducedMotion" :id="`${id}-motion`" class="app-navigation-drawer__setting-hint">
        В системе включено уменьшение движения.
      </p>
      <UiButton
        size="icon"
        :variant="snowEnabled ? 'primary' : 'secondary'"
        class="app-navigation-drawer__snow"
        aria-label="Снег"
        title="Снег"
        :aria-pressed="snowEnabled"
        :aria-describedby="reducedMotion ? `${id}-motion` : undefined"
        :disabled="reducedMotion"
        @click="emit('update:snowEnabled', !snowEnabled)"
      >
        <Snowflake :size="20" aria-hidden="true" />
      </UiButton>
    </div>
  </dialog>
</template>

<style scoped lang="scss">
:global(html:has(.app-navigation-drawer:modal)) {
  overflow: hidden;
}

.app-navigation-drawer {
  position: fixed;
  z-index: 6;
  inset: 0 0 0 auto;
  display: none;
  overflow: hidden;
  width: min(84vw, 22rem);
  max-width: none;
  height: 100dvh;
  max-height: none;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: $gap-lg;
  margin: 0;
  padding: clamp(1rem, 2.8vw, 2rem);
  border: 0;
  border-inline-start: 1px solid $color-border;
  color: $color-text;
  background: $color-surface;
  box-shadow: 0 0 3rem rgb(0 0 0 / 24%);
  overscroll-behavior: contain;
  transform: translateX(100%);
  transition: transform $transition-disclosure, display $transition-disclosure allow-discrete, overlay $transition-disclosure allow-discrete;

  &[open] {
    display: grid;
    transform: translateX(0);
  }

  &::backdrop {
    background: transparent;
    transition: background-color $transition-disclosure, display $transition-disclosure allow-discrete, overlay $transition-disclosure allow-discrete;
  }

  &[open]::backdrop {
    background-color: rgb(9 6 16 / 67%);
  }
}

.app-navigation-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $gap-sm;

  h2 {
    @include heading;

    font-size: clamp(1.5rem, 2.5vw, 2rem);
  }
}

.app-navigation-drawer__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: $gap-sm;
}

.app-navigation-drawer__snow.ui-button {
  &:not([aria-pressed='true']) {
    color: $color-muted;
    background: linear-gradient(145deg, $color-surface-raised, $color-surface);

    &:hover:not(:disabled) {
      color: $color-text;
      background: $color-surface-raised;
    }
  }

  &[aria-pressed='true'] {
    border-color: $color-accent;
    box-shadow: 0 0 0.875rem rgb(216 250 99 / 18%);
  }

  &:disabled {
    cursor: default;
  }
}

.app-navigation-drawer__links {
  display: grid;
  overflow: auto;
  align-content: start;
  gap: $gap-xs;
  margin: -$gap-xs;
  padding: $gap-xs;
  overscroll-behavior: contain;
}

.app-navigation-drawer__link {
  display: flex;
  min-height: $control-size;
  align-items: center;
  padding: $gap-sm $gap-md;
  border: 1px solid transparent;
  border-radius: $radius-sm;
  color: $color-muted;
  font-weight: 650;
  transition: background-color $transition-fast, border-color $transition-fast, color $transition-fast;

  &:hover, &:focus-visible {
    color: $color-text;
    background: $color-surface-raised;
  }

  &[aria-current='page'] {
    border-color: $color-border;
    color: $color-accent;
    background: $color-surface-raised;
  }
}

.app-navigation-drawer__setting-hint {
  color: $color-muted;
  font-size: 0.875rem;
}

@media (height <= 28rem) {
  .app-navigation-drawer {
    gap: $gap-sm;
  }
}

@media (min-width: $breakpoint-desktop) {
  .app-navigation-drawer {
    width: min(30vw, 30rem);
  }
}

@starting-style {
  .app-navigation-drawer[open] {
    transform: translateX(100%);
  }

  .app-navigation-drawer[open]::backdrop {
    background-color: transparent;
  }
}
</style>
