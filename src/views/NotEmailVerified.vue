<script setup lang="ts">
</script>

<template>
  <div class="no-verify-email">
    <p class="message">
      El correo no ha sido verificado, Revisa tu bandeja de entrada.
    </p>
  </div>
</template>

<style lang="scss" setup>
.no-verify-email {
  width: 100%;
  display: flex;
  justify-content: center;
  .message {
    font-size: $h3-font-size;
    margin: 64px;
  }
}
</style>