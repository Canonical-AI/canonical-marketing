/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'on-surface-variant': 'var(--on-surface-variant)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'secondary-darken-1': 'var(--secondary-darken-1)',
        'success': 'var(--success)',
        'surface': 'var(--surface)',
        'surface-bright': 'var(--surface-bright)',
        'surface-light': 'var(--surface-light)',
        'surface-variant': 'var(--surface-variant)',
        'error': 'var(--error)',
        'info': 'var(--info)',
        'warning': 'var(--warning)',
        'background': 'var(--background)',
        // Add other custom colors as needed
      },
    },
  },
  plugins: [],
}
