<script setup lang="ts">
import { computed, ref } from 'vue';

import { BetStatusEnum } from '@/enum/BetEnum';

const emit = defineEmits(['update:value']);

const props = defineProps({
  status: {
    type: String as () => BetStatusEnum,
    required: true
  }
});

const switchValue = ref(props.status);
const textButton = ref('Pendiente');

function toggleSwitch() {
  switch (switchValue.value) {
    case BetStatusEnum.PENDING:
      switchValue.value = BetStatusEnum.WIN;
      break;
    case BetStatusEnum.WIN:
      switchValue.value = BetStatusEnum.LOST;
      break;
    case BetStatusEnum.LOST:
      switchValue.value = BetStatusEnum.PUSH;
      break;
    case BetStatusEnum.PUSH:
      switchValue.value = BetStatusEnum.PENDING;
      break;
    default:
      switchValue.value = BetStatusEnum.PENDING;
  }
  emit('update:value', switchValue.value);
  switchText();
}


function switchText() {
  switch (switchValue.value) {
    case BetStatusEnum.PENDING:
      textButton.value = 'Pendiente';
      break;
    case BetStatusEnum.WIN:
      textButton.value = 'Ganada';
      break;
    case BetStatusEnum.LOST:
      textButton.value = 'Perdida';
      break;
    case BetStatusEnum.PUSH:
      textButton.value = 'Empate'; 
      break;
    default:
      textButton.value = 'Pendiente';
  }
}

const switchClass = computed(() => {
  return {
    'custom-switch-pending': switchValue.value === BetStatusEnum.PENDING,
    'custom-switch-win': switchValue.value === BetStatusEnum.WIN,
    'custom-switch-lost': switchValue.value === BetStatusEnum.LOST,
    'custom-switch-push': switchValue.value === BetStatusEnum.PUSH,
  }
});
</script>

<template>
  <div
    class="status-switch"
    :class="switchClass"
    @click="toggleSwitch">
    <div class="slider">
      <span>
        {{ textButton }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.status-switch {
  width: 210px;
  height: 40px;
  background-color: #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;
  .slider {
    width: 70px;
    height: 60px;
    background-color: white;
    border-radius: 8px;
    position: absolute;
    transition: transform 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-weight: bold;
      font-size: 14px;
      color: $dark-blue;
    }
  }
}

.custom-switch-pending {
  background-color: #ccc;
  .slider {
    transform: translateX(0);
  }
}

.custom-switch-win {
  background-color: #4caf50;
  .slider {
    transform: translateX(70px);
  }
}

.custom-switch-lost {
  background-color: #f44336;
  .slider {
    transform: translateX(140px);
  }
}

.custom-switch-push {
  background-color: $sky-blue; 
  .slider {
    transform: translateX(160px); 
  }
}
</style>
