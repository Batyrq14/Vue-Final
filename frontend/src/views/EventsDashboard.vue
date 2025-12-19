<template>
  <div class="dashboard container">
    <CreateEventForm />
    
    <!-- Search & Filter Section -->
    <section class="search-section card">
      <h2 class="section-title">Find Events</h2>
      
      <div class="search-controls">
        <!-- Search Bar -->
        <div class="search-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search events by title or description..."
            class="input-field search-input"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <!-- Filters -->
        <div class="filters-wrapper">
          <div class="filter-group">
            <label>Date Filter</label>
            <select v-model="dateFilter" class="input-field">
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming Events</option>
              <option value="past">Past Events</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>Sort By</label>
            <select v-model="sortBy" class="input-field">
              <option value="date">Date</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="results-meta">
        Showing <strong>{{ filteredEvents.length }}</strong> of {{ events.length }} events
      </div>
    </section>
    
    <!-- Loading/Error/Empty States -->
    <div v-if="loading" class="state-message">
      <div class="spinner"></div>
      <p>Loading events...</p>
    </div>
    
    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
    
    <div v-else-if="filteredEvents.length === 0" class="empty-state">
      <div class="empty-icon-wrapper">
         <svg xmlns="http://www.w3.org/2000/svg" class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
      </div>
      <h3>No events found</h3>
      <p>Try adjusting your search or filters</p>
    </div>
    
    <!-- Event List -->
    <EventList v-else :events="filteredEvents" />

    <!-- Back to Top Button (v-show example) -->
    <button 
      v-show="showScrollBtn" 
      class="back-to-top" 
      @click="scrollToTop"
    >
      ↑
    </button>
  </div>
</template>

<script setup>
// Import generic components
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEventStore } from '../stores/eventStore'
import { storeToRefs } from 'pinia'
import CreateEventForm from '../components/CreateEventForm.vue'
import EventList from '../components/EventList.vue'

// Initialize Store
const eventStore = useEventStore()
const { events, loading, error } = storeToRefs(eventStore) 

// Search & Filter state
const searchQuery = ref('')
const dateFilter = ref('all') 
const sortBy = ref('date') 
const showScrollBtn = ref(false)

// Scroll Handling
const handleScroll = () => {
    showScrollBtn.value = window.scrollY > 300
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Fetch events from store
const fetchEvents = async () => {
    await eventStore.fetchEvents()
}

// Computed filtered and sorted events
const filteredEvents = computed(() => {
  let result = events.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(event => 
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query)
    )
  }

  const now = new Date()
  if (dateFilter.value === 'upcoming') {
    result = result.filter(event => new Date(event.date) >= now)
  } else if (dateFilter.value === 'past') {
    result = result.filter(event => new Date(event.date) < now)
  }

  if (sortBy.value === 'date') {
    result.sort((a, b) => new Date(a.date) - new Date(b.date))
  } else if (sortBy.value === 'title') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }

  return result
})

onMounted(() => {
  fetchEvents()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    background-color: var(--primary-600);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: var(--shadow-lg);
    cursor: pointer;
    transition: transform 0.2s;
    z-index: 100;
}

.back-to-top:hover {
    transform: translateY(-5px);
    background-color: var(--primary-700);
}

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
  padding-bottom: var(--spacing-12);
}

.search-section {
  padding: var(--spacing-6);
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-900);
  margin-bottom: var(--spacing-6);
}

.search-controls {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

@media (min-width: 768px) {
  .search-controls {
    flex-direction: row;
    align-items: flex-end;
  }
}

.search-wrapper {
  flex: 2;
  position: relative;
}

.search-input {
  padding-left: 2.75rem; /* Space for icon */
  height: 48px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: var(--gray-400);
}

.filters-wrapper {
  flex: 1;
  display: flex;
  gap: var(--spacing-4);
}

.filter-group {
  flex: 1;
}

.filter-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: var(--spacing-1);
}

.results-meta {
  margin-top: var(--spacing-4);
  font-size: 0.875rem;
  color: var(--gray-500);
  text-align: right;
}

/* States */
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
  margin: 0 auto var(--spacing-4);
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.error-message {
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-12);
  color: var(--gray-500);
}

.empty-icon-wrapper {
  background-color: var(--gray-100);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-4);
}

.empty-icon {
  width: 40px;
  height: 40px;
  color: var(--gray-400);
}
</style>
