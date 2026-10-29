/**
 * React's `useIsomorphicLayoutEffect` (deprecated upstream): React's `useLayoutEffect` in the browser and `useEffect` on
 * the server, so a layout effect doesn't warn during server rendering. Svelte needs neither: its effects never run on the
 * server. The closest Svelte has to a layout effect is `$effect`, which runs after Svelte has updated the DOM and before
 * the browser paints (not `$effect.pre`, which runs before the DOM is updated, when a bound element may not be there
 * yet). Call it while a component initializes, as a React hook during render.
 *
 * Without `deps`, the effect runs again whenever state it reads changes, as a React effect without deps runs after
 * every render. With `deps`, React runs it again when one of them changes; an array of values can't change after the
 * call here, so the effect runs once, without tracking what it reads (as React with deps that stay the same).
 */
import { untrack } from 'svelte';

export function useIsomorphicLayoutEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void {
  $effect(() => (deps ? untrack(effect) : effect()));
}
