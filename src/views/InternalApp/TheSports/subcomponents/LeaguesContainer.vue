<script setup lang="ts">
import { computed } from 'vue';

import useLeagueStore from '@/stores/LeagueStore';

const leagueStore = useLeagueStore();

const props = defineProps({
  isAddingLeague: {
    type: Boolean,
    required: true
  },
  leagues: {
    type: Array,
    required: true
  }
});

const isLeaguesVisible = computed(() => !props.leagues?.length && !props.isAddingLeague);

</script>


<template>
  <div
    v-if="!isAddingLeague"
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
      aqui en encontramos todas las ligas
    </div>
  </div>
  <div
    v-else
    class="league-container-form">
    Estamos agregando
  </div>
</template>

<style lang="scss" scoped>
.leagues-container {
  width: 100%;
  margin: 24px 0;
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
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
  }
}
</style>