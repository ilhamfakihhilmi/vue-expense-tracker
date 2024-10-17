<template>
  <div v-if="show" class="popup-overlay">
    <div class="popup-content">
      <h2 class="text-base">
        Selamat datang di aplikasi monitoring keuangan 😃🤗
      </h2>
      <h2 class="text-base">Atur pemasukan dan pengeluaran anda sekarang!</h2>
      <button @click="closePopup" class="close-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="icon"
        >
          <path
            d="M19.293 6.293a1 1 0 00-1.414 0L12 12.586 6.121 6.707a1 1 0 00-1.414 1.414L10.586 14l-5.879 5.879a1 1 0 001.414 1.414L12 15.414l5.879 5.879a1 1 0 001.414-1.414L13.414 14l5.879-5.879a1 1 0 000-1.414z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true, // Popup akan ditampilkan saat pertama kali aplikasi dimuat
    };
  },
  methods: {
    closePopup() {
      this.show = false; // Menutup popup saat tombol ditutup ditekan
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup-content {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative; /* Add this for positioning the close button */
}
.close-button {
  position: absolute; /* Position the button in the top-right corner */
  top: 10px;
  right: 10px;
  background: transparent; /* Make button background transparent */
  border: none; /* Remove border */
  cursor: pointer; /* Show pointer on hover */
  z-index: 1001; /* Ensure it's above the popup content */
}
.icon {
  width: 24px; /* Set icon size */
  height: 24px; /* Set icon size */
  fill: #3490dc; /* Set icon color */
}
.close-button:hover .icon {
  fill: #2779bd; /* Change icon color on hover */
}
</style>
