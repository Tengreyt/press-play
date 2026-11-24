<template>
  <div class="ui-container">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.ui-container {
  width: min($container-width, 100% - 2 * $container-padding);
  margin-inline: auto;
}
</style>
