import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useEventStore } from '../eventStore'

describe('Event Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.restoreAllMocks()
    })

    it('initializes with empty events', () => {
        const store = useEventStore()
        expect(store.events).toHaveLength(0)
        expect(store.eventCount).toBe(0)
    })

    it('adds an event', async () => {
        const store = useEventStore()
        const result = await store.addEvent({
            title: 'Test Event',
            date: '2025-12-25',
            description: 'Desc',
            organizerEmail: 'test@test.com'
        })
        expect(result).toBe(true)
        expect(store.events).toHaveLength(1)
        expect(store.events[0].title).toBe('Test Event')
    })

    it('fetches events (mocked)', async () => {
        const store = useEventStore()

        // Mock global fetch
        global.fetch = vi.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve([{ id: 1, title: 'Fetched Event' }])
        }))

        await store.fetchEvents()
        expect(store.events).toHaveLength(1)
        expect(store.events[0].title).toBe('Fetched Event')
        expect(store.loading).toBe(false)
    })
})
