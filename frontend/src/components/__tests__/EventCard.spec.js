import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EventCard from '../EventCard.vue'

describe('EventCard.vue', () => {
    const mockEvent = {
        title: 'Tech Workshop',
        date: '2025-12-25',
        image: 'https://placehold.co/600x400',
        isFull: false
    }

    it('renders event title and date correctly', () => {
        const wrapper = mount(EventCard, {
            props: mockEvent
        })
        expect(wrapper.text()).toContain('Tech Workshop')
        expect(wrapper.text()).toContain('2025-12-25')
    })

    it('shows "Sold Out" badge when isFull is true', () => {
        const wrapper = mount(EventCard, {
            props: { ...mockEvent, isFull: true }
        })
        expect(wrapper.text()).toContain('Sold Out')
    })

    it('emits join event when button is clicked', async () => {
        const wrapper = mount(EventCard, {
            props: mockEvent
        })
        const button = wrapper.find('button')
        await button.trigger('click')
        // Emits 'join' as per template @click.stop="$emit('join')"
        expect(wrapper.emitted()).toHaveProperty('join')
    })
})
