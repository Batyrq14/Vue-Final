<template>
  <div class="card cursor-pointer" @click="$emit('click')">
    <div class="image-wrapper">
      <img :src="image" alt="event image" />
      <span v-if="isFull" class="badge">Sold Out</span>
    </div>

    <div class="content">
      <h3>{{ title }}</h3>
      <p>{{ date }}</p>

      <AppButton :disabled="isFull" @click.stop="$emit('join')">
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
  background: var(--white);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.image-wrapper {
  position: relative;
  height: 200px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  padding: var(--spacing-6);
}

.content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: var(--spacing-2);
  color: var(--gray-900);
}

.content p {
  color: var(--gray-500);
  margin-bottom: var(--spacing-4);
  font-size: 0.95rem;
}

.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--danger);
  color: var(--white);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
}
</style>
