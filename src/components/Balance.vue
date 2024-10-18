<template>
  <main >
    <div :class="[textColor, 'text-4xl font-bold mt-0 lg:mt-3']">
      <p
        class="ml-2 text-xl font-semibold mt-2 backdrop-blur bg-slate-100 bg-opacity-50 border rounded-md inline-block p-2 whitespace-nowrap"
      >
        Rp. {{ formattedTotal }}
      </p>
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
