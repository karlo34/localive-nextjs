module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // if using the app directory
  ],
  theme: {
    extend: {
      keyframes: {
        slideFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slideFadeIn: 'slideFadeIn 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};
