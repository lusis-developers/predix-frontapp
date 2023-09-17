<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

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
  userStore.login(userData.email, userData.password);
  resetValue();
}
</script>

<template>
  <div class="login-wrapper crush-container">
    <div class="login-wrapper-card">
      <CrushTextField
        :key="textKey"
        v-model="userData.email"
        label="Correo"
        :validRules="userRules.emailValidation" />
      <CrushTextField
        :key="textKey"
        v-model.trim="userData.password"
        label="Password"
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
}
</style>