<template>
  <h3>Tambahkan Transaksi anda</h3>

  <!-- Buttons for selecting Pemasukan or Pengeluaran -->
  <div class="form-control">
    <label for="transaction-type">Jenis Transaksi</label>
    <div id="transaction-type" class="btn-group">
      <button
        type="button"
        :class="{ 'btn-selected': transactionType === 'income', btn: true }"
        @click="setIncome"
      >
        Pemasukan
      </button>
      <button
        type="button"
        :class="{ 'btn-selected': transactionType === 'expense', btn: true }"
        @click="setExpense"
      >
        Pengeluaran
      </button>
    </div>
  </div>

  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">Nama Transaksi</label>
      <input type="text" id="text" placeholder="Enter text..." v-model="text" />
    </div>
    <div class="form-control">
      <label for="amount">Jumlah Transaksi</label>
      <input
        type="text"
        id="amount"
        placeholder="Enter amount..."
        v-model="formattedAmount"
        :disabled="!transactionType"
        @input="handleAmountChange"
      />
    </div>
    <!-- New Date Input Field -->
    <div class="form-control">
      <label for="date">Tanggal Transaksi</label>
      <input
        type="date"
        id="date"
        v-model="date"
        :disabled="!transactionType"
      />
    </div>

    <button class="btn" :disabled="!transactionType">
      Tambahkan Transaksi
    </button>
  </form>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { ref, computed, onMounted } from "vue";

const text = ref("");
const amount = ref("");
const date = ref(""); // Reactive variable for date
const transactionType = ref(""); // State to track selected transaction type

// Get toast interface
const toast = useToast();

const emit = defineEmits(["transactionSubmitted"]);

// Automatically set the date to today on component mount
onMounted(() => {
  date.value = new Date().toISOString().slice(0, 10); // Set current date in YYYY-MM-DD format
});

// Method to set the amount as positive for income
const setIncome = () => {
  transactionType.value = "income"; // Set selected type to 'income'
  if (amount.value) {
    amount.value = Math.abs(parseFloat(amount.value)).toString();
  }
};

// Method to set the amount as negative for expense
const setExpense = () => {
  transactionType.value = "expense"; // Set selected type to 'expense'
  if (amount.value) {
    amount.value = (-Math.abs(parseFloat(amount.value))).toString(); // Set amount to negative
  }
};

// Computed property for formatted amount
const formattedAmount = computed({
  get() {
    // Format the amount with periods for thousands and commas for decimals
    const parts = amount.value.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add period separators for thousands
    return parts.join(","); // Join the parts back together, using a comma for the decimal
  },
  set(value) {
    const parsedValue = value.replace(/\./g, "").replace(/,/g, "."); // Remove period for thousands, keep comma for decimal
    amount.value = parsedValue; // Update raw amount value
  },
});

// Method to handle amount input change
const handleAmountChange = () => {
  // Check if the amount input is empty
  if (amount.value === "") {
    return; // If empty, do nothing
  }

  // Parse the amount and adjust its value based on transaction type
  const parsedAmount = parseFloat(amount.value);
  if (isNaN(parsedAmount)) {
    amount.value = ""; // Clear if not a valid number
  } else {
    amount.value =
      transactionType.value === "expense"
        ? (-Math.abs(parsedAmount)).toString() // Set as negative
        : Math.abs(parsedAmount).toString(); // Set as positive
  }
};

const onSubmit = () => {
  if (!text.value || !amount.value || !date.value) {
    toast.error("All fields must be filled.");
    return;
  }

  const transactionData = {
    text: text.value,
    amount: parseFloat(amount.value),
    date: date.value, // Use the selected date
  };

  emit("transactionSubmitted", transactionData);

  // Clear form fields
  text.value = "";
  amount.value = "";
  date.value = new Date().toISOString().slice(0, 10); // Reset the date to today
  transactionType.value = ""; // Reset the transaction type
};
</script>

<style scoped>
.btn-group {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: #0056b3;
}

/* Add a style for the selected button */
.btn-selected {
  background-color: #28a745; /* Green for selected */
  color: white;
}

/* Disable style for the input */
input:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}
</style>
