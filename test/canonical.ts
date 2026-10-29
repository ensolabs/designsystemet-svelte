// The DOM under an element as canonical text, for comparing what Digdir's React components and ours render.

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

/**
 * An id from React's useId (`_r_5_`, `:r5:`, `«r5»` in the browser; `_R_0_` and so on from react-dom/server) or
 * Svelte's $props.id (`c6` in the browser, `s6` on the server), as the whole value or after a dash:
 * `togglegroup-name-_r_5_`. Literal names are compared as they are.
 */
const GENERATED_ID_SUFFIX = /(?<=^|-)(?:_[rR]_[0-9a-zA-Z]+_|:[rR][0-9a-zA-Z]+:|«[rR][0-9a-zA-Z]+»|[cs]\d+)$/;

// Node.TEXT_NODE and Node.ELEMENT_NODE, without a DOM global: the ssr tests parse HTML with jsdom in Node.
const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

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
    if (node.nodeType === TEXT_NODE) {
      if (node.previousSibling?.nodeType === TEXT_NODE) return;
      let text = '';
      for (let n: Node | null = node; n?.nodeType === TEXT_NODE; n = n.nextSibling) text += n.textContent;
      text = text.replace(/\s+/g, ' ').trim();
      if (text) lines.push(pad + JSON.stringify(text));
      return;
    }
    if (node.nodeType !== ELEMENT_NODE) return;
    const el = node as Element;
    const tag = el.tagName.toLowerCase();
    const formControl = ['input', 'textarea', 'select', 'option'].includes(tag);
    const attrs: string[] = [];
    for (const { name, value } of el.attributes) {
      if (name === 'class') continue;
      // React writes checked/value/selected as properties, Svelte sometimes as attributes: compare the properties.
      if (formControl && ['checked', 'value', 'selected'].includes(name)) continue;
      if (ID_ATTRIBUTES.has(name)) attrs.push(`${name}=${value.split(/\s+/).filter(Boolean).map(idOf).join(' ')}`);
      else if (name === 'style') attrs.push(`style=${JSON.stringify(normalizeStyle(value, el.ownerDocument))}`);
      // A generated name ends in a generated id (React's useId, Svelte's $props.id): compare that end like an id.
      else if (name === 'name') attrs.push(`name=${JSON.stringify(value.replace(GENERATED_ID_SUFFIX, (id) => idOf(id)))}`);
      // Upstream's link stories append a random `?=<n>` to their hrefs when they load; compare the href without it.
      else if (name === 'href') attrs.push(`href=${JSON.stringify(value.replace(/[?&]=\d+$/, ''))}`);
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

/**
 * The declarations, sorted, as the CSSOM writes them. React sets styles through the CSSOM (`5px 0 5px 0` becomes
 * `5px 0px`), while Svelte writes the attribute as given; the browser reads both the same.
 */
function normalizeStyle(style: string, document: Document): string {
  const scratch = document.createElement('div');
  scratch.style.cssText = style;
  return (scratch.getAttribute('style') ?? '')
    .split(';')
    .map((declaration) => declaration.trim().replace(/\s*:\s*/, ': '))
    .filter(Boolean)
    .sort()
    .join('; ');
}
