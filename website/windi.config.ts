import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";

import aspectRatioPlugin from "windicss/plugin/aspect-ratio";

export default defineConfig({
  darkMode: false,
  attributify: false,

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
      },
      transparent: colors.transparent
    },
    
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      mono: ["FiraCode", "monospace"]
    }
  },

  plugins: [aspectRatioPlugin]
});
