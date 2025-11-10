import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from 'path'

// https://vite.dev/config/


export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve
: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})


// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true, // this is the key part to allow phone access
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         secure: false
//       }
//     }
//   }
// });
