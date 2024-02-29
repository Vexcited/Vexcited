import { defineConfig } from "vite";
import path from "path";

import solid from "vite-plugin-solid";
import unocss from "unocss/vite";

export default defineConfig({
  plugins: [unocss(), solid()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },

  server: {
    strictPort: true,
    port: 3000
  }
});
