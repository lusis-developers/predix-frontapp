<script setup lang="ts">
import { RouterLink } from "vue-router";
import { webMenuItems } from '@/utils/MenuItems';
import { computed } from "vue";

const emit = defineEmits();

const toggleMenu = () => {
	emit("toggle-menu");
};

const menu = computed(() => webMenuItems)

</script>

<template>
	<header class="header">
		<RouterLink to="/">
      <figure>
			  <img src="@/assets/logo-small.png" alt="Predix" />
		  </figure>
    </RouterLink>
		<div class="header-icon" @click="toggleMenu">
			<i class="fa-solid fa-bars" />
		</div>
		<div class="header-buttons">
			<RouterLink
				class="header-buttons-button"
				v-for="(button, index) in menu"
				:to="button.link"
				:key="index"
			>
				{{ button.name }}
			</RouterLink>
		</div>
	</header>
</template>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 16px;

	&-icon {
		display: flex;
		color: $white;

		@media (min-width: $tablet-upper-breakpoint) {
			display: none;
		}
	}

	&-buttons {
		display: none;

		@media (min-width: $tablet-upper-breakpoint) {
			display: flex;
			gap: 16px;
			justify-content: space-around;
			align-items: center;

			& :first-child,
			:nth-child(2) {
				color: $green;
			}

			& :nth-child(4) {
				border: 1px solid $green;
			}

			& :nth-child(5) {
				background-color: $green;
				color: $dark-blue;
			}
		}

		&-button {
			border-radius: 8px;
			text-decoration: none;
			padding: 12px 16px;
			color: $white;
			background: none;
			border: none;
			outline: none;
			font-weight: 700;
			font-size: $body-font-size;
		}
	}
}
</style>
