<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps({
  price: {
    type: Number,
    required: true
  }
})

const payphoneScriptUrl = `https://pay.payphonetodoesposible.com/api/button/js?appId=${import.meta.env.VITE_APP_ID}`;
const clientTransactionId = 'transaction' + Date.now();
const currency = 'USD';

async function loadPayphoneScript(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const payphoneScript = document.createElement('script');
    payphoneScript.src = payphoneScriptUrl;
    payphoneScript.onload = () => resolve();
    payphoneScript.onerror = (error) => reject(error);
    document.head.appendChild(payphoneScript);
  });
}

async function initPayment(): Promise<void> {
  try {
    await loadPayphoneScript();

    // @ts-ignore
    const response = await payphone.Button({
        token: "TU-TOKEN-DE-AUTENTICACION",
        btnHorizontal: true,
        btnCard: true,
        createOrder: async (actions: any) => {
          try {
            const result = await actions.prepare({
              amount: 100,
              amountWithoutTax: 100,
              currency: "USD",
              clientTransactionId: "identificador-único",
              lang: "es"
            });
            return result;
          } catch (error) {
            console.error("Error en prepare:", error);
            throw error; // Propaga el error hacia arriba
          }
        },
        onComplete: async (model: any, actions: any) => {
          try {
            console.log("Modelo:");
            console.log(model);
            const value = await actions.confirm({
              id: model.id,
              clientTxId: model.clientTxId,
            });
            console.log(value)
            if (value.transactionStatus === 'Approved') {
              console.log('La transacción fue aprobada.');
            } else {
              console.error('La transacción no fue aprobada.');
            }
          } catch (error) {
            console.error("Error en onComplete:", error);
          }
        }
    }).render("#pp-button");
    console.log('response', response)
  } catch (error: any) {
    console.log(error);
  }
}

onMounted(() => {
  initPayment();
})
</script>


<template>
  <div class="payment-button-wrapper">
    <div id="pp-button" />
  </div>
</template>

<style lang="scss" scoped>
.payment-button-wrapper {
  width: 100%;
  margin: 0 auto;
}
</style>