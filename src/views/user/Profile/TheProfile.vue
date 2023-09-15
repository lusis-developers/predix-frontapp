<script setup lang="ts">
import { reactive, ref } from 'vue';

const imageUrl = ref<string>(''); // TODO: read the image url
const imageFile = ref<File>(new File([], '')); // TODO: store the image file

const profile = reactive({
  name: '',
  lastname: '',
  birthdate: ''
});

function handleInput(event: string, type: string): void {
  if (type === 'name') {
    profile.name = event;
  }
  if (type === 'lastname') {
    profile.name = event;
  }
  if (type === 'birthdate') {
    profile.birthdate = event;
  }
}

function handleFileSelected(file: File) {
  imageUrl.value = URL.createObjectURL(file);
  imageFile.value = file;
}

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
</script>

<template>
  <div class="profile">
    <div class="profile-image">
      <p class="form-description">Subir imagen</p>
      <div class="form-upload">
        <CrushUpload @file-selected="handleFileSelected"/>
        <div v-if="imageUrl.length" class="form-upload-image">
          <img :src="imageUrl">
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
    <div class="profile-calendar">
      <CalendarInput
        label="Fecha"
        :value="profile.birthdate"
        @input="handleInput($event, 'birthdate')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  &-names {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .name {
      max-width: 250px;
      width: 100%;
    }
  }
  &-calendar {
    width: 100%;
  }
}
</style>