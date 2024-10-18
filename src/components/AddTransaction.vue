<template>
  <div>
    <h3 :class="[textColor, 'text-sm font-semibold']">
      Tambahkan Transaksi Anda
    </h3>

    <div :class="[textColor, 'text-base lg:flex gap-6 mt-4']">
      <label for="transaction-type">Pilih jenis transaksi:</label>
      <div id="transaction-type" class="flex gap-2 justify-start">
        <button
          type="button"
          :class="{
            'bg-green-500 text-white': transactionType === 'income',
            'bg-gray-50 text-gray-700 border border-gray-400': transactionType !== 'income',
          }"
          class="px-5 py-1 rounded-md transition font-normal text-base"
          @click="setIncome"
        >
          Pemasukan
        </button>
        <button
          type="button"
          :class="{
            'bg-red-500 text-white': transactionType === 'expense',
            'bg-gray-50 text-gray-700 border border-gray-400': transactionType !== 'expense',
          }"
          class="px-5 py-1 rounded-md transition font-normal text-base"
          @click="setExpense"
        >
          Pengeluaran
        </button>
      </div>
    </div>

    <form id="form" @submit.prevent="onSubmit">
      <div :class="[textColor, 'text-base form-control']">
        <label for="text">Nama Transaksi</label>
        <input
          type="text"
          id="text"
          placeholder="Enter text..."
          v-model="text"
          class="border border-gray-300 px-3 py-2 rounded-lg"
          required
        />
      </div>
      <div :class="[textColor, 'text-base form-control']">
        <label for="amount">Jumlah Transaksi</label>
        <input
          type="text"
          id="amount"
          placeholder="Enter amount..."
          v-model="formattedAmount"
          :disabled="!transactionType"
          @input="handleAmountChange"
          class="border border-gray-300 px-4 py-2 rounded-md"
          required
        />
      </div>
      <div class="flex justify-end">
        <button
          class="bg-blue-500 text-xs text-white px-3 py-2 rounded-md hover:bg-blue-600 transition mt-4"
          :disabled="!transactionType"
        >
          Tambah Transaksi
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { ref, computed, onMounted } from "vue";

// State variables
const text = ref("");
const amount = ref(""); // Ensure this starts as an empty string
const date = ref("");
const transactionType = ref("");

// Toast for notifications
const toast = useToast();
const emit = defineEmits(["transactionSubmitted"]);

// Set the current date on mounted
onMounted(() => {
  date.value = new Date().toISOString().slice(0, 10);
});

// Props
const props = defineProps({
  textColor: {
    type: String,
    required: true,
  },
});

// Methods to set transaction type
const setIncome = () => {
  transactionType.value = "income";
  amount.value = ""; // Clear the amount when selecting income
};

const setExpense = () => {
  transactionType.value = "expense";
  amount.value = ""; // Clear the amount when selecting expense
};

// Computed property for formatted amount
const formattedAmount = computed({
  get() {
    if (!amount.value) {
      return ""; // Return empty string if amount is invalid
    }

    const parts = amount.value.split(".");
    const displayAmount = Math.abs(parseFloat(amount.value));
    parts[0] = displayAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  },
  set(value) {
    const parsedValue = value.replace(/\./g, "").replace(/,/g, ".");
    amount.value = parsedValue;
  },
});

// Handle changes to the amount input
const handleAmountChange = () => {
  if (amount.value === "") {
    return;
  }

  const parsedAmount = parseFloat(amount.value);
  if (isNaN(parsedAmount)) {
    amount.value = ""; // Clear invalid input
  } else {
    amount.value =
      transactionType.value === "expense"
        ? (-Math.abs(parsedAmount)).toString() // Set negative for expenses
        : Math.abs(parsedAmount).toString(); // Keep positive for income
  }
};

// Submit the form
const onSubmit = () => {
  const parsedAmount = parseFloat(amount.value);
  if (!text.value || !amount.value || !date.value) {
    toast.error("All fields must be filled.");
    return;
  }

  // Check if the amount is zero
  if (parsedAmount === 0) {
    toast.error("Jumlah transaksi tidak boleh nol.");
    return;
  }

  const transactionData = {
    text: text.value,
    amount: parsedAmount,
    date: date.value,
  };

  emit("transactionSubmitted", transactionData);

  // Clear the form after submission
  text.value = "";
  amount.value = ""; // Clear the amount
  date.value = new Date().toISOString().slice(0, 10);
  transactionType.value = ""; // Reset transaction type
};
</script>

<style scoped>
input:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}
</style>
