<template>
  <footer class="app-footer">
    <UiContainer class="app-footer__inner">
      <NuxtLink to="/" class="app-footer__brand">press<span>.</span>play</NuxtLink>
      <p>Сервис аренды PlayStation 5</p>
    </UiContainer>
  </footer>
</template>

<style scoped lang="scss">
.app-footer {
  color: $color-muted;
}

.app-footer__inner {
  display: flex;
  min-height: 5.25rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: $gap-xs $gap-lg;
  padding-block: $gap-md;
  border-top: 1px solid $color-border;
  font-size: 0.875rem;
}

.app-footer__brand {
  color: $color-text;
  font-size: 1.0625rem;
  font-weight: 780;
  letter-spacing: -0.055em;

  span {
    color: $color-accent;
  }
}
</style>
