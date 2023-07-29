<template>
  <header class="header">
    <div class="header-logo">
      <img
        src="@/assets/logo-small.png"
        alt="Predix">
      <p>Planes</p>
    </div>
    <div class="header-name">
      <img src="https://i.pinimg.com/564x/37/8a/27/378a270e775265622393da8c0527417e.jpg" alt="">
      <p>Diego Reyes</p>
      <i class="fa-solid fa-chevron-down"></i>
      <div class="header-name-options">
        <p> Cerrar sesión </p>
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
    p {
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
      transition: all 0.5s ease;
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
