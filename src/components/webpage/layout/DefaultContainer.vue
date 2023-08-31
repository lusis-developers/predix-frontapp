<script setup lang="ts">
import WebHeader from './WebHeader.vue';
import WebFooter from './WebFooter.vue';
</script>

<template>
  <div class="main-app-wrapper crush-container">
    <WebHeader />
    <router-view />
    <WebFooter />
  </div>
</template>

<style lang="scss" scoped>
.main-app-wrapper {
  width: 100%;
  margin: auto;
}
</style>
