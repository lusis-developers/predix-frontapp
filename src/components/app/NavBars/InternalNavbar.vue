<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import NavbarLogo from './NavbarLogo.vue';
import NavbarItem from './NavbarItem.vue';

import Navigation from '@/typings/WebPage';

const isMenuOpen = ref(false);


const menutItems: Navigation[] = [
  {
    name: 'Histórico',
    link: 'record',
    icon: 'fa-solid fa-chart-area',
  },
  {
    name: 'Resultados',
    link: 'results',
    icon: 'fa-solid fa-star'
  },
  {
    name: 'Apuestas',
    link: 'bets',
    icon: 'fa-solid fa-chalkboard-user'
  },
  {
    name: 'Planes',
    link: 'plans',
    icon: 'fa-solid fa-ticket'
  },
];

onMounted(() => {
  window.addEventListener('resize', handleResize)
});

const handleResize = () => {
  if(window.innerWidth > 500) {
    isMenuOpen.value = false;
  }
}
const toggleMenu = () => {
  if (window.innerWidth > 500) {
    isMenuOpen.value = !isMenuOpen.value;
  }
};
const sideBarWidth = computed(() => {
  if (window.innerWidth < 500) {
    return '54px';
  } else {
    return isMenuOpen.value ? '188px' : '54px';
  }
});
const iconButton =
  computed(() => isMenuOpen.value
    ? 'fa-solid fa-chevron-left'
    : 'fa-solid fa-chevron-right'
  );
</script>

<template>
  <Transition name="toggle-menu">
    <div
      class="navbar"
      :style="{width: sideBarWidth}">
      <div class="navbar-logo">
        <NavbarLogo :isMenuOpen="isMenuOpen" />
        <button 
          class="navbar-logo-button"
          @click="toggleMenu">
          <i :class="iconButton" />
        </button>
      </div>
      <div class="navbar-content">
        <ul class="navbar-content-list">
          <NavbarItem
            v-for="(item, index) in menutItems"
            :key="index"
            :link="item.link"
            :icon="item.icon"
            :name="item.name"
            :isMenuOpen="isMenuOpen" />
        </ul>
      </div>
    </div>
  </Transition>
</template>


<style lang="scss" scoped>
.navbar {
  z-index: 10;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 0 20px 0;
  border-right: 1px solid $gray-dark;
  &-logo {
    padding: 13px;
    background-color: $dark-blue;
    width: 100%;
    height: 64px;
    margin: auto;
    position: relative;
    display: flex;
    justify-content: center;
    &-button {
      position: absolute;
      bottom: -16px;
      right: -16px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 4px solid rgba(240, 246, 246, 0.5);
      color: $white;
      background-color: $purple-dark;
      outline: none;
    }
  }
  &-content {
    padding: 24px 12px;
    flex: 1;
    overflow-y: auto;
    scroll-behavior: smooth;
    border-top: 1px solid $gray-dark;
    &::-webkit-scrollbar {
      display: none;
    }
    &-list {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      gap: 16px;
      list-style-type: none;
      padding: 0;
    }
  }
}


// Classing Animations
.toggle-menu-enter-from {
  width: 188px;
}
.toggle-menu-enter-to {
  width: 54px;
}
.toggle-menu-enter-active {
  transition: all 300ms ease;
}
.toggle-menu-leave-from {
  width: 54px;
}
.toggle-menu-leave-to {
  width: 188px;
}
.toggle-menu-leave-active {
  transition: all 300ms ease;
}
</style>