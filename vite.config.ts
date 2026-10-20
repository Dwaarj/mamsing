import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// base "./" gör att sidan fungerar på Netlify, Vercel och GitHub Pages
export default defineConfig({ plugins: [react()], base: "./" });
