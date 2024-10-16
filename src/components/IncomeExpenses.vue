<template>
  <main
    :class="textColor"
    class="flex gap-10 justify-center items-center w-full h-full"
  >
    <div>
      <h4 class="font-normal">Pemasukan</h4>
      <p class="text-2xl text-green-500 font-medium mt-2">
        Rp. {{ formattedIncome }}
      </p>
    </div>
    <div>
      <h4 class="font-normal">Pengeluaran</h4>
      <p class="text-2xl text-red-500 font-medium mt-2">
        Rp. {{ formattedExpenses }}
      </p>
    </div>
  </main>
</template>

<script setup>
import { computed } from "vue";

// Menggabungkan semua props dalam satu deklarasi
const props = defineProps({
  income: {
    type: Number,
    required: true,
  },
  expenses: {
    type: Number,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
});

// Format income dengan pemisah ribuan
const formattedIncome = computed(() => {
  return Math.abs(props.income).toLocaleString("id-ID"); // Format dengan pemisah ribuan
});

// Format expenses tanpa tanda negatif
const formattedExpenses = computed(() => {
  return Math.abs(props.expenses).toLocaleString("id-ID"); // Ambil nilai absolut dan format
});
</script>

<style scoped>
.inc-exp-container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
}

.money {
  font-size: 1.5rem;
  letter-spacing: 1px;
}

.plus {
  color: #2ecc71;
}

.minus {
  color: #c0392b;
}
</style>
