<script setup lang="ts">
useSeoMeta({
  title: 'Аренда PS5 через WhatsApp',
  description: 'Напиши в WhatsApp, чтобы узнать, свободна ли PlayStation 5 на твои даты, и договориться об аренде.',
});

function phoneDigits(number: string): string {
  return number.replace(/[\s().-]/g, '').replace(/^\+/, '');
}

const defaultWhatsAppNumber = '+7 928 269-25-88';
const configuredNumber = String(useRuntimeConfig().public.whatsappNumber).trim();
const whatsappNumber = /^[1-9]\d{7,14}$/.test(phoneDigits(configuredNumber))
  ? configuredNumber
  : defaultWhatsAppNumber;
const whatsappDigits = phoneDigits(whatsappNumber);
const draft = encodeURIComponent('Ассаламу Алайкум. Хочу арендовать PS5. Подскажи, пожалуйста, свободные даты и стоимость.');
const desktopQuery = `phone=${whatsappDigits}&text=${draft}&type=phone_number&app_absent=0`;
const whatsappUrl = `https://wa.me/${whatsappDigits}?text=${draft}`;
const whatsappWebUrl = `https://web.whatsapp.com/send/?${desktopQuery}`;
const whatsappAppUrl = `whatsapp://send/?${desktopQuery}`;
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
        <NuxtLink :to="whatsappUrl" external class="rent-page__number" :aria-label="`Чат WhatsApp с номером ${whatsappNumber}`">
          {{ whatsappNumber }}
        </NuxtLink>
        <div class="rent-page__desktop-actions">
          <UiButton :to="whatsappWebUrl" external target="_blank" rel="noopener noreferrer">WhatsApp Web</UiButton>
          <UiButton :to="whatsappAppUrl" external variant="secondary">Открыть приложение</UiButton>
        </div>
        <UiButton :to="whatsappUrl" external class="rent-page__mobile-action">Открыть чат в WhatsApp</UiButton>
        <p>В чате откроется черновик сообщения. Можешь добавить даты перед отправкой.</p>
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

.rent-page__desktop-actions {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: $gap-sm;

  > a {
    flex: 1 0 auto;
  }
}

.rent-page__mobile-action.ui-button {
  display: none;
}

.rent-page__number {
  display: inline-flex;
  min-height: $touch-target;
  align-items: center;
  border-radius: 0.25rem;
  color: $color-lavender;
  font-size: 1.125rem;
  font-variant-numeric: tabular-nums;
  font-weight: 650;
  text-decoration: underline;
  text-underline-offset: 0.25em;
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
}

@media (hover: none) and (pointer: coarse) {
  .rent-page__desktop-actions {
    display: none;
  }

  .rent-page__mobile-action.ui-button {
    display: inline-flex;
    justify-self: stretch;
  }
}
</style>
