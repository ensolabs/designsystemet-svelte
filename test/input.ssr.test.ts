// Input's `indeterminate` on the server: a DOM property only, so the HTML has no attribute for it, as with React.
import { render } from 'svelte/server';
import { expect, test } from 'vitest';
import Input from '../src/input/Input.svelte';

test('indeterminate is never written to the HTML', () => {
  expect(render(Input, { props: { type: 'checkbox', indeterminate: true } }).body).not.toContain('indeterminate');
});
