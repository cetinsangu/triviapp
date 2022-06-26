/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        lobster: ['Lobster', 'cursive'],
      },
      colors: {
        modal: 'rgba(0, 0, 0, 0.75)',
      },
    },
  },
  plugins: [],
};
