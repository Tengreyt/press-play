<script setup lang="ts">
import IconBook from '~/assets/icons/book.svg';
import IconGamepad from '~/assets/icons/gamepad.svg';

const props = defineProps<{
  title: string;
  description: string;
  action: string;
  to: string;
  variant: 'rental' | 'guide';
}>();

const isRental = computed(() => props.variant === 'rental');
</script>

<template>
  <article class="home-action-card" :class="`home-action-card--${variant}`">
    <div class="home-action-card__icon" aria-hidden="true">
      <IconGamepad v-if="isRental" />
      <IconBook v-else />
    </div>
    <div class="home-action-card__copy">
      <h2 class="home-action-card__title">{{ title }}</h2>
      <p class="home-action-card__description">{{ description }}</p>
    </div>
    <UiButton :to="to" :variant="isRental ? 'dark' : 'secondary'" class="home-action-card__button">
      {{ action }}
    </UiButton>
  </article>
</template>

<style scoped lang="scss">
.home-action-card {
  position: relative;
  display: grid;
  overflow: hidden;
  min-height: 15.5rem;
  justify-items: start;
  gap: $gap-md;
  padding: clamp(1.25rem, 2.6vw, 2rem);
  border: 1px solid $color-border;
  border-radius: $radius-lg;
  background: $color-surface-raised;
  isolation: isolate;
  transition: border-color $transition-fast, transform $transition-fast;

  &:hover, &:focus-within {
    border-color: $color-lavender;
    transform: translateY(-3px);
  }

  &::before, &::after {
    position: absolute;
    z-index: -1;
    top: -2.5rem;
    right: -1.6rem;
    width: 13rem;
    height: 13rem;
    border: 1px solid currentcolor;
    border-radius: 34%;
    color: inherit;
    opacity: 0.16;
    content: '';
    pointer-events: none;
    transform: rotate(-22deg);
    transition: transform 480ms ease;
  }

  &::after {
    top: -0.2rem;
    right: -4.5rem;
  }

  &:hover::before, &:focus-within::before {
    transform: rotate(-15deg) translateX(-0.6rem);
  }
}

.home-action-card--rental {
  border-color: $color-accent;
  color: $color-on-accent;
  background: radial-gradient(ellipse at right top, $color-accent-hover 0, transparent 57%), $color-accent;

  &:hover, &:focus-within {
    border-color: $color-accent-hover;
  }
}

.home-action-card__icon {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  color: $color-lavender;
  background: $color-surface;
  place-items: center;

  svg {
    width: 1.375rem;
    height: 1.375rem;
  }
}

.home-action-card--rental .home-action-card__icon {
  border-color: rgb(28 33 19 / 17%);
  color: $color-on-accent;
  background: rgb(28 33 19 / 7%);
}

.home-action-card__copy {
  display: grid;
  gap: $gap-xs;
}

.home-action-card__title {
  @include heading;

  font-size: clamp(1.65rem, 3.1vw, 2.35rem);
}

.home-action-card__description {
  max-width: 30rem;
  color: $color-muted;
  text-wrap: pretty;
}

.home-action-card--rental .home-action-card__description {
  color: $color-on-accent;
}

.home-action-card__button {
  align-self: end;
  margin-top: $gap-xs;
}

@media (max-width: $breakpoint-mobile) {
  .home-action-card {
    min-height: 0;
  }
}
</style>
