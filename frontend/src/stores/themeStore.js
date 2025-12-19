import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const isDarkMode = ref(localStorage.getItem('theme') === 'dark')

    function toggleDarkMode() {
        isDarkMode.value = !isDarkMode.value
        applyTheme()
    }

    function applyTheme() {
        const theme = isDarkMode.value ? 'dark' : 'light'
        document.body.classList.toggle('dark', isDarkMode.value)
        localStorage.setItem('theme', theme)
    }

    // Initial apply
    applyTheme()

    return {
        isDarkMode,
        toggleDarkMode
    }
})
