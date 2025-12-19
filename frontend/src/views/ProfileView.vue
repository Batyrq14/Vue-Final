<script setup>
import { useAuthStore } from '../stores/authStore'
import { computed } from 'vue'

const auth = useAuthStore()
const user = computed(() => auth.user || { name: 'Guest', email: 'guest@unievents.com' })
const avatarUrl = computed(() => `https://ui-avatars.com/api/?name=${encodeURIComponent(user.value.name)}&background=6366f1&color=fff`)
</script>

<template>
  <div class="profile-page container">
    <div class="profile-layout card">
      <!-- Sidebar -->
      <aside class="profile-sidebar">
        <div class="user-info">
          <div class="avatar-wrapper">
             <img :src="avatarUrl" alt="User Avatar" />
          </div>
          <h2 class="user-name">{{ user.name }}</h2>
          <p class="user-email">{{ user.email }}</p>
        </div>
        
        <nav class="sidebar-nav">
          <router-link to="/profile" class="nav-item" exact-active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Overview
          </router-link>
          
          <router-link to="/profile/settings" class="nav-item" active-class="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </router-link>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="profile-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  padding-bottom: var(--spacing-12);
}

.profile-layout {
  display: flex;
  flex-direction: column;
  min-height: 500px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .profile-layout {
    flex-direction: row;
  }
}

.profile-sidebar {
  width: 100%;
  background-color: var(--gray-50);
  border-bottom: 1px solid var(--gray-200);
}

@media (min-width: 768px) {
  .profile-sidebar {
    width: 280px;
    border-bottom: none;
    border-right: 1px solid var(--gray-200);
  }
}

.user-info {
  padding: var(--spacing-8) var(--spacing-6);
  text-align: center;
  border-bottom: 1px solid var(--gray-200);
}

.avatar-wrapper {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  margin: 0 auto var(--spacing-4);
  overflow: hidden;
  border: 4px solid var(--white);
  box-shadow: var(--shadow-sm);
}

.avatar-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: var(--spacing-1);
}

.user-email {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.sidebar-nav {
  padding: var(--spacing-4);
}

.nav-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--gray-600);
  font-weight: 600;
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-1);
  transition: all var(--transition-fast);
}

.nav-item:hover {
  background-color: var(--gray-100);
  color: var(--primary-600);
}

.active {
  background-color: var(--primary-50);
  color: var(--primary-700);
}

.nav-icon {
  margin-right: var(--spacing-3);
  transition: transform var(--transition-fast);
}

.nav-item:hover .nav-icon {
  transform: translateX(2px);
}

.profile-content {
  flex: 1;
  padding: var(--spacing-8);
}
</style>
