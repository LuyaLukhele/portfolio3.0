/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {  animation: {
      'spin-slow': 'spin 8s linear infinite',
      'bounce-slow': 'bounce 2s linear infinite',
    }},
  },
  plugins: [require('@tailwindcss/aspect-ratio'),],
}
