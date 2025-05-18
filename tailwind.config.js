/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0A2342', // Темно-синий
          navy: '#051A30', // Еще темнее синий для фона
          teal: '#2CA58D', // Бирюзовый акцент
          lightGray: '#F0F4F8', // Очень светлый серый для фона секций
          gray: '#A0AEC0', // Серый для текста
          darkGray: '#4A5568', // Темно-серый для текста
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Используем шрифт Inter
      },
      animation: {
        'text-focus-in': 'text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        'tracking-in-expand': 'tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both',
      },
      keyframes: {
        'text-focus-in': {
          '0%': {
            filter: 'blur(12px)',
            opacity: '0',
          },
          '100%': {
            filter: 'blur(0px)',
            opacity: '1',
          },
        },
        'tracking-in-expand': {
          '0%': {
            'letter-spacing': '-.5em',
            opacity: '0',
          },
          '40%': {
            opacity: '.6',
          },
          '100%': {
            opacity: '1',
          },
        }
      }
    },
  },
  plugins: [],
};