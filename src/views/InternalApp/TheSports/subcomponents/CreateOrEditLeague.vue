<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import type { League } from '@/typings/LeagueTypes';
import useLeagueStore from '@/stores/LeagueStore';
import useSportStore from '@/stores/SportStore';

const leagueStore = useLeagueStore();
const sportStore = useSportStore()

const emit = defineEmits(['close-create-or-edit']);

const props = defineProps({
  isEditing: {
    type: Boolean,
    required: true
  },
  leagueId: {
    type: String,
    required: true,
  }
});

const imageUrl = ref<string>(''); // TODO: read the image url
const imageFile = ref<File>(new File([], '')); // TODO: store the image file
const name = ref('');
const isCreating = computed(() => !props.isEditing && !props.leagueId.length)
const buttonType = computed(() => isCreating.value ? 'Guardar' : 'Actualizar');

function handleFileSelected(file: File) {
  imageUrl.value = URL.createObjectURL(file);
  imageFile.value = file;
}

function nameInput(nameEvent: string) {
  name.value = nameEvent;
}

async function submitImage(): Promise<string> {
  if (imageFile.value.size !== 0) {
    const result = await leagueStore.uploadLeagueImage(imageFile.value!);

    return result?.url!;
  }
  return '';
}

async function prepareData(): Promise<League> {
  const imageResponse = await submitImage();
  const url = !imageResponse.length ? imageUrl.value : imageResponse;
  let league: League; // Inicializa como undefined
  let sport: string;

  if (isCreating.value) {
    sport = sportStore.selectedSport?._id!;
  } else {
    league = sportStore.selectedSport?.leaguesDetails?.find(league => league._id === props.leagueId)!;
    sport = league?.sport!;
  }

  let data: League = {
    name: name.value,
    image: url,
    sport: sport, // Sport assigned
  };

  return data;
}


async function submitLeague(): Promise<void> {
  const data = await prepareData();
  if (isCreating.value) {
    leagueStore.createLeague(data);
  } else {
    leagueStore.updateLeague(props.leagueId, data)
  }
  closeEdit();
}

function setData(): void {
  const league = sportStore.selectedSport?.leaguesDetails?.find(league => league._id === props.leagueId);
  name.value = league?.name!;
  imageUrl.value = league?.image!;
}

function resetValue(): void {
  name.value = '';
  imageFile.value = new File([], '');
  imageUrl.value = ''
}

function closeEdit() {
  resetValue();
  emit('close-create-or-edit')
}

onMounted(() => {
  if (!isCreating.value) {
    setData();
  }
})
</script>

<template>
  <div class="edit-container-league-content-form">
    <div class="form">
      <p class="form-description">Subir imagen</p>
      <div class="form-upload">
        <CrushUpload @file-selected="handleFileSelected"/>
        <div v-if="imageUrl.length" class="form-upload-image">
          <img :src="imageUrl">
        </div>
      </div>
    </div>
    <CrushTextField 
      v-model:value="name"
      label="Nombre de la liga"
      placeholder="MLB, MLS, NFL"
      @update:modelValue="nameInput" />
    <div class="actions-container">
      <CrushButton 
        variant="secondary"
        text="Cancelar"
        @click="closeEdit"/>
      <CrushButton
        class="actions-container-second"
        variant="primary"
        :text="buttonType"
        @click="submitLeague" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-container-league-content {
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
</style>