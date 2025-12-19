<template>
  <main class="app">
    <header class="app-header">
      <div class="container flex justify-between items-center">
        <div class="brand">
           <h1 class="brand-title">UniEvents</h1>
           <p class="brand-subtitle">Discover what’s happening on campus</p>
        </div>
        <nav class="nav-bar">
          <router-link to="/" class="nav-link">Home</router-link>
          
          <template v-if="auth.isAuthenticated">
            <router-link to="/profile" class="nav-link">My Profile</router-link>
            <button @click="handleLogout" class="nav-link btn-link">Logout</button>
          </template>
          
          <template v-else>
            <router-link to="/login" class="nav-link">Login</router-link>
            <router-link to="/signup" class="nav-link">Sign Up</router-link>
          </template>
        </nav>
      </div>
    </header>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup>
import { useAuthStore } from './stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
    auth.logout()
    router.push('/login')
}
</script>

<style>
/* App Layout */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.app-header {
  background-color: var(--white);
  padding: var(--spacing-4) 0;
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-8);
}

.brand-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-700);
  letter-spacing: -0.025em;
}

.brand-subtitle {
  font-size: 0.875rem;
  color: var(--gray-500);
}

/* Navigation */
.nav-bar {
  display: flex;
  gap: var(--spacing-6);
}

.nav-link {
  font-weight: 600;
  color: var(--gray-600);
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-600);
  background-color: var(--primary-50);
}

/* Route Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
