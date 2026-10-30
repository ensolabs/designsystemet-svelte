// Checks npm for a Designsystemet release newer than the one this package matches: the `latest` version of every
// @digdir/* package in package.json, compared with `version`.
//
//   bun scripts/check-upstream.ts
//
// Prints what it found. In GitHub Actions it also writes `current`, `latest` and `outdated` (true or false) to the
// step's outputs, for .github/workflows/upstream.yml. Exits non-zero only when npm can't be read.
import { appendFileSync } from 'node:fs';
import pkg from '../package.json';

const names = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies, ...pkg.devDependencies }).filter((name) =>
  name.startsWith('@digdir/'),
);

async function latest(name: string): Promise<string> {
  const response = await fetch(`https://registry.npmjs.org/-/package/${name.replace('/', '%2F')}/dist-tags`);
  if (!response.ok) throw new Error(`npm answered ${response.status} for ${name}`);
  const tags = (await response.json()) as Record<string, string>;
  if (!tags.latest) throw new Error(`${name} has no latest tag on npm`);
  return tags.latest;
}

/** Compares x.y.z versions; release versions only, which is all `latest` holds. */
const compare = (a: string, b: string) => {
  const [x, y] = [a, b].map((v) => v.split('.').map(Number));
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
};

const versions = Object.fromEntries(await Promise.all(names.map(async (name) => [name, await latest(name)] as const)));
const newest = Object.values(versions).reduce((a, b) => (compare(a, b) >= 0 ? a : b));
const outdated = compare(newest, pkg.version) > 0;

for (const [name, version] of Object.entries(versions)) console.log(`${name}: ${version} on npm`);
console.log(
  outdated
    ? `Designsystemet ${newest} is out; this package matches ${pkg.version}.`
    : `Up to date: this package matches ${pkg.version}, the latest release.`,
);

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `current=${pkg.version}\nlatest=${newest}\noutdated=${outdated}\n`);
}
