<script setup lang="ts">
useHead({ titleTemplate: (title) => title ? `${title} · Press Play` : 'Press Play · Аренда PlayStation 5' });
</script>

<template>
  <NuxtLoadingIndicator color="#d8fa63" :height="2" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
