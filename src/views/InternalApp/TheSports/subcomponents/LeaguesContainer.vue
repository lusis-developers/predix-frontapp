<script setup lang="ts">
import { computed, ref } from 'vue';

import LeagueCard from './LeagueCard.vue';
import { League } from '@/typings/LeagueTypes';
import CreateOrEditLeague from './CreateOrEditLeague.vue';

const emit = defineEmits(['open-close-create-or-edit']);

const props = defineProps({
  isAddingLeague: {
    type: Boolean,
    required: true
  },
  leagues: {
    type: Array as () => League[],
    required: true
  }
});

const isEditing = ref(false);
const leagueId = ref('');
const isLeaguesVisible = computed(() => !props.leagues?.length && !props.isAddingLeague);
const isAddingOrEditing = computed(() => props.isAddingLeague);


function editLeague(event: string): void {
  leagueId.value = event;
  emit('open-close-create-or-edit');
}

function resetValue(): void {
  isEditing.value = false;
  leagueId.value = '';
}

function closeCreateOrEdit(): void {
  resetValue();
  emit('open-close-create-or-edit');
}
</script>


<template>
  <div
    v-if="!isAddingOrEditing"
    class="leagues-container">
    <div
      v-if="isLeaguesVisible"
      class="create-container-text">
      <p>Oh! Aún no has creado ligas de este deporte</p>
      <p class="indication">Una vez hayas creado tus ligas, los encontrarás aquí</p>
    </div>
    <div
      v-else 
      class="leagues-container-leagues">
      <p class="title">
        Ligas
      </p>
      <LeagueCard
        v-for="(league, index) in leagues"
        :key="index"
        :name="league.name"
        :image="league.image"
        :id="league?._id!"
        @edit-league="editLeague" />
    </div>
  </div>
  <div
    v-else
    class="league-container-form">
    <CreateOrEditLeague
      :isEditing="isEditing"
      :leagueId="leagueId"
      @close-create-or-edit="closeCreateOrEdit" />
  </div>
</template>

<style lang="scss" scoped>
.leagues-container {
  width: 100%;
  margin: 36px 0;
  p {
    color: $white;
    font-family: $font-secondary;
    font-size: $h2-font-size;
    text-align: center;
    .indication {
      font-size: $body-font-size;
    }
  }
  &-leagues {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
}
</style>