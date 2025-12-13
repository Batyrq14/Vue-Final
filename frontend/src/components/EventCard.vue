<template>
  <div class="card">
    <div class="image-wrapper">
      <img :src="image" alt="event image" />
      <span v-if="isFull" class="badge">Sold Out</span>
    </div>

    <div class="content">
      <h3>{{ title }}</h3>
      <p>{{ date }}</p>

      <AppButton :disabled="isFull" @click="$emit('join')">
        Join Event
      </AppButton>
    </div>
  </div>
</template>

<script setup>
import AppButton from './AppButton.vue'

defineProps({
  title: String,
  date: String,
  image: String,
  isFull: Boolean
})
</script>

<style scoped>
.card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
}

.image-wrapper {
  position: relative;
}

img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.content {
  padding: 18px;
}

.content h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
}

.content p {
  color: #64748b;
  margin-bottom: 14px;
}

.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #dc2626;
  color: white;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}
</style>
