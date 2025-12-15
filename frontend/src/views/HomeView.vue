<template>
  <div class="home">
    <CreateEventForm />
    <div v-if="loading" class="loading">Loading events...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <EventList v-else :events="events" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CreateEventForm from '../components/CreateEventForm.vue'
import EventList from '../components/EventList.vue'

const events = ref([])
const loading = ref(false)
const error = ref(null)

// Fetch events from backend API
const fetchEvents = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('http://localhost:8083/api/events')
    if (!response.ok) {
      throw new Error('Failed to fetch events')
    }
    const data = await response.json()
    
    // Transform backend data to match frontend format
    events.value = data.map(event => ({
      id: event.id,
      title: event.title,
      date: event.date.split('T')[0], // Convert ISO date to YYYY-MM-DD
      description: event.description,
      image: `https://picsum.photos/400/200?${event.id}`, // Random image
      isFull: false // You can add this logic later
    }))
  } catch (err) {
    error.value = err.message
    console.error('Error fetching events:', err)
  } finally {
    loading.value = false
  }
}

// Fetch events when component mounts
onMounted(() => {
  fetchEvents()
})
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #e74c3c;
  background: #ffe6e6;
  border-radius: 8px;
}
</style>
