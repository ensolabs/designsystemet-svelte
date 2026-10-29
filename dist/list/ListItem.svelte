<!-- A plain `li`, for List.Unordered and List.Ordered. -->
<script lang="ts">
  import type { HTMLLiAttributes } from 'svelte/elements';
  import type { ChildSnippet } from '../types';

  type Props = HTMLLiAttributes & { child?: ChildSnippet; ref?: HTMLLIElement };

  let { child, children, ref = $bindable(), ...rest }: Props = $props();
</script>

{#if child}
  {@render child({ props: rest })}
{:else}
  <li bind:this={ref} {...rest}>{@render children?.()}</li>
{/if}
