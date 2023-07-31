<script setup lang="ts">
import InternalNavbar from '../NavBars/InternalNavbar.vue';
import AdminHeader from './AdminHeader.vue';

</script>

<template>
  <div class="admin-layout">
    <div class="admin-layout-menu">
      <internal-navbar />
      <div class="admin-layout-menu-header">
        <admin-header />
      </div>
    </div>
    <div class="admin-layout-container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  width: 100%;
  max-width: $desktop-upper-breakpoint;
  color: $white;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  &-menu {
    display: flex;
    align-items: flex-start;
    &-header {
      width: 100%;
      display: flex;
      padding-left: 60px;
      @media(min-width: $tablet-lower-breakpoint) {
        padding-left: 0;
      }
    }
  }
  &-container {
    flex: 1;
  }
}
</style>