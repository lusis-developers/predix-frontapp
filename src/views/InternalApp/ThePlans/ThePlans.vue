<script setup lang="ts">
import { onMounted, ref } from 'vue';

import PlanCard from '@/views/InternalApp/ThePlans/components/PlanCard.vue';
import usePlanStore from '@/stores/PlansStore';
import { FormTypeEnum } from '@/enum/PlanEnum';
import CreatePlan from './components/CreatePlan.vue';

const planStore = usePlanStore();
const showForm = ref(false);
const formType = ref<FormTypeEnum>();

function toggleForm (): void {
  showForm.value = !showForm.value
  if (!showForm.value) {
    resetValues();
  }
}

onMounted(async () => {
  await planStore.getPlans();
});

function editPlan(event: string) {
  planStore.selectedPlanId = event;
  formType.value = FormTypeEnum.EDIT;
  toggleForm();
}

function resetValues(): void {
  planStore.selectedPlanId = null;
  formType.value = FormTypeEnum.SAVE;
}
</script>

<template>
  <div class="container">
    <CrushButton
      class="container-button"
      variant="primary"
      text="Nuevo Plan"
      @click="toggleForm"/>
    <div
      v-if="!planStore.plans?.length"
      class="container-text">
      <p>Oh! Aún no has creado los planes de suscripción</p>
      <p class="indication">Una vez hayas creado tus planes, los encontrarás aquí</p>
    </div>
    <transition name="fade">
      <div class="container-form" v-if="showForm"> 
        <CreatePlan
          :formType="formType"
          @closeForm="toggleForm" />
    </div>
    </transition>
    <div class="container-plans">
      <PlanCard 
        v-for="(plan, index) in planStore.plans"
        :key="index"
        :image="plan.image"
        :title="plan.name"
        :price="plan.price"
        :id="plan._id!"
        @edit-plan="editPlan" />
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
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
</style>
