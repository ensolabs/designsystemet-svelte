let counter = 0;

/**
 * A unique id for the hooks, where React's hooks call `useId`. Svelte's `$props.id()` only works at the top level of a
 * component, so the hooks number their own ids: `ds1`, `ds2`, … They are unique on the page (and on the server), but
 * not the same on the server and in the browser, so after hydration the browser's ids replace the server's.
 */
export function useId(): string {
  return `ds${++counter}`;
}
