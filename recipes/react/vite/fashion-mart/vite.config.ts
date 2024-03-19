import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicssl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicssl()],
});
