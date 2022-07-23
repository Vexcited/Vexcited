import solidPlugin from "vite-plugin-solid";
import WindiCSS from "vite-plugin-windicss";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [
    solidPlugin(),
    WindiCSS()
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },

  build: {
    target: "esnext",
    polyfillDynamicImport: false
  }
});
