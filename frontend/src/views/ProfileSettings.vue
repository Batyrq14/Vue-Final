<template>
  <div class="settings">
    <div class="settings-header">
      <h2 class="title">Account Settings</h2>
      <p class="subtitle">Manage your preferences and notifications.</p>
    </div>

    <div class="settings-sections">
      <!-- Notifications Section -->
      <section class="settings-box">
        <h3 class="box-title">Notifications</h3>
        <div class="options-list">
          <div class="option-item">
            <div class="checkbox-wrapper">
              <input id="comments" type="checkbox" class="checkbox-custom" checked />
            </div>
            <div class="option-content">
              <label for="comments" class="option-label">New Events</label>
              <p class="option-hint">Get notified when new events are posted.</p>
            </div>
          </div>
          <div class="option-item">
            <div class="checkbox-wrapper">
              <input id="candidates" type="checkbox" class="checkbox-custom" />
            </div>
            <div class="option-content">
              <label for="candidates" class="option-label">Event Reminders</label>
              <p class="option-hint">Get notified 24 hours before an event starts.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Appearance Section -->
      <section class="settings-box">
        <h3 class="box-title">Appearance</h3>
        <div class="toggle-item">
          <div class="toggle-content">
            <span class="option-label">Dark Mode</span>
            <p class="option-hint">Adjust the appearance of the application.</p>
          </div>
          <button type="button" class="toggle-switch" :class="{ 'on': theme.isDarkMode }" @click="toggleDarkMode">
            <span class="toggle-knob"></span>
          </button>
        </div>
      </section>

      <div class="actions">
        <button type="button" class="btn btn-save" @click="saveSettings">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from '../stores/themeStore'

const theme = useThemeStore()

const toggleDarkMode = () => {
  theme.toggleDarkMode()
}

const saveSettings = () => {
    alert('Settings saved successfully!')
}
</script>

<style scoped>
.settings {
  max-width: 600px;
}

.settings-header {
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

.settings-sections {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.settings-box {
  background-color: var(--white);
  padding: var(--spacing-6);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
}

.box-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: var(--spacing-6);
  color: var(--gray-900);
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.option-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
}

.checkbox-custom {
  width: 1.125rem;
  height: 1.125rem;
  accent-color: var(--primary-600);
  cursor: pointer;
}

.option-label {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--gray-800);
}

.option-hint {
  font-size: 0.8125rem;
  color: var(--gray-500);
}

.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-switch {
  width: 3rem;
  height: 1.5rem;
  background-color: var(--gray-200);
  border-radius: var(--radius-full);
  position: relative;
  transition: background-color var(--transition-fast);
}

.toggle-switch.on {
  background-color: var(--primary-600);
}

.toggle-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.25rem;
  height: 1.25rem;
  background-color: var(--white);
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast);
}

.toggle-switch.on .toggle-knob {
  transform: translateX(1.5rem);
}

.actions {
  margin-top: var(--spacing-4);
}

.btn-save {
  padding: var(--spacing-3) var(--spacing-8);
  font-weight: 700;
}
</style>
