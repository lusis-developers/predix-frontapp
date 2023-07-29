<script setup lang="ts">
import AdminHeader from '@/components/app/layout/AdminHeader.vue';
</script>

<template>
  <div class="internal-app crush-container">
    <admin-header />
    <div class="internal-app-content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.internall-app {
  &-content {
    padding: 24px;
  }
}
</style>