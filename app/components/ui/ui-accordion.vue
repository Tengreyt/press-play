<script setup lang="ts">
import IconChevron from '~/assets/icons/chevron.svg';

const props = withDefaults(defineProps<{ title: string; initiallyOpen?: boolean }>(), { initiallyOpen: false });
const isOpen = ref(props.initiallyOpen);
const panelId = useId();
</script>

<template>
  <div class="ui-accordion" :class="{ 'ui-accordion--open': isOpen }">
    <h3>
      <button
        type="button"
        class="ui-accordion__trigger"
        :aria-expanded="isOpen"
        :aria-controls="panelId"
        @click="isOpen = !isOpen"
      >
        <span>{{ title }}</span>
        <IconChevron aria-hidden="true" />
      </button>
    </h3>
    <div :id="panelId" class="ui-accordion__panel" :inert="!isOpen" :aria-hidden="!isOpen">
      <div class="ui-accordion__clip">
        <div class="ui-accordion__body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-accordion {
  border: 1px solid $color-border;
  border-radius: $radius-md;
  background: $color-surface;
  transition: border-color $transition-fast;

  &:focus-within {
    border-color: $color-lavender;
  }
}

.ui-accordion__trigger {
  display: flex;
  width: 100%;
  min-height: 3.75rem;
  align-items: center;
  justify-content: space-between;
  gap: $gap-md;
  padding: $gap-md $gap-lg;
  border: 0;
  border-radius: $radius-md;
  background: transparent;
  cursor: pointer;
  font-size: 1.0625rem;
  font-weight: 680;
  text-align: start;
  transition: background-color $transition-fast;

  &:active {
    background: $color-surface-raised;
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
    flex: none;
    color: $color-lavender;
    transition: transform $transition-disclosure;
  }
}

.ui-accordion__panel {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows $transition-disclosure, opacity $transition-fast;
}

.ui-accordion__clip {
  overflow: hidden;
  min-height: 0;
}

.ui-accordion__body {
  padding: 0 $gap-lg $gap-lg;
  color: $color-muted;
}

.ui-accordion--open {
  border-color: $color-lavender;

  .ui-accordion__trigger svg {
    transform: rotate(180deg);
  }

  .ui-accordion__panel {
    grid-template-rows: 1fr;
    opacity: 1;
  }
}

@media (hover: hover) {
  .ui-accordion:hover {
    border-color: $color-lavender;
  }
}

@media (max-width: $breakpoint-mobile) {
  .ui-accordion__trigger {
    gap: $gap-sm;
    padding-inline: $gap-md;
    font-size: 1rem;
  }

  .ui-accordion__body {
    padding-inline: $gap-md;
  }
}
</style>
