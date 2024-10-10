import { ref, computed, onMounted } from 'vue';

export function useTransactions(toast) {
  const transactions = ref([]);

  // Load transactions from localStorage on component mount
  onMounted(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.value = savedTransactions;
  });

  // Compute total balance
  const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => acc + transaction.amount, 0);
  });

  // Compute total income
  const income = computed(() => {
    return transactions.value
      .filter(transaction => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2);
  });

  // Compute total expenses
  const expenses = computed(() => {
    return transactions.value
      .filter(transaction => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2);
  });

  // Add a new transaction
  const addTransaction = (transactionData) => {
    const transaction = {
      id: generateUniqueId(),
      text: transactionData.text,
      amount: transactionData.amount,
      date: new Date().toISOString(), // Store transaction timestamp
    };
    transactions.value.push(transaction);
    saveTransactions();
    toast.success('Transaction added.');
  };

  // Delete a transaction by ID
  const deleteTransaction = (id) => {
    transactions.value = transactions.value.filter(transaction => transaction.id !== id);
    saveTransactions();
    toast.success('Transaction deleted.');
  };

  // Delete all transactions
  const deleteAllTransactions = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua transaksi?')) {
      transactions.value = [];
      saveTransactions();
      toast.success('Semua transaksi telah dihapus.');
    }
  };

  // Save transactions to localStorage
  const saveTransactions = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
  };

  // Generate a unique ID for each transaction
  const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  return {
    transactions,
    total,
    income,
    expenses,
    addTransaction,
    deleteTransaction,
    deleteAllTransactions,
  };
}
