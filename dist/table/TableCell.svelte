<!-- A native `td`. -->
<script lang="ts">
  import type { HTMLTdAttributes } from 'svelte/elements';

  type Props = HTMLTdAttributes & { ref?: HTMLTableCellElement };

  let { children, ref = $bindable(), ...rest }: Props = $props();
</script>

<td bind:this={ref} {...rest}>{@render children?.()}</td>
