<script setup lang="ts">
const buttons = [
  {
    text: 'Botón'
  },
  {
    text: 'Botón'
  },
  {
    text: 'Botón'
  },
  {
    text: 'Botón'
  },
]
</script>

<template>
  <div class="section">
      <button 
        class="section-button"
        v-for="(button, index) in buttons"
        :key="index"
      >
        {{ button.text }}
      </button>
    </div>
</template>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
}
</style>
