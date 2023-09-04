<script setup lang="ts">
import { computed, reactive, ref, toRefs, watchEffect } from 'vue';

import usePlanStore from '@/stores/PlansStore';

const planStore = usePlanStore();

const emit = defineEmits(['update:plan', 'closeForm']);

const props = defineProps({
  file: {
    type: File,
    required: true
  }
});

const maxLength = 500;
const isButtonActive = ref(false);
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

async function submitPlan() {
  await submitImage();

  const planData = {
    ...plan,
    price: numericPrice.value 
  };
  console.log(planData);
  // const createdPlan = planStore.createPlan(sendData);
  emit('update:plan');
  resetValues();
}

function submitImage() {
  if (props.file) {
    return planStore.uploadPlanImage(props.file);
  }
} 

function resetValues() {
  plan.name = '';
  plan.price = '';
  plan.description = '';
  plan.image = '';
}

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
      :max-length="maxLength"/>
  </div>
  <div class="container-button">
    <CrushButton 
      variant="secondary"
      text="Cancelar"
      @click="emit('closeForm')"/>
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
