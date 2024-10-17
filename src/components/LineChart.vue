<template>
  <div>
    <h2 :class="computedTextColor" class="text-sm font-semibold">
      Grafik Transaksi
    </h2>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { computed, ref, watch } from "vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

// Props to receive transactions data
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

// State for chart data
const chartData = ref({
  labels: [],
  datasets: [],
});

// Separate transactions into income and expenses
const processChartData = () => {
  const labels = props.transactions.map((transaction) =>
    new Date(transaction.date).toLocaleDateString("id-ID")
  );

  const incomeData = props.transactions
    .filter((transaction) => transaction.amount > 0)
    .map((transaction) => transaction.amount);

  const expenseData = props.transactions
    .filter((transaction) => transaction.amount < 0)
    .map((transaction) => Math.abs(transaction.amount));

  chartData.value = {
    labels,
    datasets: [
      {
        label: "Pemasukan (Rp)",
        data: incomeData,
        fill: false,
        borderColor: "rgb(75, 192, 192)", // Color for income line
        tension: 0.1,
        pointBackgroundColor: "rgb(75, 192, 192)",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: "Pengeluaran (Rp)",
        data: expenseData,
        fill: false,
        borderColor: "rgb(255, 99, 132)", // Color for expense line
        tension: 0.1,
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };
};

// Watch the transactions prop for changes and update the chart
watch(
  () => props.transactions,
  () => {
    processChartData(); // Recalculate chart data when transactions change
  },
  { deep: true, immediate: true } // Deep watch for nested changes, trigger on component mount
);

// Determine if dark mode is active
const isDarkMode = computed(() =>
  document.documentElement.classList.contains("dark")
);

// Compute the text color based on the dark mode state
const computedTextColor = computed(() => {
  return isDarkMode.value ? "text-white" : props.textColor;
});

// Chart options with dark and light mode support
const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        color: isDarkMode.value ? "#ffffff" : "#000000", // Legend label color
      },
    },
    tooltip: {
      enabled: true,
      titleColor: isDarkMode.value ? "#ffffff" : "#000000", // Tooltip title color
      bodyColor: isDarkMode.value ? "#ffffff" : "#000000", // Tooltip body color
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: isDarkMode.value
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.1)", // Grid lines color
      },
      ticks: {
        color: isDarkMode.value ? "#ffffff" : "#000000", // Tick color
      },
    },
    x: {
      grid: {
        color: isDarkMode.value
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.1)", // Grid lines color
      },
      ticks: {
        color: isDarkMode.value ? "#ffffff" : "#000000", // Tick color
      },
    },
  },
}));
</script>

<style scoped>
canvas {
  max-width: 100%;
  background-color: transparent; /* Ensures the background is transparent */
}
</style>
