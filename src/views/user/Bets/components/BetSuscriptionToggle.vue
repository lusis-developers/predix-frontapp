<script setup lang="ts">
import { ref, computed } from 'vue';

import { SuscriptionTypeEnum } from '@/enum/BetEnum';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  value: {
    type: String as () => SuscriptionTypeEnum,
    required: true
  }
});

const suscriptionType = ref(props.value);
const isFreeClass = computed(() => suscriptionType.value === SuscriptionTypeEnum.ISFREE);

function toggle(): void {
  if (suscriptionType.value === SuscriptionTypeEnum.ISFREE) {
    suscriptionType.value = SuscriptionTypeEnum.PREMIUM
  } else {
    suscriptionType.value = SuscriptionTypeEnum.ISFREE
  }
  emit('update:modelValue', suscriptionType.value);
}
</script>

<template>
  <div class="input-toggle">
      <label>
        <span>
          Es gratis
        </span>
        <div class="input-container">
          <div
            class="toggle-switch"
            @click="toggle">
            <div
              class="slider"
              :class="{ 'active': isFreeClass }">
              {{ suscriptionType }}
            </div>
          </div>
        </div>
      </label>
    </div>
</template>

<style lang="scss" scoped>
.input-toggle {
  width: 100%;
  label {
    width: 100%;
    span {
      color: #f0f6f6;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .input-container {
      width: 100%;
      display: flex;
      justify-content: flex-start;
    }
  }
}
.toggle-switch {
  position: relative;
  width: 100%;
  height: 30px;
  margin-top: 12px;
  background-color: #ccc;
  border-radius: 15px;
  cursor: pointer;
}

.slider {
  position: absolute;
  width: 100%;
  height: 30px;
  border-radius: 50%;
  background-color: $white;
  transition: 0.4s;
}

.slider.active {
  transform: translateX(30px);
}
</style>
