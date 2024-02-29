import { defineConfig, transformerVariantGroup } from "unocss";

export default defineConfig({
  transformers: [transformerVariantGroup()],

  theme: {
    colors: {
      grey: {
        dark: "#232634",
        DEFAULT: "#303446",
        light: "#363a4f"
      },
      white: {
        dark: "#D8DEE9",
        DEFAULT: "#E5E9F0",
        light: "#ECEFF4"
      },
      blue: {
        dark: "#8839ef",
        DEFAULT: "#c6a0f6",
        light: "#b7bdf8"
      }
    },

    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      mono: ["FiraCode", "monospace"]
    }
  }
});
