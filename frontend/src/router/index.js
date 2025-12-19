import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/EventsDashboard.vue'),
        },
        {
            path: '/events/:id',
            name: 'event-details',
            component: () => import('../views/EventDetailsView.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('../views/SignUpView.vue'),
        },
        {
            path: '/profile',
            component: () => import('../views/ProfileView.vue'),
            // Nested Routes implementation
            children: [
                {
                    path: '',
                    name: 'profile-overview',
                    component: () => import('../views/ProfileOverview.vue'),
                },
                {
                    path: 'settings',
                    name: 'profile-settings',
                    component: () => import('../views/ProfileSettings.vue'),
                }
            ],
            meta: { requiresAuth: true } // Meta field for guard
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../views/NotFoundView.vue'),
        },
    ],
})

// Basic Navigation Guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token') || true // Simulating logged in for now, otherwise user is blocked
    // In a real app, this would check a proper auth store

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router
