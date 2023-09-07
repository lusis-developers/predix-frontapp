<script setup lang="ts">
import { onMounted, ref } from 'vue';

import useSportStore from '@/stores/SportStore';
import SportCard from './components/SportCard.vue';


const sportStore = useSportStore();
const showForm = ref(false);

function toggleForm (): void {
  showForm.value = !showForm.value
  if (!showForm.value) {
    resetValues();
  }
}

onMounted(async () => {
  await sportStore.getSports();
});

// function editPlan(event: string) {
//   planStore.selectedPlan = findPlanById(event);
//   formType.value = FormTypeEnum.EDIT;
//   toggleForm();
// }

function resetValues(): void {
  console.log('reset values')
}

// function findPlanById(id: string): Plan {
//   return planStore.plans?.find((plan: Plan) => plan._id === id)!; 
// }
</script>

<template>
  <div class="container">
    <CrushButton
      class="container-button"
      variant="primary"
      text="Nuevo Deporte"
      @click="toggleForm"/>
    <div
      v-if="!sportStore.sports?.length"
      class="container-text">
      <p>Oh! Aún no has creado los deportes</p>
      <p class="indication">Una vez hayas creado tus deportes, los encontrarás aquí</p>
    </div>
    <transition name="fade">
      <div class="container-form" v-if="showForm"> 
        Create deporte
      </div>
    </transition>
    <div class="container-plans">
      <SportCard
        v-for="(sport, index) in sportStore.sports"
        :key="index"
        :name="sport.name"
        :image="sport.image" />
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
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
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
