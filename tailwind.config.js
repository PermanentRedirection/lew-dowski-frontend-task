/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {},
  },
  purge: [
    './views/**/*.ejs'
  ],
  plugins: [],
}

