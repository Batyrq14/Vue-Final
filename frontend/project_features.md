# Project Features Technical Documentation

This document outlines the technical features implemented in the UniEvents Vue application, categorized by Vue core concepts, routing, state management, and more.

---

### 🟢 Vue Core Concepts

| Feature | Status | Example / File |
| :--- | :---: | :--- |
| **v-bind used** | ✅ | `EventCard.vue` - `:src="image"`, `:class="{ 'on': isDarkMode }"` |
| **v-if / v-else used** | ✅ | `App.vue` - `v-if="auth.isAuthenticated"` / `v-else` |
| **v-show used** | ✅ | `EventsDashboard.vue` - `v-show="showScrollBtn"` |
| **v-for with key** | ✅ | `EventList.vue` - `v-for="event in events" :key="event.id"` |
| **v-on (event handling)** | ✅ | `SignUpView.vue` - `@submit.prevent="handleSignup"` |
| **v-model binding** | ✅ | `CreateEventForm.vue` - `v-model="form.title"` |
| **6–8 components** | ✅ | 12+ (EventCard, AppButton, EventList, etc.) |
| **Props usage** | ✅ | `AppButton.vue` - `defineProps({ disabled: Boolean })` |
| **Event emission (emit)**| ✅ | `EventCard.vue` - `@click="$emit('join')"` |
| **Parent–child comm.** | ✅ | `EventsDashboard.vue` passes events prop to `EventList.vue` |

---

### 🧩 Composition API

| Feature | Status | Example / File |
| :--- | :---: | :--- |
| **ref usage** | ✅ | `LoginView.vue` - `const email = ref('')` |
| **reactive usage** | ✅ | `CreateEventForm.vue` - `const form = reactive({ ... })` |
| **computed properties** | ✅ | `App.vue` - `auth.isAuthenticated` (Pinia computed) |
| **watch / watchEffect** | ✅ | `themeStore.js` - Applies dark mode class to `body` |
| **setup() function** | ✅ | Using `<script setup>` syntax. |
| **onMounted hook** | ✅ | `EventsDashboard.vue` - Fetches events. |
| **onUnmounted** | ✅ | `EventsDashboard.vue` - Scroll listener cleanup. |
| **Reusable composable** | ✅ | `src/composables/useFormatDate.js` |

---

### 🛣️ Vue Router (Routing)

| Feature | Status | Example / File |
| :--- | :---: | :--- |
| **Static routes** | ✅ | `/login`, `/signup`, `/` |
| **Dynamic routes** | ✅ | `/events/:id` |
| **Nested routes** | ✅ | `/profile` children `/` and `/settings` |
| **Navigation guard** | ✅ | `router.beforeEach` checks for `requiresAuth` |
| **404 Not Found page** | ✅ | `NotFoundView.vue` |
| **Lazy loading** | ✅ | `() => import(...)` in `router/index.js` |

---

### 🍍 State Management (Pinia)

| Feature | Status | Example / File |
| :--- | :---: | :--- |
| **Store created** | ✅ | `authStore.js`, `eventStore.js`, `themeStore.js` |
| **Modular structure** | ✅ | Separate files for each domain. |

---

### 🧪 Testing

| Feature | Status | Example / File |
| :--- | :---: | :--- |
| **3+ Component tests** | ✅ | `AppButton.spec.js`, `EventCard.spec.js`, `CreateEventForm.spec.js` |
| **Pinia store test** | ✅ | `eventStore.spec.js` |
