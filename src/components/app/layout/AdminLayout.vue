<script setup lang="ts">
import InternalNavbar from '../NavBars/InternalNavbar.vue';

</script>

<template>
  <div class="admin-layout">
    <internal-navbar />
    <div class="admin-layout-container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  width: 100%;
  color: $white;
  display: flex;
  flex-direction: column;
  &-container {
    flex: 1;
  }
}
</style>