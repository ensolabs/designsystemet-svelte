// Checks that this port, Digdir's packages and the vendored stories all name the same upstream version: `version` in
// package.json, every @digdir/* dependency (pinned exactly), and the tag in test/upstream/README.md.
// On npm, a fix to the port alone is published as `x.y.z-fix.N` (see CONTRIBUTING.md); `x.y.z` is still the upstream version.
import pkg from '../package.json';

const upstream = /^(\d+\.\d+\.\d+)(?:-fix\.\d+)?$/.exec(pkg.version)?.[1];
const problems: string[] = upstream ? [] : [`version ${pkg.version} is neither x.y.z nor x.y.z-fix.N`];
const all = { ...pkg.dependencies, ...pkg.peerDependencies, ...pkg.devDependencies } as Record<string, string>;
for (const [name, range] of Object.entries(all)) {
  if (name.startsWith('@digdir/') && range !== upstream) problems.push(`${name} is ${range}, not ${upstream}`);
}
const vendored = /`v([\d.]+)`/.exec(await Bun.file(new URL('../test/upstream/README.md', import.meta.url)).text())?.[1];
if (vendored !== upstream) problems.push(`test/upstream/ holds stories from v${vendored}, not v${upstream}; run bun run vendor:stories`);

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`All at ${upstream}${pkg.version === upstream ? '' : ` (${pkg.version})`}.`);
