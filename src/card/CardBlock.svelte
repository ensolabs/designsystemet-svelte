<!-- A section of a Card, with a line between it and the next. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps & HTMLAttributes<HTMLDivElement> & { child?: ChildSnippet; ref?: HTMLDivElement };

  let { class: className, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-card__block', className], ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <div bind:this={ref} {...attrs}>{@render children?.()}</div>
{/if}
