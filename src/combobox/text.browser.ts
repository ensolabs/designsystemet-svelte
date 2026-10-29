// The text a snippet renders, in the browser: mounted on a detached element and read. Combobox.Option reads its label
// from its children this way, as React's reads the strings among its children. And Combobox's `collect` pass, rendered
// apart from the page. See text.server.ts for the server.
import { mount, unmount, type Component, type Snippet } from 'svelte';
import SnippetText from './SnippetText.svelte';

/** Calls `update` with the snippet's text now and whenever it changes; returns the cleanup. */
export function observeText(snippet: Snippet, update: (text: string) => void): () => void {
  const target = document.createElement('div');
  const app = mount(SnippetText, { target, props: { snippet } });
  update(target.textContent ?? '');
  const observer = new MutationObserver(() => update(target.textContent ?? ''));
  observer.observe(target, { subtree: true, childList: true, characterData: true });
  return () => {
    observer.disconnect();
    void unmount(app);
  };
}

/** Mounts a component on an element that isn't in the document, with the given contexts; returns the cleanup. */
export function renderApart<P extends Record<string, any>>(component: Component<P>, props: P, context: Map<any, any>): () => void {
  const app = mount(component, { target: document.createElement('div'), props, context });
  return () => void unmount(app);
}
