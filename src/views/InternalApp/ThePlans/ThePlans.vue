<script setup lang="ts">
import { onMounted, ref } from 'vue';

import ThePlan from '@/views/InternalApp/ThePlans/components/ThePlan.vue';
import usePlanStore from '@/stores/PlansStore';
import TheForm from './components/TheForm.vue';

const planStore = usePlanStore();
const showForm = ref(false);

const openForm = () => {
  showForm.value = true;
};

onMounted(async () => {
  await planStore.getPlans();
});
</script>

<template>
  <div class="container">
    <CrushButton
      class="container-button"
      variant="primary"
      text="Nuevo Plan"
      @click="openForm"/>
    <div v-if="!planStore.plans?.length" class="container-text">
      <p>Oh! Aún no has creado los planes de suscripción</p>
      <p class="indication">Una vez hayas creado tus planes, los encontrarás aquí</p>
    </div>
    <div class="container-form" v-if="showForm"> 
      <TheForm @closeForm="showForm = false" />
    </div>
    <div class="container-plans">
      <ThePlan 
        v-for="(plan, index) in planStore.plans"
        :key="index"
        :image="plan.image"
        :title="plan.name"
        :price="plan.price"/>
    </div>
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
  &-form {
    margin: 0 auto;
    max-width: $desktop-upper-breakpoint;
    margin-bottom: 48px;
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
