<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

import useUserStore from '@/store/Auth';
import { validateEmail } from '@/utils/AuthValidations';

const userStore = useUserStore();

// it forces to re-render the component once the value change
const textKey = ref(0);
const isPasswordVisible = ref(false);
const userData = reactive({
  user: '',
  password: ''
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
      validate: (value: string) => value.length > 10,
      message: 'El password debe tener al menos 10 caracteres' 
    }
  ]
}
const enableForm = computed(() => {
  return userData.user !== '' &&
    userData.password !== '' &&
    userRules.emailValidation.every((rule) => rule.validate(userData.user)) &&
    userRules.passwordValidation.every((rule) => rule.validate(userData.password))
})
const passwordIcon = computed(() => {
  return isPasswordVisible.value ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
});
const textType = computed(() => {
  return isPasswordVisible.value ? 'text' : 'password'
})

function resetValue(): void {
  userData.user = ''
  userData.password = ''
  textKey.value ++
}

function handleRegister(): void {
  userStore.loginUser(userData.user, userData.password);
  resetValue();
}
</script>

<template>
  <div class="register-wrapper crush-container">
    <div class="register-wrapper-card">
      <CrushTextField
        :key="textKey"
        v-model="userData.user"
        label="Usuario"
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
        text="Registro"
        :dataLoading="userStore.isLoading"
        :disabled="!enableForm"
        @click.prevent="handleRegister" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-wrapper {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  &-card {
    background: $purple-dark;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 360px;
    border-radius: 8px;
    padding: 16px;
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