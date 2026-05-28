/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Blue theme
        blue: {
          50: '#f0f7ff',
          100: '#dbeefe',
          200: '#bfe0fd',
          300: '#93cbfc',
          400: '#60aef8',
          500: '#3b8ef3',
          600: '#2570e8',
          700: '#1d5cd4',
          800: '#1e4bab',
          900: '#1e4087',
        },
        // Pink theme
        rose: {
          50: '#fff1f3',
          100: '#ffe4e9',
          200: '#fecdd6',
          300: '#fda4b4',
          400: '#fb7190',
          500: '#f43f6a',
          600: '#e11d4a',
          700: '#be123b',
          800: '#9f1239',
          900: '#881337',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
