<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';

import useUserStore from '@/stores/UserStore';
import { validateEmail } from '@/utils/AuthValidations';

const userStore = useUserStore();

// it forces to re-render the component once the value change
const textKey = ref(0);
const isPasswordVisible = ref(false);
const userData = reactive({
  email: '',
  password: '',
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
  passwordValidation: [
    {
      validate: (value: string) => value.length > 7,
      message: 'El password debe tener al menos 10 caracteres' 
    }
  ]
}
const enableForm = computed(() => {
  return userData.email !== '' &&
    userData.password !== '' &&
    userRules.emailValidation.every((rule) => rule.validate(userData.email)) &&
    userRules.passwordValidation.every((rule) => rule.validate(userData.password))
});
const passwordIcon = computed(() => {
  return isPasswordVisible.value ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
});
const textType = computed(() => {
  return isPasswordVisible.value ? 'text' : 'password';
});


function resetValue(): void {
  userData.email = '';
  userData.password = '';
  textKey.value ++
}

function handleLogin(): void {
  userStore.login(userData.email.trim().toLocaleLowerCase(), userData.password.trim());
  resetValue();
}

watch(userData, () => {
  userStore.errorMessage = '';
}, {deep: true});

</script>

<template>
  <div class="login-wrapper crush-container">
    <p class="login-wrapper-title">
      Que gusto verte nuevamente 🌟 <br> Ingresa ahora
    </p>
    <span 
      v-if="userStore.errorMessage"
      class="login-wrapper-warning">
      *{{ userStore.errorMessage }}*
    </span>
    <div class="login-wrapper-card">
      <CrushTextField
        :key="textKey"
        v-model="userData.email"
        label="Correo"
        :validRules="userRules.emailValidation" />
      <CrushTextField
        :key="textKey"
        v-model.trim="userData.password"
        label="Contraseña"
        :type="textType"
        :validRules="userRules.passwordValidation">
        <template #icon>
          <button
            class="icon-button"
            @click="isPasswordVisible = !isPasswordVisible">
            <i :class="passwordIcon" />
          </button>
        </template>
      </CrushTextField>
      <CrushButton
        variant="primary"
        text="Inicia Sesión"
        :dataLoading="userStore.isLoading"
        :disabled="!enableForm"
        @click.prevent="handleLogin" />
    </div>
    <span class="login-wrapper-span">
      <RouterLink 
        class="login-wrapper-span-link"
        to="/recover-password">
        ¿Olvidaste contraseña?
      </RouterLink> 
    </span>
    <span class="login-wrapper-span">
      ¿Aún no tienes cuenta? 
      <RouterLink 
        class="login-wrapper-span-link"
        to="/register">
        Regístrate ahora
      </RouterLink> 
    </span>
    <img 
      src="@/assets/footer-image.png"
      class="login-wrapper-image">
    <img 
      src="@/assets/footer-image.png"
      class="login-wrapper-image2">
  </div>
</template>

<style lang="scss" scoped>
:deep(.calendar-input) {
  color: $white;
}
.login-wrapper {
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