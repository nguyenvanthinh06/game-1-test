import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import obfuscator from 'vite-plugin-javascript-obfuscator';
// import { resolve } from 'node:path'
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// Vite config for both dev (app) and library build.
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: { customElement: true }
    }),
    // obfuscator({
    //   options: {
    //     compact: true,
    //     // QUAN TRỌNG: Tránh làm rối tên các thuộc tính truyền từ ngoài vào (props)
    //     reservedNames: ['token', 'apiUrl', 'locales', 'currency', 'total_amount'],
    //     // Tắt các tính năng gây lỗi runtime cao
    //     controlFlowFlattening: false, 
    //     deadCodeInjection: false,
    //     debugProtection: false,
    //     // Giữ lại cấu trúc Module để không lỗi "import outside a module"
    //     target: 'browser',
    //     sourceMap: false,
    //     stringArray: true,
    //     stringArrayThreshold: 0.75,
    //     unicodeEscapeSequence: false
    //   },
    //   // Chỉ obfuscate file bundle cuối cùng, không làm rối code svelte gốc
    //   apply: 'build' 
    // })
    // cssInjectedByJsPlugin()
  ],
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'MyGame',
      fileName: 'game-core',
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
