<script setup lang="ts">
import {  RouterView } from 'vue-router';


</script>

<template>
  <div 
    class="app-container">
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

</style>
