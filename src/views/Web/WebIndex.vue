<script setup lang="ts">
import BetWay from './components/BetWay.vue';
import CallToAction from './components/CallToAction.vue';
import CreateAccount from './components/CreateAccount.vue';
import TheHero from './components/TheHero.vue';
import TheForm from './components/TheForm.vue';
import image1 from '@/assets/Comments.png';
import image2 from '/src/assets/historial.svg';

const descriptions = [
  {
    text: 'Pronosticamos por ti'
  },
  {
    text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur maemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma'
  },
]
</script>

<template>
  <div class="hero">
    <TheHero/>
  </div>
  <CallToAction 
    button="Empezar a ganar"
    :descriptions="descriptions" 
    :image="image1" />
    <BetWay/>
  <CallToAction 
    button="Empezar a ganar"
    :descriptions="descriptions" 
    :image="image2"
    :reverse="true" />
  <CreateAccount/>
  <TheForm/>
</template>

<style lang="scss" scoepd>
.hero {
  margin: 0 auto;
}
</style>