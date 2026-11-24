<script setup lang="ts">
defineProps<{ label: string; optional?: boolean }>();
</script>

<template>
  <label class="ui-form-field">
    <span class="ui-form-field__label">
      {{ label }} <small v-if="optional">необязательно</small>
    </span>
    <slot />
  </label>
</template>

<style scoped lang="scss">
.ui-form-field {
  display: grid;
  min-width: 0;
  gap: $gap-xs;
}

.ui-form-field__label {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0 $gap-xs;
  color: $color-text;
  font-size: 0.9375rem;
  font-weight: 650;

  small {
    color: $color-muted;
    font-size: 0.8125rem;
    font-weight: 450;
  }
}

.ui-form-field :slotted(input), .ui-form-field :slotted(textarea) {
  width: 100%;
  min-width: 0;
  min-height: $control-size;
  padding: 0.65rem $gap-sm;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  color: $color-text;
  background: $color-background;

  &::placeholder {
    color: $color-muted;
    opacity: 0.83;
  }
}

.ui-form-field :slotted(textarea) {
  min-height: 5.25rem;
  resize: vertical;
}
</style>
