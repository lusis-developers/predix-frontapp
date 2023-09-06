<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';

import { formatPriceToDisplay, formatPriceToSave } from '@/utils/InputFormats';
import { FormTypeEnum } from '@/enum/PlanEnum';
import usePlanStore from '@/stores/PlansStore';

const planStore = usePlanStore();

const emit = defineEmits(['update:plan', 'closeForm']);

const props = defineProps({
  file: {
    type: File,
    required: true,
  },
  formType: {
    type: String,
    required: true,
    default: FormTypeEnum
  }
});

const textKey = ref(0);
const maxLength = 500;
// const isButtonActive = ref(false);
const plan = reactive({
  name: '',
  price: '',
  description: '',
  image: '',
});
const buttonType = computed(() => props.formType === FormTypeEnum.SAVE ? 'Guardar' : 'Actualizar');
const isDeleteButtonVisible = computed(() => props.formType === FormTypeEnum.EDIT);
const rules = {
  validateName: [
    {
      validate: (value: string) => value.length > 3,
      message: 'Por favor, coloca un nombre con más de 3 dígitos'
    },
    {
      validate: (value: string) => value.length < 20,
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
    },
    {
      validate: (value: string) => value.split(' ').length >= 500,
      message: 'Por favor, ingresa una descripción con al menos 4 palabras'
    },
  ]
};

async function submitPlan() {
  const data = {
    ...plan,
    price: formatPriceToSave(plan.price)
  }
  await submitImage();
  if (props.formType === FormTypeEnum.EDIT) {
    data.image = planStore.selectedPlan?.image!;
    planStore.updatePlan(data);
  } else {
    await submitImage();
    data.image = plan.image;
    await planStore.createPlan(data);
  }
  resetValues();
}

async function submitImage() {
  console.log('file',props.file)
  if (props.file.size !== 0 && planStore.selectedPlan) {
    const response = await planStore.uploadPlanImage(props.file);
    planStore.selectedPlan.image = response?.url!;
  }
} 

function resetValues() {
  plan.name = '';
  plan.price = '';
  plan.description = '';
  plan.image = '';
  planStore.selectedPlan = null;
  textKey.value++;
  emit('closeForm');
}

function formattedPrice(event: string) {
  plan.price = formatPriceToDisplay(event);
}

function nameInput(event: string): void {
  plan.name = event;
}

function descriptioInput(event: string): void {
  plan.description = event;
}

async function deletePlan(): Promise<void> {
  if (planStore.selectedPlan) {
    await planStore.deletePlan();
    resetValues();
  }
}

onMounted(() => {
  if (planStore.selectedPlan) {
    const { name, price, description } = planStore.selectedPlan;
    plan.name = name;
    plan.price = formatPriceToDisplay(price.toString());
    plan.description = description;
  }
})
</script>

<template>
  <div class="container">
    <CrushTextField 
      v-model:value="plan.name"
      label="Nombre del plan"
      placeholder="Money Week"
      @update:modelValue="nameInput" />
    <CrushTextField 
      v-model:value="plan.price"
      label="Precio"
      placeholder="1000"
      prependContent="$"
      @update:modelValue="formattedPrice" />
    <CrushTextArea
      v-model:value="plan.description"
      label="Descripción"
      placeholder="Agrega la descripción"
      :max-length="maxLength"
      @update:modelValue="descriptioInput" />
  </div>
  <div class="container-button">
    <CrushButton
      v-if="isDeleteButtonVisible"
      variant="secondary"
      text="Eliminar"
      @click="deletePlan"/>
    <CrushButton 
      variant="secondary"
      text="Cancelar"
      @click="emit('closeForm')"/>
    <CrushButton
      class="container-button-second"
      variant="primary"
      :text="buttonType"
      @click="submitPlan" />
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
