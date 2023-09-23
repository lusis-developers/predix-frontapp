<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';

import { useUserStore } from '@/stores/UserStore';
import type { User } from '@/typings/UserTypes';

const imageUrl = ref<string>(''); // TODO: read the image url
const imageFile = ref<File>(new File([], '')); // TODO: store the image file


const userStore = useUserStore();

const profile = reactive({
  name: '',
  lastname: '',
  img: ''
});

const formIsValid = computed(() => {
  return (
    profile.name !== '' &&
    profile.lastname !== '' 
  )
})

function handleInput(event: string, type: string): void {
  if (type === 'name') {
    profile.name = event;
  }
  if (type === 'lastname') {
    profile.lastname = event;
  }
}

function handleFileSelected(file: File) {
  imageUrl.value = URL.createObjectURL(file);
  imageFile.value = file;
}

async function submitUser(): Promise<void> {
  const imageResponse = await submitImage();
  const url = !imageResponse.length ? imageUrl.value : imageResponse;
  const data: User = {
    name: profile.name,
    lastname: profile.lastname,
    userImage: url
  };
  await userStore.updateUser(data);
  resetValues();

}

async function submitImage(): Promise<string> {
  if (imageFile.value.size !== 0) {
    const result = await userStore.uploadUserImage(imageFile.value!);

    return result?.url!;
  }
  return '';
}

function resetValues(): void {
  imageFile.value = new File([], '');
  imageUrl.value = '';
  profile.name = '';
  profile.lastname = '';
}

function setValues(): void {
  imageUrl.value = userStore.user?.userImage!;
  profile.name = userStore.user?.name!;
  profile.lastname = userStore.user?.lastname!;
}

onMounted(async () => {
  if (userStore.user) {
    await userStore.getSession();
    setValues();
  }
});
</script>

<template>
  <div class="profile">
    <div class="profile-image">
      <p class="form-description">
        Subir imagen
      </p>
      <div class="form-upload">
        <CrushUpload @file-selected="handleFileSelected"/>
        <div
          v-if="imageUrl?.length"
          class="form-upload-image">
          <img
            :src="imageUrl"
            class="image" />
        </div>
      </div>
    </div>
    <div class="profile-names">
      <CrushTextField 
        v-model:value="profile.name"
        label="Nombre"
        placeholder="Luis"
        class="names"
        @update:modelValue="handleInput($event, 'name')" />
      <CrushTextField 
        v-model:value="profile.lastname"
        label="Apellidos"
        placeholder="Reyes"
        class="names"
        @update:modelValue="handleInput($event, 'lastname')" />
    </div>
    <div class="profile-update">
      <CrushButton
        :disabled="!formIsValid"
        variant="primary"
        text="Guardar"
        @click="submitUser"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .form-upload {
    margin: 0 auto;
    max-width: 480px;
    &-image {
      width: 100%;
      .image {
        width: 100%;
        margin-top: 16px;
        border-radius: 8px;
      }
    }
  }
  &-names {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
    .name {
      max-width: 250px;
      width: 100%;
    }
  }
  &-update {
    margin: 0 auto;
    :deep(.crush-primary) {
      color: $dark-blue;
    }
  }
}
</style>