/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'slate-blue': '#5b7c99',
        'dgreen': '#1c291d',
        'crimsonn': '#290204',
        'dblue': '#0d192b'
      },
      spacing:{
        '200': '536px',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}

