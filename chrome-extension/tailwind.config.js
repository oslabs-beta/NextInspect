/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/panel/index.html',
    './src/pages/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'Avenir', 'Helvetica', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        background: '#292a2d',
        tableRow: '#202124',
      },
    },
  },
  plugins: [],
}
