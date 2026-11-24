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
  isolation: isolate;
}

.home-hero__image {
  position: absolute;
  z-index: -1;
  inset: 0 max(-2rem, -2.5vw) 0 26%;
  mask-image: linear-gradient(to right, transparent, black 28%, black 93%, transparent), linear-gradient(to bottom, transparent, black 12%, black 81%, transparent);
  mask-composite: intersect;
  pointer-events: none;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: right center;
  }
}

.home-hero__copy {
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
    inset-inline-start: 12%;
    opacity: 0.68;
  }
}

@media (max-width: $breakpoint-mobile) {
  .home-hero {
    min-height: 0;
    align-items: start;
    padding-block: 2.8rem 11.25rem;
  }

  .home-hero__image {
    inset: 9rem -0.75rem -0.5rem;
    mask-image: linear-gradient(to right, transparent, black 26%, black 93%, transparent), linear-gradient(to bottom, transparent, black 36%, black 90%, transparent);
    opacity: 0.85;

    img {
      object-fit: cover;
      object-position: right bottom;
    }
  }

  .home-hero__copy {
    z-index: 1;
    gap: $gap-md;
    margin-top: 0;
  }

  .home-hero__title {
    font-size: clamp(3.75rem, 13.5vw, 5rem);
  }

  .home-hero__description {
    max-width: 16rem;
    text-shadow: 0 0 0.8rem $color-background;
  }
}
</style>
