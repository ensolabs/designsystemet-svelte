import { type Component, type Snippet } from 'svelte';
/** Calls `update` with the snippet's text now and whenever it changes; returns the cleanup. */
export declare function observeText(snippet: Snippet, update: (text: string) => void): () => void;
/** Mounts a component on an element that isn't in the document, with the given contexts; returns the cleanup. */
export declare function renderApart<P extends Record<string, any>>(component: Component<P>, props: P, context: Map<any, any>): () => void;
