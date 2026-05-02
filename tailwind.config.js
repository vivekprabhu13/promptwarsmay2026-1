/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'saffron': '#FF9933',
        'saffron-light': 'rgba(255, 153, 51, 0.2)',
        'navy': '#0A192F',
        'blue': '#000080',
        'blue-light': 'rgba(0, 0, 128, 0.1)',
        'green': '#138808',
        'green-light': 'rgba(19, 136, 8, 0.2)',
        'text-dark': '#1E293B',
        'text-light': '#64748B',
      }
    },
  },
  plugins: [],
}
