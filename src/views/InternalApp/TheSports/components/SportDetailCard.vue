<script setup lang="ts">
import { ref } from 'vue';

import useSportStore from '@/stores/SportStore';
import LeaguesContainer from '../subcomponents/LeaguesContainer.vue';

const sportStore = useSportStore();

const emit = defineEmits(['is-editing', 'add-league']);

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
});

const isAddingLeague = ref(false);

async function deleteSport(): Promise<void> {
  await sportStore.deleteSport();
}

function toggleLeague(): void {
  isAddingLeague.value = !isAddingLeague.value;
}
 </script>


<template>
  <div class="sport-detail">
    <img
      :src="image"
      :alt="name"
      class="sport-detail-image">
    <div class="sport-detail-content">
      <div class="sport-detail-content-actions">
        <h1>
          {{ name }}
        </h1>
        <button class="action">
          <i
            class="fa-solid fa-pen icon"
            @click="emit('is-editing')" />
        </button>
      </div>
      <CrushButton
        variant="primary"
        text="Agregar Ligas"
        @click="toggleLeague" />
    </div>
  </div>
  <LeaguesContainer
    :leagues="sportStore.selectedSport?.leaguesDetails!"
    :isAddingLeague="isAddingLeague" />
</template>

<style lang="scss" scoped>
.sport-detail {
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  &-image {
    border-radius: 8px;
    width: 50%;
    min-width: 280px;
    height: 288px;
    object-fit: cover;
    object-position: center;
  }
  &-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    &-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      .action {
        background-color: transparent;
        border: none;
        outline: none;
        .icon {
          color: $green;
          font-size: 24px;
        }
      }
    }
  }
}
</style>