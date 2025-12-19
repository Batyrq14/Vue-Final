<template>
  <form class="form card" @submit.prevent="submit">
    <h2>Create New Event</h2>

    <input 
      v-model="title" 
      placeholder="Title (min 3 chars)" 
      class="input-field" 
      :class="{ 'input-error': title && !isTitleValid }" 
    />
    
    <input 
      v-model="organizerEmail" 
      placeholder="Organizer Email" 
      type="email" 
      class="input-field" 
      :class="{ 'input-error': organizerEmail && !isEmailValid }" 
    />
    
    <Transition name="fade">
        <span v-if="error" class="error-text block">{{ error }}</span>
    </Transition>
    <span v-if="success" class="success-text block">{{ success }}</span>

    <input type="date" v-model="date" class="input-field" />
    <textarea v-model="description" placeholder="Description" class="input-field textarea-field"></textarea>

    <AppButton class="submit-btn">Create</AppButton>
  </form>
</template>

<script setup>
import { ref, computed, watch, onUpdated } from 'vue'
import { useEventStore } from '../stores/eventStore'
import AppButton from './AppButton.vue'

const store = useEventStore()

const title = ref('')
const date = ref('')
const description = ref('')
const organizerEmail = ref('')
const error = ref('')
const success = ref('')

// Computed Validation (Advanced Reactivity)
const isTitleValid = computed(() => title.value.length >= 3)
const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(organizerEmail.value))
const isValid = computed(() => isTitleValid.value && isEmailValid.value && date.value && description.value)

// Watch for error to auto-dismiss (Advanced Reactivity)
watch(error, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            error.value = ''
        }, 3000)
    }
})

// Lifecycle Hook (Requirements: lifecycle hooks)
onUpdated(() => {
    console.log('Form updated')
}) 

async function submit() {
    success.value = ''
    if (!isValid.value) {
        error.value = 'Please fill all fields correctly. Title must be 3+ chars.'
        return
    }

    const newEvent = {
        title: title.value,
        date: date.value,
        description: description.value,
        organizerEmail: organizerEmail.value
    }

    const result = await store.addEvent(newEvent)
    if (result) {
        success.value = 'Event created successfully!'
        title.value = ''
        date.value = ''
        description.value = ''
        organizerEmail.value = ''
    } else {
        error.value = 'Failed to create event.'
    }
}
</script>

<style scoped>
.form {
  padding: var(--spacing-6);
  max-width: 420px;
}

.form h2 {
  margin-bottom: var(--spacing-4);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-900);
}

.input-field {
  margin-bottom: var(--spacing-3);
}

.textarea-field {
  min-height: 100px;
  resize: vertical;
}

.input-error {
  border-color: var(--danger);
  box-shadow: 0 0 0 1px var(--danger);
}

.error-text {
  color: var(--danger);
  font-size: 0.875rem;
  margin-bottom: var(--spacing-2);
}

.success-text {
  color: var(--success);
  font-size: 0.875rem;
  margin-bottom: var(--spacing-2);
}

.submit-btn {
  margin-top: var(--spacing-2);
}

.block {
  display: block;
}

/* Animation Requirement */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
