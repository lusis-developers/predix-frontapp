<script setup lang="ts">
import { onMounted } from 'vue';
import TheSubscription from '@/components/TheSubscription.vue';

import usePlanStore from '@/stores/PlansStore';

const planStore = usePlanStore();

onMounted(async () => {
  await planStore.getPlans();
})
</script>

<template>
  <div class="container">
    <p class="container-title">
      Suscripciones
    </p>
    <template v-if="planStore.plans?.length">
      <TheSubscription 
        v-for="(plan, index) in planStore.plans"
        :key="index"
        :link="plan._id!"
        :image="plan.image"
        :title="plan.name"
        :price="plan.price"
        :id="plan._id!"/>
    </template>
    <p 
      class="container-text"
      v-else>
      !Oh! Parece que aún no hay planes, regresa más tarde
    </p>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 24px;
  &-title {
    width: 100%;
    text-align: center;
    font-size: $h2-font-size;
    @media(min-width: $tablet-lower-breakpoint){
      font-size: $h1-font-size;
    }
    color: $white;
  }
  &-text {
    font-family: $font-secondary;
    font-size: $h3-font-size;
    @media (min-width: $tablet-upper-breakpoint) {
      font-size:$h2-font-size;
    }
  }
}
</style>