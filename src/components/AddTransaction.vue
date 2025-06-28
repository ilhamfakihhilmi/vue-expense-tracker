<template>
  <div class="space-y-6">
    <!-- Header with Icon -->
    <div class="flex items-center space-x-3 mb-6">
      <div
        class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </div>
      <div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">
          Tambah Transaksi Baru
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Catat pemasukan atau pengeluaran Anda
        </p>
      </div>
    </div>

    <!-- Transaction Type Selector -->
    <div class="space-y-3">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        Jenis Transaksi <span class="text-red-500">*</span>
      </label>
      <div class="grid grid-cols-2 gap-3">
        <button type="button" :class="{
          'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25 border-green-500': transactionType === 'income',
          'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20': transactionType !== 'income',
        }"
          class="relative flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 group"
          @click="setIncome">
          <svg class="w-5 h-5" :class="transactionType === 'income' ? 'text-white' : 'text-green-500'" fill="none"
            stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
          </svg>
          <span>Pemasukan</span>
          <div v-if="transactionType === 'income'"
            class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </button>

        <button type="button" :class="{
          'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 border-red-500': transactionType === 'expense',
          'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-red-400 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20': transactionType !== 'expense',
        }"
          class="relative flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 group"
          @click="setExpense">
          <svg class="w-5 h-5" :class="transactionType === 'expense' ? 'text-white' : 'text-red-500'" fill="none"
            stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
          </svg>
          <span>Pengeluaran</span>
          <div v-if="transactionType === 'expense'"
            class="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
        </button>
      </div>
    </div>

    <!-- Form Fields -->
    <form @submit.prevent="onSubmit" class="space-y-6">
      <!-- Transaction Details Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Transaction Name -->
        <div class="space-y-2">
          <label for="text" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Nama Transaksi <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input type="text" id="text" placeholder="Contoh: Gaji bulanan, Makan siang, dll..." v-model="text"
              class="w-full py-3 pl-12 pr-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 transaction-name-input"
              required />
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
              <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                </path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Transaction Date -->
        <div class="space-y-2">
          <label for="date" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Tanggal Transaksi <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input type="date" id="date" v-model="date"
              class="w-full py-3 pl-12 pr-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 transaction-date-input"
              required />
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
              <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Amount Field -->
      <div class="space-y-2">
        <label for="amount" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Jumlah Transaksi <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <input type="text" id="amount" placeholder="0" v-model="formattedAmount" :disabled="!transactionType"
            @input="handleAmountChange" @focus="handleAmountFocus"
            class="w-full py-4 text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed"
            :class="{
              'border-green-400 dark:border-green-500 bg-green-50 dark:bg-green-900/20': transactionType === 'income' && formattedAmount,
              'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/20': transactionType === 'expense' && formattedAmount,
            }" required />
          <!-- Currency Prefix -->
          <div class="currency-prefix-amount">
            <span class="text-lg font-semibold text-gray-600 dark:text-gray-400">Rp</span>
          </div>
          <!-- Transaction Type Indicator -->
          <div v-if="transactionType && formattedAmount" class="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div class="flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium" :class="{
              'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400': transactionType === 'income',
              'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400': transactionType === 'expense',
            }">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path v-if="transactionType === 'income'" d="M10 2L15 7H12V15H8V7H5L10 2Z" />
                <path v-else d="M10 18L5 13H8V5H12V13H15L10 18Z" />
              </svg>
              <span>{{ transactionType === 'income' ? 'Masuk' : 'Keluar' }}</span>
            </div>
          </div>
        </div>
        <div v-if="!transactionType" class="text-sm text-amber-600 dark:text-amber-400 flex items-center space-x-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"></path>
          </svg>
          <span>Pilih jenis transaksi terlebih dahulu</span>
        </div>
        <!-- Helper text -->
        <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
          <span>Format: 1.000.000 (gunakan titik sebagai pemisah ribuan)</span>
          <span v-if="formattedAmount && transactionType" class="font-medium" :class="{
            'text-green-600 dark:text-green-400': transactionType === 'income',
            'text-red-600 dark:text-red-400': transactionType === 'expense',
          }">
            {{ transactionType === 'income' ? '+' : '-' }} {{ formattedAmount }}
          </span>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="pt-2">
        <button type="submit" :disabled="!transactionType || !text || !formattedAmount"
          class="w-full relative overflow-hidden px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed group">
          <div class="flex items-center justify-center space-x-2">
            <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Tambah Transaksi</span>
          </div>

          <!-- Loading animation (optional for future use) -->
          <div
            class="absolute inset-0 bg-white/20 transform scale-x-0 group-active:scale-x-100 transition-transform origin-left duration-200">
          </div>
        </button>

        <!-- Keyboard shortcuts hint -->
        <div class="mt-3 text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">
            💡 Tip: Tekan <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+Enter</kbd> untuk
            submit,
            <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Esc</kbd> untuk clear
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useToast } from "vue-toastification";

