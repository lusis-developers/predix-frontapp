<script setup lang="ts">
import { ref } from 'vue';
import PlanForm from '@/views/InternalApp/ThePlans/components/PlanForm.vue';

const emit = defineEmits(['update:file', 'closeForm']);

const file = ref('');
const planData = ref({
  name: '',
  price: '',
  description: ''
});

const handleFileSelected = (selectedFile: File) => {
  const reader = new FileReader();
  reader.onload = () => {
    file.value = reader.result as string;
    emit('update:file', file.value);
  };
  reader.readAsDataURL(selectedFile);
};
</script>

<template>
  <div class="form">
    <p class="form-description">Subir imagen</p>
    <div class="form-upload">
      <CrushUpload @file-selected="handleFileSelected"/>
      <div v-if="file" class="form-upload-image">
        <img :src="file">
      </div>
    </div>
  </div>
  <PlanForm 
    :file="file" 
    @update:plan="planData = $event"
    @closeForm="$emit('closeForm')"/>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  &-description {
    font-size: $body-font-size;
    font-family: $font-secondary;
  }
  &-upload {
    border-radius: 8px;
    max-width: $tablet-lower-breakpoint;
    &-image {
      width: 100%;
      img {
        width: 100%;
        max-width: 400px;
        height: 208px;
        object-position: center;
        object-fit: cover;
        border-radius: 8px;
      }
    }
  }
}
</style>
