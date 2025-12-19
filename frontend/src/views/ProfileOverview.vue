<script setup>
import { useAuthStore } from '../stores/authStore'
import { computed } from 'vue'

const auth = useAuthStore()
const user = computed(() => auth.user || { name: 'Guest', email: 'guest@unievents.com' })
</script>

<template>
  <div class="overview">
    <div class="overview-header">
      <h2 class="title">Dashboard Overview</h2>
      <p class="subtitle">Here's what's happening with your account today.</p>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card blue">
        <h3 class="stat-label">Attending</h3>
        <p class="stat-value">12</p>
      </div>
      <div class="stat-card purple">
        <h3 class="stat-label">Upcoming Events</h3>
        <p class="stat-value">3</p>
      </div>
      <div class="stat-card green">
        <h3 class="stat-label">Member Since</h3>
        <p class="stat-value mini">Dec 2025</p>
      </div>
    </div>

    <!-- Details Section -->
    <div class="details-section">
      <h3 class="details-title">Account Details</h3>
      <dl class="details-list">
        <div class="detail-item">
          <dt>Full name</dt>
          <dd>{{ user.name }}</dd>
        </div>
        <div class="detail-item">
          <dt>Email address</dt>
          <dd>{{ user.email }}</dd>
        </div>
        <div class="detail-item">
          <dt>Student ID</dt>
          <dd>#8293741</dd>
        </div>
        <div class="detail-item">
          <dt>Major</dt>
          <dd>Computer Science</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style scoped>
.overview-header {
  margin-bottom: var(--spacing-8);
}

.title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--gray-900);
}

.subtitle {
  color: var(--gray-500);
  font-size: 0.875rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-8);
}

.stat-card {
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
}

.stat-card.blue { background-color: #eff6ff; border-color: #dbeafe; }
.stat-card.purple { background-color: #f5f3ff; border-color: #ddd6fe; }
.stat-card.green { background-color: #f0fdf4; border-color: #dcfce7; }

.stat-label {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: var(--spacing-1);
}

.blue .stat-label { color: #1e40af; }
.purple .stat-label { color: #5b21b6; }
.green .stat-label { color: #166534; }

.stat-value {
  font-size: 2rem;
  font-weight: 800;
}

.blue .stat-value { color: #1e3a8a; }
.purple .stat-value { color: #4c1d95; }
.green .stat-value { color: #14532d; }

.stat-value.mini {
  font-size: 1.25rem;
}

.details-section {
  background-color: var(--white);
  padding: var(--spacing-6);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
}

.details-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: var(--spacing-6);
}

.details-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-6);
}

@media (min-width: 640px) {
  .details-list {
    grid-template-columns: 1fr 1fr;
  }
}

.detail-item dt {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-1);
}

.detail-item dd {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--gray-900);
}
</style>
