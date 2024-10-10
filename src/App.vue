<template>
  <Header />
  <div class="container">
    <Balance :total="total" />
    <IncomeExpenses :income="income" :expenses="expenses" />
    
    <!-- Only display delete-all button if there are transactions -->
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
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification';

// Import components
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';

// Import composable for transaction logic
import { useTransactions } from './composables/useTransactions';

const toast = useToast();
const { transactions, total, income, expenses, addTransaction, deleteTransaction, deleteAllTransactions } = useTransactions(toast);

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
