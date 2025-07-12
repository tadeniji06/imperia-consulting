import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  ssr: {
    noExternal: ["react-router-dom"],
    target: "node"
  },
  optimizeDeps: {
    include: ["react-router-dom"]
  },
  build: {
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  }
});
