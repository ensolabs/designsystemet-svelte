// Checks that this port, Digdir's packages and the vendored stories all name the same upstream version: `version` in
// package.json, every @digdir/* dependency (pinned exactly), and the tag in test/upstream/README.md.
import pkg from '../package.json';

const problems: string[] = [];
const all = { ...pkg.dependencies, ...pkg.peerDependencies, ...pkg.devDependencies } as Record<string, string>;
for (const [name, range] of Object.entries(all)) {
  if (name.startsWith('@digdir/') && range !== pkg.version) problems.push(`${name} is ${range}, not ${pkg.version}`);
}
const vendored = /`v([\d.]+)`/.exec(await Bun.file(new URL('../test/upstream/README.md', import.meta.url)).text())?.[1];
if (vendored !== pkg.version) problems.push(`test/upstream/ holds stories from v${vendored}, not v${pkg.version}; run bun run vendor:stories`);

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`All at ${pkg.version}.`);
