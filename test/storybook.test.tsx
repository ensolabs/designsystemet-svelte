// Every upstream story, mounted in jsdom with Digdir's React components and with its Svelte twin: the DOMs must match.
import { describe, expect, test } from 'vitest';
import { both } from './parity';
import { cases } from './storybook/cases';

describe.each([...new Set(cases.map((c) => c.file))])('%s', (file) => {
  for (const c of cases.filter((c) => c.file === file)) {
    if (c.skip) {
      test.skip(`${c.name} (${c.skip})`, () => {});
      continue;
    }
    test(c.name, async () => {
      expect(c.svelte, `no twin: export a snippet named ${c.name} from test/storybook/twins/${file}.svelte, or list it with the reason in test/storybook/skipped/${file}.json`).toBeDefined();
      const out = await both(c.react(), c.svelte!);
      expect(out.svelte).toBe(out.react);
    });
  }
});
