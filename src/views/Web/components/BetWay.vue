<script setup lang="ts">
const items = [
  {
    icon: 'fa-solid fa-fingerprint',
    title: 'elige',
    text: 'Selecciona el plan de tu preferencia'
  },
  {
    icon: 'fa-solid fa-fingerprint',
    title: 'apuesta',
    text: 'Revisa tus pronósticos'
  },
  {
    icon: 'fa-solid fa-fingerprint',
    title: 'gana',
    text: 'Recolecta tus ganancias'
  },
]
</script>

<template>
  <div class="super">
    <div
    class="super-container"
    v-for="(item, index) in items"
    :key="index">
    <span :class="item.icon" />
    <p class="super-container-title">
      {{ item.title }}
    </p>
    <p class="super-container-description">
      {{ item.text }}
    </p>
  </div>
  </div>
</template>

<style lang="scss" scoped>
.super {
  width: 100%;
  padding: 24px;
  display: flex;
  gap: 20px;
  justify-content: center; 
  align-items: center;
  flex-wrap: wrap;
  background-color: $dark-blue;
  &-container {
    width: 100%;
    @media(min-width: $tablet-upper-breakpoint) {
      width: 30%;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    span {
      color: $white;
      font-size: $h2-font-size;
    }
    &-title {
      width: 60%;
      max-width: 200px;
      text-align: center;
      border-bottom: 1px solid $green;
      text-transform: uppercase;
      font-size: $h2-font-size;
      padding-bottom: 8px;
    }
    &-description {
      width: 60%;
      max-width: 200px;
      text-align: center;
      font-family: $font-secondary;
    }
  }
}
</style>