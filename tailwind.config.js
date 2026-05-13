/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        'brand-lime': '#a3e635',
        ink: '#070809'
      },
      boxShadow: {
        glow: '0 0 36px rgba(87, 245, 255, 0.18)',
        violet: '0 0 42px rgba(139, 92, 246, 0.22)'
      }
    }
  },
  plugins: []
}
