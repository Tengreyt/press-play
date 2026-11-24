<script setup lang="ts">
import IconCheck from '~/assets/icons/check.svg';

useSeoMeta({
  title: 'Инструкции по PS5',
  description: 'Как подключить PlayStation 5, поменять игру, подключить геймпад и разобраться с частыми неполадками.',
});

const { articles, troubleshooting, videos, rules } = useGuideData();
const activeVideo = ref('');
const sections = [
  { id: 'getting-started', label: 'Первые шаги' },
  { id: 'videos', label: 'Видео' },
  { id: 'troubleshooting', label: 'Неполадки' },
  { id: 'rules', label: 'Правила' },
];
</script>

<template>
  <UiContainer class="guide-page">
    <header class="guide-page__hero">
      <h1>Твой гайд по PS5<span>.</span></h1>
      <p>От первого включения до смены игры. Все подсказки для аренды в одном месте.</p>
    </header>
    <div class="guide-page__layout">
      <nav class="guide-page__nav" aria-label="Разделы инструкции">
        <a v-for="section in sections" :key="section.id" :href="`#${section.id}`">{{ section.label }}</a>
      </nav>
      <div class="guide-page__content">
        <section id="getting-started" class="guide-page__section" aria-labelledby="getting-started-title">
          <h2 id="getting-started-title">Первые шаги</h2>
          <GuideArticleList :articles="articles" open-first />
        </section>
        <section id="videos" class="guide-page__section" aria-labelledby="videos-title">
          <h2 id="videos-title">Видеоинструкции</h2>
          <div class="guide-page__videos">
            <GuideVideoCard
              v-for="video in videos"
              :key="video.id"
              :video="video"
              :active="activeVideo === video.id"
              @play="activeVideo = $event"
            />
          </div>
        </section>
        <section id="troubleshooting" class="guide-page__section" aria-labelledby="troubleshooting-title">
          <h2 id="troubleshooting-title">Если что-то пошло не так</h2>
          <GuideArticleList :articles="troubleshooting" />
        </section>
        <section id="rules" class="guide-page__section" aria-labelledby="rules-title">
          <h2 id="rules-title">Правила пользования</h2>
          <ul class="guide-page__rules">
            <li v-for="rule in rules" :key="rule"><IconCheck aria-hidden="true" />{{ rule }}</li>
          </ul>
        </section>
      </div>
    </div>
  </UiContainer>
</template>

<style scoped lang="scss">
.guide-page {
  padding-block: clamp(2.75rem, 7vw, 6rem);
}

.guide-page__hero {
  display: grid;
  justify-items: center;
  gap: $gap-md;
  margin-bottom: clamp(2.5rem, 7vw, 5rem);
  text-align: center;

  h1 {
    @include heading;

    font-size: clamp(2.85rem, 7vw, 6.5rem);
  }

  span {
    color: $color-accent;
  }

  p {
    max-width: 35rem;
    color: $color-muted;
    font-size: 1.125rem;
    text-wrap: balance;
  }
}

.guide-page__layout {
  display: grid;
  grid-template-columns: 12rem minmax(0, 1fr);
  align-items: start;
  gap: clamp(1rem, 4vw, 4rem);
}

.guide-page__nav {
  position: sticky;
  top: $gap-lg;
  display: grid;
  gap: $gap-xs;

  a {
    padding: $gap-xs $gap-sm;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    color: $color-muted;
    background: $color-surface;
    font-size: 0.9375rem;
    font-weight: 650;
    transition: border-color $transition-fast, color $transition-fast;

    &:hover {
      border-color: $color-lavender;
      color: $color-text;
    }
  }
}

.guide-page__content {
  display: grid;
  gap: clamp(2.75rem, 6vw, 5rem);
}

.guide-page__section {
  display: grid;
  gap: $gap-lg;
  scroll-margin-top: $gap-lg;

  h2 {
    @include heading;

    font-size: clamp(1.95rem, 4vw, 3rem);
  }
}

.guide-page__videos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
  gap: $gap-md;
}

.guide-page__rules {
  display: grid;
  gap: $gap-md;
  margin: 0;
  padding: $gap-lg;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  background: $color-surface;
  list-style: none;

  li {
    display: flex;
    align-items: flex-start;
    gap: $gap-sm;
    color: $color-muted;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    flex: none;
    margin-top: 0.15rem;
    color: $color-accent;
  }
}

@media (max-width: $breakpoint-tablet) {
  .guide-page__layout {
    grid-template-columns: 1fr;
    gap: $gap-xl;
  }

  .guide-page__nav {
    position: static;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
