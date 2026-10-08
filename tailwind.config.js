/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#FF8A00", dark: "#E57B00", soft: "#FFF1E0" },
        leaf: { DEFAULT: "#3FA535", dark: "#338A2B", mint: "#E8F6EC" },
        ink: "#2E1D0A",
        espresso: "#30200D",
        mocha: "#5B4D3C",
        cream: "#FAFAF8",
        danger: "#FF3B3B",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Playfair Display"', "Georgia", "serif"],
      },
      maxWidth: { page: "1112px" },
    },
  },
  plugins: [],
};
