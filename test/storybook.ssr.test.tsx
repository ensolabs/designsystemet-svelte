// Every upstream story rendered on the server, by react-dom/server and svelte/server: the HTML must match, as parsed.
import { JSDOM } from 'jsdom';
import { renderToString } from 'react-dom/server';
import { render } from 'svelte/server';
import { describe, expect, test } from 'vitest';
import { canonical } from './canonical';
import Host from './Host.svelte';
import { cases } from './storybook/cases';

/**
 * The HTML as canonical text. Comments are left out first, then adjacent text is joined: react-dom/server separates
 * text parts with `<!-- -->` and svelte/server writes hydration markers, and neither is part of the markup.
 */
function parse(html: string): string {
  const { document, NodeFilter } = new JSDOM(`<body>${html}</body>`).window;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT);
  const comments: Node[] = [];
  while (walker.nextNode()) comments.push(walker.currentNode);
  for (const comment of comments) comment.parentNode!.removeChild(comment);
  document.body.normalize();
  return canonical(document.body);
}

const ported = cases.filter((c) => !c.skip && c.svelte);

describe.each([...new Set(ported.map((c) => c.file))])('%s', (file) => {
  for (const c of ported.filter((c) => c.file === file)) {
    test(c.name, () => {
      const react = parse(renderToString(c.react()));
      const svelte = parse(render(Host, { props: { story: c.svelte! } }).body);
      expect(svelte).toBe(react);
    });
  }
});
