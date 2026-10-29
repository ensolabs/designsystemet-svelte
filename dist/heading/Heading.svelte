<!-- An `h1`–`h6` (`level`, default 2) with heading text styles. `data-size` runs from `2xs` to `2xl`. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet } from '../types';

  type Props = HTMLAttributes<HTMLHeadingElement> & {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    'data-size'?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    child?: ChildSnippet;
    ref?: HTMLHeadingElement;
  };

  let { level = 2, class: className, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-heading', className], ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <svelte:element this={`h${level}`} bind:this={ref} {...attrs}>{@render children?.()}</svelte:element>
{/if}
