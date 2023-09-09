<script setup lang="ts">
import { onMounted } from 'vue';

const emit = defineEmits(['close-edit']);

onMounted(() => {

})
</script>

<template>
  <div class="edit-container-sport">
    <div class="edit-container-sport-back">
      <i class="fa-sharp fa-solid fa-arrow-left icon" />
      <CrushButton
        class="button"
        variant="textonly"
        text="Volver"
        @click="emit('close-edit')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-container-sport {
  &-back {
    display: flex;
    align-items: center;
    .icon {
      color: $green;
      font-size: 24px;
    }
    .button {
      background-color: transparent;
    }
  }
}
</style>