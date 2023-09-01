<script setup lang="ts">
import { reactive, ref, toRefs, watchEffect } from 'vue';

const emit = defineEmits(['update:plan']);

const props = defineProps({
  file: {
    type: String
  }
})


const maxLenght = 500;
const plan = reactive({
  name: '',
  price: '',
  description: '',
});

const rules = {
  validateName: [
    {
      validate: (value: string) => value.length > 3,
      message: 'Por favor, coloca un nombre con mas de 3 dígitos'
    },
  ],
  validatePrice: [
    {  
      validate: (value: string) => /^\d+$/.test(value), 
      message: 'Por favor, ingresa solo números' 
    },
  ],
  validateDescription: [
    { 
      validate: (value: string) => value.split(' ').length > 3, 
      message: 'Por favor, ingresa una descripción con al menos 4 palabras' 
    }
  ]
}

const submitPlan = () => {
  emit('update:plan', plan);
}

const {name, price, description} = toRefs(plan)

const isButtonActive = ref(false);

watchEffect(() => {
  isButtonActive.value = (
    !!props.file && // Verifica que el archivo exista
    rules.validateName.every(rule => rule.validate(plan.name)) &&
    rules.validatePrice.every(rule => rule.validate(plan.price)) &&
    rules.validateDescription.every(rule => rule.validate(plan.description))
  );
});


</script>

<template>
  <div class="container">
    <CrushTextField 
      v-model="name"
      label="Nombre del plan"
      placeholder="Money Week"
      :valid-rules="rules.validateName"/>
    <CrushTextField 
      v-model="price"
      label="Precio"
      placeholder="1000"
      prependContent="$"
      :valid-rules="rules.validatePrice"/>
      
    <CrushTextArea 
      v-model="description"
      label="Descripción"
      placeholder="Agrega la descripción"
      :max-length="maxLenght"
      />
  </div>
  <div class="container-button">
    <CrushButton 
      variant="secondary"
      text="Cancelar"/>
    <CrushButton
      class="container-button-second"
      variant="primary"
      text="Guardar" 
      @click="submitPlan"
      :disabled="!isButtonActive" 
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  &-button {
    width: 100%;
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;
    &-second {
      background-color: $green;
    }
  }
}
</style>
