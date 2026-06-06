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
        ink: '#111827',
        'glass-surface': 'rgba(255, 255, 255, 0.78)',
        'glass-line': 'rgba(15, 23, 42, 0.08)'
      },
      boxShadow: {
        glow: '0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 36px rgba(15, 23, 42, 0.06)',
        violet: '0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 36px rgba(15, 23, 42, 0.06)',
        glass: '0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 36px rgba(15, 23, 42, 0.06)'
      },
      backdropBlur: {
        glass: '14px'
      }
    }
  },
  plugins: []
}
