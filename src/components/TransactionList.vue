<template>
  <div>
    <h3>History</h3>

    <!-- Filter and Sort Controls -->
    <div class="filter-sort-controls">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Cari transaksi..."
        class="filter-input"
      />
      <select v-model="sortOption" class="sort-select">
        <option value="amount-asc">Sortir: Terendah ke Tertinggi</option>
        <option value="amount-desc">Sortir: Tertinggi ke Terendah</option>
        <option value="time-asc">Sortir: Waktu (Terbaru ke Terlama)</option>
        <option value="time-desc">Sortir: Waktu (Terlama ke Terbaru)</option>
      </select>
    </div>

    <ul id="list" class="list">
      <li
        v-for="transaction in sortedTransactions"
        :key="transaction.id"
        :class="transaction.amount < 0 ? 'minus' : 'plus'"
      >
        {{ transaction.text }}
        <span>Rp.{{ transaction.amount.toLocaleString("id-ID") }}</span>
        <span class="date">
          {{
            transaction.date && isValidDate(transaction.date)
              ? formatDate(transaction.date)
              : "Tanggal tidak tersedia"
          }}
        </span>
        <button class="delete-btn" @click="deleteTransaction(transaction.id)">
          x
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Props
const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

// State for search query and sort option
const searchQuery = ref('');
const sortOption = ref('amount-asc');

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

// Computed property to sort transactions
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
</style>
