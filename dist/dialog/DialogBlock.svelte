<!-- A section of a Dialog, divided from the next by a line: the place for a header, a scrolling body or a footer. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet } from '../types';

  type Props = HTMLAttributes<HTMLDivElement> & { child?: ChildSnippet; ref?: HTMLDivElement };

  let { class: className, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-dialog__block', className], ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <div bind:this={ref} {...attrs}>{@render children?.()}</div>
{/if}
