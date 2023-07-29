<script setup lang="ts">
import {  RouterView } from 'vue-router'
import WebHeader from './components/webpage/layout/WebHeader.vue';
import WebFooter from './components/webpage/layout/WebFooter.vue';
</script>

<template>
  <div class="app-container">
    <WebHeader />
    <div class="app-container-view">
      <RouterView />
    </div>
    <WebFooter />
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  background-color: $dark-blue;
	min-height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
  &-view {
    flex: 1;
  }
}
</style>
