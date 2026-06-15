import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/create-room': 'http://localhost:3000',
      '/room': 'http://localhost:3000',
      '/getdata': 'http://localhost:3000',
      '/savetext': 'http://localhost:3000'
    }
  }
})
