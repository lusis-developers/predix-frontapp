<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

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
      paymentOnWisphub();
    }

    if (response.transactionStatus === 'Canceled') {
      resultText.value = 'Tu pago fue cancelado. Por favor escoge otro método de pago u otra tarjeta';
    }
  } catch (error) {
    console.error(error);
    result.value = 'ooppp Algo ocurrio con el pago, contacta con Terranet Soporte';
  }
});

async function paymentOnWisphub() {
  // try {
  //   const storedBillsId = JSON.parse(localStorage.getItem('bills'));
  //   const request = {
  //     ids: storedBillsId,
  //   };

  //   const response = await axios.post(`${import.meta.env.VITE_NUXT_API}api/payment`, request);
  //   result.value = 'Tu pago fue aceptado exitosamente';
  // } catch (e) {
  //   console.error(e);
  // }
  console.log('pago ejecutado')
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