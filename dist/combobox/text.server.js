import { render } from 'svelte/server';
import SnippetText from './SnippetText.svelte';
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
/** Calls `update` once with the snippet's text; the server renders once, so there is nothing to clean up. */
export function observeText(snippet, update) {
    const html = render(SnippetText, { props: { snippet } }).body;
    update(html
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<[^>]*>/g, '')
        .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, name) => name[0] === '#'
        ? String.fromCodePoint(name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10))
        : (ENTITIES[name.toLowerCase()] ?? entity)));
    return () => { };
}
/** Renders a component to HTML that is dropped, with the given contexts, for what it does while rendering. Its
 * `onDestroy` callbacks run when that render ends. */
export function renderApart(component, props, context) {
    // Rendered when its body is read.
    void render(component, { props, context }).body;
    return () => { };
}
