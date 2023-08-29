<script setup lang="ts">
import InternalNavbar from '../NavBars/InternalNavbar.vue';
import AdminHeader from './AdminHeader.vue';

</script>

<template>
  <div class="admin-layout">
    <div class="admin-layout-menu">
      <internal-navbar />
      <div class="admin-layout-menu-content">
        <div class="admin-layout-menu-content-header">
          <admin-header />
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
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  &-menu {
    display: flex;
    align-items: flex-start;
    &-content {
      width: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
      @media(min-width: $tablet-lower-breakpoint) {
        padding-left: 0;
      }
      &-header {
        width: 100%;
        max-width: $desktop-upper-breakpoint;
        height: 64px;
        display: flex;
        align-items: center;
      }
      &-page {
        width: 100%;
        max-width: $desktop-upper-breakpoint;
        padding: 24px;
      }
    }
  }
}
</style>