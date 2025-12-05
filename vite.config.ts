/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
import path, { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(dirname, 'lib/index.ts'),
      name: 'ReactPrioritisedMounts',
      formats: ['es', 'cjs'],
      fileName: (format) => `react-prioritised-mounts.${format === 'es' ? 'mjs' : 'cjs'}`
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['lib/**/*.test.ts*'],
    setupFiles: ['./vitest.setup.ts'],
  }
});