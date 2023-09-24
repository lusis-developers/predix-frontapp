<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import useUserStore from '@/stores/UserStore';

const route = useRoute();

const userStore = useUserStore();

const routeTitle = computed(() => route.meta.title);
const userDisplayed = computed(() => userStore.user?.name ?? userStore.user?.email);
</script>

<template>
  <header class="header">
    <div class="header-logo">
      <p class="header-logo-title">
        {{ routeTitle }}
      </p>
    </div>
    <div class="header-name">
      <img
        v-if="userStore.user?.userImage"
        :src="userStore.user?.userImage"
        :alt="userDisplayed">
      <i
        v-else
        class="fa-solid fa-user" />
      <p>{{ userDisplayed }}</p>
      <i class="fa-solid fa-chevron-down"></i>
      <div class="header-name-options">
        <CrushButton
          variant="primary"
          text="Cerrar Sesión"
          @click="userStore.logout" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-logo {
    display: flex;
    align-items: center;
    gap: 24px; 
    &-title {
      font-family: $font-secondary;
      font-size: $body-font-size;
      font-weight: 700;
    }
  }
  &-name {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    img {
      width: 24px;
      height: 24px;
      border-radius: 100%;
    }
    p {
      font-family: $font-secondary;
      font-size: $body-font-size;
    }
    i {
      color: $white;
    }
    &-options {
      opacity: 0;
      visibility: hidden;
      position: absolute;
      padding: 12px;
      z-index: 10;
      border-radius: 8px;
      top: 100%;
      transition: all 0.3s ease;
    }
    &:hover .header-name-options {
      opacity: 1;
      visibility: visible;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
      padding: 16px;
    }
  }
}
</style>
