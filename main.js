import { createApp } from 'vue';
import App from './src/App.vue';
import './src/style.css' 

// Mount the Vue app to the #app element
createApp(App).mount('#app');

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
