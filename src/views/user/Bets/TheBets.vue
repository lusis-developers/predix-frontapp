<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import useBetStore from '@/stores/BetStore';
import useUserStore from '@/stores/UserStore';
import UserBetCard from './components/UserBetCard.vue';
import BetSuscriptionToggle from './components/BetSuscriptionToggle.vue';
import { SuscriptionTypeEnum } from '@/enum/BetEnum';

const betStore = useBetStore();
const userStore = useUserStore();

const suscriptionType = ref(SuscriptionTypeEnum.ISFREE);
const pendingBets = computed(() => suscriptionType.value === SuscriptionTypeEnum.ISFREE
  ? betStore.freePendingBets
  : betStore.premiumPendingBets
);
const isUserPremium = computed(() => userStore.user?.susbscriptionStatus);

function getBets(): void {
  if (suscriptionType.value === SuscriptionTypeEnum.ISFREE) {
    betStore.getFreePendingBets();
  }
  if (suscriptionType.value === SuscriptionTypeEnum.PREMIUM) {
    if (isUserPremium.value) {
      betStore.getPremiumPendingBets();
    }
  }
}

function toggleBets(event: SuscriptionTypeEnum): void {
  suscriptionType.value = event;
  getBets();
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
      v-if="suscriptionType === SuscriptionTypeEnum.ISFREE && pendingBets && !pendingBets.length"
      class="bets-text">
      <p class="bets-text-message">Oh! no tenemos apuestas por el momento</p>
      <p class="bets-text-message indication">Una vez te hayas suscritos te diremos como ganar tus apuestas</p>
    </div>
    <div class="bets-container">
      <UserBetCard
        v-for="(bet, index) in pendingBets"
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
    <div
      v-if="isUserPremium"
      class="bets-container">
      <UserBetCard
        v-for="(bet, index) in pendingBets"
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
    <span class="nosub-text" v-if="!isUserPremium && !(suscriptionType === SuscriptionTypeEnum.ISFREE)">
      <p class="bets-text-message">Oh! no cuentas con suscripción premium</p>
      <p class="indication">Una vez te hayas suscritos te daremos más apuestas para ganar</p>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.bets {
  padding: 0 24px;
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
    &-message {
      color: $white;
      text-align: center;
      font-family: $font-secondary;
      font-size: $h2-font-size;
    }
    .indication {
      font-size: $body-font-size;
    }
  }
  &-container {
    display: grid;
    place-items: center;
    align-items: flex-start;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
    span {
      width: 100%;
    }
  }
  .nosub-text {
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .indication {
      font-family: $font-secondary;
      font-size: $body-font-size;
      text-align: center;
    }
  }
}
</style>