<script setup lang="ts">
const menuId = useId();
const menuOpen = ref(false);
</script>

<template>
  <div class="site-layout" :class="{ 'site-layout--menu-open': menuOpen }">
    <div class="site-layout__page">
      <a class="site-layout__skip" href="#main-content">К содержанию</a>
      <AppHeader :menu-id="menuId" :menu-open="menuOpen" @toggle-menu="menuOpen = !menuOpen" />
      <main id="main-content" class="site-layout__main" tabindex="-1">
        <slot />
      </main>
      <AppFooter />
    </div>
    <AppNavigationDrawer :id="menuId" :open="menuOpen" @close="menuOpen = false" />
  </div>
</template>

<style scoped lang="scss">
.site-layout {
  --site-drawer-width: min(84vw, 22rem);
  --site-drawer-docked: 0;

  overflow-x: clip;
}

.site-layout__page {
  display: flex;
  min-width: 0;
  min-height: 100svh;
  flex-direction: column;
  transition: margin-inline-end $transition-disclosure;
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

@media (min-width: $breakpoint-docked-menu) {
  .site-layout {
    --site-drawer-width: min(30vw, 30rem);
    --site-drawer-docked: 1;
  }

  .site-layout--menu-open .site-layout__page {
    margin-inline-end: var(--site-drawer-width);
  }
}
</style>
