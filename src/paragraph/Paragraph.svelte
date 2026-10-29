<!-- A `p` with paragraph text styles. `variant` sets the line height: `long`, `default` or `short`. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet } from '../types';

  type Props = HTMLAttributes<HTMLParagraphElement> & {
    'data-size'?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'long' | 'default' | 'short';
    child?: ChildSnippet;
    ref?: HTMLParagraphElement;
  };

  let { class: className, variant, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-paragraph', className], 'data-variant': variant, ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <p bind:this={ref} {...attrs}>{@render children?.()}</p>
{/if}
