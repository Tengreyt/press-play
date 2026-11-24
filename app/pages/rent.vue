<script setup lang="ts">
useSeoMeta({
  title: 'Аренда PS5 через WhatsApp',
  description: 'Напиши в WhatsApp, чтобы узнать, свободна ли PlayStation 5 на твои даты, и договориться об аренде.',
});

const whatsappNumber = useRuntimeConfig().public.whatsappNumber.trim();
const whatsappDigits = whatsappNumber.replace(/[\s().-]/g, '').replace(/^\+/, '');
const message = 'Привет! Хочу арендовать PS5. Подскажи, пожалуйста, свободные даты и стоимость.';
const whatsappUrl = /^[1-9]\d{7,14}$/.test(whatsappDigits)
  ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`
  : null;
</script>

<template>
  <UiContainer class="rent-page">
    <AppHomeLink class="rent-page__back" />
    <div class="rent-page__layout">
      <header class="rent-page__intro">
        <h1>Аренда PS5</h1>
        <p>Напиши, на какие даты нужна приставка. В чате уточним, свободна ли PS5, сколько стоит аренда и как её забрать.</p>
      </header>
      <section class="rent-page__contact" aria-labelledby="rent-contact-title">
        <h2 id="rent-contact-title">Связаться по аренде</h2>
        <template v-if="whatsappUrl">
          <UiButton :to="whatsappUrl" external class="rent-page__whatsapp">
            <span>Написать в WhatsApp</span>
            <span class="rent-page__number">{{ whatsappNumber }}</span>
          </UiButton>
          <p>В чате откроется черновик сообщения. Можешь добавить даты перед отправкой.</p>
        </template>
        <p v-else>Контакт для аренды временно недоступен.</p>
      </section>
    </div>
  </UiContainer>
</template>

<style scoped lang="scss">
.rent-page {
  padding-block: clamp(2.5rem, 7vw, 6rem);
}

.rent-page__back {
  margin-bottom: clamp(1.25rem, 4vw, 2.5rem);
}

.rent-page__layout {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr);
  align-items: start;
  gap: clamp(1.75rem, 6vw, 6.5rem);
}

.rent-page__intro {
  display: grid;
  align-content: start;
  gap: $gap-lg;

  h1 {
    @include heading;

    font-size: clamp(3rem, 6.5vw, 6rem);
  }

  p {
    max-width: 29rem;
    color: $color-muted;
    font-size: 1.125rem;
  }
}

.rent-page__contact {
  display: grid;
  justify-items: start;
  gap: $gap-md;
  padding: clamp(1.25rem, 3.5vw, 2.5rem);
  border: 1px solid $color-border;
  border-radius: $radius-lg;
  background: $color-surface;

  h2 {
    @include heading;

    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  p {
    max-width: 28rem;
    color: $color-muted;
  }
}

.rent-page__whatsapp {
  flex-direction: column;
  gap: 0.125rem;
}

.rent-page__number {
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  font-weight: 580;
}

@media (max-width: $breakpoint-tablet) {
  .rent-page__layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: $breakpoint-mobile) {
  .rent-page {
    padding-block: $gap-xl $gap-2xl;
  }

  .rent-page__layout {
    gap: $gap-lg;
  }

  .rent-page__intro {
    gap: $gap-sm;

    p {
      font-size: 1rem;
    }
  }

  .rent-page__contact {
    padding: $gap-md;
    border-radius: $radius-md;
  }

  .rent-page__whatsapp {
    justify-self: stretch;
  }
}
</style>