// State variables
const text = ref("");
const amount = ref("");
const date = ref("");
const transactionType = ref("");

// Toast for notifications
const toast = useToast();
const emit = defineEmits(["transactionSubmitted"]);

// Props
const props = defineProps({
  textColor: {
    type: String,
    required: true,
  },
});

// Methods to set transaction type with enhanced feedback
const setIncome = () => {
  transactionType.value = "income";
  amount.value = "";
  // Add haptic feedback if available
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  // Add success sound or visual feedback
  toast.info("Jenis transaksi: Pemasukan", {
    timeout: 1500,
    hideProgressBar: true,
  });
};

const setExpense = () => {
  transactionType.value = "expense";
  amount.value = "";
  // Add haptic feedback if available
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  // Add success sound or visual feedback
  toast.info("Jenis transaksi: Pengeluaran", {
    timeout: 1500,
    hideProgressBar: true,
  });
};

// Computed property for formatted amount
const formattedAmount = computed({
  get() {
    if (!amount.value) return "";

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
  if (amount.value === "") return;

  const parsedAmount = parseFloat(amount.value);
  if (isNaN(parsedAmount)) {
    amount.value = "";
  } else {
    amount.value = transactionType.value === "expense"
      ? (-Math.abs(parsedAmount)).toString()
      : Math.abs(parsedAmount).toString();
  }
};

// Handle focus for better UX - select all text with animation
const handleAmountFocus = (event) => {
  event.target.select();
  // Add visual feedback
  event.target.classList.add('ring-2', 'ring-blue-400');
  setTimeout(() => {
    event.target.classList.remove('ring-2', 'ring-blue-400');
  }, 300);
};

// Format currency in real-time with better UX
const formatCurrencyDisplay = (value) => {
  if (!value) return "";
  const numericValue = Math.abs(parseFloat(value));
  return new Intl.NumberFormat('id-ID').format(numericValue);
};

// Add keyboard shortcuts
const handleKeydown = (event) => {
  // Ctrl/Cmd + Enter to submit
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    if (transactionType.value && text.value && amount.value) {
      onSubmit();
    }
  }
  // Escape to clear form
  if (event.key === 'Escape') {
    clearForm();
  }
};

// Clear form function
const clearForm = () => {
  text.value = "";
  amount.value = "";
  transactionType.value = "";
  date.value = new Date().toISOString().split('T')[0];
  toast.info("Form dibersihkan", {
    timeout: 1000,
    hideProgressBar: true,
  });
};

// Add mounted hook for keyboard listeners
onMounted(() => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  date.value = formattedDate;

  // Add global keyboard listener
  document.addEventListener('keydown', handleKeydown);
});

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

// Enhanced submit with success animation
const onSubmit = () => {
  const parsedAmount = parseFloat(amount.value);
  if (!text.value || !amount.value || !date.value) {
    toast.error("Semua field harus diisi.");
    return;
  }

  if (parsedAmount === 0) {
    toast.error("Jumlah transaksi tidak boleh nol.");
    return;
  }

  // Validate date format (YYYY-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date.value)) {
    toast.error("Format tanggal tidak valid. Gunakan format YYYY-MM-DD.");
    return;
  }

  const transactionData = {
    text: text.value,
    amount: parsedAmount,
    inputDate: date.value, // Tanggal yang dipilih user
  };

  // Add success feedback
  toast.success(`Transaksi ${transactionType.value === 'income' ? 'pemasukan' : 'pengeluaran'} berhasil ditambahkan!`, {
    timeout: 3000,
    hideProgressBar: false,
  });

  // Add haptic feedback
  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }

  emit("transactionSubmitted", transactionData);

  // Reset form with animation delay
  setTimeout(() => {
    text.value = "";
    amount.value = "";
    transactionType.value = "";
    date.value = new Date().toISOString().split('T')[0];
  }, 300);
};
</script>

