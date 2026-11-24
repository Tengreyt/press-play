<script setup lang="ts">
import type { RentalFormValues } from '~/types/types';

const props = defineProps<{ today: string; pending: boolean; error: string }>();
const emit = defineEmits<{ (event: 'submit', value: RentalFormValues): void }>();

const form = reactive<RentalFormValues>({
  name: '',
  contact: '',
  startsOn: '',
  endsOn: '',
  note: '',
  contactConsent: false,
});

function setStartDate(event: Event) {
  const input = event.currentTarget as HTMLInputElement;
  form.startsOn = input.value;
  if (form.endsOn && form.endsOn < form.startsOn) {
    form.endsOn = '';
  }
}

function submit() {
  if (!props.pending) {
    emit('submit', { ...form });
  }
}
</script>

<template>
  <form class="rent-order-form" @submit.prevent="submit">
    <fieldset class="rent-order-form__fields" :disabled="pending">
      <legend class="rent-order-form__legend">Детали аренды</legend>
      <div class="rent-order-form__dates">
        <UiFormField label="Начало аренды">
          <input :value="form.startsOn" type="date" name="startsOn" :min="today" required @change="setStartDate">
        </UiFormField>
        <UiFormField label="Дата возврата">
          <input v-model="form.endsOn" type="date" name="endsOn" :min="form.startsOn || today" required>
        </UiFormField>
      </div>
      <UiFormField label="Как к тебе обращаться?">
        <input v-model="form.name" name="name" autocomplete="given-name" placeholder="Имя" minlength="2" maxlength="80" required>
      </UiFormField>
      <UiFormField label="Телефон или Telegram">
        <input v-model="form.contact" name="contact" placeholder="+7 … или @username" maxlength="48" required>
      </UiFormField>
      <UiFormField label="Комментарий" optional>
        <textarea v-model="form.note" name="note" rows="2" maxlength="600" placeholder="Например, в каком районе удобно забрать PS5" />
      </UiFormField>
      <label class="rent-order-form__consent">
        <input v-model="form.contactConsent" name="contactConsent" type="checkbox" required>
        <span>Можно связаться со мной по указанному контакту, чтобы ответить на заявку и согласовать аренду.</span>
      </label>
    </fieldset>
    <p v-if="error" class="rent-order-form__error" role="alert">{{ error }}</p>
    <UiButton type="submit" :disabled="pending" class="rent-order-form__submit">
      {{ pending ? 'Отправляем…' : 'Отправить заявку' }}
    </UiButton>
  </form>
</template>

<style scoped lang="scss">
.rent-order-form {
  display: grid;
  gap: $gap-lg;
  padding: clamp(1.25rem, 3.5vw, 2.5rem);
  border: 1px solid $color-border;
  border-radius: $radius-lg;
  background: $color-surface;
}

.rent-order-form__fields {
  display: grid;
  min-width: 0;
  gap: $gap-md;
  margin: 0;
  padding: 0;
  border: 0;
}

.rent-order-form__legend {
  @include heading;

  margin-bottom: $gap-lg;
  padding: 0;
  font-size: 1.65rem;
}

.rent-order-form__dates {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $gap-md;
}

.rent-order-form__consent {
  display: flex;
  align-items: flex-start;
  gap: $gap-sm;
  color: $color-muted;
  font-size: 0.875rem;

  input {
    width: 1.125rem;
    height: 1.125rem;
    flex: none;
    margin: 0.15rem 0 0;
    accent-color: $color-accent;
  }
}

.rent-order-form__error {
  color: $color-error;
  font-size: 0.9375rem;
}

.rent-order-form__submit {
  justify-self: start;
}

@media (width <= 25rem) {
  .rent-order-form__dates {
    grid-template-columns: 1fr;
  }
}
</style>
