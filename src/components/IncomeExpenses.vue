<template>
  <div class="flex gap-10 justify-center items-center w-full h-full">
    <div>
      <h4 class="text-slate-700 font-normal">Pemasukan</h4>
      <p class="text-2xl text-green-500 font-medium mt-2">
        Rp.{{ formattedIncome }}
      </p>
    </div>
    <div>
      <h4 class="text-slate-700 font-normal">Pengeluaran</h4>
      <p class="text-2xl text-red-500 font-medium mt-2">
        Rp.{{ formattedExpenses }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  income: Number,
  expenses: Number,
});

// Format income with thousand separators
const formattedIncome = computed(() => {
  return Math.abs(props.income).toLocaleString("id-ID"); // Format dengan pemisah ribuan
});

// Format expenses without the negative sign
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
