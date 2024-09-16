import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importa os estilos globais
import './assets/styles/global.css';

createApp(App)
    .use(router)
    .mount('#app')
