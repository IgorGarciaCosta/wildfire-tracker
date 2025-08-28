/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",     // TODAS as rotas onde você usará classes
  ],
  theme: {
    extend: {},                       // lugar para cores, fontes customizadas
  },
  plugins: [],
};
