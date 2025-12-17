<template>
  <div class="home">
    <CreateEventForm />
    
    <!-- Search & Filter Section -->
    <div class="search-filter-section bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">Find Events</h2>
      
      <!-- Search Bar -->
      <div class="mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search events by title or description..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
        />
      </div>
      
      <!-- Filters -->
      <div class="flex flex-wrap gap-4">
        <!-- Date Filter -->
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-2">Date Filter</label>
          <select
            v-model="dateFilter"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming Events</option>
            <option value="past">Past Events</option>
          </select>
        </div>
        
        <!-- Sort By -->
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            v-model="sortBy"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
          >
            <option value="date">Date</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>
      
      <!-- Results Count -->
      <div class="mt-4 text-sm text-gray-600">
        Showing {{ filteredEvents.length }} of {{ events.length }} events
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading events...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>
    
    <!-- No Results -->
    <div v-else-if="filteredEvents.length === 0" class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="mt-4 text-xl font-semibold text-gray-700">No events found</h3>
      <p class="mt-2 text-gray-500">Try adjusting your search or filters</p>
    </div>
    
    <!-- Event List -->
    <EventList v-else :events="filteredEvents" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CreateEventForm from '../components/CreateEventForm.vue'
import EventList from '../components/EventList.vue'

const events = ref([])
const loading = ref(false)
const error = ref(null)

// Search & Filter state
const searchQuery = ref('')
const dateFilter = ref('all') // 'all', 'upcoming', 'past'
const sortBy = ref('date') // 'date', 'title'

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
    
    events.value = data.map(event => ({
      id: event.id,
      title: event.title,
      date: event.date.split('T')[0],
      description: event.description,
      image: `https://picsum.photos/400/200?${event.id}`,
      isFull: false
    }))
  } catch (err) {
    error.value = err.message
    console.error('Error fetching events:', err)
  } finally {
    loading.value = false
  }
}

// Computed filtered and sorted events
const filteredEvents = computed(() => {
  let result = events.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(event => 
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query)
    )
  }

  // Date filter
  const now = new Date()
  if (dateFilter.value === 'upcoming') {
    result = result.filter(event => new Date(event.date) >= now)
  } else if (dateFilter.value === 'past') {
    result = result.filter(event => new Date(event.date) < now)
  }

  // Sort
  if (sortBy.value === 'date') {
    result.sort((a, b) => new Date(a.date) - new Date(b.date))
  } else if (sortBy.value === 'title') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }

  return result
})

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

.search-filter-section {
  margin-top: 20px;
}
</style>
