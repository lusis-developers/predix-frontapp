<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';

import { BetEnum } from '@/enum/BetEnum';
import { formatPriceToDisplay, formatNumberToSave } from '@/utils/InputFormats';
import useBetStore from '@/stores/BetStore';
import useSportStore from '@/stores/SportStore';
import ToggleInput from '@/components/ToggleInput.vue';
import SelectInput from '@/components/SelectInput.vue';

const sportStore = useSportStore();
const betStore = useBetStore();

const emit = defineEmits(['close-form']);

const bet = reactive({
  sport: '',
  league: '',
  teamA: '',
  teamB: '',
  date: '',
  profit: '',
  percentage: '',
  description: '',
  isFree: false
});
const buttonType = computed(() => betStore.selectedBet ? 'Actualizar' : 'Guardar');
const isEditing = computed(() => betStore.selectedBet);
const sportOptions = computed(() => sportStore.sports?.map(sport => sport.name)!);
const leagueOptions = computed(() => {
  const sport = sportStore.sports?.find(sport => sport.name === bet.sport);

  if (sport) {
    return sport.leaguesDetails?.map(league => league.name);
  } else {
    return [];
  }
})

function handleInput(event: string, type: string): void {
  if (type === 'sport') {
    bet.sport = event;
  }
  if (type === 'league') {
    bet.league = event;
  }
  if (type === 'teamA') {
    bet.teamA = event;
  }
  if (type === 'teamB') {
    bet.teamB = event;
  }
  if (type === 'date') {
    bet.date = event;
  }
  if (type === 'percentage') {
    bet.percentage = event;
  }
  if (type === 'description') {
    bet.description = event;
  }
}

function isFreeInput(event: boolean): void {
  bet.isFree = event;
}

function setData() {
  const data = betStore.selectedBet; 
  bet.sport = data?.sport!;
  bet.date = data?.date!;
  bet.description = data?.description!;
  bet.league = data?.league!;
  bet.percentage = data?.percentage?.toString()!;
  bet.profit = data?.profit?.toString()!;
  bet.teamA = data?.teamA!;
  bet.teamB = data?.teamB!;
  bet.isFree = data?.isFree!;
}

function resetValues() {
  bet.sport = '';
  bet.date = '';
  bet.description = '';
  bet.league = '';
  bet.percentage = '';
  bet.profit = '';
  bet.teamA = '';
  bet.teamB = '';
  bet.isFree = false;
}

function closeForm(): void {
  resetValues();
  emit('close-form');
}

function formattedPrice(event: string): void {
  bet.profit = formatPriceToDisplay(event);
}

function submitBet(): void {
  const data = {
      ...bet,
      percentage: formatNumberToSave(bet.percentage),
      profit: formatNumberToSave(bet.profit),
      status: BetEnum.PENDING
    }
  if (!isEditing.value) {
    betStore.createBet(data);
  } else {
    betStore.updateBet(data);
  }
  closeForm();
}

onMounted(() => {
  if (isEditing.value) {
    setData();
  }
})
</script>

<template>
  <div class="create-edit-container">
    <SelectInput
      label="Deporte"
      :value="bet.sport"
      :options="sportOptions"
      @update:value="handleInput($event, 'sport')" />
    <SelectInput
      label="Ligas"
      :value="bet.league"
      :options="leagueOptions!"
      @update:value="handleInput($event, 'league')" />
    <CrushTextField 
      v-model:value="bet.teamA"
      label="Equipo 1"
      placeholder="Yankees"
      @update:modelValue="handleInput($event, 'teamA')" />
    <CrushTextField 
      v-model:value="bet.teamB"
      label="Equipo 2"
      placeholder="Red sox"
      @update:modelValue="handleInput($event, 'teamB')" />
    <CrushTextField 
      v-model:value="bet.date"
      label="Fecha"
      placeholder="12 de enero 1995"
      @update:modelValue="handleInput($event, 'date')" />
    <CrushTextField 
      v-model:value="bet.profit"
      label="Cuota"
      placeholder="1.5"
      @update:modelValue="formattedPrice($event)" />
    <CrushTextField 
      v-model:value="bet.percentage"
      label="Porcentaje"
      prependContent="%"
      placeholder="10%"
      @update:modelValue="handleInput($event, 'percentage')" />
    <CrushTextField 
      v-model:value="bet.description"
      label="Apuesta"
      placeholder="El equipo 1 gana al 2"
      @update:modelValue="handleInput($event, 'description')" />
    <ToggleInput
      v-model:value="bet.isFree"
      @update:modelValue="isFreeInput" />
    <div class="create-edit-container-actions">
      <CrushButton 
        variant="secondary"
        text="Cancelar"
        @click="closeForm"/>
      <CrushButton
        class="container-button-second"
        variant="primary"
        :text="buttonType"
        @click="submitBet" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-edit-container {
  margin: 24px auto;
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  &-actions {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 16px;
  }
}
</style>