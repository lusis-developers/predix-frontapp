<script setup lang="ts">
import {  RouterView, useRoute, useRouter } from 'vue-router';
import { onMounted, watch } from 'vue';

import initializeGoogleAnalytics from './scripts/GoogleTags';
import loadMetricoolScript from './scripts/Metricool';
import { UserRoleEnum } from './enum/UserEnum';
import useUserStore from './stores/UserStore';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

onMounted(() => {
  userStore.getSession();
  loadMetricoolScript();
  initializeGoogleAnalytics();
});

watch(
  () => userStore.user,
  (newValue, oldValue) => {
    if (!newValue) {
      router.push('/');
      return;
    }
    if (route.path.includes('no-email-verify') && !newValue.emailVerified) {
      router.push('/no-email-verify');
    }
    if (localStorage.getItem('is-paying')) {
      return;
    }
    if (localStorage.getItem('is-buying')) {
      router.push('/user-dashboard/subscription');
      localStorage.removeItem('is-buying');
      return;
    }
    if (newValue?.role?.includes(UserRoleEnum.USER) && !oldValue) {
      router.push('/user-dashboard/picks');
      return;
    }
    if (newValue?.role?.includes(UserRoleEnum.ADMIN) && !oldValue) {
      router.push('/internal-app/dashboard/bets');
      return;
    }
  }
)
</script>

<template>
  <div 
    class="app-container">
    <div class="app-container-view">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
.app-container {
  background-color: $dark-blue;
	min-height: 100vh;
	width: 100%;
  &-view {
    flex: 1;
  }
}

</style>
