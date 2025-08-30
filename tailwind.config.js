/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,jsx}',
      './components/**/*.{js,jsx}',
      './app/**/*.{js,jsx}',
    ],
    theme: {
      extend: {
        colors: {
          danger: '#E53E3E',
          warning: '#FF8C00',
          caution: '#FFD700',
          success: '#38A169',
          info: '#3182CE',
          secondary: '#718096',
        },
        fontFamily: {
          sans: ['Source Sans Pro', 'sans-serif'],
          mono: ['Fira Code', 'monospace'],
        },
      },
    },
    plugins: [],
  }