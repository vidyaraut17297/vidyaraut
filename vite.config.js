import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Dynamic base path based on environment
  const getBasePath = () => {
    // If VERCEL environment variable is set, use root path (for Vercel)
    if (process.env.VERCEL) {
      return '/';
    }
    // If building for GitHub Pages, use subdirectory
    if (process.env.GITHUB_PAGES === 'true' || mode === 'production' && process.env.NODE_ENV === 'production') {
      return '/vidyaraut/';
    }
    // Default to root for local development
    return '/';
  };

  return {
    plugins: [react()],
    base: getBasePath(),
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
            vendor: ['react', 'react-dom']
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
  };
});
