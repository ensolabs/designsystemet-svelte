// Every export of @digdir/designsystemet-react is exported here under the same name, with the same compound parts.
import * as React from '@digdir/designsystemet-react';
import { expect, test } from 'vitest';
import * as Svelte from '../src';

test('every upstream component is exported', () => {
  const missing = Object.keys(React).filter((name) => !(name in Svelte));
  expect(missing).toEqual([]);
});

test('every compound part is there, as in React', () => {
  const parts: string[] = [];
  for (const [name, component] of Object.entries(React)) {
    if (typeof component !== 'object' && typeof component !== 'function') continue;
    for (const part of Object.keys(component)) {
      if (!/^[A-Z]/.test(part) || part === 'Context') continue;
      if (!(part in ((Svelte as Record<string, any>)[name] ?? {}))) parts.push(`${name}.${part}`);
    }
  }
  expect(parts).toEqual([]);
});
