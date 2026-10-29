<!-- The pages in Pagination: a `<ul>` of Pagination.Item. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChildSnippet } from '../types';

  type Props = Omit<HTMLAttributes<HTMLUListElement>, 'size'> & { child?: ChildSnippet; ref?: HTMLUListElement };

  let { child, children, ref = $bindable(), ...rest }: Props = $props();
</script>

{#if child}
  {@render child({ props: rest })}
{:else}
  <ul bind:this={ref} {...rest}>{@render children?.()}</ul>
{/if}
