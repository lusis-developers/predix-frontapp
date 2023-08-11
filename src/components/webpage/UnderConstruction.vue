<script setup lang="ts">
import emailjs from 'emailjs-com';

import { computed, reactive } from 'vue';

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
})

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
    alert ('Correo enviado')
  } catch (e) {
    console.log('CANNOT_SEND_EMAIL:', e)
  }
}

</script>

<template>
  <div class="container">
    <p class="container-title">
      sitio web en construcción
    </p>
    <p class="container-paragraph">
      Únete a nuestra comunidad de apostadores/as y toma ventaja de las mejores predicciones y análisis para tus apuestas deportivas. 
    </p>
    <p class="container-paragraph">
      Aumenta tus posibilidades de ganar con Predix. Apúntate y sé el primero en enterarte de nuestro lanzamiento en línea. 
    </p>
    <div class="box">
      <CrushTextField 
        v-model="form.name"
        class="box-input"
        :label="'Nombre'"
        :placeholder="'Diego Piguave'"
        :valid-rules="rules.validateName" />
      <CrushTextField 
        v-model="form.email"
        class="box-input"
        :label="'Correo'"
        :placeholder="'nombre@dominio.com'"
        :valid-rules="rules.validateEmail" />
      </div>
      <CrushButton 
        class="box-button"
        :class="{'background-validate' : !formIsValid}"
        variant="primary"
        text="Enviar"
        :disabled="!formIsValid"
        @click.prevent="sendEmail"/>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: $tablet-upper-breakpoint;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 24px;
  &-title {
    font-size: $h2-font-size;
    @media(min-width: $tablet-lower-breakpoint) {
      font-size: 2 * $h2-font-size;
    }
    text-align: center;
  }
  &-paragraph {
    width: 80%;
    color: $grey;
    font-size: $body-font-size;
    text-align: center;
  }
  .box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 5%;
    &-input {
      width: 100%;
      @media(min-width: $mobile-upper-breakpoint) {
        width: 45%;
      }
    }
    &-button {
      background-color: $green;
      :deep(.crush-primary:hover) {
        background-color: $green;
      }
    }
    .background-validate {
      background-color: $green;
      color: $dark-blue;
    }
  }
}
</style>