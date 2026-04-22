import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [tailwindcss(), tanstackStart(), viteReact()],
  server: {
    port: 3000,
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/')) {
              return 'vendor-react';
            }

            if (id.includes('/node_modules/@tanstack/')) {
              return 'vendor-tanstack';
            }

            if (id.includes('/node_modules/@base-ui/')) {
              return 'vendor-base-ui';
            }

            if (id.includes('/node_modules/lucide-react/')) {
              return 'vendor-icons';
            }

            if (id.includes('/node_modules/sonner/')) {
              return 'vendor-sonner';
            }

            if (id.includes('/node_modules/@lottiefiles/')) {
              return 'vendor-lottie';
            }

            return 'vendor-misc';
          }
          return undefined;
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
});

export default config;
