// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.json'] // Dosya uzantılarını belirtin
  },
  // JSX dosyalarını doğrudan tarayıcıya sunmayı engelleyin
  server: {
    fs: {
      strict: true,
    },
  },
});