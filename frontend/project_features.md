# Project Features Technical Documentation

This document outlines the technical features implemented in the UniEvents Vue application, categorized by Vue core concepts, routing, state management, and more.

---

### 🟢 Vue Core Concepts

| Feature | Status | Example / File |
| :--- | :---: | :--- |
| **v-bind used** | ✅ | `EventCard.vue` - `:src="image"`, `:class="{ 'on': isDarkMode }"` |
| **v-if / v-else used** | ✅ | `App.vue` - `v-if="auth.isAuthenticated"` / `v-else` for login buttons |
| **v-show used** | ✅ | `EventsDashboard.vue` - `v-show="loading"` |
| **v-for with key** | ✅ | `EventList.vue` - `v-for="event in events" :key="event.id"` |
| **v-on (event handling)** | ✅ | `SignUpView.vue` - `@submit.prevent="handleSignup"`, `@click="toggleDarkMode"` |
| **v-model binding** | ✅ | `CreateEventForm.vue` - `v-model="form.title"` |
| **6–8 components** | ✅ | 12+ (EventCard, AppButton, EventList, etc.) |
| **Props usage** | ✅ | `AppButton.vue` - `defineProps({ disabled: Boolean })` |
| **Event emission (emit)**| ✅ | `EventCard.vue` - `@click="$emit('click')"` |
| **Parent–child comm.** | ✅ | `EventsDashboard.vue` passes events prop to `EventList.vue` |

#### Code Example: Parent-Child Communication (Props/Emit)
```vue
<!-- Parent: EventList.vue -->
<EventCard 
  v-for="event in events" 
  :key="event.id" 
  v-bind="event" 
  @click="goToDetails(event.id)"
/>

<!-- Child: EventCard.vue -->
<script setup>
defineProps({ title: String, date: String, image: String })
defineEmits(['click'])
</script>
<template>
  <div class="card" @click="$emit('click')">...</div>
</template>
```

---

### 🧩 Composition API

| Feature | Status | Example / File |
| :--- | :---: | :--- |
| **ref usage** | ✅ | `LoginView.vue` - `const email = ref('')` |
| **reactive usage** | ✅ | `CreateEventForm.vue` - `const form = reactive({ ... })` |
| **computed properties** | ✅ | `App.vue` - `auth.isAuthenticated` (Pinia computed) |
| **watch / watchEffect** | ✅ | `themeStore.js` - Applies dark mode class to `body` |
| **No prop mutation** | ✅ | Standard practice followed throughout. |
| **setup() function** | ✅ | Using `<script setup>` syntax (industry standard). |
| **onMounted hook** | ✅ | `EventsDashboard.vue` - Fetches events on load. |
| **onUnmounted** | ✅ | Used for cleanup in specific composables. |
| **Reusable composable** | ✅ | `src/composables/useFormatDate.js` |

---

### 🛣️ Vue Router (Routing)

| Feature | Status | Example / File |
| :--- | :---: | :--- |
| **Static routes** | ✅ | `/login`, `/signup`, `/` |
| **Dynamic routes** | ✅ | `/events/:id` |
| **Nested routes** | ✅ | `/profile` has children `/` (overview) and `/settings` |
| **Page navigation** | ✅ | `router.push('/profile')` used in Login/Signup |
| **Navigation guard** | ✅ | `router.beforeEach` checks for `requiresAuth` meta |
| **404 Not Found page** | ✅ | `NotFoundView.vue` registered for `/:pathMatch(.*)*` |
| **Lazy loading** | ✅ | `component: () => import('../views/LoginView.vue')` |

---

### 🍍 State Management (Pinia)

| Feature | Status | Example / File |
| :--- | :---: | :--- |
| **Store created** | ✅ | `authStore.js`, `eventStore.js`, `themeStore.js` |
| **state** | ✅ | `events`, `token`, `user`, `isDarkMode` |
| **getters** | ✅ | `isAuthenticated`, `featuredEvents` |
| **actions** | ✅ | `login()`, `logout()`, `fetchEvents()`, `toggleDarkMode()` |
| **Modular structure** | ✅ | Separate files for each domain store. |

---

### 📝 Forms & API

| Feature | Status | Example / File |
| :--- | :---: | :--- |
| **Form with v-model** | ✅ | `CreateEventForm.vue` |
| **Input validation** | ✅ | `required` and type checking on form submission. |
| **Error messages** | ✅ | `error` ref used to show fetch or login failures. |
| **API request** | ✅ | `fetch('http://localhost:8083/api/events')` |
| **async / await** | ✅ | All store actions use async/await patterns. |
| **Loading/Error state** | ✅ | `loading` and `error` refs in `eventStore.js`. |
| **API data rendering** | ✅ | Search and category results render dynamically. |

---

### 🎨 Styling & UI

| Feature | Status | Example / File |
| :--- | :---: | :--- |
| **Scoped styles** | ✅ | Used in every `.vue` component. |
| **Dynamic classes** | ✅ | `:class="{ 'active': item.isActive }"` |
| **CSS transition** | ✅ | `<transition name="fade">` in `App.vue` and `ProfileView.vue` |
| **Responsive layout** | ✅ | Media queries in `style.css` and `ProfileView.vue`. |

---

### 🧪 Testing

| Feature | Status | Example / File |
| :--- | :---: | :--- |
| **Component tests** | ✅ | `CreateEventForm.spec.js` |
| **Pinia store test** | ✅ | `eventStore.spec.js` |

---

### 🚀 Production & Deployment

| Feature | Status | Note |
| :--- | :---: | :--- |
| **Project Build** | ✅ | `npm run build` generates optimized dist using Vite. |
| **All routes work** | ✅ | Verified through manual and router inspection. |
| **Responsive design** | ✅ | Layout adjusts for mobile and desktop views. |
