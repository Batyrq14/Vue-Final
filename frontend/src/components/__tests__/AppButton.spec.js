import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from '../AppButton.vue'

describe('AppButton.vue', () => {
    it('renders slot content', () => {
        const wrapper = mount(AppButton, {
            slots: {
                default: 'Click Me'
            }
        })
        expect(wrapper.text()).toContain('Click Me')
    })

    it('emits click event when clicked', async () => {
        const wrapper = mount(AppButton)
        await wrapper.trigger('click')
        expect(wrapper.emitted()).toHaveProperty('click')
    })

    it('is disabled when the disabled prop is true', () => {
        const wrapper = mount(AppButton, {
            props: {
                disabled: true
            }
        })
        expect(wrapper.find('button').element.disabled).toBe(true)
    })
})
