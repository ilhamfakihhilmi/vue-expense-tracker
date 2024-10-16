<template>
  <main :class="['w-screen h-screen', themeClass]">
    <div class="flex justify-end">
      <button
        @click="toggleTheme"
        class="absolute mt-4 p-2 bg-blue-500 text-white rounded-md"
      >
        Toggle Theme
      </button>
    </div>

    <div
      :class="{
        'bg-white': !isDarkMode,
        'bg-gray-900': isDarkMode,
      }"
      class="grid grid-cols-2 p-4 transition-colors duration-300 h-full"
    >
      <div
        :class="{
          'bg-white': !isDarkMode,
          'bg-gray-900': isDarkMode,
        }"
        class="grid grid-cols-2 gap-4 transition-colors duration-300 h-full"
      >
        <div
          :class="{
            'bg-white border-gray-200': !isDarkMode,
            'bg-gray-700 border-gray-700': isDarkMode,
          }"
          class="p-8 shadow-xl border rounded-md h-full"
        >
          <Header :textColor="textColor" />
          <Balance :textColor="textColor" :total="total" />
          <IncomeExpenses
            :income="income"
            :expenses="expenses"
            :textColor="textColor"
          />
        </div>
        <div
          :class="{
            'bg-white border-gray-200': !isDarkMode,
            'bg-gray-700 border-gray-700': isDarkMode,
          }"
          class="p-4 shadow-xl border rounded-md h-full"
        >
          <LineChart
            :transactions="sortedTransactions"
            :textColor="textColor"
          />
        </div>
        <div
          :class="{
            'bg-white border-gray-200': !isDarkMode,
            'bg-gray-700 border-gray-700': isDarkMode,
          }"
          class="p-4 shadow-xl border rounded-md h-full"
        >
          <LineChartBalance
            :transactions="sortedTransactions"
            :textColor="textColor"
          />
        </div>
        <div
          :class="{
            'bg-white border-gray-200': !isDarkMode,
            'bg-gray-700 border-gray-700': isDarkMode,
          }"
          class="p-4 shadow-xl border rounded-md h-full"
        >
          <AddTransaction
            @transactionSubmitted="handleTransactionSubmitted"
            :textColor="textColor"
          />
        </div>
      </div>
      <div
        :class="{
          'bg-white': !isDarkMode,
          'bg-gray-900': isDarkMode,
        }"
        class="grid grid-cols-1 gap-4 pl-4 transition-colors duration-300 h-full"
      >
        <div
          :class="{
            'bg-white border-gray-200': !isDarkMode,
            'bg-gray-700 border-gray-700': isDarkMode,
          }"
          class="p-4 shadow-xl border rounded-md text-base font-normal h-full"
        >
          <TransactionList
            :transactions="transactions"
            @transactionDeleted="handleTransactionDeleted"
            :textColor="textColor"
          />
          <!-- <button
          v-if="hasTransactions"
          class="bg-red-400 border rounded-md p-2"
          @click="deleteAllTransactions"
        >
          <span class="icon">🗑️</span> Hapus Semua Transaksi
        </button> -->
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";

// Import components
import Header from "./Header.vue";
import Balance from "./Balance.vue";
import IncomeExpenses from "./IncomeExpenses.vue";
import TransactionList from "./TransactionList.vue";
import AddTransaction from "./AddTransaction.vue";
import LineChart from "./LineChart.vue";
import LineChartBalance from "./LineChartBalance.vue";

// Import composable for transaction logic
import { useTransactions } from "../composables/useTransactions";

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

// Computed property for sorted transactions
const sortedTransactions = computed(() => {
  return transactions.value; // Ensure that transactions have 'date' and 'amount'
});

// Theme management
const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

// Computed class for main background color based on theme
const themeClass = computed(() =>
  isDarkMode.value ? "bg-gray-800" : "bg-gray-100"
);

// Computed property for text color based on theme
const textColor = computed(() =>
  isDarkMode.value ? "text-white" : "text-black"
);
</script>

<style scoped>
.container {
  padding: 20px;
}

.delete-all-btn {
  margin: 10px 0;
  padding: 5px;
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
