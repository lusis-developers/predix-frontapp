<script setup lang="ts">
import { computed, onMounted } from 'vue';

import useBetStore from '@/stores/BetStore';
import PendingBetCard from './components/PendingBetCard.vue';

const betStore = useBetStore();

const isTherePendingBets = computed(() => betStore.pendingBets);

onMounted(() => {
  if (!isTherePendingBets.value) {
    betStore.getPendingBets();
  }
})
</script>

<template>
  <div class="pending-bets">
    <div
      v-if="!isTherePendingBets"
      class="pending-bets-text-message">
      <p>Oh! No hay apuestas pendientes.</p>
      <p class="indication">Una vez hayas creado tus apuestas, encontrarás aquí las pendientes</p>
    </div>
    <div
      v-else
      class="pending-bets-container">
      <PendingBetCard
        v-for="(bet, index) in betStore.pendingBets"
        :key="index"
        :description="bet.description"
        :status="bet.status"
        :id="bet._id!" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pending-bets {
  padding: 0 12px;
  &-text-message {
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
  &-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5%;
    justify-content: center;
    align-items: center;
  }
}
</style>
