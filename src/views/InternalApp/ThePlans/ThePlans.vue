<script setup lang="ts">
import usePlanStore from '@/stores/PlansStore';
import { onMounted } from 'vue';

const planStore = usePlanStore();

onMounted(async () => {
  await planStore.getPlans();
})
</script>

<template>
  <div>
    esto son los planes
  </div>
</template>