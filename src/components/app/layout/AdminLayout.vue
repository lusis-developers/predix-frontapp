<script setup lang="ts">
import AdminHeader from './AdminHeader.vue';
</script>

<template>
  <div class="admin-layout">
    <admin-header />
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
  &-container {
    flex: 1;
  }
}
</style>