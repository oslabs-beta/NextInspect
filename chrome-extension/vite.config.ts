import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.json',
          dest: './',
        },
      ],
    }),
  ],
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
