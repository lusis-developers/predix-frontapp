<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type { Sport } from '@/typings/SportTypes';
import useSportStore from '@/stores/SportStore';

const sportStore = useSportStore();

const emit = defineEmits(['close-edit']);

const fileURL = ref<string>(''); // TODO: read the image url
const imageFile = ref<File>(new File([], '')); // TODO: store the image file
const name = ref('');

function handleFileSelected(file: File) {
  fileURL.value = URL.createObjectURL(file);
  imageFile.value = file;
}

function nameInput(nameEvent: string) {
  name.value = nameEvent;
}

async function submitSport() {
  const imageResponse = await submitImage();
  const imageUrl = !imageResponse.length ? fileURL.value : imageResponse;
  const data: Sport = {
    name: name.value,
    image: imageUrl
  };
  await sportStore.updateSport(data);
  closeEdit();
}

async function submitImage(): Promise<string> {
  if (imageFile.value.size !== 0) {
    const result = await sportStore.uploadSportImage(imageFile.value!);

    return result?.url!;
  }
  return '';
}

function resetImage() {
  fileURL.value = '';
  imageFile.value = new File([], '');
}

function resetValues() {
  resetImage();
  name.value = '';
}

function closeEdit() {
  resetValues();
  emit('close-edit')
}

onMounted(() => {
  if (sportStore.selectedSport) {
    name.value = sportStore.selectedSport.name;
    fileURL.value = sportStore.selectedSport.image;
  }
})
</script>

<template>
  <div class="edit-container-sport">
    <div class="edit-container-sport-back">
      <i class="fa-sharp fa-solid fa-arrow-left icon" />
      <CrushButton
        class="button"
        variant="textonly"
        text="Volver"
        @click="closeEdit" />
    </div>
    <div
      v-if="!sportStore.selectedSport"
      class="edit-container-sport-content">
      Ooops no cotent to show. Please reload
    </div>
    <div
      v-else
      class="edit-container-sport-content-form">
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
        v-model:value="name"
        label="Nombre del deporte"
        placeholder="Money Week"
        @input="nameInput" />
      <div class="actions-container">
        <CrushButton 
          variant="secondary"
          text="Cancelar"
          @click="closeEdit"/>
        <CrushButton
          class="actions-container-second"
          variant="primary"
          text="Actualizar"
          @click="submitSport" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-container-sport {
  &-back {
    display: flex;
    align-items: center;
    .icon {
      color: $green;
      font-size: 24px;
    }
    .button {
      background-color: transparent;
    }
  }
  &-content {
    margin: 16px 0;
    &-form {
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
      }
      .actions-container {
        display: flex;
        justify-content: center;
        gap: 12px;
        &-second {
          background-color: $green;
        }
      }
    } 
  }
}
</style>