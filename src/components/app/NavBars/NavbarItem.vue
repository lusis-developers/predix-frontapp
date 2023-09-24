<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const url = computed(() =>
  route.path.includes('internal-app')
    ? `/internal-app/dashboard/${props.link}`
    : `/user-dashboard/${props.link}`
);

const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
    default: ''
  },
  isMenuOpen: {
    type: Boolean,
    required: true
  }
});
</script>

<template>
  <router-link
    :to="url"
    class="navbar-item">
    <i
      class="navbar-item-icon"
      :class="icon" />  
    <transition name="slide-in-out">
      <span v-show="isMenuOpen">
        {{ name }}
      </span>
    </transition>
  </router-link>
</template>

<style lang="scss" scoped>
.navbar-item {
  width: 100%;
  padding: 8px 16px;
  color: $white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  &-icon {
    color: $white;
    font-size: $h2-font-size;
  }
  span {
    font-family: $font-secondary;
    font-size: $body-font-size;
    font-weight: 700;
    border-bottom: 1px solid $white;
    width: 100%;
    padding-bottom: 12px;
    display: flex;
    gap: 10px;
    align-items: center;
    &:active {
      border-bottom: 1px solid $green;
    }
  }
}

// Classing Animations
.slide-in-out-enter-from {
  opacity: 0;
  transform: translate3d(-5px, 0, 0);
}
.slide-in-out-enter-to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.slide-in-out-enter-active {
  transition: all 200ms ease-in;
}
.slide-in-out-leave-from {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.slide-in-out-leave-to {
  opacity: 0;
  transform: translate3d(-5px, 0, 0);
}
.slide-in-out-leave-active {
  transition: all 10ms ease-in;
}
</style>
