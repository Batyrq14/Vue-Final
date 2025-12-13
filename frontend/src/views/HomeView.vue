<template>
  <div class="home">
    <CreateEventForm />
    <EventList :events="events" />
  </div>
</template>

<script setup>
import CreateEventForm from '../components/CreateEventForm.vue'
import EventList from '../components/EventList.vue'

const events = [
  {
    id: 1,
    title: 'Hackathon 2025',
    date: '2025-03-10',
    image: 'https://picsum.photos/400/200?1',
    isFull: false
  },
  {
    id: 2,
    title: 'AI Guest Lecture',
    date: '2025-03-15',
    image: 'https://picsum.photos/400/200?2',
    isFull: true
  }
]
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
