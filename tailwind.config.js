/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        grass: {
          50: '#f4fcf0',
          100: '#e8f7e0',
          200: '#d4f0c2',
          300: '#A1E897',
          400: '#7dd46d',
          500: '#59c043',
          600: '#35AB26',
          700: '#2d8b20',
          800: '#256b1a',
          900: '#1d4f13',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
