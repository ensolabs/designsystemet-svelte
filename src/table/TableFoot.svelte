<!-- A native `tfoot`, for sums and totals. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLTableSectionElement> & { ref?: HTMLTableSectionElement };

  let { children, ref = $bindable(), ...rest }: Props = $props();
</script>

<tfoot bind:this={ref} {...rest}>{@render children?.()}</tfoot>
