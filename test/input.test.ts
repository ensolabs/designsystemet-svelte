// Input's `indeterminate`: React has no prop for it and sets it by ref, so it must stay a DOM property, never an attribute.
import { flushSync, mount } from 'svelte';
import { expect, test } from 'vitest';
import Input from '../src/input/Input.svelte';

test('bind:indeterminate sets the property and writes no attribute', () => {
  const target = document.body.appendChild(document.createElement('div'));
  mount(Input, { target, props: { type: 'checkbox', indeterminate: true } });
  flushSync();
  const input = target.querySelector('input')!;
  expect(input.indeterminate).toBe(true);
  expect(input.hasAttribute('indeterminate')).toBe(false);
});
