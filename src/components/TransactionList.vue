<template>
  <div class="space-y-4">
    <!-- Filter and Search Controls -->
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
      <!-- Search Input -->
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input type="text" v-model="searchQuery" placeholder="Cari transaksi..."
          class="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
      </div>

      <!-- Sort Select -->
      <div class="relative sm:w-48">
        <select v-model="sortOption"
          class="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none">
          <option value="time-asc">🕐 Terbaru ke Terlama</option>
          <option value="time-desc">🕐 Terlama ke Terbaru</option>
          <option value="amount-desc">💰 Tertinggi ke Terendah</option>
          <option value="amount-asc">💰 Terendah ke Tertinggi</option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Transaction List -->
    <div v-if="paginatedTransactions.length === 0" class="text-center py-12">
      <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
          </path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {{ searchQuery ? 'Transaksi Tidak Ditemukan' : 'Belum Ada Transaksi' }}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ searchQuery ? `Tidak ada transaksi yang mengandung "${searchQuery}"` : 'Tambahkan transaksi pertama Anda' }}
      </p>
    </div>

    <div v-else class="space-y-2">
      <div v-for="transaction in paginatedTransactions" :key="transaction.id"
        class="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md dark:hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
        <!-- Transaction Item -->
        <div class="flex items-center justify-between">
          <!-- Left Side: Icon, Text, Date -->
          <div class="flex items-center space-x-3 flex-1 min-w-0">
            <!-- Transaction Type Icon -->
            <div class="flex-shrink-0">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center',
                transaction.amount > 0
                  ? 'bg-green-100 dark:bg-green-900'
                  : 'bg-red-100 dark:bg-red-900'
              ]">
                <svg class="w-5 h-5"
                  :class="transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path v-if="transaction.amount > 0" stroke-linecap="round" stroke-linejoin="round"
                    d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                </svg>
              </div>
            </div>

            <!-- Transaction Details -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {{ transaction.text }}
                </h4>
                <!-- Amount on mobile -->
                <div class="sm:hidden">
                  <span :class="[
                    'text-sm font-bold',
                    transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  ]">
                    {{ formatCurrency(transaction.amount) }}
                  </span>
                </div>
              </div>

              <!-- Date and Time -->
              <div class="flex items-center space-x-2 mt-1">
                <svg class="w-3 h-3 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z">
                  </path>
                </svg>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {{
                    transaction.dateKey
                      ? formatDateKey(transaction.dateKey)
                      : (transaction.date && isValidDate(transaction.date)
                        ? formatDate(transaction.date)
                        : "Tanggal tidak tersedia")
                  }}
                </span>
              </div>
            </div>
          </div>

          <!-- Right Side: Amount and Delete Button -->
          <div class="flex items-center space-x-3">
            <!-- Amount on desktop -->
            <div class="hidden sm:block">
              <span :class="[
                'text-lg font-bold',
                transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              ]">
                {{ formatCurrency(transaction.amount) }}
              </span>
            </div>

            <!-- Delete Button -->
            <button @click="deleteTransaction(transaction.id)"
              class="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              title="Hapus transaksi">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                </path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Amount Display Alternative -->
        <div class="sm:hidden mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <span class="text-xs text-gray-500 dark:text-gray-400">Jumlah:</span>
            <span :class="[
              'text-base font-bold',
              transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            ]">
              {{ formatCurrency(transaction.amount) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1"
      class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center space-x-2">
        <button @click="currentPage--" :disabled="currentPage === 1"
          class="flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path>
          </svg>
          Sebelumnya
        </button>

        <button @click="currentPage++" :disabled="currentPage === totalPages"
          class="flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
          Selanjutnya
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <!-- Page Info -->
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-700 dark:text-gray-300">
          Halaman <span class="font-medium">{{ currentPage }}</span> dari <span class="font-medium">{{ totalPages
            }}</span>
        </span>
      </div>
    </div>

    <!-- Results Summary -->
    <div v-if="paginatedTransactions.length > 0" class="text-center pt-2">
      <span class="text-xs text-gray-500 dark:text-gray-400">
        Menampilkan {{ ((currentPage - 1) * itemsPerPage) + 1 }}-{{ Math.min(currentPage * itemsPerPage,
          sortedTransactions.length) }}
        dari {{ sortedTransactions.length }} transaksi
        <span v-if="searchQuery">(difilter dari {{ transactions.length }} total)</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

// Props
const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
});

// State for search query, sort option, and pagination
const searchQuery = ref("");
const sortOption = ref("amount-asc");
const currentPage = ref(1);
const itemsPerPage = 10; // Change this to set how many items you want per page

// Function to validate if the date is valid
const isValidDate = (date) => {
  return !isNaN(new Date(date).getTime());
};

// Function to format the date and time to the desired locale
const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Set to true for 12-hour format
  };
  return new Date(date).toLocaleString("id-ID", options);
};

// Function to format dateKey (YYYY-MM-DD) to display format
const formatDateKey = (dateKey) => {
  const date = new Date(dateKey);
  return date.toLocaleDateString("id-ID", {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Function to format currency in Rupiah
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Emit event for deleting a transaction
const emit = defineEmits(["transactionDeleted"]);

// Function to delete a transaction
const deleteTransaction = (id) => {
  const confirmation = window.confirm(
    "Apakah Anda yakin ingin menghapus transaksi ini?"
  );
  if (confirmation) {
    emit("transactionDeleted", id);
  }
};

// Computed property to filter and sort transactions
const sortedTransactions = computed(() => {
  let filteredTransactions = props.transactions.filter((transaction) =>
    transaction.text.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  // Sorting logic
  if (sortOption.value === "amount-asc") {
    filteredTransactions.sort((a, b) => a.amount - b.amount); // Ascending by amount
  } else if (sortOption.value === "amount-desc") {
    filteredTransactions.sort((a, b) => b.amount - a.amount); // Descending by amount
  } else if (sortOption.value === "time-asc") {
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest to oldest
  } else if (sortOption.value === "time-desc") {
    filteredTransactions.sort((a, b) => new Date(a.date) - new Date(b.date)); // Oldest to newest
  }

  return filteredTransactions;
});

// Computed property to handle pagination
const totalPages = computed(() => {
  return Math.ceil(sortedTransactions.value.length / itemsPerPage);
});

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return sortedTransactions.value.slice(start, start + itemsPerPage);
});
</script>

<style scoped>
.list {
  list-style: none;
  padding: 0;
}

.minus {
  color: red;
}

.plus {
  color: green;
}

.delete-btn {
  margin-left: 10px;
  cursor: pointer;
  color: white;
  background-color: red;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
}

.date {
  font-size: 0.9em;
  color: gray;
}

/* Styles for filter and sort controls */
.filter-sort-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.filter-input {
  padding: 5px;
  width: 60%;
}

.sort-select {
  padding: 5px;
  width: 35%;
}

/* Styles for pagination controls */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
}

.pagination span {
  align-self: center;
}
</style>
