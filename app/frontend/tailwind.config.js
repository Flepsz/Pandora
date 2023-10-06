/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#1C2023",
        "secondary": "#2B2F32",
        "purple-d": "#530082",
        "purple-l": "#661395"
      }
    },
  },
  plugins: [],
}

