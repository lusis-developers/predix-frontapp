<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { FormTypeEnum } from '@/enum/PlanEnum';
import PlanForm from '@/views/InternalApp/ThePlans/components/PlanForm.vue';
import usePlanStore from '@/stores/PlansStore';

const planStore = usePlanStore();

const emit = defineEmits(['closeForm']);

const props = defineProps({
  formType: {
    type: String,
    required: true,
    default: FormTypeEnum 
  }
})

const fileURL = ref<string>(''); // TODO: read the image url
const imageFile = ref<File>(new File([], '')); // TODO: store the image file
const isFileValid = ref(false);

function handleFileSelected(file: File) {
  if (file.size > 1024 * 1024 ) {
    alert("El archivo no puede ser superior a 1mb de peso.");
    isFileValid.value = false;
    resetImage()
  } else {
    fileURL.value = URL.createObjectURL(file);
    imageFile.value = file;
    isFileValid.value = true;
  }
}

function resetImage() {
  fileURL.value = '';
  imageFile.value = new File([], '');
}

onMounted(() => {
  if (planStore.selectedPlan) {
    fileURL.value = planStore.selectedPlan?.image!;
  }
})
</script>

<template>
  <div class="form">
    <p class="form-description">Subir imagen</p>
    <div class="form-upload">
      <CrushUpload @file-selected="handleFileSelected"/>
      <div v-if="fileURL.length" class="form-upload-image">
        <img :src="fileURL">
      </div>
    </div>
  </div>
  <PlanForm 
    :file="imageFile"
    :formType="formType"
    :is-file-valid="isFileValid"
    @update:plan="resetImage"
    @closeForm="emit('closeForm')"/>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  &-description {
    font-size: $body-font-size;
    font-family: $font-secondary;
  }
  &-upload {
    border-radius: 8px;
    max-width: $tablet-lower-breakpoint;
    &-image {
      width: 100%;
      img {
        width: 100%;
        max-width: 400px;
        height: 208px;
        object-position: center;
        object-fit: cover;
        border-radius: 8px;
      }
    }
  }
}
</style>
