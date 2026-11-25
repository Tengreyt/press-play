<script setup lang="ts">
import { brandName, siteOrigin } from '~/utils/brand';

const route = useRoute();
const canonicalUrl = computed(() => `${siteOrigin}${route.path.replace(/\/+$/, '')}/`);

useHead({
  titleTemplate: (title) => title ? `${title} · ${brandName}` : `${brandName} · Аренда PlayStation 5`,
  link: [{ rel: 'canonical', href: canonicalUrl }],
});
useSeoMeta({ ogSiteName: brandName, ogUrl: canonicalUrl });
</script>

<template>
  <NuxtLoadingIndicator color="#d8fa63" :height="2" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
