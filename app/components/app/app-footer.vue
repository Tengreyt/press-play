<template>
  <footer class="app-footer">
    <UiContainer class="app-footer__inner">
      <AppBrand compact />
      <p class="app-footer__description">Аренда PlayStation 5</p>
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
  align-items: center;
  justify-content: space-between;
  gap: $gap-md;
  padding-block: $gap-md;
  border-top: 1px solid $color-border;
  font-size: 0.875rem;
}

.app-footer__description {
  text-align: right;
}
</style>
