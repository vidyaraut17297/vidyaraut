import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' && process.env.GITHUB_PAGES === 'true' ? '/vidyaraut/' : '/',
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@sections': '/src/sections',
      '@styles': '/src/styles',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@data': '/src/data'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          gsap: ['gsap', 'gsap/ScrollTrigger']
        }
      }
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
}));