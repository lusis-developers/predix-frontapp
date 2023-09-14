<script setup lang="ts">
import { ref } from 'vue';

import useBetStore from '@/stores/BetStore';
import { BetStatusEnum } from '@/enum/BetEnum';
import StatusSwitch from '../../TheBets/components/StatusSwitch.vue';

const betStore = useBetStore();

const props = defineProps({
  description: {
    type: String,
    required: true
  },
  status: {
    type: String as () => BetStatusEnum,
    required: true
  },
  id: {
    type: String,
    required: true
  }
});

const newStatus = ref<BetStatusEnum>(props.status as BetStatusEnum);

function handleStatus(event: BetStatusEnum) {
  newStatus.value = event;
}

function saveStatus(): void {
  betStore.patchUpdateBetStatus(props.id, newStatus.value);
}
</script>

<template>
  <div class="pending-bet-card">
    <div class="pending-bet-card-detail">
      <label class="label">
        Apuesta
      </label>
      <p>
        {{ description }}
      </p>
    </div>
    <div class="pending-bet-card-actions">
      <StatusSwitch
        :status="newStatus"
        @update:value="handleStatus" />
    </div>
    <div class="pending-bet-card-save">
      <CrushButton
        variant="primary"
        text="Guardar status"
        @click="saveStatus" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.pending-bet-card {
  border: 1px solid $white;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 732px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 24px;
  &-detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 280px;
    .label {
      font-weight: bold;
      font-size: $body-font-size;
      margin-bottom: 20px;
    }
  }
  &-actions {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>