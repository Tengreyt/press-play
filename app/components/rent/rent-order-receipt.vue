<script setup lang="ts">
import IconCheck from '~/assets/icons/check.svg';

const props = defineProps<{ id: string }>();
const reference = computed(() => props.id.slice(0, 8).toUpperCase());
const heading = useTemplateRef<HTMLElement>('heading');

onMounted(() => heading.value?.focus());
</script>

<template>
  <section class="rent-order-receipt" aria-labelledby="receipt-title">
    <span class="rent-order-receipt__mark" aria-hidden="true"><IconCheck /></span>
    <h2 id="receipt-title" ref="heading" tabindex="-1">Заявка принята</h2>
    <p>Номер заявки <strong>{{ reference }}</strong></p>
    <p>Свяжемся с тобой по указанному контакту, чтобы согласовать стоимость и подтвердить аренду.</p>
    <UiButton to="/" variant="secondary">На главную</UiButton>
  </section>
</template>

<style scoped lang="scss">
.rent-order-receipt {
  display: grid;
  align-content: start;
  justify-items: start;
  gap: $gap-md;
  padding: clamp(1.25rem, 3.5vw, 2.5rem);
  border: 1px solid $color-border;
  border-radius: $radius-lg;
  background: $color-surface;

  h2 {
    @include heading;

    font-size: clamp(1.75rem, 3vw, 2.5rem);
  }

  p {
    color: $color-muted;
  }

  strong {
    color: $color-accent;
    font-variant-numeric: tabular-nums;
  }
}

.rent-order-receipt__mark {
  display: grid;
  width: $control-size;
  height: $control-size;
  border-radius: $radius-sm;
  color: $color-on-accent;
  background: $color-accent;
  place-items: center;

  svg {
    width: $gap-lg;
    height: $gap-lg;
  }
}
</style>
