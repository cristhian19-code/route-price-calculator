import { createApp } from 'vue'
import mapboxgl from 'mapbox-gl';

import { createPinia } from 'pinia'

import router from './router'

import App from './App.vue'

import './style.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN0aWFuOTktY29kZSIsImEiOiJjazg0dTYzMmEwMDFxM21vaXNqcHFqaXkxIn0.lBoSGK2YhEO37zUmbgxnhQ';

const pinia = createPinia();


if (!navigator.geolocation) {
    throw new Error("Navigator no activado");
}

createApp(App).use(pinia).use(router).mount('#app')
