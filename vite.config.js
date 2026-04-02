import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  optimizeDeps: {
    include: ['pdfmake']
  },
  build: {
    commonjsOptions: {
      include: [/pdfmake/, /node_modules/]
    }
  }
})
