<template>
  <div class="app-snow" aria-hidden="true">
    <span class="app-snow__layer app-snow__layer--far" />
    <span class="app-snow__layer app-snow__layer--middle" />
    <span class="app-snow__layer app-snow__layer--near" />
  </div>
</template>

<style scoped lang="scss">
@use 'sass:list';

@mixin snow-pattern($radius, $opacity, $positions) {
  $flakes: ();

  @each $x, $y in $positions {
    $flake: radial-gradient(circle $radius at $x $y, rgba($color-text, $opacity) 48%, transparent);
    $flakes: list.append($flakes, $flake, comma);
  }

  background-image: $flakes;
}

.app-snow {
  position: fixed;
  z-index: 1;
  inset: 0;
  overflow: clip;
  pointer-events: none;
}

.app-snow__layer {
  position: absolute;
  inset: calc(-1 * var(--tile-height)) -1.5rem 0;
  background-size: var(--tile-width) var(--tile-height);
  animation: snow-fall var(--duration) linear var(--delay) infinite;
}

.app-snow__layer--far {
  --tile-width: clamp(21rem, 44vw, 58rem);
  --tile-height: 22rem;
  --duration: 11s;
  --delay: -3s;
  --drift: -10px;

  @include snow-pattern(1.5px, 0.64, (
    6% 14%, 13% 65%, 20% 37%, 25% 91%, 32% 9%, 39% 48%, 47% 72%,
    54% 22%, 61% 84%, 70% 57%, 78% 33%, 88% 91%, 94% 6%,
  ));
}

.app-snow__layer--middle {
  --tile-width: clamp(24rem, 50vw, 65rem);
  --tile-height: 26rem;
  --duration: 9s;
  --delay: -6s;
  --drift: 14px;

  @include snow-pattern(1.9px, 0.76, (
    4% 73%, 12% 28%, 24% 5%, 33% 82%, 43% 54%, 53% 31%,
    63% 97%, 72% 15%, 81% 45%, 88% 75%, 97% 51%,
  ));
}

.app-snow__layer--near {
  --tile-width: clamp(27rem, 60vw, 72rem);
  --tile-height: 30rem;
  --duration: 8s;
  --delay: -2s;
  --drift: -19px;

  @include snow-pattern(2.3px, 0.84, (
    7% 43%, 17% 88%, 29% 23%, 45% 69%, 58% 11%, 69% 42%, 83% 89%, 93% 27%,
  ));
}

@keyframes snow-fall {
  50% {
    transform: translate3d(var(--drift), calc(var(--tile-height) / 2), 0);
  }

  100% {
    transform: translate3d(0, var(--tile-height), 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-snow {
    display: none;
  }
}
</style>
