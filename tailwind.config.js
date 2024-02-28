/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBg: '#fff',
        textBaseColor: '#ccc'
      }
    },
    screens: {
      mobileSmall: '320px',
      mobileLarge: '425px',
      tabletSmall: '640px',
      tablet: '768px',
      tabletLarge: '962px',
      desktop: '1024px',
      desktopLarge: '1440px'
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    })
  ]
}
