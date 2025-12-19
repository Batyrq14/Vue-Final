<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <div class="mb-8 p-6 bg-blue-50 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    
    <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Page Not Found</h1>
    <p class="text-lg text-gray-600 mb-8 max-w-md">
      Oops! The page you're looking for seems to have vanished into thin air.
    </p>
    
    <router-link 
      to="/" 
      class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Home
    </router-link>
  </div>
</template>

<script setup>
// Modern 404 View
</script>
