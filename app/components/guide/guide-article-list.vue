<script setup lang="ts">
import type { GuideArticle } from '~/types/types';

withDefaults(defineProps<{ articles: GuideArticle[]; openFirst?: boolean }>(), { openFirst: false });
</script>

<template>
  <div class="guide-article-list">
    <UiAccordion
      v-for="(article, index) in articles"
      :key="article.title"
      :title="article.title"
      :initially-open="openFirst && index === 0"
    >
      <ol class="guide-article-list__steps">
        <li v-for="step in article.steps" :key="step">{{ step }}</li>
      </ol>
      <a v-if="article.source" :href="article.source" target="_blank" rel="noopener noreferrer" class="guide-article-list__source">
        Подробнее на PlayStation
      </a>
    </UiAccordion>
  </div>
</template>

<style scoped lang="scss">
.guide-article-list {
  display: grid;
  gap: $gap-xs;
}

.guide-article-list__steps {
  display: grid;
  gap: $gap-xs;
  margin: 0;
  padding-inline-start: 1.25rem;

  li::marker {
    color: $color-lavender;
  }
}

.guide-article-list__source {
  display: inline-block;
  margin-top: $gap-md;
  color: $color-text;
  font-size: 0.875rem;
  text-decoration: underline;
  text-decoration-color: $color-lavender;
  text-underline-offset: 0.25em;
}
</style>
