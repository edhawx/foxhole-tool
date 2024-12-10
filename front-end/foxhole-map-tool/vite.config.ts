import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/foxhole-tool/", // Match the homepage URL
  plugins: [react()],
});