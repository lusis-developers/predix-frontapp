<template>
  <div class="hero">
    <h3>
      invierte con propósito
    </h3>
    <p>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con
    </p>
    <div class="hero-container">
      <button>
        Botón
      </button>
      <button>
        Botón
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  height: 80vh;
  width: 60%;
  h3 {
    color: $white;
    text-align: center;
    font-size: $h1-font-size;
  }
  p {
    text-align: center;
    color: $grey;
    font-size: $body-font-size;
    font-family: $font-secondary;
  }
  &-container {
    display: flex;
    gap: 24px;
    button {
      background: none;
      border: none;
      outline: none;
      font-weight: 700;
      font-size: $body-font-size;
      border-radius: 8px;
    }
    & :first-child {
      padding: 12px 16px;
      color: $white;
      border: 1px solid $green;
    }
    & :nth-child(2) {
      padding: 12px 16px;
      color: $dark-blue;
      background-color: $green;
      
    }
  }
}
</style>