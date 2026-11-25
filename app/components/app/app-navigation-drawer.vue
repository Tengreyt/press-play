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
      <UiButton size="icon" variant="secondary" aria-label="Закрыть меню" @click="emit('close')">
        <X :size="22" aria-hidden="true" />
      </UiButton>
    </header>
    <nav class="app-navigation-drawer__links" aria-label="Основная навигация">
      <NuxtLink to="/rent" class="app-navigation-drawer__link" @click="closeAfterSelection">Аренда</NuxtLink>
      <NuxtLink to="/guide" class="app-navigation-drawer__link" @click="closeAfterSelection">Инструкции</NuxtLink>
      <NuxtLink to="/prices" class="app-navigation-drawer__link" @click="closeAfterSelection">Цены</NuxtLink>
    </nav>
    <div class="app-navigation-drawer__setting">
      <button
        type="button"
        role="switch"
        class="app-navigation-drawer__switch"
        :aria-checked="snowEnabled"
        :aria-describedby="reducedMotion ? `${id}-motion` : undefined"
        :disabled="reducedMotion"
        @click="emit('update:snowEnabled', !snowEnabled)"
      >
        <Snowflake :size="18" aria-hidden="true" />
        <span>Снег</span>
        <span class="app-navigation-drawer__track" aria-hidden="true" />
      </button>
      <p v-if="reducedMotion" :id="`${id}-motion`" class="app-navigation-drawer__setting-hint">
        В системе включено уменьшение движения.
      </p>
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
  overflow: auto;
  width: min(84vw, 22rem);
  max-width: none;
  height: 100dvh;
  max-height: none;
  align-content: start;
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

.app-navigation-drawer__links {
  display: grid;
  gap: $gap-xs;
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

.app-navigation-drawer__setting {
  display: grid;
  gap: $gap-xs;
  padding-top: $gap-sm;
  border-top: 1px solid $color-border;
}

.app-navigation-drawer__switch {
  display: grid;
  min-height: $control-size;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: $gap-sm;
  padding: $gap-xs $gap-sm;
  border: 1px solid transparent;
  border-radius: $radius-sm;
  color: $color-text;
  background: transparent;
  cursor: pointer;
  font-weight: 650;
  text-align: left;

  svg {
    color: $color-lavender;
  }

  &:hover:not(:disabled) {
    background: $color-surface-raised;
  }

  &:disabled {
    color: $color-muted;
    cursor: default;
  }
}

.app-navigation-drawer__track {
  display: flex;
  width: 2.5rem;
  height: 1.5rem;
  align-items: center;
  padding: 0.1875rem;
  border: 1px solid $color-muted;
  border-radius: $radius-pill;
  background: $color-surface-raised;

  &::before {
    width: 1rem;
    height: 1rem;
    flex: none;
    border-radius: 50%;
    background: $color-muted;
    content: '';
    transition: transform $transition-fast;
  }
}

.app-navigation-drawer__switch[aria-checked='true'] .app-navigation-drawer__track {
  border-color: $color-accent;
  background: $color-accent;

  &::before {
    background: $color-on-accent;
    transform: translateX(1rem);
  }
}

.app-navigation-drawer__setting-hint {
  padding-inline: $gap-sm;
  color: $color-muted;
  font-size: 0.875rem;
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
