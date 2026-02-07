import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Only load lovable-tagger in Lovable environment
  const plugins = [react()];
  
  if (mode === 'development') {
    try {
      // This will only work in Lovable environment
      const { componentTagger } = require("lovable-tagger");
      plugins.push(componentTagger());
    } catch {
      // Ignore error when running locally without lovable-tagger
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      exclude: ["lucide-react"],
    },
  };
});
