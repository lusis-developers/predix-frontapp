<script setup lang="ts">
import TheHero from './components/TheHero.vue';
</script>

<template>
  <div class="container-hero">
    <TheHero/>
  </div>
</template>

<style lang="scss" scoepd>
.container {
  &-hero {
    display: flex;
    justify-content: center;
  }
}
</style>