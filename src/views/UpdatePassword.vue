<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { validateSymbol } from '@/utils/AuthValidations';
import useUserStore from '@/stores/UserStore';

const route = useRoute();
const userStore = useUserStore();

// it forces to re-render the component once the value change
const textKey = ref(0);
const isPasswordVisible = ref(false);
const isRepeatedPasswordVisible = ref(false);
const userData = reactive({
  password: '',
  passwordRepeated: '',
});
const userRules = {
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
  return userData.password !== '' &&
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
const token = computed(() => route.params.id as string);

function resetValue(): void {
  userData.password = '';
  userData.passwordRepeated = '';
  textKey.value ++
}

function updatePassword(): void {
  userStore.updatePassword(token.value, userData.password.trim());
  resetValue();
}

watch(userData, () => {
  userStore.errorMessage = '';
}, {deep: true});
</script>

<template>
  <div class="password-update crush-container">
    <p class="password-update-title">
      Restablece contraseña 🌟 <br>
    </p>
    <span 
      v-if="userStore.errorMessage"
      class="password-update-warning">
      *{{ userStore.errorMessage }}*
    </span>
    <div
      v-if="userStore.passwordSent === null"
      class="password-update-card">
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
      <CrushTextField
        :key="textKey"
        v-model.trim="userData.passwordRepeated"
        label="Repita su contraseña"
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
      <CrushButton
        variant="primary"
        text="Registro"
        :dataLoading="userStore.isLoading"
        :disabled="!enableForm"
        @click.prevent="updatePassword" />
    </div>
    <template v-else-if="userStore.passwordSent === true">
      <p class="recover-password-email-wrapper-title">
        Tu contraseña ha sido restablecida.
      </p>
    </template>
    <template v-else-if="userStore.passwordSent === false">
      <p class="recover-password-email-wrapper-title">
        Algo ocurrió vuelve a intentarlo o contáctate con nosotros.
      </p>
    </template>
    <span class="password-update-span">
      ¿Ya tienes cuenta?
      <RouterLink 
        class="password-update-span-link"
        to="/login">
        Inicia sesion ahora
      </RouterLink>
    </span>
    <img 
        src="@/assets/footer-image.png"
        class="password-update-image">
    <img 
      src="@/assets/footer-image.png"
      class="password-update-image2" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.calendar-input) {
  color: $white;
}
.password-update {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  align-items: center;
  min-height: 100vh;
  background-color: $dark-blue;
  padding: 24px;
  max-width: $desktop-lower-breakpoint;
  .date-message {
    color: $red;
  }
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