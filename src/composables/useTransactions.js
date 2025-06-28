import { computed, onMounted, ref } from "vue";

export function useTransactions(toast) {
  const allTransactions = ref({});
  const selectedDate = ref(getTodayDate());
  const showAll = ref(false);

  // Helper: dapatkan format tanggal YYYY-MM-DD
  function getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  // Helper: dapatkan format bulan YYYY-MM
  function getCurrentMonth() {
    return new Date().toISOString().substring(0, 7);
  }

  // Helper: dapatkan nama bulan dalam bahasa Indonesia
  function getMonthName(monthString) {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const [year, month] = monthString.split("-");
    return `${months[parseInt(month) - 1]} ${year}`;
  }

  // Load dari localStorage
  onMounted(() => {
    const saved =
      JSON.parse(localStorage.getItem("transactions_by_date")) || {};
    allTransactions.value = saved;
  });

  // Transaksi untuk tanggal yang dipilih
  const transactions = computed(() => {
    return allTransactions.value[selectedDate.value] || [];
  });

  // Total saldo, income, expenses
  const total = computed(() =>
    transactions.value.reduce((acc, t) => acc + t.amount, 0)
  );

  const income = computed(() =>
    transactions.value
      .filter((t) => t.amount > 0)
      .reduce((acc, t) => acc + t.amount, 0)
  );

  const expenses = computed(() =>
    transactions.value
      .filter((t) => t.amount < 0)
      .reduce((acc, t) => acc + t.amount, 0)
  );

  const addTransaction = (data) => {
    const transaction = {
      id: generateUniqueId(),
      text: data.text,
      amount: data.amount,
      date: new Date().toISOString(),
    };

    // Gunakan tanggal yang ditentukan user atau tanggal yang dipilih saat ini
    const dateKey = data.inputDate || selectedDate.value;
    if (!allTransactions.value[dateKey]) {
      allTransactions.value[dateKey] = [];
    }
    allTransactions.value[dateKey].push(transaction);
    saveTransactions();
    toast.success(
      `Transaksi ditambahkan untuk ${formatDateForDisplay(dateKey)}.`
    );
  };

  // Helper function untuk format tanggal tampilan
  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Helper function untuk format mata uang Rupiah
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const deleteTransaction = (id) => {
    const dateKey = selectedDate.value;
    allTransactions.value[dateKey] = allTransactions.value[dateKey].filter(
      (t) => t.id !== id
    );
    saveTransactions();
    toast.success("Transaksi telah dihapus.");
  };

  const deleteAllTransactions = () => {
    if (
      confirm(
        "Apakah Anda yakin ingin menghapus semua transaksi pada hari ini?"
      )
    ) {
      delete allTransactions.value[selectedDate.value];
      saveTransactions();
      toast.success("Semua transaksi untuk hari ini telah dihapus.");
    }
  };

  const saveTransactions = () => {
    localStorage.setItem(
      "transactions_by_date",
      JSON.stringify(allTransactions.value)
    );
  };

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  // Computed untuk menampilkan transaksi berdasarkan filter
  const filteredTransactions = computed(() => {
    if (showAll.value) {
      // Tampilkan semua transaksi dari semua tanggal, diurutkan berdasarkan tanggal
      const allTransactionsList = [];
      Object.keys(allTransactions.value).forEach((date) => {
        allTransactions.value[date].forEach((transaction) => {
          allTransactionsList.push({ ...transaction, dateKey: date });
        });
      });
      return allTransactionsList.sort(
        (a, b) => new Date(b.dateKey) - new Date(a.dateKey)
      );
    } else {
      // Tampilkan hanya transaksi untuk tanggal yang dipilih
      return transactions.value;
    }
  });

  // Computed untuk mendapatkan ringkasan transaksi per hari
  const transactionsByDay = computed(() => {
    const summary = [];
    Object.keys(allTransactions.value).forEach((date) => {
      const dayTransactions = allTransactions.value[date];
      const dayTotal = dayTransactions.reduce((acc, t) => acc + t.amount, 0);
      const dayIncome = dayTransactions
        .filter((t) => t.amount > 0)
        .reduce((acc, t) => acc + t.amount, 0);
      const dayExpenses = dayTransactions
        .filter((t) => t.amount < 0)
        .reduce((acc, t) => acc + t.amount, 0);

      summary.push({
        date,
        total: dayTotal,
        income: dayIncome,
        expenses: dayExpenses,
        count: dayTransactions.length,
      });
    });

    // Urutkan berdasarkan tanggal terbaru
    return summary.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  // Fungsi untuk melihat transaksi pada tanggal tertentu
  const viewTransactionsForDate = (date) => {
    selectedDate.value = date;
    showAll.value = false;
  };

  // Fungsi untuk melihat semua transaksi
  const viewAllTransactions = () => {
    showAll.value = true;
  };

  // Computed untuk mendapatkan ringkasan transaksi per bulan
  const transactionsByMonth = computed(() => {
    const monthlyData = {};

    // Kelompokkan transaksi berdasarkan bulan
    Object.keys(allTransactions.value).forEach((date) => {
      const month = date.substring(0, 7); // YYYY-MM
      const dayTransactions = allTransactions.value[date];

      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          monthName: getMonthName(month),
          transactions: [],
          totalIncome: 0,
          totalExpenses: 0,
          netAmount: 0,
          transactionCount: 0,
        };
      }

      dayTransactions.forEach((transaction) => {
        monthlyData[month].transactions.push({
          ...transaction,
          dateKey: date,
        });

        if (transaction.amount > 0) {
          monthlyData[month].totalIncome += transaction.amount;
        } else {
          monthlyData[month].totalExpenses += transaction.amount;
        }
        monthlyData[month].transactionCount++;
      });

      monthlyData[month].netAmount =
        monthlyData[month].totalIncome + monthlyData[month].totalExpenses;
    });

    // Konversi ke array dan urutkan berdasarkan bulan terbaru
    return Object.values(monthlyData).sort((a, b) =>
      b.month.localeCompare(a.month)
    );
  });

  // Computed untuk mendapatkan ringkasan tahunan
  const transactionsByYear = computed(() => {
    const yearlyData = {};

    Object.keys(allTransactions.value).forEach((date) => {
      const year = date.substring(0, 4); // YYYY
      const dayTransactions = allTransactions.value[date];

      if (!yearlyData[year]) {
        yearlyData[year] = {
          year,
          totalIncome: 0,
          totalExpenses: 0,
          netAmount: 0,
          transactionCount: 0,
          monthCount: new Set(),
        };
      }

      const month = date.substring(0, 7);
      yearlyData[year].monthCount.add(month);

      dayTransactions.forEach((transaction) => {
        if (transaction.amount > 0) {
          yearlyData[year].totalIncome += transaction.amount;
        } else {
          yearlyData[year].totalExpenses += transaction.amount;
        }
        yearlyData[year].transactionCount++;
      });

      yearlyData[year].netAmount =
        yearlyData[year].totalIncome + yearlyData[year].totalExpenses;
    });

    // Konversi monthCount dari Set ke number
    Object.values(yearlyData).forEach((yearData) => {
      yearData.monthCount = yearData.monthCount.size;
    });

    return Object.values(yearlyData).sort((a, b) =>
      b.year.localeCompare(a.year)
    );
  });

  // Fungsi untuk mendapatkan transaksi bulan tertentu
  const getTransactionsForMonth = (monthString) => {
    const monthTransactions = [];
    Object.keys(allTransactions.value).forEach((date) => {
      if (date.startsWith(monthString)) {
        allTransactions.value[date].forEach((transaction) => {
          monthTransactions.push({
            ...transaction,
            dateKey: date,
          });
        });
      }
    });
    return monthTransactions.sort(
      (a, b) => new Date(b.dateKey) - new Date(a.dateKey)
    );
  };

  // Fungsi untuk export data bulanan ke JSON
  const exportMonthlyData = (monthString) => {
    const monthTransactions = getTransactionsForMonth(monthString);
    const monthSummary = transactionsByMonth.value.find(
      (m) => m.month === monthString
    );

    const exportData = {
      month: monthString,
      monthName: getMonthName(monthString),
      summary: monthSummary,
      transactions: monthTransactions,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${monthString}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(`Data bulan ${getMonthName(monthString)} berhasil di-export`);
  };

  return {
    selectedDate,
    transactions,
    total,
    income,
    expenses,
    addTransaction,
    deleteTransaction,
    deleteAllTransactions,
    allTransactions, // optional: untuk menampilkan seluruh history
    transactionsByDay,
    transactionsByMonth,
    transactionsByYear,
    viewTransactionsForDate,
    viewAllTransactions,
    showAll,
    filteredTransactions,
    getTransactionsForMonth,
    exportMonthlyData,
    getCurrentMonth,
    getMonthName,
    formatDateForDisplay,
    formatCurrency,
  };
}
