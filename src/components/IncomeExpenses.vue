<template>
  <main
    :class="textColor"
    class="flex gap-8 w-full h-full justify-center items-center"
  >
    <div class="w-1/2 ml-[15%]">
      <h4 class="font-medium text-2xl capitalize">Pemasukan</h4>
      <p
        class="text-xl font-semibold mt-2 backdrop-blur bg-slate-100 bg-opacity-50 border rounded-md w-full h-full flex-row p-2 whitespace-nowrap"
      >
        Rp. {{ formattedIncome }}
      </p>
    </div>
    <div class="border-x border-slate-800 h-1/2 mt-5"></div>
    <div class="w-1/2 mr-20">
      <h4 class="font-medium text-2xl capitalize">Pengeluaran</h4>
      <p
        class="text-xl font-semibold mt-2 backdrop-blur bg-slate-100 bg-opacity-50 border rounded-md w-full h-full flex-row p-2 whitespace-nowrap"
      >
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
