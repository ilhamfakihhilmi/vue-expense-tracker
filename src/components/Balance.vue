<template>
  <div class="text-slate-700 text-4xl font-bold mt-3">
    <h1>Rp.{{ formattedTotal }}</h1>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  total: Number,
});

const formattedTotal = computed(() => {
  return props.total.toLocaleString("id-ID"); // Format sesuai dengan IDR (Indonesia)
});
</script>

<style scoped>
.balance {
  text-align: center;
  margin-bottom: 20px;
}

.balance h1 {
  font-size: 2.5rem;
}
</style>
