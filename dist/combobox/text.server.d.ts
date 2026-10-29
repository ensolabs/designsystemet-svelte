import type { Component, Snippet } from 'svelte';
/** Calls `update` once with the snippet's text; the server renders once, so there is nothing to clean up. */
export declare function observeText(snippet: Snippet, update: (text: string) => void): () => void;
/** Renders a component to HTML that is dropped, with the given contexts, for what it does while rendering. Its
 * `onDestroy` callbacks run when that render ends. */
export declare function renderApart<P extends Record<string, any>>(component: Component<P>, props: P, context: Map<any, any>): () => void;
