<script setup lang="ts">
import { computed, ref } from 'vue';

import { BetStatusEnum } from '@/enum/BetEnum';
import { formatDateToCustom, formatNumberToProfit } from '@/utils/InputFormats';
import useBetStore from '@/stores/BetStore';

const betStore = useBetStore();

const emit = defineEmits(['select-bet']);

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  league: {
    type: String,
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
  date: {
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
  description: {
    type: String,
    required: true
  },
  isFree: {
    type: Boolean,
    required: true
  },
  status: {
    type: String as () => BetStatusEnum,
    required: true
  }
})

const isCardOpen = ref(false);

const arrowPosition = computed(() => !isCardOpen.value ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up')
const betIsFree = computed(() => props.isFree ? 'Gratuito' : 'Premium')

function toggleBet(): void {
  isCardOpen.value = !isCardOpen.value;
}

function editBet(): void {
  emit('select-bet', props.id)
}

function deleteBet(): void {
  betStore.deleteBet(props.id);
}
</script>

<template>
  <div class="bet-card">
    <button @click="toggleBet">
      <i 
        class="icon"
        :class="arrowPosition" />
    </button>
    <div class="bet-card-content">
      <div class="bet-card-content-detail">
        <p class="title">
          Apuesta
        </p>
        <p 
          class="detail-description"
          :class="{'text-description': !isCardOpen}">
          {{ description }}
        </p>
      </div>
      <div class="bet-card-content-detail">
          <p class="title">
            Equipo 1
          </p>
          <p class="detail-description">
            {{ teamA }}
          </p>
        </div>
        <div class="bet-card-content-detail">
          <p class="title">
            Equipo 2
          </p>
          <p class="detail-description">
            {{ teamB }}
          </p>
        </div>
      <template v-if="isCardOpen">
        <div class="bet-card-content-detail">
          <p class="title">
            Fecha
          </p>
          <p class="detail-description">
            {{ formatDateToCustom(date) }}
          </p>
        </div>
        <div class="bet-card-content-detail">
          <p class="title">
            Deporte
          </p>
          <p class="detail-description">
            {{ sport }}
          </p>
        </div> 
        <div class="bet-card-content-detail">
          <p class="title">
            Liga
          </p>
          <p class="detail-description">
            {{ league }}
          </p>
        </div>
        <div class="bet-card-content-detail">
          <p class="title">
            Ganancia
          </p>
          <p class="detail-description">
            {{ formatNumberToProfit(profit) }}
          </p>
        </div>
        <div class="bet-card-content-detail">
          <p class="title">
            Procentaje
          </p>
          <p class="detail-description">
            {{ percentage }}
          </p>
        </div>
        <div class="bet-card-content-detail">
          <p class="title">
            Estado
          </p>
          <p class="detail-description">
            {{ status }}
          </p>
        </div>
        <div class="bet-card-content-detail">
          <p class="title">
            Es gratis
          </p>
          <p class="detail-description">
            {{ betIsFree }}
          </p>
        </div>
        <div class="bet-card-content-detail">
          <p class="title">
            Actions
          </p>
          <div class="bet-actions">
            <button
              class="action"
              @click="editBet">
              <i class="fa-solid fa-pen icon" />
            </button>
            <button
              class="action"
              @click="deleteBet">
              <i class="fa-solid fa-trash icon erase" />
            </button>
          </div>
        </div>
      </template>
    </div>
    <span
      class="status"
      :class="{
        'status-pending': status === BetStatusEnum.PENDING, 
        'status-win': status === BetStatusEnum.WIN, 
        'status-lost': status === BetStatusEnum.LOST,
        'status-push': status === BetStatusEnum.PUSH,
      }" />
  </div>
</template>

<style lang="scss" scoped>
.bet-card {
  width: 100%;
  max-width: 620px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border: 1px solid $white;
  border-radius: 8px;
  padding: 12px;
  @media (max-width: $tablet-lower-breakpoint) {
    max-width: 300px;
  }
  button {
    background-color: transparent;
    border: none;
    outline: none;
    .icon {
      color: $green;
    }
  }
  &-content {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    &-detail {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .title {
        width: 20%;
      }
      .detail-description {
        width: 60%;
        word-wrap: break-word;
        line-height: 20px;
      }
      .text-description {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .bet-actions {
        display: flex;
        width: 60%;
        gap: 16px;
        button {
          background-color: transparent;
          outline: none;
          border: none;
          .action {
            cursor: pointer;
          }
          .icon {
            color: $green;
            font-size: 20px;
          }
          .erase {
            color: $white;
          }
        }
      }
    }
  }
  .status {
    margin-top: 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: none;
    &-pending {
      background-color: $grey;
    }
    &-win {
      background-color: $green;
    }
    &-lost {
      background-color: $red;
    }
    &-push {
      background-color: $sky-blue;
    }
  }
}
</style>