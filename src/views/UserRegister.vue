<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

import useUserStore from '@/stores/UserStore';
import { calculateAge, validateEmail, validateSymbol } from '@/utils/AuthValidations';
import CalendarInput from '@/components/CalendarInput.vue';

const userStore = useUserStore();

// it forces to re-render the component once the value change
const textKey = ref(0);
const isPasswordVisible = ref(false);
const isRepeatedPasswordVisible = ref(false);
const isMinor = ref(false);
const userData = reactive({
  email: '',
  password: '',
  birthdate: '',
  passwordRepeated: '',
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
    },
    {
      validate: (value: string) => validateSymbol(value),
      message: 'El password debe tener al menos un caracter especial $%&|<>#^ caracteres' 
    }
  ],
  passwordRepeatedValidation: [
    {
      validate: (value: string) => userData.password === value,
      message: 'El password no coincide'
    },
  ]
}
const enableForm = computed(() => {
  return userData.email !== '' &&
    userData.password !== '' &&
    userData.birthdate !== '' &&
    !isMinor.value &&
    userRules.emailValidation.every((rule) => rule.validate(userData.email)) &&
    userRules.passwordValidation.every((rule) => rule.validate(userData.password)) &&
    userRules.passwordRepeatedValidation.every((rule) => rule.validate(userData.passwordRepeated))
});
const passwordIcon = computed(() => {
  return isPasswordVisible.value ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
});
const passwordRepeatedIcon = computed(() => {
  return isRepeatedPasswordVisible.value ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
});
const textType = computed(() => {
  return isPasswordVisible.value ? 'text' : 'password';
});
const textRepeatedType = computed(() => {
  return isRepeatedPasswordVisible.value ? 'text' : 'password';
});

function calculateAgeInput(): void {
  if (userData.birthdate !== '') {
    isMinor.value = false;
  }
  const age = calculateAge(userData.birthdate);
  if (age < 16) {
    isMinor.value = true;
  }
}

function handleInput(event: string): void {
  userData.birthdate = event;
  calculateAgeInput();
  setTimeout(() => {
    isMinor.value = false;
  }, 5000); 
}

function resetValue(): void {
  userData.email = '';
  userData.password = '';
  userData.passwordRepeated = '';
  userData.birthdate = '';
  textKey.value ++
}

function handleRegister(): void {
  userStore.register(userData.email, userData.password, userData.birthdate);
  resetValue();
}
</script>

<template>
  <div class="register-wrapper crush-container">
    <span
      v-if="isMinor"
      class="date-message">
      Debes tener al menos 16 años
    </span>
    <div class="register-wrapper-card">
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
      <CrushTextField
        :key="textKey"
        v-model.trim="userData.passwordRepeated"
        label="Repita contraseña"
        :type="textRepeatedType"
        :validRules="userRules.passwordRepeatedValidation">
        <template #icon>
          <button
            class="icon-button"
            @click="isRepeatedPasswordVisible = !isRepeatedPasswordVisible">
            <i :class="passwordRepeatedIcon" />
          </button>
        </template>
      </CrushTextField>
      <CalendarInput
        label="Fecha de nacimiento"
        class="calendar-input"
        :value="userData.birthdate"
        @input="handleInput($event)" />
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
:deep(.calendar-input) {
  color: $white;
}
.register-wrapper {
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