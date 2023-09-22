<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useUserStore } from '@/stores/UserStore';

const imageUrl = ref<string>(''); // TODO: read the image url
const imageFile = ref<File>(new File([], '')); // TODO: store the image file


const userStore = useUserStore();

const profile = reactive({
  name: '',
  lastname: '',
  img: ''
});

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

// function validButton {
//   if(profile)
// }

// async function submitImage(): Promise<string> {
//   if (imageFile.value.size !== 0) {
//     const result = await userStore.uploadLeagueImage(imageFile.value!);

//     return result?.url!;
//   }
//   return '';
// }

// async function prepareData(): Promise<League> {
//   const imageResponse = await submitImage();
//   const url = !imageResponse.length ? imageUrl.value : imageResponse;
//   let league: League; // Inicializa como undefined
//   let sport: string;

//   if (isCreating.value) {
//     sport = sportStore.selectedSport?._id!;
//   } else {
//     league = sportStore.selectedSport?.leaguesDetails?.find(league => league._id === props.leagueId)!;
//     sport = league?.sport!;
//   }

//   let data: League = {
//     name: name.value,
//     image: url,
//     sport: sport, // Sport assigned
//   };

//   return data;
// }

// async function submitLeague(): Promise<void> {
//   const data = await prepareData();
//   if (isCreating.value) {
//     leagueStore.createLeague(data);
//   } else {
//     leagueStore.updateLeague(props.leagueId, data)
//   }
//   closeEdit();
// }

// function setData(): void {
//   const league = sportStore.selectedSport?.leaguesDetails?.find(league => league._id === props.leagueId);
//   name.value = league?.name!;
//   imageUrl.value = league?.image!;
// }

// function resetValue(): void {
//   name.value = '';
//   imageFile.value = new File([], '');
//   imageUrl.value = ''
// }

// function closeEdit() {
//   resetValue();
//   emit('close-create-or-edit')
// }

async function handleSave(): Promise<void> {
  await userStore.updateUser(profile.name, profile.lastname, imageFile.value);
}



const formIsValid = computed(() => {
  return (
    profile.name !== '' &&
    profile.lastname !== '' 
  )
})

</script>

<template>
  <div class="profile">
    <div class="profile-image">
      <p class="form-description">Subir imagen</p>
      <div class="form-upload">
        <CrushUpload @file-selected="handleFileSelected"/>
        <div v-if="imageUrl.length" class="form-upload-image">
          <img class="image" :src="imageUrl">
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
        @click="handleSave"/>
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