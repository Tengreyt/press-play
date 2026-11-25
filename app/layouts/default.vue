<script setup lang="ts">
const menuId = useId();
const menuOpen = ref(false);
const { snowActive, reducedMotion, setSnowEnabled } = useSnow();
</script>

<template>
  <div class="site-layout">
    <div class="site-layout__page">
      <a class="site-layout__skip" href="#main-content">К содержанию</a>
      <AppHeader :menu-id="menuId" :menu-open="menuOpen" @toggle-menu="menuOpen = !menuOpen" />
      <main id="main-content" class="site-layout__main" tabindex="-1">
        <slot />
      </main>
      <AppFooter />
    </div>
    <AppSnow v-if="snowActive" />
    <AppNavigationDrawer
      :id="menuId"
      :open="menuOpen"
      :snow-enabled="snowActive"
      :reduced-motion="reducedMotion"
      @close="menuOpen = false"
      @update:snow-enabled="setSnowEnabled"
    />
  </div>
</template>

<style scoped lang="scss">
.site-layout {
  overflow-x: clip;
}

.site-layout__page {
  display: flex;
  min-width: 0;
  min-height: 100svh;
  flex-direction: column;
}

.site-layout__main {
  flex: 1;
}

.site-layout__skip {
  position: fixed;
  z-index: 5;
  top: $gap-md;
  left: $gap-md;
  padding: $gap-sm $gap-md;
  border-radius: $radius-sm;
  color: $color-on-accent;
  background: $color-accent;

  &:not(:focus) {
    clip-path: inset(50%);
  }
}
</style>
