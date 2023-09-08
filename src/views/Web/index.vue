<script setup lang="ts">
import BetWay from './components/BetWay.vue';
import CallToAction from './components/CallToAction.vue';
import TheHero from './components/TheHero.vue';

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
    :descriptions="descriptions" 
    button="Empezar a ganar"
    image="/src/assets/Comments.png"/>
  <BetWay/>
</template>

<style lang="scss" scoepd>
.hero {
  margin: 0 auto;
}
</style>