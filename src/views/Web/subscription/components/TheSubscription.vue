<script setup lang="ts">
import { formatToCurrency } from '@/utils/InputFormats';


const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
    title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
})

</script>

<template>
  <RouterLink :to="`/web/subscriptions/${link}`" class="card">
    <img
      class="card-image" 
      src="https://i.pinimg.com/236x/d2/8d/c0/d28dc0ee9fdde752a1c4a66b7fa45877.jpg" alt="title">
    <p class="card-title">
      {{ title }}
    </p>
    <p class="card-price">
      {{ formatToCurrency(price) }}
    </p>
    <CrushButton
      class="card-button"
      text="Ver plan"
      primary="primary" />
  </RouterLink>
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
  text-decoration: none;
  @media (min-width: $tablet-lower-breakpoint) {
    width: 40%;
  }
  &-image {
    width: 100%;
    height: 160px;
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
    width: 50%;
    &:hover {
      background-color: $light-green;
      border: none;
    }
  }
  & :deep(.crush-primary) {
    background-color: $green;
    border: none;
    font-family: $font-secondary;
  }
}
</style>