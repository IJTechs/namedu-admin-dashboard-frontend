import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import dynamicImport from 'vite-plugin-dynamic-import';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    // Plugins
    plugins: [
      react(),

      isProduction &&
        visualizer({
          filename: './dist/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),

      viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
      viteCompression({ algorithm: 'gzip', ext: '.gz' }),
      dynamicImport(),
    ],

    // Path alias
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

    // Server settings
    server: {
      port: 3000,
      open: true,
    },

    // Build settings
    build: {
      target: 'esnext',

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

      sourcemap: false,

      cssCodeSplit: true,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },

    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  };
});
