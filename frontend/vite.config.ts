import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/src/main/resources/static',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
