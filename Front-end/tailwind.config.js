/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nasa-blue': '#0B3D91',
        'nasa-red': '#FC3D21',
        'space-dark': '#0a0e27',
        'space-purple': '#5B21B6',
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(to bottom right, #0a0e27, #1e1b4b, #312e81)',
      }
    },
  },
  plugins: [],
}
