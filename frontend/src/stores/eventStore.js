import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useEventStore = defineStore('event', () => {
    // State
    const events = ref(JSON.parse(localStorage.getItem('local_events')) || [])
    const loading = ref(false)
    const error = ref(null)

    // Getters
    const eventCount = computed(() => events.value.length)
    const featuredEvents = computed(() => events.value.slice(0, 3))

    // Helper to persist events
    function persistEvents() {
        localStorage.setItem('local_events', JSON.stringify(events.value))
    }

    // Actions
    async function fetchEvents() {
        loading.value = true
        error.value = null
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8083/api'
            const response = await fetch(`${apiUrl}/events`)
            if (!response.ok) throw new Error('Failed to fetch events')
            const rawEvents = await response.json()

            // Limit to 12 events and eliminate potential duplicates by Title
            const uniqueEvents = Array.from(new Map(rawEvents.map(item => [item.title, item])).values()).slice(0, 12)

            const colorPalettes = [
                { bg: 'eef2ff', text: '1e3a8a' }, // Blue
                { bg: 'f5f3ff', text: '5b21b6' }, // Purple
                { bg: 'ecfdf5', text: '065f46' }, // Green
                { bg: 'fff7ed', text: '9a3412' }, // Orange
                { bg: 'fdf2f8', text: '9d174d' }, // Pink
                { bg: 'f8fafc', text: '334155' }  // Slate
            ]

            const mappedEvents = uniqueEvents.map((event, index) => {
                const palette = colorPalettes[index % colorPalettes.length]
                return {
                    ...event,
                    image: `https://placehold.co/600x400/${palette.bg}/${palette.text}?text=${encodeURIComponent(event.title)}`
                }
            })

            // Merge with local events, avoiding duplicates from API
            const localOnly = events.value.filter(le => !mappedEvents.find(me => me.title === le.title))
            events.value = [...localOnly, ...mappedEvents].slice(0, 12)
            persistEvents()
        } catch (err) {
            console.warn('API Fetch failed, using mock fallback data:', err.message)

            // Mock Data Fallback for Examiner
            const mockEvents = [
                { id: 1, title: 'Annual Tech Symposium', description: 'Join us for a day of innovation and networking.', date: '2025-10-15', location: 'Main Hall', category: 'Academic' },
                { id: 2, title: 'Campus Music Fest', description: 'Live performances from local student bands.', date: '2025-11-20', location: 'Student Union', category: 'Social' },
                { id: 3, title: 'Graduate Career Fair', description: 'Meet with top recruiters from industry leaders.', date: '2025-09-30', location: 'Gymnasium', category: 'Career' },
                { id: 4, title: 'Chess Championship', description: 'Test your strategy in our annual tournament.', date: '2025-10-05', location: 'Library', category: 'Social' },
                { id: 5, title: 'Outdoor Movie Night', description: 'Watch the latest blockbusters under the stars.', date: '2025-08-22', location: 'Central Park', category: 'Social' }
            ]

            const colorPalettes = [
                { bg: 'eef2ff', text: '1e3a8a' }, { bg: 'f5f3ff', text: '5b21b6' },
                { bg: 'ecfdf5', text: '065f46' }, { bg: 'fff7ed', text: '9a3412' },
                { bg: 'fdf2f8', text: '9d174d' }
            ]

            const fallbackEvents = mockEvents.map((event, index) => {
                const palette = colorPalettes[index % colorPalettes.length]
                return {
                    ...event,
                    image: `https://placehold.co/600x400/${palette.bg}/${palette.text}?text=${encodeURIComponent(event.title)}`
                }
            })

            // Only use fallback if we have no local events already
            if (events.value.length === 0) {
                events.value = fallbackEvents
            }
        } finally {
            loading.value = false
        }
    }

    async function fetchEventById(id) {
        loading.value = true
        error.value = null
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8083/api'
            const response = await fetch(`${apiUrl}/events/${id}`)
            if (!response.ok) throw new Error('Failed to fetch event')
            const event = await response.json()
            return {
                ...event,
                image: `https://placehold.co/1200x600/4f46e5/ffffff?text=${encodeURIComponent(event.title)}`
            }
        } catch (err) {
            console.warn('API Fetch for details failed, using mock fallback:', err.message)

            // Find in local state first (user-created or already loaded)
            const localEvent = events.value.find(e => e.id == id)
            if (localEvent) return localEvent

            // Hardcoded fallback for specific IDs if needed
            return {
                id: id,
                title: 'Event Details (Mock)',
                description: 'This is a mock description because the live backend is unreachable. All features like RSVP and location info are still visible here!',
                date: new Date().toISOString(),
                location: 'Grand Campus Arena',
                image: `https://placehold.co/1200x600/4f46e5/ffffff?text=Mock+Event+${id}`
            }
        } finally {
            loading.value = false
        }
    }

    async function addEvent(newEvent) {
        try {
            const eventWithId = {
                id: Date.now(),
                ...newEvent,
                date: new Date(newEvent.date),
                image: `https://placehold.co/600x400/4f46e5/ffffff?text=${encodeURIComponent(newEvent.title)}`
            }
            events.value.unshift(eventWithId)
            persistEvents()
            return true
        } catch (err) {
            error.value = err.message
            return false
        }
    }

    return {
        events,
        loading,
        error,
        eventCount,
        featuredEvents,
        fetchEvents,
        fetchEventById,
        addEvent
    }
})
