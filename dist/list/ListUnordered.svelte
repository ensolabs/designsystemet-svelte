<!-- A `ul` with list styles, of List.Item. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet, DefaultProps } from '../types';

  type Props = DefaultProps & HTMLAttributes<HTMLUListElement> & { child?: ChildSnippet; ref?: HTMLUListElement };

  let { class: className, child, children, ref = $bindable(), ...rest }: Props = $props();

  const attrs = $derived({ class: ['ds-list', className], ...rest });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <ul bind:this={ref} {...attrs}>{@render children?.()}</ul>
{/if}
