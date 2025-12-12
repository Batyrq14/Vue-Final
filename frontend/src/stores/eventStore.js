import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', {
    state: () => ({
        events: [],
    }),
    actions: {
        // TODO: Implement fetchEvents action
    },
})
