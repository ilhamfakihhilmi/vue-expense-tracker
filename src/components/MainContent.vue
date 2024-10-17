<template>
  <main :class="['w-full h-screen p-4', themeClass]">
    <toggle class="flex justify-end">
      <button
        @click="toggleTheme"
        class="absolute mt-4 p-2 bg-blue-500 text-white rounded-md"
      >
        <span v-if="isDayMode" class="text-lg">
          🌞
        </span>
        <span v-else class="text-lg">
          🌜
        </span>
      </button>
    </toggle>

    <main
      :class="{
        'bg-white': !isDarkMode,
        'bg-gray-900': isDarkMode,
      }"
      class="grid grid-cols-[3fr_1fr] h-full w-full box-border overflow-hidden"
    >
      <layout1
        :class="{
          'bg-white': !isDarkMode,
          'bg-gray-900': isDarkMode,
        }"
        class="grid grid-cols-2 gap-4 h-full box-border"
      >
        <div
          :class="{
            'bg-white border-gray-200': !isDarkMode,
            'bg-gray-700 border-gray-700': isDarkMode,
          }"
          class="p-8 shadow-xl border rounded-md h-full box-border"
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
          class="p-4 shadow-xl border rounded-md h-full box-border"
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
          class="p-4 shadow-xl border rounded-md h-full box-border"
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
          class="p-4 shadow-xl border rounded-md h-full box-border"
        >
          <AddTransaction
            @transactionSubmitted="handleTransactionSubmitted"
            :textColor="textColor"
          />
        </div>
      </layout1>

      <layout2
        :class="{
          'bg-white': !isDarkMode,
          'bg-gray-900': isDarkMode,
        }"
        class="grid grid-cols-1 gap-4 pl-4 h-full w-full box-border overflow-y-auto"
      >
        <div
          :class="{
            'bg-white border-gray-200': !isDarkMode,
            'bg-gray-700 border-gray-700': isDarkMode,
          }"
          class="p-4 shadow-xl border rounded-md text-base font-normal h-full box-border"
        >
          <TransactionList
            :transactions="transactions"
            @transactionDeleted="handleTransactionDeleted"
            :textColor="textColor"
          />
        </div>
      </layout2>
    </main>
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
