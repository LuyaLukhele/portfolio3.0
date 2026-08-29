/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        brand: {
          accent: "#E8823E",
          navy: "#1B1E24",
          "navy-light": "#20354b",
          border: "#DADFE6",
        },
      },
    },
  },
  plugins: [],
}
