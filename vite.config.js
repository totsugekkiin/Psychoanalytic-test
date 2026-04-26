import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 项目页地址为 /<仓库名>/，开发时仍用根路径
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/Psychoanalytic-test/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
  },
}))
