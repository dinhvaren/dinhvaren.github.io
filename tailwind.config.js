/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'cyber': {
          black: '#000000',
          green: '#00ff00',
          blue: '#0077ff',
          amber: '#ffb300'
        }
      },
      animation: {
        'matrix': 'matrix 20s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        matrix: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .5 },
        },
      },
    },
  },
  plugins: [],
};