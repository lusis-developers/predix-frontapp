<template>
  <div class="container">
    <p class="container-title">
      Prueba predix.
    </p>
    <p class="container-description">
      sin costo 
    </p>
    <p>
      Crea tu cuenta y empieza a incrementar tu capital ahora.
    </p>
    <CrushButton
      class="container-button"
      variant="primary"
      text="Crear cuenta"/>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 94px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/X.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  max-width: $mobile-upper-breakpoint;
  margin: 0 auto;
  &-title {
    color: $green;
    text-align: center;
    font-size: $h2-font-size;
    text-transform: uppercase;
  }
  &-description {
    color: $white;
    font-weight: 700;
    font-size: $h2-font-size;
    text-align: center;
  }
  & :nth-child(3) {
    margin-top: 20px;
    font-family: $font-secondary;
    text-align: center;
    font-size: $body-font-x-small;
    @media(min-width: $tablet-lower-breakpoint) {
      font-size: $body-font-size;
    }
  }
  &-button {
    margin-top: 20px;
    max-width: $mobile-lower-breakpoint;
  }
  :deep(.crush-primary) {
    background-color: $green;
    color: $dark-blue;
  }
}
</style>