import { defineConfig } from "vite";
import path from "path";

import solid from "vite-plugin-solid";
import windicss from "vite-plugin-windicss";

export default defineConfig({
  plugins: [
    solid(),
    windicss()
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },

  server: {
    port: 3000
  },

  build: {
    target: "esnext"
  }
});
