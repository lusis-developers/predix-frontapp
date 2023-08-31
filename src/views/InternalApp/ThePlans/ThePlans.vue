<script setup lang="ts">
import { onMounted } from 'vue';

import ThePlan from '@/views/InternalApp/ThePlans/components/ThePlan.vue'

import usePlanStore from '@/stores/PlansStore';

const planStore = usePlanStore();

onMounted(async () => {
  await planStore.getPlans();
})
</script>

<template>
  <div class="container">
    <CrushButton
      class="container-button"
      variant="primary"
      text="Nuevo Plan"/>
  </div>
  <div 
    class="container"
    v-if="planStore.plans?.length === 0">
    <div class="container-text">
      <p>
        Oh! Aún no has creado los planes de suscripción 
      </p>
      <p class="indication">
        Una vez hayas creado tus planes, los encontrarás aquí
      </p>
    </div>
  </div>
  <div class="container-plans">
    <ThePlan 
      v-for="(plan, index) in planStore.plans"
      :image="plan.image"
      :title="plan.name"
      :price="plan.price"/>
  </div>
</template>

<style lang="scss" scoped>
.container {
  &-button {
    font-size: $body-font-size;
    color: $dark-blue;
    background-color: $green;
    margin-bottom: 48px;
    &:hover {
      background-color: $green;
    }
  }
  &-text {
    display: flex;
    gap: 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    p {
      color: $white;
      font-family: $font-secondary;
      font-size: $h2-font-size;
    }
    .indication {
      font-size: $body-font-size;
    }
  }
  &-plans {
    display: flex;
    flex-wrap: wrap;
    gap: 5%;
    justify-content: center;
    align-items: center;
  }
}
</style>