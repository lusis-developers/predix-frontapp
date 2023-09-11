<script setup lang="ts">
import { onMounted, ref } from 'vue';

import useSportStore from '@/stores/SportStore';
import SportDetailCard from './SportDetailCard.vue';
import EditSportForm from './EditSportForm.vue';

const sportStore = useSportStore();

const emit = defineEmits(['close-sport-detail']);

const isEditing = ref(false)
const fileURL = ref<string>(''); // TODO: read the image url
const name = ref('');

function resetImage() {
  fileURL.value = '';
}

function resetValues() {
  resetImage();
  name.value = '';
  isEditing.value = false;
}

function closeEdit() {
  resetValues();
  emit('close-sport-detail')
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
    <SportDetailCard
      v-if="!isEditing && sportStore.selectedSport"
      :id="sportStore.selectedSport?._id!"
      :image="fileURL"
      :name="name"
      @is-editing="isEditing = true" />
    <template v-else>
      <EditSportForm
        @close-edit="closeEdit" />
    </template>
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
}
</style>