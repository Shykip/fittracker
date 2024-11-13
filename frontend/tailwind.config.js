/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        backgroud: '#0F0F0F',
        highlight: '#F3FF47',
        container: '#1F1F1F',
        link: '#59D7FF',
        text: '#FFFFFF',
        dimtext: '#777777',
        dark: '#000000',
        lightdark: '#303030'
      },
      fontSize: {
        header: '1.875rem',
        normal: '1.25rem',
        title: '2.6rem',
        subtitle: '1.7rem',
        text: '1.1rem'
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        slideInLeft: 'slideInLeft 0.5s ease-out forwards',
        slideInTop: 'slideInTop 0.5s ease-out forwards',
      },
      height: {
        '1/7': '14%',
        '6/7': '86%',
      }


    },
  },
  plugins: [require('tailwind-scrollbar'),],
}