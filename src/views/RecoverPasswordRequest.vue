<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';

import useUserStore from '@/stores/UserStore';
import { validateEmail } from '@/utils/AuthValidations';

const userStore = useUserStore();

// it forces to re-render the component once the value change
const textKey = ref(0);
const userData = reactive({
  email: '',
});
const userRules = {
  emailValidation: [
    {
      validate: (value: string) => validateEmail(value),
      message: 'Ingresa un correo válido' 
    },
    {
      validate: (value: string) => value.length,
      message: 'Ingresa un correo'
    }
  ],
}
const enableForm = computed(() => {
  return userData.email !== '' &&
    userRules.emailValidation.every((rule) => rule.validate(userData.email))
});
const emailSent = computed(() => userStore.emailSent !== null && userStore.emailSent);

function resetValue(): void {
  userData.email = '';
  textKey.value ++
}

function sendRecoverEmail(): void {
  userStore.updatePasswordRequest(userData.email);
  resetValue();
}

watch(userData, () => {
  userStore.errorMessage = '';
}, { deep: true });
</script>

<template>
  <div class="recover-password-email-wrapper crush-container">
    <p class="recover-password-email-wrapper-title">
      Recupera contraseña 🌟 <br> Ingresa tu correo
    </p>
    <template v-if="userStore.emailSent === null">
      <span 
        v-if="userStore.errorMessage"
        class="recover-password-email-wrapper-warning">
        *{{ userStore.errorMessage }}*
      </span>
      <div class="recover-password-email-wrapper-card">
        <CrushTextField
          :key="textKey"
          v-model="userData.email"
          label="Correo"
          :validRules="userRules.emailValidation" />
        <CrushButton
          variant="primary"
          text="Recuperar contraseña"
          :dataLoading="userStore.isLoading"
          :disabled="!enableForm"
          @click.prevent="sendRecoverEmail" />
      </div>
      <span class="recover-password-email-wrapper-span">
        Inicia sesión 
        <RouterLink 
          class="recover-password-email-wrapper-span-link"
          to="/register">
          Inicia sesión
        </RouterLink> 
      </span>
    </template>
    <template v-else-if="userStore.emailSent === true">
      <p class="recover-password-email-wrapper-title">
        Revisa tu correo para restablecer tu contraseña.
      </p>
    </template>
    <template v-else-if="userStore.emailSent === false">
      <p class="recover-password-email-wrapper-title">
        Algo ocurrió vuelve a intentarlo o contáctate con nosotros.
      </p>
    </template>
    <img 
      src="@/assets/footer-image.png"
      class="recover-password-email-wrapper-image">
    <img 
      src="@/assets/footer-image.png"
      class="recover-password-email-wrapper-image2">
  </div>
</template>

<style lang="scss" scoped>
:deep(.calendar-input) {
  color: $white;
}
.recover-password-email-wrapper {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  align-items: center;
  min-height: 100vh;
  background-color: $dark-blue;
  padding: 24px;
  &-title {
    color: $white;
    font-size: $body-font-size;
    text-align: center;
    @media (min-width: $tablet-lower-breakpoint) {
      font-size: $body-medium-size;
    }
  }
  &-warning {
    color: rgb(229, 116, 116);
  }
  .date-message {
    color: $red;
  }
  &-card {
    border: 1px solid $grey;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 520px;
    border-radius: 8px;
    padding: 32px;
    background: rgba(141, 141, 157, 0.08);
    backdrop-filter: blur(40px);
    @media(max-width: $tablet-lower-breakpoint) {
      border: none;
    }
    .hoot-text-field {
      :first-child {
        margin-bottom: 8px;
      }
    }
    .icon-button {
      background-color: transparent;
      color: $white;
      border: none;
    }
    .crush-button {
      margin-top: 12px;
    }
  }
  &-span {
    color: $white;
    &-link {
      color: $link-color;
      text-decoration: underline;
    }
  }
  &-image {
    display: none;
    @media (min-width: $tablet-lower-breakpoint) {
      display: flex;
      width: 120px;
      position: absolute;
      left: 0;
      top: 0;
      transform: rotate(180deg);
    }
    @media (min-width: $desktop-lower-breakpoint) {
      width: 200px;
      }
    &2 {
      display: none;
      @media (min-width: $tablet-lower-breakpoint) {
      display: flex;
      width: 80px;
      position: absolute;
      right: 0;
      bottom: 0;
      }
      @media (min-width: $desktop-lower-breakpoint) {
      width: 160px;
      }
    }
  }
}
</style>