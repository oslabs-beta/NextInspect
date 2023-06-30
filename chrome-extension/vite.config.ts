import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import makeManifest from './utils/plugins/make-manifest'
import manifest from './manifest'

const isDev = process.env.__DEV__ === 'true'
const isProduction = !isDev

export default defineConfig({
  // plugins: [react(), makeManifest(manifest, { isDev })],
  plugins: [react()],
  build: {
    outDir: './dist',
    rollupOptions: {
      input: {
        devtools: './src/pages/devtools/index.html',
        panel: './src/pages/panel/index.html',
      },
    },
  },
})
