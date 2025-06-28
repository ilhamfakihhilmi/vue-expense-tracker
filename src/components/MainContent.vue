<template>
  <main :class="['min-h-screen transition-all duration-300', themeClass]">
    <!-- Modern Header with Glassmorphism Effect -->
    <div class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-700/50">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <!-- Brand & Date Selector -->
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <i class="fas fa-wallet text-white"></i>
              </div>
              <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Expense Tracker
              </h1>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="relative group">
                <input
                  type="date"
                  v-model="selectedDate"
                  class="px-4 py-2 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-blue-400"
                  :class="isDarkMode 
                    ? 'bg-gray-800/50 border-gray-600 text-white backdrop-blur-sm' 
                    : 'bg-white/50 border-gray-300 text-gray-900 backdrop-blur-sm'"
                />
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <button
                @click="goToToday"
                class="px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                :class="isDarkMode 
                  ? 'bg-gray-700/50 text-white hover:bg-gray-600/50 backdrop-blur-sm' 
                  : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50 backdrop-blur-sm'"
              >
                <i class="fas fa-calendar-day mr-2"></i>
                Hari Ini
              </button>
            </div>
          </div>

          <!-- Theme Toggle with Animation -->
          <button 
            @click="toggleTheme" 
            class="relative p-3 rounded-xl transition-all duration-300 hover:scale-110 transform shadow-lg group overflow-hidden"
            :class="isDarkMode ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-indigo-500 to-purple-600'"
          >
            <div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10 transition-transform duration-300" :class="isDarkMode ? 'rotate-180' : 'rotate-0'">
              <span v-if="isDarkMode" class="text-lg block"> ☀️ </span>
              <span v-else class="text-lg block"> 🌙 </span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- Loading Overlay -->
      <div v-if="isLoading" class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl flex items-center gap-3">
          <div class="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span class="font-medium" :class="textColor">Processing...</span>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        <!-- Left Column: Stats Cards -->
        <div class="xl:col-span-3 space-y-6">
          <!-- Balance and Income/Expense Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Balance Card -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div class="relative backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <i class="fas fa-wallet text-white text-lg"></i>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium" :class="textColor + ' opacity-70'">Total Balance</p>
                    <p class="text-2xl font-bold" :class="total >= 0 ? 'text-green-500' : 'text-red-500'">
                      {{ formatCurrency(total) }}
                    </p>
                  </div>
                </div>
                <Header :textColor="textColor" />
              </div>
            </div>

            <!-- Income Card -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div class="relative backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center justify-between">
                  <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <i class="fas fa-arrow-up text-white text-lg"></i>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium" :class="textColor + ' opacity-70'">Income</p>
                    <p class="text-xl font-bold text-green-500">
                      {{ formatCurrency(income) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Expense Card -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div class="relative backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center justify-between">
                  <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <i class="fas fa-arrow-down text-white text-lg"></i>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium" :class="textColor + ' opacity-70'">Expenses</p>
                    <p class="text-xl font-bold text-red-500">
                      {{ formatCurrency(expenses) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Add Transaction Card -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div class="relative backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-xl">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                  <i class="fas fa-plus text-white"></i>
                </div>
                <h3 class="text-lg font-semibold" :class="textColor">Add New Transaction</h3>
              </div>
              <AddTransaction @transactionSubmitted="handleTransactionSubmitted" :textColor="textColor" />
            </div>
          </div>
        </div>

        <!-- Right Column: Transaction List & History -->
        <div class="xl:col-span-1">
          <div class="sticky top-24">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div class="relative backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-xl max-h-[80vh] overflow-hidden">
                
                <!-- Tab Navigation -->
                <div class="flex border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50">
                  <button 
                    @click="activeTab = 'transactions'"
                    class="flex-1 px-4 py-3 font-medium transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    :class="activeTab === 'transactions' 
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50 dark:bg-blue-900/20' 
                      : (textColor + ' opacity-70')"
                  >
                    <i class="fas fa-list mr-2"></i>
                    <span class="hidden sm:inline">Transaksi</span>
                  </button>
                  <button 
                    @click="activeTab = 'monthly'"
                    class="flex-1 px-4 py-3 font-medium transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    :class="activeTab === 'monthly' 
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50 dark:bg-blue-900/20' 
                      : (textColor + ' opacity-70')"
                  >
                    <i class="fas fa-calendar-alt mr-2"></i>
                    <span class="hidden sm:inline">History</span>
                  </button>
                  <button 
                    @click="activeTab = 'charts'"
                    class="flex-1 px-4 py-3 font-medium transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    :class="activeTab === 'charts' 
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50 dark:bg-blue-900/20' 
                      : (textColor + ' opacity-70')"
                  >
                    <i class="fas fa-chart-line mr-2"></i>
                    <span class="hidden sm:inline">Charts</span>
                  </button>
                </div>

                <!-- Tab Content -->
                <div class="p-4 h-[70vh] overflow-y-auto custom-scrollbar">
                  <!-- Transactions Tab -->
                  <div v-if="activeTab === 'transactions'" class="space-y-4">
                    <div class="flex justify-between items-center">
                      <button 
                        v-if="!showAll" 
                        @click="viewAllTransactions" 
                        class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 transform"
                      >
                        <i class="fas fa-eye mr-2"></i>
                        View All
                      </button>
                      <button 
                        v-if="hasTransactions" 
                        @click="deleteAllTransactions"
                        class="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 transform"
                      >
                        <i class="fas fa-trash mr-2"></i>
                        Delete All
                      </button>
                    </div>

                    <div v-if="showAll" class="space-y-3">
                      <h4 class="font-semibold" :class="textColor">Daily Summary</h4>
                      <div 
                        v-for="day in transactionsByDay" 
                        :key="day.date" 
                        class="p-3 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] transform hover:shadow-lg"
                        :class="isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-100/50 hover:bg-gray-200/50'"
                        @click="viewTransactionsForDate(day.date)"
                      >
                        <div class="flex justify-between items-center">
                          <span class="font-medium" :class="textColor">{{ formatDate(day.date) }}</span>
                          <span class="font-bold" :class="day.total >= 0 ? 'text-green-500' : 'text-red-500'">
                            {{ formatCurrency(day.total) }}
                          </span>
                        </div>
                        <div class="flex justify-between text-sm mt-2">
                          <span class="text-green-500">+{{ formatCurrency(day.income) }}</span>
                          <span class="text-red-500">{{ formatCurrency(day.expenses) }}</span>
                        </div>
                      </div>
                    </div>

                    <TransactionList 
                      :transactions="filteredTransactions" 
                      @transactionDeleted="handleTransactionDeleted"
                      :textColor="textColor" 
                    />
                  </div>

                  <!-- Monthly History Tab -->
                  <div v-if="activeTab === 'monthly'">
                    <MonthlyHistory 
                      :transactionsByMonth="transactionsByMonth"
                      :transactionsByYear="transactionsByYear"
                      :getTransactionsForMonth="getTransactionsForMonth"
                      :exportMonthlyData="exportMonthlyData"
                      :getMonthName="getMonthName"
                      :textColor="textColor"
                      :isDarkMode="isDarkMode"
                    />
                  </div>

                  <!-- Charts Tab -->
                  <div v-if="activeTab === 'charts'" class="space-y-6">
                    <div class="p-4 rounded-xl backdrop-blur-sm" :class="isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'">
                      <LineChart :transactions="sortedTransactions" :textColor="textColor" />
                    </div>
                    
                    <div class="p-4 rounded-xl backdrop-blur-sm" :class="isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'">
                      <LineChartBalance :transactions="sortedTransactions" :textColor="textColor" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useToast } from "vue-toastification";

// Import components
import Header from "./Header.vue";
import AddTransaction from "./AddTransaction.vue";
import LineChart from "./LineChart.vue";
import LineChartBalance from "./LineChartBalance.vue";
import MonthlyHistory from "./MonthlyHistory.vue";
import TransactionList from "./TransactionList.vue";

// Import composable for transaction logic
import { useTransactions } from "../composables/useTransactions";

const toast = useToast();
const {
  transactions,
  transactionsByDay,
  transactionsByMonth,
  transactionsByYear,
  total,
  income,
  expenses,
  addTransaction,
  deleteTransaction,
  deleteAllTransactions,
  viewTransactionsForDate,
  viewAllTransactions,
  showAll,
  selectedDate,
  filteredTransactions,
  getTransactionsForMonth,
  exportMonthlyData,
  getMonthName,
  formatDateForDisplay,
  formatCurrency
} = useTransactions(toast);

const hasTransactions = computed(() => transactions.value.length > 0);

// Handlers for transactions
const handleTransactionSubmitted = async (transactionData) => {
  isLoading.value = true;
  try {
    addTransaction(transactionData);
    // Add small delay for smooth UX
    await new Promise(resolve => setTimeout(resolve, 300));
  } finally {
    isLoading.value = false;
  }
};

const handleTransactionDeleted = async (id) => {
  isLoading.value = true;
  try {
    deleteTransaction(id);
    await new Promise(resolve => setTimeout(resolve, 200));
  } finally {
    isLoading.value = false;
  }
};

// Computed property for sorted transactions
const sortedTransactions = computed(() => {
  return [...transactions.value].sort((a, b) => new Date(a.date) - new Date(b.date));
});

// Theme management
const isDarkMode = ref(false);
const isDayMode = computed(() => !isDarkMode.value);
const activeTab = ref('transactions'); // 'transactions', 'monthly', 'charts'
const isLoading = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

// Function to go to today's date
const goToToday = () => {
  const today = new Date().toISOString().split('T')[0];
  selectedDate.value = today;
  showAll.value = false;
};

// Computed class for main background color based on theme
const themeClass = computed(() =>
  isDarkMode.value ? "bg-gray-800" : "bg-gray-100"
);

// Computed property for text color based on theme
const textColor = computed(() =>
  isDarkMode.value ? "text-white" : "text-black"
);

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

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
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

/* Glassmorphism Effects */
.glass-effect {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Smooth Animations */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Card Hover Effects */
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Button Ripple Effect */
.btn-ripple {
  position: relative;
  overflow: hidden;
}

.btn-ripple::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: width 0.6s, height 0.6s, top 0.6s, left 0.6s;
  transform: translate(-50%, -50%);
}

.btn-ripple:active::before {
  width: 300px;
  height: 300px;
}

/* Loading Animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Modern Focus States */
.modern-focus:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.5);
}

/* Responsive Grid Improvements */
@media (max-width: 768px) {
  .mobile-full {
    grid-column: 1 / -1;
  }
}

/* Dark mode specific adjustments */
.dark .glass-effect {
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.3);
}

.light .glass-effect {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>