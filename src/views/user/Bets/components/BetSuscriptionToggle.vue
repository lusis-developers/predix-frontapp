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
const toggleText = computed(() => isFreeClass.value ? 'Gratuitos' : 'Suscritos');

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
        <div class="input-container">
          <div
            class="toggle-switch"
            @click="toggle">
            <div class="toggle-switch-back">
              <span>
                Gratuitos
              </span>
              <span>
                Suscritos
              </span>
            </div>
            <div
              class="slider"
              :class="{ 'active': !isFreeClass }">
              {{ toggleText }}
            </div>
          </div>
        </div>
      </label>
    </div>
</template>

<style lang="scss" scoped>
.input-toggle {
  width: 100%;
  position: relative;
  min-width: 120px;
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
  background-color: transparent;
  border-bottom: 1px solid $grey;
  cursor: pointer;
  &-back {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      width: 50%;
      display: flex;
      justify-content: center;
      font-family: $font;
    }
  }
}

.slider {
  position: absolute;
  z-index: 10;
  width: 50%;
  height: 30px;
  background-color: $dark-blue;
  border-bottom: 1px solid $green;
  transition: 0.4s;
  color: $green;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: $font;
  font-weight: bold;
}

.slider.active {
  transform: translateX(100%);
}
</style>
