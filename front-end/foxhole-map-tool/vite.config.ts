import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/foxhole-tool/front-end/foxhole-map-tool/", // Match the `homepage` path
  plugins: [react()],
});