import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const DEFAULT_API_PROXY_TARGET = 'http://localhost:3001'
// GitHub Pages serves the site from /<repo-name>/
const DEFAULT_BUILD_BASE_PATH = '/visa_project/'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, projectRoot, '')

  return {
    base:
      command === 'build' ? env.BASE_PATH || DEFAULT_BUILD_BASE_PATH : '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': env.API_PROXY_TARGET || DEFAULT_API_PROXY_TARGET,
      },
    },
  }
})
