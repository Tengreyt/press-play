<script setup lang="ts">
import { brandName } from '~/utils/brand';

useHead({ titleTemplate: (title) => title ? `${title} · ${brandName}` : `${brandName} · Аренда PlayStation 5` });
useSeoMeta({ ogSiteName: brandName });
</script>

<template>
  <NuxtLoadingIndicator color="#d8fa63" :height="2" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
