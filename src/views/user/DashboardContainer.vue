<template>
  <div class="user-container crush-container">
    <div class="user-container-content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.internal-app {
  margin: 0 auto;
  &-content {
    overflow-y: auto;
    scroll-behavior: smooth;
  }
}
</style>