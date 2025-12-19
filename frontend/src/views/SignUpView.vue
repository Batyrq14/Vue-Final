<template>
  <div class="container signup-container">
    <div class="signup-card card">
      <div class="signup-header">
        <div class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="signup-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 class="title">Create an account</h2>
        <p class="subtitle">Join UniEvents today</p>
      </div>

      <form class="signup-form" @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="full-name" class="sr-only">Full Name</label>
          <input 
            id="full-name" 
            v-model="name"
            type="text" 
            required 
            class="input-field" 
            placeholder="Full Name" 
          />
        </div>

        <div class="form-group">
          <label for="email-address" class="sr-only">Email address</label>
          <input 
            id="email-address" 
            v-model="email"
            type="email" 
            required 
            class="input-field" 
            placeholder="Email address" 
          />
        </div>

        <div class="form-group">
          <label for="password" class="sr-only">Password</label>
          <input 
            id="password" 
            v-model="password"
            type="password" 
            required 
            minlength="8"
            class="input-field" 
            placeholder="Password (min 8 chars)" 
          />
        </div>

        <button type="submit" :disabled="loading" class="btn signup-btn">
          <span v-if="loading">Creating account...</span>
          <span v-else>Sign up</span>
        </button>

        <div class="form-footer">
          <p>Already have an account? <router-link to="/login" class="link">Log in</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '../stores/authStore'

const auth = useAuthStore()
const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleSignup = () => {
    loading.value = true
    // Mock signup delay
    setTimeout(() => {
        auth.login({ email: email.value, name: name.value })
        loading.value = false
        alert('Account created successfully!')
        router.push('/profile')
    }, 1500)
}
</script>

<style scoped>
.signup-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.signup-card {
  width: 100%;
  max-width: 448px;
  padding: var(--spacing-8);
}

.signup-header {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.icon-wrapper {
  margin: 0 auto 1rem auto;
  height: 3.5rem;
  width: 3.5rem;
  background-color: var(--primary-100);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup-icon {
  color: var(--primary-600);
}

.title {
  font-size: 1.875rem;
  font-weight: 800;
  color: var(--gray-900);
}

.subtitle {
  color: var(--gray-500);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.signup-btn {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  margin-top: var(--spacing-2);
}

.form-footer {
  text-align: center;
  margin-top: var(--spacing-4);
  font-size: 0.875rem;
  color: var(--gray-600);
}

.link {
  color: var(--primary-600);
  font-weight: 600;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
