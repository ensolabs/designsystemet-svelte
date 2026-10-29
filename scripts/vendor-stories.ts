// Copies Digdir's Storybook stories for the version this port mirrors into test/upstream/, as they are, so the parity
// test can render each upstream story with @digdir/designsystemet-react and compare it with its Svelte twin.
//
//   bun scripts/vendor-stories.ts
//
// The tree keeps upstream's layout (packages/react/src/…, packages/react/stories/…, designsystemet.config.json), so
// the stories' own relative imports resolve; vitest.config.ts maps the rest (see upstreamStories there).
import { $ } from 'bun';
import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import pkg from '../package.json';

const root = join(import.meta.dir, '..');
const out = join(root, 'test/upstream');
const tag = `v${pkg.version}`;
const tmp = join(root, 'node_modules/.cache/designsystemet-upstream');

await rm(tmp, { recursive: true, force: true });
await $`git -c advice.detachedHead=false clone --quiet --depth 1 --branch ${tag} https://github.com/digdir/designsystemet.git ${tmp}`;
const commit = (await $`git -C ${tmp} rev-parse HEAD`.text()).trim();

await rm(out, { recursive: true, force: true });
const files = [
  ...new Bun.Glob('packages/react/src/**/*.stories.tsx').scanSync(tmp),
  // The data of the Combobox stories.
  'packages/react/src/components/Combobox/data/data.ts',
  'packages/react/stories/constants.tsx',
  'designsystemet.config.json',
  'LICENSE',
].sort();
for (const file of files) {
  await mkdir(dirname(join(out, file)), { recursive: true });
  await cp(join(tmp, file), join(out, file));
}
await Bun.write(
  join(out, 'README.md'),
  `# Upstream stories

Copied by \`scripts/vendor-stories.ts\` from [digdir/designsystemet](https://github.com/digdir/designsystemet) at \`${tag}\`
(${commit}), unchanged. MIT, © Digitaliseringsdirektoratet; see [LICENSE](LICENSE). Don't edit these files; run the script
again when upgrading.
`,
);
await rm(tmp, { recursive: true, force: true });
console.log(`${files.length} files from ${tag} (${commit.slice(0, 7)}) → test/upstream/`);
