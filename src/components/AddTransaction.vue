<template>
  <h3 :class="[textColor, 'text-sm font-semibold']">
    Tambahkan Transaksi Anda
  </h3>

  <!-- Buttons for selecting Pemasukan or Pengeluaran -->
  <div :class="[textColor, 'text-base flex gap-6 mt-4']">
    <label for="transaction-type">Pilih jenis transaksi :</label>
    <div id="transaction-type" class="flex gap-2 justify-start">
      <button
        type="button"
        :class="{
          'bg-green-500 text-white ': transactionType === 'income',
          'bg-gray-100 text-gray-700 border border-gray-400 ':
            transactionType !== 'income',
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
          'bg-gray-100 text-gray-700 border border-gray-400':
            transactionType !== 'expense',
        }"
        class="px-5 py-1 rounded-md transition font-normal text-base"
        @click="setExpense"
      >
        Pengeluaran 
      </button>
    </div>
  </div>

  <form id="form" @submit.prevent="onSubmit">
    <div :class="[textColor, 'text-base form-control ']">
      <label for="text">Nama Transaksi</label>
      <input
        type="text"
        id="text"
        placeholder="Enter text..."
        v-model="text"
        class="border border-gray-300 px-3 py-2 rounded-lg"
      />
    </div>
    <div :class="[textColor, 'text-base form-control ']">
      <label for="amount">Jumlah Transaksi</label>
      <input
        type="text"
        id="amount"
        placeholder="Enter amount..."
        v-model="formattedAmount"
        :disabled="!transactionType"
        @input="handleAmountChange"
        class="border border-gray-300 px-4 py-2 rounded-md"
      />
    </div>
    <!-- New Date Input Field -->
    <!-- <div :class="[textColor, 'text-base form-control ']">
      <label for="date" class="mr-4">Tanggal Transaksi </label>
      <input
        type="date"
        id="date"
        v-model="date"
        :disabled="!transactionType"
        class="border border-gray-300 rounded-md"
      />
    </div> -->
    <div class="flex justify-end">
      <button
        class="bg-blue-500 text-xs text-white px-3 py-2 rounded-md hover:bg-blue-600 transition mt-4"
        :disabled="!transactionType"
      >
        Tambah Transaksi
      </button>
    </div>
  </form>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { ref, computed, onMounted } from "vue";

const text = ref("");
const amount = ref("");
const date = ref("");
const transactionType = ref("");

const toast = useToast();
const emit = defineEmits(["transactionSubmitted"]);

onMounted(() => {
  date.value = new Date().toISOString().slice(0, 10);
});

const props = defineProps({
  textColor: {
    type: String,
    required: true,
  },
});

const setIncome = () => {
  transactionType.value = "income";
  if (amount.value) {
    amount.value = Math.abs(parseFloat(amount.value)).toString();
  }
};

const setExpense = () => {
  transactionType.value = "expense";
  if (amount.value) {
    amount.value = (-Math.abs(parseFloat(amount.value))).toString();
  }
};

const formattedAmount = computed({
  get() {
    const parts = amount.value.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  },
  set(value) {
    const parsedValue = value.replace(/\./g, "").replace(/,/g, ".");
    amount.value = parsedValue;
  },
});

const handleAmountChange = () => {
  if (amount.value === "") {
    return;
  }

  const parsedAmount = parseFloat(amount.value);
  if (isNaN(parsedAmount)) {
    amount.value = "";
  } else {
    amount.value =
      transactionType.value === "expense"
        ? (-Math.abs(parsedAmount)).toString()
        : Math.abs(parsedAmount).toString();
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
    date: date.value,
  };

  emit("transactionSubmitted", transactionData);

  text.value = "";
  amount.value = "";
  date.value = new Date().toISOString().slice(0, 10);
  transactionType.value = "";
};
</script>

<style scoped>
/* Additional Tailwind classes are applied inline */
input:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}
</style>
