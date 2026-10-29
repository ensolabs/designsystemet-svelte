// Mounts a story twice in jsdom, once with Digdir's React components and once with ours, and returns both DOMs as
// canonical text, so a test can compare them line by line. Effects have run on both sides when the text is taken.
import { act, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync, mount, tick, unmount, type Snippet } from 'svelte';
import Host from './Host.svelte';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

/** Attributes that hold generated ids, alone or as a space-separated list. Compared by which element they point at. */
const ID_ATTRIBUTES = new Set([
  'id',
  'for',
  'aria-labelledby',
  'aria-describedby',
  'aria-controls',
  'aria-owns',
  'aria-activedescendant',
  'aria-details',
  'aria-errormessage',
  'commandfor',
  'popovertarget',
  'list',
  'form',
  'data-clickdelegatefor',
]);

/** The element's children as indented lines: sorted attributes and classes, ids numbered by first appearance. */
export function canonical(root: Element): string {
  const ids = new Map<string, string>();
  const idOf = (value: string) => {
    if (!ids.has(value)) ids.set(value, `<id${ids.size + 1}>`);
    return ids.get(value)!;
  };
  const lines: string[] = [];
  const walk = (node: Node, depth: number) => {
    const pad = '  '.repeat(depth);
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.previousSibling?.nodeType === Node.TEXT_NODE) return;
      let text = '';
      for (let n: Node | null = node; n?.nodeType === Node.TEXT_NODE; n = n.nextSibling) text += n.textContent;
      text = text.replace(/\s+/g, ' ').trim();
      if (text) lines.push(pad + JSON.stringify(text));
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as Element;
    const tag = el.tagName.toLowerCase();
    const formControl = ['input', 'textarea', 'select', 'option'].includes(tag);
    const attrs: string[] = [];
    for (const { name, value } of el.attributes) {
      if (name === 'class') continue;
      // React writes checked/value/selected as properties, Svelte sometimes as attributes: compare the properties.
      if (formControl && ['checked', 'value', 'selected'].includes(name)) continue;
      if (ID_ATTRIBUTES.has(name)) attrs.push(`${name}=${value.split(/\s+/).filter(Boolean).map(idOf).join(' ')}`);
      else if (name === 'style') attrs.push(`style=${JSON.stringify(normalizeStyle(value))}`);
      else attrs.push(`${name}=${JSON.stringify(value)}`);
    }
    if (tag === 'input' || tag === 'textarea' || tag === 'select') {
      const input = el as HTMLInputElement;
      if (input.type === 'checkbox' || input.type === 'radio') {
        if (input.checked) attrs.push(':checked');
        if (input.value !== 'on') attrs.push(`:value=${JSON.stringify(input.value)}`);
      } else if (input.value) attrs.push(`:value=${JSON.stringify(input.value)}`);
    }
    if (tag === 'option') {
      const option = el as HTMLOptionElement;
      if (option.selected) attrs.push(':selected');
      attrs.push(`:value=${JSON.stringify(option.value)}`);
    }
    attrs.sort();
    const classes = (el.getAttribute('class') ?? '').split(/\s+/).filter(Boolean).sort();
    if (classes.length) attrs.unshift(`class=${JSON.stringify(classes.join(' '))}`);
    lines.push(`${pad}<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}>`);
    // A textarea's text is its default value, compared above as :value.
    if (tag !== 'textarea') for (const child of el.childNodes) walk(child, depth + 1);
  };
  for (const child of root.childNodes) walk(child, 0);
  return lines.join('\n');
}

function normalizeStyle(style: string): string {
  return style
    .split(';')
    .map((declaration) => declaration.trim().replace(/\s*:\s*/, ': '))
    .filter(Boolean)
    .sort()
    .join('; ');
}

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
