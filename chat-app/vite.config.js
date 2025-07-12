import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/signalr-react-ui.vercel.app/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
