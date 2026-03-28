/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: '#0e4d6e',
        gold: '#d4a847',
        'warm-white': '#faf9f6',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn:   { from: { opacity: '0' },                               to: { opacity: '1' } },
        fadeInUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseWA:  { '0%,100%': { boxShadow: '0 0 0 0 rgba(37,211,102,0.5)' }, '50%': { boxShadow: '0 0 0 10px rgba(37,211,102,0)' } },
      },
      animation: {
        'fade-in':    'fadeIn 0.25s ease-in',
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'pulse-wa':   'pulseWA 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
