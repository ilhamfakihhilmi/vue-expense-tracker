<template>
  <div class="monthly-history">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold" :class="textColor">History Bulanan</h3>
      <div class="flex gap-2">
        <button
          @click="showYearly = !showYearly"
          class="px-3 py-1 text-sm rounded-md transition-colors"
          :class="showYearly 
            ? 'bg-blue-500 text-white' 
            : (isDarkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')"
        >
          {{ showYearly ? 'Lihat Bulanan' : 'Lihat Tahunan' }}
        </button>
      </div>
    </div>

    <!-- Yearly Summary -->
    <div v-if="showYearly" class="yearly-summary mb-6">
      <h4 class="text-md font-medium mb-3" :class="textColor">Ringkasan Tahunan</h4>
      <div class="grid gap-3">
        <div
          v-for="yearData in transactionsByYear"
          :key="yearData.year"
          class="year-card p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer"
          :class="isDarkMode 
            ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
            : 'bg-white border-gray-200 hover:bg-gray-50'"
          @click="toggleYearExpansion(yearData.year)"
        >
          <div class="flex justify-between items-center">
            <div>
              <h5 class="font-semibold text-lg" :class="textColor">{{ yearData.year }}</h5>
              <p class="text-sm" :class="textColor + ' opacity-70'">
                {{ yearData.transactionCount }} transaksi • {{ yearData.monthCount }} bulan aktif
              </p>
            </div>
            <div class="text-right">
              <div class="text-sm" :class="textColor + ' opacity-70'">Net Amount</div>
              <div class="font-semibold" :class="yearData.netAmount >= 0 ? 'text-green-500' : 'text-red-500'">
                {{ formatCurrency(yearData.netAmount) }}
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mt-3">
            <div>
              <span class="text-sm" :class="textColor + ' opacity-70'">Income:</span>
              <div class="font-medium text-green-500">{{ formatCurrency(yearData.totalIncome) }}</div>
            </div>
            <div>
              <span class="text-sm" :class="textColor + ' opacity-70'">Expenses:</span>
              <div class="font-medium text-red-500">{{ formatCurrency(yearData.totalExpenses) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Monthly Summary -->
    <div v-else class="monthly-summary">
      <h4 class="text-md font-medium mb-3" :class="textColor">Ringkasan Bulanan</h4>
      <div class="grid gap-3">
        <div
          v-for="monthData in transactionsByMonth"
          :key="monthData.month"
          class="month-card p-4 rounded-lg border transition-all hover:shadow-md"
          :class="isDarkMode 
            ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
            : 'bg-white border-gray-200 hover:bg-gray-50'"
        >
          <div class="flex justify-between items-center mb-3">
            <div>
              <h5 class="font-semibold text-lg" :class="textColor">{{ monthData.monthName }}</h5>
              <p class="text-sm" :class="textColor + ' opacity-70'">
                {{ monthData.transactionCount }} transaksi
              </p>
            </div>
            <div class="text-right">
              <div class="text-sm" :class="textColor + ' opacity-70'">Net Amount</div>
              <div class="font-semibold" :class="monthData.netAmount >= 0 ? 'text-green-500' : 'text-red-500'">
                {{ formatCurrency(monthData.netAmount) }}
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-3">
            <div>
              <span class="text-sm" :class="textColor + ' opacity-70'">Income:</span>
              <div class="font-medium text-green-500">{{ formatCurrency(monthData.totalIncome) }}</div>
            </div>
            <div>
              <span class="text-sm" :class="textColor + ' opacity-70'">Expenses:</span>
              <div class="font-medium text-red-500">{{ formatCurrency(monthData.totalExpenses) }}</div>
            </div>
          </div>

          <div class="flex gap-2 mt-3">
            <button
              @click="viewMonthTransactions(monthData.month)"
              class="flex-1 px-3 py-1 text-sm rounded-md transition-colors"
              :class="isDarkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-500 text-white hover:bg-blue-600'"
            >
              <i class="fas fa-eye mr-1"></i>
              Lihat Detail
            </button>
            <button
              @click="exportMonth(monthData.month)"
              class="px-3 py-1 text-sm rounded-md transition-colors"
              :class="isDarkMode 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-green-500 text-white hover:bg-green-600'"
            >
              <i class="fas fa-download mr-1"></i>
              Export
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Monthly Transactions Detail Modal -->
    <div v-if="showMonthDetail" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full m-4 max-h-[80vh] overflow-hidden">
        <div class="p-4 border-b dark:border-gray-700">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold" :class="textColor">
              Detail Transaksi - {{ getMonthName(selectedMonth) }}
            </h3>
            <button
              @click="showMonthDetail = false"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <div class="p-4 overflow-y-auto max-h-[60vh]">
          <div v-if="monthTransactions.length === 0" class="text-center py-8" :class="textColor + ' opacity-70'">
            Tidak ada transaksi untuk bulan ini
          </div>
          
          <div v-else class="space-y-2">
            <div
              v-for="transaction in monthTransactions"
              :key="transaction.id"
              class="flex justify-between items-center p-3 rounded-lg border"
              :class="isDarkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-gray-50 border-gray-200'"
            >
              <div>
                <div class="font-medium" :class="textColor">{{ transaction.text }}</div>
                <div class="text-sm" :class="textColor + ' opacity-70'">
                  {{ formatDate(transaction.dateKey) }}
                </div>
              </div>
              <div class="text-right">
                <div class="font-semibold" :class="transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'">
                  {{ transaction.amount >= 0 ? '+' : '' }}{{ formatCurrency(transaction.amount) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  transactionsByMonth: {
    type: Array,
    required: true
  },
  transactionsByYear: {
    type: Array,
    required: true
  },
  getTransactionsForMonth: {
    type: Function,
    required: true
  },
  exportMonthlyData: {
    type: Function,
    required: true
  },
  getMonthName: {
    type: Function,
    required: true
  },
  textColor: {
    type: String,
    default: 'text-black'
  },
  isDarkMode: {
    type: Boolean,
    default: false
  }
})

const showYearly = ref(false)
const showMonthDetail = ref(false)
const selectedMonth = ref('')
const monthTransactions = ref([])
const expandedYears = ref(new Set())

const toggleYearExpansion = (year) => {
  if (expandedYears.value.has(year)) {
    expandedYears.value.delete(year)
  } else {
    expandedYears.value.add(year)
  }
}

const viewMonthTransactions = (month) => {
  selectedMonth.value = month
  monthTransactions.value = props.getTransactionsForMonth(month)
  showMonthDetail.value = true
}

const exportMonth = (month) => {
  props.exportMonthlyData(month)
}

// Format currency for display
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<style scoped>
.month-card, .year-card {
  transition: all 0.2s ease;
}

.month-card:hover, .year-card:hover {
  transform: translateY(-1px);
}
</style>
