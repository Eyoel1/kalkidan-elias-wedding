import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    modulePreload: false, // Prevents modulePreload CORS issues on Cloudflare Pages
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        format: 'iife', // Self-contained IIFE bundle or ESM without CORS requirements
        inlineDynamicImports: true
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
