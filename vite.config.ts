import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import dynamicImport from 'vite-plugin-dynamic-import';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      gzipSize: true,
    }),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    dynamicImport(),
  ],

  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug'],
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
        assetFileNames: 'assets/[name].[ext]',
      },
      treeshake: true,
    },
    chunkSizeWarningLimit: 1000,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@react-query': path.resolve(__dirname, './src/react-query'),
      '@requests': path.resolve(__dirname, './src/requests'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@services': path.resolve(__dirname, './src/services'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  server: {
    port: 3000,
    open: true,
    allowedHosts: true,
  },
});
