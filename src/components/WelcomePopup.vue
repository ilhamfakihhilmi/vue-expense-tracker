<template>
  <div v-if="show" class="popup-overlay">
    <div class="popup-content">
      <h2 class="text-base">
        Selamat datang di aplikasi monitoring keuangan 😃🤗
      </h2>
      <h2 class="text-base">Atur pemasukan dan pengeluaran anda sekarang!</h2>

      <!-- Motivational Quote Section -->
      <div class="motivation-section">
        <div v-if="loadingQuote" class="loading-quote">
          <div class="loading-spinner"></div>
          <p>Mengambil motivasi untuk Anda...</p>
        </div>
        <div v-else class="quote-container">
          <p class="quote-text">"{{ currentQuote.text }}"</p>
          <p class="quote-author">- {{ currentQuote.author }}</p>
        </div>
      </div>

      <button @click="closePopup" class="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
          <path
            d="M19.293 6.293a1 1 0 00-1.414 0L12 12.586 6.121 6.707a1 1 0 00-1.414 1.414L10.586 14l-5.879 5.879a1 1 0 001.414 1.414L12 15.414l5.879 5.879a1 1 0 001.414-1.414L13.414 14l5.879-5.879a1 1 0 000-1.414z" />
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
      loadingQuote: true,
      currentQuote: {
        text: '',
        author: ''
      },
      // Fallback quotes tentang menabung dan keuangan
      fallbackQuotes: [
        {
          text: "Menabung adalah kebiasaan yang akan mengubah masa depan Anda menjadi lebih cerah",
          author: "Motivasi Harian"
        },
        {
          text: "Setiap rupiah yang Anda tabung hari ini adalah investasi untuk kebahagiaan masa depan",
          author: "Wisdom Financial"
        },
        {
          text: "Orang kaya bukan karena penghasilannya besar, tetapi karena pandai mengelola uang",
          author: "Robert Kiyosaki"
        },
        {
          text: "Jangan simpan apa yang tersisa setelah berbelanja, tapi belanjakan apa yang tersisa setelah menabung",
          author: "Warren Buffett"
        },
        {
          text: "Menabung adalah memberi hadiah untuk diri sendiri di masa depan",
          author: "Motivasi Keuangan"
        },
        {
          text: "Kebiasaan kecil menabung akan menghasilkan pencapaian besar di masa depan",
          author: "Financial Wisdom"
        }
      ]
    };
  },
  mounted() {
    this.getMotivationalQuote();
  },
  methods: {
    closePopup() {
      this.show = false; // Menutup popup saat tombol ditutup ditekan
    },

    async getMotivationalQuote() {
      this.loadingQuote = true;
      try {
        // Coba ambil quote dari API
        const response = await fetch('https://api.quotable.io/random?tags=motivational,success,wisdom&minLength=50&maxLength=150');
        if (response.ok) {
          const data = await response.json();
          this.currentQuote = {
            text: data.content,
            author: data.author
          };
        } else {
          throw new Error('API request failed');
        }
      } catch (error) {
        console.log('Menggunakan quote lokal:', error.message);
        // Jika API gagal, gunakan quote lokal
        this.getRandomFallbackQuote();
      } finally {
        this.loadingQuote = false;
      }
    },

    getRandomFallbackQuote() {
      const randomIndex = Math.floor(Math.random() * this.fallbackQuotes.length);
      this.currentQuote = this.fallbackQuotes[randomIndex];
    },

    async getNewQuote() {
      await this.getMotivationalQuote();
    }
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
  margin: 25px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;
}

.icon {
  width: 24px;
  height: 24px;
  fill: #3490dc;
}

.close-button:hover .icon {
  fill: #2779bd;
}

/* Motivational Quote Styles */
.motivation-section {
  margin: 30px 0 20px 0;
  padding: 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
  position: relative;
  overflow: hidden;
}

.motivation-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {

  0%,
  100% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }
}

.loading-quote {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.quote-container {
  position: relative;
  z-index: 1;
}

.quote-text {
  font-size: 1.1rem;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 15px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.quote-author {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 20px;
  font-weight: 600;
}

.refresh-quote-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.refresh-quote-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}


.refresh-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  transition: transform 0.3s ease;
}

.refresh-quote-btn:hover:not(:disabled) .refresh-icon {
  transform: rotate(180deg);
}

/* Responsive Design */
@media (max-width: 600px) {
  .popup-content {
    margin: 15px;
    padding: 25px;
  }

  .motivation-section {
    padding: 20px;
    margin: 20px 0 15px 0;
  }

  .quote-text {
    font-size: 1rem;
  }

  .quote-author {
    font-size: 0.8rem;
  }
}
</style>
