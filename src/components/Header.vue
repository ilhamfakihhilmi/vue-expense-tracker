<template>
  <header :class="textColor">
    <h1 class="text-2xl font-semibold text-white">Saldo Anda</h1>
  </header>
</template>

<script setup>
const props = defineProps({
  textColor: {
    type: String,
    required: true,
  },
});
</script>
