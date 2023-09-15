<script setup lang="ts">
import usePlansStore from '@/stores/PlansStore';
import type { Plan } from '@/typings/PlanTypes';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const plansStore = usePlansStore();
const route = useRoute();
const planSelected = ref<Plan>();

onMounted(() => {
  console.log(route.params);
  if (plansStore.plans) {
    planSelected.value = plansStore.plans.find(plan => plan._id === route.params.id);
  }
});

</script>

<template>
  <div class="container">
    <div class="container-card">
      <p class="container-card-name">
        {{planSelected?.name}}
      </p>
      <p class="container-card-price">
        <span class="container-card-price-span">Total a pagar: </span>
        <p class="container-card-price-item">
          {{ `$${planSelected?.price}` }}
        </p>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  &-card {
    width: 100%;
    border: 1px solid $white;
    padding: 24px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    &-name {
      text-align: center;
      color: $green;
      font-size: $h2-font-size;
    }
    &-price {
      text-align: center;
      font-size: $h2-font-size;
      &-span {
        font-size: $body-font-size;
      }
      &-item {
        &::first-letter {
        color: $green;
        font-size: $h1-font-size;
        text-align: center;
        } 
      }
    }
  }
}
</style>