// Interaction: the same steps on React and on Svelte, comparing the DOM after each step. As in inputs.test.tsx.
import { act, createElement, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync, mount, tick, unmount, type Component, type Snippet } from 'svelte';
import { expect } from 'vitest';
import Host from './Host.svelte';
import { canonical } from './parity';

/** Lets the web components' timers, observers and the frameworks' updates run. */
export const settle = async () => {
  for (let i = 0; i < 3; i++) await new Promise((resolve) => setTimeout(resolve, 0));
  flushSync();
  await tick();
};

export type Mounted = { root: HTMLElement; markup: () => string; output: () => unknown; destroy: () => Promise<void> };

/** Mounts a React element in a `.story` div; the markup compared is that div's. */
export async function mountReact(element: ReactElement): Promise<Mounted> {
  const root = document.body.appendChild(document.createElement('div'));
  const reactRoot = createRoot(root);
  await act(async () => reactRoot.render(createElement('div', { className: 'story' }, element)));
  await act(settle);
  return {
    root,
    markup: () => canonical(root.querySelector('.story')!),
    output: () => undefined,
    destroy: async () => {
      await act(async () => reactRoot.unmount());
      root.remove();
    },
  };
}

/** Mounts a Svelte component that renders a `.story` element, and optionally an `output` with JSON in it. */
export async function mountSvelte<P extends Record<string, any>>(component: Component<P>, props: P): Promise<Mounted> {
  const root = document.body.appendChild(document.createElement('div'));
  const app = mount(component, { target: root, props });
  await settle();
  return {
    root,
    markup: () => canonical(root.querySelector('.story')!),
    output: () => JSON.parse(root.querySelector('output')!.textContent!),
    destroy: async () => {
      await unmount(app);
      root.remove();
    },
  };
}

/** Mounts a story snippet (a twin in test/storybook/twins/) in a `.story` div. */
export async function mountStory(story: Snippet): Promise<Mounted> {
  const root = document.body.appendChild(document.createElement('div'));
  const target = root.appendChild(document.createElement('div'));
  target.className = 'story';
  const app = mount(Host, { target, props: { story } });
  await settle();
  return {
    root,
    markup: () => canonical(target),
    output: () => undefined,
    destroy: async () => {
      await unmount(app);
      root.remove();
    },
  };
}

async function run(side: Mounted, actions: ((root: HTMLElement) => void)[], wrap: (fn: () => Promise<void>) => Promise<void>) {
  const markups = [side.markup()];
  for (const action of actions) {
    await wrap(async () => {
      action(side.root);
      await settle();
    });
    markups.push(side.markup());
  }
  return markups;
}

/** Runs each step on React, then on Svelte (one at a time, as they share focus and timers), and compares the DOMs. */
export async function steps(react: () => Promise<Mounted>, svelte: () => Promise<Mounted>, actions: ((root: HTMLElement) => void)[]) {
  const r = await react();
  const expected = await run(r, actions, (fn) => act(fn));
  await r.destroy();
  const s = await svelte();
  const received = await run(s, actions, (fn) => fn());
  expect(received.join('\n\n')).toBe(expected.join('\n\n'));
  return s;
}

export const click = (el: Element) => (el as HTMLElement).click();
