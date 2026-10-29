import { svelte } from '@sveltejs/vite-plugin-svelte';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig, type Plugin } from 'vitest/config';

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));

/**
 * Resolves the imports of Digdir's stories in test/upstream/: Storybook's preview and test helpers go to the stand-ins
 * in test/storybook/, and an import of upstream source that isn't vendored (`'../'`, `'./button'`, `'../../utilities'`)
 * goes to the published @digdir/designsystemet-react, the package the stories are compared against.
 */
function upstreamStories(): Plugin {
  const upstream = here('./test/upstream/');
  return {
    name: 'upstream-stories',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!importer?.startsWith(upstream)) return null;
      if (/\.storybook\/preview$/.test(source)) return here('./test/storybook/runtime.tsx');
      if (source === 'storybook/test') return here('./test/storybook/storybook-test.ts');
      if (source === 'storybook/preview-api') return here('./test/storybook/preview-api.ts');
      if (!source.startsWith('.')) return null;
      const vendored = await this.resolve(source, importer, { skipSelf: true });
      if (vendored && !vendored.id.endsWith('/')) return vendored;
      return this.resolve('@digdir/designsystemet-react', importer, { skipSelf: true });
    },
  };
}

// Two projects:
//   dom  mounts Digdir's React components and ours in jsdom, in the browser builds, and compares the DOM they leave.
//   ssr  renders both to HTML on the server (react-dom/server, svelte/server) and compares that.
export default defineConfig({
  plugins: [upstreamStories(), react(), svelte()],
  test: {
    projects: [
      {
        extends: true,
        resolve: { conditions: ['browser'] },
        test: {
          name: 'dom',
          environment: 'jsdom',
          include: ['test/**/*.test.{ts,tsx}'],
          exclude: [...configDefaults.exclude, 'test/**/*.ssr.test.{ts,tsx}', 'test/upstream/**'],
          setupFiles: ['test/setup.ts'],
        },
      },
      {
        extends: true,
        test: { name: 'ssr', environment: 'node', include: ['test/**/*.ssr.test.{ts,tsx}'] },
      },
    ],
  },
});
