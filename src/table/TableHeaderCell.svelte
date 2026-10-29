<!--
  A native `th`. With `sort` (`ascending`, `descending`, `none` or `other`) it sets `aria-sort` and wraps its content
  in a button; handle `onclick` on the cell and update `sort` yourself.
-->
<script lang="ts">
  import type { HTMLThAttributes } from 'svelte/elements';

  type Props = HTMLThAttributes & { sort?: HTMLThAttributes['aria-sort']; ref?: HTMLTableCellElement };

  let { sort, children, ref = $bindable(), ...rest }: Props = $props();
</script>

<th bind:this={ref} aria-sort={sort} {...rest}>
  {#if sort}<button type="button">{@render children?.()}</button>{:else}{@render children?.()}{/if}
</th>
