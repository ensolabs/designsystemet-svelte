// Mounts a story twice in jsdom, once with Digdir's React components and once with ours, and returns both DOMs as
// canonical text, so a test can compare them line by line. Effects have run on both sides when the text is taken.
import { act, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync, mount, tick, unmount, type Snippet } from 'svelte';
import { canonical } from './canonical';
import Host from './Host.svelte';

export { canonical };

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

export async function renderReact(element: ReactElement): Promise<string> {
  const container = document.body.appendChild(document.createElement('div'));
  const root = createRoot(container);
  await act(async () => root.render(element));
  const markup = canonical(container);
  await act(async () => root.unmount());
  container.remove();
  return markup;
}

export async function renderSvelte(story: Snippet): Promise<string> {
  const container = document.body.appendChild(document.createElement('div'));
  const app = mount(Host, { target: container, props: { story } });
  flushSync();
  await tick();
  // React's async act waits a macrotask, in which queued toggle events fire and designsystemet-web reacts to them.
  await new Promise((resolve) => setTimeout(resolve));
  const markup = canonical(container);
  await unmount(app);
  container.remove();
  return markup;
}

/** The two renders of one story, for `expect(svelte).toBe(react)`. */
export async function both(react: ReactElement, svelte: Snippet): Promise<{ react: string; svelte: string }> {
  return { react: await renderReact(react), svelte: await renderSvelte(svelte) };
}
