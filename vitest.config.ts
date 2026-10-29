import { svelte } from '@sveltejs/vite-plugin-svelte';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Mounts Digdir's React components and ours in jsdom, in the browser builds, and compares the DOM they leave.
export default defineConfig({
  plugins: [react(), svelte()],
  resolve: { conditions: ['browser'] },
  test: { environment: 'jsdom', include: ['test/**/*.test.{ts,tsx}'], setupFiles: ['test/setup.ts'] },
});
