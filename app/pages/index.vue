<script setup lang="ts">
useSeoMeta({
  description: 'Аренда PlayStation 5 через WhatsApp и инструкции по консоли, играм и контроллеру.',
});
</script>

<template>
  <UiContainer class="home-page">
    <HomeHero />
    <div class="home-page__actions">
      <HomeActionCard
        variant="rental"
        title="Взять PS5 в аренду"
        description="Напиши в WhatsApp, чтобы обсудить даты, стоимость и получение."
        action="Обсудить аренду"
        to="/rent"
      />
      <HomeActionCard
        variant="guide"
        title="PS5 уже у тебя?"
        description="Подключение, смена игр, видео и подсказки на случай неполадок."
        action="Открыть инструкции"
        to="/guide"
      />
    </div>
  </UiContainer>
</template>

<style scoped lang="scss">
.home-page {
  padding-bottom: clamp(2.75rem, 6vw, 5.25rem);
}

.home-page__actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $gap-md;
}

@media (max-width: $breakpoint-mobile) {
  .home-page__actions {
    grid-template-columns: 1fr;
    gap: $gap-sm;
  }
}
</style>
