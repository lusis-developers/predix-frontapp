<script setup lang="ts">
import { computed } from 'vue';
import {  RouterView, useRoute } from 'vue-router';

const route = useRoute();
const isWebPath = computed(() => route.path === '/web');

</script>

<template>
  <div 
    class="app-container"
    :class="{ 'web-background': isWebPath }">
    <div class="app-container-view">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
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
.web-background {
  background: linear-gradient(180deg, #070E21 0.6%, #01DF71 534.43%);
}
</style>
