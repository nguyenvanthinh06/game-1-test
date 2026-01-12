import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
// import obfuscator from 'vite-plugin-javascript-obfuscator';
// import { resolve } from 'node:path'
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// Vite config for both dev (app) and library build.
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: { customElement: true }
    }),
    // cssInjectedByJsPlugin()
  ],
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'Game1Test',
      fileName: 'game-1-test',
      formats: ['iife']
    },
    assetsInlineLimit: 4096,
    rollupOptions: {
      external: ['pixi.js'],
      output: {
        globals: {
          'pixi.js': 'PIXI',
        },
      },
    },
    minify: 'terser',
    cssCodeSplit: false,
    cssMinify: true,
    terserOptions: {
      compress: { drop_console: true } // Xóa console.log khi production
    }
  }
})
