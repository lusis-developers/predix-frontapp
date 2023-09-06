<script setup lang="ts">
import InternalNavbar from '../NavBars/InternalNavbar.vue';
import AdminHeader from '@/components/app/layout/AdminHeader.vue';

</script>

<template>
  <div class="admin-layout">
    <div class="admin-layout-menu">
      <internal-navbar />
      <div class="admin-layout-menu-content">
        <div class="admin-layout-menu-content-header">
          <AdminHeader />
        </div>
        <div class="admin-layout-menu-content-page">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  width: 100%;
  color: $white;
  margin: 0 auto;
  &-menu {
    display: flex;
    align-items: flex-start;
    &-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 100vh;
      &-header {
        width: 100%;
        height: 64px;
        display: flex;
        align-items: center;
      }
      &-page {
        flex: 1;
        overflow-y: auto;
        width: 100%;
        padding: 24px;
        border-top: 1px solid $grey;
      }
    }
  }
}
</style>