/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'slate-blue': '#5b7c99'
      },
      spacing:{
        '200': '536px',
      }
    },
  },
  plugins: [],
}

