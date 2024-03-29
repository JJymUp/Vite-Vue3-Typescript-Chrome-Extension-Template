import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    copy({
      targets: [
        { src: "manifest.json", dest: "dist" },
        { src: "src/assets", dest: "dist" },
      ],
      hook: "writeBundle",
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        index: 'index.html', // main page
        'background/background-service': 'src/background/background-service.ts',
        'content/content': 'src/content/content.ts' 
      },
      output: {
        entryFileNames: (chunkInfo) => {
          console.log(chunkInfo);
          if (chunkInfo.name === 'index') {
            return 'assets/[name].[hash].js';
          }
          return '[name].js';
        },
        dir: 'dist',
      }
    }
  }
})
