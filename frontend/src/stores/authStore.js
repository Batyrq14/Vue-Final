import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'))
    const user = ref(JSON.parse(localStorage.getItem('user')) || null)

    const isAuthenticated = computed(() => !!token.value)

    function login(mockUser) {
        token.value = 'mock-token'
        user.value = mockUser || { name: 'Student User', email: 'student@unievents.com' }
        localStorage.setItem('token', token.value)
        localStorage.setItem('user', JSON.stringify(user.value))
    }

    function logout() {
        token.value = null
        user.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    return {
        token,
        user,
        isAuthenticated,
        login,
        logout
    }
})
