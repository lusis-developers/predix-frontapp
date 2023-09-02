<template>
  <div class="internal-app crush-container">
    <div class="internal-app-content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.internal-app {
  &-content {
    padding: 24px;
    overflow-y: auto;
    scroll-behavior: smooth;
  }
}
</style>