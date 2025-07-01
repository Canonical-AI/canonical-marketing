import { createApp } from 'vue';
import App from './src/App.vue';
import router from './src/router.js';
import './src/style.css';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

// Custom Vuetify theme matching existing design
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#1A0F15',
          surface: '#24232A',
          'surface-bright': '#35303A',
          'surface-light': '#4A3B45',
          'surface-variant': '#2A2228',
          'on-surface-variant': '#C6B2B5',
          primary: '#4A7A9B',
          'primary-darken-1': '#3A6079',
          secondary: '#D1A181',
          'secondary-darken-1': '#B38A6D',
          error: '#E74C3C',
          info: '#3498DB',
          success: '#4B7D6F',
          warning: '#F39C12',
          'on-background': '#C6B2B5',
          'on-surface': '#C6B2B5',
          'on-primary': '#FFFFFF',
          'on-secondary': '#000000',
          'on-error': '#FFFFFF',
          'on-info': '#FFFFFF',
          'on-success': '#FFFFFF',
          'on-warning': '#000000',
        }
      }
    }
  }
});

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `${r}, ${g}, ${b}`; // Return as a comma-separated string
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const variables = [
      '--background',
      '--surface',
      '--surface-bright',
      '--surface-light',
      '--surface-variant',
      '--on-surface-variant',
      '--primary',
      '--primary-darken-1',
      '--secondary',
      '--secondary-darken-1',
      '--error',
      '--info',
      '--success',
      '--warning',
      '--border-color',
      '--theme-kbd',
      '--theme-on-kbd',
      '--theme-code',
      '--theme-on-code'
    ];

    variables.forEach(variable => {
      const hexColor = getComputedStyle(root).getPropertyValue(variable).trim();
      const rgbColor = hexToRgb(hexColor);
      root.style.setProperty(`${variable}-rgb`, rgbColor);
    });
});

// Mount the Vue app with Vuetify
createApp(App).use(router).use(vuetify).mount('#app');
