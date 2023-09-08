<template>
  <div class="container">
    <div class="container-section">
      <div class="container-section-info">
        <p class="container-section-info-title">
        Nemo enim ipsam volupta
        </p>
        <p class="container-section-info-description">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur maemo enim ipsa
        </p>
      </div>
      <form class="container-section-form">
        <CrushTextField
          class="container-section-form-input"
          label="Nombre"
          placeholder="Roberto Moncayo"/>
        <CrushTextField
          class="container-section-form-input"
          label="Ingresa tu correo"
          placeholder="ejemplo@hola.com"/>
        <CrushButton
          class="container-section-form-button"
          variant="primary"
          text="Enviar"/>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  &-section {
    padding: 24px;
    border-radius: 48px;
    margin: 0 auto;
    width: 80%;
    background: linear-gradient(270deg, #070E21 0.04%, #01DF71 267.25%);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 24px;
    &-info {
      width: 100%;
      @media(min-width: $tablet-upper-breakpoint) {
        width: 40%;
      }
      display: flex;
      flex-direction: column;
      gap: 24px;
      &-title {
        font-size: $h2-font-size;
      }
    }
    &-form {
      display: flex;
      flex-direction: column;
      width: 100%;
      @media(min-width: $tablet-upper-breakpoint) {
        width: 40%;
      }
      &-button {
        margin: 0 auto;
        width: 50%;
      }
      :deep(.crush-primary) {
        background-color: $green;
        color: $dark-blue;
      }
    }
  }
}
</style>