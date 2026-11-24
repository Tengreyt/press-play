<script setup lang="ts">
import { X } from '@lucide/vue';

const props = defineProps<{ id: string; open: boolean }>();
const emit = defineEmits<{ (event: 'close'): void }>();
const drawer = useTemplateRef<HTMLDialogElement>('drawer');

function syncDrawer() {
  const panel = drawer.value;
  if (!panel) return;

  if (!props.open) {
    if (panel.open) panel.close();
    return;
  }

  // The shell owns the layout breakpoint. The drawer only uses it to choose native dialog behavior.
  const isModal = getComputedStyle(panel).getPropertyValue('--site-drawer-docked').trim() !== '1';
  if (panel.open && panel.matches(':modal') === isModal) return;
  if (panel.open) panel.close();

  if (isModal) panel.showModal();
  else panel.show();
}

function closeDockedOnEscape(event: KeyboardEvent) {
  const panel = drawer.value;
  if (event.key === 'Escape' && panel?.open && !panel.matches(':modal')) {
    event.preventDefault();
    emit('close');
  }
}

function closeFromBackdrop(event: MouseEvent) {
  const panel = drawer.value;
  if (panel?.matches(':modal') && event.clientX < panel.getBoundingClientRect().left) {
    emit('close');
  }
}

function closeAfterSelection(event: MouseEvent) {
  if (drawer.value?.matches(':modal') && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
    emit('close');
  }
}

watch(() => props.open, syncDrawer, { flush: 'post' });

onMounted(() => {
  window.addEventListener('resize', syncDrawer);
  window.addEventListener('keydown', closeDockedOnEscape);
});

onUnmounted(() => {
  window.removeEventListener('resize', syncDrawer);
  window.removeEventListener('keydown', closeDockedOnEscape);
});
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
    </nav>
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
  width: var(--site-drawer-width);
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

@starting-style {
  .app-navigation-drawer[open] {
    transform: translateX(100%);
  }

  .app-navigation-drawer[open]::backdrop {
    background-color: transparent;
  }
}
</style>
