<script setup lang="ts">
const icons = [
  
  {
    link: 'https://t.me/+tovWKux6aU85NDlh',
    iconClass: '<i class="fa-brands fa-telegram" />'
  },
  {
    link: 'https://www.instagram.com/predix.ec/',
    iconClass: '<i class="fa-brands fa-instagram" />'
  },
  {
    link: 'https://twitter.com/PredixEc',
    iconClass: '<i class="fa-brands fa-twitter"  />'
  },
  {
    link: 'https://www.facebook.com/predix.ec',
    iconClass: '<i class="fa-brands fa-facebook" />'
  },
];

const links = [
  {
    link: '/subscriptions',
    name: 'Planes'
  }
]
</script>

<template>
  <footer class="footer">
    <div class="footer-social">
      <img class="footer-social-image" src="@/assets/logo.png" alt="Predix">
      <p class="footer-social-title">Encuentranos en:</p>
      <div class="footer-social-container">
        <a
          class="footer-social-container-link"
          v-for="(icon, index) in icons" :key="index" :href="icon.link" target="_blank">
          <span v-html="icon.iconClass" />      
        </a>
      </div>
    </div>
    <div class="footer-links">
      <RouterLink
        class="footer-links-link" 
        v-for="(link, index) in links"
        :to="link.link"
        :key="index"
        >
        {{ link.name }}
      </RouterLink>
    </div>
    <figure class="footer-image">
      <img
        src="@/assets/footer-image.png" alt="Predix">
    </figure>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  margin: 0 auto;
  max-width: $desktop-lower-breakpoint;
  position: relative;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px;
  &-social {
    width: 100%;
    @media(min-width: $tablet-upper-breakpoint) {
      width: 40%;
      justify-content: center;
    }
    &-title {
      margin-top: 12px;
      font-family: $font-secondary;
      font-size: $body-font-size;
    }
    &-container {
      display: flex;
      gap: 12px;
      &-link {
        padding: 12px 6px;
        color: $white;
        font-size: 24px;
      }
    }
  }
  &-links {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    @media(min-width: $tablet-upper-breakpoint) {
      width: 40%;
      justify-content: center;
    }
    &-link {
      color: $white;
      text-decoration: none;
      font-family: $font-secondary;
      font-size: $body-font-size;
    }
  }
  &-image {
    position: absolute;
    right: 0;
    bottom: 0;
    @media (min-width: $tablet-upper-breakpoint) {
      height: 182px;
      padding-bottom: 12px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>