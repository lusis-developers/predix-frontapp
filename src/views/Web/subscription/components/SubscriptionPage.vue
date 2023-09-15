<script setup lang="ts">
	import usePlansStore from "@/stores/PlansStore";
	import type { Plan } from "@/typings/PlanTypes";
import { formatToCurrency } from "@/utils/InputFormats";
	import { computed, onMounted, ref } from "vue";
	import { useRoute } from "vue-router";

	const plansStore = usePlansStore();
	const route = useRoute();
	const planSelected = ref<Plan>();

const price = computed(() => {
  if (planSelected.value?.price)  {
    return formatToCurrency(planSelected.value?.price)
  } else {
    return 'Free'
  }
})

	onMounted(() => {
		console.log(route.params);
		if (plansStore.plans) {
			planSelected.value = plansStore.plans.find(
				(plan) => plan._id === route.params.id
			);
		}
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
					{{ formatToCurrency(price) }}
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
      <CrushButton
        class="container-info-button"
        variant="primary"
        text="Comprar plan"/>
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
