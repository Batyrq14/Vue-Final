<template>
  <div class="grid">
    <EventCard
      v-for="event in events"
      :key="event.id"
      v-bind="event"
      @click="goToDetails(event.id)"
      @join="join(event.id)"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import EventCard from './EventCard.vue'

const router = useRouter()

defineProps({
  events: Array
})

function goToDetails(id) {
  router.push(`/events/${id}`)
}

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
