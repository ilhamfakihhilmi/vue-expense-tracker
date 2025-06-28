<template>
  <div id="app">
    <WelcomePopup />
    <MainDashboard />
  </div>
</template>

<script setup>
import MainDashboard from "./components/MainDashboard.vue";
import WelcomePopup from "./components/WelcomePopup.vue";
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

/* Ensure proper viewport handling */
@media (max-width: 640px) {
  body {
    padding-top: env(safe-area-inset-top, 0px);
  }
}
</style>
