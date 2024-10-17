<template>
    <div v-if="show" class="popup-overlay">
      <div class="popup-content">
        <h2 class="capitalize">Selamat datang di aplikasi monitoring keuangan  😃🤗</h2>
        <h2 class="capitalize">Atur pemasukan dan pengeluaran anda sekarang!</h2>
        <button @click="closePopup" >Tutup</button>
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
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #3490dc;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #2779bd;
  }
  </style>
  