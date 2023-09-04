<script setup lang="ts">
import { computed, reactive, ref, toRefs, watchEffect } from 'vue';
import APIPlans from '@/services/Plans/Plans';

const apiPlans = new APIPlans();


const emit = defineEmits(['update:plan', 'closeForm']);

const props = defineProps({
  file: String
});

const maxLenght = 500;
const plan = reactive({
  name: '',
  price: '',
  description: '',
  image: '',
});

const numericPrice = computed({
  get: () => parseFloat(plan.price),
  set: (val) => { plan.price = val.toString(); }
});


const rules = {
  validateName: [
    {
      validate: (value: string) => value.length > 3,
      message: 'Por favor, coloca un nombre con más de 3 dígitos'
    },
  ],
  validatePrice: [
    {
      validate: (value: number) => /^[1-9]\d*$/.test(value.toString()),
      message: 'Por favor, ingresa solo números mayores a 0'
    },
  ],
  validateDescription: [
    {
      validate: (value: string) => value.split(' ').length > 3,
      message: 'Por favor, ingresa una descripción con al menos 4 palabras'
    }
  ]
};

const submitPlan = async () => {
  try {
    if (props.file) {
      const imageResponse = await apiPlans.uploadImage(props.file);
      plan.image = imageResponse.data.url;
    }

    const sendData = {
      ...plan,
      price: numericPrice.value 
    };
    console.log(sendData)
    const createdPlan = await apiPlans.createPlan(sendData);
    emit('update:plan', createdPlan);
  } catch (error) {
    console.log('Error:', error);
  }
}


const handleClose = () => emit('closeForm');

const isButtonActive = ref(false);

watchEffect(() => {
  isButtonActive.value = (
    !!props.file &&
    !!plan.image && 
    rules.validateName.every(rule => rule.validate(plan.name))  &&
    rules.validateDescription.every(rule => rule.validate(plan.description))
  );
});

const { name, description } = toRefs(plan);

</script>

<template>
  <div class="container">
    <CrushTextField 
      v-model="name"
      label="Nombre del plan"
      placeholder="Money Week"/>
    <CrushTextField 
      v-model="plan.price"
      label="Precio"
      placeholder="1000"
      prependContent="$"/>
    <CrushTextArea 
      v-model="description"
      label="Descripción"
      placeholder="Agrega la descripción"
      :max-length="maxLenght"/>
  </div>
  <div class="container-button">
    <CrushButton 
      variant="secondary"
      text="Cancelar"
      @click="handleClose"/>
    <CrushButton
      class="container-button-second"
      variant="primary"
      text="Guardar"
      @click="submitPlan"/>
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
