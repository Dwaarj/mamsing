import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  base: "/mamsing/"
});
// base "./" gör att sidan fungerar på Netlify, Vercel och GitHub Pages
export default defineConfig({ plugins: [react()], base: "./" });
