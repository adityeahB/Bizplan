export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#0f3b3f',
        accent: '#d68c3c',
      }
    },
  },
  plugins: [],
}
