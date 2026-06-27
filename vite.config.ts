import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/CV.-Bisnis-Pro-Komputama/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})