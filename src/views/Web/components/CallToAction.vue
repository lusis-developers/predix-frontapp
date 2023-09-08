<script setup lang="ts">
interface Description {
  text: string
}

const props = defineProps({
  descriptions: {
    type: Array as () => Description[],
    required: true,
  },
  button: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  reverse: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <div 
    class="container"
    :class="{'container-reverse': reverse}">
    <figure class="container-comments">
      <img :src="image" alt="">
    </figure>
    <div class="container-description">
      <p 
        v-for="(description, index ) in descriptions"
        :key="index">
        {{ description.text }}
      </p>
      <CrushButton
        class="container-description-button"
        variant="primary"
        :text="button"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 24px;
  width: 100%;
  background-color: $dark-blue;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 5%;
  &-reverse {
    flex-direction: row-reverse;
  }
  &-comments {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: $mobile-upper-breakpoint;
    @media (min-width: $tablet-lower-breakpoint) {
      width: 45%;
    }
    img {
      width: 100%;
    }
  }
  &-description {
    width: 100%;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media(min-width: $tablet-lower-breakpoint) {
      width: 40%;
    }
    & :first-child {
      color: $green;
      font-size: $h2-font-size;
    }
    & :nth-child(2) {
      font-family: $font-secondary;
      font-size: $body-font-size;
    }
    &-button {
      width: 75%;
    }
    :deep(.crush-primary) {
      background-color: $green;
      color: $dark-blue;
    }
  }
}
</style>