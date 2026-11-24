<script setup lang="ts">
import IconPlay from '~/assets/icons/play.svg';
import type { GuideVideo } from '~/types/types';

const props = defineProps<{ video: GuideVideo; active: boolean }>();
const emit = defineEmits<{ (event: 'play', id: string): void }>();
const playerUrl = computed(() => `https://www.youtube-nocookie.com/embed/${props.video.id}?autoplay=1`);
const watchUrl = computed(() => `https://www.youtube.com/watch?v=${props.video.id}`);
</script>

<template>
  <article class="guide-video-card">
    <div class="guide-video-card__media">
      <iframe
        v-if="active"
        :src="playerUrl"
        :title="video.title"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
      />
      <button v-else type="button" :aria-label="`Смотреть видео «${video.title}»`" @click="emit('play', video.id)">
        <span class="guide-video-card__play" aria-hidden="true"><IconPlay /></span>
      </button>
    </div>
    <div class="guide-video-card__body">
      <h3>{{ video.title }}</h3>
      <p>{{ video.channel }} · на английском</p>
      <a :href="watchUrl" target="_blank" rel="noopener noreferrer">Смотреть на YouTube</a>
    </div>
  </article>
</template>

<style scoped lang="scss">
.guide-video-card {
  overflow: hidden;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  background: $color-surface;
}

.guide-video-card__media {
  display: grid;
  aspect-ratio: 16 / 9;
  background: radial-gradient(ellipse at 66% 30%, $color-border 0, transparent 72%), $color-background;

  iframe, button {
    width: 100%;
    height: 100%;
    border: 0;
  }

  button {
    display: grid;
    background: transparent;
    cursor: pointer;
    place-items: center;

    &:focus-visible {
      outline-offset: -4px;
    }

    &:hover .guide-video-card__play {
      background: $color-accent-hover;
      box-shadow: 0 0 1.5rem rgb(216 250 99 / 24%);
      transform: scale(1.14);
    }
  }
}

.guide-video-card__play {
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: $radius-pill;
  color: $color-on-accent;
  background: $color-accent;
  place-items: center;
  transition: background $transition-fast, box-shadow $transition-fast, transform $transition-fast;

  svg {
    width: 1.55rem;
    height: 1.55rem;
    fill: currentcolor;
  }
}

.guide-video-card__body {
  display: grid;
  gap: 0.35rem;
  padding: $gap-md;

  h3 {
    font-size: 1.0625rem;
    font-weight: 700;
    letter-spacing: -0.035em;
  }

  p {
    color: $color-muted;
    font-size: 0.875rem;
  }

  a {
    justify-self: start;
    color: $color-lavender;
    font-size: 0.875rem;
    text-decoration: underline;
    text-underline-offset: 0.23em;
  }
}
</style>
