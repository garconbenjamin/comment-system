import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = { plugins: [react(), tsconfigPaths()] };
  config.test = {
    globals: true,
    environment: "happy-dom",
  };

  return config;
});
