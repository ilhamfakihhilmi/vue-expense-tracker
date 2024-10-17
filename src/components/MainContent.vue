<template>
  <main :class="['w-full h-screen p-4 ', themeClass]">
    <toggle class="flex justify-end">
      <button
        @click="toggleTheme"
        class="absolute mt-4 p-2 bg-blue-500 text-white rounded-md"
      >
        <span v-if="isDayMode" class="text-lg"> 🌞 </span>
        <span v-else class="text-lg"> 🌜 </span>
      </button>
    </toggle>

    <layout1
      :class="{
        'bg-white': !isDarkMode,
        'bg-gray-900': isDarkMode,
      }"
      class="grid grid-cols-[3fr_1fr] h-[95vh] w-full box-border"
    >
      <div
        :class="{
          'bg-white': !isDarkMode,
          'bg-gray-900': isDarkMode,
        }"
        class="grid grid-cols-2 gap-4 box-border h-[9vh]"
      >
        <div class="grid grid-rows-2 gap-4 h-[49vh]">
          <!-- Set to h-full to match layout2 -->
          <layouta
            :class="{
              'bg-[#6590FF] border-gray-200 shadow-xl border rounded-md w-[100%] p-3':
                !isDarkMode,
              'bg-gray-700 border-gray-700 shadow-xl border rounded-md w-[100%] p-3':
                isDarkMode,
            }"
            class="col-span-1 relative h-full"
          >
            <div
              class="absolute top-1 right-1 bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-4 h-4 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3C10.343 3 9 4.343 9 6v1h6V6c0-1.657-1.343-3-3-3zm3 3h2a2 2 0 012 2v2.342a4.017 4.017 0 00-.416.198C16.62 10.087 15.907 10 15 10h-6c-.907 0-1.62.087-2.584.54A4.017 4.017 0 006 9.342V7a2 2 0 012-2h2V6c0-1.105.895-2 2-2s2 .895 2 2v1zm-7 6v1a5.99 5.99 0 00.4 2.292c.383.987.917 1.896 1.6 2.684.68.784 1.472 1.433 2.31 2.024A4.987 4.987 0 0112 21c.732 0 1.432-.168 2.048-.491a4.987 4.987 0 002.31-2.024c.683-.788 1.217-1.697 1.6-2.684A5.99 5.99 0 0015 15v-1H9z"
                />
              </svg>
            </div>

            <Header :textColor="textColor" />
            <Balance :textColor="textColor" :total="total" />
          </layouta>

          <layoutb
            :class="{
              'bg-[#FFC23F] border-gray-200 shadow-xl border rounded-md h-full w-[100%] box-border p-3':
                !isDarkMode,
              'bg-gray-700 border-gray-700 shadow-xl border rounded-md h-full w-[100%] box-border p-3':
                isDarkMode,
            }"
            class="col-span-1 relative h-full"
          >
            <div
              class="absolute top-1 right-1 bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-4 h-4 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h2v11H3V10zm6-4h2v15H9V6zm6 8h2v7h-2v-7zm6-5h2v12h-2V9z"
                />
              </svg>
            </div>

            <IncomeExpenses
              :income="income"
              :expenses="expenses"
              :textColor="textColor"
              class="flex flex-row items-center justify-center"
            />
          </layoutb>
        </div>

        <div class="grid grid-rows-2 gap-4 h-[49vh]">
          <div
            :class="{
              'bg-white border-gray-200': !isDarkMode,
              'bg-gray-700 border-gray-700': isDarkMode,
            }"
            class="p-4 shadow-xl border rounded-md h-[49vh] box-border"
          >
            <AddTransaction
              @transactionSubmitted="handleTransactionSubmitted"
              :textColor="textColor"
            />
          </div>
        </div>

        <div
          :class="{
            'bg-white border-gray-200': !isDarkMode,
            'bg-gray-700 border-gray-700': isDarkMode,
          }"
          class="p-4 shadow-xl border rounded-md h-[43.5vh] box-border"
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
          class="p-4 shadow-xl border rounded-md h-[43.5vh] box-border"
        >
          <LineChartBalance
            :transactions="sortedTransactions"
            :textColor="textColor"
          />
        </div>
      </div>

      <layout2
        :class="{
          'bg-white': !isDarkMode,
          'bg-gray-900': isDarkMode,
        }"
        class="grid grid-cols-1 gap-4 pl-4 h-[95vh] w-full box-border overflow-y-auto"
      >
        <div
          :class="{
            'bg-white border-gray-200': !isDarkMode,
            'bg-gray-700 border-gray-700': isDarkMode,
          }"
          class="p-4 shadow-xl border rounded-md text-base font-normal h-full box-border"
        >
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
            :textColor="textColor"
          />
        </div>
      </layout2>
    </layout1>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
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

// Auto-refresh functionality
let refreshInterval;

const startAutoRefresh = () => {
  refreshInterval = setInterval(() => {
    // Fetch data or perform any desired action
  }, 10000); // Refresh every 10 seconds
};

onMounted(() => {
  startAutoRefresh();
});

onBeforeUnmount(() => {
  clearInterval(refreshInterval);
});
</script>

<style scoped>
.delete-all-btn {
  background-color: #f87171;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-all-btn:hover {
  background-color: #c62828;
}
</style>
