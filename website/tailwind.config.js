module.exports = {
  purge: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: false,
  theme: {
    colors: {
      grey: {
        dark: "#2E3440",
        DEFAULT: "#3B4252",
        light: "#434C5E"
      },
      white: {
        dark: "#D8DEE9",
        DEFAULT: "#E5E9F0",
        light: "#ECEFF4"
      },
      blue: {
        dark: "#5E81AC",
        DEFAULT: "#88C0D0",
        light: "#8FBCBB"
      }
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"]
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
