<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import useSubscriptionStore from '@/stores/SubscriptionStore';

const route = useRoute();

const subscriptionStore = useSubscriptionStore();

const isLoading = ref(true);
const resultText = ref('');

const transaccion = computed(() => parseInt(route.query.id as string));
const client = computed(() => route.query.clientTransactionId as string);

onMounted(async () => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PAYPHONE_SECRET}`,
        'Content-type': 'application/json',
      }
    };

    const data = {
      id: transaccion.value,
      clientTxId: client.value,
    };

    console.log(data);
    const result = await axios.post('https://pay.payphonetodoesposible.com/api/button/V2/Confirm', data, config);

    console.log('result', result)
    console.log('response before confirming approved')

  } catch (error) {
    console.error(error);
    resultText.value = 'ooppp Algo ocurrio con el pago, contacta con Terranet Soporte';
  } finally {
    isLoading.value = false;
  }
});

async function userSuscribed() {
  await subscriptionStore.subscribe();
}

</script>

<template>
  <div class="payment">
    <div
      v-if="isLoading"
      class="payment-loader">
      Cargando...
    </div>
    <div
      v-else
      class="payment-done">
      <p>
        {{ resultText }}
      </p>
      <router-link
        to="/">
        Regresa al inicio
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" setup>
.payment {
  width: 100%;
  display: flex;
}
</style>