<template>
  <div class="grid">
    <TransitionGroup name="list" tag="div" class="grid-layout">
      <EventCard
        v-for="event in events"
        :key="event.id"
        v-bind="event"
        @click="goToDetails(event.id)"
        @join="join(event.id)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import EventCard from './EventCard.vue'

const router = useRouter()

defineProps({
  events: Array
})

function goToDetails(id) {
  router.push(`/events/${id}`)
}

function join(id) {
  alert(`Joined event ${id}`)
}
</script>

<style scoped>
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
  width: 100%;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-leave-active {
  position: absolute;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-move {
  transition: transform 0.5s ease;
}
</style>
