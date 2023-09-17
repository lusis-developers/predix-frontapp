<script setup lang="ts">
import BetWay from './components/BetWay.vue';
import CallToAction from './components/CallToAction.vue';
import CreateAccount from './components/CreateAccount.vue';
import TheHero from './components/TheHero.vue';
import TheForm from './components/TheForm.vue';
import image1 from '@/assets/Comments.png';
import image2 from '/src/assets/historial.svg';

const firstDescriptions = [
  {
    text: 'Pronosticamos por ti'
  },
  {
    text: 'Descubre el arte de invertir en el deporte con precisión y elegancia. Nuestros pronósticos exclusivos, respaldados por un análisis meticuloso, están diseñados para aquellos que buscan trascender en el mundo de las apuestas. Sé parte de nosotros y toma decisiones con confianza.'
  },
]

const secondDescriptions = [
  {
    text: 'Pronosticamos por ti'
  },
  {
    text: 'Adéntrate en una experiencia de apuestas sin precedentes. Con nuestra perspicacia analítica, cada pronóstico se convierte en una oportunidad dorada. Únete a nosotros y redefine tus expectativas.'
  },
]
</script>

<template>
  <div class="hero">
    <TheHero/>
  </div>
  <CallToAction 
    button="Empezar a ganar"
    :descriptions="firstDescriptions" 
    :image="image1" />
    <BetWay/>
  <CallToAction 
    button="Empezar a ganar"
    :descriptions="secondDescriptions" 
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