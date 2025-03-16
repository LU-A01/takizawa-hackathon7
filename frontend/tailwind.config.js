/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'theme': {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          accent: 'var(--color-text-accent)',
          'accent-hover': 'var(--color-bg-accent-hover)',
        },
        'green': {
          'light': '#6EE7B7', // 明るい葉の色 
          'mid': '#059669',   // 新鮮な野菜の色
          'deep': '#166534',  // 森林の緑
        }
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-in-out',
        'slide-in': 'slideIn 1.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
