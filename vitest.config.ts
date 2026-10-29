import { svelte } from '@sveltejs/vite-plugin-svelte';
import react from '@vitejs/plugin-react';
import { webdriverio } from '@vitest/browser-webdriverio';
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

// Three projects:
//   dom      mounts Digdir's React components and ours in jsdom, in the browser builds, and compares the DOM they leave.
//   ssr      renders both to HTML on the server (react-dom/server, svelte/server) and compares that.
//   browser  mounts both in headless Chrome (WebdriverIO), styled by @digdir/designsystemet-css and its default theme,
//            runs Digdir's play functions on both, and compares DOM and layout. Chrome is the one WebdriverIO finds
//            (or downloads), or the binary in CHROME_BIN.
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
          exclude: [...configDefaults.exclude, 'test/**/*.{ssr,browser}.test.{ts,tsx}', 'test/upstream/**'],
          setupFiles: ['test/setup.ts'],
          // jsdom is slow with Combobox's ThousandsOfOptions story: about 3 s here, over 5 s on GitHub's runners.
          testTimeout: 30_000,
        },
      },
      {
        extends: true,
        test: { name: 'ssr', environment: 'node', include: ['test/**/*.ssr.test.{ts,tsx}'] },
      },
      {
        extends: true,
        // Prebundled up front: found one by one while the stories load, they would be bundled again mid-run, and the
        // page would end up with two copies of React.
        optimizeDeps: {
          include: [
            'react',
            'react/jsx-runtime',
            'react/jsx-dev-runtime',
            'react-dom',
            'react-dom/client',
            '@digdir/designsystemet-react',
            '@digdir/designsystemet-web',
            '@navikt/aksel-icons',
            'react-dropzone',
            '@testing-library/dom',
            '@testing-library/user-event',
            '@testing-library/jest-dom/matchers',
          ],
        },
        test: {
          name: 'browser',
          include: ['test/**/*.browser.test.{ts,tsx}'],
          setupFiles: ['test/browser-setup.ts'],
          testTimeout: 60_000,
          browser: {
            enabled: true,
            headless: true,
            screenshotFailures: false,
            viewport: { width: 1280, height: 800 },
            provider: webdriverio({
              capabilities: {
                'goog:chromeOptions': {
                  ...(process.env.CHROME_BIN && { binary: process.env.CHROME_BIN }),
                  // GitHub's Ubuntu runners don't let Chrome set up its sandbox.
                  ...(process.env.CI && { args: ['--no-sandbox'] }),
                },
              },
            }),
            instances: [{ browser: 'chrome' }],
          },
        },
      },
    ],
  },
});
