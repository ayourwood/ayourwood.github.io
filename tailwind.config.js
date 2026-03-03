/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./css/*.css",
    "./js/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D1E17',
        accent: '#cfaa79dc',
      },
      fontFamily: {
        'tajawal': ['Tajawal', 'sans-serif'],
        'amiri': ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
}
