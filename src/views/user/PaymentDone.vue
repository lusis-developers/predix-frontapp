<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

import useSubscriptionStore from '@/stores/SubscriptionStore';

const route = useRoute();

const subscriptionStore = useSubscriptionStore();

const isLoading = ref(true);
const resultText = ref('');

const transaccion = computed(() => parseInt(route.query.id as string));
const client = computed(() => route.query.clientTransactionId as string);

const data = JSON.stringify({
  id: transaccion.value,
  clientTxId: client.value,
});

onMounted(async () => {
  try {
    const result = await fetch('https://pay.payphonetodoesposible.com/api/button/V2/Confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PAYPHONE_SECRET}`,
        'Content-type': 'application/json',
      },
      body: data,
    });
    const response = await result.json();
    isLoading.value = false;

    if (response.transactionStatus === 'Approved') {
      userSuscribed();
      resultText.value = 'Tu pago fue correctamente realizado'
    }
    
    if (response.transactionStatus === 'Canceled') {
      resultText.value = 'Tu pago fue cancelado. Por favor escoge otro método de pago u otra tarjeta';
      console.log('error en el pago y estado de la transaccion es cancelado')
    }
  } catch (error) {
    console.error(error);
    resultText.value = 'ooppp Algo ocurrio con el pago, contacta con Terranet Soporte';
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
      <p class="message">
        {{ resultText }}
      </p>
      <router-link to="/user-dashboard/picks">
        <CrushButton
          variant="primary"
          text="Ir a mis picks" />
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" setup>
.payment {
  width: 100%;
  display: flex;
  justify-content: center;
  &-done {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .message {
      font-size: $h3-font-size;
      margin: 64px;
    }
  }
}
</style>