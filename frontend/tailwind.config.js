/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f2fbf4',
          100: '#e3f7e8',
          200: '#c6eecf',
          300: '#9fe1ad',
          400: '#6ece82',
          500: '#43b35a',
          600: '#329245',
          700: '#287439',
          800: '#235c31',
          900: '#1e4c2a',
          950: '#0c2a15',
          canvas: '#9bd9a6',
          panel: '#b0e3b9',
          card: '#f4fbf5',
          cardSub: '#eaf8ec',
          border: '#a2dcab',
          dark: '#1c1f1d',
          darkCard: '#1a1d1b',
        }
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
