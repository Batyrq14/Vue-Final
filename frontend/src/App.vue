<template>
  <main class="app">
    <header class="header">
      <h1>🎓 UniEvents</h1>
      <p>Discover what’s happening on campus</p>
    </header>

    <router-view />
  </main>
</template>

<style>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
  font-family: Inter, system-ui, Arial, sans-serif;
  padding: 32px;
}

.header {
  margin-bottom: 32px;
}

.header h1 {
  font-size: 36px;
  font-weight: 700;
  color: #1e3a8a;
}

.header p {
  color: #475569;
  font-size: 16px;
}
</style>
