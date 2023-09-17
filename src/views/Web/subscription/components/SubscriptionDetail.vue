<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import type { Plan } from '@/typings/PlanTypes';
import usePlansStore from '@/stores/PlansStore';
import { formatToCurrency } from '@/utils/InputFormats';

const plansStore = usePlansStore();
const route = useRoute();

const payphoneScriptUrl = `https://pay.payphonetodoesposible.com/api/button/js?appId=${import.meta.env.VITE_APP_ID}`;

const planSelected = ref<Plan>();
const clientTransactionId = 'transaction' + Date.now();
const currency = 'USD';

const price = computed(() => {
  if (planSelected.value?.price) {
    return formatToCurrency(planSelected.value?.price)
  } else {
    return 'Free'
  }
});

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
    const payphoneButton = payphone.Button({
      token: import.meta.env.VITE_PAYPHONE_SECRET,
      btnHorizontal: true,
      btnCard: true,
      createOrder: (actions: any) => {
        return actions.prepare({
          amount: planSelected.value?.price,
          amountWithoutTax: planSelected.value?.price,
          currency: currency,
          clientTransactionId: clientTransactionId,
          lang: 'es',
        });
      },
      onComplete: (model: any, actions: any) => {
        return actions.confirm({
          id: model.id,
          clientTxId: model.clientTxId,
        }).then(function (value: any) {
          if (value.transactionStatus == 'Approved') {
            alert('paso' + value.transactionId + 'recibido, ' + 'estado' + value.transactionsStatus)
          }
        }).catch(function (error: any) {
          console.error('error', error)
        })
      },
    });
    payphoneButton.render("#pp-button");
  } catch (error: any) {
    console.log(error);
  }
}

onMounted( async () => {
  await plansStore.getPlans();
  if (plansStore.plans) {
    planSelected.value = plansStore.plans.find(
      (plan) => plan._id === route.params.id
    );
  }
  initPayment();
});
</script>


<template>
	<div class="container">
		<div class="container-card">
			<p class="container-card-name">
				{{ planSelected?.name }}
			</p>
			<div class="container-card-price">
				<p class="container-card-price-span">Total a pagar:</p>
				<p class="container-card-price-item">
					{{ price }}
				</p>
			</div>
		</div>
    <div class="container-info">
      <p class="container-info-tag">
        Tu suscripción incluye:
      </p>
      <p class="container-info-description">
        {{ planSelected?.description }}
      </p>
      <div class="payment-button-wrapper">
        <div id="pp-button" />
      </div>
    </div>
	</div>
  <figure class="figure">
    <img src="@/assets/PayWays.png" alt="Métodos de pago">
  </figure>
</template>

<style lang="scss" scoped>
.container {
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  &-card {
    width: 100%;
    max-width: 272px;
    border: 1px solid $white;
    padding: 24px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    &-name {
      text-align: center;
      color: $green;
      font-size: $h2-font-size;
    }
    &-price {
      text-align: center;
      font-size: $h2-font-size;
      display: flex;
      flex-direction: column;
      gap: 12px;
      &-span {
        font-size: $body-font-size;
      }
      &-item {
        font-size: $h2-font-size;
        &::first-letter {
          color: $green;
          font-size: $h1-font-size;
          vertical-align: middle;
        }
      }
    }
  }
  &-info {
    width: 100%;
    max-width: 376px ;
    display: flex;
    flex-direction: column;
    gap: 12px;
    &-tag {
      color: $white;
      font-family: $font-secondary;
      font-size: $body-font-size;
      font-weight: 700;
    }
    &-description {
      font-family: $font-secondary;
      color: $white;
      font-size: $body-font-size;
      font-weight: 300;
    }
    & :deep(.crush-primary) {
      background-color: $green;
      font-family: $font-secondary;
      color: $dark-blue;
      border: none;
      max-width: 50%;
    }
    .payment-button-wrapper {
      width: 100%;
    }
  }
}
.figure {
  padding: 24px;
  width: 50%;
  max-width: 200px;
  margin: 0 auto;
  @media (min-width: $tablet-lower-breakpoint) {
    width: 25%;
  }
  img {
    width: 100%;
    object-fit: cover;
    margin: 0 auto;
  }
}
</style>
