// The text a snippet renders, on the server: rendered to HTML on its own and read. See text.browser.ts.
import type { Snippet } from 'svelte';
import { render } from 'svelte/server';
import SnippetText from './SnippetText.svelte';

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

/** Calls `update` once with the snippet's text; the server renders once, so there is nothing to clean up. */
export function observeText(snippet: Snippet, update: (text: string) => void): () => void {
  const html = render(SnippetText, { props: { snippet } }).body;
  update(
    html
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]*>/g, '')
      .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, name: string) =>
        name[0] === '#'
          ? String.fromCodePoint(name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10))
          : (ENTITIES[name.toLowerCase()] ?? entity),
      ),
  );
  return () => {};
}
