<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';

import type { Bet } from '@/typings/BetTypes';
import useBetStore from '@/stores/BetStore';
import { BetEnum } from '@/enum/BetEnum';
import ToggleInput from '@/components/ToggleInput.vue';

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
  if (type === 'profit') {
    bet.profit = event;
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
  console.log(event)
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

function submitBet(): void {
  if (!isEditing.value) {
    betStore.createBet({
      ...bet,
      percentage: Number(bet.percentage),
      profit: Number(bet.profit),
      status: BetEnum.PENDING
    });
  } else {
    betStore.updateBet({
      ...bet,
      percentage: Number(bet.percentage),
      profit: Number(bet.profit),
      status: BetEnum.PENDING
    });
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
    <CrushTextField 
      v-model:value="bet.sport"
      label="Deporte"
      placeholder="Beisbol"
      @update:modelValue="handleInput($event, 'sport')" />
    <CrushTextField 
      v-model:value="bet.league"
      label="League"
      placeholder="MLB, MLS, NFL"
      @update:modelValue="handleInput($event, 'league')" />
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
      @update:modelValue="handleInput($event, 'profit')" />
    <CrushTextField 
      v-model:value="bet.percentage"
      label="Porcentaje"
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
  &-actions {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 16px;
  }
}
</style>