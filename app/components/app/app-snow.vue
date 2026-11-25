<script setup lang="ts">
const flakes = [
  { left: 5, size: 2, duration: 16, phase: 9, drift: 22 },
  { left: 18, size: 3, duration: 21, phase: 3, drift: -20 },
  { left: 31, size: 2, duration: 13, phase: 10, drift: 16 },
  { left: 43, size: 2, duration: 19, phase: 11, drift: -23 },
  { left: 56, size: 3, duration: 15, phase: 3, drift: 20 },
  { left: 68, size: 2, duration: 18, phase: 15, drift: -16 },
  { left: 82, size: 3, duration: 20, phase: 8, drift: 21 },
  { left: 94, size: 2, duration: 14, phase: 6, drift: -18 },
  { left: 12, size: 2, duration: 19, phase: 14, drift: -23 },
  { left: 26, size: 2, duration: 22, phase: 12, drift: 28 },
  { left: 49, size: 3, duration: 15, phase: 8, drift: 15 },
  { left: 75, size: 2, duration: 17, phase: 3, drift: -21 },
  { left: 23, size: 3, duration: 17, phase: 7, drift: 16 },
  { left: 38, size: 2, duration: 21, phase: 2, drift: -24 },
  { left: 63, size: 4, duration: 18, phase: 12, drift: 22 },
  { left: 88, size: 3, duration: 16, phase: 1, drift: -16 },
  { left: 8, size: 3, duration: 20, phase: 12, drift: 27 },
  { left: 16, size: 2, duration: 14, phase: 7, drift: -19 },
  { left: 34, size: 2, duration: 19, phase: 4, drift: 17 },
  { left: 46, size: 3, duration: 18, phase: 16, drift: -24 },
  { left: 52, size: 4, duration: 17, phase: 10, drift: 19 },
  { left: 58, size: 2, duration: 14, phase: 6, drift: -22 },
  { left: 72, size: 3, duration: 21, phase: 16, drift: 25 },
  { left: 97, size: 3, duration: 18, phase: 4, drift: -28 },
];
</script>

<template>
  <div class="app-snow" aria-hidden="true">
    <span
      v-for="flake in flakes"
      :key="flake.left"
      class="app-snow__flake"
      :style="{
        '--left': `${flake.left}%`,
        '--size': `${flake.size}px`,
        '--duration': `${flake.duration}s`,
        '--delay': `-${flake.phase}s`,
        '--drift': `${flake.drift}px`,
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.app-snow {
  position: fixed;
  z-index: 1;
  inset: 0;
  overflow: clip;
  pointer-events: none;
}

.app-snow__flake {
  position: absolute;
  top: 0;
  left: var(--left);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: $color-text;
  opacity: 0.46;
  animation: snow-fall var(--duration) linear var(--delay) infinite;

  &:nth-child(3n) {
    opacity: 0.72;
  }
}

@keyframes snow-fall {
  from {
    transform: translate3d(0, -0.5rem, 0);
  }

  to {
    transform: translate3d(var(--drift), calc(100dvh + 0.5rem), 0);
  }
}

@media (max-width: $breakpoint-mobile) {
  .app-snow__flake:nth-child(n + 17) {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-snow {
    display: none;
  }
}
</style>
