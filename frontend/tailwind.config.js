/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#05070D',
        darkSecondary: '#090D16',
        cardDark: '#0D1320',
        cardElevated: '#111827',
        darkBorder: '#1D2A3A',
        primaryText: '#F1F5F9',
        secondaryText: '#8B9AAF',
        aiCyan: '#00E5FF',
        accentBlue: '#3B82F6',
        fakeRed: '#FF3158',
        realGreen: '#20E6A4',
        uncertainAmber: '#FFB020',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
