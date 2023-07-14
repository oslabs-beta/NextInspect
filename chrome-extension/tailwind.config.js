/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/panel/index.html',
    './src/pages/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#292a2d',
        tableRow: '#202124',
      },
      fontFamily: {
        sans: ['Inter', 'Avenir', 'Helvetica', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
