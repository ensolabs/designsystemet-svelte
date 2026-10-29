// Every upstream story with a twin, laid out by the browser with Digdir's CSS: React's and the Svelte twin's must look
// the same. Each is mounted in turn at the same place on the page, and every element under the container is compared,
// in document order: its box (position relative to the container, and size) within a pixel, and its computed `color`
// and `background-color`. The markup already matches (storybook.browser.test.tsx); this proves the CSS sees it the same,
// and catches what the markup comparison leaves out, such as whitespace between elements.
import { describe, expect, test } from 'vitest';
import { mountStory, type Side } from './browser';
import { cases, type Case } from './storybook/cases';

/** Subpixel layout can round differently; anything more than this is a difference. */
const TOLERANCE = 1;

type Box = { path: string; x: number; y: number; width: number; height: number; color: string; background: string };

/** `div > span.ds-badge`-style path of an element under the container, for the failure message. */
function pathOf(el: Element, root: Element): string {
  const parts: string[] = [];
  for (let node: Element | null = el; node && node !== root; node = node.parentElement) {
    const classes = [...node.classList].filter((name) => name.startsWith('ds-')).map((name) => `.${name}`);
    parts.unshift(node.tagName.toLowerCase() + classes.join(''));
  }
  return parts.join(' > ');
}

async function layout(c: Case, side: Side): Promise<Box[]> {
  const mounted = await mountStory(c, side);
  const root = mounted.container;
  const origin = root.getBoundingClientRect();
  const boxes = [...root.querySelectorAll('*')].map((el) => {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return {
      path: pathOf(el, root),
      x: rect.x - origin.x,
      y: rect.y - origin.y,
      width: rect.width,
      height: rect.height,
      color: style.color,
      background: style.backgroundColor,
    };
  });
  await mounted.unmount();
  return boxes;
}

function differences(react: Box[], svelte: Box[]): string[] {
  if (react.length !== svelte.length) return [`${svelte.length} elements, React has ${react.length}`];
  const out: string[] = [];
  react.forEach((r, i) => {
    const s = svelte[i];
    const at = `#${i} ${r.path}`;
    if (s.path !== r.path) return out.push(`${at}: is ${s.path}`);
    for (const key of ['x', 'y', 'width', 'height'] as const)
      if (Math.abs(s[key] - r[key]) > TOLERANCE) out.push(`${at}: ${key} ${s[key].toFixed(2)}, React ${r[key].toFixed(2)}`);
    for (const key of ['color', 'background'] as const) if (s[key] !== r[key]) out.push(`${at}: ${key} ${s[key]}, React ${r[key]}`);
  });
  return out;
}

const ported = cases.filter((c) => !c.skip && c.svelte);

describe.each([...new Set(ported.map((c) => c.file))])('%s', (file) => {
  for (const c of ported.filter((c) => c.file === file)) {
    test(c.name, async () => {
      const react = await layout(c, 'react');
      const svelte = await layout(c, 'svelte');
      expect(differences(react, svelte)).toEqual([]);
    });
  }
});
