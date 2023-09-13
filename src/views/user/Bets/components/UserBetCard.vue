<script setup lang="ts">

import { BetStatusEnum } from '@/enum/BetEnum';
import { formatDateToCustom } from '@/utils/InputFormats';

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
})
</script>

<template>
  <div class="user-bet-card">
    <span class="user-bet-card-sport">
      {{ sport }}
    </span>
    <div class="user-bet-card-details">
      <div class="user-bet-card-details-match">
        <span>
          {{ league }}
        </span>
        <div class="user-bet-card-details-match-details">
          <span>
            {{ teamA }}
          </span>
          <span>
            {{ teamB }}
          </span>
        </div>
      </div>
      <div class="user-bet-card-details-numbers">
        <span>
          {{ profit }}
        </span>
        <span>
          {{ percentage }}
        </span>
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
      <span>
        {{ status }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-bet-card {
  width: 100%;
  border: 1px solid $yellow;
  border-radius: 8px;
  padding: 12px;
  &-sport {
    font-family: $font-secondary;
    font-size: $body-font-size;
  }
}
</style>