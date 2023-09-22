import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";
import { fileURLToPath, URL } from "node:url";
// https://vitejs.dev/config/
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
