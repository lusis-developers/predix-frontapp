<script setup lang="ts">
import { computed, reactive } from 'vue';

import emailjs from 'emailjs-com';


const form = reactive({
  name: '',
  email: '',
})

const rules = {
  validateName: [
    {
      validate: (value: string) => value.length >= 10,
      message: 'Por favor, coloca tu nombre completo'
    }
  ],
  validateEmail: [
    {
      validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Por favor, ingresa un correo válido'
    }
  ]
}

const formIsValid = computed(() => {
  return (
    form.name !== '' &&
    form.email !== '' &&
    rules.validateName.every(rule => rule.validate(form.name)) &&
    rules.validateEmail.every(rule => rule.validate(form.email))
  )
});

async function sendEmail() {
  const mail = {
    from_name: form.name,
    from_email: form.email
  }
  try {
    await emailjs.send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      mail,
      import.meta.env.VITE_PUBLIC_KEY,
    );
    alert ('Correo enviado');
    resetForm();
  } catch (e) {
    console.log('CANNOT_SEND_EMAIL:', e)
  }
}

function resetForm() {
  form.name ='';
  form.email='';
}
</script>

<template>
  <div class="container">
    <div class="container-section">
      <div class="container-section-info">
        <p class="container-section-info-title">
          ¿Aún tienes dudas al respecto?
        </p>
        <p class="container-section-info-description">
          No dejes que las dudas te detengan. Completa el formulario y recibe respuestas claras y rápidas de nuestro dedicado equipo de soporte.
        </p>
      </div>
      <form class="container-section-form">
        <CrushTextField
          v-model="form.name"
          class="container-section-form-input"
          label="Nombre"
          :valid-rules="rules.validateName"
          placeholder="Roberto Moncayo"/>
        <CrushTextField
          v-model="form.email"
          class="container-section-form-input"
          label="Ingresa tu correo"
          placeholder="ejemplo@hola.com"
          :valid-rules="rules.validateEmail"/>
        <CrushButton
          class="container-section-form-button"
          variant="primary"
          text="Enviar"
          :disabled="!formIsValid"
          @click.prevent="sendEmail"/>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 12px;
  width: 100%;
  display: flex;
  &-section {
    padding: 24px;
    border-radius: 48px;
    margin: 0 auto;
    width: 100%;
    max-width: $tablet-upper-breakpoint;
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