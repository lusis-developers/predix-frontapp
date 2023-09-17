<script setup lang="ts">
import { ref } from "vue";
import WebHeader from "@/components/web/layout/WebHeader.vue";
import WebFooter from "./WebFooter.vue";
import WebMenu from "./WebMenu.vue";
import YeyoTrademark from "./YeyoTrademark.vue";

const showWebMenu = ref(false);

const toggleShowMenu = () => {
  showWebMenu.value = !showWebMenu.value;
};
</script>

<template>
	<div class="main-app-wrapper crush-container">
		<WebHeader @toggle-menu="toggleShowMenu" />
		<div class="main-app-wrapper-view">
			<RouterView />
		</div>
		<WebFooter />
    <YeyoTrademark/>
	</div>
	<WebMenu 
    :isVisible="showWebMenu" 
    @toggle-menu="toggleShowMenu"/>
</template>

<style lang="scss" scoped>
.main-app-wrapper {
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

  &-view {
    flex: 1;
  }
}
</style>
