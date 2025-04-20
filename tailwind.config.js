/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ice-blue': '#a5cdff',
        'neon-blue': '#4c83ff',
        'dark-blue': '#0a1929',
        'dark-gray': '#1a202c',
        'error-red': '#ff4e4e',
      },
      fontFamily: {
        sans: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(76, 131, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(76, 131, 255, 0.8), 0 0 30px rgba(76, 131, 255, 0.6)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};