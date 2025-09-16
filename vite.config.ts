import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { webcrypto as nodeCrypto } from 'node:crypto';

// Polyfill crypto for environments where it may be missing
interface CryptoHost { crypto?: Crypto }
const globalCryptoHost = globalThis as unknown as CryptoHost;
if (!globalCryptoHost.crypto || typeof globalCryptoHost.crypto.getRandomValues !== 'function') {
  globalCryptoHost.crypto = nodeCrypto as unknown as Crypto;
}

export default defineConfig({
  base: '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion', 'typewriter-effect'],
        },
      },
    },
  },
  sourcemap: true,
});