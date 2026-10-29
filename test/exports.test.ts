// Every component @digdir/designsystemet-react exports is exported here under the same name, apart from the ones
// listed with a reason.
import * as React from '@digdir/designsystemet-react';
import { expect, test } from 'vitest';
import * as Svelte from '../src';

const NOT_PORTED: Record<string, string> = {
  Combobox: 'deprecated upstream; use EXPERIMENTAL_Suggestion',
  ComboboxEmpty: 'deprecated upstream',
  ComboboxOption: 'deprecated upstream',
  RovingFocusRoot: 'unused by the 1.23.0 components; designsystemet-web handles arrow keys (focusgroup)',
  RovingFocusItem: 'unused by the 1.23.0 components',
  useCheckboxGroup: 'use bind:group',
  useRadioGroup: 'use bind:group',
  usePagination: 'ported as pagination()',
  useDebounceCallback: 'a React hook, deprecated upstream',
  useIsomorphicLayoutEffect: 'a React hook, deprecated upstream',
  useMediaQuery: 'a React hook, deprecated upstream',
  useSynchronizedAnimation: 'internal; the components use the synchronizedAnimation attachment',
  omit: 'a utility for React props',
};

test('every upstream component is exported', () => {
  const missing = Object.keys(React).filter((name) => !(name in NOT_PORTED) && !(name in Svelte));
  expect(missing).toEqual([]);
});

test('every compound part is there, as in React', () => {
  const parts: string[] = [];
  for (const [name, component] of Object.entries(React)) {
    if (typeof component !== 'object' && typeof component !== 'function') continue;
    for (const part of Object.keys(component)) {
      if (!/^[A-Z]/.test(part) || part === 'Context' || name in NOT_PORTED) continue;
      if (!(part in ((Svelte as Record<string, any>)[name] ?? {}))) parts.push(`${name}.${part}`);
    }
  }
  expect(parts).toEqual([]);
});
