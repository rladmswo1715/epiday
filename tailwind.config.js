/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'var-black-100': '#F9F9F9',
        'var-black-200': '#6B6B6B',
        'var-black-300': '#5E5E5E',
        'var-black-400': '#525252',
        'var-black-500': '#454545',
        'var-black-600': '#373737',
        'var-black-700': '#2B2B2B',
        'var-black-800': '#1F1F1F',
        'var-black-900': '#121212',
        'var-black-950': '#050505',
        'var-blue-100': '#FFFFFF',
        'var-blue-200': '#ECEFF4',
        'var-blue-300': '#CBD3E1',
        'var-blue-400': '#ABB8CE',
        'var-blue-500': '#8B9DBC',
        'var-blue-600': '#6A82A9',
        'var-blue-700': '#52698E',
        'var-blue-800': '#40516E',
        'var-blue-900': '#2D394E',
        'var-blue-950': '#1A212D',
        'var-background': '#F5F7FA',
        'var-error': '#FF6577',
        'var-gray-100': '#DEDEDE',
        'var-gray-200': '#C4C4C4',
        'var-gray-300': '#ABABAB',
        'var-gray-400': '#919191',
        'var-line-100': '#F2F2F2',
        'var-line-200': '#CFDBEA',
        'var-illust-yellow': '#FBC85B',
        'var-illust-green': '#48BB98',
        'var-illust-purple': '#8E80E3',
        'var-illust-blue': '#5195EE',
        'var-illust-red': '#E46E80',
        'var-illust-brown': '#9A695E',
        'var-illust-sub-yellow': '#E8AA26',
        'var-illust-sub-blue-1': '#3E3E3E',
        'var-illust-sub-blue-2': '#3E414D',
        'var-illust-sub-blue-3': '#494D59',
        'var-illust-sub-gray-1': '#C7D1E0',
        'var-illust-sub-gray-2': '#E3E9F1',
        'var-illust-sub-gray-3': '#EFF3F8',
        'var-background-emotion': 'rgba(175, 186, 205, 0.15)',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        iropke: ['Iropke', 'sans-serif'],
      },
      screens: {
        sm: { max: '768px' }, // mobile
        md: { max: '1024px' }, // tablet
      },
      zIndex: {
        dropdown: 900,
        sticky: 980,
        fixed: 981,
        modalBackdrop: 990,
        modal: 991,
      },
      quotes: {
        none: 'none',
      },
      boxShadow: {
        feed: '0px 3px 12px 0px rgba(0, 0, 0, 0.04)',
        mypage: '0px 0px 36px 0px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    function ({ addUtilities }) {
      addUtilities({
        '.quotes-none': {
          quotes: 'none',
        },
      });
    },
  ],
};
