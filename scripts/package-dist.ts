// Writes the package as installed, to package/: the compiled dist/ (run `bun run build` first), the README, LICENSE and
// AI_DISCLOSURE.md, and a package.json whose entry points name dist/ instead of src/. CI commits it to the `dist`
// branch, which is what to install from GitHub until the package is on npm; npm will get the same folder.
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import pkg from '../package.json';

const root = new URL('../', import.meta.url).pathname;
const out = `${root}package/`;
if (!existsSync(`${root}dist/index.js`)) throw new Error('dist/ is missing; run bun run build first');

/** `./src/x.ts` → `./dist/x.js`, or `./dist/x.d.ts` for types. */
const toDist = (path: string, types = false) => {
  if (!/^\.\/src\/.*\.ts$/.test(path)) throw new Error(`Don't know where ${path} goes in dist/`);
  return path.replace(/^\.\/src\//, './dist/').replace(/\.ts$/, types ? '.d.ts' : '.js');
};
/** An exports or imports entry, with each condition's path moved to dist/. */
const entry = (conditions: Record<string, string>) =>
  Object.fromEntries(Object.entries(conditions).map(([condition, path]) => [condition, toDist(path, condition === 'types')]));

const { scripts: _scripts, devDependencies: _devDependencies, ...rest } = pkg;
const manifest = {
  ...rest,
  sideEffects: pkg.sideEffects.map((path) => toDist(path)),
  svelte: toDist(pkg.svelte),
  types: toDist(pkg.types, true),
  exports: { '.': entry(pkg.exports['.']), './package.json': './package.json' },
  imports: Object.fromEntries(Object.entries(pkg.imports).map(([name, conditions]) => [name, entry(conditions)])),
  files: ['dist'],
};

rmSync(out, { recursive: true, force: true });
mkdirSync(out);
cpSync(`${root}dist`, `${out}dist`, { recursive: true });
for (const file of ['README.md', 'LICENSE', 'AI_DISCLOSURE.md']) cpSync(`${root}${file}`, `${out}${file}`);
writeFileSync(`${out}package.json`, JSON.stringify(manifest, null, 2) + '\n');
console.log(`package/: ${pkg.name}@${pkg.version}, entry points in dist/`);
