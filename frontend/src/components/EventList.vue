<template>
  <div class="grid">
    <EventCard
      v-for="event in events"
      :key="event.id"
      v-bind="event"
      @join="join(event.id)"
    />
  </div>
</template>

<script setup>
import EventCard from './EventCard.vue'

defineProps({
  events: Array
})

function join(id) {
  alert(`Joined event ${id}`)
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
}
</style>
