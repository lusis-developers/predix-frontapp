<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  value: {
    type: Boolean,
    required: true
  }
});

const isActive = ref(props.value);

function toggle(): void {
  isActive.value = !isActive.value;
  emit('update:modelValue', isActive.value);

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
              :class="{ 'active': isActive }" />
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
  width: 60px;
  height: 30px;
  margin-top: 12px;
  background-color: #ccc;
  border-radius: 15px;
  cursor: pointer;
}

.slider {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: $white;
  transition: 0.4s;
}

.slider.active {
  background-color: $green;
  transform: translateX(30px);
}
</style>
