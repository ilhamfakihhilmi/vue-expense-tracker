<template>
    <div>
      <!-- Optional: Chart title -->
      <!-- <h2 :class="[textColor, 'text-xl font-semibold mb-8']">Grafik Balance</h2> -->
  
      <!-- Chart Canvas -->
      <canvas ref="chartCanvas"></canvas>
  
      <!-- Summary Section -->
      <div class="mt-4">
        <h3 :class="[textColor, 'text-lg font-semibold']">Rangkuman</h3>
        <p>Total Transaksi: {{ totalTransactions }}</p>
        <p>Saldo Total: {{ totalBalance.toLocaleString() }} </p>
        <p>Rata-rata Transaksi: {{ averageTransaction.toLocaleString() }} </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, defineProps, computed } from "vue";
  import { Chart, registerables } from "chart.js";
  
  Chart.register(...registerables);
  
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
  
  const chartCanvas = ref(null);
  let chartInstance = null;
  
  const renderChart = () => {
    const ctx = chartCanvas.value.getContext("2d");
  
    // Format labels to show only the date, without time
    const labels = props.transactions.map((transaction) =>
      new Date(transaction.date).toLocaleDateString()
    );
    const amounts = props.transactions.map((transaction) => transaction.amount);
  
    if (chartInstance) {
      chartInstance.destroy(); // Destroy previous instance if exists
    }
  
    chartInstance = new Chart(ctx, {
      type: "bar", // Use "bar" for stacked bar chart
      data: {
        labels: labels,
        datasets: [
          {
            label: "Balance",
            data: amounts,
            borderColor: props.textColor,
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            stack: "Stack 0",
          },
          // Add more datasets as needed for stacking
          {
            label: "Additional Data", // Example dataset
            data: amounts.map(amount => amount * 0.5), // Example transformation
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: "rgba(255, 159, 64, 0.6)",
            stack: "Stack 0",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true, // Enable stacking on x-axis
            ticks: {
              font: {
                size: 10, // Font size for x-axis labels (dates)
              },
            },
          },
          y: {
            stacked: true, // Enable stacking on y-axis
            ticks: {
              font: {
                size: 10, // Adjust the font size for y-axis labels (nominals)
              },
            },
            beginAtZero: true,
          },
        },
      },
    });
  };
  
  // Computed properties for summary
  const totalTransactions = computed(() => props.transactions.length);
  const totalBalance = computed(() => {
    return props.transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  });
  const averageTransaction = computed(() => {
    return totalTransactions.value > 0
      ? totalBalance.value / totalTransactions.value
      : 0;
  });
  
  onMounted(() => {
    renderChart();
  });
  
  watch(
    () => props.transactions,
    () => {
      renderChart();
    }
  );
  </script>
  
  <style scoped>
  canvas {
    width: 100% !important;
    height: 220px !important;
  }
  </style>
  