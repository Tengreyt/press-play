<script setup lang="ts">
import { brandName } from '~/utils/brand';
import { dailyRentalPrice, formatRentalPrice, rentalRates, weeklyRentalRate } from '~/utils/rental-pricing';

useSeoMeta({
  title: 'Цены на аренду PS5',
  description: `Тарифы ${brandName} на аренду PlayStation 5. Сутки стоят ${formatRentalPrice(dailyRentalPrice)}, неделя — ${formatRentalPrice(weeklyRentalRate.total)}.`,
});

const weeklySavings = weeklyRentalRate.days * dailyRentalPrice - weeklyRentalRate.total;
</script>

<template>
  <UiContainer class="prices-page">
    <AppHomeLink class="prices-page__back" />
    <div class="prices-page__layout">
      <header class="prices-page__intro">
        <h1>Цены на аренду PS5<span>.</span></h1>
        <p>Нажми на срок, чтобы добавить его в заявку. Экономия рассчитана от тарифа {{ formatRentalPrice(dailyRentalPrice) }} за сутки.</p>
      </header>

      <div class="prices-page__rates">
        <table aria-label="Тарифы на аренду PS5">
          <thead>
            <tr>
              <th scope="col">Срок</th>
              <th scope="col">За весь срок</th>
              <th scope="col">Экономия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rate in rentalRates" :key="rate.days">
              <th scope="row">
                <NuxtLink :to="{ path: '/rent', query: { days: rate.days } }" class="prices-page__rate-link">
                  {{ rate.duration }}
                </NuxtLink>
              </th>
              <td class="prices-page__total">{{ formatRentalPrice(rate.total) }}</td>
              <td class="prices-page__savings">
                {{ rate.days === 1 ? '—' : formatRentalPrice(rate.days * dailyRentalPrice - rate.total) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <section class="prices-page__weekly" aria-labelledby="weekly-rental-title">
        <h2 id="weekly-rental-title">PS5 на неделю</h2>
        <p class="prices-page__weekly-price">{{ formatRentalPrice(weeklyRentalRate.total) }}</p>
        <p>Экономия {{ formatRentalPrice(weeklySavings) }} за 7 суток.</p>
        <UiButton :to="`/rent?days=${weeklyRentalRate.days}`" variant="dark">Арендовать на неделю</UiButton>
      </section>
    </div>
  </UiContainer>
</template>

<style scoped lang="scss">
.prices-page {
  padding-block: clamp(2.5rem, 7vw, 6rem);
}

.prices-page__back {
  margin-bottom: clamp(1.25rem, 4vw, 2.5rem);
}

.prices-page__layout {
  display: grid;
  grid-template:
    'intro rates' auto
    'weekly rates' 1fr / minmax(0, 0.9fr) minmax(0, 1fr);
  align-items: start;
  gap: $gap-xl clamp(1.75rem, 6vw, 6rem);
}

.prices-page__intro {
  display: grid;
  grid-area: intro;
  gap: $gap-sm;

  h1 {
    @include heading;

    font-size: clamp(2.5rem, 5.5vw, 5rem);
  }

  span {
    color: $color-accent;
  }

  p {
    max-width: 29rem;
    color: $color-muted;
  }
}

.prices-page__rates {
  grid-area: rates;
  padding-inline: clamp(0.75rem, 3vw, 2rem);
  border: 1px solid $color-border;
  border-radius: $radius-lg;
  background: $color-surface;

  table {
    width: 100%;
    border-collapse: collapse;
    font-variant-numeric: tabular-nums;
  }

  th, td {
    height: 3.5rem;
    padding: 0 0 0 $gap-xs;
    text-align: right;
  }

  th:first-child {
    padding: 0;
    text-align: left;
  }

  thead th, tbody tr:not(:last-child) > * {
    border-bottom: 1px solid $color-border;
  }

  thead th {
    color: $color-muted;
    font-size: 0.875rem;
    font-weight: 650;
  }
}

.prices-page__rate-link {
  display: inline-flex;
  min-height: $touch-target;
  align-items: center;
  border-radius: 0.25rem;
  color: $color-lavender;
  font-weight: 650;
  text-decoration: underline;
  text-underline-offset: 0.25em;

  &:hover {
    color: $color-text;
  }
}

.prices-page__total {
  font-weight: 730;
}

.prices-page__savings {
  color: $color-accent;
  font-size: 0.9375rem;
}

.prices-page__weekly {
  display: grid;
  grid-area: weekly;
  justify-items: start;
  gap: $gap-xs;
  padding: clamp(1rem, 3vw, 2rem);
  border-radius: $radius-lg;
  color: $color-on-accent;
  background: radial-gradient(ellipse at right top, $color-accent-hover 0, transparent 57%), $color-accent;

  h2 {
    font-size: 1rem;
    font-weight: 730;
  }

  .ui-button {
    margin-top: $gap-xs;
  }
}

.prices-page__weekly-price {
  @include heading;

  font-size: clamp(2.5rem, 5vw, 3.75rem);
}

@media (max-width: $breakpoint-tablet) {
  .prices-page__layout {
    grid-template:
      'intro'
      'rates'
      'weekly' / minmax(0, 1fr);
    gap: $gap-lg;
  }
}

@media (max-width: $breakpoint-mobile) {
  .prices-page__rates, .prices-page__weekly {
    border-radius: $radius-md;
  }

  .prices-page__weekly .ui-button {
    justify-self: stretch;
  }
}
</style>
