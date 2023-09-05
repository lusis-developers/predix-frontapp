<script setup lang="ts">
import { formatToCurrency } from '@/utils/InputFormats';

const emit = defineEmits(['edit-plan']);
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
})

function planSelected() {
  emit('edit-plan', props.id);
}
</script>

<template>
  <div class="card">
    <img
      class="card-image" 
      :src="image" :alt="title">
    <p class="card-title">
      {{ title }} 
    </p>
    <p class="card-price">
      {{ formatToCurrency(price) }}
    </p>
    <CrushButton
      class="card-button"
      text="Editar Plan"
      primary="primary"
      @click="planSelected" />
  </div>
</template>

<style lang="scss" scoped>
$gap-padding-space: 12px;

.card {
  margin-top: 24px;
  display: flex;
  gap: $gap-padding-space;
  flex-direction: column;
  width: 100%;
  padding: 8px;
  padding-bottom: $gap-padding-space * 2;
  border: 1px solid $white;
  border-radius: 8px;
  @media (min-width: $tablet-lower-breakpoint) {
    width: 45%;
  }
  &-image {
    width: 100%;
    height: 104px;
    object-fit: cover;
    border-radius: 8px;
    overflow: hidden;
    object-position: center top;
  }
  &-title {
    font-family: $font-secondary;
    text-overflow: ellipsis;
    color: $white;
    font-size: $body-font-size;
    font-weight: 700;
  }
  &-price {
    font-size: $body-font-size;
    font-family: $font-secondary;
  }
  &-button {
    background-color: $green;
    margin: 0 auto;
    width: 80%;
    &:hover {
      background-color: $light-green;
      border: none;
    }
  }
}
</style>