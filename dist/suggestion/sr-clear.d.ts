/**
 * React sets an element's attributes after it has rendered its children, so `data-sr-clear` on `<ds-suggestion>`
 * relabels a clear button that has an `aria-label` of its own. Svelte sets them before; setting the attribute again
 * once the children are there does what React's order does.
 */
export declare const resetClearLabel: (el: HTMLElement | undefined) => void;
