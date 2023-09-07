<script setup lang="ts">
const buttons = [
  {
    text: 'boton'
  },
  {
    text: 'boton'
  },
  {
    text: 'boton'
  },
  {
    text: 'boton'
  }
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
    @media (min-width: $tablet-lower-breakpoint) {
      display: none;
    }
  }
  &-buttons {
    display: none;
    width: 60%;
    @media (min-width: $tablet-lower-breakpoint) {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    & :first-child, :nth-child(2) {
      color: $green;
    }
    & :nth-child(3) {
      border: 1px solid $green;
    }
    & :nth-child(4) {
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