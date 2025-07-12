import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Optimize bundle size with code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries
          vendor: ['react', 'react-dom'],
          // Animation libraries
          animations: ['framer-motion', 'gsap'],
          // Three.js and related
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          // UI libraries
          ui: ['lucide-react', 'react-intersection-observer']
        }
      }
    },
    // Production optimizations
    sourcemap: false, // Disable source maps in production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
        drop_debugger: true, // Remove debugger statements
        pure_funcs: ['console.log', 'console.info', 'console.debug'] // Remove specific console methods
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'three']
  }
})
