<template>
  <section class="home-hero" aria-labelledby="home-title">
    <div class="home-hero__image" aria-hidden="true">
      <img src="/images/ps5-hero.jpg" alt="" width="1536" height="1024" fetchpriority="high">
    </div>
    <div class="home-hero__copy">
      <p class="home-hero__eyebrow">Аренда PlayStation 5</p>
      <h1 id="home-title" class="home-hero__title">Твой ход<span>.</span></h1>
      <p class="home-hero__description">PS5 на вечер, выходные или дольше.</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home-hero {
  position: relative;
  display: grid;
  min-height: clamp(25rem, 36vw, 32.75rem);
  align-items: center;
  background: $color-background;
  isolation: isolate;
}

.home-hero__image {
  position: absolute;
  right: max(-2rem, -2.5vw);
  bottom: 0;
  height: 100%;
  aspect-ratio: 3 / 2;
  mask-image: linear-gradient(to bottom, transparent, black 15%, black 80%, transparent);
  mix-blend-mode: screen;
  pointer-events: none;

  img {
    display: block;
    width: 100%;
    height: 100%;
    mask-image: linear-gradient(to right, transparent 8%, black 53%, black 94%, transparent);
  }
}

.home-hero__copy {
  position: relative;
  z-index: 1;
  display: grid;
  width: min(100%, 42rem);
  justify-items: center;
  gap: $gap-lg;
  margin: -0.5rem auto 0;
  text-align: center;
}

.home-hero__eyebrow {
  @include label;

  display: inline-flex;
  align-items: center;
  gap: $gap-xs;
  padding: 0.45rem $gap-sm;
  border: 1px solid $color-border;
  border-radius: $radius-pill;
  color: $color-lavender;
  background: rgb(23 18 33 / 75%);

  &::before {
    width: 0.375rem;
    height: 0.375rem;
    border-radius: $radius-pill;
    background: currentcolor;
    content: '';
  }
}

.home-hero__title {
  @include heading;

  font-size: clamp(4.25rem, 8.75vw, 8rem);
  font-weight: 850;
  line-height: 0.89;
  text-shadow: 0 0.2rem 2.5rem rgb(8 5 14 / 50%);

  span {
    color: $color-accent;
  }
}

.home-hero__description {
  max-width: 27rem;
  color: $color-muted;
  font-size: clamp(1rem, 1.65vw, 1.1875rem);
  font-weight: 490;
  text-wrap: balance;
}

@media (max-width: $breakpoint-tablet) {
  .home-hero {
    min-height: 27rem;
  }

  .home-hero__image {
    opacity: 0.68;
  }
}

@media (max-width: $breakpoint-mobile) {
  .home-hero {
    min-height: 0;
    align-items: start;
    padding-block: 2.125rem 9.5rem;
  }

  .home-hero__image {
    right: -0.75rem;
    bottom: -0.375rem;
    height: min(12.75rem, 62vw);
    mask-image: linear-gradient(to bottom, transparent 18%, black 46%, black 79%, transparent);
    opacity: 0.85;
  }

  .home-hero__copy {
    gap: $gap-sm;
    margin-top: 0;
  }

  .home-hero__title {
    font-size: clamp(3.25rem, 13.5vw, 5rem);
  }

  .home-hero__description {
    text-shadow: 0 0 0.8rem $color-background;
  }
}
</style>
