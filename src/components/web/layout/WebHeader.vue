<script setup lang="ts">
const buttons = [
  {
    text: 'Histórico'
  },
  {
    text: 'Planes'
  },
  {
    text: 'Contacto'
  },
  {
    text: 'Empezar gratis'
  },
  {
    text: 'Suscribirse'
  },
];

const emit = defineEmits();

const toggleMenu = () => {
  emit('toggle-menu');
}
</script>

<template>
  <header class="header">
    <figure>
      <img src="@/assets/logo-small.png" alt="Predix">
    </figure>
    <div 
      class="header-icon"
      @click="toggleMenu">
      <i class="fa-solid fa-bars" />
    </div>
    <div 
      class="header-buttons"
      >
      <button 
      v-for="(button, index) in buttons" 
      :key="index">
        {{ button.text }}
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  &-icon {
    display: flex;
    color: $white;
    @media (min-width: $tablet-upper-breakpoint) {
      display: none;
    }
  }
  &-buttons {
    display: none;;
    @media (min-width: $tablet-upper-breakpoint) {
      display: flex;
      gap: 16px;
      justify-content: space-around;
      align-items: center;
    }
    & :first-child, :nth-child(2) {
      color: $green;
    }
    & :nth-child(4) {
      border: 1px solid $green;
    }
    & :nth-child(5) {
      background-color: $green;
      color: $dark-blue;
    }
    button {
      border-radius: 8px;
      padding: 12px 16px;
      color: $white;
      background: none;
      border: none;
      outline: none;
      font-weight: 700;
      font-size: $body-font-size;
    }
  }
}
</style>