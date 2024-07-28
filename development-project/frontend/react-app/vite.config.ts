/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    coverage: {
      reporter: ["text", "html"],
      exclude: ["node_modules/", "tests/"], // Files or directories to exclude from coverage
    },
  },
});
