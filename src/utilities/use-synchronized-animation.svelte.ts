/**
 * React's `useSynchronizedAnimation`, with runes: returns a ref object, as React does, to bind to the element with
 * `bind:this={ref.current}`. Once the element is there, its CSS animation `animationName` is put in step with the
 * other elements running it. Call it while a component initializes.
 *
 * ```svelte
 * <script lang="ts">
 *   const ref = useSynchronizedAnimation<HTMLDivElement>('spin');
 * </script>
 *
 * <div bind:this={ref.current} style="animation: spin 2s linear infinite"></div>
 * ```
 *
 * The components use the same logic as an attachment, `synchronizedAnimation(animationName)`.
 */
import { untrack } from 'svelte';
import { synchronizedAnimation } from './synchronized-animation';

export function useSynchronizedAnimation<T extends Element>(animationName: string): { current: T | null } {
  const ref = $state<{ current: T | null }>({ current: null });
  // React's useLayoutEffect(…, [animationName]), which runs once the ref is set: here, once the element is bound.
  $effect(() => {
    const element = ref.current;
    if (!element) return;
    return untrack(() => synchronizedAnimation(animationName)(element));
  });
  return ref;
}
