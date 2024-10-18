<template>
  <header :class="textColor" class="flex items-center">
    
    <h1 class="lg:text-2xl text-xl font-medium text-white p-2">💳 Saldo Anda</h1>
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
