<template>
  <div class="hero">
    <h3 class="hero-title">
      invierte con propósito
    </h3>
    <p class="hero-description">
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con
    </p>
    <div class="hero-container">
      <RouterLink 
        to="/subscriptions"
        class="hero-container-button">
        Suscríbete ahora
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  padding: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  height: 80vh;
  border-radius: 0px 0px 24px 25px;
  background: linear-gradient(180deg, #070E21 0.6%, #01DF71 534.43%);
  &-title {
    color: $white;
    text-align: center;
    font-size: $h2-font-size;
    @media (min-width: $tablet-lower-breakpoint){
      font-size: $h1-font-size;
    }
    text-transform: uppercase;
  }
  &-description {
    text-align: center;
    color: $grey;
    font-size: $body-font-size;
    font-family: $font-secondary;
  }
  &-container {
    display: flex;
    gap: 24px;
    &-button {
      background: none;
      border: none;
      outline: none;
      font-weight: 700;
      font-size: $body-medium-size;
      border-radius: 8px;
      text-decoration: none;
      background-color: $green;
      color: $dark-blue;
      padding: 16px 12px;
    }
  }
}
</style>