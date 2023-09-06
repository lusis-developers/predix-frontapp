<script setup lang="ts">
import WebHeader from '@/components/web/layout/WebHeader.vue';
import WebFooter from './WebFooter.vue';

</script>

<template>
  <div class="main-app-wrapper crush-container">
    <WebHeader/>
    <div class="main-app-wrapper-view">
      <RouterView/>
    </div>
    <WebFooter/>
  </div>
</template>

<style lang="scss" scoped>
.main-app-wrapper {
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  &-view {
    flex: 1;
  }
}
</style>