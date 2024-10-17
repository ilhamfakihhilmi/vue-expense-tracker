<template>
  <div id="app">
    <WelcomePopup />
    <MainContent />
  </div>
</template>

<script setup>
import MainContent from "../src/components/MainContent.vue";
import WelcomePopup from "../src/components/WelcomePopup.vue";
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}
</style>
