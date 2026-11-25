<script setup lang="ts">
import { formatRentalPrice, rentalRates } from '~/utils/rental-pricing';

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
const route = useRoute();
const selectedRate = computed(() => rentalRates.find(rate => String(rate.days) === route.query.days));
const draft = computed(() => {
  const rate = selectedRate.value;
  const message = rate
    ? `Ассаламу Алайкум. Хочу арендовать PS5 на ${rate.duration} за ${formatRentalPrice(rate.total)}. Подскажи, пожалуйста, свободные даты.`
    : 'Ассаламу Алайкум. Хочу арендовать PS5. Подскажи, пожалуйста, свободные даты и стоимость.';
  return encodeURIComponent(message);
});
const whatsappUrl = computed(() => `https://wa.me/${whatsappDigits}?text=${draft.value}`);
</script>

<template>
  <UiContainer class="rent-page">
    <AppHomeLink class="rent-page__back" />
    <div class="rent-page__layout">
      <header class="rent-page__intro">
        <h1>Аренда PS5</h1>
        <p>Напиши, на какие даты нужна приставка. В чате уточним, свободна ли PS5 и как её забрать.</p>
        <p v-if="selectedRate" class="rent-page__rate">
          {{ selectedRate.duration }} · {{ formatRentalPrice(selectedRate.total) }}
        </p>
        <UiButton to="/prices" variant="secondary">{{ selectedRate ? 'Изменить срок' : 'Посмотреть цены' }}</UiButton>
      </header>
      <section class="rent-page__contact" aria-labelledby="rent-contact-title">
        <h2 id="rent-contact-title">Связаться по аренде</h2>
        <span class="rent-page__number">{{ whatsappNumber }}</span>
        <UiButton :to="whatsappUrl" external class="rent-page__whatsapp">WhatsApp</UiButton>
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
  justify-items: start;
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

.rent-page__intro .rent-page__rate {
  color: $color-accent;
  font-weight: 730;
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

.rent-page__number {
  color: $color-lavender;
  font-size: 1.125rem;
  font-variant-numeric: tabular-nums;
  font-weight: 650;
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
