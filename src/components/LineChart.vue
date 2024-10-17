<template>
  <div>
    <h2 :class="computedTextColor" class="text-xs font-semibold">
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
import { computed } from "vue";

// Register required components of chart.js
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

// Prepare chart data based on transactions
const chartData = computed(() => {
  const labels = props.transactions.map((transaction) =>
    new Date(transaction.date).toLocaleDateString("id-ID")
  );
  const data = props.transactions.map((transaction) => transaction.amount);

  return {
    labels,
    datasets: [
      {
        label: "Jumlah Transaksi (Rp)",
        data,
        fill: false,
        borderColor: isDarkMode.value
          ? "rgb(53, 162, 235)"
          : "rgb(75, 192, 192)",
        tension: 0.1,
        pointBackgroundColor: isDarkMode.value
          ? "rgb(53, 162, 235)"
          : "rgb(75, 192, 192)",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };
});

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
