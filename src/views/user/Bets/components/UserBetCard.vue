<script setup lang="ts">
import { computed } from 'vue';

import { BetStatusEnum } from '@/enum/BetEnum';
import { formatDateToCustom, formatNumberToProfit } from '@/utils/InputFormats';


const props = defineProps({
  sport: {
    type: String,
    required: true
  },
  league: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  profit: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  teamA: {
    type: String,
    required: true
  },
  teamB: {
    type: String,
    required: true
  },
  status: {
    type: String as () => BetStatusEnum,
    required: true
  }
});

const matchStatus = computed(() => {
  if (props.status === BetStatusEnum.PENDING) {
    return 'Por jugarse'
  }
  return '';
});
</script>

<template>
  <div class="user-bet-card">
    <span class="user-bet-card-sport">
      {{ sport }}
    </span>
    <div class="user-bet-card-details">
      <div class="user-bet-card-details-match">
        <span class="league">
          {{ league }}
        </span>
        <div class="user-bet-card-details-match-details">
          <span class="team">
            <span class="team-prefix">E1: </span>{{ teamA }}
          </span>
          <span>
            vs
          </span>
          <span class="team">
            <span class="team-prefix">E2: </span>{{ teamB }}
          </span>
        </div>
      </div>
      <div class="user-bet-card-details-numbers">
        <div class="container">
          <span class="container-title">
            Cuota
          </span>
          <span class="container-number">
            {{ formatNumberToProfit(profit) }}
          </span>
        </div>
        <div class="container">
          <span class="container-title">
            Porcentaje
          </span>
          <span class="container-number">
            {{ percentage }}%
          </span>
        </div>
        <span class="container-message">*De tu capital*</span>
      </div>
    </div>
    <span class="user-bet-card-date">
      {{ formatDateToCustom(date) }}
    </span>
    <p class="user-bet-card-description">
      {{ description }}
    </p>
    <div class="user-bet-card-status">
      <span>
        Estado
      </span>
      <span class="user-bet-card-status-value">
        {{ matchStatus }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-bet-card {
  width: 100%;
  max-width: 640px;
  border: 1px solid $yellow;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  &-sport {
    font-family: $font-secondary;
    font-size: $body-font-size;
  }
  &-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    &-match {
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
      font-weight: lighter;
      font-size: $body-font-size;
      .league {
        font-size: $h3-font-size;
        font-family: $font-secondary;
      }
      &-details {
      font-weight: 300;
      font-size: $body-font-size;
      margin-top: 12px;
      .team {
        font-weight: 700;
        color: rgb(232, 113, 113);
        &-prefix {
          color: $white;
        }
      }
    }
    }
    &-numbers {
      display: flex;
      flex-direction: column;
      .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 12px;
        &-title {
          font-family: $font-secondary;
          text-align: center;
        }
        &-number {
          color: $green;
          font-family: $font;
          font-size: $h3-font-size;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%; 
          text-align: right;
        }
        &-message {
          color: $yellow;
          text-align: left;
          font-size: $body-font-x-small;
        }
      }
    }
  }
  &-description {
    color: $green;
    font-family: $font-secondary;
    font-size: $body-font-size;
  }
  &-status {
    display: flex;
    justify-content: center;
    font-weight: 700;
    font-family: $font-secondary;
    &-value {
      flex: 1;
      display: flex;
      justify-content: center;
      font-weight: 300;
      font-family: $font-secondary;
    }
  }
}
</style>