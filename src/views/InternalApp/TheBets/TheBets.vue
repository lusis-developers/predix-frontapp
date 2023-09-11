<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import useBetStore from '@/stores/BetStore';
import useSportStore from '@/stores/SportStore';
import BetCard from './components/BetCard.vue';
import CreateOrEditBet from './components/CreateOrEditBet.vue';

const sportStore = useSportStore();
const betStore = useBetStore();

const showForm = ref(false);
const isBetSelected = ref(false);
const cardsAreVisible = computed(() => betStore.bets?.length && !showForm.value);

function toggleForm (): void {
  showForm.value = !showForm.value
  if (betStore.selectedBet) {
    betStore.selectedBet = null;
  }
}

function toggleEdit() {
  isBetSelected.value = !isBetSelected.value;
  toggleForm();
}

function selectBet(event: string) {
  toggleEdit();
  betStore.selectedBet = betStore.bets?.find((bet) => bet._id === event)!;
}

onMounted(async () => {
  if (!betStore.bets) {
    await betStore.getBets();
  }
  if (!sportStore.sports) {
    await sportStore.getSports();
  }
});
</script>

<template>
  <div class="create-container">
    <CrushButton
      class="container-button"
      variant="primary"
      text="Nueva apuesta"
      @click="toggleForm"/>
    <transition name="fade">
      <div
        v-if="showForm"
        class="create-container-form"> 
        <CreateOrEditBet @close-form="toggleForm" />
      </div>
    </transition>
    <div
      v-if="!betStore.bets?.length"
      class="create-container-text">
      <p>Oh! Aún no has creado apuestas</p>
      <p class="indication">Una vez hayas creado tus apuestas, los encontrarás aquí</p>
    </div>
    <div
      v-if="cardsAreVisible"
      class="create-container-bets">
      <BetCard
        v-for="(bet, index) in betStore.bets"
        :key="index"
        :id="bet._id!"
        :league="bet.league"
        :sport="bet.sport"
        :isFree="bet.isFree"
        :date="bet.date"
        :description="bet.description"
        :percentage="bet.percentage"
        :profit="bet.profit"
        :status="bet.status"
        :teamA="bet.teamA"
        :teamB="bet.teamB"
        @selectBet="selectBet" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-container {
  &-button {
    font-size: $body-font-size;
    color: $dark-blue;
    background-color: $green;
    margin-bottom: 48px;
    &:hover {
      background-color: $green;
    }
  }
  &-form {
    margin: 0 auto;
    max-width: $desktop-upper-breakpoint;
    margin-bottom: 48px;
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
  &-bets {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    margin: 24px 0;
  }
}

.edit-container {
  width: 100%;
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
