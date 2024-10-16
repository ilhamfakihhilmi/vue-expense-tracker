<template>
  <main class="mb-5">
    <div
      :class="[textColor, 'text-4xl font-bold mt-3 ']"
    >
      <h1>Rp. {{ formattedTotal }}</h1>
    </div>
  </main>
</template>

<script setup>
import { computed } from "vue";

// Menggabungkan semua props dalam satu deklarasi
const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
});

// Menghitung total yang diformat
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
