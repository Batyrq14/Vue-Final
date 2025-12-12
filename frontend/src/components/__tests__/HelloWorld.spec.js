import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// Dummy component for testing
const HelloWorld = {
    template: '<div>Hello World</div>',
}

describe('HelloWorld', () => {
    it('renders properly', () => {
        const wrapper = mount(HelloWorld)
        expect(wrapper.text()).toContain('Hello World')
    })
})
