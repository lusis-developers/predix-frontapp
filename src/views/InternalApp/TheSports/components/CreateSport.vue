<script setup lang="ts">
import { onMounted, ref } from 'vue';

import useSportStore from '@/stores/SportStore';
import type { Sport } from '@/typings/SportTypes';

const sportStore = useSportStore();

const emit = defineEmits(['close-form']);

const fileURL = ref<string>(''); // TODO: read the image url
const imageFile = ref<File>(new File([], '')); // TODO: store the image file
const name = ref('');

function handleFileSelected(file: File) {
  fileURL.value = URL.createObjectURL(file);
  imageFile.value = file;
}

function resetImage() {
  fileURL.value = '';
  imageFile.value = new File([], '');
}

async function submitSport() {
  const imageResponse = await submitImage();
  const data: Sport = {
    name: name.value,
    image: imageResponse
  };
  await sportStore.createSport(data);
  closeForm();
}

async function submitImage(): Promise<string> {
  const result = await sportStore.uploadSportImage(imageFile.value!);
  return result?.url!;
}

function resetValues() {
  resetImage();
  name.value = '';
}

function closeForm() {
  resetValues();
  emit('close-form')
}

// onMounted(() => {
//   if (planStore.selectedPlan) {
//     fileURL.value = planStore.selectedPlan?.image!;
//   }
// })
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
  <CrushTextField 
    v-model="name"
    label="Nombre del deporte"
    placeholder="Baseball" />
  <div class="form-actions">
    <CrushButton 
      variant="secondary"
      text="Cancelar"
      @click="closeForm"/>
    <CrushButton
      class="form-actions-second"
      variant="primary"
      text="Guardar"
      @click="submitSport" />
  </div>
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
        margin-top: 8px;
      }
    }
  }
  &-actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    &-second {
      background-color: $green;
    }
  }
}
</style>
