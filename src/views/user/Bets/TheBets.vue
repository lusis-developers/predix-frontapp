<script setup lang="ts">
import useBetStore from '@/stores/BetStore';

import { onMounted, ref } from 'vue';
import UserBetCard from './components/UserBetCard.vue';
import BetSuscriptionToggle from './components/BetSuscriptionToggle.vue';
import { SuscriptionTypeEnum } from '@/enum/BetEnum';

const betStore = useBetStore();

const suscriptionType = ref(SuscriptionTypeEnum.ISFREE)

function getBets(): void {
  if (suscriptionType.value === SuscriptionTypeEnum.ISFREE) {
    betStore.getFreePendingBets();
  } else {
    betStore.getPendingBets();
  }
}

function toggleBets(event: SuscriptionTypeEnum): void {
  suscriptionType.value = event;
}

onMounted(() => {
  getBets();
})
</script>

<template>
  <div class="bets">
    <div class="bets-toggle">
      <BetSuscriptionToggle
        :value="suscriptionType"
        @update:modelValue="toggleBets" />
    </div>
    <div
      v-if="!betStore.freePendingBets?.length"
      class="bet-text">
      <p>Oh! no tenemos apuestas por el momento</p>
      <p class="indication">Una vez te hayas suscritos te diremos como ganar tus apuestas</p>
    </div>
    <div class="bets-container">
      <UserBetCard
        v-for="(bet, index) in betStore.freePendingBets"
        :key="index"
        :status="bet.status"
        :description="bet.description"
        :date="bet.date"
        :league="bet.league"
        :percentage="bet.percentage"
        :profit="bet.profit"
        :sport="bet.sport"
        :teamA="bet.teamA"
        :teamB="bet.teamB"  />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bets {
  width: 100%;
  &-toggle {
    margin-bottom: 24px;
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
  &-container {
    display: grid;
    place-items: self-start;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    gap: 24px;
  }
}
</style>