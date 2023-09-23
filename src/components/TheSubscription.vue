<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { formatToCurrency } from '@/utils/InputFormats';

import defaultImage from '@/assets/generic-image.jpg'

const route = useRoute();
const router = useRouter();

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
    required: true,
    default: '@/assets/generic-image.jpg'
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
});

const displayImage = computed(() => props.image || defaultImage);
const isUser = computed(() => route.path.includes('dashboard'));
const subscriptionRedirection = computed(() => isUser.value
  ? `/dashboard/subscription/${props.link}`
  : `/subscriptions/${props.link}`
);

function redirectToSubscriptionDetail(): void {
  router.push(subscriptionRedirection.value);
}
</script>

<template>
  <div class="card">
    <img
      class="card-image" 
      :src="displayImage"
      :alt="title">
    <p class="card-title">
      {{ title }}
    </p>
    <p class="card-price">
      {{ formatToCurrency(price) }}
    </p>
    <CrushButton
      class="card-button"
      text="Ver plan"
      primary="primary"
      @click="redirectToSubscriptionDetail" />
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