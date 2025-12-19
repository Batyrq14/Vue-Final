<template>
  <div class="container event-details-page">
    <!-- Loading State -->
    <div v-if="loading" class="state-message">
      <div class="spinner"></div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="error-message">
      <strong>Error!</strong> {{ error }}
      <button @click="goBack" class="btn-text">Back to Events</button>
    </div>
    
    <!-- Event Content -->
    <div v-else-if="event" class="event-card">
      <!-- Event Image Banner -->
      <div class="event-banner">
         <img :src="event.image" alt="Event Banner" class="banner-image" />
         <div class="banner-overlay">
             <div class="banner-content">
                 <h1 class="event-title">{{ event.title }}</h1>
             </div>
         </div>
      </div>
      
      <div class="event-body">
        <div class="event-meta">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="meta-text">{{ formatDate(event.date) }}</span>
        </div>
        
        <div class="event-description">
          <h3>Description</h3>
          <p>{{ event.description }}</p>
        </div>
        
        <!-- RSVP Count -->
        <div class="rsvp-status">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="meta-text"><strong>{{ rsvpCount }}</strong> {{ rsvpCount === 1 ? 'person' : 'people' }} attending</span>
        </div>
        
        <div class="event-actions">
          <button @click="goBack" class="btn-text">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon-small" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Events
          </button>
          
          <button 
            @click="handleRSVP" 
            :disabled="rsvpLoading"
            class="btn-primary"
            :class="{ 'btn-danger': isRSVPed }"
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
import { useEventStore } from '../stores/eventStore'
import { storeToRefs } from 'pinia'

// ... (Script remains roughly the same, no style imports needed)
const route = useRoute()
const router = useRouter()
const store = useEventStore()
const { loading, error } = storeToRefs(store)

const event = ref(null)

// RSVP state
const userEmail = ref('student@unievents.com') 
const isRSVPed = ref(false)
const rsvpCount = ref(0)
const rsvpLoading = ref(false)

const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const fetchEvent = async () => {
    const data = await store.fetchEventById(route.params.id)
    if (data) {
        event.value = data
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
.event-details-page {
  padding-bottom: var(--spacing-12);
}

.event-card {
  max-width: 800px;
  margin: 0 auto;
  background: var(--white);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.event-banner {
  position: relative;
  height: 300px;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  display: flex;
  align-items: flex-end;
}

.banner-content {
  padding: var(--spacing-8);
}

.event-title {
  color: var(--white);
  font-size: 2.25rem;
  font-weight: 800;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.event-body {
  padding: var(--spacing-8);
}

.event-meta {
  display: flex;
  align-items: center;
  color: var(--gray-600);
  margin-bottom: var(--spacing-6);
  font-size: 1.1rem;
}

.icon {
  margin-right: var(--spacing-2);
  color: var(--primary-500);
}

.icon-small {
  margin-right: var(--spacing-2);
}

.event-description h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: var(--spacing-2);
  color: var(--gray-900);
}

.event-description p {
  color: var(--gray-700);
  line-height: 1.7;
  white-space: pre-line;
  margin-bottom: var(--spacing-8);
}

.rsvp-status {
  background-color: var(--gray-50);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-8);
}

.event-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-6);
  border-top: 1px solid var(--gray-200);
}

.btn-text {
  color: var(--gray-600);
  font-weight: 600;
  display: flex;
  align-items: center;
  transition: color var(--transition-fast);
}

.btn-text:hover {
  color: var(--primary-600);
}

.btn-primary {
  background-color: var(--primary-600);
  color: var(--white);
  padding: var(--spacing-3) var(--spacing-8);
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 1rem;
  transition: transform var(--transition-fast), background-color var(--transition-fast);
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  background-color: var(--primary-700);
  transform: translateY(-2px);
}

.btn-danger {
  background-color: var(--danger);
}

.btn-danger:hover {
  background-color: #dc2626;
}

.state-message {
  text-align: center;
  padding: var(--spacing-12);
}

.spinner {
  border: 3px solid var(--gray-200);
  border-top: 3px solid var(--primary-600);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.error-message {
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}
</style>
