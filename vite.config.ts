import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          if (id.includes("@react-three")) {
            return "r3f-vendor";
          }

          if (id.includes("three") || id.includes("three-stdlib")) {
            return "three-core";
          }

          if (id.includes("gsap") || id.includes("@studio-freight/lenis")) {
            return "motion-vendor";
          }

          if (id.includes("react")) {
            return "react-vendor";
          }

          return undefined;
        },
      },
    },
  },
});
