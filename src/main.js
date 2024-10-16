import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './assets/style.css';
import './main.css'; 
import App from './App.vue';
import './registerServiceWorker'

const app = createApp(App);
app.use(Toast);
app.mount('#app');
