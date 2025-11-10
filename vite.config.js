import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: process.env.VITE_BASE_URL || '/',
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
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              return 'vendor';
            }
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
          target: 'http://localhost:5001',
          changeOrigin: true,
          secure: false
        }
      }
    }
  };
});
