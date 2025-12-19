import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import CreateEventForm from '../CreateEventForm.vue'

describe('CreateEventForm', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('renders correctly', () => {
        const wrapper = mount(CreateEventForm)
        expect(wrapper.find('h2').text()).toContain('Create New Event')
    })

    it('shows error when submitting empty form', async () => {
        const wrapper = mount(CreateEventForm)
        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.find('.error').exists()).toBe(true)
        expect(wrapper.find('.error').text()).toContain('Please fill all fields')
    })

    it('validates title length', async () => {
        const wrapper = mount(CreateEventForm)
        const input = wrapper.find('input[placeholder="Title (min 3 chars)"]')
        await input.setValue('Hi')
        expect(wrapper.vm.isTitleValid).toBe(false)
        await input.setValue('Hello')
        expect(wrapper.vm.isTitleValid).toBe(true)
    })
})
