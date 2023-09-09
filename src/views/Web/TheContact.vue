<script setup lang="ts">
import TheForm from './components/TheForm.vue';


</script>

<template>
  <div class="container">
    <p class="container-title">
      Contacto
    </p>
    <TheForm/>
  </div>  
</template>

<style lang="scss" scoped>
.container {
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
  &-title {
    font-size: $body-font-size;
    @media (min-width: $tablet-lower-breakpoint) {
      font-size: $h1-font-size;
    }
  }
}
</style>