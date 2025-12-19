<template>
  <div class="container login-container">
    <div class="login-card card">
      <div class="login-header">
        <div class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="login-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </div>
        <h2 class="title">Welcome back</h2>
        <p class="subtitle">
          Sign in to your account
        </p>
      </div>
      
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
            <label for="email-address" class="sr-only">Email address</label>
            <input 
              id="email-address" 
              name="email" 
              type="email" 
              v-model="email"
              required 
              class="input-field" 
              placeholder="Email address" 
            />
        </div>
        <div class="form-group">
            <label for="password" class="sr-only">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              v-model="password"
              required 
              class="input-field" 
              placeholder="Password" 
            />
        </div>

        <div class="form-options">
          <div class="remember-me">
            <input id="remember-me" name="remember-me" type="checkbox" class="checkbox" />
            <label for="remember-me"> Remember me </label>
          </div>

          <div class="forgot-password">
            <a href="#"> Forgot password? </a>
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="loading"
            class="btn login-btn"
          >
            <span class="btn-icon">
              <svg class="h-5 w-5" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>

        <div class="form-footer">
          <p>Don't have an account? <router-link to="/signup" class="link">Sign up</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* ... (existing styles) ... */
.login-btn {
    width: 100%;
    position: relative;
    padding: 0.75rem 1rem;
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
/* ... */

.btn-icon {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
}

.btn-icon svg {
    color: var(--primary-200);
}

.login-btn:hover .btn-icon svg {
    color: var(--primary-100);
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

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '../stores/authStore'

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = () => {
  loading.value = true
  // Mock login delay
  setTimeout(() => {
    auth.login({ email: email.value, name: 'Student User' })
    loading.value = false
    router.push('/profile')
  }, 1000)
}
</script>
