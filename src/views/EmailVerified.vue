<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import useUserStore from '@/stores/UserStore';

const route = useRoute();
const userStore = useUserStore();

onMounted(() => {
  const id = route.params.id as string;
  userStore.verifyEmail(id);
})
</script>

<template>
  <div class="verify-email">
    <div
      v-if="userStore.isLoading"
      class="verify-email-loader">
      Cargando...
    </div>
    <div
      v-else
      class="verify-email-done">
      <p
        v-if="!userStore.errorMessage"
        class="message">
        Correo verificado
      </p>
      <p
        v-else
        class="message">
        Algo ha ocurrido, contáctanos
      </p>
      <router-link to="/login">
        <CrushButton
          variant="primary"
          text="Inicia sesión" />
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" setup>
.verify-email {
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