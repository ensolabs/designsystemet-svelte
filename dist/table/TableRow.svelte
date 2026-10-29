<!-- A native `tr`. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLTableRowElement> & { ref?: HTMLTableRowElement };

  let { children, ref = $bindable(), ...rest }: Props = $props();
</script>

<tr bind:this={ref} {...rest}>{@render children?.()}</tr>
