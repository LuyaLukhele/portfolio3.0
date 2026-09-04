/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        body: ["'Inter'", "sans-serif"],
      },
      colors: {
        brand: {
          accent: "#E8823E",
          navy: "#1B1E24",
          "navy-light": "#20354b",
          border: "#DADFE6",
        },
        navy: {
          10: "#0B111E",
          20: "#16223A",
          30: "#22314E",
          40: "#33456B",
          90: "#D9DEEA",
          95: "#EBEEF5",
        },
        orange: {
          40: "#CC6F27",
          50: "#E8863B",
          60: "#EE9C5A",
          90: "#FBE2C7",
          95: "#FDF0E0",
        },
        surface: {
          DEFAULT: "#F6F7FB",
          container: "#FFFFFF",
          "container-high": "#F0F2F7",
        },
        outline: {
          DEFAULT: "#E1E4EA",
          strong: "#C9CEDA",
        },
        ink: {
          900: "#171B24",
          700: "#3C4351",
          500: "#69707F",
        },
      },
      boxShadow: {
        e1: "0 1px 2px rgba(23,27,36,0.06), 0 1px 3px rgba(23,27,36,0.10)",
        e2: "0 2px 6px rgba(23,27,36,0.08), 0 4px 12px rgba(23,27,36,0.10)",
        e3: "0 8px 24px rgba(23,27,36,0.14)",
      },
    },
  },
  plugins: [],
}
