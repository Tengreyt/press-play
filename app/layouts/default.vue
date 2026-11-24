<template>
  <div class="site-layout">
    <a class="site-layout__skip" href="#main-content">К содержанию</a>
    <AppHeader />
    <main id="main-content" class="site-layout__main" tabindex="-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
.site-layout {
  display: flex;
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
