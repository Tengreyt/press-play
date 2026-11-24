<script setup lang="ts">
import IconPlay from '~/assets/icons/play.svg';
</script>

<template>
  <header class="app-header">
    <UiContainer class="app-header__inner">
      <NuxtLink to="/" class="app-header__brand" aria-label="Press Play, главная">
        <span class="app-header__mark" aria-hidden="true">
          <IconPlay />
        </span>
        <span>press<span class="app-header__dot">.</span>play</span>
      </NuxtLink>
      <nav class="app-header__nav" aria-label="Основная навигация">
        <NuxtLink to="/rent" class="app-header__link">Аренда</NuxtLink>
        <NuxtLink to="/guide" class="app-header__link">Инструкции</NuxtLink>
      </nav>
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
    width: 1.15rem;
    height: 1.15rem;
    fill: currentcolor;
  }
}

.app-header__dot {
  color: $color-accent;
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 3vw, 2.25rem);
}

.app-header__link {
  display: flex;
  min-height: $touch-target;
  align-items: center;
  padding: $gap-xs 0;
  color: $color-muted;
  font-size: 0.9375rem;
  font-weight: 640;
  transition: color $transition-fast;

  &:hover, &.router-link-active {
    color: $color-accent;
  }
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

  .app-header__link {
    font-size: 0.875rem;
  }
}
</style>
