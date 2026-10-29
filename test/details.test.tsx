// Details' open state, as React's: uncontrolled, defaultOpen, controlled by `open` (the element goes back to `open` after
// a toggle unless the parent changes it), and Svelte's bind:open.
import { Details } from '@digdir/designsystemet-react';
import { useState, type ComponentProps } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { click, mountReact, mountSvelte, steps } from './interaction';
import DetailsToggle from './stories/content/DetailsToggle.svelte';

const summary = (root: HTMLElement) => click(root.querySelector('summary')!);
const isOpen = (root: HTMLElement) => (root.querySelector('details') as HTMLDetailsElement).open;

function Following({ initial }: { initial: boolean }) {
  const [open, setOpen] = useState(initial);
  return (
    <Details open={open} onToggle={() => setOpen(!open)}>
      <Details.Summary>Mer</Details.Summary>
      <Details.Content>Innhold</Details.Content>
    </Details>
  );
}

const ReactDetails = (props: { open?: boolean; defaultOpen?: boolean; onToggle?: () => void }) => (
  <Details {...(props as ComponentProps<typeof Details>)}>
    <Details.Summary>Mer</Details.Summary>
    <Details.Content>Innhold</Details.Content>
  </Details>
);

describe('Details', () => {
  test('uncontrolled: the user opens and closes it', async () => {
    const onReact = vi.fn();
    const onSvelte = vi.fn();
    const svelte = await steps(() => mountReact(<ReactDetails onToggle={onReact} />), () => mountSvelte(DetailsToggle, { onToggle: onSvelte }), [summary, summary, summary]);
    expect(isOpen(svelte.root)).toBe(true);
    expect(onSvelte.mock.calls.length).toBe(onReact.mock.calls.length);
    expect(onSvelte).toHaveBeenCalledTimes(3);
    await svelte.destroy();
  });

  test('defaultOpen: starts open, then the user decides', async () => {
    const svelte = await steps(() => mountReact(<ReactDetails defaultOpen />), () => mountSvelte(DetailsToggle, { defaultOpen: true }), [summary, summary]);
    expect(isOpen(svelte.root)).toBe(true);
    await svelte.destroy();
  });

  for (const open of [true, false]) {
    test(`open={${open}}: a toggle calls onToggle, and the element goes back to open`, async () => {
      const onReact = vi.fn();
      const onSvelte = vi.fn();
      const svelte = await steps(
        () => mountReact(<ReactDetails open={open} onToggle={onReact} />),
        () => mountSvelte(DetailsToggle, { open, onToggle: onSvelte }),
        [summary, summary],
      );
      expect(isOpen(svelte.root)).toBe(open);
      expect(onSvelte.mock.calls.length).toBe(onReact.mock.calls.length);
      expect(onSvelte).toHaveBeenCalledTimes(2);
      expect(svelte.output()).toBe(open);
      await svelte.destroy();
    });
  }

  test('open, with a parent that follows onToggle: it toggles', async () => {
    const svelte = await steps(() => mountReact(<Following initial={false} />), () => mountSvelte(DetailsToggle, { open: false, follow: true }), [summary, summary, summary]);
    expect(isOpen(svelte.root)).toBe(true);
    expect(svelte.output()).toBe(true);
    await svelte.destroy();
  });

  test('bind:open: toggles, and updates the bound value (as React with a parent that follows)', async () => {
    const onSvelte = vi.fn();
    const svelte = await steps(
      () => mountReact(<Following initial={false} />),
      () => mountSvelte(DetailsToggle, { open: false, bind: true, onToggle: onSvelte }),
      [summary, summary, summary],
    );
    expect(isOpen(svelte.root)).toBe(true);
    expect(svelte.output()).toBe(true);
    expect(onSvelte).toHaveBeenCalledTimes(3);
    await svelte.destroy();
  });
});
