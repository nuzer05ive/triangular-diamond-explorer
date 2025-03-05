import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      "text/html": ["html"] // Ensure Vite serves HTML correctly
    },
    headers: {
      "Content-Type": "text/html" // Explicitly set the correct MIME type
    }
  },
  publicDir: "public",
  build: {
    outDir: "dist",
  }
});
