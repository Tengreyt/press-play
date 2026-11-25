<script setup lang="ts">
import { brandOwner } from '~/utils/brand';
</script>

<template>
  <footer class="app-footer">
    <UiContainer class="app-footer__inner">
      <AppBrand compact />
      <div class="app-footer__about">
        <p>Аренда PlayStation 5</p>
        <p>Проект <span class="app-footer__owner">{{ brandOwner }}</span></p>
      </div>
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

.app-footer__about {
  display: flex;
  flex-wrap: wrap;
  gap: $gap-xs $gap-lg;
}

.app-footer__owner {
  color: $color-lavender;
  font-weight: 650;
}
</style>
