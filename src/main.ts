import 'modern-normalize/modern-normalize.css';
import './assets/styles/index.scss';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
