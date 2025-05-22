/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(255, 255, 255, 0.2)' },
          '50%': { borderColor: 'rgba(255, 255, 255, 1)' },
        }
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out',
        'border-glow': 'border-glow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}