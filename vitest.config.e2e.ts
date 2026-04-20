import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    include: ["src/http/**/*.spec.ts"],
    setupFiles: ["src/vitest-e2e-setup.ts"],
    fileParallelism: false,
  },
});
