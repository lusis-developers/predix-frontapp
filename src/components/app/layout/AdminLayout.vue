<script setup lang="ts">
import InternalNavbar from '../NavBars/InternalNavbar.vue';
import AdminHeader from './AdminHeader.vue';

</script>

<template>
  <div class="admin-layout">
    <div class="admin-layout-menu">
      <internal-navbar />
      <admin-header />
    </div>
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
  &-menu {
    display: flex;
    align-items: flex-start;
  }
  &-container {
    flex: 1;
  }
}
</style>