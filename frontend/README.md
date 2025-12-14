# Frontend - UniEvents 🎨

Vue 3 application for browsing and managing campus events.

---

## 📋 Overview

The frontend is a single-page application (SPA) built with Vue 3 and Vite. It provides an interface for students to discover campus events, view details, and manage their RSVPs.

**Dev Server**: `http://localhost:5173`

---

## 🏗 Project Structure

```
frontend/
├── src/
│   ├── main.js              # App entry point
│   ├── App.vue              # Root component
│   ├── style.css            # Global styles (TailwindCSS)
│   │
│   ├── views/               # Page components (routes)
│   │   ├── HomeView.vue           # Home page (/)
│   │   ├── EventDetailsView.vue   # Event details (/events/:id)
│   │   ├── LoginView.vue          # Login page (/login)
│   │   └── NotFoundView.vue       # 404 page
│   │
│   ├── router/              # Vue Router configuration
│   │   └── index.js         # Route definitions (lazy-loaded)
│   │
│   ├── stores/              # Pinia state management
│   │   └── eventStore.js    # Event state and actions
│   │
│   ├── composables/         # Reusable composition functions
│   │   └── useFormatDate.js # Date formatting utility
│   │
│   └── components/          # Reusable components
│       └── __tests__/       # Component tests
│
├── public/                  # Static assets
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # TailwindCSS configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies and scripts
```

---

## 🛣 Routes

All routes use **lazy loading** for better performance:

| Path | Component | Description |
|------|-----------|-------------|
| `/` | HomeView | Main page - event listing |
| `/events/:id` | EventDetailsView | Individual event details |
| `/login` | LoginView | User authentication |
| `*` (404) | NotFoundView | Page not found |

**Example route definition:**
```javascript
{
  path: '/',
  name: 'home',
  component: () => import('../views/HomeView.vue')
}
```

---

## 🗃 State Management (Pinia)

### Event Store

Located in `stores/eventStore.js`:

```javascript
import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [],
  }),
  actions: {
    // TODO: Implement fetchEvents action
  },
})
```

**Usage in components:**
```vue
<script setup>
import { useEventStore } from '@/stores/eventStore'

const eventStore = useEventStore()
</script>
```

---

## 🎨 Styling

### TailwindCSS

The project uses **TailwindCSS v4** for styling.

**Configuration**: `tailwind.config.js`
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Global styles**: `src/style.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Example usage in components:**
```vue
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-blue-600">Events</h1>
  </div>
</template>
```

---

## 🔧 Development

### Running the Dev Server

**With Docker (Recommended):**
```bash
# From project root
make up
```

**Without Docker:**
```bash
cd frontend
npm run dev
```

Visit: http://localhost:5173

### Building for Production

```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`

### Running Tests

```bash
cd frontend
npm test
```

**Watch mode:**
```bash
npm test -- --watch
```

---

## 🌐 API Integration

### Fetching Events

The backend API is available at `http://localhost:8083`

**Example - Fetch all events:**
```javascript
const fetchEvents = async () => {
  try {
    const response = await fetch('http://localhost:8083/api/events')
    const events = await response.json()
    console.log(events)
  } catch (error) {
    console.error('Failed to fetch events:', error)
  }
}
```

**Using in Pinia store:**
```javascript
// stores/eventStore.js
export const useEventStore = defineStore('event', {
  state: () => ({
    events: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchEvents() {
      this.loading = true
      try {
        const response = await fetch('http://localhost:8083/api/events')
        this.events = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
  },
})
```

---

## 🧩 Composables

### useFormatDate

Located in `composables/useFormatDate.js`:

```javascript
/**
 * Format a date object to a readable string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function useFormatDate(date) {
  // TODO: Implement date formatting logic
  return ''
}
```

**Example implementation:**
```javascript
export function useFormatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
```

**Usage:**
```vue
<script setup>
import { useFormatDate } from '@/composables/useFormatDate'

const eventDate = '2025-01-15T18:00:00Z'
const formattedDate = useFormatDate(eventDate)
</script>

<template>
  <p>{{ formattedDate }}</p>
</template>
```

---

## 📦 Dependencies

### Production
- **vue** (^3.5.24) - Progressive JavaScript framework
- **vue-router** (^4.6.4) - Official router
- **pinia** (^3.0.4) - State management

### Development
- **vite** (^7.2.4) - Build tool and dev server
- **vitest** (^4.0.15) - Unit testing framework
- **@vue/test-utils** (^2.4.6) - Vue component testing utilities
- **tailwindcss** (^4.1.18) - CSS framework
- **autoprefixer** (^10.4.22) - PostCSS plugin
- **happy-dom** (^20.0.11) - DOM implementation for testing

---

## 🧪 Testing

### Test Configuration

**Vitest config** in `vite.config.js`:
```javascript
export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
  },
})
```

### Example Test

```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'

describe('HomeView', () => {
  it('renders properly', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.text()).toContain('TODO')
  })
})
```

---

## 🐛 Troubleshooting

### Dev Server Won't Start

**Check logs:**
```bash
docker-compose logs client
```

**Common issues:**
- Port 5173 in use: Change port in `vite.config.js`
- Node modules missing: Run `npm install`
- TailwindCSS errors: Check `tailwind.config.js` and `postcss.config.js`

### Hot Reload Not Working

1. Make sure you're editing files in `src/`
2. Check browser console for errors
3. Try hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)

### TailwindCSS Classes Not Working

1. Verify file is in `content` array in `tailwind.config.js`
2. Check `@tailwind` directives in `style.css`
3. Restart dev server

---

## 🚀 Next Steps for Development

**TODO items for your team:**

1. **Implement Views:**
   - Build event listing UI in `HomeView.vue`
   - Create event detail page in `EventDetailsView.vue`
   - Add login form in `LoginView.vue`
   - Design 404 page in `NotFoundView.vue`

2. **Complete Pinia Store:**
   - Implement `fetchEvents()` action
   - Add `fetchEventById(id)` action
   - Add error handling
   - Add loading states

3. **Create Components:**
   - EventCard component
   - EventList component
   - Navigation/Header component
   - Footer component

4. **Implement Composables:**
   - Complete `useFormatDate()`
   - Add `useAuth()` for authentication
   - Add `useApi()` for API calls

5. **Add Tests:**
   - Component tests
   - Store tests
   - Router tests

---

## 📝 Code Style

- Use `<script setup>` syntax for composition API
- Use Pinia for state management
- Use TailwindCSS for styling (avoid inline styles)
- Write tests for new components
- Use lazy loading for routes

---

**Happy Frontend Development! 🎨**
