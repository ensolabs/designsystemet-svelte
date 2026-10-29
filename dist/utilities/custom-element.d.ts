/**
 * Attributes for a custom element (`<ds-tab>`, `<ds-pagination>`, …), written as React 19 writes them: React sets an
 * attribute that is `true` on a custom element as present and empty (`data-autoplacement=""`), where Svelte, as React
 * on a built-in element, writes `"true"`. Spread the result on the custom element.
 */
export declare function customElementAttributes<T extends Record<string, unknown>>(attributes: T): T;
