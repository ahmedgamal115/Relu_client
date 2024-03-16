/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/Compnents/Navbar.jsx',
    'src/Compnents/MainBox.jsx',
    'src/Compnents/AboutRelu.jsx',
    'src/Compnents/DisplayProducts.jsx',
    'src/Compnents/Footer.jsx',
    'src/Compnents/ProductsDetails.jsx',
    'src/Compnents/CustomDetails.jsx',
  ],
  theme: {
    extend: {
      backgroundColor:{
        'layout': 'rgb(0 0 0 / 53%)',
      },
      boxShadow:{
        'cardShadow': `-1px 3px 13px 2px rgba(0,0,0,0.75)`
      }
    },
  },
  plugins: [],
}

