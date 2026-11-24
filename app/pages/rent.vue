<script setup lang="ts">
import { safeParse } from 'valibot';
import { rentalOrderSchema, todayInMoscow } from '#shared/rental-order';
import { createRentalOrder } from '~/api/rental-service/requests/create-order';
import type { RentalFormValues } from '~/types/types';
import type { RentalReceipt } from '#shared/rental-order';

useSeoMeta({
  title: 'Заявка на аренду PS5',
  description: 'Выбери даты аренды PlayStation 5 и оставь телефон или Telegram для согласования.',
});

const today = useState('rental-today', todayInMoscow);
const pending = ref(false);
const receipt = ref<RentalReceipt | null>(null);
const error = ref('');
let lastAttempt: { values: string; id: string } | undefined;

async function submit(values: RentalFormValues) {
  if (pending.value) return;

  error.value = '';
  const key = JSON.stringify(values);
  const id = lastAttempt?.values === key ? lastAttempt.id : crypto.randomUUID();
  const order = safeParse(rentalOrderSchema, { ...values, id });

  if (!order.success) {
    error.value = order.issues[0].message;
    return;
  }

  if (order.output.startsOn < todayInMoscow()) {
    today.value = todayInMoscow();
    error.value = 'Выбери сегодняшнюю дату или позже.';
    return;
  }

  pending.value = true;
  lastAttempt = { values: key, id };

  try {
    receipt.value = await createRentalOrder(order.output);
  } catch {
    error.value = 'Не удалось отправить заявку. Попробуй ещё раз, введённые данные сохранены в форме.';
  } finally {
    pending.value = false;
  }
}
</script>

<template>
  <UiContainer class="rent-page">
    <div class="rent-page__intro">
      <h1>Аренда PS5</h1>
      <p>Выбери удобные даты. Мы свяжемся с тобой, проверим доступность приставки и обсудим стоимость и передачу.</p>
      <p class="rent-page__note">Оплата на сайте не нужна.</p>
    </div>
    <RentOrderReceipt v-if="receipt" :id="receipt.id" />
    <RentOrderForm v-else :today="today" :pending="pending" :error="error" @submit="submit" />
  </UiContainer>
</template>

<style scoped lang="scss">
.rent-page {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr);
  align-items: start;
  gap: clamp(1.75rem, 6vw, 6.5rem);
  padding-block: clamp(2.5rem, 7vw, 6rem);
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

  .rent-page__note {
    color: $color-lavender;
    font-size: 0.9375rem;
    font-weight: 650;
  }
}

@media (max-width: $breakpoint-tablet) {
  .rent-page {
    grid-template-columns: 1fr;
  }
}
</style>
