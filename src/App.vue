<script setup lang="ts">
import {  RouterView, useRouter } from 'vue-router';
import { onMounted, watch } from 'vue';

import { UserRoleEnum } from './enum/UserEnum';
import useUserStore from './stores/UserStore';

const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  userStore.getSession();
});

watch(
  () => userStore.user,
  (value) => {
    if (!value) {
      router.push('/');
      return;
    }
    if (localStorage.getItem('is-buying')) {
      router.push('/dashboard/subscription');
    }
    if (value?.role.includes(UserRoleEnum.USER)) {
      router.push('/dashboard/picks');
      return;
    }
    if (value?.role.includes(UserRoleEnum.ADMIN)) {
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