<style scoped>
/* Modern card styling */
.space-y-6>div {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced focus states */
input:focus,
button:focus {
  outline: none;
}

/* Custom focus ring for inputs */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dark input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Disabled state enhancements */
input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.dark input:disabled {
  opacity: 0.5;
}

/* Button animations and effects */
button {
  position: relative;
  overflow: hidden;
}

button:not(:disabled):active {
  transform: translateY(1px);
}

/* Ripple effect for buttons */
button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

button:active::before {
  width: 300px;
  height: 300px;
}

/* Transaction type buttons */
.grid button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.grid button:hover {
  transform: translateY(-2px);
}

.grid button:active {
  transform: translateY(0);
}

/* Amount input special styling */
#amount {
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.5px;
  padding-left: 3rem !important;
  /* Space for "Rp" prefix */
  padding-right: 4rem !important;
  /* Space for indicator */
}

/* Amount input specific styling to prevent overlap */
#amount::placeholder {
  padding-left: 0;
  color: #9ca3af;
}

.dark #amount::placeholder {
  color: #6b7280;
}

/* Currency prefix positioning */
.currency-prefix-amount {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.125rem;
  font-weight: 600;
  color: #6b7280;
  pointer-events: none;
  z-index: 10;
}

.dark .currency-prefix-amount {
  color: #9ca3af;
}

/* Transaction name and date input specific styling to prevent overlap */
.transaction-name-input {
  padding-left: 3rem !important;
  /* Space for icon */
}

.transaction-date-input {
  padding-left: 3rem !important;
  /* Space for icon */
}

/* Make sure icons don't overlap with input content */
.transaction-name-input::placeholder {
  padding-left: 0;
}

.transaction-date-input::placeholder {
  padding-left: 0;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 640px) {

  .transaction-name-input,
  .transaction-date-input {
    padding-left: 2.75rem !important;
    /* Slightly smaller padding on mobile */
  }
}

/* Ensure input text doesn't start too close to icon */
.transaction-name-input:focus,
.transaction-date-input:focus {
  padding-left: 3rem !important;
}

/* WebKit specific adjustments for date input */
.transaction-date-input::-webkit-calendar-picker-indicator {
  margin-right: 0.5rem;
}

/* Firefox specific adjustments */
@-moz-document url-prefix() {
  .transaction-date-input {
    padding-left: 3.25rem !important;
  }
}

/* Pulse animation for active indicators */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Form field hover effects */
.space-y-2 input:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark .space-y-2 input:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Submit button special effects */
.w-full[type="submit"] {
  background-size: 200% 100%;
  transition: all 0.3s ease;
}

.w-full[type="submit"]:hover:not(:disabled) {
  background-position: right center;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.dark .w-full[type="submit"]:hover:not(:disabled) {
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
}

/* Icon animations */
svg {
  transition: all 0.3s ease;
}

.group:hover svg {
  transform: scale(1.1);
}

/* Responsive enhancements */
@media (max-width: 768px) {
  .lg\\:grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .space-y-6 {
    gap: 1rem;
  }

  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .text-lg {
    font-size: 1rem;
  }

  /* Mobile-specific button styling */
  .grid button {
    padding: 1rem;
    font-size: 0.875rem;
  }

  /* Better touch targets */
  button {
    min-height: 44px;
  }

  input {
    min-height: 48px;
  }
}

/* Dark mode enhancements */
.dark {
  color-scheme: dark;
}

/* Smooth transitions for theme switching */
* {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom scrollbar for select elements */
select::-webkit-scrollbar {
  width: 8px;
}

select::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.dark select::-webkit-scrollbar-track {
  background: #374151;
}

select::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.dark select::-webkit-scrollbar-thumb {
  background: #6b7280;
}

select::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.dark select::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Loading state (for future use) */
.loading {
  position: relative;
  overflow: hidden;
}

.loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  button {
    border: 2px solid currentColor;
  }

  input {
    border: 2px solid currentColor;
  }
}

/* Keyboard shortcut styling */
kbd {
  display: inline-block;
  padding: 2px 6px;
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 10px;
  line-height: 1;
  color: #6b7280;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}

.dark kbd {
  color: #9ca3af;
  background-color: #374151;
  border-color: #4b5563;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>