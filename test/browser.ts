// Mounting a story in the real browser (the browser project), with Digdir's React components or with ours, one at a
// time in a container of its own, and waiting for designsystemet-web to finish with it. The container stands for
// Storybook's canvas (#storybook-root), and the story goes in the element that Storybook's global decorator
// (customStylesDecorator) lays it out with, styled from the story's `parameters.customStyles` as in story view.
import type { ReactElement } from 'react';
import { flushSync as flushReact } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { flushSync, mount, unmount, type Snippet } from 'svelte';
import Host from './Host.svelte';
import type { Case } from './storybook/cases';

export type Side = 'react' | 'svelte';

export type Mounted = {
  /** The canvas: Storybook's `canvasElement`. */
  container: HTMLElement;
  unmount: () => Promise<void>;
};

/** React's style props that take a number as it is; other numbers are pixels. */
const UNITLESS = new Set(['flex', 'flexGrow', 'flexShrink', 'fontWeight', 'lineHeight', 'opacity', 'order', 'zIndex']);

/** The canvas, and in it the decorator's element, styled as customStylesDecorator styles it in story view. */
function canvas(side: Side, parameters: Record<string, unknown>): { container: HTMLElement; target: HTMLElement } {
  const container = document.createElement('div');
  container.dataset.side = side;
  const decorator = container.appendChild(document.createElement('div'));
  decorator.setAttribute('data-storybook-decorator', '');
  const { docs: _docs, story, ...style } = (parameters.customStyles ?? {}) as Record<string, unknown>;
  const styles = { boxSizing: 'border-box', overflow: 'hidden', padding: '1rem', ...style, ...(story as object) };
  for (const [name, value] of Object.entries(styles)) {
    const css = typeof value === 'number' && !UNITLESS.has(name) ? `${value}px` : String(value);
    if (name.startsWith('--')) decorator.style.setProperty(name, css);
    else (decorator.style as unknown as Record<string, string>)[name] = css;
  }
  document.body.appendChild(container);
  return { container, target: decorator };
}

export async function mountReact(element: ReactElement, parameters: Record<string, unknown> = {}): Promise<Mounted> {
  const { container, target } = canvas('react', parameters);
  const root = createRoot(target);
  flushReact(() => root.render(element));
  await settle();
  return {
    container,
    unmount: async () => {
      root.unmount();
      cleanUp(container);
    },
  };
}

export async function mountSvelte(story: Snippet, parameters: Record<string, unknown> = {}): Promise<Mounted> {
  const { container, target } = canvas('svelte', parameters);
  const app = mount(Host, { target, props: { story } });
  flushSync();
  await settle();
  return {
    container,
    unmount: async () => {
      await unmount(app);
      cleanUp(container);
    },
  };
}

/** One side of a story's case, mounted. */
export const mountStory = (c: Case, side: Side) =>
  side === 'react' ? mountReact(c.react(), c.parameters) : mountSvelte(c.svelte!, c.parameters);

function cleanUp(el: HTMLElement) {
  el.remove();
  (document.activeElement as HTMLElement | null)?.blur?.();
  window.scrollTo(0, 0);
}

const frame = () => new Promise((resolve) => requestAnimationFrame(resolve));
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Waits until the page is quiet: a frame has been drawn and nothing in the document has changed for `quiet` ms
 * (designsystemet-web upgrades elements and sets attributes from MutationObservers and timers), or `max` ms have passed.
 */
export async function settle(quiet = 60, max = 2000): Promise<void> {
  const start = performance.now();
  let last = start;
  const observer = new MutationObserver(() => (last = performance.now()));
  observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, characterData: true });
  await frame();
  while (performance.now() - last < quiet && performance.now() - start < max) await sleep(10);
  observer.disconnect();
  await frame();
}
