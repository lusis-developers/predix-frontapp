<script setup lang="ts">
const emit = defineEmits(['sport-selected'])

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

function sportSelected() {
  emit('sport-selected', props.id)
}
</script>

<template>
  <div class="card">
    <img
      class="card-image" 
      :src="image" :alt="name">
    <p class="card-title">
      {{ name }} 
    </p>
    <CrushButton
      class="card-button"
      text="Ver ligas"
      primary="primary"
      @click="sportSelected" />
  </div>
</template>

<style lang="scss" scoped>
$gap-padding-space: 12px;

.card {
  margin-top: 24px;
  display: flex;
  gap: $gap-padding-space;
  flex-direction: column;
  width: 100%;
  padding: 8px;
  padding-bottom: $gap-padding-space * 2;
  border: 1px solid $white;
  border-radius: 8px;
  @media (min-width: $tablet-lower-breakpoint) {
    width: 80%;
  }
  &-image {
    width: 100%;
    height: 124px;
    object-fit: cover;
    border-radius: 8px;
    overflow: hidden;
    object-position: center top;
  }
  &-title {
    font-family: $font-secondary;
    text-overflow: ellipsis;
    color: $white;
    font-size: $body-font-size;
    font-weight: 700;
  }
  &-button {
    background-color: $green;
    margin: 0 auto;
    width: 80%;
    &:hover {
      background-color: $light-green;
      border: none;
    }
  }
}
</style>