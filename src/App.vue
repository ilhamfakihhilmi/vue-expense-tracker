<template>
  <div class="grid grid-cols-3 gap-4 p-4 bg-[#FAFAFA]">
    <div class="bg-white p-8 shadow-xl border rounded-md border-gray-200">
      <Header /> <Balance :total="total" />
    </div>
    <div class="bg-white p-4 shadow-xl border rounded-md border-gray-200">
      <IncomeExpenses :income="income" :expenses="expenses" />
    </div>
    <div class="bg-white p-4 shadow-xl border rounded-md border-gray-200"></div>

    <div class="bg-white p-4 shadow-xl border rounded-md border-gray-200">
      <button
        v-if="hasTransactions"
        class="delete-all-btn"
        @click="deleteAllTransactions"
      >
        <span class="icon">🗑️</span> Hapus Semua Transaksi
      </button>
      <TransactionList
        :transactions="transactions"
        @transactionDeleted="handleTransactionDeleted"
      />
    </div>
    <div class="bg-white p-4 shadow-xl border rounded-md border-gray-200">
      <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
    </div>
    <div class="bg-white p-4 shadow-xl border rounded-md border-gray-200"></div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";

// Import components
import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import IncomeExpenses from "./components/IncomeExpenses.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";

// Import composable for transaction logic
import { useTransactions } from "./composables/useTransactions";

const toast = useToast();
const {
  transactions,
  total,
  income,
  expenses,
  addTransaction,
  deleteTransaction,
  deleteAllTransactions,
} = useTransactions(toast);

const hasTransactions = computed(() => transactions.value.length > 0);

// Handlers for transactions
const handleTransactionSubmitted = (transactionData) => {
  addTransaction(transactionData);
};

const handleTransactionDeleted = (id) => {
  deleteTransaction(id);
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.delete-all-btn {
  margin: 10px 0;
  padding: 10px;
  background-color: rgb(255, 148, 148);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.delete-all-btn .icon {
  margin-right: 5px;
}
</style>
