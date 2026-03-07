import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderRadius: {
      none: '0',
      DEFAULT: '0',
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        orange: '#D17140',
        blue: '#387BBF',
        black: '#3A3A3A',
        'black-check': '#333333',
        red: '#C63939',
        'off-white': '#F5F5F5',
        white: '#FFFFFF',
        gray: '#999999'
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 28px 8px rgba(209, 113, 64, 0.4)' },
          '50%': { boxShadow: '0 0 44px 16px rgba(209, 113, 64, 0.65)' },
        },
        'spin-slow': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'novo-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
        'novo-pulse': 'novo-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
