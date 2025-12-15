<template>
  <div class="event-details container mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline"> {{ error }}</span>
      <div class="mt-4">
        <button @click="goBack" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Back to Events
        </button>
      </div>
    </div>
    
    <div v-else-if="event" class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="bg-primary-600 px-6 py-4">
        <h1 class="text-3xl font-bold text-white">{{ event.title }}</h1>
      </div>
      
      <div class="p-6">
        <div class="flex items-center text-gray-600 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-lg">{{ formatDate(event.date) }}</span>
        </div>
        
        <div class="prose max-w-none text-gray-800 mb-8">
          <h3 class="text-xl font-semibold mb-2">Description</h3>
          <p class="whitespace-pre-line">{{ event.description }}</p>
        </div>
        
        <div class="flex justify-between items-center pt-6 border-t border-gray-200">
          <button @click="goBack" class="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Events
          </button>
          
          <button class="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-full transition-colors shadow-md">
            RSVP Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const event = ref(null)
const loading = ref(true)
const error = ref(null)

const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const fetchEvent = async () => {
  loading.value = true
  error.value = null
  try {
    // Note: Assuming API is on localhost:8083 per README/User Request
    const response = await fetch(`http://localhost:8083/api/events/${route.params.id}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Event not found')
      }
      throw new Error('Failed to fetch event details')
    }
    
    event.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error("Error fetching event:", err)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  fetchEvent()
})
</script>

<style scoped>
/* Custom styles if needed, but Tailwind is primary */
</style>
