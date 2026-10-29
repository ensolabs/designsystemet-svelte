<!-- One entry in Pagination.List: an `<li>`. As in React, `class` is dropped. -->
<script lang="ts">
  import type { HTMLLiAttributes } from 'svelte/elements';
  import type { ChildSnippet } from '../types';

  type Props = Omit<HTMLLiAttributes, 'size'> & { child?: ChildSnippet; ref?: HTMLLIElement };

  let { class: _class, child, children, ref = $bindable(), ...rest }: Props = $props();
</script>

{#if child}
  {@render child({ props: rest })}
{:else}
  <li bind:this={ref} {...rest}>{@render children?.()}</li>
{/if}
