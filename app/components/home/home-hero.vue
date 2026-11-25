<template>
  <section class="home-hero" aria-labelledby="home-title">
    <picture class="home-hero__image" aria-hidden="true">
      <source media="(max-width: 36rem)" type="image/webp" srcset="/images/ps5-hero-mobile.webp" width="636" height="680">
      <source type="image/webp" srcset="/images/ps5-hero.webp" width="1320" height="880">
      <img src="/images/ps5-hero.jpg" alt="" width="900" height="600" fetchpriority="high" decoding="async">
    </picture>
    <div class="home-hero__copy">
      <p class="home-hero__eyebrow">Аренда PlayStation 5</p>
      <h1 id="home-title" class="home-hero__title">
        Твой ход<span class="home-hero__period">.</span>
        <span class="home-hero__hanging-controller" aria-hidden="true" />
      </h1>
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
  container-type: inline-size;
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
    object-fit: cover;
    object-position: right center;
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

  position: relative;
  font-size: clamp(4.25rem, 8.75vw, 8rem);
  font-weight: 850;
  line-height: 0.89;
  text-shadow: 0 0.2rem 2.5rem rgb(8 5 14 / 50%);
}

.home-hero__period {
  color: $color-accent;
}

.home-hero__hanging-controller {
  position: absolute;
  z-index: 1;
  top: 0.05em;
  left: 0.33em;
  width: 0.8em;
  aspect-ratio: 192 / 126;
  background: url('/images/dualsense-mobile.webp') center / contain no-repeat;
  filter: drop-shadow(0 0.2rem 0.25rem rgb(0 0 0 / 55%));
  pointer-events: none;
  transform: translate(-50%, -59%) rotate(-9deg);
}

.home-hero__description {
  max-width: 27rem;
  color: $color-muted;
  font-size: clamp(1rem, 1.65vw, 1.1875rem);
  font-weight: 490;
  text-wrap: balance;
}

@container (width <= 64rem) {
  .home-hero__image {
    height: min(100%, 40cqi);
  }
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
    height: min(19rem, 80vw);
    aspect-ratio: 636 / 680;
    mask-image: linear-gradient(to bottom, transparent, black 16%, black 81%, transparent);
    opacity: 0.87;

    img {
      mask-image: linear-gradient(to right, transparent 3%, black 34%, black 91%, transparent);
    }
  }

  .home-hero__copy {
    gap: $gap-sm;
    margin-top: 0;

    &::before {
      position: absolute;
      z-index: -1;
      inset: 0 -1rem -4rem;
      background: radial-gradient(ellipse 54% 48% at 56% 46%, rgb(16 13 24 / 94%) 14%, rgb(16 13 24 / 68%) 56%, rgb(16 13 24 / 27%) 78%, transparent 100%);
      content: '';
      pointer-events: none;
    }
  }

  .home-hero__title {
    font-size: clamp(3.25rem, 13.5vw, 5rem);
  }

  .home-hero__hanging-controller {
    width: clamp(2rem, 12vw, 3.25rem);
  }

  .home-hero__description {
    color: $color-text;
    text-shadow: 0 0 0.8rem $color-background;
  }
}
</style>
