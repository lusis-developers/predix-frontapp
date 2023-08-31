<script setup lang="ts">
const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <TransitionGroup name="toggle-logo">
    <img 
      v-show="isMenuOpen"
      :key="isMenuOpen ? 'logo-open' : 'logo-closed'"
      class="navbar-logo-image"
      src="@/assets/logo.png"
      alt="Predix"/>
    <img
      v-show="!isMenuOpen"
      :key="isMenuOpen ? 'favicon-open' : 'favicon-closed'"
      class="navbar-logo-favicon"
      src="@/assets/logo-small.svg"/>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.navbar-logo {
  &-image {
    width: 100px;
  }
  &-favicon {
    height: 38px;
    width: auto;
  }
}

// Animation logo
.toggle-logo-enter-from .navbar-logo-image {
  opacity: 0;
  transform: translate3d(-25px, 0, 0);
}
.toggle-logo-enter-to .navbar-logo-image {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.toggle-logo-enter-active .navbar-logo-image {
  transition: all 50ms ease;
}
.toggle-logo-leave-from .navbar-logo-image {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.toggle-logo-leave-to .navbar-logo-image {
  opacity: 0;
  transform: translate3d(25px, 0, 0);
}
.toggle-logo-leave-active .navbar-logo-image {
  transition: all 50ms ease;
}

// Animation favicon
.toggle-logo-enter-from .navbar-logo-favicon {
  opacity: 0;
  transform: translate3d(-25px, 0, 0);
}
.toggle-logo-enter-to .navbar-logo-favicon {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.toggle-logo-enter-active .navbar-logo-favicon {
  transition: all 50ms ease;
}
.toggle-logo-leave-from .navbar-logo-favicon {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.toggle-logo-leave-to .navbar-logo-favicon {
  opacity: 0;
  transform: translate3d(25px, 0, 0);
}
.toggle-logo-leave-active .navbar-logo-favicon {
  transition: all 50ms ease;
}
</style>