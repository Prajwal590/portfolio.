/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
      },
      boxShadow: {
        'glow-sm':  '0 0 15px -3px rgba(99,102,241,0.3)',
        'glow':     '0 0 25px -5px rgba(99,102,241,0.4)',
        'glow-lg':  '0 0 40px -10px rgba(99,102,241,0.5)',
        'card':     '0 4px 24px -4px rgba(15,23,42,0.08)',
        'card-lg':  '0 8px 40px -8px rgba(15,23,42,0.12)',
      },
      animation: {
        'fade-in':       'fadeIn 0.6s ease-out',
        'fade-in-up':    'fadeInUp 0.6s ease-out',
        'fade-in-down':  'fadeInDown 0.5s ease-out',
        'slide-up':      'slideUp 0.6s cubic-bezier(0.16,1,0.3,1)',
        'slide-in-left': 'slideInLeft 0.6s cubic-bezier(0.16,1,0.3,1)',
        'slide-in-right':'slideInRight 0.6s cubic-bezier(0.16,1,0.3,1)',
        'pulse-slow':    'pulse 3s ease-in-out infinite',
        'skeleton':      'skeleton 1.5s ease-in-out infinite',
        'float':         'float 6s ease-in-out infinite',
        'float-delay':   'float 6s ease-in-out 2s infinite',
        'glow-pulse':    'glowPulse 3s ease-in-out infinite',
        'spin-slow':     'spin 8s linear infinite',
        'bounce-soft':   'bounceSoft 2s ease-in-out infinite',
        'scale-in':      'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        'shimmer':       'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%':   { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        skeleton: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', filter: 'blur(20px)' },
          '50%':      { opacity: '0.8', filter: 'blur(28px)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
