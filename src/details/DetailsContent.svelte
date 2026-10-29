<!-- A plain `div` for the content of a Details. -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement };

  let { children, ref = $bindable(), ...rest }: Props = $props();
</script>

<div bind:this={ref} {...rest}>{@render children?.()}</div>
