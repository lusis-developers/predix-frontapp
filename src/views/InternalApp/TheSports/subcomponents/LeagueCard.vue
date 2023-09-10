<script setup lang="ts">

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
});

function deleteLeague(): void {
  console.log('deleteLeague');
}

function editLeague(): void {
  console.log('edit league')
}
</script>

<template>
  <div class="league">
    <div class="league-content">
      <img :src="image" alt="name" class="league-content-image">
      <p class="league-content-detail">
        {{ name }}
      </p>
    </div>
    <div class="league-actions">
      <button>
        <i class="fa-solid fa-pen icon" />
      </button>
      <button>
        <i class="fa-solid fa-trash icon erase" />
      </button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.league {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 450px;
  min-width: 320px;
  flex-wrap: wrap;
  &-content {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    &-image {
      border-radius: 8px;
      object-position: cover;
      object-position: center;
      width: 24px;
      height: 24px;
    }
  }
  &-actions {
    display: flex;
    gap: 16px;
    button {
      background-color: transparent;
      outline: none;
      border: none;
      .icon {
        color: $green;
        font-size: 20px;
      }
      .erase {
        color: $white;
      }
    }
  }
}
</style>