<template>
  <form class="form" @submit.prevent="submit">
    <h2>➕ Create New Event</h2>

    <input v-model="title" placeholder="Title" />
    <span v-if="error" class="error">{{ error }}</span>

    <input type="date" v-model="date" />
    <textarea v-model="description" placeholder="Description"></textarea>

    <AppButton>Create</AppButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from './AppButton.vue'

const title = ref('')
const date = ref('')
const description = ref('')
const error = ref('')

function submit() {
  if (!title.value) {
    error.value = 'Title is required'
    return
  }

  error.value = ''
  alert('Event created!')
}
</script>

<style scoped>
.form {
  background: white;
  padding: 24px;
  border-radius: 16px;
  max-width: 420px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.form h2 {
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  margin-bottom: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #cbd5f5;
  font-size: 14px;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #6366f1;
}

.error {
  color: #dc2626;
  font-size: 13px;
  margin-bottom: 8px;
}
</style>
