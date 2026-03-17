/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        ink: '#0A0A0A',
        charcoal: '#1A1A1A',
        gold: { primary: '#D4AF37', light: '#F5E7B2', deep: '#996515', shine: '#FFD700' },
        cream: '#F5F0E6',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        shimmer: 'shimmer 4s linear infinite',
        float: 'float 6s ease-in-out infinite',
        pulseRing: 'pulseRing 2.5s ease-out infinite',
      },
      keyframes: {
        shimmer: { '0%': { backgroundPosition: '0% center' }, '100%': { backgroundPosition: '200% center' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseRing: { '0%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.5)' }, '70%': { boxShadow: '0 0 0 20px rgba(212,175,55,0)' }, '100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0)' } },
      },
    },
  },
  plugins: [],
}
