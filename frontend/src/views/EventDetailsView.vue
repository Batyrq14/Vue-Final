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
        
        <!-- RSVP Count -->
        <div class="flex items-center text-gray-600 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="text-lg font-semibold">{{ rsvpCount }} {{ rsvpCount === 1 ? 'person' : 'people' }} attending</span>
        </div>
        
        <div class="flex justify-between items-center pt-6 border-t border-gray-200">
          <button @click="goBack" class="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Events
          </button>
          
          <button 
            @click="handleRSVP" 
            :disabled="rsvpLoading"
            :class="isRSVPed ? 'bg-red-600 hover:bg-red-700' : 'bg-primary-600 hover:bg-primary-700'"
            class="text-white font-bold py-2 px-6 rounded-full transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="rsvpLoading">Processing...</span>
            <span v-else>{{ isRSVPed ? 'Cancel RSVP' : 'RSVP Now' }}</span>
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

// RSVP state
const userEmail = ref('student@unievents.com') // Temporary - will use real auth later
const isRSVPed = ref(false)
const rsvpCount = ref(0)
const rsvpLoading = ref(false)

const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const fetchEvent = async () => {
  loading.value = true
  error.value = null
  try {
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

// Fetch RSVP count
const fetchRSVPCount = async () => {
  try {
    const response = await fetch(`http://localhost:8083/api/events/${route.params.id}/rsvp/count`)
    if (response.ok) {
      const data = await response.json()
      rsvpCount.value = data.count
    }
  } catch (err) {
    console.error('Error fetching RSVP count:', err)
  }
}

// Check if user has RSVPed
const checkUserRSVP = async () => {
  try {
    const response = await fetch(`http://localhost:8083/api/events/${route.params.id}/rsvp/check?email=${encodeURIComponent(userEmail.value)}`)
    if (response.ok) {
      const data = await response.json()
      isRSVPed.value = data.is_rsvped
    }
  } catch (err) {
    console.error('Error checking RSVP status:', err)
  }
}

// Handle RSVP
const handleRSVP = async () => {
  rsvpLoading.value = true
  try {
    if (isRSVPed.value) {
      // Cancel RSVP
      const response = await fetch(`http://localhost:8083/api/events/${route.params.id}/rsvp`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email: userEmail.value })
      })
      
      if (response.ok) {
        isRSVPed.value = false
        await fetchRSVPCount()
        alert('✅ RSVP cancelled successfully!')
      } else {
        const errorText = await response.text()
        alert(`❌ Failed to cancel RSVP: ${errorText}`)
      }
    } else {
      // Create RSVP
      const response = await fetch(`http://localhost:8083/api/events/${route.params.id}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email: userEmail.value })
      })
      
      if (response.ok) {
        isRSVPed.value = true
        await fetchRSVPCount()
        alert('🎉 RSVP successful! See you at the event!')
      } else {
        const errorText = await response.text()
        alert(`❌ ${errorText}`)
      }
    }
  } catch (err) {
    console.error('Error handling RSVP:', err)
    alert('❌ An error occurred. Please try again.')
  } finally {
    rsvpLoading.value = false
  }
}

const goBack = () => {
  router.push('/')
}

onMounted(async () => {
  await fetchEvent()
  await fetchRSVPCount()
  await checkUserRSVP()
})
</script>

<style scoped>
/* Custom styles if needed, but Tailwind is primary */
</style>
